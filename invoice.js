// document.addEventListener('DOMContentLoaded', () => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const customerEmail = urlParams.get('email');

//     if (customerEmail) {
//         fetch(`http://localhost:8080/api/invoice/getCustomer/${customerEmail}`)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok ' + response.statusText);
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 console.log('Fetched data:', data); // Log the data to verify its structure

//                 // Access the nested data
//                 const customerData = data.data.Data.customer;
//                 const invoiceData = data.data.Data;

//                 // Populate the invoice details
//                 document.getElementById('customerName').textContent = customerData.customerName;
//                 document.getElementById('date').textContent = customerData.date;
//                 document.getElementById('mobileNo').textContent = customerData.mobileNo;
//                 document.getElementById('email').textContent = customerData.email;
//                 document.getElementById('address').textContent = customerData.address;
//                 document.getElementById('gender').textContent = customerData.gender;

//                 // Populate itemsa
//                 const itemsList = document.getElementById('items-list');
//                 itemsList.innerHTML = '';
//                 if (Array.isArray(customerData.customerProducts) && customerData.customerProducts.length > 0) {
//                     customerData.customerProducts.forEach(item => {
//                         const itemElement = document.createElement('p');
//                         itemElement.textContent = `${item.productName} - $${item.price} (Qty: ${item.quantity})`;
//                         itemsList.appendChild(itemElement);
//                     });
//                 } else {
//                     itemsList.textContent = 'No items available';
//                 }

//                 // Populate totals
//                 document.getElementById('subtotal').textContent = invoiceData.totalprouctsAmount.toFixed(2);
//                 document.getElementById('gst').textContent = invoiceData.gstAmount.toFixed(2);
//                 document.getElementById('discount').textContent = invoiceData.discountAmount.toFixed(2);
//                 document.getElementById('total').textContent = invoiceData.grandTotalAmount.toFixed(2);
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//                 // Optionally display an error message on the page
//                 document.getElementById('invoice-details').textContent = 'Error fetching data';
//             });
//     } else {
//         document.getElementById('invoice-details').textContent = 'No customer email provided';
//     }
// });










// // document.addEventListener('DOMContentLoaded', () => {
// //     const urlParams = new URLSearchParams(window.location.search);
// //     const customerEmail = urlParams.get('email');

// //     if (customerEmail) {
// //         fetch(`http://localhost:8080/api/invoice/getCustomer/${customerEmail}`)
// //             .then(response => {
// //                 if (!response.ok) {
// //                     throw new Error('Network response was not ok ' + response.statusText);
// //                 }
// //                 return response.json();
// //             })
// //             .then(data => {
// //                 console.log('Fetched data:', data); // Log the data to verify its structure

// //                 // Access the nested data
// //                 const customerData = data.data.Data.customer;
// //                 const invoiceData = data.data.Data;

// //                 // Populate the invoice details
// //                 document.getElementById('customerName').textContent = customerData.customerName;
// //                 document.getElementById('date').textContent = customerData.date;
// //                 document.getElementById('mobileNo').textContent = customerData.mobileNo;
// //                 document.getElementById('email').textContent = customerData.email;
// //                 document.getElementById('address').textContent = customerData.address;
// //                 document.getElementById('gender').textContent = customerData.gender;

// //                 // Populate items
// //                 const itemsList = document.getElementById('items-list');
// //                 itemsList.innerHTML = '';
// //                 if (Array.isArray(customerData.customerProducts) && customerData.customerProducts.length > 0) {
// //                     customerData.customerProducts.forEach(item => {
// //                         const itemElement = document.createElement('p');
// //                         itemElement.textContent = `${item.productName} - $${item.price} (Qty: ${item.quantity})`;
// //                         itemsList.appendChild(itemElement);
// //                     });
// //                 } else {
// //                     itemsList.textContent = 'No items available';
// //                 }

// //                 // Populate totals
// //                 document.getElementById('subtotal').textContent = invoiceData.totalprouctsAmount.toFixed(2);
// //                 document.getElementById('gst').textContent = invoiceData.gstAmount.toFixed(2);
// //                 document.getElementById('discount').textContent = invoiceData.discountAmount.toFixed(2);
// //                 document.getElementById('total').textContent = invoiceData.grandTotalAmount.toFixed(2);
// //             })

// //         .catch(error => {
// //             console.error('Error fetching data:', error);
// //             // Optionally display an error message on the page
// //             document.getElementById('invoice-details').textContent = 'Error fetching data';
// //         });
// // } else {
// //     document.getElementById('invoice-details').textContent = 'No customer email provided';
// // }
// // });









