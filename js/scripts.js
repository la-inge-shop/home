// Menú desplegable al pasar el mouse
const menuToggle = document.querySelector('.menu-icon');
const navbarNav = document.getElementById('navbarNav');

menuToggle.addEventListener('mouseover', () => {
  navbarNav.classList.add('open');
});

navbarNav.addEventListener('mouseleave', () => {
  navbarNav.classList.remove('open');
});

// Efecto interactivo en la imagen (parallax hover)
const imageContainer = document.querySelector('.image-container');
const heroImage = document.querySelector('.hero-image');

imageContainer.addEventListener('mousemove', (e) => {
  const { offsetWidth: width, offsetHeight: height } = imageContainer;
  const { clientX, clientY } = e;

  const x = (clientX / width - 0.5) * 20; // Movimiento horizontal
  const y = (clientY / height - 0.5) * 20; // Movimiento vertical

  heroImage.style.setProperty('--x', `${x}px`);
  heroImage.style.setProperty('--y', `${y}px`);
});
