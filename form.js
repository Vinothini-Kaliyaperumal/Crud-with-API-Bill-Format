const bikes = [
    { name: "Select a Product", price: 0, quantity:0 },
    { name: "Mountain Bike", price: 399.99, quantity:4},
    { name: "Road Bike", price: 549.99, quantity:8 },
    { name: "Hybrid Bike", price: 279.99, quantity:12 },
    { name: "Electric Bike", price: 1299.99, quantity:16 },
    { name: "Folding Bike", price:429.99, quantity:20},
  ];
    
  
  function addItem() {
    var table = document.getElementById("table-item").getElementsByTagName('tbody')[0];
    var row = table.insertRow();
  
    var itemCell = row.insertCell();
    var quantityCell = row.insertCell();
    var priceCell = row.insertCell();
    var totalCell = row.insertCell();
    var actionCell = row.insertCell();
  
    var bikesSelect = document.createElement("select");
    bikesSelect.className = "form-control";
    bikesSelect.name = "bikes[]";
    bikesSelect.onchange = function() { setPrice(this); };
  
    bikes.forEach(function(bikes) {
        var option = document.createElement("option");
        option.value = bikes.name;
        option.setAttribute("data-price", bikes.price);
        option.textContent = bikes.name;
        bikesSelect.appendChild(option);
    });
  
    itemCell.appendChild(bikesSelect);
    quantityCell.innerHTML = '<input type="number" class="form-control" name="quantity[]" placeholder="Enter quantity" required>';
    priceCell.innerHTML = '<input type="number" class="form-control" name="price[]" placeholder="Enter price" readonly>';
    totalCell.innerHTML = '<input type="number" class="form-control" name="total[]" placeholder="Enter total" readonly>';
    actionCell.innerHTML = '<button type="button" class="btn btn-danger" onclick="deleteItem(this)">Delete</button>';
  
    addEventListeners();
  }
  
  function deleteItem(button) {
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
    var total = row.querySelector('input[name="total[]"]');
    if (quantity && price) {
        total.value = quantity * price;
    } else {
        total.value = 0;
    }
    calculateTotal();
  }
  
  function calculateTotal() {
    var rows = document.querySelectorAll('#table-item tbody tr');
    var subtotal = 0;
    rows.forEach(row => {
        var total = row.querySelector('input[name="total[]"]').value;
        subtotal += parseFloat(total);
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