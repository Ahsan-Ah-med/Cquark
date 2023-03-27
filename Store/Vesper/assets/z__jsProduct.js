/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./node_modules/@pixelunion/shopify-surface-pick-up/dist/index.es.js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var LOCAL_STORAGE_KEY = 'pxu-shopify-surface-pick-up';
var loadingClass = 'surface-pick-up--loading';

var isNotExpired = function isNotExpired(timestamp) {
  return timestamp + 1000 * 60 * 60 >= Date.now();
};

var removeTrailingSlash = function removeTrailingSlash(s) {
  return s.replace(/(.*)\/$/, '$1');
}; // Haversine Distance
// The haversine formula is an equation giving great-circle distances between
// two points on a sphere from their longitudes and latitudes


function calculateDistance(latitude1, longitude1, latitude2, longitude2, unitSystem) {
  var dtor = Math.PI / 180;
  var radius = unitSystem === 'metric' ? 6378.14 : 3959;
  var rlat1 = latitude1 * dtor;
  var rlong1 = longitude1 * dtor;
  var rlat2 = latitude2 * dtor;
  var rlong2 = longitude2 * dtor;
  var dlon = rlong1 - rlong2;
  var dlat = rlat1 - rlat2;
  var a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.pow(Math.sin(dlon / 2), 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return radius * c;
}

function getGeoLocation() {
  return _getGeoLocation.apply(this, arguments);
}

function _getGeoLocation() {
  _getGeoLocation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              var options = {
                maximumAge: 3600000,
                // 1 hour
                timeout: 5000
              };

              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (_ref3) {
                  var coords = _ref3.coords;
                  return resolve(coords);
                }, reject, options);
              } else {
                reject();
              }
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getGeoLocation.apply(this, arguments);
}

function setLocation(_x) {
  return _setLocation.apply(this, arguments);
}

function _setLocation() {
  _setLocation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref) {
    var latitude, longitude, newData;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            latitude = _ref.latitude, longitude = _ref.longitude;
            newData = {
              latitude: latitude,
              longitude: longitude,
              timestamp: Date.now()
            };
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
            return _context2.abrupt("return", fetch('/localization.json', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                latitude: latitude,
                longitude: longitude
              })
            }).then(function () {
              return {
                latitude: latitude,
                longitude: longitude
              };
            }));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _setLocation.apply(this, arguments);
}

function getLocation() {
  return _getLocation.apply(this, arguments);
}

function _getLocation() {
  _getLocation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var requestLocation,
        cachedLocation,
        _args3 = arguments;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            requestLocation = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : false;
            cachedLocation = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

            if (!(cachedLocation && isNotExpired(cachedLocation.timestamp))) {
              _context3.next = 4;
              break;
            }

            return _context3.abrupt("return", cachedLocation);

          case 4:
            if (!requestLocation) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", getGeoLocation().then(function (coords) {
              setLocation(coords); // We don't need to wait for this

              return coords;
            }));

          case 6:
            return _context3.abrupt("return", null);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getLocation.apply(this, arguments);
}

var SurfacePickUp = /*#__PURE__*/function () {
  function SurfacePickUp(el, options) {
    _classCallCheck(this, SurfacePickUp);

    this.el = el;
    this.options = _objectSpread2({
      root_url: window.Theme && window.Theme.routes && window.Theme.routes.root_url || ''
    }, options);
    this.options.root_url = removeTrailingSlash(this.options.root_url);
    this.callbacks = [];
    this.onBtnPress = null;
    this.latestVariantId = null;
  }

  _createClass(SurfacePickUp, [{
    key: "load",
    value: function load(variantId) {
      var _this = this;

      // If no variant is available, empty element and quick-return
      if (!variantId) {
        this.el.innerHTML = '';
        return Promise.resolve(true);
      } // Because Shopify doesn't expose any `pick_up_enabled` data on the shop object, we
      // don't know if the variant might be, or is definitely not available for pick up.
      // Until we know the shop has > 0 pick up locations, we want to avoid prompting the
      // user for location data (it's annoying, and only makes sense to do if we use it).
      //
      // Instead, we have to make an initial request, check and see if any pick up locations
      // were returned, then ask for the users location, then make another request to get the
      // location-aware pick up locations.
      //
      // As far as I can tell the pick up aware locations differ only in sort order - which
      // we could do on the front end - but we're following this approach to ensure future
      // compatibility with any changes Shopify makes (maybe disabling options based on
      // user location, or whatever else).
      //
      // Shopify has indicated they will look into adding pick_up_enabled data to the shop
      // object, which which case this method can be greatly simplifed into 2 simple cases.


      this.latestVariantId = variantId;
      this.el.classList.add(loadingClass);
      return this._getData(variantId).then(function (data) {
        return _this._injectData(data);
      });
    }
  }, {
    key: "onModalRequest",
    value: function onModalRequest(callback) {
      if (this.callbacks.indexOf(callback) >= 0) return;
      this.callbacks.push(callback);
    }
  }, {
    key: "offModalRequest",
    value: function offModalRequest(callback) {
      this.callbacks.splice(this.callbacks.indexOf(callback));
    }
  }, {
    key: "unload",
    value: function unload() {
      this.callbacks = [];
      this.el.innerHTML = '';
    }
  }, {
    key: "_getData",
    value: function _getData(variantId) {
      var _this2 = this;

      return new Promise(function (resolve) {
        var xhr = new XMLHttpRequest();
        var requestUrl = "".concat(_this2.options.root_url, "/variants/").concat(variantId, "/?section_id=surface-pick-up");
        xhr.open('GET', requestUrl, true);

        xhr.onload = function () {
          var el = xhr.response;
          var embed = el.querySelector('[data-html="surface-pick-up-embed"]');
          var itemsContainer = el.querySelector('[data-html="surface-pick-up-items"]');
          var items = itemsContainer.content.querySelectorAll('[data-surface-pick-up-item]');
          resolve({
            embed: embed,
            itemsContainer: itemsContainer,
            items: items,
            variantId: variantId
          });
        };

        xhr.onerror = function () {
          resolve({
            embed: {
              innerHTML: ''
            },
            itemsContainer: {
              innerHTML: ''
            },
            items: [],
            variantId: variantId
          });
        };

        xhr.responseType = 'document';
        xhr.send();
      });
    }
  }, {
    key: "_injectData",
    value: function _injectData(_ref2) {
      var _this3 = this;

      var embed = _ref2.embed,
          itemsContainer = _ref2.itemsContainer,
          items = _ref2.items,
          variantId = _ref2.variantId;

      if (variantId !== this.latestVariantId || items.length === 0) {
        this.el.innerHTML = '';
        this.el.classList.remove(loadingClass);
        return;
      }

      this.el.innerHTML = embed.innerHTML;
      this.el.classList.remove(loadingClass);
      var calculatedDistances = false;

      var calculateDistances = function calculateDistances() {
        if (calculatedDistances) return Promise.resolve();
        return getLocation(true).then(function (coords) {
          items.forEach(function (item) {
            var distanceEl = item.querySelector('[data-distance]');
            var distanceUnitEl = item.querySelector('[data-distance-unit]');
            var unitSystem = distanceUnitEl.dataset.distanceUnit;
            var itemLatitude = parseFloat(distanceEl.dataset.latitude);
            var itemLongitude = parseFloat(distanceEl.dataset.longitude);

            if (coords && isFinite(itemLatitude) && isFinite(itemLongitude)) {
              var distance = calculateDistance(coords.latitude, coords.longitude, itemLatitude, itemLongitude, unitSystem);
              distanceEl.innerHTML = distance.toFixed(1);
            } else {
              distanceEl.remove();
              distanceUnitEl.remove();
            }
          });
        })["catch"](function (e) {
          console.log(e);
          items.forEach(function (item) {
            var distanceEl = item.querySelector('[data-distance]');
            var distanceUnitEl = item.querySelector('[data-distance-unit]');
            distanceEl.remove();
            distanceUnitEl.remove();
          });
        })["finally"](function () {
          calculatedDistances = true;
        });
      };

      this.el.querySelector('[data-surface-pick-up-embed-modal-btn]').addEventListener('click', function () {
        calculateDistances().then(function () {
          return _this3.callbacks.forEach(function (callback) {
            return callback(itemsContainer.innerHTML);
          });
        });
      });
    }
  }]);

  return SurfacePickUp;
}();

