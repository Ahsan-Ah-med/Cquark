document.addEventListener("DOMContentLoaded", function() {
    const animatedImage = document.querySelectorAll('.animated-image');
    const section = document.querySelector('.main-third-sec');
    let hasAnimated = false;

    function onScroll() {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // Check if the section is partially visible and the animation has not run yet
        if (sectionTop < windowHeight && sectionTop > 0 && !hasAnimated) {
            animatedImage.forEach((e)=>{
              e.classList.add('active');
            })
            hasAnimated = true;

            // Remove the scroll event listener after the animation is triggered
            window.removeEventListener('scroll', onScroll);
        }
    }

    window.addEventListener('scroll', onScroll);
    onScroll(); // Trigger the function once on load
});