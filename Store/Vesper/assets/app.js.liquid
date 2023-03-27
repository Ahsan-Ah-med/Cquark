/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 766:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = true;
var EventHandler = /** @class */ (function () {
    function EventHandler() {
        this.events = [];
    }
    EventHandler.prototype.register = function (el, event, listener) {
        if (!el || !event || !listener)
            return null;
        this.events.push({ el: el, event: event, listener: listener });
        el.addEventListener(event, listener);
        return { el: el, event: event, listener: listener };
    };
    EventHandler.prototype.unregister = function (_a) {
        var el = _a.el, event = _a.event, listener = _a.listener;
        if (!el || !event || !listener)
            return null;
        this.events = this.events.filter(function (e) { return el !== e.el
            || event !== e.event || listener !== e.listener; });
        el.removeEventListener(event, listener);
        return { el: el, event: event, listener: listener };
    };
    EventHandler.prototype.unregisterAll = function () {
        this.events.forEach(function (_a) {
            var el = _a.el, event = _a.event, listener = _a.listener;
            return el.removeEventListener(event, listener);
        });
        this.events = [];
    };
    return EventHandler;
}());
exports.Z = EventHandler;


/***/ }),

/***/ 722:
/***/ (() => {

class VariantSelection extends HTMLElement {
  static get observedAttributes() {
    return ['variant'];
  }

  constructor() {
    super();
    this._loaded = false;
    this._productFetcher = Promise.resolve(false);

    this._onMainElChange = event => {
      this.variant = event.currentTarget.value;
    };

    const mainInputEl = this.querySelector('input[data-variants]');
    this._mainEl = mainInputEl || this.querySelector('select[data-variants]');
  }

  set variant(value) {
    if (value) {
      this.setAttribute('variant', value);
    } else {
      this.removeAttribute('variant');
    }
  }

  get variant() {
    return this.getAttribute('variant');
  }

  connectedCallback() {
    this._productFetcher = this._fetchProduct();
    const mainInputEl = this.querySelector('input[data-variants]');
    this._mainEl = mainInputEl || this.querySelector('select[data-variants]');

    this._mainEl.addEventListener('change', this._onMainElChange);

    this.variant = this._mainEl.value;
  }

  disconnectedCallback() {
    this._mainEl.removeEventListener('change', this._onMainElChange);

    this._mainEl = null;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case 'variant':
        this._changeVariant(newValue);

        break;
    }
  }

  getProduct() {
    return this._loaded ? Promise.resolve(this._product) : this._productFetcher;
  }

  getVariant() {
    return this.getProduct().then(product => product ? product.variants.find(v => v.id.toString() === this.variant) || false : false).catch(() => false);
  }

  getState() {
    return this.getVariant().then(variant => variant ? 'selected' : this.getAttribute('variant'));
  }

  _changeVariant(value) {
    this._dispatchEvent(value).then(() => {
      this._mainEl.value = value;
    });
  }

  _fetchProduct() {
    return fetch(this.getAttribute('product-url')).then(response => response.json()).then(product => {
      this._product = product;
      return product;
    }).catch(() => {
      this._product = null;
    }).finally(() => {
      this._loaded = true;
    });
  }

  _dispatchEvent(value) {
    return this.getProduct().then(product => {
      const variant = product ? product.variants.find(v => v.id.toString() === value) || false : false;
      const state = variant ? 'selected' : value;
      const event = new CustomEvent('variant-change', {
        detail: {
          product,
          variant,
          state
        }
      });
      this.dispatchEvent(event);
    });
  }

}

const valueElementType = {
  select: 'option',
  radio: 'input[type="radio"]'
};

function setSelectedOptions(selectOptions, radioOptions, selectedOptions) {
  selectOptions.forEach(({
    option
  }) => {
    option.value = selectedOptions[parseInt(option.dataset.variantOptionIndex, 10)];
  });
  radioOptions.forEach(({
    values
  }) => {
    values.forEach(value => {
      value.checked = value.value === selectedOptions[parseInt(value.dataset.variantOptionValueIndex, 10)];
    });
  });
}

function getOptions(optionsEls) {
  const select = [];
  const radio = [];

  for (let i = 0; i < optionsEls.length; i++) {
    const optionEl = optionsEls[i];
    const wrappers = optionEl.matches('[data-variant-option-value-wrapper]') ? [optionEl] : Array.prototype.slice.call(optionEl.querySelectorAll('[data-variant-option-value-wrapper]'));
    const values = optionEl.matches('[data-variant-option-value]') ? [optionEl] : Array.prototype.slice.call(optionEl.querySelectorAll('[data-variant-option-value]'));
    if (!values.length) break;
    const option = {
      option: optionEl,
      wrappers,
      values
    };

    if (values[0].matches(valueElementType.select)) {
      select.push(option);
    } else if (values[0].matches(valueElementType.radio)) {
      radio.push(option);
    }
  }

  return {
    select,
    radio
  };
}

function getSelectedOptions(product, selectOptions, radioOptions) {
  const options = product.options.map(() => 'not-selected');
  selectOptions.forEach(({
    option
  }) => {
    if (option.value !== 'not-selected') {
      options[parseInt(option.dataset.variantOptionIndex, 10)] = option.value;
    }
  });
  radioOptions.forEach(({
    values
  }) => {
    values.forEach(value => {
      if (value.checked) {
        options[parseInt(value.dataset.variantOptionValueIndex, 10)] = value.value;
      }
    });
  });
  return options;
}

function getVariantFromSelectedOptions(variants, selectedOptions) {
  for (let i = 0; i < variants.length; i++) {
    const variant = variants[i];
    const isVariant = variant.options.every((option, index) => option === selectedOptions[index]);
    if (isVariant) return variant; // We found the variant
  }

  return false;
}

function _getVariant(variants, options) {
  return variants.find(variant => variant.options.every((option, index) => option === options[index]));
}

function _setOptionsMap(product, selectedOptions, optionsMap, option1, option2 = null, option3 = null) {
  const updatedOptionsMap = { ...optionsMap
  };
  const options = [option1, option2, option3].filter(option => !!option);

  const variant = _getVariant(product.variants, options);

  const variantOptionMatches = options.filter((option, index) => option === selectedOptions[index]).length;
  const isCurrentVariant = variantOptionMatches === product.options.length;
  const isNeighbor = variantOptionMatches === product.options.length - 1;

  for (let i = 0; i < options.length; i++) {
    const option = options[i];

    if (option) {
      let {
        setByCurrentVariant,
        setByNeighbor,
        accessible,
        available
      } = optionsMap[i][option];

      if (variant) {
        accessible = variant.available || accessible; // The current variant is always
        // the priority for option availability

        if (isCurrentVariant) {
          setByCurrentVariant = true;
          ({
            available
          } = variant);
        } else if (!setByCurrentVariant && isNeighbor) {
          // If the variant is a neighbor
          // And the option doesn't belong to the variant
          // Use its availability information for the option
          // If multiple neighbors exist, prefer true
          available = setByNeighbor ? available || variant.available : variant.available;
          setByNeighbor = true;
        }
      } else if (isCurrentVariant) {
        // Catch case where current variant doesn't exist
        // Ensure availability is false
        setByCurrentVariant = true;
        available = false;
      } else if (!setByCurrentVariant && isNeighbor) {
        // Catch case where neighbor doesn't exist
        // Ensure availability is false
        // If multiple neighbors exist, prefer true
        available = setByNeighbor ? available : false;
        setByNeighbor = true;
      } // If the option isn't set by either
      // the current variant or a neighbor
      // default to general accessibility


      if (!setByCurrentVariant && !setByNeighbor) {
        available = accessible;
      }

      updatedOptionsMap[i][option] = {
        setByCurrentVariant,
        setByNeighbor,
        accessible,
        available
      };
    }
  }

  return updatedOptionsMap;
}

function getOptionsAccessibility(product, selectedOptions) {
  let optionsMap = product.options.map(() => ({}));

  for (let i = 0; i < product.options.length; i++) {
    for (let j = 0; j < product.variants.length; j++) {
      const variant = product.variants[j];
      const option = variant.options[i];
      optionsMap[i][option] = {
        setByCurrentVariant: false,
        setByNeighbor: false,
        accessible: false,
        available: false
      };
    }
  }

  const option1Values = optionsMap.length >= 1 ? Object.keys(optionsMap[0]) : [];
  const option2Values = optionsMap.length >= 2 ? Object.keys(optionsMap[1]) : [];
  const option3Values = optionsMap.length >= 3 ? Object.keys(optionsMap[2]) : [];
  option1Values.forEach(option1Value => {
    option2Values.forEach(option2Value => {
      option3Values.forEach(option3Value => {
        optionsMap = _setOptionsMap(product, selectedOptions, optionsMap, option1Value, option2Value, option3Value);
      });

      if (!option3Values.length) {
        optionsMap = _setOptionsMap(product, selectedOptions, optionsMap, option1Value, option2Value);
      }
    });

    if (!option2Values.length) {
      optionsMap = _setOptionsMap(product, selectedOptions, optionsMap, option1Value);
    }
  });
  return optionsMap;
}

function updateOptions(product, selectOptions, radioOptions, selectedOptions, disableUnavailableOptions, removeUnavailableOptions) {
  const options = [...selectOptions, ...radioOptions];

  if (options.length === 0) {
    return;
  }

  const optionsAccessibility = getOptionsAccessibility(product, selectedOptions); // Iterate over each option type

  for (let i = 0; i < product.options.length; i++) {
    // Corresponding select dropdown, if it exists
    const optionValues = options.find(({
      option
    }) => {
      if (parseInt(option.dataset.variantOptionIndex, 10) === i) {
        return true;
      }

      return false;
    });

    if (optionValues) {
      const fragment = document.createDocumentFragment();
      const {
        option,
        wrappers,
        values
      } = optionValues;

      for (let j = values.length - 1; j >= 0; j--) {
        const wrapper = wrappers[j];
        const optionValue = values[j];
        const {
          value
        } = optionValue;
        const {
          available
        } = value in optionsAccessibility[i] ? optionsAccessibility[i][value] : false;
        const {
          accessible
        } = value in optionsAccessibility[i] ? optionsAccessibility[i][value] : false;
        const isChooseOption = value === 'not-selected'; // Option element to indicate unchosen option
        // Disable unavailable options

        optionValue.disabled = isChooseOption || disableUnavailableOptions && !accessible;
        optionValue.dataset.variantOptionAccessible = accessible;
        optionValue.dataset.variantOptionAvailable = available;

        if (!removeUnavailableOptions || accessible || isChooseOption) {
          fragment.insertBefore(wrapper, fragment.firstElementChild);
        }
      }

      option.innerHTML = '';
      option.appendChild(fragment);
      const chosenValue = values.find(value => value.selected || value.checked);
      option.dataset.variantOptionChosenValue = chosenValue && chosenValue.value !== 'not-selected' ? chosenValue.value : false;
    }
  }
}

class OptionsSelection extends HTMLElement {
  static get observedAttributes() {
    return ['variant-selection', 'disable-unavailable', 'remove-unavailable'];
  }

  static synchronize(mainOptionsSelection) {
    const mainVariantSelection = mainOptionsSelection.getVariantSelection(); // Fast return if we aren't associated with a variant selection

    if (!mainVariantSelection) return Promise.resolve(false);
    return mainOptionsSelection.getSelectedOptions().then(selectedOptions => {
      // Update all other options selects associated with the same variant ui
      const optionsSelections = document.querySelectorAll('options-selection');
      optionsSelections.forEach(optionsSelection => {
        if (optionsSelection !== mainOptionsSelection && optionsSelection.getVariantSelection() === mainVariantSelection) {
          optionsSelection.setSelectedOptions(selectedOptions);
        }
      });
    }).then(() => true);
  }

  constructor() {
    super();
    this.style.display = '';
    this._events = [];
    this._onChangeFn = this._onOptionChange.bind(this);
    this._optionsEls = this.querySelectorAll('[data-variant-option]');
    ({
      select: this._selectOptions,
      radio: this._radioOptions
    } = getOptions(this._optionsEls));

    this._associateVariantSelection(this.getAttribute('variant-selection'));
  }

  set variantSelection(value) {
    if (value) {
      this.setAttribute('variant-selection', value);
    } else {
      this.removeAttribute('variant-selection');
    }
  }

  get variantSelection() {
    return this.getAttribute('variant-selection');
  }

  connectedCallback() {
    this._optionsEls = this.querySelectorAll('[data-variant-option]');
    ({
      select: this._selectOptions,
      radio: this._radioOptions
    } = getOptions(this._optionsEls));

    this._associateVariantSelection(this.getAttribute('variant-selection'));

    this._selectOptions.forEach(({
      option
    }) => {
      option.addEventListener('change', this._onChangeFn);

      this._events.push({
        el: option,
        fn: this._onChangeFn
      });
    });

    this._radioOptions.forEach(({
      values
    }) => {
      values.forEach(value => {
        value.addEventListener('change', this._onChangeFn);

        this._events.push({
          el: value,
          fn: this._onChangeFn
        });
      });
    });

    this._onOptionChange();
  }

  disconnectedCallback() {
    this._resetOptions();

    this._events.forEach(({
      el,
      fn
    }) => el.removeEventListener('change', fn));

    this._events = [];
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    switch (name) {
      case 'variant-selection':
        this._associateVariantSelection(newValue);

        break;

      case 'disable-unavailable':
      case 'remove-unavailable':
        this._updateOptions(this.hasAttribute('disable-unavailable'), this.hasAttribute('remove-unavailable'));

        break;
    }
  }

  getSelectedOptions() {
    if (!this._variantSelection) return Promise.resolve(null);
    return this._variantSelection.getProduct().then(product => {
      if (!product) return null;
      return getSelectedOptions(product, this._selectOptions, this._radioOptions);
    });
  }

  getVariantSelection() {
    return this._variantSelection;
  }

  setSelectedOptions(selectedOptions) {
    setSelectedOptions(this._selectOptions, this._radioOptions, selectedOptions);
    return this._updateOptions(this.hasAttribute('disable-unavailable'), this.hasAttribute('remove-unavailable'), selectedOptions);
  }

  _associateVariantSelection(id) {
    this._variantSelection = id ? document.getElementById(id) : this.closest('variant-selection');
  }

  _updateLabels() {
    // Update any labels
    for (let i = 0; i < this._optionsEls.length; i++) {
      const optionsEl = this._optionsEls[i];
      let optionsNameEl = null;
      let {
        parentElement
      } = optionsEl;

      while (parentElement && !optionsNameEl) {
        const tmpOptionsNameEl = parentElement.querySelector('[data-variant-option-name]');

        if (tmpOptionsNameEl) {
          optionsNameEl = tmpOptionsNameEl;
        }

        ({
          parentElement
        } = parentElement);
      }

      if (optionsNameEl) {
        optionsNameEl.dataset.variantOptionChosenValue = optionsEl.dataset.variantOptionChosenValue;

        if (optionsEl.dataset.variantOptionChosenValue !== 'false') {
          optionsNameEl.innerHTML = optionsNameEl.dataset.variantOptionName;
          const optionNameValueSpan = optionsNameEl.querySelector('span');

          if (optionNameValueSpan) {
            optionNameValueSpan.innerHTML = optionsEl.dataset.variantOptionChosenValue;
          }
        } else {
          optionsNameEl.innerHTML = optionsNameEl.dataset.variantOptionChooseName;
        }
      }
    }
  }

  _resetOptions() {
    return this._updateOptions(false, false);
  }

  _updateOptions(disableUnavailableOptions, removeUnavailableOptions, selectedOptions = null) {
    if (!this._variantSelection) return Promise.resolve(false);
    return this._variantSelection.getProduct().then(product => {
      updateOptions(product, this._selectOptions, this._radioOptions, selectedOptions || getSelectedOptions(product, this._selectOptions, this._radioOptions), disableUnavailableOptions, removeUnavailableOptions);

      this._updateLabels();
    }).then(() => true);
  }

  _updateVariantSelection(product, selectedOptions) {
    if (!this._variantSelection) return;
    const variant = getVariantFromSelectedOptions(product.variants, selectedOptions);
    const isNotSelected = selectedOptions.some(option => option === 'not-selected'); // Update master select

    if (variant) {
      this._variantSelection.variant = variant.id;
    } else {
      this._variantSelection.variant = isNotSelected ? 'not-selected' : 'unavailable';
    }
  }

  _onOptionChange() {
    if (!this._variantSelection) return;

    this._variantSelection.getProduct().then(product => {
      if (!product) return;
      const selectedOptions = getSelectedOptions(product, this._selectOptions, this._radioOptions);

      this._updateOptions(this.hasAttribute('disable-unavailable'), this.hasAttribute('remove-unavailable'), selectedOptions);

      this._updateVariantSelection(product, selectedOptions);

      OptionsSelection.synchronize(this);
    });
  }

}

if (!customElements.get('variant-selection')) {
  customElements.define('variant-selection', VariantSelection);
}

if (!customElements.get('options-selection')) {
  customElements.define('options-selection', OptionsSelection);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/@pixelunion/shopify-variants-ui/dist/index.es.js
var index_es = __webpack_require__(722);
;// CONCATENATED MODULE: ./node_modules/@shopify/theme-addresses/theme-addresses.js
/**
 * CountryProvinceSelector Constructor
 * @param {String} countryOptions the country options in html string
 */
function CountryProvinceSelector(countryOptions) {
  if (typeof countryOptions !== 'string') {
    throw new TypeError(countryOptions + ' is not a string.');
  }
  this.countryOptions = countryOptions;
}

/**
 * Builds the country and province selector with the given node element
 * @param {Node} countryNodeElement The <select> element for country
 * @param {Node} provinceNodeElement The <select> element for province
 * @param {Object} options Additional settings available
 * @param {CountryProvinceSelector~onCountryChange} options.onCountryChange callback after a country `change` event
 * @param {CountryProvinceSelector~onProvinceChange} options.onProvinceChange callback after a province `change` event
 */
CountryProvinceSelector.prototype.build = function (countryNodeElement, provinceNodeElement, options) {
  if (typeof countryNodeElement !== 'object') {
    throw new TypeError(countryNodeElement + ' is not a object.');
  }

  if (typeof provinceNodeElement !== 'object') {
    throw new TypeError(provinceNodeElement + ' is not a object.');
  }

  var defaultValue = countryNodeElement.getAttribute('data-default');
  options = options || {}

  countryNodeElement.innerHTML = this.countryOptions;
  countryNodeElement.value = defaultValue;

  if (defaultValue && getOption(countryNodeElement, defaultValue)) {
    var provinces = buildProvince(countryNodeElement, provinceNodeElement, defaultValue);
    options.onCountryChange && options.onCountryChange(provinces, provinceNodeElement, countryNodeElement);
  }

  // Listen for value change on the country select
  countryNodeElement.addEventListener('change', function (event) {
    var target = event.target;
    var selectedValue = target.value;
    
    var provinces = buildProvince(target, provinceNodeElement, selectedValue);
    options.onCountryChange && options.onCountryChange(provinces, provinceNodeElement, countryNodeElement);
  });

  options.onProvinceChange && provinceNodeElement.addEventListener('change', options.onProvinceChange);
}

/**
 * This callback is called after a user interacted with a country `<select>`
 * @callback CountryProvinceSelector~onCountryChange
 * @param {array} provinces the parsed provinces
 * @param {Node} provinceNodeElement province `<select>` element
 * @param {Node} countryNodeElement country `<select>` element
 */

 /**
 * This callback is called after a user interacted with a province `<select>`
 * @callback CountryProvinceSelector~onProvinceChange
 * @param {Event} event the province selector `change` event object
 */

/**
 * Returns the <option> with the specified value from the
 * given node element
 * A null is returned if no such <option> is found
 */
function getOption(nodeElement, value) {
  return nodeElement.querySelector('option[value="' + value +'"]')
}

/**
 * Builds the options for province selector
 */
function buildOptions (provinceNodeElement, provinces) {
  var defaultValue = provinceNodeElement.getAttribute('data-default');

  provinces.forEach(function (option) {
    var optionElement = document.createElement('option');
    optionElement.value = option[0];
    optionElement.textContent = option[1];

    provinceNodeElement.appendChild(optionElement);
  })

  if (defaultValue && getOption(provinceNodeElement, defaultValue)) {
    provinceNodeElement.value = defaultValue;
  }
}

/**
 * Builds the province selector
 */
function buildProvince (countryNodeElement, provinceNodeElement, selectedValue) {
  var selectedOption = getOption(countryNodeElement, selectedValue);
  var provinces = JSON.parse(selectedOption.getAttribute('data-provinces'));

  provinceNodeElement.options.length = 0;

  if (provinces.length) {
    buildOptions(provinceNodeElement, provinces)
  }

  return provinces;
}

// EXTERNAL MODULE: ./node_modules/@pixelunion/events/dist/EventHandler.js
var EventHandler = __webpack_require__(766);
;// CONCATENATED MODULE: ./source/scripts/utilities/ShippingCalculator.js



class ShippingCalculator {
  constructor({ el }) {
    this.el = el;
    this.events = new EventHandler/* default */.Z();
    this.rates = this.el.querySelector('[data-shipping-rates]');
    this.message = this.el.querySelector('[data-shipping-message]');
    this.zip = this.el.querySelector('[data-shipping-calculator-zipcode]');
    this.submit = this.el.querySelector('.get-rates');
    this.response = this.el.querySelector('[data-shipping-calculator-response]');
    this.countrySelect = this.el.querySelector('[data-shipping-calculator-country]');
    this.provinceSelect = this.el.querySelector('[data-shipping-calculator-province]');
    this.provinceContainer = this.el.querySelector('[data-shipping-calculator-province-container]');

    this.buildCalculator();
  }

  buildCalculator() {
    this.shippingCountryProvinceSelector = new CountryProvinceSelector(this.countrySelect.innerHTML);
    this.shippingCountryProvinceSelector
      .build(
        this.countrySelect,
        this.provinceSelect,
        {
          onCountryChange: provinces => {
            if (provinces.length) {
              this.provinceContainer.style.display = 'block';
            } else {
              this.provinceContainer.style.display = 'none';
            }

            // "Province", "State", "Region", etc. and "Postal Code", "ZIP Code", etc.
            // Even countries without provinces include a label.
            const { label, zip_label: zipLabel } = window.Countries[this.countrySelect.value];
            this.provinceContainer.querySelector('label[for="address_province"]').innerHTML = label;
            this.el.querySelector('label[for="address_zip"]').innerHTML = zipLabel;
          },
        },
      );

    this.events.register(this.submit, 'click', e => {
      e.preventDefault();
      this.getRates();
    });
  }

  getRates() {
    const shippingAddress = {};
    shippingAddress.country = this.countrySelect ? this.countrySelect.value : '';
    shippingAddress.province = this.provinceSelect ? this.provinceSelect.value : '';
    shippingAddress.zip = this.zip ? this.zip.value : '';

    const queryString = Object.keys(shippingAddress)
      .map(key => `${encodeURIComponent(`shipping_address[${key}]`)}=${encodeURIComponent(shippingAddress[key])}`)
      .join('&');

    fetch(`${window.PXUTheme.routes.cart_url}/shipping_rates.json?${queryString}`)
      .then(response => response.json())
      .then(data => this.displayRates(data));
  }

  displayRates(rates) {
    const propertyName = Object.keys(rates);
    this.clearRates();

    if (propertyName[0] === 'shipping_rates') {
      rates.shipping_rates.forEach(rate => {
        const rateLi = document.createElement('li');
        rateLi.innerHTML = `${rate.name}: ${this.formatPrice(rate.price)}`;
        this.rates.appendChild(rateLi);
      });

      if (rates.shipping_rates.length > 1) {
        this.message.innerHTML = `${window.PXUTheme.translation.additional_rates_part_1} ${rates.shipping_rates.length} ${window.PXUTheme.translation.additional_rates_part_2} ${this.zip.value}, ${this.provinceSelect.value}, ${this.countrySelect.value}, ${window.PXUTheme.translation.additional_rates_part_3} ${this.formatPrice(rates.shipping_rates[0].price)}`;
      } else {
        this.message.innerHTML = `${window.PXUTheme.translation.additional_rate} ${this.zip.value}, ${this.provinceSelect.value}, ${this.countrySelect.value}, ${window.PXUTheme.translation.additional_rate_at} ${this.formatPrice(rates.shipping_rates[0].price)}`;
      }

      this.response.classList.add('shipping-rates--display-rates');
    } else {
      this.message.innerHTML = `Error: ${propertyName[0]} ${rates[propertyName[0]]}`;
      this.response.classList.add('shipping-rates--display-error');
    }
  }

  clearRates() {
    this.response.classList.remove('shipping-rates--display-error', 'shipping-rates--display-rates');
    this.message.innerHTML = '';
    this.rates.innerHTML = '';
  }

  formatPrice(price) {
    let formattedPrice;

    if (window.PXUTheme.currency.display_format === 'money_with_currency_format') {
      formattedPrice = `<span class="money">${window.PXUTheme.currency.symbol}${price} ${window.PXUTheme.currency.iso_code}</span>`;
    } else {
      formattedPrice = `<span class="money">${window.PXUTheme.currency.symbol}${price}</span>`;
    }

    return formattedPrice;
  }

  unload() {
    this.events.unregisterAll();
  }
}

;// CONCATENATED MODULE: ./source/scripts/app.js



// Section Shopify window.PXUTheme.theme editor events

$(document)
.on('shopify:section:reorder', function(e){

  var $target = $(e.target);
  var $parentSection = $('#shopify-section-' + e.detail.sectionId);

  if (window.PXUTheme.jsHeader.enable_overlay == true) {
    window.PXUTheme.jsHeader.unload();
    window.PXUTheme.jsHeader.updateOverlayStyle(window.PXUTheme.jsHeader.sectionUnderlayIsImage());
  }

});

$(document)
.on('shopify:section:load', function(e){

  // Shopify section as jQuery object
  var $section = $(e.target);

  // Vanilla js selection of Shopify section
  var section = document.getElementById('shopify-section-' + e.detail.sectionId);

  // Blocks within section
  var $jsSectionBlocks = $section.find('.shopify-section[class*=js]');

  var sectionObjectUrl = $section.find('[data-theme-editor-load-script]').attr('src');

  // Check classes on schema and look for js (eg. jsMap)
  for (var i = 0; i < section.classList.length; i++) {
    if (section.classList[i].substring(0, 2) === "js"){
      var triggerClass = section.classList[i];

      // Check to see if section script exists
      if (typeof window.PXUTheme[triggerClass] == 'undefined') {
        // make AJAX call to load script
        window.PXUTheme.loadScript(triggerClass, sectionObjectUrl, function () {
          window.PXUTheme[triggerClass].init($(section));
        });
      } else {
        if (window.PXUTheme[triggerClass]) {
          // console.log('Section: ' + triggerClass + ' has been loaded.')
          window.PXUTheme[triggerClass].init($(section));
        } else {
          // console.warn('Uh oh, ' + triggerClass + ' is referenced in section schema class, but can not be found. Make sure "z__' + triggerClass + '.js" and window.PXUTheme.' + triggerClass + '.init() function exists.');
        }
      }
    }
  }

  // Check classes on block element and look for js (eg. jsMap)
  if ($jsSectionBlocks.length > 0) {
    var $jsSectionBlockNames = $jsSectionBlocks.each(function () {
      for (var i = 0; i < this.classList.length; i++) {
        if (this.classList[i].substring(0, 2) === "js") {
          var triggerClass = this.classList[i];
          var $block = $('.'+ triggerClass)
          var blockUrl = $block.find('[data-theme-editor-load-script]').attr('src');

          // Check to see if section script exists
          if (typeof window.PXUTheme[triggerClass] == 'undefined') {
            // make AJAX call to load script
            window.PXUTheme.loadScript(triggerClass, blockUrl, function () {
              window.PXUTheme[triggerClass].init($block);
            });
          } else {
            if (window.PXUTheme[triggerClass]) {
              // console.log('Block: ' + triggerClass + ' has been loaded.')
              window.PXUTheme[triggerClass].init($(this));
            } else {
              // console.warn('Uh oh, ' + triggerClass + ' is referenced in block class, but can not be found. Make sure "z__' + triggerClass + '.js" and window.PXUTheme.' + triggerClass + '.init() function exists.');
            }
          }

        }
      }
    });
  }

  // Load video feature
  window.PXUTheme.video.init();

  // Scrolling animations
  window.PXUTheme.animation.init();

  // Initialize reviews
  window.PXUTheme.productReviews.init();

  // Object Fit Images
  window.PXUTheme.objectFitImages.init();

  // Infinite scrolling
  window.PXUTheme.infiniteScroll.init();

  // Disclosure menus
  window.PXUTheme.disclosure.enable();

  // Search
  $(document).on('click',  '[data-show-search-trigger]', function(){
    window.PXUTheme.jsHeader.showSearch();
  });

  $('.search-overlay__close').on('click', function(){
    window.PXUTheme.jsHeader.hideSearch();
  });

  if (window.PXUTheme.theme_settings.enable_autocomplete == true) {
    window.PXUTheme.predictiveSearch.init();
  }
  // Product review scroll
  window.PXUTheme.productReviews.productReviewScroll();

});


$(document)
.on('shopify:section:unload', function(e){

  // Shopify section as jQuery object
  var $section = $(e.target);

  // Vanilla js selection of Shopify section
  var section = document.getElementById('shopify-section-' + e.detail.sectionId);

  // Blocks within section
  var $jsSectionBlocks = $section.find('.shopify-section[class*=js]');

  // Check classes on schema and look for js (eg. jsMap)
  for (var i = 0; i < section.classList.length; i++) {
    if (section.classList[i].substring(0, 2) === "js"){
      var triggerClass = section.classList[i];
      if (window.PXUTheme[triggerClass]) {
        // console.log('Section: ' + triggerClass + ' is unloaded.')
        window.PXUTheme[triggerClass].unload($(section));
      } else {
        // console.warn('Uh oh, ' + triggerClass + ' is referenced in section schema class, but can not be found. Make sure "z__' + triggerClass + '.js" and window.PXUTheme.' + triggerClass + '.unload() function exists.');
      }
    }
  }

  // Check classes on block element and look for js (eg. jsMap)
  if ($jsSectionBlocks.length > 0) {
    var $jsSectionBlockNames = $jsSectionBlocks.each(function () {
      for (var i = 0; i < this.classList.length; i++) {
        if (this.classList[i].substring(0, 2) === "js") {
          var triggerClass = this.classList[i];
          if (window.PXUTheme[triggerClass]) {
            // console.log('Block: ' + triggerClass + ' is unloaded.')
            window.PXUTheme[triggerClass].unload($(this));
          } else {
            // console.warn('Uh oh, ' + triggerClass + ' is referenced in block class, but can not be found. Make sure "z__' + triggerClass + '.js" and window.PXUTheme.' + triggerClass + '.unload() function exists.');
          }

        }
      }
    });
  }

  // Scrolling animations
  window.PXUTheme.animation.unload($section);

  // QuantityBox
  window.PXUTheme.quantityBox.unload($section);

  // Infinite scrolling
  window.PXUTheme.infiniteScroll.unload($section);

  // Disclosure menus
  window.PXUTheme.disclosure.enable();

});

$(document)
.on('shopify:section:select', function(e){

  // Shopify section as jQuery object
  var $section = $(e.target);

  // Vanilla js selection of Shopify section
  var section = document.getElementById('shopify-section-' + e.detail.sectionId);

  // Force show state when section is selected in theme editor
  for (var i = 0; i < section.classList.length; i++) {
    if (section.classList[i].substring(0, 2) === "js") {
      var triggerClass = section.classList[i];
      if (window.PXUTheme[triggerClass].showThemeEditorState) {
        window.PXUTheme[triggerClass].showThemeEditorState(e.detail.sectionId, $section);
      }
    }
  }

  // Predictive search
  if (window.PXUTheme.theme_settings.enable_autocomplete == true) {
    window.PXUTheme.predictiveSearch.init();
  }

  if($('.tabs').length > 0) {
    window.PXUTheme.tabs.enableTabs();
  }

  if(isScreenSizeLarge() && window.PXUTheme.jsHeader.enable_overlay === true) {
    window.PXUTheme.jsHeader.updateOverlayStyle(window.PXUTheme.jsHeader.sectionUnderlayIsImage());
  }

  if ($('.block__recommended-products').length > 0) {
    var $productPage = $('.block__recommended-products').parents('.product-page');
    window.PXUTheme.jsRecommendedProducts.init($productPage);
  }

});

$(document)
.on('shopify:section:deselect', function(e){

  // Shopify section as jQuery object
  var $section = $(e.target);

  // Vanilla js selection of Shopify section
  var section = document.getElementById('shopify-section-' + e.detail.sectionId);

  // Force hide state when section is selected in theme editor
  for (var i = 0; i < section.classList.length; i++) {
    if (section.classList[i].substring(0, 2) === "js") {
      var triggerClass = section.classList[i];
      if (window.PXUTheme[triggerClass].showThemeEditorState) {
        window.PXUTheme[triggerClass].hideThemeEditorState(e.detail.sectionId, $(section));
      }
    }
  }

});

// Block Shopify window.PXUTheme.theme editor events

$(document)
.on('shopify:block:select', function(e){

  var blockId = e.detail.blockId;
  var $parentSection = $('#shopify-section-' + e.detail.sectionId);
  var $block = $('#shopify-section-' + blockId);

  if($('.jsFeaturedPromos').length > 0) {
    window.PXUTheme.jsFeaturedPromos.blockSelect($parentSection, blockId);
  }

  if($('.jsSlideshowWithText').length > 0) {
    window.PXUTheme.jsSlideshowWithText.blockSelect($parentSection, blockId);
  }

  if ($('.jsSlideshowClassic').length > 0) {
    window.PXUTheme.jsSlideshowClassic.blockSelect($parentSection, blockId);
  }

  if($('.jsTestimonials').length > 0) {
    window.PXUTheme.jsTestimonials.blockSelect($parentSection, blockId);
  }

  // Sidebar collection multi-tag filter
  if ($block.hasClass('sidebar__block')) {
    var $toggleBtn = $block.find('[data-sidebar-block__toggle="closed"]');
    if ($toggleBtn) {
      window.PXUTheme.jsSidebar.openSidebarBlock($toggleBtn);
    }
  }

  // Predictive search
  if (window.PXUTheme.theme_settings.enable_autocomplete == true) {
    window.PXUTheme.predictiveSearch.init();
  }

  // Scrolling animations
  window.PXUTheme.animation.init();

  // Object Fit Images
  window.PXUTheme.objectFitImages.init();

});

$(document)
.on('shopify:block:deselect', function(e){

  var $block = $('#shopify-section-' + e.detail.blockId);

  if ($block.hasClass('sidebar__block')) {
    var $toggleBtn = $block.find('[data-sidebar-block__toggle="open"]');
    if ($toggleBtn) {
      window.PXUTheme.jsSidebar.closeSidebarBlock($toggleBtn);
    }
  }

});

$(document)
.on('shopify:block:load', function(e){



});

// Document ready
$(function() {
  var $jsSections = $('.shopify-section[class*=js]');

  // Loop through sections with js classes and load them in
  var $jsSectionNames = $jsSections.each(function () {
    for (var i = 0; i < this.classList.length; i++) {
      if (this.classList[i].substring(0, 2) === "js"){
        var triggerClass = this.classList[i];
        if (window.PXUTheme[triggerClass]) {
          // console.log('Section: ' + triggerClass + ' has been loaded.')
          window.PXUTheme[triggerClass].init($(this));
        } else {
          // console.warn('Uh oh, ' + triggerClass + ' is referenced in section schema class, but can not be found. Make sure "z__' + triggerClass + '.js" and window.PXUTheme.' + triggerClass + '.init() function exists.');
        }

      }
    }
  });

  var resizeTimer;

  // Store window width in variable
  var width = $(window).width(), height = $(window).height();

  $(window).on('resize', function(e) {

    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {

      window.PXUTheme.objectFitImages.calculateAspectRatio();

      if (window.PXUTheme.jsHeader.header_layout === 'vertical') {
        window.PXUTheme.predictiveSearch.alignVerticalSearch()
      }

      if (!isScreenSizeLarge()){
        // When 798 or less
        window.PXUTheme.mobileMenu.init();

      } else {

        // When larger than 798
        window.PXUTheme.mobileMenu.unload();
      }

    }, 250);

  });

  //Enable plyr
  window.PXUTheme.video.init();

  // Predictive search
  if (window.PXUTheme.theme_settings.enable_autocomplete == true) {
    window.PXUTheme.predictiveSearch.init();
  }

  window.PXUTheme.dropdownMenu();

  window.PXUTheme.disclosure.enable();

  // Scrolling animations
  window.PXUTheme.animation.init();

  // QuantityBox
  window.PXUTheme.quantityBox.init();

  /* Show associated variant image on hover */
  if (window.PXUTheme.theme_settings.show_collection_swatches == true) {
    window.PXUTheme.thumbnail.enableSwatches();
  }

  /* Show secondary image on hover */
  if (window.PXUTheme.theme_settings.show_secondary_image == true) {
    window.PXUTheme.thumbnail.showVariantImage();
  }

  // Quick shop
  if (window.PXUTheme.theme_settings.enable_quickshop) {
    window.PXUTheme.thumbnail.showQuickShop();
  }

  // Currency converter
  if (window.PXUTheme.currencyConverter) {
    window.PXUTheme.currencyConverter.init();
  }

  //Infinite scrolling
  if ($('[data-custom-pagination]').length) {
    window.PXUTheme.infiniteScroll.init();
  }

  //Select event for native multi currency checkout
  $('.shopify-currency-form select').on('change', function () {
    $(this)
      .parents('form')
      .submit();
  });

  // Tabs
  if($('.tabs').length > 0) {
    window.PXUTheme.tabs.enableTabs();
  }

  // Additional checkout buttons
  if (!isScreenSizeLarge()) {
    $('.additional-checkout-buttons').addClass('additional-checkout-buttons--vertical');
  }

  // Accordion
  if($('.accordion, [data-cc-accordion]').length > 0) {
    window.PXUTheme.contentCreator.accordion.init();
  }

  // Backwards compatiblity for Flexslider
  if($('.slider, .flexslider').length > 0) {
    window.PXUTheme.contentCreator.slideshow.init();
  }

  // Object Fit Images
  window.PXUTheme.objectFitImages.init();

  // Responsive Video
  window.PXUTheme.responsiveVideo.init();

  // Flickity IOS Fix
  window.PXUTheme.flickityIosFix();

  // Product review scroll
  window.PXUTheme.productReviews.productReviewScroll();

  if (window.PXUTheme.theme_settings.shipping_calculator_enabled && document.querySelector('[data-shipping-calculator]')) {
    const shippingCalculator = new ShippingCalculator({ el: document.querySelector('[data-shipping-calculator]') });
  }
});

/*============================================================================
Slideshow arrows
==============================================================================*/

if (window.PXUTheme.theme_settings.icon_style == 'icon_solid') {
  window.arrowShape = 'M95.04 46 21.68 46 48.18 22.8 42.91 16.78 4.96 50 42.91 83.22 48.18 77.2 21.68 54 95.04 54 95.04 46z';
} else {
  window.arrowShape = 'M95,48H9.83L41,16.86A2,2,0,0,0,38.14,14L3.59,48.58a1.79,1.79,0,0,0-.25.31,1.19,1.19,0,0,0-.09.15l-.1.2-.06.2a.84.84,0,0,0,0,.17,2,2,0,0,0,0,.78.84.84,0,0,0,0,.17l.06.2.1.2a1.19,1.19,0,0,0,.09.15,1.79,1.79,0,0,0,.25.31L38.14,86A2,2,0,0,0,41,86a2,2,0,0,0,0-2.83L9.83,52H95a2,2,0,0,0,0-4Z';
}

})();

/******/ })()
;