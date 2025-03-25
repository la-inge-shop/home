document.addEventListener('DOMContentLoaded', () => {
  // ========== NAVEGACIÓN MÓVIL ==========
  const menuIcon = document.getElementById('menuIcon');
  const navLinks = document.getElementById('navLinks');
  
  menuIcon.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuIcon.classList.toggle('active');
  });

  // ========== CARRUSEL DE TESTIMONIOS ==========
  const testimonials = [
      { 
          name: "María González", 
          comment: "¡La mejor longaniza que he probado! Sabor auténtico y calidad premium.", 
          photo: "user1.jpg", 
          rating: 5 
      },
      // ... Agrega los 14 testimonios restantes aquí ...
      { 
          name: "Isabel Martínez", 
          comment: "Compromiso con lo natural y artesanal. ¡Mi tienda de confianza!", 
          photo: "user15.jpg", 
          rating: 5 
      }
  ];

  let currentTestimonial = 0;
  let autoSlideInterval;
  const carousel = document.getElementById('testimonialCarousel');
  let isDragging = false;
  let startX = 0;

  // Inicializar Carrusel
  function initTestimonials() {
      // Crear elementos del DOM para cada testimonio
      testimonials.forEach((testimonial, index) => {
          const testimonialElement = document.createElement('div');
          testimonialElement.className = `testimonial ${index === 0 ? 'active' : ''}`;
          testimonialElement.innerHTML = `
              <img src="assets/img/${testimonial.photo}" alt="${testimonial.name}" loading="lazy">
              <h4>${testimonial.name}</h4>
              <div class="rating">${'★'.repeat(testimonial.rating)}</div>
              <p>"${testimonial.comment}"</p>
          `;
          carousel.appendChild(testimonialElement);
      });

      // Event Listeners para interacción
      carousel.addEventListener('mouseenter', pauseAutoSlide);
      carousel.addEventListener('mouseleave', startAutoSlide);
      carousel.addEventListener('mousedown', startDrag);
      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('mouseup', endDrag);
  }

  // Control del Auto-Slide
  function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
          showNextTestimonial();
      }, 5000);
  }

  function pauseAutoSlide() {
      clearInterval(autoSlideInterval);
  }

  // Navegación entre Testimonios
  function showNextTestimonial() {
      updateTestimonialDisplay((current + 1) % testimonials.length);
  }

  function showPrevTestimonial() {
      updateTestimonialDisplay((current - 1 + testimonials.length) % testimonials.length);
  }

  function updateTestimonialDisplay(newIndex) {
      const testimonialsElements = document.querySelectorAll('.testimonial');
      
      testimonialsElements[currentTestimonial].classList.add('exit');
      testimonialsElements[currentTestimonial].classList.remove('active');
      
      setTimeout(() => {
          testimonialsElements.forEach(t => t.classList.remove('exit'));
          currentTestimonial = newIndex;
          testimonialsElements[currentTestimonial].classList.add('active');
      }, 300);
  }

  // Funcionalidad de Arrastre
  function startDrag(e) {
      isDragging = true;
      startX = e.clientX;
      carousel.style.cursor = 'grabbing';
  }

  function handleDrag(e) {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      
      if (Math.abs(deltaX) > 30) {
          deltaX > 0 ? showPrevTestimonial() : showNextTestimonial();
          startX = e.clientX;
      }
  }

  function endDrag() {
      isDragging = false;
      carousel.style.cursor = 'grab';
  }

  // ========== SCROLL SUAVE ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
          });
      });
  });

  // ========== BOTÓN SCROLL TO TOP ==========
  const scrollToTop = document.getElementById('scrollToTop');
  
  window.addEventListener('scroll', () => {
      scrollToTop.style.display = window.scrollY > 500 ? 'block' : 'none';
  });

  scrollToTop.addEventListener('click', () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });

  // ========== INICIALIZACIÓN ==========
  initTestimonials();
  startAutoSlide();
});
