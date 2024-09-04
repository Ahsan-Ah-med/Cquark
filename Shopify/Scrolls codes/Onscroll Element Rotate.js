let lastScrollTop = 0;
let rotation = 0;

window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Downscroll
        rotation += 2;
    } else {
        // Upscroll
        rotation -= 2;
    }
    document.getElementById('sid-template--23400593948964__image_with_text_YgpaH4 scroll_rotating_image').style.transform = `rotate(${rotation}deg)`;
    lastScrollTop = scrollTop;
});