document.addEventListener('DOMContentLoaded', () => {

    // Imágenes del Slider principal (Paisajes turísticos de alta calidad)
    const sliderImages = [
        'https://images.unsplash.com/photo-1589182337358-2fabd1a358c6?auto=format&fit=crop&w=1600&q=80', // Machu Picchu / Cusco
        'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=80', // Costa / Lima
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80'  // Playa / Máncora
    ];

    // Base de datos simulada con imágenes estables de hoteles
    const mockHotels = {
        'Cusco': [
            { id: 101, name: 'Hotel Monasterio', stars: 5, location: 'Centro Histórico', ratingScore: 9.3, ratingText: 'Excelente', reviews: 1450, price: 567.50, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80' },
            { id: 102, name: 'Tierra Viva Cusco San Blas', stars: 4, location: 'San Blas', ratingScore: 8.9, ratingText: 'Fabuloso', reviews: 1120, price: 345.00, img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=500&q=80' }
        ],
        'Lima': [
            { id: 201, name: 'AC Hotel by Marriott Lima Miraflores', stars: 5, location: 'Miraflores', ratingScore: 9.1, ratingText: 'Excelente', reviews: 980, price: 610.00, img: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=500&q=80' }
        ],
        'Máncora': [
            { id: 301, name: 'Selina Mancora', stars: 3, location: 'Playa Máncora', ratingScore: 8.5, ratingText: 'Muy Bueno', reviews: 2100, price: 178.00, img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=500&q=80' }
        ]
    };

    const sliderWrapper = document.getElementById('slider-wrapper');
    const prevSlide = document.getElementById('prevSlide');
    const nextSlide = document.getElementById('nextSlide');

    const searchForm = document.getElementById('search-form');
    const destinationInput = document.getElementById('destination');
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const guestsInput = document.getElementById('guests');
    const btnSearch = document.querySelector('.btn-search');
    const searchSubmenu = document.querySelector('.search-submenu');

    const heroSection = document.querySelector('.hero-section');
    const destinationsSection = document.querySelector('.destinations-section');
    const resultsSection = document.getElementById('results-section');
    const searchSummary = document.getElementById('search-summary');
    const resultsGrid = document.querySelector('.results-grid');

    const bookingSection = document.getElementById('booking-section');
    const bookingForm = document.getElementById('booking-form');
    const bookingSummaryAside = document.getElementById('booking-summary-aside');
    const destinationCards = document.querySelectorAll('.destination-card');

    // --- 1. CONFIGURACIÓN DEL SLIDER ---
    let currentSlide = 0;
    const totalSlides = sliderImages.length;

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
    setInterval(nextSlideFunc, 5000);

    // --- 2. SUBMENÚ Y BÚSQUEDA ---
    if (window.innerWidth < 768) {
        btnSearch.addEventListener('click', (e) => {
            if (searchSubmenu.style.display !== 'block') {
                e.preventDefault();
                searchSubmenu.style.display = 'block';
            }
        });
    }

    searchSubmenu.querySelectorAll('a').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            destinationInput.value = e.target.getAttribute('data-destination');
            searchSubmenu.style.display = 'none';
        });
    });

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const dest = destinationInput.value;
        showResults(dest, checkinInput.value, checkoutInput.value, guestsInput.value || '2 adultos · 1 hab.');
    });

    const showResults = (dest, inDate, outDate, guests) => {
        heroSection.classList.add('hidden');
        destinationsSection.classList.add('hidden');
        bookingSection.classList.add('hidden');
        resultsSection.classList.remove('hidden');

        searchSummary.textContent = `Destino: ${dest} | ${inDate && outDate ? 'Fechas seleccionadas' : ''} | ${guests}`;
        const matchedHotels = mockHotels[dest] || [];

        resultsGrid.innerHTML = '';
        if (matchedHotels.length > 0) {
            matchedHotels.forEach(hotel => {
                resultsGrid.innerHTML += `
                    <article class="hotel-card">
                        <div class="hotel-img-container"><img src="${hotel.img}" alt="${hotel.name}"></div>
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
            });

            resultsGrid.querySelectorAll('.btn-reserve').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const hotel = matchedHotels.find(h => h.id == e.target.getAttribute('data-hotel-id'));
                    showBooking(hotel, { guests });
                });
            });
        } else {
            resultsGrid.innerHTML = `<p class="no-results">No hay hoteles simulados para "${dest}". Prueba buscando "Cusco", "Lima" o "Máncora".</p>`;
        }
    };

    destinationCards.forEach(card => {
        card.addEventListener('click', () => {
            const destName = card.querySelector('h3').textContent;
            const hotel = mockHotels[destName] ? mockHotels[destName][0] : null;
            if (hotel) showBooking(hotel, { guests: '2 adultos · 1 hab.' });
        });
    });

    const showBooking = (hotel, search) => {
        heroSection.classList.add('hidden');
        destinationsSection.classList.add('hidden');
        resultsSection.classList.add('hidden');
        bookingSection.classList.remove('hidden');

        bookingSummaryAside.innerHTML = `
            <div class="summary-header"><h3>Tu reserva, de un vistazo</h3></div>
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
                    <p><strong>Estancia:</strong> 5 noches</p>
                    <p><strong>Huéspedes:</strong> ${search.guests}</p>
                </div>
                <div class="summary-pricing">
                    <h4>Detalle del precio</h4>
                    <div class="price-total"><span>Total a pagar</span><span>S/ ${(hotel.price * 5).toFixed(2)}</span></div>
                </div>
            </div>
        `;
    };

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Reserva completada con éxito!');
        location.reload();
    });
});
