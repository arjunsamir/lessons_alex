// Select Elements
const elements = {
    form: document.querySelector('#order-form'),
    input: document.querySelector('#item-input'),
    subtotal: document.querySelector('#subtotal'),
    tax: document.querySelector('#tax'),
    total: document.querySelector('#total'),
    order: document.querySelector('#order'),
    items: document.querySelectorAll('.menu li')
};


// App Variables
const menu = [];
let order = {};
const taxRate = .065;
const cost = {
    subtotal: 0,
    tax: 0,
    total: 0
};

// Helper Functions 
function roundForMoney(amount) {
    return Math.round(amount * 100) / 100;
}


// Main Controller
function handleSubmit(event) {

    // Prevent Default Action of Refreshing the page
    event.preventDefault();

    // Find Our Menu Item
    const item = findItem(elements.input.value);

    // If No item is found then give an error to the user
    if (!item) return alert('Please enter a menu item in the text box to place an order');

    // Add Item to order and update subtotal
    addToOrder(item);

    // Update Order Totals
    calculateTotals();

    // Update Total Order on Screen
    printCost();

    // Print Order
    printOrder();

}


// Print Order To Screen
function printOrder() {

    let items = '';

    for (const key in order) {
        items += `<p>${key}: $${order[key].each.toFixed(2)} &times; ${order[key].quantity}</p>`
    }

    // Clear Out Div
    elements.order.innerHTML = '';

    elements.order.insertAdjacentHTML('afterbegin', items);

}


// Print Cost to the screen
function printCost() {
    elements.subtotal.textContent = cost.subtotal.toFixed(2);
    elements.tax.textContent = cost.tax.toFixed(2);
    elements.total.textContent = cost.total.toFixed(2);
}


// Calculate Tax & Totals
function calculateTotals() {
    cost.tax = cost.subtotal * taxRate;
    cost.total = roundForMoney(cost.subtotal + cost.tax);
}


// Add Item To ORder
function addToOrder(item) {

    // Check to see if item already exists in order
    if (order[item.name]) {

        // Increase Quantity if item exists
        order[item.name].quantity++;
    }

    else {
        // Add Item to order for first time
        order[item.name] = {
            each: item.price,
            quantity: 1
        }
    }

    // Update The Price
    cost.subtotal += item.price;

}


// Find Menu Item
function findItem(name) {

    return menu.find(itm => itm.name.toLowerCase() === name.toLowerCase());

}


// Create Menu From The HTML
function createMenu() {

    elements.items.forEach(item => {
        const parts = item.textContent.split(': $');
        menu.push({
            name: parts[0],
            price: parseFloat(parts[1])
        });
    });

}


// Handle Menu Item Click
function handleMenuItemClick(event) {
    const item = event.target.textContent.split(': $')[0];
    elements.input.value = item;
}


// Attach Event Listeners
window.addEventListener('load', function() {

    // Create Menu After Page Fully Loads
    createMenu();

    // Add Event Listener to listen for form submit
    elements.form.addEventListener('submit', handleSubmit);


    // Add Event Listener to Click on Menu Items
    elements.items.forEach(item => item.addEventListener('click', handleMenuItemClick));

});