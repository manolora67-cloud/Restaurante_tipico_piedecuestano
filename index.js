document.addEventListener('DOMContentLoaded', () => {

    // 1. Inicializar AOS (Animaciones al hacer scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,   // Duración de la animación
            once: true,      // La animación solo ocurre una vez
            offset: 100      // Offset de activación
        });
    }

    // 2. Preloader (Pantalla de carga)
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => { preloader.remove(); }, 500);
        }
    });

    // 3. Navegación (Menú Móvil y Scroll)
    const navbar = document.querySelector('.navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollTopBtn = document.getElementById('scrollTop');

    // Toggle Menú Móvil
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Efecto Scroll en Navbar y Botón Subir
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        // Navbar styling
        if (currentScroll > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.05)';
        }

        // Botón Subir
        if (scrollTopBtn) {
            if (currentScroll > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }

        // Resaltar enlace activo según la sección
        let currentSection = '';
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (currentScroll >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    });

    // 4. Tabs del Menú (Cambio de categorías)
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');

    if (menuTabs.length > 0) {
        menuTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remover active de todos
                menuTabs.forEach(t => t.classList.remove('active'));
                menuCategories.forEach(c => c.classList.remove('active'));

                // Agregar active al clickeado
                tab.classList.add('active');
                const category = tab.getAttribute('data-tab');
                document.getElementById(category).classList.add('active');
            });
        });
    }

    // 5. Formulario de Reservas
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        // Configurar fecha mínima (hoy)
        const dateInput = document.getElementById('date');
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);

        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simular envío
            const submitBtn = reservationForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('¡Gracias por tu reserva! Te contactaremos al teléfono proporcionado para confirmar.');
                reservationForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

});