// Application Data
const products = [
    {
        id: 1,
        name: "Классическая белая рубашка",
        description: "Элегантная хлопковая рубашка для повседневной носки",
        price: 2990,
        category: "Мужская одежда",
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400"
    },
    {
        id: 2,
        name: "Джинсы Slim Fit",
        description: "Стильные джинсы зауженного кроя",
        price: 4500,
        category: "Мужская одежда",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400"
    },
    {
        id: 3,
        name: "Летнее платье",
        description: "Легкое цветочное платье для теплых дней",
        price: 3800,
        category: "Женская одежда",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400"
    },
    {
        id: 4,
        name: "Кожаная куртка",
        description: "Стильная кожаная куртка премиум качества",
        price: 12900,
        category: "Женская одежда",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400"
    },
    {
        id: 5,
        name: "Кожаный ремень",
        description: "Классический ремень из натуральной кожи",
        price: 1500,
        category: "Аксессуары",
        image: "https://images.unsplash.com/photo-1624222247344-550fb60583bb?w=400"
    },
    {
        id: 6,
        name: "Солнцезащитные очки",
        description: "Модные очки с UV защитой",
        price: 2200,
        category: "Аксессуары",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400"
    },
    {
        id: 7,
        name: "Кроссовки Running",
        description: "Удобные кроссовки для бега и повседневной носки",
        price: 5900,
        category: "Обувь",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
    },
    {
        id: 8,
        name: "Ботинки Chelsea",
        description: "Элегантные ботинки челси из замши",
        price: 7800,
        category: "Обувь",
        image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400"
    }
];

const categories = [
    "Все товары",
    "Мужская одежда",
    "Женская одежда",
    "Аксессуары",
    "Обувь"
];

const notifications = [
    {
        id: 1,
        title: "Новая коллекция Весна 2025",
        description: "Яркие цвета и свежие дизайны уже в каталоге",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400",
        date: "2025-03-15"
    },
    {
        id: 2,
        title: "Скидка 30% на весь ассортимент",
        description: "Только до конца недели! Успейте купить любимые вещи",
        image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400",
        date: "2025-03-20"
    },
    {
        id: 3,
        title: "Бесплатная доставка",
        description: "При заказе от 5000 рублей доставка бесплатно",
        image: "https://images.unsplash.com/photo-1558769132-cb1aea3c6d49?w=400",
        date: "2025-03-18"
    }
];

const reviewsSample = [
    {
        id: 1,
        name: "Анна Петрова",
        rating: 5,
        text: "Отличный магазин! Качество товаров на высоте, доставка быстрая",
        date: "2025-03-10"
    },
    {
        id: 2,
        name: "Михаил Иванов",
        rating: 4,
        text: "Хороший ассортимент, цены приемлемые. Единственное - хотелось бы больше скидок",
        date: "2025-03-08"
    }
];

// Application State
let cart = [];
let currentCategory = "Все товары";
let searchTerm = "";
let reviews = [...reviewsSample];
let isSubscribed = false;

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartBadge = document.getElementById('cartBadge');
const menuCartBadge = document.getElementById('menuCartBadge');
const cartItems = document.getElementById('cartItems');
const cartEmpty = document.getElementById('cartEmpty');
const cartFooter = document.getElementById('cartFooter');
const cartTotal = document.getElementById('cartTotal');
const orderTotal = document.getElementById('orderTotal');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const notificationsContent = document.getElementById('notificationsContent');
const reviewsContainer = document.getElementById('reviewsContainer');
const ratingInput = document.getElementById('ratingInput');
const ratingValue = document.getElementById('ratingValue');
const toast = document.getElementById('toast');
const toastContent = document.getElementById('toastContent');
const loadingOverlay = document.getElementById('loadingOverlay');
const cartIcon = document.getElementById('cartIcon');
const subscribeBtn = document.getElementById('subscribeBtn');
const burgerBtn = document.getElementById('burgerBtn');
const burgerMenu = document.getElementById('burgerMenu');
const burgerOverlay = document.getElementById('burgerOverlay');
const closeMenu = document.getElementById('closeMenu');
const categoriesDropdown = document.getElementById('categoriesDropdown');
const paymentSelect = document.getElementById('paymentSelect');
const paymentInfo = document.getElementById('paymentInfo');

// Utility Functions
function formatPrice(price) {
    return `${price.toLocaleString('ru-RU')} ₽`;
}

function showToast(message, type = 'success') {
    toastContent.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function showLoading() {
    loadingOverlay.classList.add('show');
}

function hideLoading() {
    loadingOverlay.classList.remove('show');
}

function updateCartBadges() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (totalItems > 0) {
        cartBadge.textContent = totalItems;
        menuCartBadge.textContent = totalItems;
        cartBadge.classList.remove('hidden');
        menuCartBadge.classList.remove('hidden');
    } else {
        cartBadge.classList.add('hidden');
        menuCartBadge.classList.add('hidden');
    }
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = formatPrice(total);
    orderTotal.textContent = formatPrice(total);
}

