// Funcionalidad del buscador en tiempo real
const searchBox = document.getElementById('searchBox');
const resultsDiv = document.getElementById('results');

if (searchBox) {
  searchBox.addEventListener('input', function() {
    const query = searchBox.value.trim();
    resultsDiv.textContent = query !== "" ? "Buscando: " + query : "";
  });
}

// Función para actualizar las imágenes de los iconos de la barra según el tema
function updateIconImages() {
  const iconImages = document.querySelectorAll('.icon-bar img');
  iconImages.forEach((img) => {
    const altText = img.alt.toLowerCase(); // "acuario", "pez" o "alga"
    if (document.body.classList.contains('dark-mode')) {
      if (altText === 'acuario') {
        img.src = "acuario_oscuro.jpg";
      } else if (altText === 'pez') {
        img.src = "pez_oscuro.jpg";
      } else if (altText === 'alga') {
        img.src = "alga_oscura.jpg";
      }
    } else {
      if (altText === 'acuario') {
        img.src = "acuario.jpg";
      } else if (altText === 'pez') {
        img.src = "pez.jpg";
      } else if (altText === 'alga') {
        img.src = "alga.jpg";
      }
    }
  });
}

// Al cargar el DOM se genera el contenido de las tarjetas según el tema
// y se sincroniza el tema entre todas las páginas.
document.addEventListener('DOMContentLoaded', function() {
  const speciesContainer = document.getElementById('species-container');
  let speciesArray = [];

  // Se obtiene el nombre del archivo actual para seleccionar el array correspondiente
  let path = window.location.pathname;
  let page = path.substring(path.lastIndexOf('/') + 1);

  if (page === "plantaacuatica.html") {
    // Array para tema de Plantas Acuáticas
    speciesArray = [
      {
        name: "Nenúfar",
        description: "Flor acuática elegante que adorna lagunas y estanques.",
        image: "nenufar.jpg"
      },
      {
        name: "Jacinto de Agua",
        description: "Planta flotante conocida por sus vibrantes colores y fragancia.",
        image: "jacinto.jpg"
      },
      {
        name: "Lirio de Agua",
        description: "Planta con hojas alargadas y flores delicadas que emergen del agua.",
        image: "lirio.jpg"
      }
    ];
  } else if (page === "acuarios.html") {
    // Array para el tema de Acuarios
    speciesArray = [
      {
        name: "Acuario de Agua Dulce",
        description: "Diseñado para recrear ecosistemas de ríos y lagos en miniatura.",
        image: "acuarium_dulce.jpg"
      },
      {
        name: "Acuario de Agua Salada",
        description: "Ideal para exhibir coloridos corales y especies marinas exóticas.",
        image: "acuarium_salada.jpg"
      },
      {
        name: "Acuario Plantado",
        description: "Combina flora y fauna en un ecosistema equilibrado y estético.",
        image: "acuarium_plantado.jpg"
      }
    ];
  } else {
    // Por defecto para especies marinas generales en index.html
    speciesArray = [
      {
        name: "Pez Payaso",
        description: "Pequeño pez colorido conocido por vivir en anémonas.",
        image: "pez_payaso.jpg"
      },
      {
        name: "Tiburón Blanco",
        description: "Feroz depredador de los océanos, símbolo de fuerza marina.",
        image: "tiburon_blanco.jpg"
      },
      {
        name: "Estrella de Mar",
        description: "Con sus brazos radiales, ilumina las costas con su singular belleza.",
        image: "estrella_mar.jpg"
      }
    ];
  }

  // Generar las tarjetas de especies a partir del array correspondiente
  speciesArray.forEach(item => {
    // Crear tarjeta principal
    const card = document.createElement('div');
    card.className = 'species-card';

    // Contenedor para la imagen
    const imgContainer = document.createElement('div');
    imgContainer.className = 'card-img';
    const cardImg = document.createElement('img');
    cardImg.src = item.image;
    cardImg.alt = item.name;
    imgContainer.appendChild(cardImg);

    // Contenedor para la información (nombre, descripción y botón)
    const infoContainer = document.createElement('div');
    infoContainer.className = 'card-info';
    const title = document.createElement('h2');
    title.textContent = item.name;
    const description = document.createElement('p');
    description.textContent = item.description;
    const button = document.createElement('button');
    button.className = 'leer-mas';
    button.textContent = 'Leer más';

    // Al pulsar "Leer más" se redirecciona al archivo con el mismo nombre de la imagen (.jpg -> .html)
    button.addEventListener('click', function() {
      let pageLink = item.image.replace(/\.jpg$/i, '.html');
      window.location.href = pageLink;
    });

    infoContainer.appendChild(title);
    infoContainer.appendChild(description);
    infoContainer.appendChild(button);

    // Combinar la imagen y la información en la tarjeta
    card.appendChild(imgContainer);
    card.appendChild(infoContainer);
    speciesContainer.appendChild(card);
  });

  // ------------------- Funcionalidad del menú lateral -------------------

  const menuButton = document.getElementById('menuButton');
  const sideMenu = document.getElementById('sideMenu');
  const overlay = document.getElementById('overlay');
  const closeMenu = document.getElementById('closeMenu');

  function openMenu() {
    sideMenu.classList.add('active');
    overlay.classList.add('active');
    // Deshabilitar interacción y scroll en el fondo
    document.body.style.overflow = 'hidden';
  }

  function closeMenuFunction() {
    sideMenu.classList.remove('active');
    overlay.classList.remove('active');
    // Restaurar scroll e interacción
    document.body.style.overflow = '';
  }

  if (menuButton) {
    menuButton.addEventListener('click', openMenu);
  }
  if (overlay) {
    overlay.addEventListener('click', closeMenuFunction);
  }
  if (closeMenu) {
    closeMenu.addEventListener('click', closeMenuFunction);
  }

  // ------------------- Funcionalidad para cambiar entre modo claro y oscuro -------------------

  const themeToggle = document.getElementById('themeToggle');
  
  // Cargar el tema almacenado en localStorage, si existe, y actualizar la interfaz
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeToggle) {
      themeToggle.textContent = 'modo: oscuro';
    }
  } else {
    document.body.classList.remove('dark-mode');
    if (themeToggle) {
      themeToggle.textContent = 'modo: claro';
    }
  }
  
  // Actualizar los iconos según el tema actual
  updateIconImages();

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        themeToggle.textContent = 'modo: claro';
        localStorage.setItem('theme', 'light');
      } else {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = 'modo: oscuro';
        localStorage.setItem('theme', 'dark');
      }
      // Actualizar los iconos al cambiar el tema
      updateIconImages();
    });
  }
});