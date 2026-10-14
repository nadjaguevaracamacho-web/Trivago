/* =========================================
   --- trivago CLONE - JAVASCRIPT ---
========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // --- DATOS SIMULADOS ---
    const destinations = ['Lima', 'Cusco', 'Máncora'];
    
    // Imágenes del Slider (Picsum)
    const sliderImages = [
        'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?q=80&w=1600',
        'https://images.unsplash.com/photo-1579848520335-59b1a5113d7a?q=80&w=1600',
        'https://images.unsplash.com/photo-1594917452179-c70e06ae3836?q=80&w=1600'
    ];

    // Simulación de Hoteles (Requerimiento 7)
    const mockHotels = {
        'Cusco': [
            { id: 101, name: 'Hotel Monasterio', stars: 5, location: 'Centro Histórico', ratingScore: 9.3, ratingText: 'Excelente', reviews: 1450, price: 567.50, img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=400' },
            { id: 102, name: 'Tierra Viva Cusco San Blas', stars: 4, location: 'San Blas', ratingScore: 8.9, ratingText: 'Fabuloso', reviews: 1120, price: 345.00, img: 'https://images.unsplash.com/photo-1561501900-3701fa6a0f64?q=80&w=400' }
        ],
        'Lima': [
            { id: 201, name: 'AC Hotel by Marriott Lima Miraflores', stars: 5, location: 'Miraflores', ratingScore: 9.1, ratingText: 'Excelente', reviews: 980, price: 610.00, img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=400' }
        ],
        'Máncora': [
            { id: 301, name: 'Selina Mancora', stars: 3, location: 'Playa Máncora', ratingScore: 8.5, ratingText: 'Muy Bueno', reviews: 2100, price: 178.00, img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=400' }
        ]
    };

    // --- ELEMENTOS DEL DOM ---
    const body = document.body;
    const heroSection = document.querySelector('.hero-section');
    const destinationsSection = document.querySelector('.destinations-section');
    
    // Slider
    const sliderWrapper = document.getElementById('slider-wrapper');
    const prevSlide = document.getElementById('prevSlide');
    const nextSlide = document.getElementById('nextSlide');

    // Buscador
    const searchForm = document.getElementById('search-form');
    const destinationInput = document.getElementById('destination');
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const guestsInput = document.getElementById('guests');
    const btnSearch = document.querySelector('.btn-search');
    const searchSubmenu = document.querySelector('.search-submenu');

    // Resultados
    const resultsSection = document.getElementById('results-section');
    const searchSummary = document.getElementById('search-summary');
    const resultsGrid = document.querySelector('.results-grid');

    // Reserva
    const bookingSection = document.getElementById('booking-section');
    const bookingForm = document.getElementById('booking-form');
    const bookingSummaryAside = document.getElementById('booking-summary-aside');

    // Tarjetas de destino populares
    const destinationCards = document.querySelectorAll('.destination-card');


    // --- 1. BANNER SLIDER (Requerimiento 9) ---
    let currentSlide = 0;
    const totalSlides = sliderImages.length;

    // Inicializar Slides
    sliderImages.forEach(imgUrl => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        slide.style.backgroundImage = `url(${imgUrl})`;
        sliderWrapper.appendChild(slide);
    });

    const updateSlider = () => {
        sliderWrapper.style.transform = `translateX(-${currentSlide * 33.333}%)`;
    };

    const nextSlideFunc = () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    };

    const prevSlideFunc = () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    };

    nextSlide.addEventListener('click', nextSlideFunc);
    prevSlide.addEventListener('click', prevSlideFunc);

    // Autoplay
    setInterval(nextSlideFunc, 5000); // Cambia cada 5 segundos


    // --- 2. SUBMENÚ DEL BOTÓN DE BÚSQUEDA (Requerimiento 6) ---
    // En hover o click en el botón, mostrar submenú (el CSS se encarga del hover en escritorio, aquí manejamos clicks)
    if (window.innerWidth < 768) { // Solo en móvil para click
        btnSearch.addEventListener('click', (e) => {
            if (searchSubmenu.style.display !== 'block') {
                e.preventDefault(); // Evitar que envíe el formulario si está cerrado
                searchSubmenu.style.display = 'block';
            } else {
                // Si está abierto, el submit normal del formulario funcionará
            }
        });
    } else {
        // En escritorio, el submenú se muestra con hover en CSS
    }

    // Al hacer click en un destino del submenú, rellenar el input y cerrar
    searchSubmenu.querySelectorAll('a').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const dest = e.target.getAttribute('data-destination');
            destinationInput.value = dest;
            searchSubmenu.style.display = 'none'; // Cerrar submenú
        });
    });


    // --- 3. FUNCIONALIDAD DEL BUSCADOR (Requerimiento 7) ---
    // Simular búsqueda real
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const dest = destinationInput.value;
        const inDate = checkinInput.value;
        const outDate = checkoutInput.value;
        const guests = guestsInput.value || '2 adultos · 1 hab.'; // Valor por defecto

        if (!dest) {
            alert('Por favor, ingresa un destino.');
            return;
        }

        // Simular carga y mostrar resultados
        showResults(dest, inDate, outDate, guests);
    });

    // Función para mostrar la sección de resultados (Requerimiento 7)
    const showResults = (dest, inDate, outDate, guests) => {
        // Ocultar otras secciones
        heroSection.classList.add('hidden');
        destinationsSection.classList.add('hidden');
        bookingSection.classList.add('hidden');
        resultsSection.classList.remove('hidden');

        // Formatear resumen
        let summaryText = `Destino: ${dest}`;
        if (inDate && outDate) summaryText += ` | Entrada: ${inDate} | Salida: ${outDate}`;
        summaryText += ` | ${guests}`;
        searchSummary.textContent = summaryText;

        // Buscar hoteles mock (insensible a mayúsculas)
        const matchedHotels = mockHotels[dest] || []; // Usamos dest exacto como clave, o [] si no hay

        // Limpiar grid anterior
        resultsGrid.innerHTML = '';

        if (matchedHotels.length > 0) {
            matchedHotels.forEach(hotel => {
                const hotelCard = `
                    <article class="hotel-card">
                        <div class="hotel-img-container">
                            <img src="${hotel.img}" alt="${hotel.name}">
                        </div>
                        <div class="hotel-info">
                            <div class="hotel-details">
                                <div class="hotel-title-area">
                                    <h3>${hotel.name}</h3>
                                    <p class="stars">${'★'.repeat(hotel.stars)}</p>
                                    <p class="location">${hotel.location}</p>
                                </div>
                                <div class="rating-area">
                                    <span class="rating-score">${hotel.ratingScore.toFixed(1)}</span>
                                    <p class="rating-text">${hotel.ratingText}</p>
                                    <p class="reviews">${hotel.reviews} opiniones</p>
                                </div>
                            </div>
                            <div class="hotel-pricing-area">
                                <p class="deal-text">¡Mejor trato!</p>
                                <div class="price-box">
                                    <p class="price-value">S/ ${hotel.price.toFixed(2)}</p>
                                    <p class="price-details">por noche</p>
                                </div>
                                <button class="btn-primary btn-reserve" data-hotel-id="${hotel.id}">Ver oferta</button>
                            </div>
                        </div>
                    </article>
                `;
                resultsGrid.innerHTML += hotelCard;
            });

            // Asignar eventos a los botones de reservar
            const reserveBtns = resultsGrid.querySelectorAll('.btn-reserve');
            reserveBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const hotelId = e.target.getAttribute('data-hotel-id');
                    const hotelData = matchedHotels.find(h => h.id == hotelId);
                    showBooking(hotelData, { dest, inDate, outDate, guests });
                });
            });

        } else {
            resultsGrid.innerHTML = `<p class="no-results">Lo sentimos, no hemos encontrado hoteles disponibles en "${dest}" para estas fechas con nuestros datos simulados. Intenta con "Cusco", "Lima" o "Máncora".</p>`;
        }
    };


    // --- 4. FUNCIONALIDAD DE DESTINOS Y PAGO (Requerimiento 8) ---
    // Al seleccionar un destino popular en el Hero, llevar directamente a reserva
    destinationCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const destName = card.querySelector('h3').textContent;
            
            // Simular datos de búsqueda por defecto
            const searchData = {
                dest: destName,
                inDate: '2023-11-15', // Simulado
                outDate: '2023-11-20', // Simulado
                guests: '2 adultos · 1 hab.'
            };

            // Simular que el usuario seleccionó el primer hotel de ese destino
            const hotelData = mockHotels[destName] ? mockHotels[destName][0] : null;

            if (hotelData) {
                showBooking(hotelData, searchData);
            } else {
                alert(`No hemos encontrado hoteles disponibles para ${destName} en nuestra base de datos simulada.`);
            }
        });
    });

    // Función para mostrar la sección de reserva (Requerimiento 8)
    const showBooking = (hotel, search) => {
        // Ocultar otras secciones
        heroSection.classList.add('hidden');
        destinationsSection.classList.add('hidden');
        resultsSection.classList.add('hidden');
        bookingSection.classList.remove('hidden');

        // Generar resumen de reserva lateral
        generateBookingSummary(hotel, search);
    };

    // Generar el resumen HTML del sidebar de reserva
    const generateBookingSummary = (hotel, search) => {
        const numNights = 5; // Simulado
        const subtotal = hotel.price * numNights;
        const total = subtotal; // Simulado (sin impuestos por simplicidad)

        const summaryHTML = `
            <div class="summary-header">
                <h3>Tu reserva, de un vistazo</h3>
            </div>
            <div class="summary-body">
                <div class="summary-hotel-info">
                    <img src="${hotel.img}" alt="${hotel.name}" class="summary-hotel-img">
                    <div class="summary-hotel-details">
                        <h4>${hotel.name}</h4>
                        <p class="stars">${'★'.repeat(hotel.stars)}</p>
                        <p class="location">${hotel.location}, Perú</p>
                    </div>
                </div>
                
                <div class="summary-stay">
                    <p><strong>Entrada:</strong> Mié, 15 nov 2023</p>
                    <p><strong>Salida:</strong> Lun, 20 nov 2023</p>
                    <p><strong>Huéspedes y habitaciones:</strong> ${search.guests}</p>
                    <p><strong>Estancia total:</strong> ${numNights} noches</p>
                </div>
                
                <div class="summary-pricing">
                    <h4>Detalle del precio</h4>
                    <div class="price-breakdown-row">
                        <span>Habitación (${numNights} noches)</span>
                        <span>S/ ${subtotal.toFixed(2)}</span>
                    </div>
                    <div class="price-breakdown-row">
                        <span>Impuestos y tasas de servicio</span>
                        <span>Incluidos</span>
                    </div>
                    
                    <div class="price-total">
                        <span>Total a pagar</span>
                        <span>S/ ${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        `;
        bookingSummaryAside.innerHTML = summaryHTML;
    };

    // Manejar el submit final de la reserva
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Gracias por tu reserva! (Esto es una simulación).');
        // Aquí se enviaría la reserva al servidor.
        location.reload(); // Recargar la página para volver al inicio
    });

});
