<script>
    $(document).ready(function() {
    // Get the custom_variants and custom_main_image_slider elements
    var $variants = $('.product-form__input label');
    var $mainImageSlider = $('.custom_main_image_slider');

    // Add click event listener to each variant title
    $variants.on('click', function() {
      // Get the data-index attribute of the clicked variant title
      var variantIndex = $(this).data('index');

      // Change the main image slider to the clicked variant
      $mainImageSlider.slick('slickGoTo', variantIndex);
    });

    // Initialize Slick Slider for custom_main_image_slider
    $mainImageSlider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 1000,
      dots: false,
      arrows: false,
      centerMode: false,
      asNavFor: '.custom_main_image_slider_vertical',
      infinite: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            dots: true,
            centerMode: false,
            slidesToShow: 1,
          }
        }
      ]
    });

    // Initialize Slick Slider for custom_main_image_slider_vertical
    $('.custom_main_image_slider_vertical').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 1000,
      dots: false,
      arrows: false,
      centerMode: false,
      centerPadding: '0px',
      swipe: true,
      touchMove: true,
      vertical: true,
      useTransform: false,
      cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
      asNavFor: '.custom_main_image_slider',
      focusOnSelect: true,
      infinite: true,
       adaptiveHeight: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 3,
            vertical: false,
          }
        }
      ]
    });
  });
</script>