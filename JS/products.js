
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

  let searchedProducts = products.filter((product) => 
    product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(searchedProducts);

}

function toggleCart() {
  document.querySelector("#cart").classList.toggle("active");
}


 