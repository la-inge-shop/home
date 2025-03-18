// Contador de visitas con JSONBin
const JSONBIN_URL = "https://api.jsonbin.io/v3/b/67d223698561e97a50ead685"; // Reemplaza con tu Bin ID
const JSONBIN_HEADERS = {
  "Content-Type": "application/json",
  "X-Master-Key": "$2a$10$gXAeMiY4L81C8vAEsVxN6uA/EQ.T/h80zTtFsLAoYMahNWGQYlnHq" // Reemplaza con tu Master Key
};
const counterElement = document.getElementById('counter');

async function fetchVisits() {
  try {
    counterElement.textContent = "Visitas: Cargando...";
    const response = await fetch(JSONBIN_URL, { method: "GET", headers: JSONBIN_HEADERS });
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const data = await response.json();
    const visits = data.record.visits || 0;
    counterElement.textContent = `Visitas: ${visits}`;
    updateVisits(visits);
  } catch (error) {
    console.error("Error al obtener las visitas:", error.message);
    counterElement.textContent = "Visitas: Error";
  }
}

async function updateVisits(currentVisits) {
  const newVisits = parseInt(currentVisits) + 1;
  try {
    await fetch(JSONBIN_URL, {
      method: "PUT",
      headers: JSONBIN_HEADERS,
      body: JSON.stringify({ visits: newVisits })
    });
  } catch (error) {
    console.error("Error al actualizar las visitas:", error.message);
  }
}

// Inicializar el contador de visitas
fetchVisits();

// Controlar el scroll automático entre secciones
let currentSectionIndex = 0;
const sections = document.querySelectorAll('.section');

function scrollToSection(index) {
  if (index >= 0 && index < sections.length) {
    currentSectionIndex = index;
    sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
    activateAnimations();
  }
}

function activateAnimations() {
  // Aquí puedes agregar animaciones específicas para cada sección
}