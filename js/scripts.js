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

  const x = (clientX / width - 0.5) * 10; // Movimiento horizontal más suave
  const y = (clientY / height - 0.5) * 10; // Movimiento vertical más suave

  heroImage.style.setProperty('--x', `${x}px`);
  heroImage.style.setProperty('--y', `${y}px`);
});

// Animación de transición al hacer clic en "Continuar"
const continueButton = document.getElementById('continueButton');
const homeSection = document.getElementById('home');
const cocinaSection = document.getElementById('cocina');

continueButton.addEventListener('click', () => {
  homeSection.style.display = 'none';
  cocinaSection.classList.remove('hidden');
});
