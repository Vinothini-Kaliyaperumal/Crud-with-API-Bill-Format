let dataArray = [];

function fetchData() {
    fetch("http://localhost:8080/api/product/get/All/product")
        .then((response) => response.json())
        .then((responseData) => {
            dataArray = responseData.data || [];
            populateDropdowns();
        })
        .catch((error) => console.error("There has been a problem with your fetch operation:", error));
}

fetchData();

function addRow() {
    const table = document.getElementById("bill-table").getElementsByTagName("tbody")[0];
    const rowCount = table.rows.length;
    const row = table.insertRow();

    row.innerHTML = 
        `<td>${rowCount + 1}</td>
        <td>
            <select class="form-control box" name="productName" onchange="setPrice(this);">
                <option value="" data-price="0">Select a product</option>
            </select>
            <span class="error productNameError"></span>
        </td>
        <td>
            <input type="number" class="form-control box" name="quantity" placeholder="Enter quantity">
            <span class="error quantityError"></span>
        </td>
        <td><input type="number" class="form-control box" name="price" readonly></td>
        <td><input type="number" class="form-control box" name="totalAmount" readonly></td>
        <td>
            <button type="button" class="btn btn-danger dlbox" onclick="deleteRow(this)">Delete</button>
        </td>`;

    populateDropdown(row.querySelector("select"));
    addEventListeners(row);
    validateRows(); 
}

function populateDropdown(selectElement) {
    selectElement.innerHTML = '<option value="" data-price="0" data-stock="0">Select a product</option>';
    dataArray.forEach((product) => {
        if (product.productName) {
            const option = document.createElement("option");
            option.value = product.productName;
            option.setAttribute("data-price", product.price);
            option.setAttribute("data-stock", product.stock);
            option.textContent = product.productName;
            selectElement.appendChild(option);
        }
    });
    updateDisabledOptions();
}

function populateDropdowns() {
    document.querySelectorAll("select[name='productName']").forEach(populateDropdown);
}

function updateDisabledOptions() {
    const selectedProducts = Array.from(document.querySelectorAll("select[name='productName']"))
        .map(select => select.value)
        .filter(value => value);

    document.querySelectorAll("select[name='productName']").forEach(select => {
        Array.from(select.options).forEach(option => {
            if (selectedProducts.includes(option.value) && option.value !== select.value) {
                option.disabled = true;
                option.classList.add('disabled-option');
            } else {
                option.disabled = false;
                option.classList.remove('disabled-option');
            }
        });
    });
}

function validateRow(row) {
    const productSelect = row.querySelector('select[name="productName"]');
    const quantityInput = row.querySelector('input[name="quantity"]');
    const quantityError = row.querySelector('.quantityError');

    let isValid = true;

    quantityError.textContent = "";

    const quantity = parseInt(quantityInput.value) || 20;
    const selectedOption = productSelect.options[productSelect.selectedIndex];
    const stock = parseInt(selectedOption.getAttribute("data-stock")) || 20;

    if (quantity > stock) {
        quantityError.textContent = `Only ${stock} units available.`;
        isValid = false;
    }

    if (quantity <= 0) {
        quantityError.textContent = 'Quantity must be greater than zero.';
        isValid = false;
    }

    if (!productSelect.value) {
        isValid = false;
    }

    return isValid;
}

function validateRows() {
    const rows = document.querySelectorAll("#bill-table tbody tr");
    let allValid = true;

    rows.forEach(row => {
        const isValid = validateRow(row);
        if (!isValid) {
            allValid = false;
        }
    });

    document.getElementById('add').disabled = !allValid;
}

function deleteRow(button) {
    const row = button.parentElement.parentElement;
    row.parentElement.removeChild(row);
    updateRowNumbers();
    updateTotals();
    validateRows(); 
    updateDisabledOptions();
}

function setPrice(selectElement) {
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const price = parseFloat(selectedOption.getAttribute("data-price"));
    const row = selectElement.closest("tr");
    row.querySelector('input[name="price"]').value = price.toFixed(2);
    calculateAmount(row);
    validateRows(); 
}

function calculateAmount(row) {
    const quantity = parseFloat(row.querySelector('input[name="quantity"]').value);
    const price = parseFloat(row.querySelector('input[name="price"]').value);
    const totalAmount = row.querySelector('input[name="totalAmount"]');

    if (!isNaN(quantity) && !isNaN(price)) {
        totalAmount.value = (quantity * price).toFixed(2);
    } else {
        totalAmount.value = '';
    }
    updateTotals();
    validateRows(); 
}

function updateTotals() {
    const rows = document.querySelectorAll("#bill-table tbody tr");
    let subtotal = 0;

    rows.forEach((row) => {
        const totalAmount = parseFloat(row.querySelector('input[name="totalAmount"]').value);
        if (!isNaN(totalAmount)) {
            subtotal += totalAmount;
        }
    });

    const gst = subtotal * 0.05;
    const discount = subtotal * 0.10;
    const total = subtotal + gst - discount;

    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("gst").textContent = gst.toFixed(2);
    document.getElementById("discount").textContent = discount.toFixed(2);
    document.getElementById("total").textContent = total.toFixed(2);
}

