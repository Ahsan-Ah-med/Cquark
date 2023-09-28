const faqBlockHead1 = document.querySelectorAll('.image2_heading');
const faqBlockAcc1 = document.querySelectorAll('.loop_block');
faqBlockAcc1[0].classList.add('image_block_show');
faqBlockHead1[0].classList.add('head_button');


faqBlockHead1.forEach((e, i) => {
    e.addEventListener('click', () => {
        faqBlockAcc1.forEach((j, index) => {
            j.classList.remove('image_block_show');
        });
        faqBlockHead1.forEach((h) => {
            h.classList.remove('head_button'); // Remove the 'clicked' class from all headings
        });
        faqBlockAcc1[i].classList.add('image_block_show'); // Add 'block_show' class to corresponding .accordion_block_list
        e.classList.add('head_button'); // Add 'clicked' class to the clicked heading
    });
});