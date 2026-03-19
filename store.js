import { cartCall, addCart } from "./cart.js";

 async function fetchProducts() {
  const response = await
  fetch("https://fakestoreapi.com/products?limit=6");
  const products= await response.json();
  displayProduct(products)
}

fetchProducts()



function displayProduct(products) {
  

 let html= '';
products.forEach((element) => {
  html += ` 
  
     <div class="col-11 col-sm-5 col-md-3 mb-4">
        <div class="card m-0">
          <img src="${element.image}" alt="Product" class="card-img-top p-3 img-p ">
          <div class="card-body">
           <div class="body-p">
             <h6>${element.title}</h6>
             <p>$${element.price}</p>
            </div> 
             <button class="btn btn-warning w-100 add-js" data-product-id="${element.id}">Add to Cart</button>
        
          </div>
        </div>
     </div>`;
  
});

document.querySelector('.js-cont').innerHTML=html

 document.querySelectorAll('.add-js')
 .forEach((button)=>{
  button.addEventListener('click',()=>{
    let productId = button.dataset.productId
  
    
   
    addCart(productId)

    let cartQuantity = 0;
    cartCall.forEach((cartItem)=>{
      cartQuantity += cartItem.quantity
    })
    document.querySelector('.cartquantity-js').
    innerHTML=cartQuantity
    console.log(cartQuantity)
  })
})
console.log(cartCall)
 
}
console.log(cartCall)


