let CART = "";
let PATH = '/data/products.json';






//^
function getUser() {
	if (sessionStorage.getItem('isAuthenticated')) {

		let count = 0;
		let currUserId = sessionStorage.getItem('currUserId');
		let currentUserCartKey = 'cart_' + currUserId;
		let user_role = sessionStorage.getItem('currUserRole')
		count = JSON.parse(localStorage.getItem(currentUserCartKey || "[]")).length;
		document.getElementById('basket').innerHTML = count;
		document.getElementById('loginButton').style.display = 'none';
		document.getElementById('cartName').innerHTML = sessionStorage.getItem('currUserName') + '\'s Cart';
		document.getElementById('orders').style.display = 'block';
		if (user_role === 'admin') {
			let orders = document.getElementById('orders')
			orders.setAttribute('href', '/admin/admin.html')
			$('#adProd').show();
			$('#adProd a').attr('href', '../admin/adminproducts.html')

		}

	} else {
		document.getElementById('cartName').innerHTML = "Cart";
		document.getElementById('logoutButton').style.display = 'none';
		document.getElementById('basket-container').style.display = 'none';
		document.getElementById('orders').style.display = 'none';
		loadJSON(PATH);
	};

	getAll();
}


function loadJSON(PATH) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = () => {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				let data = JSON.parse(xhr.responseText);
				localStorage.setItem('products', JSON.stringify(data));
			} else {
				window.alert('Something went wrong, fetching!!');
			}
		}
	};
	xhr.open('GET', PATH, true);
	xhr.send();
}

// Fetch Cart page
function getCart() {
	if (sessionStorage.getItem('isAuthenticated')) {
		window.location = '/cart/cart.html'
	} else {
		alert("You must login to use cart");
		window.location = '/auth/login.html';
	}
}


function getAll() {
	renderProducts();
	document.getElementById('cat-mob').classList.remove('active');
	document.getElementById('cat-lap').classList.remove('active');
	document.getElementById('cat-all').classList.add('active');
}




function getCategories() {
	let data = JSON.parse(localStorage.getItem('products'));
	let categories = new Set();
	data.forEach(item => {
		categories.add(item.category);
	});
	return categories;
}

console.log(getCategories());


//render the categories in the cat-nav bar
function renderCategories() {
	let categories = getCategories();
	let catBar = document.getElementById('catsbar');
	
	catBar.innerHTML += `<li id="cat-all" class="nav-item active"><a onclick="getAll()">All</a></li>`;
	categories.forEach(cat => {
		catBar.innerHTML += `<li id="cat-${cat}" class="nav-item"><a onclick="renderProducts('${cat}')">${cat}</a></li>`;
	});
}

renderCategories();




function renderProducts(cat) {
	let productContainer = document.getElementById('product-container');
	productContainer.innerHTML = "";
	let data = JSON.parse(localStorage.getItem('products'));

	data.forEach(item => {
		if (cat) {
			if (item.category === cat) {
				productContainer.innerHTML += `
					<div class="product-item">
						<div class="prod-image">
							<img src="${item.imageURL}" alt="">
						</div>
						<div class="prod-data" >
							<span id="prod-title">${item.name}</span>
							<span id="prod-price">$ ${item.price}</span>
							<p id="prod-description">${item.description}</p>
							<p id="prod-qnt">Quantity(${item.qnt})</p>
							<form action="javascript:addToCart('${item.id}, ${item.price}')" class="cart-btn">
								<button class="btn" id="add-to-cart" type="submit">Add to cart</button>
							</form>
						</div>
					</div>
					<div class="vertical-space"></div>
			`;
			}
		} else {
			productContainer.innerHTML += `
					<div class="product-item">
						<div class="prod-image">
							<img src="${item.imageURL}" alt="">
						</div>
						<div class="prod-data" >
							<span id="prod-title">${item.name}</span>
							<span id="prod-price">$ ${item.price}</span>
							<p id="prod-description">${item.description}</p>
							<p id="prod-qnt"><em style='color:red'>Quantity(${item.qnt})</em></p>
							<form action="javascript:addToCart('${item.id}', '${item.price}')" class="cart-btn">
								<button class="btn" id="add-to-cart" type="submit">Add to cart</button>
							</form>
						</div>
					</div>
					<div class="vertical-space"></div>
			`;
		}
	});

}
//^
// Add the item with the product id to the current user's cart
function addToCart(prodId, price) {
	if (sessionStorage.getItem('isAuthenticated')) {
		let currUserId = sessionStorage.getItem('currUserId');
		let currentUserCartKey = 'cart_' + currUserId;
		CART = JSON.parse(localStorage.getItem(currentUserCartKey || "[]"));
		let isAlreadyInCart = CART.some(item => item.id === prodId);
		if (isAlreadyInCart) {
			CART.forEach(item => {
				if (item.id === prodId) {
					item.count++;
				}
			})
		} else {
			CART.push({ "id": prodId, "count": 1, "price": price });
		}
		localStorage.setItem(currentUserCartKey, JSON.stringify(CART));
		window.alert("Succesfully Added");
		window.location.reload();
	} else {
		window.alert("You must login first.")
	}
}

function logout() {
	sessionStorage.clear();
	window.location = '../index.html'
}




function getUorders() {
	if (sessionStorage.getItem('isAuthenticated')) {
		window.location = '/uorders/uorders.html'
	} else {
		alert("You must login to use cart");
		window.location = '/auth/login.html';
	}
}

createOrdersTable()

function createOrdersTable() {
	if (!localStorage.getItem('orders')) {
		localStorage.setItem('orders', JSON.stringify([]));
	}
}

// function goToadprod() {
// 	window.location = '/admin/adminproducts.html'
// }



