let products = [];
let cart = [];

// Show Products
fetch("http://protected-lake-94601.herokuapp.com/Get-Products/")
  .then((res) => res.json())
  .then((data) => {
    products = data;
    console.log(data);
    make_products(data);
  });

// Making Products
function make_products(products) {
  let product_container = document.querySelector("#products-container");
  product_container.innerHTML = "";
  products.data.forEach((product) => {
    product_container.innerHTML += `
        <div class = "products">
            <img src="${product.product_image}" class = "product-image"> 
            <h4 class = "product-title"> ${product.product_name}</h4>
            <p class = "product-description"> ${product.description}</p>
            <p class = "product-price">${product.price} </p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            
        </div>
    `;
  });
}

// Search
function searchProducts() {
  let searchTerm = document.querySelector("#searchTerm").value;
  // console.log(searchTerm);

  let searchedProducts = products.data.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(searchedProducts);
  let product_container = document.querySelector("#products-container");
  product_container.innerHTML = "";
  products.data.forEach((product) => {
    // console.log(product);
    product_container.innerHTML += `
        <div class = "products">
            <img src="${product.product_image}" class = "product-image"> 
            <h4 class = "product-title"> ${product.product_name}</h4>
            <p class = "product-description"> ${product.description}</p>
            <p class = "product-price">${product.price} </p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            
        </div>
    `;
  });
  // make_products(searchedProducts);
}

// CARTS
function toggleCart() {
  document.querySelector("#cart").classList.toggle("active");
}
function renderCart(cartItems) {
  let cartContainer = document.querySelector("#cart");
  cartContainer.innerHTML = "";
  if (cartItems.length > 0) {
    cartItems.map((cartItem) => {
      cartContainer.innerHTML += `
      <div class = "products">
            <img src="${cartItem.product_image}" class = "product-image">
            <div class = "product-content"> 
                <h4 class = "product-title"> ${cartItem.product_name}</h4>
                <p class = "product-description"> ${cartItem.description}</p>
                <p class = "product-price">${cartItem.price} </p>
                <button class ="revome_cart" onclick="removeItem(${cartItem.id})">Remove item</button>
            </div>
            
        </div>
      
      
      `;
    });
    let totalPrice = cartItems.reduce((total, item) => total + item.price,0);
    cartContainer.innerHTML += `<h3> Total is: ${totalPrice} </h3>`;
  } else {
    cartContainer.innerHTML = "<h2> No items in cart</h2>";
  }
}

function addToCart(id) {
  console.log(products.data);
  let product = products.data.find((item) => {
    return item.id == id;
  });
  cart.push(product);
  renderCart(cart);
}
function removeItem(id) {
  let product = products.data.find((item) => {
    return item.id == id;
  });
  //console.log(product);

  cart.splice(
    cart.findIndex((a) => a.id === product.id),
    1
  );
  renderCart(cart);
}

