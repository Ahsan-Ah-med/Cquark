$(".custom_main_image_silder").owlCarousel({
    items: 1,
    margin: 10,
    loop: false,
    nav: true,
});
var owl_main = $(".custom_main_image_silder");
owl_main.owlCarousel();
$(".custom_main_image_silder_container .right").click(function () {
    owl_main.trigger("next.owl.carousel");
});
$(".custom_main_image_silder_container .left").click(function () {
    owl_main.trigger("prev.owl.carousel");
});
$(".custom_main_image_silder_container .left").addClass("disabled");
$(owl_main).on("translated.owl.carousel", function (event) {
    if ($(".custom_main_image_silder .owl-prev").hasClass("disabled")) {
        $(".custom_main_image_silder_container .left").addClass("disabled");
    } else {
        $(".custom_main_image_silder_container .left").removeClass("disabled");
    }
    if ($(".custom_main_image_silder .owl-next").hasClass("disabled")) {
        $(".custom_main_image_silder_container .right").addClass("disabled");
    } else {
        $(".custom_main_image_silder_container .right").removeClass("disabled");
    }
});

$(".product__media-list.grid.owl-carousel.carousel").owlCarousel({
    items: 4,
    margin: 10,
    loop: false,
    nav: true,
});
var owl = $(".product__media-list.grid.owl-carousel.carousel");
owl.owlCarousel();
$(".media-carousel .right").click(function () {
    owl.trigger("next.owl.carousel");
});
$(".media-carousel .left").click(function () {
    owl.trigger("prev.owl.carousel");
});
$(".media-carousel .left").addClass("disabled");
$(owl).on("translated.owl.carousel", function (event) {
    if ($(".owl-prev").hasClass("disabled")) {
        $(".media-carousel .left").addClass("disabled");
    } else {
        $(".media-carousel .left").removeClass("disabled");
    }
    if ($(".owl-next").hasClass("disabled")) {
        $(".media-carousel .right").addClass("disabled");
    } else {
        $(".media-carousel .right").removeClass("disabled");
    }
});