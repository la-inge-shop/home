// Controlar el scroll automático entre secciones
let currentSectionIndex = 0;
const sections = document.querySelectorAll('.section');

function scrollToSection(index) {
  if (index >= 0 && index < sections.length) {
    currentSectionIndex = index;
    sections[currentSectionIndex].scrollIntoView({
