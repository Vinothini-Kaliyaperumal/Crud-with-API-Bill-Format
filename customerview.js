document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const customerEmail = urlParams.get('email');

    if (customerEmail) {
        fetch(`http://localhost:8080/api/invoice/getCustomer/${customerEmail}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched data:', data); 

                const customerData = data.data.Data.customer;
                const invoiceData = data.data.Data;

                document.getElementById('customerName').textContent = customerData.customerName;
                document.getElementById('date').textContent = customerData.date;
                document.getElementById('mobileNo').textContent = customerData.mobileNo;
                document.getElementById('email').textContent = customerData.email;
                document.getElementById('address').textContent = customerData.address;
                document.getElementById('gender').textContent = customerData.gender;

      const itemsList = document.getElementById('items-list');
itemsList.innerHTML = '';

// if (Array.isArray(customerData.customerProducts) && customerData.customerProducts.length > 0) {
//     customerData.customerProducts.forEach(item => {
//         const rowElement = document.createElement('tr');

//         const productNameElement = document.createElement('td');
//         productNameElement.textContent = item.productName;
//         rowElement.appendChild(productNameElement);

//         const quantityElement = document.createElement('td');
//         quantityElement.textContent = item.quantity;
//         rowElement.appendChild(quantityElement);

//         const priceElement = document.createElement('td');
//         priceElement.textContent = `${item.price}`;
//         rowElement.appendChild(priceElement);

//         const totalElement = document.createElement('td');
//         totalElement.textContent = `Rs. ${(item.price * item.quantity).toFixed(2)}`;
//         rowElement.appendChild(totalElement);

//         itemsList.appendChild(rowElement);
//     });
// } else {
//     const rowElement = document.createElement('tr');
//     const noItemsElement = document.createElement('td');
//     noItemsElement.textContent = 'No items available';
//     noItemsElement.colSpan = 4; 
//     rowElement.appendChild(noItemsElement);
//     itemsList.appendChild(rowElement);
// }


// Assuming itemsList is the reference to the table body where the rows are to be added
let rowCounter = 1; // Initialize a counter for serial numbers

if (Array.isArray(customerData.customerProducts) && customerData.customerProducts.length > 0) {
    customerData.customerProducts.forEach(item => {
        const rowElement = document.createElement('tr');

        const serialNoElement = document.createElement('td'); // Create the serial number cell
        serialNoElement.textContent = rowCounter++; // Set the text to the current counter value and increment it
        rowElement.appendChild(serialNoElement);

        const productNameElement = document.createElement('td');
        productNameElement.textContent = item.productName;
        rowElement.appendChild(productNameElement);

        const quantityElement = document.createElement('td');
        quantityElement.textContent = item.quantity;
        rowElement.appendChild(quantityElement);

        const priceElement = document.createElement('td');
        priceElement.textContent = `${item.price}`;
        rowElement.appendChild(priceElement);

        const totalElement = document.createElement('td');
        totalElement.textContent = `Rs. ${(item.price * item.quantity).toFixed(2)}`;
        rowElement.appendChild(totalElement);

        itemsList.appendChild(rowElement);
    });
} else {
    const rowElement = document.createElement('tr');
    const noItemsElement = document.createElement('td');
    noItemsElement.textContent = 'No items available';
    noItemsElement.colSpan = 5; // Adjust colspan to match the number of columns
    rowElement.appendChild(noItemsElement);
    itemsList.appendChild(rowElement);
}

                document.getElementById('subtotal').textContent = invoiceData.totalprouctsAmount.toFixed(2);
                document.getElementById('gst').textContent = invoiceData.gstAmount.toFixed(2);
                document.getElementById('discount').textContent = invoiceData.discountAmount.toFixed(2);
                document.getElementById('total').textContent = invoiceData.grandTotalAmount.toFixed(2);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                document.getElementById('invoice-details').textContent = 'Error fetching data';
            });
    } else {
        document.getElementById('invoice-details').textContent = 'No customer email provided';
    }
});








