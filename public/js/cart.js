document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCart();
});

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalItemsEl = document.getElementById('total-items');
    const totalPriceEl = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
        totalItemsEl.innerText = '0';
        totalPriceEl.innerText = '0.00';
        checkoutBtn.style.display = 'none';
        return;
    }

    checkoutBtn.style.display = 'block';
    cartItemsContainer.innerHTML = '';
    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach((item, index) => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;

        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <div class="cart-item-actions">
                <button class="btn btn-danger remove-btn" data-index="${index}">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemEl);
    });

    totalItemsEl.innerText = totalItems;
    totalPriceEl.innerText = totalPrice.toFixed(2);

    // Add event listeners for remove buttons
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', removeFromCart);
    });
}

function removeFromCart(e) {
    const index = e.target.getAttribute('data-index');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    cart.splice(index, 1); // Remove item at index
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartCount();
    renderCart();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const countElements = document.querySelectorAll('#cart-count');
    countElements.forEach(el => el.innerText = count);
}
