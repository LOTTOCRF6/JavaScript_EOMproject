let products = [];
let cart = [];

fetch("http://protected-lake-94601.herokuapp.com/Get-Products/")
  .then((res) => res.json())
  .then((data) => {
    products = data;
    console.log(data);
    make_products(data);
  });

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

function searchProducts() {
  let searchTerm = document.querySelector("#searchTerm").value;
  console.log(searchTerm);

  let searchedProducts = products.data.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(searchedProducts);
  let product_container = document.querySelector("#products-container");
  product_container.innerHTML = "";
  products.data.forEach((product) => {
    console.log(product);
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

function toggleCart() {
  document.querySelector("#cart").classList.toggle("active");
}
function renderCart(cartItems) {
  let cartContainer = document.querySelector("#cart");
  cartContainer.innerHTML = "";
  if (cartItems.length > 0) {
    cartItems.map((cartItem) => {
      // console.log('This my carts',cartItem);
      cartContainer.innerHTML += `
      <div class = "products">
      <img src="${cartItem.product_image}" class = "product-image"> 
      <div class="product-content">
          <h4 class = "product-title"> ${cartItem.product_name}</h4>
          <p class = "product-description"> ${cartItem.description}</p>
          <p class = "product-price">${cartItem.price} </p>
      </div> 
  </div>
      `;
    });
    let totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
    cartContainer.innerHTML = +`<h2>Total is: ${totalPrice}</h2>`;
  } else {
    cartContainer.innerHTML = "<h2> No items in cart</h2>";
  }
}
function addToCart(id) {
  // console.log(products.data);
  let product = products.data.find((item) => {
    return item.id == id;
  });
  console.log(product);
  cart.push(product);
  console.log(cart);  
  //console.log("your are cart items", cart);
  renderCart(cart);
}

