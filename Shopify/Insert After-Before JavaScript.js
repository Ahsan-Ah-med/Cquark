// Humza custom code

function moveProductDifference() {
            var productDifference = document.querySelector('.logo_n_icon');
            var relatedProductsWrapper = document.querySelector('.new_menu_mobile');
            relatedProductsWrapper.parentNode.insertBefore(productDifference, relatedProductsWrapper.nextSibling);
        }
  window.addEventListener("load", moveProductDifference)

// End Code
// Add @media query if condition

function moveProductDifference() {
      if (window.innerWidth <= 990) {
          var productDifference = document.querySelector('.logo_n_icon');
          var relatedProductsWrapper = document.querySelector('.new_menu_mobile');
          relatedProductsWrapper.parentNode.insertBefore(productDifference, relatedProductsWrapper.nextSibling);
      } else {
        var productDifference = document.querySelector('.new_menu_mobile');
          var relatedProductsWrapper = document.querySelector('.logo_n_icon');
          relatedProductsWrapper.parentNode.insertBefore(productDifference, relatedProductsWrapper.nextSibling);
      }
    }

  window.addEventListener("load", moveProductDifference);
  window.addEventListener("resize", moveProductDifference);

// End Code

const insertAfter = (elementToMove, elementToInsertAfter) => {
  document.addEventListener("DOMContentLoaded", function () {
    function moveElement() {
      // pick your element class you want to move element

      var element = document.querySelector(elementToMove);

      //pick your element  class you want to drop element

      var insertAfterElement = document.querySelector(elementToInsertAfter);
      insertAfterElement.parentNode.insertBefore(
        element,
        insertAfterElement.nextSibling
      );
    }
    moveElement();
    window.addEventListener("page:load", moveElement);
    window.addEventListener("page:change", moveElement);
  });
};
