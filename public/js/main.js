document.addEventListener('DOMContentLoaded', () => {
    const foodListContainer = document.getElementById('food-list');
    updateCartCount();

    // Fetch foods from the backend API
    fetch('/api/foods')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(foods => {
            renderFoods(foods);
        })
        .catch(error => {
            console.error('Error fetching foods:', error);
            foodListContainer.innerHTML = '<p class="error">Failed to load menu items. Is the server running?</p>';
        });

    function renderFoods(foods) {
        if (foods.length === 0) {
            foodListContainer.innerHTML = '<p>No food items available.</p>';
            return;
        }

        foodListContainer.innerHTML = '';
        foods.forEach(food => {
            const card = document.createElement('div');
            card.className = 'food-card';
            card.innerHTML = `
                <h3 class="food-card-title">${food.name}</h3>
                <p class="food-card-price">$${Number(food.price).toFixed(2)}</p>
                <button class="btn btn-primary add-to-cart-btn" data-id="${food.id}" data-name="${food.name}" data-price="${food.price}">
                    Add to Cart
                </button>
            `;
            foodListContainer.appendChild(card);
        });

        // Add event listeners to "Add to Cart" buttons
        const addButtons = document.querySelectorAll('.add-to-cart-btn');
        addButtons.forEach(btn => {
            btn.addEventListener('click', addToCart);
        });
    }

    function addToCart(e) {
        const btn = e.target;
        const id = btn.getAttribute('data-id');
        const name = btn.getAttribute('data-name');
        const price = parseFloat(btn.getAttribute('data-price'));

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if item already exists in cart
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        // Visual feedback
        const originalText = btn.innerText;
        btn.innerText = 'Added!';
        btn.style.backgroundColor = '#16a34a';
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.backgroundColor = '';
        }, 1000);
    }
});

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const countElements = document.querySelectorAll('#cart-count');
    countElements.forEach(el => el.innerText = count);
}
