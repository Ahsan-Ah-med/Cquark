function customAddToCartJS(qty, variantID, lineItem = null) {
  var xhr = new XMLHttpRequest();
  var url = "/cart/add.js";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          var parsedState = JSON.parse(xhr.responseText);
          // write code when product added to cart successfully
          console.log(parsedState);

      }
  };
  var data = JSON.stringify(
      lineItem != null ?
          {
              "quantity": qty,
              "id": variantID,
              "properties": lineItem
          } : {
              "quantity": qty,
              "id": variantID,
          }
  );
  xhr.send(data);
}



function addItemToCart(variant_id, qty) {

    data = {
      "id": variant_id,
      "quantity": qty
    }
    jQuery.ajax({
      type: 'POST',
      url: '/cart/add.js',
      data: data,
      dataType: 'json',
      success: function() { 
        setTimeout( function() {
          new theme.CartDrawer
          $('.js-drawer-open-cart').trigger('click');
        },2000);
      }
    });
  }


// boost app code

function customAddButton(data) {
    if (data.available) {
    var addButton = `<button class="btn btn--full btn--primary" onClick="addItemToCart(${data['variants'][0].id}, 1)">Add to Cart</button>`;
    }
    else {
    var addButton = `<button class="btn btn--full btn--primary" disabled>Sold Out</button>`;
    }
    
    return addButton;
  }