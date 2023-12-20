let ORDER = class User {
	constructor(UserId, products) {
		
		this.date = new Date();
		this.orderID = Math.floor(Math.random() * 1000000);
		this.UserId = UserId;
		this.products = products;
		this.status = "pending";

		
		this.total = this.products.reduce((total, item) => {
			return total + (+item.count * +item.price);
		}, 0); 

		
		this.total = parseFloat(this.total.toFixed(2));
	}
};

function renderCheckout() {
	let data = JSON.parse(localStorage.getItem('products'));
	let currUserId = sessionStorage.getItem('currUserId');
	let currentUserCartKey = 'cart_' + currUserId;
	let cart = JSON.parse(localStorage.getItem(currentUserCartKey || "[]"));
	if (cart.length > 0) {
		let cartArr = cart.map(item => {
			for (let i = 0; i < data.length; i++) {
				if (data[i].id === item.id) {
					return { ...data[i], quantity: item.count }
				}
			}
		});
		let rowContainer = document.getElementById('checkout-table-row');
		rowContainer.innerHTML = "";
		let total = 0;
		cartArr.forEach((item, index) => {
			total += (+item.quantity * +item.price);
			rowContainer.innerHTML += `
			<tr>
				<td class="t-row">${index + 1}</td>
				<td class="t-row">${item.name}</td>
				<td class="t-row">$ ${item.price}</td>
				<td class="t-row">${item.quantity}</td>
				<td class="t-row">$ ${+item.quantity * +item.price}</td>
			</tr>
			`;
		});
		document.getElementById('total').innerHTML = total;
	} else {
		document.getElementById('confirmPurchase').style.display = 'none';
	}



}
function confirmPurchase() {
	let currUserId = sessionStorage.getItem('currUserId');
	let currentUserCartKey = 'cart_' + currUserId;
	
	let orders = JSON.parse(localStorage.getItem('orders') || "[]");
	let cart = JSON.parse(localStorage.getItem(currentUserCartKey || "[]"));
	console.log(cart);
	let order = new ORDER(currUserId, cart);
	orders.push(order);
	localStorage.setItem('orders', JSON.stringify(orders));
	localStorage.setItem(currentUserCartKey, JSON.stringify([]));
	alert("Order placed successfully");
	window.location = '/index.html';

}


