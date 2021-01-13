// Query Selector
const form = document.querySelector('#order-form');
const input = form.querySelector('#item-input');
const menu = [];
let order = [];


// Functions
function handleSubmit(event) {

    event.preventDefault();

    const item = findItem(input.value);

    if (!item) return alert('Please enter a menu item in the text box to place an order');

}


// Find Menu Item
function findItem(name) {

    return menu.find(itm => itm.name.toLowerCase() === name.toLowerCase());

}


// Create Menu From The HTML
function createMenu() {

    const items = document.querySelectorAll('.menu li');

    items.forEach(item => {
        const parts = item.textContent.split(': $');
        menu.push({
            name: parts[0],
            price: parseFloat(parts[1])
        });
    });

}



// Event Listeners
form.addEventListener('submit', handleSubmit);
window.addEventListener('load', createMenu);