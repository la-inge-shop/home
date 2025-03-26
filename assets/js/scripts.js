document.addEventListener('DOMContentLoaded', () => {
    // ========== MENÚ MÓVIL ==========
    const menuIcon = document.getElementById('menuIcon');
    const navLinks = document.getElementById('navLinks');
    
    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuIcon.classList.toggle('active');
    });
  
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
        },
        { 
            name: "Fernanda V.", 
            comment: "La atención al cliente es excelente y los productos siempre llegan en perfecto estado. ¡100% recomendado!", 
            photo: "user7.jpg", 
            rating: 5 
        },
        { 
            name: "Ricardo P.", 
            comment: "He probado muchas marcas artesanales, pero ninguna se compara con la calidad de La Inge Shop.", 
            photo: "user8.jpg", 
            rating: 5 
        },
        { 
            name: "Gabriela M.", 
            comment: "Las salsas artesanales son el acompañamiento perfecto para todos mis platillos. ¡Deliciosas!", 
            photo: "user9.jpg", 
            rating: 4 
        },
        { 
            name: "Oscar L.", 
            comment: "Productos con sabores tradicionales pero con presentación moderna. Perfecto para regalos corporativos.", 
            photo: "user10.jpg", 
            rating: 5 
        },
        { 
            name: "Patricia C.", 
            comment: "La variedad de productos es impresionante. Cada mes pruebo algo nuevo y nunca decepcionan.", 
            photo: "user11.jpg", 
            rating: 5 
        },
        { 
            name: "Eduardo N.", 
            comment: "El proceso de compra es muy sencillo y la entrega super rápida. ¡Volveré a ordenar pronto!", 
            photo: "user12.jpg", 
            rating: 5 
        },
        { 
            name: "Sofía R.", 
            comment: "Los ingredientes son de la más alta calidad. Se nota que cuidan cada detalle de sus productos.", 
            photo: "user13.jpg", 
            rating: 5 
        },
        { 
            name: "Miguel Á.", 
            comment: "Como chef profesional, valoro mucho la autenticidad de sus sabores. Son mis proveedores favoritos.", 
            photo: "user14.jpg", 
            rating: 5 
        },
        { 
            name: "Daniela Z.", 
            comment: "El balance perfecto entre tradición e innovación. Cada producto cuenta una historia deliciosa.", 
            photo: "user15.jpg", 
            rating: 5 
        }
    ];
  
    let currentTestimonials = [];
    const carousel = document.getElementById('testimonialCarousel');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    let autoSlide;
    
    // Efecto de flotación para los testimonios
    const applyFloatEffect = () => {
        const testimonials = document.querySelectorAll('.testimonial');
        testimonials.forEach((testimonial, index) => {
            testimonial.style.animation = `float 4s ease-in-out ${index * 0.2}s infinite alternate`;
        });
    };
    
    // Mezclar testimonios aleatoriamente
    const shuffleTestimonials = () => {
        currentTestimonials = [...testimonials].sort(() => 0.5 - Math.random());
    };
    
    // Efecto de transición elaborada
    const elaborateTransition = (callback) => {
        carousel.style.transform = 'scale(0.95)';
        carousel.style.opacity = '0';
        carousel.style.filter = 'blur(2px)';
        carousel.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
        
        setTimeout(() => {
            callback();
            
            setTimeout(() => {
                carousel.style.transform = 'scale(1)';
                carousel.style.opacity = '1';
                carousel.style.filter = 'blur(0)';
                applyFloatEffect();
            }, 50);
        }, 600);
    };
    
    // Mostrar testimonios
    const showTestimonials = () => {
        const testimonialsPerGroup = window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3;
        const testimonialsToShow = currentTestimonials.slice(0, testimonialsPerGroup);
        
        carousel.innerHTML = '';
        const group = document.createElement('div');
        group.className = 'testimonial-group';
        
        testimonialsToShow.forEach(testimonial => {
            group.innerHTML += `
                <div class="testimonial">
                    <img src="assets/img/${testimonial.photo}" alt="${testimonial.name}" loading="lazy">
                    <h4>${testimonial.name}</h4>
                    <div class="rating">${'★'.repeat(testimonial.rating)}${testimonial.rating < 5 ? '☆'.repeat(5 - testimonial.rating) : ''}</div>
                    <p>"${testimonial.comment}"</p>
                </div>
            `;
        });
        
        carousel.appendChild(group);
        applyFloatEffect();
    };
    
    // Cambiar a siguientes testimonios
    const nextTestimonials = () => {
        const testimonialsPerGroup = window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3;
        
        currentTestimonials = [
            ...currentTestimonials.slice(testimonialsPerGroup),
            ...currentTestimonials.slice(0, testimonialsPerGroup)
        ];
        
        elaborateTransition(showTestimonials);
    };
    
    // Cambiar a testimonios anteriores
    const prevTestimonials = () => {
        const testimonialsPerGroup = window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3;
        
        currentTestimonials = [
            ...currentTestimonials.slice(-testimonialsPerGroup),
            ...currentTestimonials.slice(0, -testimonialsPerGroup)
        ];
        
        elaborateTransition(showTestimonials);
    };
    
    // Iniciar carrusel
    const initCarousel = () => {
        shuffleTestimonials();
        showTestimonials();
    };
    
    // Navegación automática
    const startAutoSlide = () => {
        clearInterval(autoSlide);
        autoSlide = setInterval(() => {
            nextTestimonials();
        }, 5000);
    };
    
    // Event listeners
    prevBtn.addEventListener('click', () => {
        clearInterval(autoSlide);
        prevTestimonials();
        startAutoSlide();
    });
    
    nextBtn.addEventListener('click', () => {
        clearInterval(autoSlide);
        nextTestimonials();
        startAutoSlide();
    });
    
    // Pausar al interactuar
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });
    
    carousel.addEventListener('mouseleave', startAutoSlide);
    
    // Redimensionamiento
    window.addEventListener('resize', () => {
        clearInterval(autoSlide);
        initCarousel();
        startAutoSlide();
    });
    
    // Inicializar
    initCarousel();
    startAutoSlide();
  
    // Añadir estilo para la animación de flotación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0) rotate(0.5deg);
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            }
            100% {
                transform: translateY(-10px) rotate(-0.5deg);
                box-shadow: 0 15px 30px rgba(0,0,0,0.15);
            }
        }
        
        .testimonial {
            animation: float 4s ease-in-out infinite alternate;
            transition: all 0.3s ease;
        }
        
        .testimonial:hover {
            animation-play-state: paused;
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2) !important;
        }
    `;
    document.head.appendChild(style);
  
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
  
    // ========== INTEGRACIÓN CON GOOGLE FORMS ==========
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Función para obtener fbzx dinámicamente (actualizada)
        async function getFbzx() {
            try {
                const response = await fetch('https://docs.google.com/forms/d/e/1FAIpQLSdPLqpcs0uCakJE7mg2FYdUeRkY8xiUgCDGr-nBfBbTwZ9xDQ/viewform');
                const text = await response.text();
                const fbzxMatch = text.match(/"fbzx"\s*:\s*"(-?\d+)"/);
                return fbzxMatch ? fbzxMatch[1] : '-6078767790911626605'; // Nuevo valor por defecto
            } catch (error) {
                console.error('Error al obtener fbzx:', error);
                return '-6078767790911626605'; // Nuevo valor por defecto
            }
        }

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validar campos requeridos
            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = 'var(--secondary)';
                    isValid = false;
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                showNotification('Por favor completa todos los campos requeridos', 'error');
                return;
            }
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Mostrar estado de carga
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            try {
                // Agregar productos del carrito si existen
                if (typeof cart !== 'undefined' && cart.length > 0) {
                    const messageField = document.getElementById('message');
                    const cartItems = cart.map(item => 
                        `${item.name} - ${item.quantity} x $${item.price.toFixed(2)}`
                    ).join('\n');
                    
                    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                    messageField.value = `PRODUCTOS SELECCIONADOS:\n${cartItems}\nTOTAL: $${total.toFixed(2)}\n\n${messageField.value}`;
                }
                
                // Crear objeto con los datos del formulario usando los entry IDs correctos
                const formData = new FormData(contactForm);
                
                // Obtener el fbzx dinámicamente
                const fbzx = await getFbzx();
                formData.set('fbzx', fbzx); // Actualizar el valor de fbzx
                
                // Enviar a Google Forms
                await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    mode: 'no-cors'
                });
                
                // Mostrar confirmación
                showNotification('Mensaje enviado con éxito', 'success');
                contactForm.reset();
                
                // Limpiar carrito después de enviar
                if (typeof cart !== 'undefined') {
                    cart = [];
                    updateCartNotification();
                    updateCartPreview();
                }
                
            } catch (error) {
                console.error('Error al enviar el formulario:', error);
                showNotification('Error al enviar, por favor inténtalo de nuevo', 'error');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});
  
// ========== CARRITO DE COMPRAS ==========
let cart = [];
let cartPreviewVisible = false;

// Elementos del DOM
const floatingCartBtn = document.createElement('div');
floatingCartBtn.className = 'floating-cart';
floatingCartBtn.innerHTML = '<i class="fas fa-shopping-cart"></i>';
document.body.appendChild(floatingCartBtn);

const cartPreview = document.createElement('div');
cartPreview.className = 'cart-preview';
document.body.appendChild(cartPreview);

// Mostrar/ocultar vista previa del carrito
floatingCartBtn.addEventListener('click', () => {
    cartPreviewVisible = !cartPreviewVisible;
    updateCartPreview();
});

// Función para actualizar vista previa del carrito
const updateCartPreview = () => {
    if (cart.length === 0) {
        cartPreviewVisible = false;
        cartPreview.style.display = 'none';
        return;
    }
    
    cartPreview.style.display = cartPreviewVisible ? 'block' : 'none';
    
    if (cartPreviewVisible) {
        cartPreview.innerHTML = `
            <h4>Tu Carrito (${cart.reduce((total, item) => total + item.quantity, 0)})</h4>
            ${cart.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <span class="item-name">${item.name}</span>
                    <div class="cart-item-controls">
                        <button class="decrease-quantity">-</button>
                        <span class="item-quantity">${item.quantity}</span>
                        <button class="increase-quantity">+</button>
                    </div>
                    <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-item"><i class="fas fa-trash"></i></button>
                </div>
            `).join('')}
            <div class="cart-total">
                <span>Total:</span>
                <span>$${cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</span>
            </div>
            <div class="cart-actions">
                <button id="clearCart" class="empty-cart-btn">Vaciar Carrito</button>
                <div class="checkout-container">
                    <button id="checkoutCart" class="primary-btn small-btn">Finalizar Compra</button>
                </div>
            </div>
        `;

        // Agregar event listeners para los controles
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemId = e.target.closest('.cart-item').dataset.id;
                updateItemQuantity(itemId, -1);
            });
        });

        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemId = e.target.closest('.cart-item').dataset.id;
                updateItemQuantity(itemId, 1);
            });
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemId = e.target.closest('.cart-item').dataset.id;
                removeItemFromCart(itemId);
            });
        });

        document.getElementById('clearCart')?.addEventListener('click', (e) => {
            e.stopPropagation();
            clearCart();
        });

        document.getElementById('checkoutCart')?.addEventListener('click', (e) => {
            e.stopPropagation();
            checkoutCart();
        });
    }
};

