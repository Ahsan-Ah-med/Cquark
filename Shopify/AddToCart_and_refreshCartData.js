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