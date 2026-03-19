import { cartCall, updateCart } from "./cart.js";

async function fetchProducts() {
  const response = await
  fetch("https://fakestoreapi.com/products?limit=6");
  const products= await response.json();
   displayProduct(products)
   
}

fetchProducts()


function displayProduct(products) {
 
let cartHtml = ''; 

let totalPrice = 0 ;

let totalQuantity = 0;

let delivery = 15;

cartCall.forEach((cartItem)=>{
  let productId = cartItem.productId
  console.log(productId)
  let matchingProduct;

  products.forEach((product)=>{
    if(product.id=== Number(productId)){
      matchingProduct = product
    };

  });

  totalPrice+=matchingProduct.price;

  totalQuantity += cartItem.quantity;

  cartHtml +=`
      <tr class=" product-delete-js-${matchingProduct.id}">
        <td class="text-start img-c ">
          <img src="${matchingProduct.image}" alt="" class="me-2 rounded img-c">
          ${matchingProduct.title}
        </td>
        <td>$${matchingProduct.price}</td>
        <td>${cartItem.quantity}</td>
        <td>$${matchingProduct.price * cartItem.quantity}</td>
        <td>
          <button class="btn btn-danger btn-sm delete-js" data-product-id=${matchingProduct.id}>
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
  `
});

let cartTotalHtml='';




  cartTotalHtml =`
     
    <div class="col-md-4">
      <div class="card p-3 shadow-sm">
        <h5>Cart Summary</h5>
        <hr>
        <p class="d-flex justify-content-between">
          <span>Subtotal:</span>
          <strong>$${totalPrice * totalQuantity}</strong>
        </p>
        <p class="d-flex justify-content-between">
          <span>Delivery:</span>
          <strong>$${delivery}</strong>
        </p>
        <hr>
        <h5 class="d-flex justify-content-between">
          <span>Total:</span>
          <strong>$${delivery + totalPrice * totalQuantity
          }</strong>
        </h5>
        <button class="btn btn-dark w-100 mt-3">
          Proceed to Checkout
        </button>
      </div>
    </div>
  `

document.querySelector('.total-price-js').innerHTML =cartTotalHtml

document.querySelector('.cartcall-js').innerHTML = cartHtml
console.log(cartHtml)

document.querySelectorAll('.delete-js').forEach((link)=>{
   link.addEventListener('click',()=>{
    let productId = link.dataset.productId;
    updateCart(productId);
    let deleteItem= document.querySelector(`.product-delete-js-${productId}`);
    deleteItem.remove()

    fetchProducts()
   })
})
};