function updateRowNumbers() {
    document.querySelectorAll("#bill-table tbody tr").forEach((row, index) => {
        row.cells[0].textContent = index + 1;
    });
}

function addEventListeners(row) {
    const quantityInput = row.querySelector('input[name="quantity"]');
    const productSelect = row.querySelector('select[name="productName"]');

    quantityInput.addEventListener('input', function() {
        calculateAmount(row);
        validateRows();
    });

    productSelect.addEventListener('change', function() {
        setPrice(this);
        calculateAmount(row);
        validateRows(); 
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('invoice-form').addEventListener('submit', handleSubmit);
    validateRows(); 
});
async function handleSubmit(event) {
    event.preventDefault();
    let isValid = true;

    document.querySelectorAll('.error').forEach(el => {
        el.textContent = '';
    });

    const customerName = document.getElementById('customerName').value;
    const purchaseDate = document.getElementById('purchase-date').value;
    const mobileNo = document.getElementById('mobileNo').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const gender = document.getElementById('gender').value;

    if (!customerName || !/^[a-zA-Z\s]+$/.test(customerName)) {
        document.getElementById('customerNameError').textContent = 'Customer name is required.';
        isValid = false;
    }

    if (!mobileNo || !/^\d+$/.test(mobileNo)) {
        document.getElementById('mobileNoError').textContent = 'Mobile number is required.';
        isValid = false;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('emailError').textContent = 'Email is required.';
        isValid = false;
    }

    if (!address || address.length < 3 || address.length > 10) {
        document.getElementById('addressError').textContent = 'Address is required.';
        isValid = false;
    }

    if (!gender) {
        document.getElementById('genderError').textContent = 'Gender is required.';
        isValid = false;
    }

    const productRows = document.querySelectorAll('#bill-table tbody tr');
    const availabilityChecks = [];

    productRows.forEach(row => {
        const productName = row.querySelector('select[name="productName"]').value;
        const quantity = row.querySelector('input[name="quantity"]').value;
        const quantityError = row.querySelector('.quantityError');
        const productNameError = row.querySelector('.productNameError');

        if (!productName || productName === 'Select a product') {
            productNameError.textContent = 'Product is required.';
            isValid = false;
        }
        if (!quantity || quantity <= 0) {
            quantityError.textContent = 'Quantity must be greater than zero.';
            isValid = false;
        }

        if (productName && quantity > 0) {
            availabilityChecks.push(
                fetch(`http://localhost:8080/api/product/get/product/${productName}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.error) {
                            isValid = false;
                            quantityError.textContent = data.error.reason || 'Unable to check product availability.';
                        } else if (data.stock < quantity) {
                            isValid = false;
                            quantityError.textContent = `Only ${data.stock} units available.`;
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        isValid = false;
                        quantityError.textContent = 'Unable to check product availability.';
                    })
            );
        }
    });

    await Promise.all(availabilityChecks);

    if (!isValid) return;

    const customerProduct = [];
    productRows.forEach(row => {
        const productName = row.querySelector('select[name="productName"]').value;
        const quantity = row.querySelector('input[name="quantity"]').value;
        const price = row.querySelector('input[name="price"]').value;
        const totalAmount = row.querySelector('input[name="totalAmount"]').value;
        customerProduct.push({ productName, quantity, price, totalAmount });
    });

    const payload = {
        customerName,
        email,
        mobileNo,
        address,
        gender,
        customerProduct
    };

    try {
        const response = await fetch('http://localhost:8080/api/invoice/buy/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error ? data.error.reason : 'Unknown error occurred');
        }

        alert('Order placed successfully!');
        window.location.href = "customerlist.html";

        document.getElementById('customerName').value = "";
        document.getElementById('purchase-date').value = "";
        document.getElementById('mobileNo').value = "";
        document.getElementById('email').value = "";
        document.getElementById('address').value = "";
        document.getElementById('gender').value = "";

    } catch (error) {
        console.error('Error:', error);

        const formErrorDiv = document.getElementById('formError');
        formErrorDiv.textContent = `Error: ${error.message}`;
        formErrorDiv.style.display = 'block';

        const errorMessages = error.message.split(',');
        errorMessages.forEach(msg => {
            if (msg.includes('name is invalid')) {
                document.getElementById('customerNameError').textContent = 'Name length should be between 3 and 10 characters';
            }
            if (msg.includes('User phone number is invalid')) {
                document.getElementById('mobileNoError').textContent = ' Please enter a valid phone number.(10 numbers)';
            }
            if (msg.includes('User email is invalid')) {
                document.getElementById('emailError').textContent = 'Please enter a valid email.';
            }
        });
    }
}























