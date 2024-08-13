// <!-- custom subscription design start -->
// <div id="custom_subscription"></div>
// <!-- custom subscription design end -->

// custom subscription app design 
        
 const toggleFunc = () => {
    document.querySelectorAll('.custom_subscription_options input[name="option_inputs"]').forEach((ele) => {
        ele.addEventListener('change', (e) => {
            if (e.target.checked) {
                const dataset = e.target.parentNode.dataset;

                Object.keys(dataset).forEach(key => {
                    const hyphenatedKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
                    const attributeSelector = `[data-${hyphenatedKey}="${dataset[key]}"]`;

                    const label = document.querySelector(`.rc-radio-group__options label${attributeSelector}`);
                    label.click();
                  if(e.target.value.includes('save')){
                    document.querySelector('#custom_options_dropdown').style.display = 'block'
                  } else{
                    document.querySelector('#custom_options_dropdown').style.display = 'none'
                  }
                });
            }
        });
    });
}
   const customDesign = () => {
     let selectList = document.createElement("select");
      selectList.id = "custom_options_dropdown";
      document.querySelectorAll('.rc_widget__option__plans__dropdown option').forEach((optEle) => {
          let option = document.createElement("option");
          option.value = optEle.value;
          option.text = optEle.innerText;
          selectList.appendChild(option);
      })
     
    document.querySelectorAll('.rc-radio-group__options label').forEach((ele, ind) => {
        const isChecked = ele.childNodes[0].checked ? 'checked="true"' : '';
        const isOptions = ele.hasAttribute('data-option-subsave')
        // console.log(ele.dataset)
        // console.log(ele.childNodes[0].value)
        let dataAttributes = '';
        ele.getAttributeNames().forEach(attr => {
            if (attr.startsWith('data-')) {
                dataAttributes += `${attr}="${ele.getAttribute(attr)}" `;
            }
        });
        document.querySelector('#custom_subscription').innerHTML += `<div class="custom_subscription_options"><label for="option_inputs${ind}" class="option_label" ${dataAttributes}><input type="radio" id="option_inputs${ind}" name="option_inputs" value="${ele.childNodes[0].value}" ${isChecked} />
    <div class="custom-radio"><span class="inner_radio"></span></div>
    <div><span>${ele.childNodes[1].querySelector('.rc-option__text').innerText}</span><span>${ele.childNodes[1].querySelector('.rc-option__price').innerText}</span></div></label>${isOptions ? `<div id="custom_dropdown_option"></div>` : ''}</div>`
    })
        toggleFunc()
      document.querySelector('#custom_dropdown_option').appendChild(selectList);
     document.querySelector('#custom_options_dropdown').addEventListener('change',(opt)=>{
      document.querySelector('.rc_widget__option__plans__dropdown').value = opt.target.value;
    })
}


// Select the target node (you might want to target a parent container)
const targetNode = document.body;

// Options for the observer (which mutations to observe)
const config = { childList: true, subtree: true };

// Create an observer instance linked to the callback function
const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            // Check if the element is in the DOM
            const element = document.querySelector('.rc-container'); // Replace with your element's selector
            if (element) {
                // Element is in the DOM, execute the function
              setTimeout(()=>{
                customDesign();
              }, 600);
                // Optionally, disconnect the observer if no longer needed
                observer.disconnect();
                break; // Exit loop if element found
            }
        }
    }
});

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
