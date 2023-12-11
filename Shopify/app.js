const checkDrawerData = () => {
    const cartDrawer = document.querySelectorAll("#cart-notification quantity-input .quantity__input");
    for (const e of cartDrawer) {
        const lineItemStep = Number(e.step);
        const lineItemValue = Number(e.value);
        const lineItemReminder = lineItemValue % lineItemStep;
        if (lineItemReminder != 0) {
            setTimeout(() => {
                $('.cart-notification__links .button:eq(1)').addClass("custom_disabled");
                console.log(lineItemReminder)
                // console.log(e.parentNode.parentNode.innerHTML += `<div class="invalid_quantity">Please Reduce Quantity</div>`)
                e.parentNode.parentNode.innerHTML += `<div class="invalid_quantity">(Please Reduce Quantity)</div>`;
            }, 1500)
            break;
        } else {
            setTimeout(() => {
                document.querySelector('.cart-notification__links .button[href="/checkout"]').classList.remove("custom_disabled");
            }, 1000)
        }
    }
}
window.addEventListener('DOMContentLoaded', (event) => {
    checkDrawerData()
});

function addToCartJS(qty, variantID, btn) {
    var xhr = new XMLHttpRequest();
    var url = "/cart/add.js";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var parsedState = JSON.parse(xhr.responseText);
            if (document.querySelector(".ajax-cart-disabled")) window.location = "/cart";
            document.querySelector('cart-notification').renderContents(parsedState);
            btn.classList.remove("loading");
            openCartDrawer();
            checkDrawerData();
        }
        if (xhr.status === 422) {
            // display error wherever you want to  
            $('.cart-notification__links .button:eq(1)').addClass("custom_disabled");
            // document.querySelector(`#cart-notification quantity-input .quantity__button[data-variantid="${variantID}"]`).parentNode.parentNode.innerHTML += `<div class="invalid_quantity">(Please Reduce Quantity)</div>`;
        }
    };
    var sectionsToRender = ["cart-notification-tier", "cart-notification-product", "cart-notification-button", "cart-icon-bubble"];
    var sections_url = window.location.pathname;
    var data = JSON.stringify({ "quantity": qty, "id": variantID, "sections": sectionsToRender, "sections_url": sections_url });
    xhr.send(data);
}
// custom Function to get Cart Data
function getCartData() {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        var url = "/cart.js";
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var cartData = JSON.parse(xhr.responseText);
                    resolve(cartData);
                } else {
                    reject("Failed to fetch cart data. Status: " + xhr.status);
                }
            }
        };
        xhr.send();
    });
}

function updateCartItemJS(qty, variantID) {
    var xhr = new XMLHttpRequest();
    var url = "/cart/change.js";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            checkDrawerData();
            console.log("update")
            var parsedState = JSON.parse(xhr.responseText);
            if (document.querySelector(".ajax-cart-disabled")) window.location = "/cart";
            document.querySelector('cart-notification').renderContents(parsedState);
        }
        if (xhr.status === 422) {
            // display error wherever you want to  
            $('.cart-notification__links .button:eq(1)').addClass("custom_disabled");
            // document.querySelector(`#cart-notification quantity-input .quantity__button[data-variantid="${variantID}"]`).parentNode.parentNode.innerHTML += `<div class="invalid_quantity">(Please Reduce Quantity)</div>`;
        }

    };
    var sectionsToRender = ["cart-notification-tier", "cart-notification-product", "cart-notification-button", "cart-icon-bubble"];
    var sections_url = window.location.pathname;
    var data = JSON.stringify({ "quantity": qty, "id": variantID, "sections": sectionsToRender, "sections_url": sections_url });
    xhr.send(data);
}


// const checkDrawerDate = () => {
//     const cartDrawer = document.querySelectorAll("#cart-notification quantity-input .quantity__input");
//     for (const e of cartDrawer) {
//         const lineItemStep = Number(e.step);
//         const lineItemValue = Number(e.value);
//         const lineItemReminder = lineItemValue % lineItemStep;
//         if (lineItemReminder != 0) {
//             console.log(lineItemReminder)
//             console.log(e)
//             document.querySelector('.cart-notification__links .button[href="/checkout"]').classList.add("custom_disabled");
//             break;
//         } else {
//             document.querySelector('.cart-notification__links .button[href="/checkout"]').classList.remove("custom_disabled");
//         }
//     }
// }

// document.querySelectorAll("variant-radios fieldset label").forEach((variant) => {
//     variant.addEventListener('click', () => {
//         checkTheCondition(variant.dataset.inventory, variant.dataset.id);
//     });
// });
// const submitBtnAgain = document.querySelector(".product-form .product-form__buttons .product-form__submit")

// submitBtnAgain.addEventListener('click', () => {
//     const customId = document.querySelector(".product-form input[data-inventory]").value
//     checkTheCondition(customId)
// });

// window.addEventListener("DOMContentLoaded", () => {
//     const customId = document.querySelector(".product-form input[data-inventory]").value
//     getCartData().then(data => console.log(data)).catch(e => console.log(e))
// });


// const checkTheCondition = (id, inventory = null) => {
//     const v_id = id;
//     const inven = inventory ? inventory : +document.querySelector('[data-id="' + v_id + '"]').dataset.inventory;
//     console.log(inven)
//     getCartData().then((data) => {
//         const itemData = data?.items.map(item => ({
//             id: item.id,
//             quantity: item.quantity,
//             title: item.title,
//         }));
//         itemData?.forEach((item) => {
//             if (item.id == v_id) {
//                 const finalQuantity = inven - item.quantity;
//                 const minQuantity = document.querySelector(".mainProductInfoContainer quantity-input .quantity__input").min
//                 if (finalQuantity < +minQuantity) {
//                     setTimeout(() => {
//                         document.querySelector('.product-form__submit').setAttribute("disabled", true);
//                     }, 1000)
//                 } else {
//                     document.querySelector('.product-form__submit').removeAttribute("disabled");
//                 }
//             } else {
//             }
//         })
//     }).catch(e => console.log(e));
// };




// document.querySelectorAll("variant-radios fieldset label").forEach((variant) => {
//     variant.addEventListener('click', () => {
//         checkTheCondition(variant.dataset.inventory);
//     });
// });

// const checkTheCondition = (inventory) => {
//     const inven = inventory;
//     getCartData().then((data) => {
//         const itemData = data.items.map(item => ({
//             quantity: item.quantity,
//             title: item.title,
//             id: item.id,
//         }));
//         console.log(inven);
//         console.log(itemData);
//     }).catch(e => console.log(e));
// };