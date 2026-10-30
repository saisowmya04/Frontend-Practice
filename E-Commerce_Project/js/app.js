// ==========================================================================
// AURORA LUXE - Core Application & E-Commerce State Management
// ==========================================================================

// Global state keys
const CART_STORAGE_KEY = 'aurora_luxe_cart';
const WISHLIST_STORAGE_KEY = 'aurora_luxe_wishlist';
const THEME_STORAGE_KEY = 'aurora_luxe_theme';
const COUPON_STORAGE_KEY = 'aurora_luxe_coupon';

// App State
let cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
let wishlist = JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY)) || [];
let appliedCoupon = JSON.parse(localStorage.getItem(COUPON_STORAGE_KEY)) || null;

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCartAndWishlistCounters();
  renderOffcanvasCart();
  initGlobalSearch();
  initCountdownTimer();
  initScrollTop();
  setupNavbarScroll();

  // Page-specific initializations
  if (document.getElementById('trending-products-grid')) {
    initHomePage();
  }
  if (document.getElementById('shop-product-grid')) {
    initShopPage();
  }
  if (document.getElementById('product-detail-container')) {
    initProductDetailPage();
  }
  if (document.getElementById('wishlist-grid')) {
    initWishlistPage();
  }
  if (document.getElementById('checkout-items-summary')) {
    initCheckoutPage();
  }
  if (document.getElementById('cart-page-items')) {
    initCartPage();
  }
});

// ==========================================================================
// Theme Management (Dark / Light Mode)
// ==========================================================================
function initTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'dark';
  applyTheme(savedTheme);

  const themeBtns = document.querySelectorAll('.theme-toggle-btn');
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-bs-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      showToast('Theme Changed', `Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Luxury mode`, 'info');
    });
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-bs-theme', theme);
  const themeIcons = document.querySelectorAll('.theme-toggle-btn i');
  themeIcons.forEach(icon => {
    if (theme === 'dark') {
      icon.className = 'bi bi-moon-stars-fill text-warning';
    } else {
      icon.className = 'bi bi-sun-fill text-warning';
    }
  });
}

// ==========================================================================
// Cart State Operations
// ==========================================================================
function addToCart(productId, quantity = 1, selectedColor = null, selectedSize = null) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;

  const color = selectedColor || (product.colors && product.colors.length ? product.colors[0].name : null);
  const size = selectedSize || (product.sizes && product.sizes.length ? product.sizes[0] : null);

  // Check if identical item configuration already in cart
  const existingIndex = cart.findIndex(item => 
    item.id === productId && item.color === color && item.size === size
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.categoryLabel,
      color: color,
      size: size,
      quantity: quantity
    });
  }

  saveCart();
  renderOffcanvasCart();
  updateCartCounters();

  // If on cart page or checkout page, re-render
  if (document.getElementById('cart-page-items')) renderCartPage();
  if (document.getElementById('checkout-items-summary')) renderCheckoutSummary();

  showToast('Added to Bag', `${quantity}x ${product.name} added to your shopping bag!`, 'success');
}

function updateCartQuantity(index, newQty) {
  if (index < 0 || index >= cart.length) return;
  if (newQty <= 0) {
    removeFromCart(index);
    return;
  }
  cart[index].quantity = newQty;
  saveCart();
  renderOffcanvasCart();
  updateCartCounters();
  if (document.getElementById('cart-page-items')) renderCartPage();
  if (document.getElementById('checkout-items-summary')) renderCheckoutSummary();
}

function removeFromCart(index) {
  if (index < 0 || index >= cart.length) return;
  const removedName = cart[index].name;
  cart.splice(index, 1);
  saveCart();
  renderOffcanvasCart();
  updateCartCounters();
  if (document.getElementById('cart-page-items')) renderCartPage();
  if (document.getElementById('checkout-items-summary')) renderCheckoutSummary();
  showToast('Item Removed', `${removedName} removed from cart`, 'info');
}

function clearCart() {
  cart = [];
  appliedCoupon = null;
  localStorage.removeItem(COUPON_STORAGE_KEY);
  saveCart();
  renderOffcanvasCart();
  updateCartCounters();
  if (document.getElementById('cart-page-items')) renderCartPage();
  if (document.getElementById('checkout-items-summary')) renderCheckoutSummary();
}

function saveCart() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function getCartCalculations() {
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  let discountAmount = 0;

  if (appliedCoupon && appliedCoupon.discountPercent) {
    discountAmount = (subtotal * appliedCoupon.discountPercent) / 100;
  }

  let shippingCost = subtotal > 99 || (appliedCoupon && appliedCoupon.freeShipping) || subtotal === 0 ? 0 : 15.00;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = taxableAmount > 0 ? taxableAmount * 0.08 : 0; // 8% sales tax
  const total = taxableAmount + shippingCost + taxAmount;

  return {
    subtotal: subtotal.toFixed(2),
    discountAmount: discountAmount.toFixed(2),
    shippingCost: shippingCost.toFixed(2),
    taxAmount: taxAmount.toFixed(2),
    total: total.toFixed(2),
    itemsCount: cart.reduce((acc, item) => acc + item.quantity, 0)
  };
}

function updateCartCounters() {
  const calcs = getCartCalculations();
  const badges = document.querySelectorAll('.cart-badge');
  badges.forEach(b => {
    b.textContent = calcs.itemsCount;
    b.style.display = calcs.itemsCount > 0 ? 'inline-flex' : 'none';
  });
}

