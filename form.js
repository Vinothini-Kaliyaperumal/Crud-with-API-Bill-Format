

  function handleSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    // Process form data here if needed
    window.location.href = 'table.html'; // Redirect to table.html
  }

  function handleSave() {
    // Perform any save logic here
    window.location.href = 'table.html'; // Redirect to table.html after saving
  }

  function addItem() {
    const table = document.getElementById('table-item').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);

    cell1.innerHTML = `<select id="bikes" class="form-control" name="bikes[]" onchange="setPrice(this)">
                        <option value="" data-price="0">Select Prodect</option>
                        <option value="Mountain Bike" data-price="399">Mountain Bike</option>
                        <option value="Road Bike" data-price="549">Road Bike</option>
                        <option value="Hybrid Bike" data-price="279">Hybrid Bike</option>
                        <option value="Electric Bike" data-price="1299">Electric Bike</option>
                        <option value="Folding Bike" data-price="429">Folding Bike</option>
                      </select>`;
    cell2.innerHTML = '<input type="number" class="form-control" name="quantity[]" placeholder="Enter quantity" required>';
    cell3.innerHTML = '<input type="number" class="form-control" name="price[]" placeholder="Enter price" readonly>';
    cell4.innerHTML = '<input type="number" class="form-control" name="total[]" placeholder="Enter total" readonly>';
    cell5.innerHTML = '<button type="button" class="btn btn-primary">Edit</button> <button type="button" class="btn btn-danger" onclick="deleteItem(this)">Delete</button>';
  }

  function deleteItem(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
  }

  function setPrice(select) {
    const price = select.options[select.selectedIndex].getAttribute('data-price');
    const row = select.parentNode.parentNode;
    const priceInput = row.cells[2].getElementsByTagName('input')[0];
    const totalInput = row.cells[3].getElementsByTagName('input')[0];
    priceInput.value = price;

    const quantityInput = row.cells[1].getElementsByTagName('input')[0];
    quantityInput.addEventListener('input', function () {
      totalInput.value = price * quantityInput.value;
      updateTotals();
    });
  }

  function updateTotals() {
    const table = document.getElementById('table-item').getElementsByTagName('tbody')[0];
    let subtotal = 0;

    for (let row of table.rows) {
      const total = row.cells[3].getElementsByTagName('input')[0].value;
      subtotal += parseFloat(total) || 0;
    }

    const gst = subtotal * 0.05;
    const discount = subtotal * 0.10;
    const total = subtotal + gst - discount;

    document.getElementById('subtotal').innerText = subtotal.toFixed(2);
    document.getElementById('gst').innerText = gst.toFixed(2);
    document.getElementById('discount').innerText = discount.toFixed(2);
    document.getElementById('total').innerText = total.toFixed(2);
  }