// Función para actualizar cantidad de un item
const updateItemQuantity = (itemId, change) => {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        
        updateCartNotification();
        updateCartPreview();
    }
};

// Función para eliminar un item del carrito
const removeItemFromCart = (itemId) => {
    cart = cart.filter(item => item.id !== itemId);
    updateCartNotification();
    updateCartPreview();
};

// Función para vaciar el carrito
const clearCart = () => {
    cart = [];
    updateCartNotification();
    updateCartPreview();
    showNotification('El carrito se ha vaciado', 'info');
};

// Función para mostrar notificaciones
const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
};

// Función para finalizar la compra (solo redirige a contacto)
const checkoutCart = () => {
    if (cart.length === 0) {
        showNotification('El carrito está vacío', 'error');
        return;
    }
    
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
        window.scrollTo({
            top: contactSection.offsetTop - 70,
            behavior: 'smooth'
        });
        
        // Cerrar el carrito
        cartPreviewVisible = false;
        updateCartPreview();
    }
};

// Función para generar un ID único
const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
};

// Función para agregar al carrito
const addToCart = (productName, price) => {
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: generateId(),
            name: productName,
            price: parseFloat(price),
            quantity: 1
        });
    }
    
    updateCartNotification();
    updateCartPreview();
    showNotification(`${productName} añadido al carrito`);
    
    if (!cartPreviewVisible) {
        floatingCartBtn.style.display = 'flex';
    }
};

