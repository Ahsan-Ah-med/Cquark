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