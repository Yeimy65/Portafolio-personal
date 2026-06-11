// ── NAVEGACIÓN ENTRE SECCIONES ──────────────────────────────
const links = document.querySelectorAll('[data-page]');
const pages = document.querySelectorAll('.page');

links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const pageId = link.dataset.page;

    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
  });
});

// ── ANIMACIÓN TARJETAS DE PROYECTOS ─────────────────────────
const cards = document.querySelectorAll('.project-card');

cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.classList.add('destacada');
  });
  card.addEventListener('mouseleave', () => {
    card.classList.remove('destacada');
  });
});

// ── FUNCIÓN ALERTAS ──────────────────────────────────────────
function mostrarAlerta(mensaje, tipo) {
  const alerta = document.getElementById('alerta');
  alerta.textContent = mensaje;
  alerta.className = 'alerta ' + tipo;
  alerta.classList.add('visible');

  setTimeout(() => {
    alerta.classList.remove('visible');
  }, 3000);
}

// ── VALIDACIÓN Y ENVÍO DEL FORMULARIO ───────────────────────
const form = document.getElementById('contactForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre  = document.getElementById('nombre').value.trim();
  const email   = document.getElementById('email').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();

  // Validaciones frontend
  if (nombre.length < 3) {
    mostrarAlerta('El nombre debe tener al menos 3 caracteres.', 'error');
    return;
  }

  if (!email.includes('@')) {
    mostrarAlerta('Ingresa un correo electrónico válido.', 'error');
    return;
  }

  if (mensaje.length < 10) {
    mostrarAlerta('El mensaje debe tener al menos 10 caracteres.', 'error');
    return;
  }

  // Envío al backend
  try {
    const respuesta = await fetch('/api/contacto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, mensaje })
    });

    const data = await respuesta.json();

    if (data.ok) {
      mostrarAlerta(data.msg, 'exito');
      form.reset();
    } else {
      mostrarAlerta(data.msg, 'error');
    }

  } catch (error) {
    mostrarAlerta('No se pudo conectar con el servidor.', 'error');
  }
});