// Actualizar notificación del carrito
const updateCartNotification = () => {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    if (totalItems > 0) {
        let notification = floatingCartBtn.querySelector('.cart-notification');
        if (!notification) {
            notification = document.createElement('span');
            notification.className = 'cart-notification';
            floatingCartBtn.appendChild(notification);
        }
        notification.textContent = totalItems;
        floatingCartBtn.style.display = 'flex';
    } else {
        const notification = floatingCartBtn.querySelector('.cart-notification');
        if (notification) notification.remove();
        floatingCartBtn.style.display = 'none';
        cartPreviewVisible = false;
        cartPreview.style.display = 'none';
    }
};

// Modificar función para agregar carrito al formulario
const addCartToForm = () => {
    const messageField = document.getElementById('message');
    if (!messageField) return;
    
    if (cart.length > 0 && !document.getElementById('addCartBtn')) {
        const addCartBtn = document.createElement('button');
        addCartBtn.id = 'addCartBtn';
        addCartBtn.className = 'bouncing-btn';
        addCartBtn.innerHTML = '<i class="fas fa-cart-plus"></i> Agregar mi carrito al mensaje';
        
        addCartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const cartItems = cart.map(item => 
                `${item.name} - ${item.quantity} x $${item.price.toFixed(2)}`
            ).join('\n');
            
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            messageField.value = `PRODUCTOS SELECCIONADOS:\n${cartItems}\nTOTAL: $${total.toFixed(2)}\n\n${messageField.value}`;
            addCartBtn.remove();
            showNotification('Carrito añadido al mensaje');
        });
        
        const formGroup = messageField.closest('.form-group');
        if (formGroup && formGroup.parentNode) {
            formGroup.parentNode.insertBefore(addCartBtn, formGroup.nextSibling);
        }
    }
};

