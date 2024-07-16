document.addEventListener('DOMContentLoaded', function() {
    const formDataArray = JSON.parse(localStorage.getItem('formDataArray')) || [];
    const tbody = document.getElementById('table').getElementsByTagName('tbody')[0];

    formDataArray.forEach(data => {
        const row = tbody.insertRow();

        const customerNameCell = row.insertCell();
        customerNameCell.textContent = data.customerName;

        const purchaseDateCell = row.insertCell();
        purchaseDateCell.textContent = data.purchaseDate;

        const phoneNumberCell = row.insertCell();
        phoneNumberCell.textContent = data.phoneNumber;

        const emailCell = row.insertCell();
        emailCell.textContent = data.email;

        const addressCell = row.insertCell();
        addressCell.textContent = data.address;

        const genderCell = row.insertCell();
        genderCell.textContent = data.gender;

        const actionCell = row.insertCell();
        const invoiceButton = document.createElement('button');
        invoiceButton.textContent = 'Invoice';
        invoiceButton.className = 'btn btn-primary';
        invoiceButton.onclick = function() {
            // window.location.href = invoice.html?id+{data.id}
            window.location.href = "invoice.html?id=" + data.id;
        };
        actionCell.appendChild(invoiceButton);
    });
});