/* harmony default export */ const index_es = (SurfacePickUp);

;// CONCATENATED MODULE: ./node_modules/@pixelunion/shopify-price-ui/dist/index.es.js
function index_es_classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function index_es_defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function index_es_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) index_es_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) index_es_defineProperties(Constructor, staticProps);
  return Constructor;
}

function index_es_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function index_es_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function index_es_objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      index_es_ownKeys(Object(source), true).forEach(function (key) {
        index_es_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      index_es_ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var priceUITemplate = document.getElementById('price-ui').content;
var priceTemplate = document.getElementById('price-ui__price').content;
var priceRangeTemplate = document.getElementById('price-ui__price-range').content;
var unitPriceTemplate = document.getElementById('price-ui__unit-pricing').content;

function createPriceRangeFragment(priceMin, priceMax, formatter) {
  var priceRangeFragment = priceRangeTemplate.cloneNode(true);
  priceRangeFragment.querySelector('[data-price-min] [data-price]').innerHTML = formatter(priceMin);
  priceRangeFragment.querySelector('[data-price-max] [data-price]').innerHTML = formatter(priceMax);
  return priceRangeFragment;
}

function createPriceFragment(price, formatter) {
  var priceFragment = priceTemplate.cloneNode(true);
  priceFragment.querySelector('[data-price]').innerHTML = formatter(price);
  return priceFragment;
}

function createUnitPricing(variant, formatter) {
  var unitPriceContainer = unitPriceTemplate.cloneNode(true);
  var unitQuantityEl = unitPriceContainer.querySelector('[data-unit-quantity]');
  var unitPriceEl = unitPriceContainer.querySelector('[data-unit-price] [data-price]');
  var unitMeasurementEl = unitPriceContainer.querySelector('[data-unit-measurement]');
  unitQuantityEl.innerHTML = "".concat(variant.unit_price_measurement.quantity_value).concat(variant.unit_price_measurement.quantity_unit);
  unitPriceEl.innerHTML = formatter(variant.unit_price);

  if (variant.unit_price_measurement.reference_value === 1) {
    unitMeasurementEl.innerHTML = variant.unit_price_measurement.reference_unit;
  } else {
    unitMeasurementEl.innerHTML = "".concat(variant.unit_price_measurement.reference_value).concat(variant.unit_price_measurement.reference_unit);
  }

  return unitPriceContainer;
}

var PriceUI = /*#__PURE__*/function () {
  function PriceUI(el) {
    index_es_classCallCheck(this, PriceUI);

    this._el = el;
  }

  index_es_createClass(PriceUI, [{
    key: "load",
    value: function load(product, options) {
      var _variant$formatter$ha = index_es_objectSpread2({
        variant: false,
        formatter: function formatter(price) {
          return price;
        },
        handler: function handler(priceUIFragment) {
          return priceUIFragment;
        }
      }, options),
          variant = _variant$formatter$ha.variant,
          formatter = _variant$formatter$ha.formatter,
          handler = _variant$formatter$ha.handler;

      this._el.classList.add('price-ui--loading');

      var priceUIFragment = handler(!variant ? this._loadProduct(product, formatter) : this._loadVariant(variant, formatter), product, options);
      this._el.innerHTML = '';

      this._el.appendChild(priceUIFragment);

      this._el.classList.remove('price-ui--loading');
    }
  }, {
    key: "_loadVariant",
    value: function _loadVariant(variant, formatter) {
      var priceUIFragment = priceUITemplate.cloneNode(true);
      var compareAtPriceEl = priceUIFragment.querySelector('[data-compare-at-price]');
      var priceEl = priceUIFragment.querySelector('[data-price]');
      var unitPricingEl = priceUIFragment.querySelector('[data-unit-pricing]');
      var isOnSale = variant.compare_at_price && variant.compare_at_price !== variant.price;

      if (isOnSale) {
        priceEl.classList.add('price--sale');

        var _priceFragment = createPriceFragment(variant.compare_at_price, formatter);

        compareAtPriceEl.appendChild(_priceFragment);
      }

      var priceFragment = createPriceFragment(variant.price, formatter);
      priceEl.appendChild(priceFragment);

      if ('unit_price' in variant) {
        var unitPricingFragment = createUnitPricing(variant, formatter);
        unitPricingEl.appendChild(unitPricingFragment);
      }

      return priceUIFragment;
    }
  }, {
    key: "_loadProduct",
    value: function _loadProduct(product, formatter) {
      var priceMin = null;
      var priceMax = null;
      var compareAtPriceMin = null;
      var compareAtPriceMax = null;
      var priceVaries = false;
      var compareAtPriceVaries = false;
      var isOnSale = false;
      product.variants.forEach(function (variant) {
        // Use variant price as compare_at_price if compare_at_price is unavailable
        var tmpCompareAtPrice = variant.compare_at_price ? variant.compare_at_price : variant.price; // Determine price min

        if (priceMin === null || variant.price < priceMin) {
          priceMin = variant.price;
        } // Determine price max


        if (priceMax === null || variant.price > priceMax) {
          priceMax = variant.price;
        } // Determine compare_at_price min


        if (compareAtPriceMin === null || tmpCompareAtPrice < compareAtPriceMin) {
          compareAtPriceMin = tmpCompareAtPrice;
        } // Determine compare_at_price max


        if (compareAtPriceMax === null || tmpCompareAtPrice > compareAtPriceMax) {
          compareAtPriceMax = tmpCompareAtPrice;
        }

        if (tmpCompareAtPrice !== variant.price) {
          isOnSale = true;
        }
      });
      priceVaries = priceMin !== priceMax;
      compareAtPriceVaries = compareAtPriceMin !== compareAtPriceMax;
      var priceUIFragment = priceUITemplate.cloneNode(true);
      var compareAtPriceEl = priceUIFragment.querySelector('[data-compare-at-price]');
      var priceEl = priceUIFragment.querySelector('[data-price]');

      if (isOnSale) {
        priceEl.classList.add('price--sale');

        if (compareAtPriceVaries) {
          var priceRangeFragment = createPriceRangeFragment(compareAtPriceMin, compareAtPriceMax, formatter);
          compareAtPriceEl.appendChild(priceRangeFragment);
        } else {
          var priceFragment = createPriceFragment(compareAtPriceMin, formatter);
          compareAtPriceEl.appendChild(priceFragment);
        }
      }

      if (priceVaries) {
        var _priceRangeFragment = createPriceRangeFragment(priceMin, priceMax, formatter);

        priceEl.appendChild(_priceRangeFragment);
      } else {
        var _priceFragment2 = createPriceFragment(priceMin, formatter);

        priceEl.appendChild(_priceFragment2);
      }

      return priceUIFragment;
    }
  }]);

  return PriceUI;
}();

var priceUIBadgeTemplate = document.getElementById('price-ui-badge').content;
var badgePercentSavingsTemplate = document.getElementById('price-ui-badge__percent-savings').content;
var badgePercentSavingsRangeTemplate = document.getElementById('price-ui-badge__percent-savings-range').content;
var badgeSavingsTemplate = document.getElementById('price-ui-badge__price-savings').content;
var badgeSavingsRangeTemplate = document.getElementById('price-ui-badge__price-savings-range').content;
var badgeOnSaleTemplate = document.getElementById('price-ui-badge__on-sale').content;
var badgeSoldOutTemplate = document.getElementById('price-ui-badge__sold-out').content;
var badgeInStockTemplate = document.getElementById('price-ui-badge__in-stock').content;

function createBadgeRangeFragment(savings, percent, style, formatter) {
  var badgeRangeFragment = null;

  switch (style) {
    case 'percent':
      badgeRangeFragment = badgePercentSavingsRangeTemplate.cloneNode(true);
      badgeRangeFragment.querySelector('[data-price-percent]').innerHTML = percent;
      break;

    case 'money':
      badgeRangeFragment = badgeSavingsRangeTemplate.cloneNode(true);
      badgeRangeFragment.querySelector('[data-price]').innerHTML = formatter(savings);
      break;

    default:
      badgeRangeFragment = badgeOnSaleTemplate.cloneNode(true);
      break;
  }

  return badgeRangeFragment;
}

function createBadgeSingleFragment(savings, percent, style, formatter) {
  var badgeSingleFragment = null;

  switch (style) {
    case 'percent':
      badgeSingleFragment = badgePercentSavingsTemplate.cloneNode(true);
      badgeSingleFragment.querySelector('[data-price-percent]').innerHTML = percent;
      break;

    case 'money':
      badgeSingleFragment = badgeSavingsTemplate.cloneNode(true);
      badgeSingleFragment.querySelector('[data-price]').innerHTML = formatter(savings);
      break;

    default:
      badgeSingleFragment = badgeOnSaleTemplate.cloneNode(true);
      break;
  }

  return badgeSingleFragment;
}

var PriceUIBadge = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {
  function PriceUIBadge(el) {
    index_es_classCallCheck(this, PriceUIBadge);

    this._el = el;
  }

  index_es_createClass(PriceUIBadge, [{
    key: "load",
    value: function load(product, options) {
      var _variant$style$format = index_es_objectSpread2({
        variant: false,
        style: 'percent',
        formatter: function formatter(price) {
          return price;
        },
        handler: function handler(priceUIFragment) {
          return priceUIFragment;
        }
      }, options),
          variant = _variant$style$format.variant,
          style = _variant$style$format.style,
          formatter = _variant$style$format.formatter,
          handler = _variant$style$format.handler;

      this._el.classList.add('price-ui-badge--loading');

      var priceUIBadgeFragment = handler(!variant ? this._loadProduct(product, style, formatter) : this._loadVariant(variant, style, formatter), product, options);
      this._el.innerHTML = '';

      this._el.appendChild(priceUIBadgeFragment);

      this._el.classList.remove('price-ui-badge--loading');
    }
  }, {
    key: "_loadVariant",
    value: function _loadVariant(variant, style, formatter) {
      var priceUIBadgeFragment = priceUIBadgeTemplate.cloneNode(true);
      var badgeEl = priceUIBadgeFragment.querySelector('[data-badge]');
      var isOnSale = variant.compare_at_price && variant.compare_at_price !== variant.price;

      if (!isOnSale) {
        var badgeInStockFragment = badgeInStockTemplate.cloneNode(true);
        badgeEl.appendChild(badgeInStockFragment);
        return priceUIBadgeFragment; // Fast return if it's not on sale
      }

      if (!variant.available) {
        var badgeSoldOutFragment = badgeSoldOutTemplate.cloneNode(true);
        badgeEl.appendChild(badgeSoldOutFragment);
      } else {
        var savings = variant.compare_at_price - variant.price; // Round percent to two decimal places

        var percent = Math.round(savings / variant.compare_at_price * 100);
        var badgeSingleFragment = createBadgeSingleFragment(savings, percent, style, formatter);
        badgeEl.appendChild(badgeSingleFragment);
      }

      return priceUIBadgeFragment;
    }
  }, {
    key: "_loadProduct",
    value: function _loadProduct(product, style, formatter) {
      var isOnSale = false;
      var savingsVaries = false;
      var largestSavings = -1;
      var largestPercentSavings = 0;
      product.variants.forEach(function (variant) {
        var tmpCompareAtPrice = variant.compare_at_price;

        if (!variant.compare_at_price) {
          tmpCompareAtPrice = variant.price;
        }

        var tmpSavings = tmpCompareAtPrice - variant.price;

        if (largestSavings !== 0 && tmpSavings !== largestSavings) {
          savingsVaries = true;
        }

        if (tmpSavings > 0) {
          isOnSale = true;

          if (tmpSavings > largestSavings) {
            largestSavings = tmpSavings;
            largestPercentSavings = tmpSavings / tmpCompareAtPrice;
          }
        }
      }); // Converts from a number out of 1, to a number out of 100 rounded to two decimals

      largestPercentSavings = Math.round(largestPercentSavings * 100);
      var priceUIBadgeFragment = priceUIBadgeTemplate.cloneNode(true);
      var badgeEl = priceUIBadgeFragment.querySelector('[data-badge]');

      if (!isOnSale) {
        var badgeInStockFragment = badgeInStockTemplate.cloneNode(true);
        badgeEl.appendChild(badgeInStockFragment);
        return priceUIBadgeFragment; // Fast return if it's not on sale
      }

      if (savingsVaries) {
        var badgeRangeFragment = createBadgeRangeFragment(largestSavings, largestPercentSavings, style, formatter);
        badgeEl.appendChild(badgeRangeFragment);
      } else {
        var badgeSingleFragment = createBadgeSingleFragment(largestSavings, largestPercentSavings, style, formatter);
        badgeEl.appendChild(badgeSingleFragment);
      }

      return priceUIBadgeFragment;
    }
  }]);

  return PriceUIBadge;
}()));



