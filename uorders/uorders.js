
    //get curr user 
const UserId = sessionStorage.getItem('currUserId');

const user_email = sessionStorage.getItem('currUserEmail');

const user_name = sessionStorage.getItem('currUserName');
const user_role = sessionStorage.getItem('currUserRole');

var user_orders = JSON.parse(localStorage.getItem('orders'));

if (user_orders == null) {
  user_orders = [];
} else if (user_role == 'user') {
  user_orders = user_orders.filter(order => order.UserId == UserId);
} else if (user_role == 'admin') {
  user_orders = user_orders;
  
let ordersCount = document.getElementById("ordersCount");
  ordersCount.textContent = '(' + user_orders.length + ')' + ' Orders';
}


function renderUorders() {
  const ordersTableBody = document.getElementById("ordersTableBody");

  user_orders.forEach(order => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${order.date}</td>
        <td class="ord">${order.orderID}</td>
        <td>${order.UserId}</td>
        <td>$ ${order.total}</td>
        <td>${order.status}</td>
      `;
    row.classList.add('order-row');
    ordersTableBody.appendChild(row);

    const detailsRow = document.createElement("tr");
    detailsRow.innerHTML = `
        <td colspan="5">
          <div class="order-details">
            <ul>
              ${order.products.map(product => `<li><span>id: </span> ${product.id} <span>Quantity: </span> ${product.count} <span>Price: </span> ${product.price} <span>Total price </span> ${product.count * product.price}</li>`).join('')}
            </ul>
          </div>
        </td>
      `;
    detailsRow.classList.add('order-details-row');
    ord = document.querySelector('#showD');

    ord.addEventListener('click', (event) => {


      detailsRow.classList.toggle('show');

    });


    ordersTableBody.appendChild(detailsRow);

  });


}
if (user_role == 'user') {
  renderUorders();
} else {
  
  adminOrders();
}


//if admin

function adminOrders() {

  const ordersTableBody = document.getElementById("ordersTableBody");


  user_orders.forEach(order => {

    const row = document.createElement("tr");

    row.innerHTML = `

        <td class="ord">${order.date}</td>

        <td class="ord">${order.orderID}</td>

        <td class="ord">${order.UserId}</td>

        <td id = "price" class="ord">$ ${order.total}</td>

        <td class="ord">${order.status}</td>

        <td><button onclick="changeOrderstatus(${order.orderID},'${order.status}')" class="btn" id="confirmBtn" type="submit">Confirm</button></td>

        <td><button onclick="cancelOrder(${order.orderID},'${order.status}')" class="btn" id="cancelBtn" type="submit">Cancel</button></td>

        `;

    if(order.status == 'confirmed'){

      row.classList.add('confirmed');

    }

    row.classList.add('order-row');

    ordersTableBody.appendChild(row);


    const detailsRow = document.createElement("tr");

    detailsRow.innerHTML = `

        <td colspan="5">

          <div class="order-details">

            <table class="product-details">

              <thead>

                <tr>

                  <th>id</th>

                  <th>Quantity</th>

                  <th>Price</th>

                  <th>Total Price</th>

                </tr>

              </thead>

              <tbody>

                ${order.products.map(product => `<tr>

                  <td>${product.id}</td>

                  <td>${product.count}</td>

                  <td>$${product.price}</td>

                  <td>$${product.count * product.price}</td>

                </tr>`).join('')}

              </tbody>

            </table>

          </div>

        </td>

      `;

    detailsRow.classList.add('order-details-row');

    ord = document.querySelector('#showD');

    ord.addEventListener('click', (event) => {


      detailsRow.classList.toggle('show');

    });


    ordersTableBody.appendChild(detailsRow);

  });

  

}

function changeOrderstatus(orderID, status) {
  orders = JSON.parse(localStorage.getItem('orders'));
  if(status == 'confirmed'){
    
    alert('Order already confirmed');
    return;
  }else{
    
    orders.forEach(order => {
      if (order.orderID == orderID) {
        order.status = 'confirmed';
        localStorage.setItem('orders', JSON.stringify(orders));
        window.location.reload();
      }
    });
}
}



function cancelOrder(orderID, status) {
  orders = JSON.parse(localStorage.getItem('orders'));
  if(status == 'cancelled'){
    alert('Order already cancelled');
    return;
  }else{
    
    orders.forEach(order => {
      if (order.orderID == orderID) {
        order.status = 'cancelled';
        localStorage.setItem('orders', JSON.stringify(orders));
        window.location.reload();
      }
    });
}
}










