
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const formDataArray = JSON.parse(localStorage.getItem('formDataArray')) || [];
    const data = formDataArray.find(item => item.id === id);

    if (data) {
        const invoiceDetails = document.getElementById('invoice-details');
        let itemsHTML = '';

        data.items.forEach(item => {
            itemsHTML += <p>${item.product} - Quantity: ${item.quantity}, Price: ${item.price}, Amount: ${item.amount}</p>;
        });

        invoiceDetails.innerHTML = `
            <h2>Customer Name: ${data.customerName}</h2>
            <p>Purchase Date: ${data.purchaseDate}</p>
            <p>Phone Number: ${data.phoneNumber}</p>
            <p>Email: ${data.email}</p>
            <p>Address: ${data.address}</p>
            <p>Gender: ${data.gender}</p>
            <h3>Items:</h3>
            ${itemsHTML}
            <h4>Subtotal: $${parseFloat(data.items.reduce((acc, item) => acc + parseFloat(item.amount), 0)).toFixed(2)}</h4>
            <h4>GST (5%): $${(parseFloat(data.items.reduce((acc, item) => acc + parseFloat(item.amount), 0)) * 0.05).toFixed(2)}</h4>
            <h4>Discount (10%): $${(parseFloat(data.items.reduce((acc, item) => acc + parseFloat(item.amount), 0)) * 0.10).toFixed(2)}</h4>
            <h4>Total: $${(parseFloat(data.items.reduce((acc, item) => acc + parseFloat(item.amount), 0))  1.05  0.90).toFixed(2)}</h4>
        `;
    }
});