// JavaScript para funcionalidades de la página dental

document.addEventListener('DOMContentLoaded', function() {
    
    // Menú hamburguesa para móviles
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');
    
    if(hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Slider Hero
    const heroSlider = $('.hero-slider');
    heroSlider.owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 6000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
    
    // Controles del slider hero
    $('.next-btn').click(function() {
        heroSlider.trigger('next.owl.carousel');
    });
    
    $('.prev-btn').click(function() {
        heroSlider.trigger('prev.owl.carousel');
    });
    
    // Slider Testimonios
    const testimonialSlider = $('.testimonials-slider');
    testimonialSlider.owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 5000,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });
    
    // Controles del slider de testimonios
    $('.testimonial-next').click(function() {
        testimonialSlider.trigger('next.owl.carousel');
    });
    
    $('.testimonial-prev').click(function() {
        testimonialSlider.trigger('prev.owl.carousel');
    });
    
    // Formulario de contacto
    const appointmentForm = document.getElementById('appointmentForm');
    if(appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí normalmente enviaríamos los datos a un servidor
            // Por ahora solo mostraremos un mensaje de confirmación
            
            // Recopilar datos del formulario
            const formData = new FormData(appointmentForm);
            const data = Object.fromEntries(formData);
            
            // Mostrar mensaje de confirmación
            alert('¡Gracias por tu solicitud de cita! Te contactaremos en las próximas 24 horas para confirmar tu cita.');
            
            // Resetear formulario
            appointmentForm.reset();
        });
    }
    
    // Cambiar estilo del header al hacer scroll
    window.addEventListener('scroll', function() {
        if(window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Mostrar u ocultar botón para ir arriba
        const scrollToTopBtn = document.querySelector('.scroll-to-top');
        if(window.scrollY > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Botón para ir arriba
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Animación de aparición al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    document.querySelectorAll('.service-card, .team-member, .feature').forEach(element => {
        observer.observe(element);
    });
    
    // Botón de pedir cita flotante para móviles
    const createFloatingButton = () => {
        if(window.innerWidth <= 768) {
            // Verificar si el botón ya existe
            if(!document.querySelector('.floating-btn')) {
                const floatingBtn = document.createElement('a');
                floatingBtn.href = '#contacto';
                floatingBtn.className = 'floating-btn';
                floatingBtn.innerHTML = '<i class="fas fa-calendar-alt"></i> Pedir Cita';
                
                // Estilos del botón flotante
                floatingBtn.style.position = 'fixed';
                floatingBtn.style.bottom = '80px';
                floatingBtn.style.right = '20px';
                floatingBtn.style.backgroundColor = 'var(--primary-color)';
                floatingBtn.style.color = 'white';
                floatingBtn.style.padding = '15px 20px';
                floatingBtn.style.borderRadius = '50px';
                floatingBtn.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
                floatingBtn.style.zIndex = '999';
                floatingBtn.style.textDecoration = 'none';
                floatingBtn.style.fontWeight = 'bold';
                floatingBtn.style.display = 'flex';
                floatingBtn.style.alignItems = 'center';
                floatingBtn.style.justifyContent = 'center';
                floatingBtn.style.gap = '8px';
                floatingBtn.style.fontSize = '16px';
                
                document.body.appendChild(floatingBtn);
            }
        } else {
            // Eliminar el botón flotante en pantallas grandes
            const floatingBtn = document.querySelector('.floating-btn');
            if(floatingBtn) {
                floatingBtn.remove();
            }
        }
    };
    
    // Crear botón flotante al cargar y al redimensionar
    createFloatingButton();
    window.addEventListener('resize', createFloatingButton);
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Validación básica del formulario
    const formInputs = document.querySelectorAll('#appointmentForm input, #appointmentForm select, #appointmentForm textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if(!this.value.trim() && this.hasAttribute('required')) {
                this.style.borderColor = '#ff6b6b';
            } else {
                this.style.borderColor = '#ddd';
            }
        });
        
        input.addEventListener('input', function() {
            this.style.borderColor = '#ddd';
        });
    });
    
    // Asegurar que el header tenga el color correcto al cargar
    if(window.scrollY > 100) {
        header.classList.add('scrolled');
    }
    
    // Efecto parallax en el hero slider
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if(hero) {
            const rate = scrolled * 0.5;
            hero.style.transform = `translate3d(0px, ${rate}px, 0px)`;
        }
    });
});