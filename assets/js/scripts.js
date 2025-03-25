document.addEventListener('DOMContentLoaded', () => {
    // Menú móvil
    const menuIcon = document.getElementById('menuIcon');
    const navLinks = document.getElementById('navLinks');
    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuIcon.classList.toggle('active');
    });

    // Testimonios (15 comentarios)
    const testimonials = [
        { name: "María G.", comment: "¡La mejor experiencia gastronómica!", photo: "user1.jpg", rating: 5 },
        { name: "Carlos M.", comment: "Calidad premium a precio justo", photo: "user2.jpg", rating: 5 },
        { name: "Ana L.", comment: "Productos frescos y deliciosos", photo: "user3.jpg", rating: 5 },
        { name: "Pedro R.", comment: "Servicio impecable", photo: "user4.jpg", rating: 4 },
        { name: "Luisa T.", comment: "Sabores auténticos", photo: "user5.jpg", rating: 5 },
        { name: "Jorge S.", comment: "Entrega puntual", photo: "user6.jpg", rating: 5 },
        { name: "Sofía M.", comment: "Recomendado 100%", photo: "user7.jpg", rating: 5 },
        { name: "Miguel Á.", comment: "Empaque perfecto", photo: "user8.jpg", rating: 4 },
        { name: "Elena C.", comment: "Sabor inigualable", photo: "user9.jpg", rating: 5 },
        { name: "David P.", comment: "Productos orgánicos reales", photo: "user10.jpg", rating: 5 },
        { name: "Laura G.", comment: "Atención personalizada", photo: "user11.jpg", rating: 5 },
        { name: "Roberto S.", comment: "Mi tienda favorita", photo: "user12.jpg", rating: 5 },
        { name: "Carmen V.", comment: "Calidad constante", photo: "user13.jpg", rating: 5 },
        { name: "Fernando R.", comment: "Entrega rápida", photo: "user14.jpg", rating: 4 },
        { name: "Isabel M.", comment: "Sabor tradicional", photo: "user15.jpg", rating: 5 }
    ];

    let currentTestimonial = 0;
    let autoSlideInterval;
    const carousel = document.getElementById('testimonialCarousel');

    // Inicializar carrusel
    function initTestimonials() {
        testimonials.forEach((testimonial, index) => {
            const div = document.createElement('div');
            div.className = `testimonial ${index === 0 ? 'active' : ''}`;
            div.innerHTML = `
                <img src="assets/img/${testimonial.photo}" alt="${testimonial.name}" loading="lazy">
                <h4>${testimonial.name}</h4>
                <div class="rating">${'★'.repeat(testimonial.rating)}</div>
                <p>"${testimonial.comment}"</p>
            `;
            carousel.appendChild(div);
        });

        // Control hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
            carousel.style.cursor = 'grab';
        });

        carousel.addEventListener('mouseleave', startAutoSlide);

        // Desplazamiento manual
        carousel.addEventListener('mousemove', (e) => {
            if(e.movementX > 5) nextTestimonial();
        });

        startAutoSlide();
    }

    function showTestimonial(index) {
        const testimonials = document.querySelectorAll('.testimonial');
        testimonials.forEach(t => t.classList.remove('active', 'exit'));
        
        const nextTestimonial = testimonials[index];
        nextTestimonial.classList.add('active');
    }

    function nextTestimonial() {
        const current = document.querySelector('.testimonial.active');
        if(current) current.classList.add('exit');
        
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        setTimeout(() => showTestimonial(currentTestimonial), 300);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextTestimonial, 5000);
    }

    initTestimonials();

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Scroll to top
    const scrollToTop = document.getElementById('scrollToTop');
    window.addEventListener('scroll', () => {
        scrollToTop.style.display = window.scrollY > 500 ? 'block' : 'none';
    });
    scrollToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
