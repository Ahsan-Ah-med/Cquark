let productformsubmit = document.querySelector('.custom_submit_button');

productformsubmit.addEventListener('click', (event) => {
  event.preventDefault();  // Prevent default form submission behavior

  let quantityinpvalue = document.querySelector('.custom__product_quantity').value;
  let quantity = quantityinpvalue || 1;
  let variantID = 47367426605374;

  let dataForm = 'quantity=' + quantity + '&id=' + variantID;

  var params = {
    type: 'POST',
    url: '/cart/add.js',
    data: dataForm,
    dataType: 'json',
    success: function (line_item) {
      console.log("added a product");
      // Handle success, e.g., redirect to a success page
    },
    error: function (XMLHttpRequest, textStatus) {
      console.error("Error adding product to cart");
      // Handle error, e.g., show an error message
    }
  };

  $.ajax(params);
});