// Product Functions
function filterProducts() {
    let filtered = products;
    
    if (currentCategory !== "Все товары") {
        filtered = filtered.filter(product => product.category === currentCategory);
    }
    
    if (searchTerm) {
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    return filtered;
}

function renderProducts() {
    const filtered = filterProducts();
    
    if (filtered.length === 0) {
        productsGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div class="empty-icon">🔍</div>
                <h3>Товары не найдены</h3>
                <p>Попробуйте изменить фильтры или поисковой запрос</p>
            </div>
        `;
        return;
    }
    
    productsGrid.innerHTML = filtered.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${formatPrice(product.price)}</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        В корзину
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartBadges();
    updateCartTotal();
    renderCart();
    
    // Add animation effect
    const buttons = document.querySelectorAll('.add-to-cart-btn');
    const clickedButton = Array.from(buttons).find(btn => 
        btn.getAttribute('onclick').includes(productId.toString())
    );
    
    if (clickedButton) {
        clickedButton.style.transform = 'scale(0.9)';
        setTimeout(() => {
            clickedButton.style.transform = '';
        }, 150);
    }
    
    showToast(`${product.name} добавлен в корзину`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartBadges();
    updateCartTotal();
    renderCart();
    showToast('Товар удален из корзины');
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    updateCartBadges();
    updateCartTotal();
    renderCart();
}

function renderCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = '';
        cartEmpty.style.display = 'block';
        cartFooter.style.display = 'none';
        return;
    }
    
    cartEmpty.style.display = 'none';
    cartFooter.style.display = 'block';
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${formatPrice(item.price)} за шт.</div>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})" title="Удалить">🗑️</button>
            </div>
        </div>
    `).join('');
}

// Notifications Functions
function renderNotifications() {
    notificationsContent.innerHTML = notifications.map(notification => `
        <div class="notification-card">
            <img src="${notification.image}" alt="${notification.title}" class="notification-image">
            <div class="notification-content">
                <h3 class="notification-title">${notification.title}</h3>
                <p class="notification-description">${notification.description}</p>
                <div class="notification-date">Дата: ${new Date(notification.date).toLocaleDateString('ru-RU')}</div>
            </div>
        </div>
    `).join('');
}

function toggleSubscription() {
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        isSubscribed = !isSubscribed;
        
        if (isSubscribed) {
            subscribeBtn.textContent = '✅ Подписка активна';
            subscribeBtn.style.background = 'var(--color-success)';
            subscribeBtn.style.color = 'white';
            showToast('Вы подписались на уведомления в Telegram!');
        } else {
            subscribeBtn.textContent = '📢 Подписаться на уведомления';
            subscribeBtn.style.background = '';
            subscribeBtn.style.color = '';
            showToast('Подписка отменена');
        }
    }, 1500);
}

