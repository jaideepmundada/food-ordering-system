document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    calculateTotal();

    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', handleOrderSubmit);
    }
});

function calculateTotal() {
    const checkoutTotalEl = document.getElementById('checkout-total');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        window.location.href = 'cart.html'; // Redirect if cart is empty
        return;
    }

    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    if (checkoutTotalEl) {
        checkoutTotalEl.innerText = totalPrice.toFixed(2);
    }
    return totalPrice;
}

async function handleOrderSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const total_amount = calculateTotal();
    const messageEl = document.getElementById('order-message');

    try {
        const response = await fetch('/api/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                customer_name: name,
                phone: phone,
                address: address,
                total_amount: total_amount
            })
        });

        const data = await response.json();

        if (response.ok) {
            messageEl.textContent = 'Order placed successfully! Redirecting...';
            messageEl.className = 'message success';
            
            // Clear cart
            localStorage.removeItem('cart');
            updateCartCount();
            
            // Redirect to home after 2 seconds
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            messageEl.textContent = data.message || 'Failed to place order.';
            messageEl.className = 'message error';
        }
    } catch (error) {
        console.error('Error placing order:', error);
        messageEl.textContent = 'An error occurred. Please try again.';
        messageEl.className = 'message error';
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const countElements = document.querySelectorAll('#cart-count');
    countElements.forEach(el => el.innerText = count);
}