// Modificar los botones "Agregar al carrito"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const productCard = button.closest('.product-card, .specialty-card');
        const productName = productCard.querySelector('h3').textContent;
        const priceText = productCard.querySelector('.price').textContent;
        const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
        
        addToCart(productName, price);
        
        // Efecto visual de confirmación
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Añadido';
        button.classList.add('added');
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('added');
        }, 2000);
    });
});

// Observador para mostrar botón en contacto
const contactSection = document.getElementById('contacto');
if (contactSection) {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            addCartToForm();
        }
    }, {threshold: 0.1});

    observer.observe(contactSection);
}

// Ocultar carrito flotante al principio
floatingCartBtn.style.display = 'none';

// Estilos adicionales para el carrito y notificaciones
const cartStyles = document.createElement('style');
cartStyles.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 12px 24px;
        border-radius: 50px;
        color: white;
        font-weight: 500;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1100;
        animation: slideIn 0.3s ease-out;
    }
    
    .notification.success {
        background: var(--primary);
    }
    
    .notification.info {
        background: var(--accent);
    }
    
    .notification.error {
        background: var(--secondary);
    }
    
    .notification.fade-out {
        animation: fadeOut 0.5s ease-in;
    }
    
    @keyframes slideIn {
        from { transform: translateX(-50%) translateY(100px); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .add-to-cart.added {
        background: var(--secondary) !important;
        animation: pulse 0.5s;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .checkout-container {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-top: 10px;
    }
    
    .cart-actions {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    .empty-cart-btn {
        width: 100%;
        padding: 8px;
        background: var(--secondary);
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .empty-cart-btn:hover {
        background: var(--secondary-light);
    }
`;
document.head.appendChild(cartStyles);