// Reviews Functions
function renderReviews() {
    if (reviews.length === 0) {
        reviewsContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">💬</div>
                <h3>Отзывов пока нет</h3>
                <p>Будьте первым, кто оставит отзыв!</p>
            </div>
        `;
        return;
    }
    
    reviewsContainer.innerHTML = reviews.map(review => `
        <div class="review-card">
            <div class="review-header">
                <div class="review-author">${review.name}</div>
                <div class="review-rating">${'⭐'.repeat(review.rating)}</div>
            </div>
            <div class="review-text">${review.text}</div>
            <div class="review-date">Дата: ${new Date(review.date).toLocaleDateString('ru-RU')}</div>
        </div>
    `).join('');
}

function setupRatingInput() {
    const stars = ratingInput.querySelectorAll('.star');
    let selectedRating = 0;
    
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            selectedRating = index + 1;
            ratingValue.value = selectedRating;
            
            stars.forEach((s, i) => {
                if (i < selectedRating) {
                    s.classList.add('selected');
                } else {
                    s.classList.remove('selected');
                }
            });
        });
        
        star.addEventListener('mouseover', () => {
            stars.forEach((s, i) => {
                if (i <= index) {
                    s.style.filter = 'grayscale(0%)';
                    s.style.transform = 'scale(1.1)';
                } else {
                    s.style.filter = 'grayscale(100%)';
                    s.style.transform = 'scale(1)';
                }
            });
        });
        
        star.addEventListener('mouseleave', () => {
            stars.forEach((s, i) => {
                if (i < selectedRating) {
                    s.style.filter = 'grayscale(0%)';
                    s.style.transform = 'scale(1.1)';
                } else {
                    s.style.filter = 'grayscale(100%)';
                    s.style.transform = 'scale(1)';
                }
            });
        });
    });
}

// Burger Menu Functions
function openBurgerMenu() {
    burgerMenu.classList.add('open');
    burgerOverlay.classList.add('active');
    burgerBtn.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeBurgerMenu() {
    burgerMenu.classList.remove('open');
    burgerOverlay.classList.remove('active');
    burgerBtn.classList.remove('open');
    document.body.style.overflow = '';
    
    // Close categories dropdown if open
    categoriesDropdown.classList.remove('open');
}

function toggleCategoriesDropdown() {
    categoriesDropdown.classList.toggle('open');
    const arrow = document.querySelector('.dropdown-arrow');
    if (categoriesDropdown.classList.contains('open')) {
        arrow.style.transform = 'rotate(180deg)';
    } else {
        arrow.style.transform = 'rotate(0deg)';
    }
}

function setCategory(category) {
    currentCategory = category;
    
    // Update filter buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    const targetBtn = Array.from(filterButtons).find(btn => btn.dataset.category === category);
    if (targetBtn) {
        targetBtn.classList.add('active');
    }
    
    renderProducts();
    showPage('catalogPage');
}

// Page Navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
}

// Form Handlers
// Payment Functions
function handlePaymentChange() {
    const selectedPayment = paymentSelect.value;
    
    if (selectedPayment === 'sbp') {
        paymentInfo.innerHTML = `
            <p><strong>СБП (Система быстрых платежей)</strong></p>
            <p>Оплата через мобильное приложение банка. После подтверждения заказа вам будет отправлена ссылка для оплаты в Telegram.</p>
        `;
        paymentInfo.classList.add('show');
    } else {
        paymentInfo.classList.remove('show');
    }
}

function handleCheckoutSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Validate form
    const requiredFields = ['name', 'phone', 'address', 'payment'];
    const missingFields = requiredFields.filter(field => !formData.get(field));
    
    if (missingFields.length > 0) {
        showToast('Пожалуйста, заполните все обязательные поля', 'error');
        return;
    }
    
    const paymentMethod = formData.get('payment');
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        
        // Clear cart
        cart = [];
        updateCartBadges();
        updateCartTotal();
        renderCart();
        
        // Reset form
        event.target.reset();
        paymentInfo.classList.remove('show');
        
        // Show specific success message based on payment method
        let message = 'Заказ успешно оформлен!';
        if (paymentMethod === 'sbp') {
            message += ' Для оплаты через СБП вам будет отправлена ссылка в Telegram.';
        } else {
            message += ' Уведомление отправлено в Telegram.';
        }
        
        showToast(message);
        showPage('catalogPage');
    }, 2000);
}

function handleReviewSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Validate form
    const name = formData.get('name');
    const rating = formData.get('rating');
    const text = formData.get('text');
    
    if (!name || !rating || !text) {
        showToast('Пожалуйста, заполните все обязательные поля', 'error');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        
        // Add review
        const newReview = {
            id: reviews.length + 1,
            name: name,
            rating: parseInt(rating),
            text: text,
            date: new Date().toISOString().split('T')[0]
        };
        
        reviews.unshift(newReview);
        renderReviews();
        
        // Reset form
        event.target.reset();
        ratingValue.value = '';
        document.querySelectorAll('.star').forEach(star => {
            star.classList.remove('selected');
            star.style.filter = 'grayscale(100%)';
            star.style.transform = 'scale(1)';
        });
        
        showToast('Спасибо за отзыв! Он отправлен администратору в Telegram');
    }, 1500);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize app
    renderProducts();
    renderCart();
    renderNotifications();
    renderReviews();
    setupRatingInput();
    updateCartBadges();
    updateCartTotal();
    
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value;
        renderProducts();
    });
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active filter
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            currentCategory = button.dataset.category;
            renderProducts();
        });
    });
    
    // Cart icon click
    cartIcon.addEventListener('click', () => {
        showPage('cartPage');
    });
    
    // Burger menu events
    burgerBtn.addEventListener('click', openBurgerMenu);
    closeMenu.addEventListener('click', closeBurgerMenu);
    burgerOverlay.addEventListener('click', closeBurgerMenu);
    
    // Payment select change
    if (paymentSelect) {
        paymentSelect.addEventListener('change', handlePaymentChange);
    }
    
    // Keyboard navigation for burger menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && burgerMenu.classList.contains('open')) {
            closeBurgerMenu();
        }
    });
    
    // Subscribe button
    subscribeBtn.addEventListener('click', toggleSubscription);
    
    // Form submissions
    document.getElementById('checkoutForm').addEventListener('submit', handleCheckoutSubmit);
    document.getElementById('reviewForm').addEventListener('submit', handleReviewSubmit);
    
    // Initialize Telegram WebApp if available
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();
        
        // Set theme colors
        tg.setHeaderColor('#0088cc');
        tg.setBackgroundColor('#fcfcf9');
    }
});