// document.addEventListener('DOMContentLoaded', function() {
//     const formDataArray = JSON.parse(localStorage.getItem('formDataArray')) || [];
//     const tbody = document.getElementById('table').getElementsByTagName('tbody')[0];

//     formDataArray.forEach(data => {
//         const row = tbody.insertRow();

//         const customerNameCell = row.insertCell();
//         customerNameCell.textContent = data.customerName;

//         const purchaseDateCell = row.insertCell();
//         purchaseDateCell.textContent = data.purchaseDate;

//         const phoneNumberCell = row.insertCell();
//         phoneNumberCell.textContent = data.phoneNumber;

//         const emailCell = row.insertCell();
//         emailCell.textContent = data.email;

//         const addressCell = row.insertCell();
//         addressCell.textContent = data.address;

//         const genderCell = row.insertCell();
//         genderCell.textContent = data.gender;

//         const actionCell = row.insertCell();
//         const invoiceButton = document.createElement('button');
//         invoiceButton.textContent = 'Invoice';
//         invoiceButton.className = 'btn btn-primary';
//         invoiceButton.onclick = function() {
//             // window.location.href = invoice.html?id+{data.id}
//             window.location.href = "invoice.html?id=" + data.id;
//         };
//         actionCell.appendChild(invoiceButton);
//     });
// });
document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8080/api/invoice/getAllCustomer')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data); // Log the data to verify its structure

            const tableBody = document.querySelector('#invoiceTable tbody');
            tableBody.innerHTML = ''; // Clear existing rows

            // Access the nested Data array
            const customerData = data.data.Data;

            // Check if customerData is an array and not empty
            if (Array.isArray(customerData) && customerData.length > 0) {
                customerData.forEach(item => {
                    const row = document.createElement('tr');

                    // Create cells for each item property
                    const nameCell = document.createElement('td');
                    nameCell.textContent = item.customerName || 'N/A';
                    row.appendChild(nameCell);

                    const dateCell = document.createElement('td');
                    dateCell.textContent = item.date || 'N/A';
                    row.appendChild(dateCell);

                    const phoneCell = document.createElement('td');
                    phoneCell.textContent = item.mobileNo || 'N/A';
                    row.appendChild(phoneCell);

                    const emailCell = document.createElement('td');
                    emailCell.textContent = item.email || 'N/A';
                    row.appendChild(emailCell);

                    const addressCell = document.createElement('td');
                    addressCell.textContent = item.address || 'N/A';
                    row.appendChild(addressCell);

                    const genderCell = document.createElement('td');
                    genderCell.textContent = item.gender || 'N/A';
                    row.appendChild(genderCell);

                    const actionCell = document.createElement('td');
                    actionCell.innerHTML = '<button>Action</button>';
                    row.appendChild(actionCell);

                    tableBody.appendChild(row);
                });
            } else {
                // Display a message if no data is available
                const row = document.createElement('tr');
                const cell = document.createElement('td');
                cell.colSpan = 7; // Adjust based on the number of columns
                cell.textContent = 'No data available';
                row.appendChild(cell);
                tableBody.appendChild(row);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Optionally display an error message in the table
            const tableBody = document.querySelector('#invoiceTable tbody');
            tableBody.innerHTML = '<tr><td colspan="7">Error fetching data</td></tr>'; // Adjust based on the number of columns
        });
});