;// CONCATENATED MODULE: ./node_modules/@pixelunion/shopify-asyncview/dist/index.es.js

  /*!
   * @pixelunion/shopify-asyncview v2.0.5
   * (c) 2020 Pixel Union
  */

function dist_index_es_classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function dist_index_es_defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function dist_index_es_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) dist_index_es_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) dist_index_es_defineProperties(Constructor, staticProps);
  return Constructor;
}

function dist_index_es_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function dist_index_es_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function dist_index_es_objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      dist_index_es_ownKeys(Object(source), true).forEach(function (key) {
        dist_index_es_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      dist_index_es_ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var deferred = {};

var AsyncView = /*#__PURE__*/function () {
  function AsyncView() {
    dist_index_es_classCallCheck(this, AsyncView);
  }

  dist_index_es_createClass(AsyncView, null, [{
    key: "load",

    /**
     * Load the template given by the provided URL into the provided
     * view
     *
     * @param {string} url - The url to load
     * @param {object} query - An object containing additional query parameters of the URL
     * @param {string} query.view - A required query parameter indicating which view to load
     * @param {object} [options] - Config options
     * @param {string} [options.hash] - A hash of the current page content
     */
    value: function load(url) {
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (!('view' in query)) {
        return Promise.reject(new Error('\'view\' not found in \'query\' parameter'));
      }

      var querylessUrl = url.replace(/\?[^#]+/, '');
      var queryParamsString = new RegExp(/.+\?([^#]+)/).exec(url);
      var queryParams = query;

      if (queryParamsString && queryParamsString.length >= 2) {
        queryParamsString[1].split('&').forEach(function (param) {
          var _param$split = param.split('='),
              _param$split2 = _slicedToArray(_param$split, 2),
              key = _param$split2[0],
              value = _param$split2[1];

          queryParams[key] = value;
        });
      } // NOTE: We're adding an additional timestamp to the query.
      // This is to prevent certain browsers from returning cached
      // versions of the url we are requesting.
      // See this PR for more info: https://github.com/pixelunion/shopify-asyncview/pull/4


      var cachebustingParams = dist_index_es_objectSpread2({}, queryParams, {
        _: new Date().getTime()
      });

      var hashUrl = querylessUrl.replace(/([^#]+)(.*)/, function (match, address, hash) {
        return "".concat(address, "?").concat(Object.keys(queryParams).sort().map(function (key) {
          return "".concat(key, "=").concat(encodeURIComponent(queryParams[key]));
        }).join('&')).concat(hash);
      });
      var requestUrl = querylessUrl.replace(/([^#]+)(.*)/, function (match, address, hash) {
        return "".concat(address, "?").concat(Object.keys(cachebustingParams).sort().map(function (key) {
          return "".concat(key, "=").concat(encodeURIComponent(cachebustingParams[key]));
        }).join('&')).concat(hash);
      });
      var promise = new Promise(function (resolve, reject) {
        var data;

        if (hashUrl in deferred) {
          resolve(deferred[hashUrl]);
          return;
        }

        deferred[hashUrl] = promise;

        if (options.hash) {
          data = sessionStorage.getItem(hashUrl);

          if (data) {
            var deserialized = JSON.parse(data);

            if (options.hash === deserialized.options.hash) {
              delete deferred[hashUrl];
              resolve(deserialized);
              return;
            }
          }
        }

        var xhr = new XMLHttpRequest();
        xhr.open('GET', requestUrl, true);

        xhr.onload = function () {
          var el = xhr.response;
          var newOptions = {};
          var optionsEl = el.querySelector('[data-options]');

          if (optionsEl && optionsEl.innerHTML) {
            newOptions = JSON.parse(el.querySelector('[data-options]').innerHTML);
          }

          var htmlEls = el.querySelectorAll('[data-html]');
          var newHtml = {};

          if (htmlEls.length === 1 && htmlEls[0].getAttribute('data-html') === '') {
            newHtml = htmlEls[0].innerHTML;
          } else {
            for (var i = 0; i < htmlEls.length; i++) {
              newHtml[htmlEls[i].getAttribute('data-html')] = htmlEls[i].innerHTML;
            }
          }

          var dataEls = el.querySelectorAll('[data-data]');
          var newData = {};

          if (dataEls.length === 1 && dataEls[0].getAttribute('data-data') === '') {
            newData = JSON.parse(dataEls[0].innerHTML);
          } else {
            for (var _i = 0; _i < dataEls.length; _i++) {
              newData[dataEls[_i].getAttribute('data-data')] = JSON.parse(dataEls[_i].innerHTML);
            }
          }

          if (options.hash) {
            try {
              sessionStorage.setItem(hashUrl, JSON.stringify({
                options: newOptions,
                data: newData,
                html: newHtml
              }));
            } catch (error) {
              console.error(error);
            }
          }

          delete deferred[hashUrl];
          resolve({
            data: newData,
            html: newHtml
          });
        };

        xhr.onerror = function () {
          delete deferred[hashUrl];
          reject();
        };

        xhr.responseType = 'document';
        xhr.send();
      });
      return promise;
    }
  }]);

  return AsyncView;
}();

/* harmony default export */ const dist_index_es = (AsyncView);

;// CONCATENATED MODULE: ./source/scripts/sections/jsProduct.js




class Product {
  static load(url) {
    return dist_index_es.load(
      url, // template name
      { view: 'quickshop' }, // view name (suffix)
    );
  }

  constructor($section) {
    // Add settings from schema to current object
    this._section = $section[0];
    this._data = window.PXUTheme.getSectionData($section);

    // Ensure product media libraries are present
    window.Shopify.loadFeatures([
      {
        name: 'shopify-xr',
        version: '1.0',
      },
      {
        name: 'model-viewer-ui',
        version: '1.0',
      },
    ], window.PXUTheme.productMedia.setupMedia);

    const priceUIEl = $section[0].querySelector('[data-price-ui]');
    const surfacePickUpEl = $section[0].querySelector('[data-surface-pick-up]');

    this.variantSelection = $section[0].querySelector('[data-variant-selection]');

    if (this.variantSelection) {
      this.variantSelection.addEventListener(
        'variant-change',
        event => this._switchVariant(
          event.detail.product,
          event.detail.variant,
          event.detail.state,
        ),
      );

      if (surfacePickUpEl) {
        this.surfacePickUp = new index_es(surfacePickUpEl);
        this.surfacePickUp.onModalRequest(contents => {
          Promise.all([
            this.variantSelection.getProduct(),
            this.variantSelection.getVariant(),
          ]).then(([product, variant]) => {
            const surfacePickUpModal = $section[0].querySelector('[data-surface-pick-up-modal]');
            const fragment = document.createDocumentFragment();
            const header = document.createElement('div');
            const title = document.createElement('span');
            const subtitle = document.createElement('span');

            header.classList.add('surface-pick-up__modal-header');
            title.classList.add('surface-pick-up__modal-title');
            subtitle.classList.add('surface-pick-up__modal-subtitle');

            title.innerHTML = product.title;
            subtitle.innerHTML = variant.title;

            header.appendChild(title);

            if (variant.title !== 'Default Title') {
              header.appendChild(subtitle);
            }

            fragment.appendChild(header);

            surfacePickUpModal.innerHTML = contents;
            surfacePickUpModal.insertBefore(fragment, surfacePickUpModal.firstChild);
            $.fancybox.open(
              surfacePickUpModal,
              {
                hash: false,
                infobar: false,
                toolbar: false,
                loop: true,
                smallBtn: true,
                buttons: [
                  // "zoom",
                  // "share",
                  // "slideShow",
                  // "fullScreen",
                  // "download",
                  // "thumbs",
                  // "close"
                ],
                touch: false,
                video: {
                  autoStart: false,
                },
                mobile: {
                  preventCaptionOverlap: false,
                  toolbar: true,
                },
                beforeShow: () => {
                  document.body.style.top = `-${window.scrollY}px`;
                  document.body.style.position = 'fixed';
                },
                beforeClose: () => {
                  const scrollY = document.body.style.top;
                  document.body.style.position = '';
                  document.body.style.top = '';
                  window.scrollTo(0, parseInt(scrollY || 0, 10) * -1);
                },
              },
            );
          });
        });
      }
    }

    if (priceUIEl) {
      this.priceUI = new PriceUI(priceUIEl);
    }

    const $productGallery = $section.find('.product-gallery__main');
    const $stickyElement = $section.find('.sticky-product-scroll');

    if ($productGallery) {
      this.enableSlideshow($productGallery);

      if (this._data.enable_zoom) {
        document.addEventListener('lazyloaded', this.enableZoom);
      }

      if (this._data.enable_product_lightbox) {
        this.enableLightbox($productGallery);
      }
    }

    if ($stickyElement && window.isScreenSizeLarge() && this._data.template === 'image-scroll') {
      this.enableStickyScroll($stickyElement, $productGallery);
    }

    if (window.location.search === '?contact_posted=true') {
      $('.notify_form .contact-form').hide();
      $('.notify_form .contact-form').prev('.message').html(window.PXUTheme.translation.notify_form_success);
    }

    if ($('.masonry--true').length > 0) {
      window.PXUTheme.applyMasonry('.thumbnail');
    }

    if (this.variantSelection) {
      Promise.all([
        this.variantSelection.getProduct(),
        this.variantSelection.getVariant(),
        this.variantSelection.getState(),
      ]).then(([product, variant, state]) => this._switchVariant(
        product,
        variant,
        state,
      ));
    }
  }

  enableStickyScroll($stickyElement, $productGallery) {
    let announcementHeight = 0;
    let headerHeight = 0;

    if (typeof window.PXUTheme.jsAnnouncementBar !== 'undefined' && window.PXUTheme.jsAnnouncementBar.enable_sticky) {
      announcementHeight = $('#announcement-bar').outerHeight();
    }

    if (window.PXUTheme.theme_settings.header_layout !== 'vertical') {
      if (window.PXUTheme.jsHeader.enable_sticky) {
        headerHeight = $('#header').outerHeight();
      }
    }

    const productImages = $productGallery.data('media-count');

    // enable if more than 1 image is present

    if (productImages > 1) {
      $stickyElement.stick_in_parent({
        offset_top: announcementHeight + headerHeight + 20,
      });
    }
  }

  enableLightbox($productGallery) {
    $productGallery.find('.product-gallery__link').fancybox({
      beforeClose: instance => {
        const $instanceGallery = instance.$trigger.first().parents('.product-gallery__main');
        $instanceGallery.hide();
        setTimeout(() => $instanceGallery.fadeIn(100), 500);
      },
      afterClose: () => {
        setTimeout(() => {
          $productGallery.find('.is-selected a').focus();
        }, 500);
      },
    });
  }

  enableZoom() {
    const $image = $(event.target);
    const zoomSrc = $image.data('zoom-src');
    if (zoomSrc) {
      $image.wrap('<span class="zoom-container"></span>')
        .css('display', 'block')
        .parent()
        .zoom({
          url: zoomSrc,
          touch: false,
          magnify: 1,
        });
    }
  }

  disableSlideshow($section, selector) {
    let $slider;
    if ($section) {
      $slider = $section.find('.flickity-enabled');
    } else {
      $slider = $(selector);
    }

    $slider.flickity('destroy');
  }

  enableSlideshow(selector, settings) {
    // Define variables
    const $productGallery = selector;
    const $thumbnailProductGallery = $productGallery.closest('.product-gallery').find('.product-gallery__thumbnails');

    const $slides = $productGallery.find('.product-gallery__image');
    const $thumbnails = $thumbnailProductGallery.find('.product-gallery__thumbnail');

    function autoplayVideo(videoID, $slide) {
      // Compare id to player object and only play that video
      $.each(window.videoPlayers, (_, player) => {
        if (player.id === videoID) {
          player.play();

          // On fullscreen toggle, focus back on the slide itself
          player.on('exitfullscreen', () => $slide.closest('.product-gallery').find('.product-gallery__thumbnails').focus());
        }
      });
    }

    function autoplayYoutubeVideo(iframeID, $slide) {
      // compare id to player object and only play that video
      $.each(window.videoPlayers, (_, player) => {
        if (player.playing) {
          player.pause();
        }

        if (player.media.id === iframeID) {
          player.play();

          // On fullscreen toggle, focus back on the slide itself
          player.on('exitfullscreen', () => $slide.closest('.product-gallery').find('.product-gallery__thumbnails').focus());
        }
      });
    }

    function checkForVideos() {
      $slides.each((index, slide) => {
        // Variables
        const $slide = $(slide);
        const mediaType = $slide.data('media-type') || $slide.find('[data-media-type]').data('media-type');
        let videoID = $slide.find('video').data('plyr-video-id');
        const $iframeVideo = $slide.find('iframe');
        const iframeID = $iframeVideo.attr('id');
        if ($slide.hasClass('is-selected')) {
          if (mediaType === 'video') {
            videoID = $slide.find('video').data('plyr-video-id');
            if (videoID) {
              autoplayVideo(videoID, $slide);
            }
          } else if (mediaType === 'external_video' && iframeID) {
            autoplayYoutubeVideo(iframeID, $slide);
          }
        }
      });
    }

    // Adds 'product-gallery__image' class if not present
    $productGallery.find('.gallery-cell:not(.product-gallery__image)').addClass('product-gallery__image');

    // Adds 'product-gallery__thumbnail' class if not present
    $thumbnailProductGallery.find('.gallery-cell:not(.product-gallery__thumbnail)').addClass('product-gallery__thumbnail');

    // If custom settings available, use them otherwise take settings from product templates
    const {
      thumbnails_enabled: thumbnailsEnabled,
      enable_thumbnail_slider: thumbnailsSliderEnabled,
      thumbnail_position: thumbnailsPosition,
      gallery_arrows: arrowsEnabled,
      slideshow_speed: slideshowSpeed,
      slideshow_transition: slideshowTransition,
    } = settings || this._data;

    $productGallery.on('ready.flickity', () => {
      $slides.each((index, slide) => {
        // Determine media type
        const mediaType = $(slide).data('media-type') || $(slide).find('[data-media-type]').data('media-type');
        let videoID;
        const videoLooping = $('[data-video-loop]').data('video-loop');
        const { videoPlayers } = window;

        switch (mediaType) {
          case 'external_video':
            videoID = $(slide).find('[data-plyr-video-id]').data('plyr-video-id');
            if (videoPlayers) {
              for (let i = 0; i < videoPlayers.length; i++) {
                if (videoPlayers[i].id === videoID || videoPlayers[i].media.id === videoID) {
                  videoPlayers[i].loop = videoLooping;

                  if (!$(slide).hasClass('is-selected')) {
                    videoPlayers[i].keyboard = {
                      focused: false,
                      global: false,
                    };
                  }
                }
              }
            }

            break;
          case 'video':
            videoID = $(slide).find('[data-plyr-video-id]').data('plyr-video-id');
            if (videoPlayers) {
              for (let i = 0; i < videoPlayers.length; i++) {
                if (videoPlayers[i].id === videoID || videoPlayers[i].media.id === videoID) {
                  videoPlayers[i].loop = videoLooping;

                  if (!$(slide).hasClass('is-selected')) {
                    videoPlayers[i].keyboard = {
                      focused: true,
                      global: false,
                    };
                  }
                }
              }
            }

            break;
          case 'model':
            if ($(slide).hasClass('is-selected')) { // When active slide
              if (mediaType === 'model' && window.isScreenSizeLarge()) {
                $(slide).on('mouseenter', () => $productGallery.flickity('unbindDrag'));
                $(slide).on('mouseleave', () => $productGallery.flickity('bindDrag'));
              }
            }
            break;
          default:
            break;
        }

        // Detect keyboard 'ENTER' key on slides
        $(slide).keypress(event => {
          if (event.which === 13) {
            // Bring focus to media inside selected slide
            $(slide).find('model-viewer, .product-gallery__link, .plyr').focus();
            // Run video autoplay logic if featured media is a video
            if (mediaType === 'video' || mediaType === 'external_video') {
              checkForVideos();
            }
            // Autoplay model if featured media is a model
            if (mediaType === 'model') {
              // If model container has class is-selected then play the model
              // autoplayModel(); This method does not exist
            }
          }
        });
      });
    });

    $productGallery.flickity({
      wrapAround: true,
      adaptiveHeight: true,
      dragThreshold: 10,
      imagesLoaded: true,
      pageDots: false,
      prevNextButtons: $productGallery.data('media-count') > 1 || $slides.length > 1,
      autoPlay: slideshowSpeed * 1000,
      fade: slideshowTransition === 'fade',
      watchCSS: this._data.template === 'image-scroll' && !$productGallery.hasClass('js-gallery-modal'), // Disables Flickity for main product gallery on image-scroll template
      arrowShape: window.arrowShape,
    });

    $productGallery.on('change.flickity', () => {
      $slides.each((index, slide) => {
        // Determine media type of current slide
        const mediaType = $(slide).data('media-type') || $(slide).find('[data-media-type]').data('media-type');

        if ($(slide).hasClass('is-selected')) { // When active slide
          switch (mediaType) {
            case 'model':
              /* On slide change, if active slide contains 3d model
              * If on desktop, on hover, unbind flickity, after hover bind flickity
              * On model play event, unbind flickity to ensure model can be interacted with
              * On model pause event, bind flickity so that slide can be swiped
              * Pause all model slides when hidden
              */

              if (window.isScreenSizeLarge()) {
                // On mouseenter event, unbind flickity
                $(slide).on('mouseenter', () => $productGallery.flickity('unbindDrag'));

                // On mouseleave event, bind flickity
                $(slide).on('mouseleave', () => $productGallery.flickity('bindDrag'));
              }

              // Listen for model pause/play events
              $(slide).find('model-viewer').on('shopify_model_viewer_ui_toggle_play', () => $productGallery.flickity('unbindDrag'));
              $(slide).find('model-viewer').on('shopify_model_viewer_ui_toggle_pause', () => $productGallery.flickity('bindDrag'));

              break;
            default:
              $productGallery.flickity('bindDrag');
          }
        } else {
          // When inactive slide
          switch (mediaType) {
            case 'external_video':
              // Youtube video pausing
              $.each(window.videoPlayers, (_, player) => player.pause());

              break;
            case 'video':
              // HTML5 video pausing
              $.each(window.videoPlayers, (_, player) => player.pause());

              break;
            case 'model':
              $.each(window.PXUTheme.productMedia.models, (_, model) => model.pause());
              break;
            default:
              break;
          }
        }
      });

      // Restore 3d model icons
      window.PXUTheme.productMedia.showModelIcon($productGallery);
    });

    // Checks for videos and plays them if they are the featured media
    // Autoplay logic only happens on desktop, autoplay set to off for mobile
    const $sliderArrows = $productGallery.find('.flickity-prev-next-button');

    if (($sliderArrows || $thumbnails) && window.isScreenSizeLarge()) {
      $sliderArrows.on('click', () => {
        $productGallery.on('settle.flickity', () => {
          // Find out media type of featured media slide
          const $selectedSlide = $productGallery.find('.product-gallery__image.is-selected');
          const mediaType = $selectedSlide.data('media-type') || $selectedSlide.find('[data-media-type]').data('media-type');
          const pId = ($productGallery).data('product-id');

          // Run video autoplay logic if featured media is a video
          if (mediaType === 'video' || mediaType === 'external_video') {
            checkForVideos();
          }

          // Autoplay model if featured media is a model
          if (mediaType === 'model') {
            // Sort models to get those in selected slide
            const sortedModels = [];

            $.each(window.PXUTheme.productMedia.models, (index, model) => {
              if ($(model.container).closest('.product-gallery__image').data('product-id') === pId) {
                sortedModels.push(model);
              }
            });

            // If model container has class is-selected then play the model
            $.each(sortedModels, (index, model) => {
              const $slide = $(model.container).parents('.product-gallery__image');
              if ($slide.hasClass('is-selected')) {
                model.play();
              }
            });
          }

          $productGallery.off('settle.flickity');
        });

        return false;
      });

      $thumbnails.on('click', event => {
        const index = $(event.currentTarget).index();
        $productGallery.flickity('select', index);

        $productGallery.on('settle.flickity', () => {
          // Find out media type of featured media slide
          const $selectedSlide = $productGallery.find('.product-gallery__image.is-selected');
          const mediaType = $selectedSlide.data('media-type') || $selectedSlide.find('[data-media-type]').data('media-type');
          const pId = ($productGallery).data('product-id');

          // Run video autoplay logic if featured media is a video
          if (mediaType === 'video' || mediaType === 'external_video') {
            checkForVideos();
          }

          // Autoplay model if featured media is a model
          if (mediaType === 'model') {
            // Sort models to get those in selected slide
            const sortedModels = [];
            $.each(window.PXUTheme.productMedia.models, (_, model) => {
              if ($(model.container).closest('.product-gallery__image').data('product-id') === pId) {
                sortedModels.push(model);
              }
            });

            // If model container has class is-selected then play the model
            $.each(sortedModels, (_, model) => {
              const $slide = $(model.container).parents('.product-gallery__image');
              if ($slide.hasClass('is-selected')) {
                model.play();
              }
            });
          }

          $productGallery.off('settle.flickity');
        });

        return false;
      });

      $thumbnails.keypress(event => {
        const index = $(event.currentTarget).index();
        if (event.which === 13) {
          $productGallery.flickity('select', index);

          const $selectedSlide = $productGallery.find('.product-gallery__image.is-selected');
          const pId = ($productGallery).data('product-id');

          $productGallery.on('settle.flickity', () => {
            $selectedSlide.find('model-viewer, .plyr, a').focus();
            $selectedSlide.find('[data-youtube-video]').attr('tabindex', '0');
            $productGallery.off('settle.flickity');
          });

          // Find out media type of featured media slide
          const mediaType = $selectedSlide.data('media-type');

          // Run video autoplay logic if featured media is a video
          if (mediaType === 'video' || mediaType === 'external_video') {
            checkForVideos();
          }

          // Autoplay model if featured media is a model
          if (mediaType === 'model') {
            // Sort models to get those in selected slide
            const sortedModels = [];
            $.each(window.PXUTheme.productMedia.models, (_, model) => {
              if ($(model.container).closest('.product-gallery__image').data('product-id') === pId) {
                sortedModels.push(model);
              }
            });

            // If model container has class is-selected then play the model
            $.each(sortedModels, (_, model) => {
              const $slide = $(model.container).parents('.product-gallery__image');
              if ($slide.hasClass('is-selected')) {
                model.play();
              }
            });
          }
        }
      });
    } else if (thumbnailsEnabled) {
      // If thumbnail slider is disabled, ensure thumbnails can still navigate product images
      $thumbnailProductGallery.find('.product-gallery__thumbnail').on('click', event => {
        const $currentTarget = $(event.currentTarget);
        const index = $currentTarget.index();
        $productGallery.flickity('selectCell', index);
      });
    }

    // Resize flickity when the slider is settled
    $productGallery.on('settle.flickity', () => $productGallery.flickity('resize'));

    $(window).on('load', () => $productGallery.flickity('resize'));

    let resizeTimer;

    $(window).on('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => $productGallery.flickity('resize'), 250);
    });

    if (thumbnailsEnabled === true && thumbnailsSliderEnabled === true && $slides.length > 1) {
      // If desktop determine which slider we build
      if (window.isScreenSizeLarge()) {
        if (thumbnailsPosition === 'right-thumbnails' || thumbnailsPosition === 'left-thumbnails') {
          $thumbnailProductGallery.addClass('vertical-slider-enabled');

          const navCellHeight = $thumbnails.height();
          const navHeight = $thumbnailProductGallery.height();

          // Resize thumbnail gallery

          $(window).on('load', () => {
            const $productGalleryHeight = $productGallery.height();
            $thumbnailProductGallery.css('max-height', $productGalleryHeight);
          });

          $(window).on('resize', () => {
            $productGallery.flickity('resize');
            const $productGalleryHeight = $productGallery.height();
            $thumbnailProductGallery.css('max-height', $productGalleryHeight);
          });

          $productGallery.on('change.flickity', () => {
            $productGallery.flickity('resize');
            const $productGalleryHeight = $productGallery.height();
            $thumbnailProductGallery.css('max-height', $productGalleryHeight);
          });

          $productGallery.on('select.flickity', () => {
            // set selected nav cell
            const flkty = $productGallery.data('flickity');
            if (flkty) {
              $thumbnailProductGallery.find('.is-nav-selected').removeClass('is-nav-selected');
              const $selected = $thumbnails.eq(flkty.selectedIndex).addClass('is-nav-selected');

              // scroll nav
              const scrollY = (
                $selected.position().top
                + $thumbnailProductGallery.scrollTop()
                - (navHeight + navCellHeight)
                / 2
              );
              $thumbnailProductGallery.animate({
                scrollTop: scrollY,
              });
            }
          });
        } else {
          $thumbnailProductGallery.flickity({
            cellAlign: 'center',
            contain: true,
            groupCells: '80%',
            imagesLoaded: true,
            pageDots: false,
            prevNextButtons: $thumbnails.length > 5 ? arrowsEnabled : false,
            asNavFor: this._data.template === 'image-scroll' && window.isScreenSizeLarge() ? '' : $productGallery[0],
            arrowShape: window.arrowShape,
          });

          // Resize flickity when the slider is settled
          $thumbnailProductGallery.on('settle.flickity', () => $thumbnailProductGallery.flickity('resize'));
          $(window).on('load', () => $thumbnailProductGallery.flickity('resize'));
        }
      } else {
        // Otherwise create standard thumbnail slider
        $thumbnailProductGallery.flickity({
          cellAlign: 'center',
          contain: true,
          groupCells: '80%',
          imagesLoaded: true,
          pageDots: false,
          prevNextButtons: $thumbnails.length > 5,
          asNavFor: this._data.template === 'image-scroll' && window.isScreenSizeLarge() ? '' : $productGallery[0],
          arrowShape: window.arrowShape,
        });
      }
    }
  }

  findSelectedVariantImage() {
    function getIndex($selector, variantID) {
      const $parentForm = $selector.parents('.product_form');
      const $option = $parentForm.find(`select option[value=${variantID}]`);
      const imageID = $option.attr('data-image-id');
      if (!imageID) {
        // If there is no image, no scrolling occurs
        return false;
      }

      const index = $(`[data-image-id=${imageID}]`).data('index');
      if (this._data.template === 'image-scroll') {
        this.scrollSelectedImage(index);
        return true;
      }

      return false;
    }

    $('[data-variant-selector]').on('selectedVariantChanged', event => {
      const $currentTarget = $(event.currentTarget);
      if (!$currentTarget.attr('disabled')) {
        getIndex($currentTarget, $currentTarget.val());
      }
    });
  }

  scrollSelectedImage(variant) {
    let headerHeight = 0;
    let announceHeight = 0;

    // Get header height is sticky enabled
    if (window.PXUTheme.jsHeader.enable_sticky === true && window.PXUTheme.theme_settings.header_layout !== 'vertical') {
      headerHeight = window.PXUTheme.jsHeader.getHeaderHeight();
    }

    // Get announcement height is sticky enabled
    if (
      typeof window.PXUTheme.jsAnnouncementBar !== 'undefined'
      && window.PXUTheme.jsAnnouncementBar.enable_sticky === true
      && window.PXUTheme.theme_settings.header_layout !== 'vertical'
    ) {
      announceHeight = window.PXUTheme.jsAnnouncementBar.getAnnouncementHeight();
    }

    // Add values
    const totalHeight = headerHeight + announceHeight;

    window.PXUTheme.scrollToTop($(`[data-index="${variant}"]`), totalHeight);
  }

  unload($section) {
    $('.selector-wrapper select', $section).unwrap();
    this.disableSlideshow($section);
    $('[data-variant-selector]').off();
    document.removeEventListener('lazyloaded', this.enableZoom);
  }

  _switchVariant(product, variant, state) {
    window.selectCallback(
      this._section.querySelector(`.product-${product.id}`),
      product,
      variant,
      state,
    );

    if (this.priceUI) {
      const formatter = price => (
        price === 0
          ? window.PXUTheme.translation.free_price_text
          : Shopify.formatMoney(price, $('body').data('money-format'))
      );

      this.priceUI.load(
        product,
        {
          variant,
          formatter,
          handler: (priceUIFragment, p, { variant: v }) => {
            if (state === 'unavailable') {
              return document.createDocumentFragment();
            }

            if (v && v.available) {
              const shopPayInstallmentsTemplate = this._section.querySelector('[data-shop-pay-installments-template] shopify-payment-terms');
              let shopPayInstallEl = null;

              if (shopPayInstallmentsTemplate) {
                shopPayInstallEl = shopPayInstallmentsTemplate.cloneNode(true);
                shopPayInstallEl.setAttribute('variant-id', variant.id);
              }

              if (this._data.display_savings && v.compare_at_price > v.price) {
                const span = document.createElement('span');

                span.classList.add('sale', 'savings');
                span.innerHTML = `${window.PXUTheme.translation.product_savings} ${parseInt(((v.compare_at_price - v.price) * 100) / v.compare_at_price, 10)}% (<span class="money">${formatter(v.compare_at_price - v.price)}</span>)`;
                priceUIFragment.appendChild(span);
              }

              if (shopPayInstallEl) {
                priceUIFragment.appendChild(shopPayInstallEl);
              }
            }

            // Convert all elements if currency converter is enabled
            if (window.PXUTheme.currencyConverter) {
              const moneyEls = priceUIFragment.querySelectorAll('.money');

              for (let i = 0; i < moneyEls.length; i++) {
                window.PXUTheme.currencyConverter.update(moneyEls[i]);
              }
            }

            return priceUIFragment;
          },
        },
      );
    }

    if (this.surfacePickUp) {
      this.surfacePickUp.load(variant ? variant.id : null);
    }
  }
}

window.PXUTheme.jsProductClass = Product;
window.PXUTheme.jsProduct = {
  init($section) {
    return new Product($section);
  },
  relatedProducts() {
    $('.js-related-products-slider .products-slider').each((_, slider) => {

      const $relatedSlider = $(slider);

      const slideData = {
        products_per_slide: $relatedSlider.data('products-per-slide'),
        products_available: $relatedSlider.data('products-available'),
        products_limit: $relatedSlider.data('products-limit'),
        initialIndex: 0,
        cellAlign: 'left',
        wrapAround: true,
      };

      if (
        slideData.products_available > slideData.products_per_slide
        && slideData.products_limit > slideData.products_per_slide
      ) {
        slideData.wrapAround = true;
      } else {
        slideData.wrapAround = false;
      }

      if (
        slideData.products_available < slideData.products_per_slide
        || slideData.products_limit < slideData.products_per_slide
      ) {
        $relatedSlider.addClass('container is-justify-center');
        $relatedSlider.find('.gallery-cell').addClass('column');
      } else {
        $relatedSlider.flickity({
          lazyLoad: 2,
          freeScroll: true,
          imagesLoaded: true,
          draggable: true,
          cellAlign: 'center',
          wrapAround: slideData.wrapAround,
          pageDots: false,
          contain: true,
          prevNextButtons: slideData.products_limit > slideData.products_per_slide,
          initialIndex: slideData.initialIndex,
          arrowShape: window.arrowShape,
        });

        // Resize flickity when the slider is settled
        $relatedSlider.on('settle.flickity', () => $relatedSlider.flickity('resize'));

        $(window).on('load', () => $relatedSlider.flickity('resize'));
      }
    });
  },
};

/******/ })()
;