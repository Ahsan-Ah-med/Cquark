// focal theme cart refresh code
 document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {bubbles: true})); // update cart focal theme

// sence theme cart refresh code
document.querySelector('form.cart__contents input.quantity__input').dispatchEvent(new Event("change", { bubbles: true }));
    
function addtocart() {
    var items = [{ quantity: 5, id: 49769591210276 }];
    $.ajax({
        type: "POST",
        url: '/cart/add.json',
        data: { items: items },
        success: function (data) {
            console.log('success');
        },
        dataType: 'application/json'
    });
    // Now I will do a get to show the itens from cart
    setTimeout(function () {
        jQuery.getJSON('/cart.js', function (cart) {
            let cartData = cart.items;
            document.dispatchEvent(new CustomEvent('cart:build', { bubbles: true }));
            document.dispatchEvent(new CustomEvent('cart:refresh', {
                bubbles: true,
                detail: cartData
            }));
        });
    }, 400);
}
// get cart data and then work your conditions
const addArr = [{% for product in section.settings.cart_addon %}{{product.selected_or_first_available_variant.id}},{% endfor %}];
function checkItemsInCart() {
  fetch('/cart.json')
  .then((data) => data.json())
  .then((res) => {
    res.items
      .filter((match) => addArr.includes(match.id))
      .forEach((ele) => {
        console.log(ele);
          document.querySelector(`.addom_items[data-variantid="${ele.id}"]`).setAttribute('style','display: none !important');
        })
      
  })
  .catch((err) => console.error("Error fetching cart data:", err));
}
checkItemsInCart()
