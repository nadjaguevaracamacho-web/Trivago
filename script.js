const HOTELES = [
    {
        id: 1,
        nombre: "Hotel Monasterio",
        estrellas: 5,
        ubicacion: "Cusco, Perú · Centro histórico",
        distancia: "A 0,4 km de la Plaza de Armas",
        puntuacion: 9.2,
        calificacion: "Excepcional",
        opiniones: 1842,
        etiqueta: "Ubicación ideal para Machu Picchu",
        proveedor: "Booking.com",
        precioBase: 189,
        precioAnterior: 224,
        imagenMain: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        galeria: [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80"
        ],
        habitaciones: [
            { id: 'm1', nombre: "Habitación Deluxe", desc: "2 adultos · 1 habitación · 1 cama doble o 2 individuales", precio: 189, img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=300&q=80" },
            { id: 'm2', nombre: "Habitación Superior Colonial", desc: "2 adultos · Vista al patio interior colonial", precio: 245, img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=300&q=80" },
            { id: 'm3', nombre: "Suite Ejecutiva Inka", desc: "2 adultos · Incluye desayuno buffet andino", precio: 320, img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=300&q=80" }
        ]
    },
    {
        id: 2,
        nombre: "Hotel Casa Andina Standard Cusco",
        estrellas: 4,
        ubicacion: "Cusco, Perú · San Blas",
        distancia: "A 0,8 km de la Plaza de Armas",
        puntuacion: 8.7,
        calificacion: "Excelente",
        opiniones: 2316,
        etiqueta: "Excelente ubicación en el centro",
        proveedor: "Expedia",
        precioBase: 156,
        precioAnterior: 182,
        imagenMain: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
        galeria: [
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80"
        ],
        habitaciones: [
            { id: 'c1', nombre: "Habitación Standard Matrimonial", desc: "2 adultos · 1 cama Queen", precio: 156, img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=300&q=80" },
            { id: 'c2', nombre: "Habitación Superior Twin", desc: "2 adultos · 2 camas individuales", precio: 195, img: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=300&q=80" }
        ]
    },
    {
        id: 3,
        nombre: "Hotel Picoaga",
        estrellas: 4,
        ubicacion: "Cusco, Perú · Centro histórico",
        distancia: "A 0,2 km de la Plaza de Armas",
        puntuacion: 9.1,
        calificacion: "Excepcional",
        opiniones: 1507,
        etiqueta: "Vista privilegiada de la ciudad",
        proveedor: "Hotels.com",
        precioBase: 172,
        precioAnterior: 205,
        imagenMain: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
        galeria: [
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80"
        ],
        habitaciones: [
            { id: 'p1', nombre: "Habitación Clásica", desc: "2 adultos · 1 cama Doble", precio: 172, img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=300&q=80" },
            { id: 'p2', nombre: "Habitación Familiar Picoaga", desc: "3 adultos · 2 camas Queen", precio: 240, img: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=300&q=80" }
        ]
    }
];

let hotelSeleccionado = HOTELES[0];
let habitacionSeleccionada = HOTELES[0].habitaciones[0];

function renderizarHoteles() {
    const contenedor = document.getElementById('contenedor-hoteles');
    if (!contenedor) return;

    contenedor.innerHTML = HOTELES.map(hotel => `
        <div class="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-md transition">
            <div class="relative w-full md:w-80 h-48 md:h-auto flex-shrink-0 cursor-pointer" onclick="verHotel(${hotel.id})">
                <img src="${hotel.imagenMain}" alt="${hotel.nombre}" class="w-full h-full object-cover">
                <button class="absolute top-2 right-2 bg-white/80 p-2 rounded-full text-gray-600 hover:text-red-500">
                    <i class="fa-regular fa-heart"></i>
                </button>
            </div>
            <div class="p-4 flex-grow flex flex-col justify-between">
                <div>
                    <div class="flex items-center space-x-1">
                        <h3 class="font-bold text-lg text-gray-900 cursor-pointer hover:text-trivago-blue" onclick="verHotel(${hotel.id})">${hotel.nombre}</h3>
                        <div class="text-amber-400 text-xs">
                            ${'<i class="fa-solid fa-star"></i>'.repeat(hotel.estrellas)}
                        </div>
                    </div>
                    <p class="text-xs text-gray-500 mb-2"><i class="fa-solid fa-location-dot mr-1"></i>${hotel.ubicacion} · ${hotel.distancia}</p>
                    <div class="flex items-center space-x-2 mb-2">
                        <span class="bg-trivago-green text-white font-bold text-xs px-1.5 py-0.5 rounded">${hotel.puntuacion}</span>
                        <span class="font-bold text-xs text-gray-800">${hotel.calificacion}</span>
                        <span class="text-xs text-gray-400">(${hotel.opiniones} opiniones)</span>
                    </div>
                    <p class="text-xs text-gray-600">Wifi gratis · Restaurante · Servicio de tour</p>
                    <span class="inline-block bg-sky-100 text-trivago-blue text-[11px] font-bold px-2 py-0.5 rounded mt-2">
                        ${hotel.etiqueta}
                    </span>
                </div>
            </div>
            <div class="bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200 p-4 w-full md:w-64 flex flex-col justify-between text-right">
                <p class="text-[11px] text-gray-400">Oferta de ${hotel.proveedor}</p>
                <div>
                    <p class="text-xs text-gray-400 line-through">${hotel.precioAnterior} S/.</p>
                    <p class="text-2xl font-extrabold text-gray-900">${hotel.precioBase} S/. <span class="text-xs font-normal text-gray-500">/ noche</span></p>
                    <p class="text-[11px] text-trivago-green font-bold">Cancelación gratuita</p>
                </div>
                <div class="mt-3">
                    <button onclick="verHotel(${hotel.id})" class="bg-trivago-blue hover:bg-trivago-hoverBlue text-white font-bold py-2 px-4 rounded-md w-full text-sm flex items-center justify-center space-x-1">
                        <span>Ver oferta</span>
                        <i class="fa-solid fa-chevron-right text-xs"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function verHotel(id) {
    hotelSeleccionado = HOTELES.find(h => h.id === id);
    const contenedor = document.getElementById('detalle-hotel-dinamico');
    if (!contenedor) return;

    contenedor.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="md:col-span-2 grid grid-cols-3 gap-2 h-80 rounded-xl overflow-hidden">
                <img src="${hotelSeleccionado.galeria[0]}" class="col-span-2 w-full h-full object-cover">
                <div class="grid grid-rows-2 gap-2 h-full">
                    <img src="${hotelSeleccionado.galeria[1]}" class="w-full h-full object-cover">
                    <img src="${hotelSeleccionado.galeria[2]}" class="w-full h-full object-cover">
                </div>
            </div>

            <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                <div>
                    <span class="text-xs text-gray-500">Desde</span>
                    <p class="text-3xl font-extrabold text-gray-900">S/ ${hotelSeleccionado.precioBase} <span class="text-xs font-normal text-gray-500">/ noche</span></p>
                    <p class="text-[11px] text-gray-400 mb-4">Impuestos y tasas incluidos</p>
                    <div class="bg-emerald-50 text-trivago-green p-2 rounded-lg text-xs font-bold flex items-center mb-2">
                        <i class="fa-solid fa-circle-check mr-2"></i> Cancelación gratuita
                    </div>
                </div>
                <div>
                    <button onclick="seleccionarHabitacion('${hotelSeleccionado.habitaciones[0].id}')" class="bg-trivago-blue hover:bg-trivago-hoverBlue text-white font-bold py-3 px-4 rounded-lg block text-center w-full mb-2">
                        Seleccionar habitación <i class="fa-solid fa-arrow-right ml-1"></i>
                    </button>
                </div>
            </div>
        </div>

        <div class="mb-6">
            <h1 class="text-3xl font-bold text-gray-900">${hotelSeleccionado.nombre}</h1>
            <p class="text-xs text-gray-500"><i class="fa-solid fa-location-dot mr-1"></i> ${hotelSeleccionado.ubicacion} · ${hotelSeleccionado.distancia}</p>
        </div>

        <h2 class="text-xl font-bold text-gray-900 mb-4">Habitaciones disponibles</h2>
        <div class="space-y-4">
            ${hotelSeleccionado.habitaciones.map(hab => `
                <div class="bg-white p-4 rounded-xl border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div class="flex items-center space-x-4">
                        <img src="${hab.img}" class="w-32 h-24 object-cover rounded-lg">
                        <div>
                            <h3 class="font-bold text-gray-900">${hab.nombre}</h3>
                            <p class="text-xs text-gray-500">${hab.desc}</p>
                        </div>
                    </div>
                    <div class="text-right flex flex-col items-end">
                        <p class="text-xl font-extrabold text-gray-900">S/ ${hab.precio} <span class="text-xs font-normal text-gray-500">/ noche</span></p>
                        <button onclick="seleccionarHabitacion('${hab.id}')" class="mt-2 bg-trivago-blue hover:bg-trivago-hoverBlue text-white font-bold py-2 px-6 rounded-lg text-sm">
                            Seleccionar
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    cambiarVista('vista-hotel');
}

function seleccionarHabitacion(habId) {
    habitacionSeleccionada = hotelSeleccionado.habitaciones.find(h => h.id === habId) || hotelSeleccionado.habitaciones[0];
    const total = habitacionSeleccionada.precio * 3;

    const resumen = document.getElementById('resumen-reserva-dinamico');
    if (!resumen) return;

    resumen.innerHTML = `
        <h3 class="font-bold text-gray-900 text-sm mb-3">Tu reserva, de un vistazo</h3>
        <img src="${hotelSeleccionado.imagenMain}" class="w-full h-36 object-cover rounded-xl mb-3 shadow-sm">
        
        <div class="text-amber-400 text-xs mb-1">
            ${'<i class="fa-solid fa-star"></i>'.repeat(hotelSeleccionado.estrellas)}
        </div>
        <h4 class="font-bold text-gray-900 text-base leading-snug">${hotelSeleccionado.nombre}</h4>
        <p class="text-xs text-gray-500 mt-1"><i class="fa-solid fa-location-dot mr-1 text-gray-400"></i>${hotelSeleccionado.ubicacion}</p>
        
        <div class="border-t border-b border-gray-100 my-4 py-3 space-y-2 text-xs">
            <div class="flex justify-between">
                <span class="text-gray-500">Entrada</span>
                <span class="font-bold text-gray-800">23 oct 2026</span>
            </div>
            <div class="flex justify-between">
                <span class="text-gray-500">Salida</span>
                <span class="font-bold text-gray-800">26 oct 2026</span>
            </div>
            <div class="flex justify-between">
                <span class="text-gray-500">Habitación</span>
                <span class="font-semibold text-gray-800">${habitacionSeleccionada.nombre}</span>
            </div>
            <div class="flex justify-between pt-1">
                <span class="text-gray-500">${habitacionSeleccionada.precio} S/. × 3 noches</span>
                <span class="font-bold text-gray-800">${total} S/.</span>
            </div>
            <div class="flex justify-between text-gray-500 text-[11px]">
                <span>Impuestos y tasas</span>
                <span>Incluidos</span>
            </div>
        </div>

        <div class="bg-emerald-50 text-trivago-green font-semibold text-xs p-2.5 rounded-lg mb-4 flex items-center justify-center">
            <i class="fa-solid fa-circle-check mr-1.5"></i> Cancelación gratuita
        </div>

        <div class="flex justify-between items-center mb-4">
            <span class="font-bold text-gray-900">Total</span>
            <span class="text-2xl font-extrabold text-gray-900">${total} S/.</span>
        </div>

        <button onclick="confirmarPago(${total})" class="bg-trivago-blue hover:bg-trivago-hoverBlue text-white font-bold py-3 px-4 rounded-xl block text-center w-full shadow-md transition">
            Realizar reserva <i class="fa-solid fa-arrow-right ml-1"></i>
        </button>
    `;

    cambiarVista('vista-reserva');
}

function seleccionarMetodoPago(metodo) {
    ['tarjeta', 'yape', 'pagoefectivo'].forEach(m => {
        const el = document.getElementById(`metodo-${m}`);
        if (el) {
            if (m === metodo) {
                el.className = "border-2 border-trivago-blue bg-sky-50 rounded-xl p-3 text-center cursor-pointer relative transition";
            } else {
                el.className = "border border-gray-200 rounded-xl p-3 text-center cursor-pointer hover:bg-gray-50 transition";
            }
        }
    });
}

function actualizarFechasYBuscar() {
    const ent = document.getElementById('fecha-entrada').value;
    const sal = document.getElementById('fecha-salida').value;
    const dest = document.getElementById('input-destino').value;

    const tit = document.getElementById('titulo-escapada');
    const sub = document.getElementById('subtitulo-escapada');

    if (tit) tit.innerText = `Una escapada a ${dest.split(',')[0]} empieza aquí`;
    if (sub) sub.innerText = `Hoteles que nos encantan del ${ent} al ${sal} · 2 adultos · 1 habitación`;
    
    renderizarHoteles();
}

function confirmarPago(total) {
    const nombre = document.getElementById('campo-nombre')?.value || 'Lucía';
    const apellido = document.getElementById('campo-apellido')?.value || 'García';

    const conf = document.getElementById('resumen-confirmacion-dinamico');
    if (!conf) return;

    conf.innerHTML = `
        <div class="md:col-span-2 space-y-4">
            <h2 class="font-bold text-lg text-gray-900">${hotelSeleccionado.nombre}</h2>
            <p class="text-xs text-gray-500">${habitacionSeleccionada.nombre} · ${hotelSeleccionado.ubicacion}</p>
            <div class="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg text-xs">
                <div><p class="text-gray-400 uppercase font-bold">Titular</p><p class="font-bold text-gray-800 mt-1">${nombre} ${apellido}</p></div>
                <div><p class="text-gray-400 uppercase font-bold">Huéspedes</p><p class="font-bold text-gray-800 mt-1">2 adultos</p></div>
                <div><p class="text-gray-400 uppercase font-bold">Código Reserva</p><p class="font-bold text-trivago-blue mt-1">TRV-${Math.floor(100000 + Math.random() * 900000)}</p></div>
            </div>
        </div>

        <div class="bg-sky-50 border border-sky-100 rounded-lg p-4 flex flex-col justify-between text-center">
            <div>
                <p class="text-xs text-gray-500">Total pagado</p>
                <p class="text-3xl font-extrabold text-trivago-blue my-2">S/ ${total}</p>
            </div>
            <button onclick="cambiarVista('vista-inicio')" class="bg-trivago-blue hover:bg-trivago-hoverBlue text-white font-bold py-2 px-4 rounded-lg text-xs block mt-4">
                Volver a buscar
            </button>
        </div>
    `;

    cambiarVista('vista-confirmacion');
}

function cambiarVista(vistaId) {
    document.querySelectorAll('.app-view').forEach(v => v.classList.remove('active'));
    const vista = document.getElementById(vistaId);
    if (vista) {
        vista.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// INICIALIZAR AL CARGAR
renderizarHoteles();
