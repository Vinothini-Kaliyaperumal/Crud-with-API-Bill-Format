document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#invoiceTable tbody');

    function displayCustomerData(data) {
        const customerData = data.data.Data;

        if (Array.isArray(customerData) && customerData.length > 0) {
            customerData.forEach(item => {
                const row = document.createElement('tr');

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

                const viewButton = document.createElement('button');
                viewButton.textContent = 'View';
                viewButton.className = 'btn btn-info';
                viewButton.onclick = () => {
                    window.location.href = `customerview.html?email=${item.email}`;
                };
                actionCell.appendChild(viewButton);
            
                    const editButton = document.createElement('button');
                    editButton.textContent = 'Edit';
                    editButton.className = 'btn btn-secondary ml-2';
                    editButton.onclick = () => {
                        localStorage.setItem('editCustomer', JSON.stringify(item));
                        window.location.href = 'customer.html';
                    };
                    actionCell.appendChild(editButton);

                row.appendChild(actionCell);
                tableBody.appendChild(row);
            });
        } else {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.colSpan = 7; 
            cell.textContent = 'No data available';
            row.appendChild(cell);
            tableBody.appendChild(row);
        }
    }

    function fetchAndDisplayCustomerData(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched data:', data);
                displayCustomerData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                tableBody.innerHTML = '<tr><td colspan="7">Error fetching data</td></tr>'; 
            });
    }

    fetchAndDisplayCustomerData('http://localhost:8080/api/invoice/getAllCustomer');

    document.getElementById('showProductsBtn').addEventListener('click', () => {
        fetchAndDisplayCustomerData('http://localhost:8080/api/invoice/getAllCustomerAndBuyedProduct');
    });
});
























