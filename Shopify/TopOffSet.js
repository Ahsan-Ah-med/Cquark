$(document).scroll(function () {
    var y = $(this).scrollTop();
    if (y > 0 && y < 319) {
        $('.add-to-cart').addClass("visible_addToCart");
    } else if (y > 320 && y < 999) {
        $('.add-to-cart').removeClass("visible_addToCart");
    }
    else if (y > 1000) {
        $('.add-to-cart').addClass("visible_addToCart");
    }
});