// Render Offcanvas Slide Cart
function renderOffcanvasCart() {
  const container = document.getElementById('offcanvas-cart-body');
  const footerContainer = document.getElementById('offcanvas-cart-footer');
  if (!container) return;

  const calcs = getCartCalculations();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="text-center py-5">
        <div class="mb-3 text-muted" style="font-size: 3.5rem;">
          <i class="bi bi-bag-x"></i>
        </div>
        <h5 class="fw-bold mb-2">Your Bag is Empty</h5>
        <p class="text-muted small mb-4">Discover our handcrafted catalog of luxury smart tech and apparel.</p>
        <a href="shop.html" class="btn btn-aurora-primary btn-sm">Explore Collection</a>
      </div>
    `;
    if (footerContainer) footerContainer.innerHTML = '';
    return;
  }

  let itemsHtml = '<div class="cart-items-wrapper">';
  cart.forEach((item, index) => {
    itemsHtml += `
      <div class="cart-item-row">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="flex-grow-1">
          <div class="d-flex justify-content-between align-items-start">
            <h6 class="mb-1 fw-bold text-truncate" style="max-width: 200px;" title="${item.name}">
              <a href="product-detail.html?id=${item.id}">${item.name}</a>
            </h6>
            <button class="btn btn-link text-danger p-0 ms-2" onclick="removeFromCart(${index})" title="Remove">
              <i class="bi bi-trash3"></i>
            </button>
          </div>
          <div class="text-muted small mb-2">
            ${item.color ? `<span class="me-2"><i class="bi bi-palette me-1"></i>${item.color}</span>` : ''}
            ${item.size ? `<span><i class="bi bi-tag me-1"></i>${item.size}</span>` : ''}
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div class="cart-quantity-controls">
              <button class="qty-btn" onclick="updateCartQuantity(${index}, ${item.quantity - 1})">-</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn" onclick="updateCartQuantity(${index}, ${item.quantity + 1})">+</button>
            </div>
            <div class="fw-bold text-primary">$${(item.price * item.quantity).toFixed(2)}</div>
          </div>
        </div>
      </div>
    `;
  });
  itemsHtml += '</div>';

  container.innerHTML = itemsHtml;

  if (footerContainer) {
    footerContainer.innerHTML = `
      <div class="border-top pt-3 mt-auto">
        <div class="d-flex justify-content-between mb-2 small text-muted">
          <span>Subtotal (${calcs.itemsCount} items)</span>
          <span class="text-white fw-bold">$${calcs.subtotal}</span>
        </div>
        ${appliedCoupon ? `
          <div class="d-flex justify-content-between mb-2 small text-success">
            <span>Coupon Discount</span>
            <span>-$${calcs.discountAmount}</span>
          </div>
        ` : ''}
        <div class="d-flex justify-content-between mb-2 small text-muted">
          <span>Estimated Shipping</span>
          <span class="text-white">${parseFloat(calcs.shippingCost) === 0 ? '<span class="text-success fw-bold">FREE</span>' : '$' + calcs.shippingCost}</span>
        </div>
        <div class="d-flex justify-content-between mb-3 fs-5 fw-bold text-white border-top border-secondary pt-2">
          <span>Total</span>
          <span class="text-primary">$${calcs.total}</span>
        </div>

        <div class="d-grid gap-2">
          <a href="checkout.html" class="btn btn-aurora-primary justify-content-center">
            <i class="bi bi-shield-check"></i> Instant Checkout
          </a>
          <a href="cart.html" class="btn btn-aurora-outline justify-content-center btn-sm">
            View Full Cart & Promo Codes
          </a>
        </div>
      </div>
    `;
  }
}

// ==========================================================================
// Wishlist State Operations
// ==========================================================================
function toggleWishlist(productId) {
  const index = wishlist.indexOf(productId);
  const product = productsData.find(p => p.id === productId);
  if (!product) return;

  if (index > -1) {
    wishlist.splice(index, 1);
    showToast('Removed from Wishlist', `${product.name} removed from your saved items.`, 'info');
  } else {
    wishlist.push(productId);
    showToast('Saved to Wishlist', `${product.name} added to your wishlist! ❤️`, 'heart');
  }

  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  initCartAndWishlistCounters();
  updateWishlistButtonStyles();

  if (document.getElementById('wishlist-grid')) {
    initWishlistPage();
  }
}

function updateWishlistButtonStyles() {
  const buttons = document.querySelectorAll(`[data-wishlist-id]`);
  buttons.forEach(btn => {
    const id = parseInt(btn.getAttribute('data-wishlist-id'));
    const isSaved = wishlist.includes(id);
    if (isSaved) {
      btn.classList.add('active-wishlist');
      btn.innerHTML = '<i class="bi bi-heart-fill"></i>';
    } else {
      btn.classList.remove('active-wishlist');
      btn.innerHTML = '<i class="bi bi-heart"></i>';
    }
  });
}

function initCartAndWishlistCounters() {
  updateCartCounters();
  const wishBadges = document.querySelectorAll('.wishlist-badge');
  wishBadges.forEach(b => {
    b.textContent = wishlist.length;
    b.style.display = wishlist.length > 0 ? 'inline-flex' : 'none';
  });
}

// ==========================================================================
// Toast Notification Engine
// ==========================================================================
function showToast(title, message, type = 'success') {
  let toastContainer = document.querySelector('.toast-container-custom');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container-custom';
    document.body.appendChild(toastContainer);
  }

  let iconClass = 'bi-check2-circle';
  let badgeClass = 'success';

  if (type === 'heart') {
    iconClass = 'bi-heart-fill';
    badgeClass = 'heart';
  } else if (type === 'info') {
    iconClass = 'bi-info-circle-fill';
    badgeClass = 'info';
  } else if (type === 'error') {
    iconClass = 'bi-exclamation-triangle-fill';
    badgeClass = 'danger';
  }

  const toastEl = document.createElement('div');
  toastEl.className = 'aurora-toast';
  toastEl.innerHTML = `
    <div class="toast-icon ${badgeClass}">
      <i class="bi ${iconClass}"></i>
    </div>
    <div class="flex-grow-1">
      <div class="fw-bold small text-white">${title}</div>
      <div class="text-muted small" style="font-size: 0.8rem;">${message}</div>
    </div>
    <button class="btn-close btn-close-white small ms-2" onclick="this.parentElement.remove()"></button>
  `;

  toastContainer.appendChild(toastEl);

  setTimeout(() => {
    toastEl.style.opacity = '0';
    toastEl.style.transform = 'translateY(15px) scale(0.95)';
    setTimeout(() => toastEl.remove(), 350);
  }, 3800);
}

// ==========================================================================
// Global Search with Autocomplete
// ==========================================================================
function initGlobalSearch() {
  const searchInputs = document.querySelectorAll('.search-input');
  searchInputs.forEach(input => {
    const wrapper = input.closest('.search-wrapper');
    if (!wrapper) return;

    let dropdown = wrapper.querySelector('.search-dropdown');
    if (!dropdown) {
      dropdown = document.createElement('div');
      dropdown.className = 'search-dropdown';
      wrapper.appendChild(dropdown);
    }

    input.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (q.length < 2) {
        dropdown.classList.remove('show');
        dropdown.innerHTML = '';
        return;
      }

      const matches = productsData.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.categoryLabel.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q)
      ).slice(0, 5);

      if (matches.length === 0) {
        dropdown.innerHTML = `
          <div class="p-3 text-center text-muted small">
            No products found matching "<strong>${escapeHtml(q)}</strong>"
          </div>
        `;
        dropdown.classList.add('show');
        return;
      }

      dropdown.innerHTML = matches.map(p => `
        <div class="search-item" onclick="window.location.href='product-detail.html?id=${p.id}'">
          <img src="${p.image}" alt="${p.name}" style="width: 44px; height: 44px; border-radius: 8px; object-fit: cover;">
          <div class="flex-grow-1 text-truncate">
            <div class="fw-bold small text-white text-truncate">${p.name}</div>
            <div class="text-muted" style="font-size: 0.75rem;">${p.categoryLabel}</div>
          </div>
          <div class="fw-bold text-primary small">$${p.price.toFixed(2)}</div>
        </div>
      `).join('') + `
        <div class="p-2 text-center border-top border-secondary">
          <a href="shop.html?search=${encodeURIComponent(q)}" class="small text-primary fw-bold">View all results &rarr;</a>
        </div>
      `;
      dropdown.classList.add('show');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!wrapper.contains(e.target)) {
        dropdown.classList.remove('show');
      }
    });

    // Handle enter key
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = input.value.trim();
        if (val) window.location.href = `shop.html?search=${encodeURIComponent(val)}`;
      }
    });
  });
}

// ==========================================================================
// Quick View Modal
// ==========================================================================
function openQuickView(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;

  let modalEl = document.getElementById('quickViewModal');
  if (!modalEl) {
    modalEl = document.createElement('div');
    modalEl.id = 'quickViewModal';
    modalEl.className = 'modal fade';
    modalEl.tabIndex = -1;
    modalEl.innerHTML = `
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content modal-content-glass">
          <div class="modal-header border-0 pb-0">
            <span class="badge badge-trending">${product.categoryLabel}</span>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body p-4 pt-2" id="quickViewModalContent"></div>
        </div>
      </div>
    `;
    document.body.appendChild(modalEl);
  }

  const content = document.getElementById('quickViewModalContent');
  content.innerHTML = `
    <div class="row g-4 align-items-center">
      <div class="col-md-6">
        <div class="rounded-4 overflow-hidden border border-secondary" style="height: 320px; background: rgba(0,0,0,0.2);">
          <img src="${product.image}" id="qv-main-img" alt="${product.name}" class="w-100 h-100 object-fit-cover">
        </div>
        <div class="d-flex gap-2 mt-2">
          ${product.additionalImages.map((img, i) => `
            <img src="${img}" class="rounded-3 border ${i === 0 ? 'border-primary' : 'border-secondary'}" 
                 style="width: 55px; height: 55px; object-fit: cover; cursor: pointer;"
                 onclick="document.getElementById('qv-main-img').src='${img}'">
          `).join('')}
        </div>
      </div>
      <div class="col-md-6">
        <h4 class="fw-bold mb-1">${product.name}</h4>
        <div class="rating-stars mb-2">
          <i class="bi bi-star-fill text-warning"></i>
          <span class="fw-bold text-white">${product.rating}</span>
          <span class="text-muted">(${product.reviewsCount} verified reviews)</span>
        </div>
        <div class="price-row mb-3">
          <span class="current-price">$${product.price.toFixed(2)}</span>
          ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
          ${product.discount ? `<span class="discount-badge">${product.discount}</span>` : ''}
        </div>
        <p class="text-muted small mb-3">${product.shortDesc}</p>

        ${product.colors && product.colors.length ? `
          <div class="mb-3">
            <label class="form-label small fw-bold text-muted d-block mb-1">Color: <span id="qv-selected-color" class="text-white">${product.colors[0].name}</span></label>
            <div class="d-flex gap-2">
              ${product.colors.map((c, i) => `
                <div class="color-swatch ${i === 0 ? 'active' : ''}" 
                     style="background-color: ${c.hex};" 
                     title="${c.name}"
                     onclick="selectQvColor(this, '${c.name}')"></div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        ${product.sizes && product.sizes.length ? `
          <div class="mb-3">
            <label class="form-label small fw-bold text-muted d-block mb-1">Size Option</label>
            <div class="d-flex gap-2 flex-wrap">
              ${product.sizes.map((s, i) => `
                <div class="size-pill ${i === 0 ? 'active' : ''}" 
                     onclick="selectQvSize(this, '${s}')">${s}</div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div class="d-flex gap-3 align-items-center mt-4">
          <div class="cart-quantity-controls py-1">
            <button class="qty-btn px-3" onclick="let q = document.getElementById('qv-qty'); if(parseInt(q.value) > 1) q.value = parseInt(q.value) - 1;">-</button>
            <input type="text" id="qv-qty" value="1" readonly class="text-center bg-transparent border-0 text-white fw-bold" style="width: 40px;">
            <button class="qty-btn px-3" onclick="let q = document.getElementById('qv-qty'); q.value = parseInt(q.value) + 1;">+</button>
          </div>
          <button class="btn btn-aurora-primary flex-grow-1" onclick="submitQuickViewCart(${product.id})">
            <i class="bi bi-bag-plus"></i> Add to Bag
          </button>
        </div>

        <div class="mt-3 text-center">
          <a href="product-detail.html?id=${product.id}" class="small text-muted text-decoration-underline">View Full Detailed Specifications &rarr;</a>
        </div>
      </div>
    </div>
  `;

  const bsModal = new bootstrap.Modal(modalEl);
  bsModal.show();
}

function selectQvColor(el, name) {
  el.parentElement.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
  const label = document.getElementById('qv-selected-color');
  if (label) label.textContent = name;
}

function selectQvSize(el, size) {
  el.parentElement.querySelectorAll('.size-pill').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
}

function submitQuickViewCart(productId) {
  const qty = parseInt(document.getElementById('qv-qty').value) || 1;
  const colorLabel = document.getElementById('qv-selected-color');
  const selectedColor = colorLabel ? colorLabel.textContent : null;
  const activeSize = document.querySelector('#quickViewModalContent .size-pill.active');
  const selectedSize = activeSize ? activeSize.textContent : null;

  addToCart(productId, qty, selectedColor, selectedSize);

  const modalEl = document.getElementById('quickViewModal');
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();
}

// ==========================================================================
// Product Card HTML Generator
// ==========================================================================
function generateProductCardHtml(product, isListView = false) {
  const isWishlisted = wishlist.includes(product.id);
  return `
    <div class="product-card ${isListView ? 'list-view' : ''}" data-product-id="${product.id}">
      <div class="product-thumb-container">
        <span class="product-badge-float badge-${product.badgeType || 'trending'}">${product.badge || 'Featured'}</span>
        <div class="product-card-actions">
          <button class="card-action-btn ${isWishlisted ? 'active-wishlist' : ''}" 
                  data-wishlist-id="${product.id}" 
                  onclick="toggleWishlist(${product.id})" 
                  title="Add to Wishlist">
            <i class="bi ${isWishlisted ? 'bi-heart-fill' : 'bi-heart'}"></i>
          </button>
          <button class="card-action-btn" onclick="openQuickView(${product.id})" title="Quick View">
            <i class="bi bi-eye"></i>
          </button>
        </div>
        <a href="product-detail.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}" class="product-thumb-img" loading="lazy">
        </a>
      </div>
      <div class="product-info-wrap">
        <span class="product-category-sub">${product.categoryLabel}</span>
        <h5 class="product-title">
          <a href="product-detail.html?id=${product.id}">${product.name}</a>
        </h5>
        <div class="rating-stars">
          <i class="bi bi-star-fill"></i>
          <span class="fw-bold text-white">${product.rating}</span>
          <span class="rating-count">(${product.reviewsCount})</span>
        </div>
        ${isListView ? `<p class="text-muted small mb-3">${product.shortDesc}</p>` : ''}
        <div class="price-row">
          <span class="current-price">$${product.price.toFixed(2)}</span>
          ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
          ${product.discount ? `<span class="discount-badge">${product.discount}</span>` : ''}
        </div>
        <button class="add-cart-btn" onclick="addToCart(${product.id}, 1)">
          <i class="bi bi-bag-plus"></i> Add to Bag
        </button>
      </div>
    </div>
  `;
}

// ==========================================================================
// Home Page View Initializer
// ==========================================================================
function initHomePage() {
  // Render Trending Products
  const trendingContainer = document.getElementById('trending-products-grid');
  if (trendingContainer) {
    const trending = productsData.filter(p => p.isTrending).slice(0, 8);
    trendingContainer.innerHTML = trending.map(p => `
      <div class="col-6 col-md-4 col-lg-3">
        ${generateProductCardHtml(p)}
      </div>
    `).join('');
  }

  // Render Flash Deals
  const flashContainer = document.getElementById('flash-deals-grid');
  if (flashContainer) {
    const flash = productsData.filter(p => p.isHotDeal).slice(0, 4);
    flashContainer.innerHTML = flash.map(p => `
      <div class="col-6 col-md-6 col-lg-3">
        ${generateProductCardHtml(p)}
      </div>
    `).join('');
  }

  updateWishlistButtonStyles();
}

// ==========================================================================
// Shop Page View (Filter, Search, Sort & View Mode)
// ==========================================================================
let currentShopFilters = {
  category: 'all',
  maxPrice: 600,
  minRating: 0,
  search: '',
  sortBy: 'featured',
  viewMode: 'grid'
};

function initShopPage() {
  // Parse query parameters
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('category')) currentShopFilters.category = urlParams.get('category');
  if (urlParams.get('search')) currentShopFilters.search = urlParams.get('search');

  // Sync controls with state
  const searchBar = document.getElementById('shop-search-input');
  if (searchBar && currentShopFilters.search) {
    searchBar.value = currentShopFilters.search;
  }

  const priceSlider = document.getElementById('price-range-slider');
  const priceDisplay = document.getElementById('price-range-val');
  if (priceSlider && priceDisplay) {
    priceSlider.addEventListener('input', (e) => {
      currentShopFilters.maxPrice = parseFloat(e.target.value);
      priceDisplay.textContent = `$${currentShopFilters.maxPrice}`;
      renderFilteredShopProducts();
    });
  }

  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentShopFilters.sortBy = e.target.value;
      renderFilteredShopProducts();
    });
  }

  renderCategoryFilters();
  renderFilteredShopProducts();
}

function renderCategoryFilters() {
  const catContainer = document.getElementById('category-filter-list');
  if (!catContainer) return;

  const categories = [
    { id: 'all', label: 'All Collections' },
    { id: 'electronics', label: 'Smart Electronics' },
    { id: 'audio', label: 'Audio & Sound' },
    { id: 'fashion', label: 'Urban Fashion' },
    { id: 'accessories', label: 'Luxury Accessories' },
    { id: 'home', label: 'Minimalist Living' }
  ];

  catContainer.innerHTML = categories.map(cat => {
    const count = cat.id === 'all' 
      ? productsData.length 
      : productsData.filter(p => p.category === cat.id).length;
    const isChecked = currentShopFilters.category === cat.id;
    return `
      <label class="filter-check">
        <span>
          <input type="radio" name="shop-category" value="${cat.id}" ${isChecked ? 'checked' : ''} 
                 onchange="onCategoryFilterChange('${cat.id}')">
          <span class="ms-2">${cat.label}</span>
        </span>
        <span class="badge rounded-pill bg-dark border border-secondary">${count}</span>
      </label>
    `;
  }).join('');
}

function onCategoryFilterChange(catId) {
  currentShopFilters.category = catId;
  renderFilteredShopProducts();
}

function setViewMode(mode) {
  currentShopFilters.viewMode = mode;
  document.querySelectorAll('.view-mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-mode') === mode);
  });
  renderFilteredShopProducts();
}

function clearAllFilters() {
  currentShopFilters = {
    category: 'all',
    maxPrice: 600,
    minRating: 0,
    search: '',
    sortBy: 'featured',
    viewMode: currentShopFilters.viewMode
  };

  const slider = document.getElementById('price-range-slider');
  if (slider) slider.value = 600;
  const priceDisplay = document.getElementById('price-range-val');
  if (priceDisplay) priceDisplay.textContent = '$600';

  const searchInput = document.getElementById('shop-search-input');
  if (searchInput) searchInput.value = '';

  renderCategoryFilters();
  renderFilteredShopProducts();
}

function renderFilteredShopProducts() {
  const container = document.getElementById('shop-product-grid');
  const countEl = document.getElementById('shop-results-count');
  if (!container) return;

  let filtered = [...productsData];

  // Category filter
  if (currentShopFilters.category !== 'all') {
    filtered = filtered.filter(p => p.category === currentShopFilters.category);
  }

  // Price filter
  filtered = filtered.filter(p => p.price <= currentShopFilters.maxPrice);

  // Search keyword filter
  if (currentShopFilters.search) {
    const q = currentShopFilters.search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.shortDesc.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q)
    );
  }

  // Sorting
  if (currentShopFilters.sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentShopFilters.sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentShopFilters.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (currentShopFilters.sortBy === 'reviews') {
    filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
  }

  if (countEl) {
    countEl.textContent = `Showing ${filtered.length} of ${productsData.length} products`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-12 py-5 text-center">
        <i class="bi bi-funnel text-muted" style="font-size: 3rem;"></i>
        <h4 class="mt-3 fw-bold">No Products Match Your Criteria</h4>
        <p class="text-muted">Try adjusting your filters or search terms.</p>
        <button class="btn btn-aurora-outline btn-sm mt-2" onclick="clearAllFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  const isList = currentShopFilters.viewMode === 'list';
  const colClass = isList ? 'col-12' : 'col-6 col-md-6 col-lg-4';

  container.innerHTML = filtered.map(p => `
    <div class="${colClass} mb-4">
      ${generateProductCardHtml(p, isList)}
    </div>
  `).join('');

  updateWishlistButtonStyles();
}

// ==========================================================================
// Product Detail Page Controller
// ==========================================================================
function initProductDetailPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get('id')) || 1;
  const product = productsData.find(p => p.id === id) || productsData[0];

  document.title = `${product.name} | Aurora Luxe`;

  const container = document.getElementById('product-detail-container');
  if (!container) return;

  const isWishlisted = wishlist.includes(product.id);

  container.innerHTML = `
    <div class="row g-5">
      <!-- Image Gallery Column -->
      <div class="col-lg-6">
        <div class="product-main-gallery">
          <img id="detail-main-img" src="${product.image}" alt="${product.name}">
        </div>
        <div class="thumb-strip">
          ${product.additionalImages.map((img, i) => `
            <img src="${img}" class="thumb-strip-img ${i === 0 ? 'active' : ''}" 
                 onclick="switchDetailImage(this, '${img}')" alt="Thumbnail ${i+1}">
          `).join('')}
        </div>
      </div>

      <!-- Product Information Column -->
      <div class="col-lg-6">
        <div class="d-flex align-items-center gap-2 mb-2">
          <span class="badge badge-trending">${product.categoryLabel}</span>
          <span class="badge bg-dark border border-secondary text-success">
            <i class="bi bi-shield-check me-1"></i> Authentic Guarantee
          </span>
        </div>
        <h1 class="h2 fw-bold mb-2">${product.name}</h1>
        <p class="text-muted mb-3">${product.tagline}</p>

        <div class="d-flex align-items-center gap-3 mb-4">
          <div class="rating-stars mb-0">
            <i class="bi bi-star-fill"></i>
            <span class="fw-bold text-white fs-6">${product.rating}</span>
            <span class="text-muted">(${product.reviewsCount} customer reviews)</span>
          </div>
          <span class="text-muted">|</span>
          <span class="text-success small fw-bold"><i class="bi bi-box-seam me-1"></i>In Stock (${product.stock} units)</span>
        </div>

        <div class="price-row mb-4">
          <span class="current-price fs-2">$${product.price.toFixed(2)}</span>
          ${product.originalPrice ? `<span class="original-price fs-5">$${product.originalPrice.toFixed(2)}</span>` : ''}
          ${product.discount ? `<span class="discount-badge fs-6">${product.discount}</span>` : ''}
        </div>

        <p class="text-muted mb-4">${product.description}</p>

        <!-- Color Swatches -->
        ${product.colors && product.colors.length ? `
          <div class="mb-4">
            <label class="form-label small fw-bold text-muted d-block mb-2">
              Color: <span id="detail-color-label" class="text-white">${product.colors[0].name}</span>
            </label>
            <div class="d-flex gap-2">
              ${product.colors.map((c, i) => `
                <div class="color-swatch ${i === 0 ? 'active' : ''}" 
                     style="background-color: ${c.hex};" 
                     title="${c.name}"
                     onclick="selectDetailColor(this, '${c.name}')"></div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Sizes Selection -->
        ${product.sizes && product.sizes.length ? `
          <div class="mb-4">
            <label class="form-label small fw-bold text-muted d-block mb-2">Select Option / Size</label>
            <div class="d-flex gap-2 flex-wrap">
              ${product.sizes.map((s, i) => `
                <div class="size-pill ${i === 0 ? 'active' : ''}" 
                     onclick="selectDetailSize(this, '${s}')">${s}</div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Urgency stock gauge -->
        <div class="mb-4 p-3 rounded-3" style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-glass);">
          <div class="d-flex justify-content-between small">
            <span class="text-warning fw-bold"><i class="bi bi-lightning-charge-fill me-1"></i>High Demand Item</span>
            <span class="text-muted">Only ${product.stock} units remaining</span>
          </div>
          <div class="stock-meter">
            <div class="stock-meter-fill" style="width: ${Math.max(20, (product.stock / 25) * 100)}%;"></div>
          </div>
        </div>

        <!-- Add to Cart & Buy Now Buttons -->
        <div class="d-flex gap-3 mb-4 flex-wrap">
          <div class="cart-quantity-controls py-2 px-1">
            <button class="qty-btn px-3" onclick="let q = document.getElementById('detail-qty'); if(parseInt(q.value) > 1) q.value = parseInt(q.value) - 1;">-</button>
            <input type="text" id="detail-qty" value="1" readonly class="text-center bg-transparent border-0 text-white fw-bold" style="width: 44px;">
            <button class="qty-btn px-3" onclick="let q = document.getElementById('detail-qty'); q.value = parseInt(q.value) + 1;">+</button>
          </div>
          <button class="btn btn-aurora-primary flex-grow-1" onclick="handleDetailAddToCart(${product.id})">
            <i class="bi bi-bag-plus"></i> Add to Shopping Bag
          </button>
          <button class="btn btn-aurora-outline px-3" onclick="toggleWishlist(${product.id})" data-wishlist-id="${product.id}" title="Wishlist">
            <i class="bi ${isWishlisted ? 'bi-heart-fill text-danger' : 'bi-heart'}"></i>
          </button>
        </div>

        <!-- Value badges -->
        <div class="row g-2 pt-3 border-top border-secondary">
          <div class="col-6">
            <div class="d-flex align-items-center gap-2 small text-muted">
              <i class="bi bi-truck text-primary fs-5"></i>
              <span>Free Express Worldwide Delivery</span>
            </div>
          </div>
          <div class="col-6">
            <div class="d-flex align-items-center gap-2 small text-muted">
              <i class="bi bi-arrow-repeat text-primary fs-5"></i>
              <span>30-Day Hassle-Free Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Tabbed Specifications & Customer Reviews -->
    <div class="mt-5 pt-4">
      <ul class="nav nav-tabs nav-tabs-aurora mb-4" id="detailTab" role="tablist">
        <li class="nav-item">
          <button class="nav-link active" id="features-tab" data-bs-toggle="tab" data-bs-target="#features" type="button">Key Features</button>
        </li>
        <li class="nav-item">
          <button class="nav-link" id="specs-tab" data-bs-toggle="tab" data-bs-target="#specs" type="button">Technical Specifications</button>
        </li>
        <li class="nav-item">
          <button class="nav-link" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews" type="button">Reviews (${product.reviewsCount})</button>
        </li>
      </ul>
      <div class="tab-content" id="detailTabContent">
        <!-- Key Features Tab -->
        <div class="tab-pane fade show active p-4 rounded-4" id="features" style="background: var(--bg-card); border: 1px solid var(--border-glass);">
          <h5 class="fw-bold mb-3">Highlights & Innovation</h5>
          <div class="row g-3">
            ${product.features.map(f => `
              <div class="col-md-6">
                <div class="d-flex align-items-start gap-2">
                  <i class="bi bi-check2-circle text-primary fs-5 mt-1"></i>
                  <span>${f}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Specs Tab -->
        <div class="tab-pane fade p-4 rounded-4" id="specs" style="background: var(--bg-card); border: 1px solid var(--border-glass);">
          <h5 class="fw-bold mb-3">Comprehensive Specifications</h5>
          <div class="table-responsive">
            <table class="table table-dark table-striped table-bordered border-secondary mb-0">
              <tbody>
                ${Object.entries(product.specs).map(([key, val]) => `
                  <tr>
                    <td class="fw-bold text-muted" style="width: 35%;">${key}</td>
                    <td class="text-white">${val}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Reviews Tab -->
        <div class="tab-pane fade p-4 rounded-4" id="reviews" style="background: var(--bg-card); border: 1px solid var(--border-glass);">
          <div class="row g-4">
            <div class="col-lg-4 text-center border-end border-secondary">
              <div class="display-3 fw-bold text-warning mb-1">${product.rating}</div>
              <div class="rating-stars justify-content-center mb-2 fs-5">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
              </div>
              <p class="text-muted small">Based on ${product.reviewsCount} verified purchases</p>
            </div>
            <div class="col-lg-8" id="customer-reviews-list">
              <div class="mb-4 pb-3 border-bottom border-secondary">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <h6 class="fw-bold mb-0">Marcus Vance <span class="badge bg-success-subtle text-success small ms-2">Verified Buyer</span></h6>
                  <span class="text-muted small">2 days ago</span>
                </div>
                <div class="text-warning small mb-2"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></div>
                <p class="text-muted small mb-0">Exceeded every expectation. The build quality feels like something from a luxury watchmaker. Unboxing was an experience in itself.</p>
              </div>

              <div class="mb-4 pb-3 border-bottom border-secondary">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <h6 class="fw-bold mb-0">Elena Rostova <span class="badge bg-success-subtle text-success small ms-2">Verified Buyer</span></h6>
                  <span class="text-muted small">1 week ago</span>
                </div>
                <div class="text-warning small mb-2"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i></div>
                <p class="text-muted small mb-0">Super fast delivery and pristine packaging. Highly recommend Aurora Luxe to anyone who values minimalist elegance.</p>
              </div>

              <!-- Submit review toggle -->
              <div class="mt-4">
                <button class="btn btn-aurora-outline btn-sm" onclick="document.getElementById('add-review-form').classList.toggle('d-none')">
                  <i class="bi bi-pencil-square"></i> Write a Review
                </button>
                <div id="add-review-form" class="d-none mt-3 p-3 rounded-3 border border-secondary" style="background: rgba(0,0,0,0.2);">
                  <div class="mb-2">
                    <input type="text" id="review-author" class="form-control form-glass" placeholder="Your Name">
                  </div>
                  <div class="mb-2">
                    <textarea id="review-body" class="form-control form-glass" rows="3" placeholder="Share your experience..."></textarea>
                  </div>
                  <button class="btn btn-aurora-primary btn-sm" onclick="submitUserReview()">Post Review</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Related Products -->
    <div class="mt-5 pt-4">
      <h3 class="fw-bold mb-4">You May Also Admire</h3>
      <div class="row g-4" id="related-products-row"></div>
    </div>
  `;

  // Render related items
  const related = productsData.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
  const relatedContainer = document.getElementById('related-products-row');
  if (relatedContainer) {
    const items = related.length >= 2 ? related : productsData.filter(p => p.id !== product.id).slice(0, 4);
    relatedContainer.innerHTML = items.map(p => `
      <div class="col-6 col-md-4 col-lg-3">
        ${generateProductCardHtml(p)}
      </div>
    `).join('');
  }

  updateWishlistButtonStyles();
}

function switchDetailImage(el, src) {
  document.getElementById('detail-main-img').src = src;
  document.querySelectorAll('.thumb-strip-img').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

function selectDetailColor(el, name) {
  el.parentElement.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
  const label = document.getElementById('detail-color-label');
  if (label) label.textContent = name;
}

function selectDetailSize(el, size) {
  el.parentElement.querySelectorAll('.size-pill').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
}

function handleDetailAddToCart(productId) {
  const qty = parseInt(document.getElementById('detail-qty').value) || 1;
  const colorLabel = document.getElementById('detail-color-label');
  const selectedColor = colorLabel ? colorLabel.textContent : null;
  const activeSize = document.querySelector('#product-detail-container .size-pill.active');
  const selectedSize = activeSize ? activeSize.textContent : null;

  addToCart(productId, qty, selectedColor, selectedSize);
}

function submitUserReview() {
  const author = document.getElementById('review-author').value.trim();
  const text = document.getElementById('review-body').value.trim();
  if (!author || !text) {
    showToast('Missing Fields', 'Please enter your name and review message.', 'error');
    return;
  }

  const list = document.getElementById('customer-reviews-list');
  const newReviewEl = document.createElement('div');
  newReviewEl.className = 'mb-4 pb-3 border-bottom border-secondary';
  newReviewEl.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-1">
      <h6 class="fw-bold mb-0">${escapeHtml(author)} <span class="badge bg-success-subtle text-success small ms-2">Verified Customer</span></h6>
      <span class="text-muted small">Just now</span>
    </div>
    <div class="text-warning small mb-2"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></div>
    <p class="text-muted small mb-0">${escapeHtml(text)}</p>
  `;
  list.insertBefore(newReviewEl, list.firstChild);

  document.getElementById('review-author').value = '';
  document.getElementById('review-body').value = '';
  document.getElementById('add-review-form').classList.add('d-none');
  showToast('Review Submitted', 'Thank you for rating Aurora Luxe products!', 'success');
}

// ==========================================================================
// Dedicated Cart Page
// ==========================================================================
function initCartPage() {
  renderCartPage();

  const couponForm = document.getElementById('cart-coupon-form');
  if (couponForm) {
    couponForm.addEventListener('submit', (e) => {
      e.preventDefault();
      applyCouponCode();
    });
  }
}

function renderCartPage() {
  const container = document.getElementById('cart-page-items');
  const summaryContainer = document.getElementById('cart-order-summary');
  if (!container) return;

  const calcs = getCartCalculations();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="text-center py-5">
        <i class="bi bi-bag-x text-muted" style="font-size: 4rem;"></i>
        <h3 class="fw-bold mt-3">Your Shopping Bag is Empty</h3>
        <p class="text-muted">Explore our curated collections of electronics and designer wear.</p>
        <a href="shop.html" class="btn btn-aurora-primary mt-3">Start Shopping</a>
      </div>
    `;
    if (summaryContainer) summaryContainer.style.display = 'none';
    return;
  }

  if (summaryContainer) summaryContainer.style.display = 'block';

  let itemsHtml = `
    <div class="table-responsive">
      <table class="table table-dark table-borderless align-middle">
        <thead>
          <tr class="border-bottom border-secondary text-muted small text-uppercase">
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
  `;

  cart.forEach((item, index) => {
    itemsHtml += `
      <tr class="border-bottom border-secondary">
        <td>
          <div class="d-flex align-items-center gap-3">
            <img src="${item.image}" alt="${item.name}" class="rounded-3" style="width: 72px; height: 72px; object-fit: cover;">
            <div>
              <h6 class="fw-bold mb-1"><a href="product-detail.html?id=${item.id}">${item.name}</a></h6>
              <div class="text-muted small">
                ${item.color ? `<span class="me-2">Color: ${item.color}</span>` : ''}
                ${item.size ? `<span>Size: ${item.size}</span>` : ''}
              </div>
            </div>
          </div>
        </td>
        <td class="fw-bold">$${item.price.toFixed(2)}</td>
        <td>
          <div class="cart-quantity-controls">
            <button class="qty-btn" onclick="updateCartQuantity(${index}, ${item.quantity - 1})">-</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn" onclick="updateCartQuantity(${index}, ${item.quantity + 1})">+</button>
          </div>
        </td>
        <td class="fw-bold text-primary">$${(item.price * item.quantity).toFixed(2)}</td>
        <td>
          <button class="btn btn-link text-danger p-0" onclick="removeFromCart(${index})" title="Remove">
            <i class="bi bi-trash3"></i>
          </button>
        </td>
      </tr>
    `;
  });

  itemsHtml += `
        </tbody>
      </table>
    </div>
    <div class="d-flex justify-content-between align-items-center mt-3">
      <a href="shop.html" class="btn btn-aurora-outline btn-sm">
        <i class="bi bi-arrow-left me-1"></i> Continue Shopping
      </a>
      <button class="btn btn-outline-danger btn-sm" onclick="clearCart()">
        <i class="bi bi-trash me-1"></i> Clear Cart
      </button>
    </div>
  `;

  container.innerHTML = itemsHtml;

  if (summaryContainer) {
    summaryContainer.innerHTML = `
      <div class="card p-4 rounded-4" style="background: var(--bg-card); border: 1px solid var(--border-glass);">
        <h5 class="fw-bold mb-3">Order Summary</h5>
        <div class="d-flex justify-content-between mb-2 text-muted">
          <span>Subtotal</span>
          <span class="text-white fw-bold">$${calcs.subtotal}</span>
        </div>
        ${appliedCoupon ? `
          <div class="d-flex justify-content-between mb-2 text-success">
            <span>Coupon (${appliedCoupon.code || 'AURORA20'})</span>
            <span>-$${calcs.discountAmount}</span>
          </div>
        ` : ''}
        <div class="d-flex justify-content-between mb-2 text-muted">
          <span>Shipping</span>
          <span class="text-white">${parseFloat(calcs.shippingCost) === 0 ? '<span class="text-success fw-bold">FREE</span>' : '$' + calcs.shippingCost}</span>
        </div>
        <div class="d-flex justify-content-between mb-3 text-muted">
          <span>Estimated Tax (8%)</span>
          <span class="text-white">$${calcs.taxAmount}</span>
        </div>
        <div class="d-flex justify-content-between mb-4 fs-4 fw-bold text-white border-top border-secondary pt-3">
          <span>Total</span>
          <span class="text-primary">$${calcs.total}</span>
        </div>

        <!-- Coupon input -->
        <div class="mb-4">
          <label class="form-label small text-muted">Promo or Gift Code</label>
          <div class="input-group">
            <input type="text" id="coupon-code-input" class="form-control form-glass" placeholder="e.g. AURORA20" value="${appliedCoupon ? appliedCoupon.code || 'AURORA20' : ''}">
            <button class="btn btn-aurora-outline" type="button" onclick="applyCouponCode()">Apply</button>
          </div>
          <small class="text-muted d-block mt-1">Hint: Try code <strong>AURORA20</strong> for 20% off or <strong>FREESHIP</strong></small>
        </div>

        <a href="checkout.html" class="btn btn-aurora-primary justify-content-center py-3 fs-6">
          <i class="bi bi-shield-check me-2"></i> Proceed to Checkout
        </a>
      </div>
    `;
  }
}

function applyCouponCode() {
  const input = document.getElementById('coupon-code-input');
  if (!input) return;
  const code = input.value.trim().toUpperCase();

  if (PROMO_CODES[code]) {
    appliedCoupon = { code: code, ...PROMO_CODES[code] };
    localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
    showToast('Promo Code Applied!', `${appliedCoupon.description}`, 'success');
    if (document.getElementById('cart-page-items')) renderCartPage();
    if (document.getElementById('checkout-items-summary')) renderCheckoutSummary();
    renderOffcanvasCart();
  } else {
    showToast('Invalid Coupon', 'That promotional code is not valid or expired.', 'error');
  }
}

// ==========================================================================
// Wishlist Page Controller
// ==========================================================================
function initWishlistPage() {
  const container = document.getElementById('wishlist-grid');
  if (!container) return;

  if (wishlist.length === 0) {
    container.innerHTML = `
      <div class="col-12 py-5 text-center">
        <i class="bi bi-heart text-muted" style="font-size: 3.5rem;"></i>
        <h4 class="fw-bold mt-3">Your Wishlist is Empty</h4>
        <p class="text-muted">Tap the heart on any luxury piece to save it for later.</p>
        <a href="shop.html" class="btn btn-aurora-primary mt-2">Explore Catalog</a>
      </div>
    `;
    return;
  }

  const savedProducts = productsData.filter(p => wishlist.includes(p.id));
  container.innerHTML = savedProducts.map(p => `
    <div class="col-6 col-md-4 col-lg-3 mb-4">
      ${generateProductCardHtml(p)}
    </div>
  `).join('');

  updateWishlistButtonStyles();
}

// ==========================================================================
// Checkout Page Controller
// ==========================================================================
function initCheckoutPage() {
  renderCheckoutSummary();

  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleOrderPlacement();
    });
  }

  // Payment method switcher
  const methodRadios = document.querySelectorAll('input[name="paymentMethod"]');
  methodRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      document.querySelectorAll('.payment-method-card').forEach(c => c.classList.remove('selected'));
      const card = e.target.closest('.payment-method-card');
      if (card) card.classList.add('selected');

      const cardFields = document.getElementById('credit-card-fields');
      const upiFields = document.getElementById('upi-fields');
      if (cardFields && upiFields) {
        cardFields.style.display = e.target.value === 'card' ? 'block' : 'none';
        upiFields.style.display = e.target.value === 'upi' ? 'block' : 'none';
      }
    });
  });
}

function renderCheckoutSummary() {
  const container = document.getElementById('checkout-items-summary');
  if (!container) return;

  const calcs = getCartCalculations();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="text-center py-4">
        <p class="text-muted">No items in cart for checkout.</p>
        <a href="shop.html" class="btn btn-aurora-primary btn-sm">Return to Shop</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="mb-4" style="max-height: 280px; overflow-y: auto;">
      ${cart.map(item => `
        <div class="d-flex align-items-center gap-3 py-2 border-bottom border-secondary">
          <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; border-radius: 8px; object-fit: cover;">
          <div class="flex-grow-1 text-truncate">
            <h6 class="small fw-bold mb-0 text-truncate text-white">${item.name}</h6>
            <div class="text-muted" style="font-size: 0.75rem;">Qty: ${item.quantity} ${item.color ? `· ${item.color}` : ''}</div>
          </div>
          <div class="fw-bold small text-primary">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
      `).join('')}
    </div>

    <div class="d-flex justify-content-between mb-2 small text-muted">
      <span>Subtotal</span>
      <span class="text-white fw-bold">$${calcs.subtotal}</span>
    </div>
    ${appliedCoupon ? `
      <div class="d-flex justify-content-between mb-2 small text-success">
        <span>Coupon Discount</span>
        <span>-$${calcs.discountAmount}</span>
      </div>
    ` : ''}
    <div class="d-flex justify-content-between mb-2 small text-muted">
      <span>Shipping Method</span>
      <span class="text-white">${parseFloat(calcs.shippingCost) === 0 ? '<span class="text-success fw-bold">FREE</span>' : '$' + calcs.shippingCost}</span>
    </div>
    <div class="d-flex justify-content-between mb-3 small text-muted">
      <span>Estimated Tax (8%)</span>
      <span class="text-white">$${calcs.taxAmount}</span>
    </div>
    <div class="d-flex justify-content-between mb-3 fs-5 fw-bold text-white border-top border-secondary pt-2">
      <span>Total Amount</span>
      <span class="text-primary">$${calcs.total}</span>
    </div>
  `;
}

function handleOrderPlacement() {
  if (cart.length === 0) {
    showToast('Cart Empty', 'Please add products before checking out.', 'error');
    return;
  }

  const calcs = getCartCalculations();
  const orderId = 'AL-' + Math.floor(100000 + Math.random() * 900000);
  const firstName = document.getElementById('billing-first-name')?.value || 'Valued';
  const lastName = document.getElementById('billing-last-name')?.value || 'Client';
  const email = document.getElementById('billing-email')?.value || 'customer@auroraluxe.com';

  let successModal = document.getElementById('orderSuccessModal');
  if (!successModal) {
    successModal = document.createElement('div');
    successModal.id = 'orderSuccessModal';
    successModal.className = 'modal fade';
    successModal.tabIndex = -1;
    document.body.appendChild(successModal);
  }

  successModal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content modal-content-glass text-center p-4">
        <div class="modal-body">
          <div class="mb-3">
            <span class="d-inline-flex p-3 rounded-circle bg-success-subtle text-success fs-1">
              <i class="bi bi-check-circle-fill"></i>
            </span>
          </div>
          <h3 class="fw-bold mb-2">Order Confirmed!</h3>
          <p class="text-muted small mb-4">Thank you, <strong>${escapeHtml(firstName)} ${escapeHtml(lastName)}</strong>. Your order has been placed and is being carefully assembled.</p>
          
          <div class="p-3 rounded-3 mb-4 text-start small border border-secondary" style="background: rgba(0,0,0,0.3);">
            <div class="d-flex justify-content-between mb-1">
              <span class="text-muted">Order ID:</span>
              <span class="fw-bold text-white">${orderId}</span>
            </div>
            <div class="d-flex justify-content-between mb-1">
              <span class="text-muted">Date:</span>
              <span class="text-white">${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div class="d-flex justify-content-between mb-1">
              <span class="text-muted">Confirmation Sent to:</span>
              <span class="text-white">${escapeHtml(email)}</span>
            </div>
            <div class="d-flex justify-content-between border-top border-secondary pt-2 mt-2">
              <span class="fw-bold">Total Paid:</span>
              <span class="fw-bold text-primary">$${calcs.total}</span>
            </div>
          </div>

          <div class="d-grid gap-2">
            <button class="btn btn-aurora-primary" onclick="window.print()">
              <i class="bi bi-printer me-1"></i> Print / Save Receipt
            </button>
            <a href="index.html" class="btn btn-aurora-outline btn-sm" onclick="clearCart()">
              Return to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  // Clear cart on successful checkout
  clearCart();

  const bsModal = new bootstrap.Modal(successModal);
  bsModal.show();
}

// ==========================================================================
// Countdown Timer for Flash Deals
// ==========================================================================
function initCountdownTimer() {
  const hoursEl = document.getElementById('deal-hours');
  const minsEl = document.getElementById('deal-mins');
  const secsEl = document.getElementById('deal-secs');
  if (!hoursEl || !minsEl || !secsEl) return;

  // Set deal target to midnight of tomorrow
  let target = new Date();
  target.setHours(23, 59, 59, 999);

  function update() {
    const now = new Date().getTime();
    const diff = target.getTime() - now;

    if (diff <= 0) {
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    hoursEl.textContent = h.toString().padStart(2, '0');
    minsEl.textContent = m.toString().padStart(2, '0');
    secsEl.textContent = s.toString().padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

// ==========================================================================
// UI Helpers: Scroll Navbar & Scroll-to-Top
// ==========================================================================
function setupNavbarScroll() {
  const navbar = document.querySelector('.aurora-navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

function initScrollTop() {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}
