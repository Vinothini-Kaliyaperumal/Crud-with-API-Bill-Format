function addRow() {
    var table = document.getElementById("bill-table").getElementsByTagName('tbody')[0];
    var row = table.insertRow();
  
    var productCell = row.insertCell();
    var quantityCell = row.insertCell();
    var priceCell = row.insertCell();
    var amountCell = row.insertCell();
    var actionCell = row.insertCell();
  
    productCell.innerHTML = `
        <select class="form-control" name="product[]" onchange="setPrice(this)">
            <option value="" data-price="0">Select a product</option>
            <option value="Product 1" data-price="19.99">Headphones</option>
            <option value="Product 2" data-price="799.99">Laptop</option>
            <option value="Product 3" data-price="24.50">Wireless Mouse</option>
            <option value="Product 4" data-price="129.95">Smartwatch</option>
            <option value="Product 5" data-price="49.99">Gaming Keyboar</option>
            
        </select>`;
    quantityCell.innerHTML = '<input type="number" class="form-control" name="quantity[]" placeholder="Enter quantity" required>';
    priceCell.innerHTML = '<input type="number" class="form-control" name="price[]" readonly>';
    amountCell.innerHTML = '<input type="number" class="form-control" name="amount[]" readonly>';
    actionCell.innerHTML = '<button type="button" class="btn btn-danger" onclick="deleteRow(this)">Delete</button>';
  
    addEventListeners();
  }
  
  function deleteRow(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    calculateTotal();
  }
  
  function setPrice(selectElement) {
    var price = selectElement.options[selectElement.selectedIndex].getAttribute('data-price');
    var row = selectElement.parentElement.parentElement;
    row.querySelector('input[name="price[]"]').value = price;
    calculateAmount(row);
  }
  
  function calculateAmount(row) {
    var quantity = row.querySelector('input[name="quantity[]"]').value;
    var price = row.querySelector('input[name="price[]"]').value;
    var amount = row.querySelector('input[name="amount[]"]');
    if (quantity && price) {
        amount.value = quantity * price;
    } else {
        amount.value = 0;
    }
    calculateTotal();
  }
  
  function calculateTotal() {
    var rows = document.querySelectorAll('#bill-table tbody tr');
    var subtotal = 0;
    rows.forEach(row => {
        var amount = row.querySelector('input[name="amount[]"]').value;
        subtotal += parseFloat(amount);
    });
    var gst = subtotal * 0.05;
    var discount = subtotal * 0.10;
    var total = subtotal + gst - discount;
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('gst').textContent = gst.toFixed(2);
    document.getElementById('discount').textContent = discount.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);
  }
  
  function addEventListeners() {
    var quantityInputs = document.querySelectorAll('input[name="quantity[]"]');
    var priceInputs = document.querySelectorAll('input[name="price[]"]');
  
    quantityInputs.forEach(input => {
        input.addEventListener('input', function() {
            calculateAmount(this.parentElement.parentElement);
        });
    });
  
    priceInputs.forEach(input => {
        input.addEventListener('input', function() {
            calculateAmount(this.parentElement.parentElement);
        });
    });
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    addEventListeners();
  });