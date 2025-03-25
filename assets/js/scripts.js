document.addEventListener('DOMContentLoaded', () => {
  // Menú móvil
  const menuIcon = document.getElementById('menuIcon');
  const navLinks = document.getElementById('navLinks');
  
  menuIcon.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuIcon.classList.toggle('active');
  });

  // Cerrar menú al hacer clic en un enlace
  document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
          navLinks.classList.remove('active');
          menuIcon.classList.remove('active');
      });
  });

  // Carrusel de testimonios
  const testimonials = [
      { 
          name: "María G.", 
          comment: "¡La mejor experiencia! La longaniza es increíble, con un sabor único que no encuentras en otro lugar.", 
          photo: "user1.jpg", 
          rating: 5 
      },
      { 
          name: "Carlos M.", 
          comment: "Calidad premium en todos sus productos. Los quesos madurados son simplemente excepcionales.", 
          photo: "user2.jpg", 
          rating: 5 
      },
      { 
          name: "Ana L.", 
          comment: "Productos frescos y deliciosos. Las mermeladas naturales son mi debilidad, ¡siempre pido más!", 
          photo: "user3.jpg", 
          rating: 5 
      },
      { 
          name: "Pedro R.", 
          comment: "Servicio impecable y atención personalizada. Recomiendo sus botanas artesanales para cualquier reunión.", 
          photo: "user4.jpg", 
          rating: 4 
      },
      { 
          name: "Luisa T.", 
          comment: "Sabores auténticos que te transportan. Los dulces regionales son exactamente como los hacía mi abuela.", 
          photo: "user5.jpg", 
          rating: 5 
      },
      { 
          name: "Jorge S.", 
          comment: "Entrega puntual y productos bien empacados. El chorizo casero es el mejor que he probado.", 
          photo: "user6.jpg", 
          rating: 5 
      }
  ];

  let currentGroup = 0;
  const carousel = document.getElementById('testimonialCarousel');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  
  // Crear grupos de testimonios
  const createTestimonialGroups = () => {
      carousel.innerHTML = '';
      const testimonialsPerGroup = window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3;
      
      for(let i = 0; i < testimonials.length; i += testimonialsPerGroup) {
          const group = document.createElement('div');
          group.className = 'testimonial-group';
          
          const groupTestimonials = testimonials.slice(i, i + testimonialsPerGroup);
          groupTestimonials.forEach(testimonial => {
              group.innerHTML += `
                  <div class="testimonial">
                      <img src="assets/img/${testimonial.photo}" alt="${testimonial.name}">
                      <h4>${testimonial.name}</h4>
                      <div class="rating">${'★'.repeat(testimonial.rating)}${testimonial.rating < 5 ? '☆'.repeat(5 - testimonial.rating) : ''}</div>
                      <p>"${testimonial.comment}"</p>
                  </div>
              `;
          });
          
          carousel.appendChild(group);
      }
  };
  
  // Inicializar carrusel
  createTestimonialGroups();
  
  // Navegación del carrusel
  const updateCarousel = () => {
      const groupWidth = 100 / (testimonials.length / (window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3));
      carousel.style.transform = `translateX(-${currentGroup * groupWidth}%)`;
  };
  
  prevBtn.addEventListener('click', () => {
      currentGroup = (currentGroup - 1 + (testimonials.length / (window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3))) % (testimonials.length / (window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3));
      updateCarousel();
  });
  
  nextBtn.addEventListener('click', () => {
      currentGroup = (currentGroup + 1) % (testimonials.length / (window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3));
      updateCarousel();
  });
  
  // Navegación automática
  let autoSlide = setInterval(() => {
      currentGroup = (currentGroup + 1) % (testimonials.length / (window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3));
      updateCarousel();
  }, 5000);
  
  // Pausar navegación automática al interactuar
  carousel.addEventListener('mouseenter', () => {
      clearInterval(autoSlide);
  });
  
  carousel.addEventListener('mouseleave', () => {
      autoSlide = setInterval(() => {
          currentGroup = (currentGroup + 1) % (testimonials.length / (window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3));
          updateCarousel();
      }, 5000);
  });
  
  // Recrear grupos al cambiar el tamaño de la ventana
  window.addEventListener('resize', () => {
      createTestimonialGroups();
      updateCarousel();
  });
  
  // Scroll suave
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              window.scrollTo({
                  top: target.offsetTop - 70,
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Scroll to Top
  const scrollToTop = document.getElementById('scrollToTop');
  window.addEventListener('scroll', () => {
      scrollToTop.style.display = window.scrollY > 500 ? 'flex' : 'none';
  });
  
  scrollToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // Efecto de navbar al hacer scroll
  window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
          navbar.style.padding = '1rem 5%';
          navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
      } else {
          navbar.style.padding = '1.5rem 5%';
          navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
      }
  });
  
  // Animación de elementos al hacer scroll
  const animateOnScroll = () => {
      const elements = document.querySelectorAll('.section-title, .product-card, .specialty-card, .testimonial, .contact-form');
      
      elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.3;
          
          if (elementPosition < screenPosition) {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0)';
          }
      });
  };
  
  // Inicializar animaciones
  window.addEventListener('load', () => {
      const animatedElements = document.querySelectorAll('.section-title, .product-card, .specialty-card, .testimonial, .contact-form');
      animatedElements.forEach(element => {
          element.style.opacity = '0';
          element.style.transform = 'translateY(30px)';
          element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      });
      
      animateOnScroll();
  });
  
  window.addEventListener('scroll', animateOnScroll);
  
  // Formulario de contacto
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
          e.preventDefault();
          // Aquí iría la lógica para enviar el formulario
          alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
          contactForm.reset();
      });
  }
});
