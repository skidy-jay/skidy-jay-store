export let cartCall =JSON.parse(localStorage.getItem('cartCall')) || []
export function addCart(productId) {
  let matchingItem;

    cartCall.forEach((cartItem)=>{
      if (productId===cartItem.productId){
        matchingItem = cartItem
      }
      
    })
    if (matchingItem) {
        matchingItem.quantity ++
      }else{
        cartCall.push({
          productId : productId,
          quantity : 1
        })
      }
      localStorageCart()
} 

export function updateCart(productId) {
  let newCart=[];
  
  cartCall.forEach((cartItem)=>{
      if (cartItem.productId !== productId) {
          newCart.push(cartItem)
          cartCall =newCart
      }
  });
  localStorageCart()
};


function localStorageCart() {
 localStorage.setItem('cartCall', JSON.stringify(cartCall))
 
}


