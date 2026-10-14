// Base de datos de hoteles con imágenes estables de alta resolución
const listaHoteles = [
    { id: 1, nombre: "Belmond Hotel Monasterio", precio: 189, estrellas: "⭐⭐⭐⭐", calif: "8.5 Excelente", img: "https://unsplash.com" },
    { id: 2, nombre: "Hotel Casa Andina Standard Cusco", precio: 156, estrellas: "⭐⭐⭐⭐", calif: "8.2 Muy Bueno", img: "https://unsplash.com" },
    { id: 3, nombre: "Hotel Picoaga Cusco", precio: 172, estrellas: "⭐⭐⭐⭐", calif: "8.0 Bueno", img: "https://unsplash.com" }
];

// Inyectar tarjetas dinámicamente en el catálogo
function renderizarHoteles(hoteles) {
    const container = document.getElementById("hotels-container");
    if (!container) return;
    container.innerHTML = "";

    if (hoteles.length === 0) {
        container.innerHTML = `<p style="padding: 20px; font-weight: bold; color: #cc0000;">No hay hoteles dentro de este presupuesto.</p>`;
        return;
    }

    hoteles.forEach(hotel => {
        const card = document.createElement("div");
        card.className = "hotel-card";
        card.innerHTML = `
            <div class="hotel-img-container">
                <img src="${hotel.img}" alt="${hotel.nombre}">
            </div>
            <div class="hotel-details">
                <div class="hotel-header">
                    <h2>${hotel.nombre}</h2>
                    <div class="stars">${hotel.estrellas}</div>
                    <span class="rating-badge">${hotel.calif}</span>
                </div>
            </div>
            <div class="hotel-pricing-area">
                <span class="web-source">Oferta en Cusco</span>
                <div class="hotel-price">S/. ${hotel.precio}</div>
                <span class="price-subtext">Cancelación gratuita</span>
                <button class="btn-view-deal" onclick="simularPago('${hotel.nombre}', ${hotel.precio})">Ver oferta</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Filtro automático del slider
function buscarHoteles() {
    const precioMaximo = parseInt(document.getElementById("price-filter").value);
    const filtrados = listaHoteles.filter(h => h.precio <= precioMaximo);
    renderizarHoteles(filtrados);
}

function actualizarPrecio(valor) {
    document.getElementById("price-value").innerText = `S/. ${valor}`;
    buscarHoteles();
}

// Ventana emergente con pasarela de pago (Culqi y Visa)
function simularPago(nombreHotel, precio) {
    alert(`[Pasarela de Pago Segura Culqi] \n\nIniciando checkout móvil para: ${nombreHotel}\nMonto a procesar: S/. ${precio}\n\nMedios integrados con éxito: Yape, Plin y Tarjetas Visa/Mastercard (Suite Cybersource).`);
}

window.onload = function() {
    renderizarHoteles(listaHoteles);
};
