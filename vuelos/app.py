from flask import Flask, request, jsonify, send_from_directory
import os

app = Flask(__name__, static_folder=".")


@app.route("/")
def index():
    return send_from_directory(".", "index.html")


@app.route("/api/search", methods=["POST"])
def search():
    data = request.get_json()
    origin = data.get("origin", "").upper().strip()
    destination = data.get("destination", "").upper().strip()
    date = data.get("date")
    return_date = data.get("return_date")
    seat_class = data.get("seat_class", "ECONOMY")
    adults = int(data.get("adults", 1))

    if not origin or not destination or not date:
        return jsonify({"error": "Completá origen, destino y fecha"}), 400

    try:
        from fli.models import (
            Airport,
            FlightSearchFilters,
            FlightSegment,
            MaxStops,
            PassengerInfo,
            SeatType,
            SortBy,
        )
        from fli.search import SearchFlights
    except ImportError:
        return jsonify({"error": "La librería fli no está instalada. Ejecutá: pip install flights"}), 500

    try:
        origin_ap = Airport[origin]
    except KeyError:
        return jsonify({"error": f"Código de aeropuerto no válido: {origin}. Usá el código IATA (ej: EZE, MAD, MIA)"}), 400

    try:
        dest_ap = Airport[destination]
    except KeyError:
        return jsonify({"error": f"Código de aeropuerto no válido: {destination}. Usá el código IATA (ej: EZE, MAD, MIA)"}), 400

    seat_map = {
        "ECONOMY": SeatType.ECONOMY,
        "PREMIUM_ECONOMY": SeatType.PREMIUM_ECONOMY,
        "BUSINESS": SeatType.BUSINESS,
        "FIRST": SeatType.FIRST,
    }
    seat_type = seat_map.get(seat_class, SeatType.ECONOMY)

    segments = [
        FlightSegment(
            departure_airport=[[origin_ap, 0]],
            arrival_airport=[[dest_ap, 0]],
            travel_date=date,
        )
    ]

    if return_date:
        segments.append(
            FlightSegment(
                departure_airport=[[dest_ap, 0]],
                arrival_airport=[[origin_ap, 0]],
                travel_date=return_date,
            )
        )

    filters = FlightSearchFilters(
        passenger_info=PassengerInfo(adults=adults),
        flight_segments=segments,
        seat_type=seat_type,
        sort_by=SortBy.CHEAPEST,
    )

    try:
        searcher = SearchFlights()
        results = searcher.search(filters)
    except Exception as e:
        return jsonify({"error": f"Error al buscar vuelos: {str(e)}"}), 500

    if not results:
        return jsonify({"flights": [], "message": "No se encontraron vuelos para esa búsqueda"})

    flights_data = []
    for item in results[:20]:
        if isinstance(item, tuple):
            outbound, inbound = item
            flight_info = _serialize_flight(outbound)
            flight_info["return_flight"] = _serialize_flight(inbound)
        else:
            flight_info = _serialize_flight(item)
        flights_data.append(flight_info)

    return jsonify({"flights": flights_data})


def _serialize_flight(flight):
    legs = []
    for leg in (flight.legs or []):
        airline_name = leg.airline.name if hasattr(leg.airline, "name") else str(leg.airline)
        dep_ap = leg.departure_airport.name if hasattr(leg.departure_airport, "name") else str(leg.departure_airport)
        arr_ap = leg.arrival_airport.name if hasattr(leg.arrival_airport, "name") else str(leg.arrival_airport)
        legs.append({
            "airline": airline_name,
            "flight_number": leg.flight_number or "",
            "departure_airport": dep_ap,
            "arrival_airport": arr_ap,
            "departure_time": str(leg.departure_datetime) if leg.departure_datetime else None,
            "arrival_time": str(leg.arrival_datetime) if leg.arrival_datetime else None,
            "duration": leg.duration,
        })

    return {
        "price": flight.price,
        "duration": flight.duration,
        "stops": flight.stops,
        "legs": legs,
    }


if __name__ == "__main__":
    app.run(debug=True, port=5000)
