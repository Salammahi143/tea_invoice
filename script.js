// Login Form functionality
const loginForm = document.getElementById('login-form');
const loginSection = document.getElementById('login-section');
const invoiceSection = document.getElementById('invoice-section');
const loginError = document.getElementById('login-error');
const loader = document.getElementById('loader');  // Get the loader element

// Sample username and password (For simplicity, you can replace this with an actual authentication mechanism)
const username = 'admin';
const password = 'admin123';

// Event listener for login form submission
loginForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission
    
    // Show the loader while processing login
    loader.style.display = 'block';
    loginError.style.display = 'none'; // Hide the error message initially

    // Simulate a delay for the login process (for example, an API call)
    setTimeout(() => {
        const enteredUsername = document.getElementById('username').value;
        const enteredPassword = document.getElementById('password').value;

        // Hide the loader once the processing is done
        loader.style.display = 'none';

        if (enteredUsername === username && enteredPassword === password) {
            loginSection.style.display = 'none'; // Hide login form
            invoiceSection.style.display = 'block'; // Show invoice section
        } else {
            loginError.style.display = 'block'; // Show error message
        }
    }, 2000); // Simulate a 2-second delay
});

// Invoice functionality
const addItemButton = document.getElementById('add-item');
const invoiceTableBody = document.querySelector('#invoice-table tbody');
const subtotalElement = document.getElementById('subtotal');
const totalElement = document.getElementById('total');
const generateInvoiceButton = document.getElementById('generate-invoice');
const printInvoiceButton = document.getElementById('print-invoice');

// Function to update subtotal and total
function updateTotal() {
    let subtotal = 0;
    const rows = document.querySelectorAll('#invoice-table tbody tr');
    
    rows.forEach(row => {
        const quantity = parseFloat(row.querySelector('.quantity').value);
        const price = parseFloat(row.querySelector('.price').value);
        const total = quantity * price;
        row.querySelector('.total-price').textContent = total.toFixed(2);
        subtotal += total;
    });

    subtotalElement.textContent = `৳ ${subtotal.toFixed(2)}`;
    totalElement.textContent = `৳ ${subtotal.toFixed(2)}`;
}

// Event listener for adding an item to the invoice
addItemButton.addEventListener('click', function () {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" class="item" placeholder="Tea Name"></td>
        <td><input type="number" class="quantity" value="1" min="1"></td>
        <td><input type="number" class="price" value="10.00" min="0" step="0.01"></td>
        <td><span class="total-price">10.00</span></td>
        <td><button class="remove-item">Remove</button></td>
    `;

    row.querySelector('.remove-item').addEventListener('click', function () {
        row.remove(); // Remove the item row
        updateTotal(); // Update total after removal
    });

    invoiceTableBody.appendChild(row); // Append new row to the table body
    updateTotal(); // Update the total whenever an item is added
});

// Event listener for quantity or price change
document.addEventListener('input', function (e) {
    if (e.target.classList.contains('quantity') || e.target.classList.contains('price')) {
        updateTotal();
    }
});

// Event listener for generating invoice
generateInvoiceButton.addEventListener('click', function () {
    alert('Invoice has been generated successfully!');
    // You can add custom logic here to save or display the final invoice message.
});

// Event listener for printing invoice
printInvoiceButton.addEventListener('click', function () {
    // Trigger the print functionality
    window.print(); // Open the print dialog
});
