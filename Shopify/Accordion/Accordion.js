
<script>

    function handleReadMore() {
        document.querySelector('.product_inner_div').style.height = "100%";
    document.querySelector('.read_less_btn').style.display = "block";
    document.querySelector('.read_more_btn').style.display = "none";
}

    function handleReadLess() {
        document.querySelector('.product_inner_div').style.height = "80px";
    document.querySelector('.read_more_btn').style.display = "block";
    document.querySelector('.read_less_btn').style.display = "none";
}

    function handleReadMoreMobile() {
        document.querySelector('.product_inner_div').style.height = "100%";
    document.querySelector('.read_less_btn').style.display = "block";
    document.querySelector('.read_more_btn').style.display = "none";
}

    function handleReadLessMobile() {
        document.querySelector('.product_inner_div').style.height = "60px";
    document.querySelector('.read_more_btn').style.display = "block";
    document.querySelector('.read_less_btn').style.display = "none";
}

    function setupEventListeners() {
  const desktopQuery = window.matchMedia('(min-width: 768px)');
    const mobileQuery = window.matchMedia('(max-width: 767px)');

    if (desktopQuery.matches) {
        document.querySelector('.read_more_btn').addEventListener('click', handleReadMore);
    document.querySelector('.read_less_btn').addEventListener('click', handleReadLess);
  }

    if (mobileQuery.matches) {
        document.querySelector('.read_more_btn').addEventListener('click', handleReadMoreMobile);
    document.querySelector('.read_less_btn').addEventListener('click', handleReadLessMobile);
  }
}

    window.onload = function() {
        setupEventListeners();
};


    // Accordion by WebSensePro.com
    $(function() {
        // (Optional) Active an item if it has the class "is-active"	
        $(".accordion > .accordion-item.is-active").children(".accordion-panel").slideDown();

 	$(".accordion > .accordion-item").click(function() {
        // Cancel the siblings
        $(this).siblings(".accordion-item").removeClass("is-active").children(".accordion-panel").slideUp();
    // Toggle the item
    $(this).toggleClass("is-active").children(".accordion-panel").slideToggle("ease-out");
 	});
 });
    // accordion read more/less code

    $(function() {
        $(".acc_more").click(function (event) {
            event.stopPropagation();
            $(".acc_more").hide();
            $(".acc_less").show();
            $(".accordion-panel p").css("height", "100%");

            // Scroll to the bottom of the accordion-item using smooth scrolling
            const accordionItem = $(".accordion-item");
            const scrollPosition = accordionItem.offset().top + accordionItem.outerHeight() - window.innerHeight;
            window.scrollTo({ top: scrollPosition, behavior: "smooth" });
        });

    $(".acc_less").click(function(event) {
        event.stopPropagation();
    $(".acc_less").hide();
    $(".acc_more").show();
    $(".accordion-panel_des p").css("height", "50px");

    // Scroll to the bottom of the accordion-item using smooth scrolling
    const accordionItem = $(".accordion-item");
    const scrollPosition = accordionItem.offset().top + accordionItem.outerHeight() - window.innerHeight;
    window.scrollTo({top: scrollPosition, behavior: "smooth" });
  });
});



    {% comment %}   document.querySelector('.acc_more').addEventListener('click', () => {
        document.querySelector('.acc_more').style.display = "none";
    document.querySelector('.acc_less').style.display = "block";
    document.querySelector('.accordion-panel p').style.height = "100%";
})
  document.querySelector('.acc_less').addEventListener('click', () => {
        document.querySelector('.acc_less').style.display = "none";
    document.querySelector('.acc_more').style.display = "block";
    document.querySelector('.accordion-panel_des p').style.height = "50px";
}) {% endcomment %}

    // Click Accordion scroll top function

    window.onload = function() {
  var accordionItems = document.querySelectorAll(".accordion-item");
    for (var i = 0; i < accordionItems.length; i++) {
        accordionItems[i].addEventListener("click", function () {
            var accordionPanel = this.querySelector(".accordion-panel");
            var parent = accordionPanel.parentNode;

            if (window.getComputedStyle(accordionPanel).display === "block") {
                // Condition is met when .accordion-panel has display set to "block" and its parent does not have class "is-active"
                window.scrollTo({ top: window.innerHeight / 1, behavior: "smooth" });
            }
        });
  }
};

</script>