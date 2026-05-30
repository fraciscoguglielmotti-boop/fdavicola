(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Footer year
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  const toggle = $(".nav-toggle");
  const menu = $("#nav-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    });

    menu.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menú");
      }
    });

    document.addEventListener("click", (e) => {
      if (!menu.classList.contains("is-open")) return;
      if (!e.target.closest(".nav")) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menú");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menú");
        toggle.focus();
      }
    });
  }

  // Coverage map (Leaflet)
  const mapEl = $("#coverage-map");
  if (mapEl && window.L) {
    const L = window.L;

    const map = L.map(mapEl, {
      center: [-34.510, -58.530],
      zoom: 11,
      scrollWheelZoom: false,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // GBA Norte: reparto programado, sin mínimo
    const gbaNorte = [
      [-34.395, -58.640], // Tigre / Don Torcuato
      [-34.410, -58.580], // Tigre costero
      [-34.443, -58.535], // San Fernando costa
      [-34.470, -58.500], // San Isidro costa
      [-34.515, -58.475], // Vicente López costa
      [-34.555, -58.460], // Núñez/CABA borde
      [-34.580, -58.515], // San Martín borde sur
      [-34.580, -58.580], // Tres de Febrero borde
      [-34.555, -58.620], // Hurlingham/Pilar borde
      [-34.500, -58.645], // San Miguel borde
      [-34.450, -58.680], // Pilar/Tigre interior
    ];

    const polyPrimary = L.polygon(gbaNorte, {
      color: "#0a4a39",
      weight: 2,
      fillColor: "#138562",
      fillOpacity: 0.40,
    }).addTo(map);

    polyPrimary.bindPopup(
      "<strong>GBA Norte</strong>" +
      "Reparto programado · <b>sin compra mínima</b>.<br/>" +
      "Vicente López · San Isidro · San Fernando · Tigre · San Martín."
    );

    // CABA + GBA aproximado: entrega a demanda con mínimo
    const cabaYResto = [
      [-34.530, -58.520], // CABA NW
      [-34.530, -58.350], // CABA NE (costa)
      [-34.705, -58.350], // CABA SE (Riachuelo)
      [-34.770, -58.430], // Quilmes / Avellaneda
      [-34.770, -58.620], // GBA Sur / Lanús / La Matanza
      [-34.700, -58.720], // La Matanza Oeste
      [-34.620, -58.730], // GBA Oeste
      [-34.580, -58.620], // borde con GBA Norte (limita con polígono superior)
      [-34.555, -58.620], // ~
      [-34.580, -58.580], // ~
      [-34.580, -58.515], // ~
      [-34.555, -58.460], // borde Núñez
      [-34.530, -58.520], // cierre
    ];

    const polySecondary = L.polygon(cabaYResto, {
      color: "#d99815",
      weight: 1.5,
      fillColor: "#f0b429",
      fillOpacity: 0.18,
      dashArray: "4,4",
    }).addTo(map);

    polySecondary.bindPopup(
      "<strong>CABA y resto del GBA</strong>" +
      "Entrega a demanda · <b>mínimo 200 cajones de pollo</b>.<br/>" +
      "Coordinamos día y horario por WhatsApp."
    );

    // Activate scroll wheel zoom on click (better UX on long pages)
    map.on("click focus", () => map.scrollWheelZoom.enable());
    map.on("mouseout", () => map.scrollWheelZoom.disable());

    // Fit both polygons in view
    const group = L.featureGroup([polyPrimary, polySecondary]);
    map.fitBounds(group.getBounds().pad(0.05));
  }

  // Scroll reveal
  const revealEls = $$('[data-reveal]');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const ro = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); ro.unobserve(e.target); }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(el => ro.observe(el));
  }

  // Scroll spy: highlight active nav link
  const navLinks = $$(".nav-menu a[href^='#']");
  const sections = navLinks
    .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    const setActive = (id) => {
      navLinks.forEach((a) => {
        const isActive = a.getAttribute("href") === `#${id}`;
        a.classList.toggle("is-active", isActive);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => observer.observe(s));
  }

  // ─── Catálogo 100% dinámico desde Supabase ──────────────────────────────
  // Source of truth: tabla mn_productos en Supabase. Lo que se carga en
  // AviGest → Minorista → Catálogo es lo que aparece en esta página
  // (cards completos con foto, nombre, descripción, precio).
  //
  // Si el fetch falla, mostramos el markup estático de fallback embebido
  // en el HTML (`#productos-fallback` y `#combos-fallback`).
  const SUPABASE_URL = "https://rcblopybnaljvoikjwqu.supabase.co";
  const SUPABASE_ANON = "sb_publishable_JenUKCfId4lGMkT_sUkerw_Y7rgpXl4";
  const WA_NUMBER = "5491131827749";

  function formatPrecio(n) {
    return "$" + Math.round(n).toLocaleString("es-AR");
  }

  function buildWaLink(text) {
    return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text);
  }

  // Texto WhatsApp por SKU + cantidad. El bot v9+ entiende texto libre.
  function buildMensaje(prod, cantidad) {
    if (!prod) return "Hola FD Avícola, quiero hacer un pedido.";
    if (prod.tipo === "por_kg") {
      return "Hola FD Avícola, quiero pedir " + cantidad + " kg de " + prod.nombre + ".";
    }
    if (prod.tipo === "unidad") {
      const palabra = cantidad === 1 ? "unidad" : "unidades";
      return "Hola FD Avícola, quiero pedir " + cantidad + " " + palabra + " de " + prod.nombre + ".";
    }
    if (prod.tipo === "combo") {
      return "Hola FD Avícola, quiero el " + prod.nombre +
        (prod.descripcion ? " (" + prod.descripcion + ")" : "") + ".";
    }
    return "Hola FD Avícola, quiero pedir " + prod.nombre + ".";
  }

  function escHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // Imagen fallback por tipo (cuando el producto no tiene imagen_url)
  function imagenFallback(prod) {
    if (prod.tipo === "combo") return "assets/combo-pechuga.png";
    const sku = (prod.sku || "").toUpperCase();
    if (sku.includes("PAT") || sku.includes("MUSLO")) return "assets/pata-muslo.png";
    if (sku.includes("HUE") || sku.includes("MAP")) return "assets/producto-1.jpg";
    return "assets/pechuga.png";
  }

  // ── Renderizado de cards ──────────────────────────────────────────────
  function renderProductoCard(prod) {
    const imgSrc = prod.imagen_url || imagenFallback(prod);
    const cantidadDefault = prod.tipo === "por_kg" ? 2 : 1;
    const unidadCorta = prod.tipo === "por_kg" ? "kg" :
                        prod.tipo === "unidad" ? (prod.nombre.toLowerCase().includes("maple") ? "maple" : "u") : "";
    const unidadPlural = unidadCorta === "kg" ? "kg" : unidadCorta + "s";
    const tag = prod.tipo === "por_kg"
      ? '<span class="product-tag"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-snow"/></svg> Refrigerado</span>'
      : '<span class="product-tag"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-check"/></svg> Fresco</span>';
    const stepAttr = prod.tipo === "por_kg" ? "0.5" : "1";
    const minAttr = "1";
    const maxAttr = prod.tipo === "por_kg" ? "50" : "20";
    const inputMode = prod.tipo === "por_kg" ? "decimal" : "numeric";
    const qtyId = "qty-" + (prod.sku || prod.nombre).toLowerCase().replace(/[^a-z0-9]/g, "");

    return (
      '<article class="product">' +
        '<div class="product-media">' +
          '<img src="' + escHtml(imgSrc) + '" alt="' + escHtml(prod.nombre) + '" loading="lazy" width="800" height="500" />' +
          tag +
        '</div>' +
        '<div class="product-body">' +
          '<h3>' + escHtml(prod.nombre) + '</h3>' +
          '<p class="product-desc">' + escHtml(prod.descripcion || '') + '</p>' +
          '<div class="price-row"><span class="price">' + formatPrecio(prod.precio) + '</span><span class="price-unit">/ ' + escHtml(unidadCorta) + '</span></div>' +
          '<div class="qty-row">' +
            '<label class="qty-label" for="' + qtyId + '">Cantidad:</label>' +
            '<input id="' + qtyId + '" type="number" class="qty-input" data-qty-for="' + escHtml(prod.sku) + '" value="' + cantidadDefault + '" min="' + minAttr + '" max="' + maxAttr + '" step="' + stepAttr + '" inputmode="' + inputMode + '" />' +
            '<span class="qty-unit">' + escHtml(unidadPlural) + '</span>' +
          '</div>' +
          '<div class="product-foot"><a class="btn btn-primary" data-wa-producto="' + escHtml(prod.sku) + '" href="' + buildWaLink(buildMensaje(prod, cantidadDefault)) + '" target="_blank" rel="noopener"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-whatsapp"/></svg> Pedir por WhatsApp</a></div>' +
        '</div>' +
      '</article>'
    );
  }

  function renderComboCard(prod, prodPorSku) {
    prodPorSku = prodPorSku || {};
    const imgSrc = prod.imagen_url || imagenFallback(prod);
    // Para combos armamos lista de "specs" desde componentes
    let specsHtml = '';
    if (Array.isArray(prod.componentes)) {
      let precioNormal = 0;
      const lines = prod.componentes.map(function(c) {
        const ref = prodPorSku[c.codigo] || {};
        // Nombre REAL del producto (no el código interno tipo PEC_KG)
        const nombre = ref.nombre || c.nombre || c.codigo;
        // Unidad según el tipo del producto, con fallback heurístico
        let unidad;
        if (ref.tipo === "por_kg") unidad = "kg";
        else if (ref.tipo === "unidad" || String(c.codigo).indexOf("HUE") >= 0 || String(c.codigo).indexOf("MAP") >= 0) unidad = "maple";
        else unidad = c.unidad || "u";
        const plural = unidad === "kg" ? "kg" : (Number(c.cantidad) === 1 ? unidad : unidad + "s");
        precioNormal += (Number(c.cantidad) || 0) * (Number(c.precio_unitario) || 0);
        return '<li>' + escHtml(c.cantidad + ' ' + plural + ' de ' + nombre) + '</li>';
      });
      const ahorro = precioNormal - Number(prod.precio);
      lines.push('<li>' + (ahorro > 0 ? 'Ahorrás ' + formatPrecio(ahorro) + ' vs comprar por separado' : 'Ahorrás vs comprar por separado') + '</li>');
      specsHtml = '<ul class="specs">' + lines.join('') + '</ul>';
    }
    return (
      '<article class="product combo">' +
        '<div class="product-media">' +
          '<img src="' + escHtml(imgSrc) + '" alt="' + escHtml(prod.nombre) + '" loading="lazy" width="800" height="500" />' +
          '<span class="combo-badge">' + escHtml(prod.nombre) + '</span>' +
        '</div>' +
        '<div class="product-body">' +
          '<h3>' + escHtml(prod.descripcion || prod.nombre) + '</h3>' +
          (prod.descripcion ? '<p class="product-desc">' + escHtml(prod.descripcion) + '</p>' : '') +
          specsHtml +
          '<div class="price-row"><span class="price">' + formatPrecio(prod.precio) + '</span></div>' +
          '<div class="product-foot"><a class="btn btn-primary" data-wa-producto="' + escHtml(prod.sku) + '" href="' + buildWaLink(buildMensaje(prod, 1)) + '" target="_blank" rel="noopener"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-whatsapp"/></svg> Pedir combo</a></div>' +
        '</div>' +
      '</article>'
    );
  }

  async function cargarCatalogo() {
    const gridProds = document.getElementById("productos-dinamicos");
    const gridCombos = document.getElementById("combos-dinamicos");

    try {
      const res = await fetch(SUPABASE_URL + "/rest/v1/rpc/get_catalogo_publico", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_ANON,
          "Authorization": "Bearer " + SUPABASE_ANON,
        },
        body: "{}",
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const productos = await res.json();
      if (!Array.isArray(productos) || productos.length === 0) throw new Error("Catálogo vacío");

      const basicos = productos.filter(function(p) { return p.tipo !== "combo"; });
      const combos = productos.filter(function(p) { return p.tipo === "combo"; });

      // Mapa código (SKU) → producto, para mostrar el NOMBRE real en los combos
      const prodPorSku = {};
      productos.forEach(function(p) { prodPorSku[p.sku] = p; });

      // Renderizar productos básicos
      if (gridProds) {
        gridProds.innerHTML = basicos.map(renderProductoCard).join("");
      }
      // Renderizar combos (le pasamos el mapa para resolver nombres)
      if (gridCombos) {
        gridCombos.innerHTML = combos.map(function(c) { return renderComboCard(c, prodPorSku); }).join("");
      }

      // JSON-LD Product dinámico
      if (document.getElementById("schema-productos")) {
        const schema = productos.map(function(p) {
          return {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": p.nombre,
            "description": p.descripcion || p.nombre,
            "image": p.imagen_url || undefined,
            "brand": { "@type": "Brand", "name": "FD Avícola" },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "ARS",
              "price": String(Math.round(p.precio)),
              "availability": "https://schema.org/InStock",
              "url": buildWaLink(buildMensaje(p, 1)),
            },
          };
        });
        document.getElementById("schema-productos").textContent = JSON.stringify(schema, null, 2);
      }

      // Conectar inputs de cantidad → wa.me dinámico
      const porSku = {};
      productos.forEach(function(p) { porSku[p.sku] = p; });
      $$("[data-wa-producto]").forEach(function(btn) {
        const sku = btn.getAttribute("data-wa-producto");
        const prod = porSku[sku];
        if (!prod) return;
        const qtyInput = $("[data-qty-for='" + sku + "']");
        function refresh() {
          let cantidad = 1;
          if (qtyInput) {
            const v = parseFloat(qtyInput.value || "0");
            cantidad = isNaN(v) || v <= 0 ? 1 : v;
          }
          btn.setAttribute("href", buildWaLink(buildMensaje(prod, cantidad)));
        }
        refresh();
        if (qtyInput) {
          qtyInput.addEventListener("input", refresh);
          qtyInput.addEventListener("change", refresh);
        }
      });
    } catch (err) {
      console.error("Catálogo dinámico falló:", err);
      // En vez de mostrar precios viejos (que confunden al cliente), mostramos
      // un mensaje de error claro y un CTA a WhatsApp para que pidan igual.
      const mensajeErrorHtml =
        '<div style="grid-column: 1/-1; text-align: center; padding: 48px 16px; ' +
        'border: 2px dashed #d4d4d8; border-radius: 12px; color: #71717a;">' +
        '<p style="font-size: 16px; margin: 0 0 12px;">No pudimos cargar el catálogo en este momento.</p>' +
        '<p style="font-size: 14px; margin: 0 0 16px;">Escribinos por WhatsApp y te pasamos precios actualizados.</p>' +
        '<a href="' + buildWaLink("Hola FD Avícola, quiero ver precios y hacer un pedido.") + '" ' +
        'target="_blank" rel="noopener" class="btn btn-primary">' +
        '<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-whatsapp"/></svg> ' +
        'Pedir por WhatsApp</a></div>';
      if (gridProds) gridProds.innerHTML = mensajeErrorHtml;
      if (gridCombos) gridCombos.innerHTML = "";
    }
  }

  cargarCatalogo();
})();
