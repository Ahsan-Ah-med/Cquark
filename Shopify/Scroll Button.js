function updateButtonVisibility() {
    const container = document.getElementById('scrollContainer');
    const backButton = document.getElementById('scrollBackButton');
    const nextButton = document.getElementById('scrollNextButton');

    // Check if the container is scrollable
    if (container.scrollWidth > container.clientWidth) {
        backButton.style.display = 'flex';
        nextButton.style.display = 'flex';
    } else {
        backButton.style.display = 'none';
        nextButton.style.display = 'none';
    }
}

function scrollBack() {
    const container = document.getElementById('scrollContainer');
    const containerWidth = container.clientWidth;
    const scrollAmount = containerWidth * 0.2; // 10% of the container's width
    container.scrollLeft -= scrollAmount;
}

function scrollNext() {
    const container = document.getElementById('scrollContainer');
    const containerWidth = container.clientWidth;
    const scrollAmount = containerWidth * 0.2; // 10% of the container's width
    container.scrollLeft += scrollAmount;
}

// Initial check and set up event listeners for resize
window.addEventListener('resize', updateButtonVisibility);
document.addEventListener('DOMContentLoaded', updateButtonVisibility);
