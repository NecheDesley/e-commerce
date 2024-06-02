// Fetch product data from the backend
fetch('/api/products')
  .then(response => response.json())
  .then(data => {
    renderProducts(data);
  });

// Render products on the page
function renderProducts(products) {
  const productGrid = document.querySelector('.product-grid');

  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const image = document.createElement('img');
    image.src = product.imageUrl;
    image.alt = product.name;

    const name = document.createElement('h3');
    name.textContent = product.name;

    const price = document.createElement('p');
    price.textContent = `$${product.price}`;

    const addToCartBtn = document.createElement('button');
    addToCartBtn.textContent = 'Add to Cart';
    addToCartBtn.addEventListener('click', () => addToCart(product));

    productCard.appendChild(image);
    productCard.appendChild(name);
    productCard.appendChild(price);
    productCard.appendChild(addToCartBtn);
    productGrid.appendChild(productCard);
  });
}

// Add product to the cart
let cart = [];

function addToCart(product) {
  const existingProduct = cart.find(item => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartUI();
}

// Update the cart UI
function updateCartUI() {
  const cartItems = document.querySelector('.cart-items');
  const totalPrice = document.querySelector('.total-price');
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    const name = document.createElement('h3');
    name.textContent = item.name;

    const quantity = document.createElement('p');
    quantity.textContent = `Quantity: ${item.quantity}`;

    const price = document.createElement('p');
    price.textContent = `$${item.price * item.quantity}`;

    total += item.price * item.quantity;

    cartItem.appendChild(name);
    cartItem.appendChild(quantity);
    cartItem.appendChild(price);
    cartItems.appendChild(cartItem);
  });

  totalPrice.textContent = `$${total.toFixed(2)}`;
  document.querySelector('.cart-count').textContent = cart.length;
}