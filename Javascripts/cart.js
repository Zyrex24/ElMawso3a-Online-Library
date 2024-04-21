function loadCartFromLocalStorage() {
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
        const parsedCartItems = JSON.parse(cartItems);
        parsedCartItems.forEach(item => {
            addToCart(item.name, item.price);
        });
    }
}

function saveCartToLocalStorage() {
    const tbody = document.querySelector('#cart-table tbody');
    const rows = tbody.querySelectorAll('tr');
    const cartItems = [];
    rows.forEach(row => {
        const itemName = row.children[0].textContent;
        const itemPrice = parseFloat(row.children[1].textContent);
        const itemQuantity = parseInt(row.children[2].textContent);
        cartItems.push({ name: itemName, price: itemPrice, quantity: itemQuantity });
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}


function addToCart(itemName, price) {
    let tbody = document.querySelector('#cart-table tbody');
    let existingItem = tbody.querySelector('tr[data-item="' + itemName + '"]');

    if (existingItem) {
        let quantityCell = existingItem.querySelector('.quantity');
        let currentQuantity = parseInt(quantityCell.textContent);
        quantityCell.textContent = (currentQuantity + 1).toString();
    } else {
        let row = document.createElement('tr');
        row.dataset.item = itemName;
        row.innerHTML = `
            <td>${itemName}</td>
            <td>${price}</td>
            <td class="quantity">1</td>
        `;
        tbody.appendChild(row);
    }
    saveCartToLocalStorage(); 
}


function clearCart() {
    let tbody = document.querySelector('#cart-table tbody');
    tbody.innerHTML = '';
    localStorage.removeItem('cartItems'); 
}


function goToBorrow(){
    let button = document.getElementById('borrow-button');
    button.addEventListener("click", function() {

        window.location.href = "../templates/borrow.html";
    });
}


window.onload = function() {
    loadCartFromLocalStorage();
};
