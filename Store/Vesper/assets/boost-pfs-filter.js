if (typeof boostPFSThemeConfig !== 'undefined') {
	// Override Settings
  var boostPFSFilterConfig = {
    general: {
      limit: boostPFSConfig.custom.products_per_page,
      /* Optional */
      loadProductFirst: true,
      // paginationType: boostPFSConfig.custom.pagination_type.indexOf("load_more") != -1 ? "load_more" :
      // 				(boostPFSConfig.custom.pagination_type == 'infinite_scroll' ? 'infinite' : 'default'),
      separateRefineByFromFilter: window.innerWidth > 767 && boostPFSConfig.general.collection_handle !== '', // Place <div class='boost-pfs-filter-refine-by-wrapper-v/h'><div> in the DOM to render refine-by.
    },
    selector: {
      trackingQuickView: '.quick_shop'
    }
  };
}

(function () {
  BoostPFS.inject(this);

  // Build Product Grid Item
  ProductGridItem.prototype.compileTemplate = function (data, index, totalProduct) {
    if (!data) data = this.data;
    if (!index) index = this.index;
    if (!totalProduct) totalProduct = this.totalProduct;

    // Get Template
    var itemHtml = boostPFSTemplate.productGridItemHtml;

    // Add class
    var itemDesktopWidthClass = 'one-third';
    switch (boostPFSConfig.custom.products_per_row) {
      case 1: itemDesktopWidthClass = 'one-whole'; break;
      case 2: itemDesktopWidthClass = 'one-half'; break;
      case 3: itemDesktopWidthClass = 'one-third'; break;
      case 4: itemDesktopWidthClass = 'one-fourth'; break;
      case 5: itemDesktopWidthClass = 'one-fifth'; break;
      case 6: itemDesktopWidthClass = 'one-sixth'; break;
      case 7: itemDesktopWidthClass = 'one-seventh'; break;
      case 8: itemDesktopWidthClass = 'one-eighth'; break;
    }
    itemHtml = itemHtml.replace(/{{itemDesktopWidthClass}}/g, itemDesktopWidthClass);
    itemHtml = itemHtml.replace(/{{itemMobileWidthClass}}/g, boostPFSConfig.custom.mobile_products_per_row == 1 ? 'small-down--one-whole' : 'small-down--one-half');
    itemHtml = itemHtml.replace(/{{itemQuickShopClass}}/g, boostPFSConfig.custom.enable_quickshop ? 'quick-shop--true quick-shop--closed product-{{itemId}} js-product_section' : '');
    itemHtml = itemHtml.replace(/{{itemStickersClass}}/g, boostPFSConfig.custom.stickers_enabled ? 'has-thumbnail-sticker' : '');
    itemHtml = itemHtml.replace(/{{itemHoverClass}}/g, boostPFSConfig.custom.thumbnail_hover_enabled?.toString());
    itemHtml = itemHtml.replace(/{{itemSwapImageClass}}/g, boostPFSConfig.custom.show_secondary_image && data.images_info.length > 1 ? 'swap--true' : '');
    itemHtml = itemHtml.replace(/{{itemHoverImage}}/g, boostPFSConfig.custom.show_secondary_image && data.images_info.length > 1 ? 'has-secondary-image-swap' : '');
    itemHtml = itemHtml.replace(/{{itemTextAlignClass}}/g, boostPFSConfig.custom.thumbnail_text_alignment);

    // Add stickers
    var itemStickers = buildStickers(data);
    itemHtml = itemHtml.replace(/{{itemStickers}}/g, itemStickers);

    // Add images
    var itemImages = buildImages(data);
    itemHtml = itemHtml.replace(/{{itemImages}}/g, itemImages);

    // Add hover elements
    var itemHover = buildHover(data);
    itemHtml = itemHtml.replace(/{{itemHover}}/g, itemHover);

    // Add product info
    itemHtml = itemHtml.replace(/{{itemProductInfo}}/g, boostPFSTemplate.itemProductInfoHtml);

    // Add vendor
    var itemVendor = boostPFSConfig.custom.display_vendor ? '<span class="product-thumbnail__vendor">{{itemVendor}}</span>' : '';
    itemHtml = itemHtml.replace(/{{itemVendor}}/g, itemVendor);

    var collectionHandles = data.collections.map(x => x.handle);
    var isComingSoon = collectionHandles.indexOf('coming-soon') != -1;
    // Add coming soon
    if (isComingSoon) {
      itemHtml = itemHtml.replace(/{{itemComingSoon}}/g, '<span>' + boostPFSConfig.label.coming_soon + '</span>');
      itemHtml = itemHtml.replace(/{{itemPrice}}/g, '');

      // Add price
    } else {
      itemHtml = itemHtml.replace(/{{itemComingSoon}}/g, '');
      itemHtml = itemHtml.replace(/{{itemPrice}}/g, buildPrice(data));
    }

    // Add swatch
    var itemSwatch = buildSwatch(data);
    itemHtml = itemHtml.replace(/{{itemSwatch}}/g, itemSwatch);

    // Add Reviews
    if (typeof Integration === 'undefined' || !Integration.hascompileTemplate('reviews')) {
      var itemReviews = boostPFSConfig.custom.enable_shopify_collection_badges && boostPFSConfig.custom.enable_shopify_review_comments ? '<span class="shopify-product-reviews-badge" data-id="{{itemId}}"></span>' : '';
      if (boostPFSConfig.custom.thumbnail_hover_enabled) {
        itemHtml = itemHtml.replace(/{{itemReviewsHover}}/g, itemReviews);
        itemHtml = itemHtml.replace(/{{itemReviews}}/g, '');
      } else {
        if (itemReviews != '') {
          itemReviews = '<div class="product-thumbnail__review-stars is-flex is-justify-' + boostPFSConfig.custom.thumbnail_text_alignment + '">' +
            '<span class="shopify-product-reviews-badge" data-id="{{itemId}}"></span>' +
            '</div>';
        }
        itemHtml = itemHtml.replace(/{{itemReviewsHover}}/g, '');
        itemHtml = itemHtml.replace(/{{itemReviews}}/g, itemReviews);
      }
    }

    // Add quick shop button placeholder
    var itemQuickShop = boostPFSConfig.custom.enable_quickshop ? '<div data-boost-pfs-quickshop-id="{{itemId}}" style="display: none"></div>' : '';
    itemHtml = itemHtml.replace(/{{itemQuickShop}}/g, itemQuickShop);

    // Add main attribute (Always put at the end of this function)
    itemHtml = itemHtml.replace(/{{itemId}}/g, data.id);
    itemHtml = itemHtml.replace(/{{itemTitle}}/g, data.title);
    itemHtml = itemHtml.replace(/{{itemHandle}}/g, data.handle);
    itemHtml = itemHtml.replace(/{{itemVendor}}/g, data.vendor);
    itemHtml = itemHtml.replace(/{{itemUrl}}/g, Utils.buildProductItemUrlWithVariant(data));
    return itemHtml;
  };

  function buildStickers(data) {
    var html = '';
    var stickers = [];
    if (boostPFSConfig.custom.stickers_enabled) {
      var collections = data.collections.map(x => x.handle);
      var stickerCollections = ['best-seller', 'coming-soon', 'new', 'pre-order', 'staff-pick'];
      for (var i = 0; i < stickerCollections.length; i++) {
        var stickerCollection = stickerCollections[i];
        if (collections.indexOf(stickerCollection) != -1) {
          var stickerText = boostPFSConfig.label[stickerCollection.replace('-', '_')];
          var sticker = '<div class="' + stickerCollection + '-sticker thumbnail-sticker sticker-' + i + '"><span class="sticker-text">' + stickerText + '</span></div>';
          stickers.push(sticker);
        }
      }

      var onSale = data.available && data.price_min < data.compare_at_price_max;
      var soldOut = !data.available;

      if (onSale) {
        var sticker = '<div class="sale-sticker thumbnail-sticker"><span class="sticker-text">' + boostPFSConfig.label.sale + '</span></div>';
        stickers.push(sticker);
      } else if (soldOut) {
        var sticker = '<div class="sale-sticker thumbnail-sticker"><span class="sticker-text">' + boostPFSConfig.label.sold_out + '</span></div>';
        stickers.push(sticker);
      }

      if (stickers.length > 0) {
        html = '<div class="sticker-holder sticker-shape-' + boostPFSConfig.custom.sticker_shape + ' sticker-position-' + boostPFSConfig.custom.sticker_position + '">' +
          '<div class="sticker-holder__content sticker-holder__content--">' +
          stickers.join('') +
          '</div>' +
          '</div>';
      }
    }
    return html;
  }

  function buildImages(data) {
    var html = '';
    var images = data.images_info;
    if (!images || images.length == 0) {
      images.push({
        src: boostPFSAppConfig.general.no_image_url,
        width: 480,
        height: 480
      })
    }

    html += buildImageElement(images[0]);

    if (boostPFSConfig.custom.show_secondary_image && images.length > 1) {
      html += buildImageElement(images[1], 'lazypreload secondary swap--visible');
    }

    return html;
  }

  function buildImageElement(image, additionalClass) {
    var additionalClass = (typeof additionalClass !== 'undefined') ? additionalClass : '';
    var html = '';
    var heightStyle = '';
    var widthStyle = '';
    var aspectRatio = image.width / image.height;
    if (boostPFSConfig.custom.align_height) {
      heightStyle += 'max-height: ' + boostPFSConfig.custom.collection_height + 'px;';
      widthStyle += 'width: calc(' + image.width + ' / ' + image.height + ' * ' + boostPFSConfig.custom.collection_height + 'px)';
      // widthStyle += 'width: '+ (aspectRatio * boostPFSConfig.custom.collection_height) +'px; max-width: '+ image.width +'px;';
    }

    var backgroundColor = boostPFSConfig.custom.image_loading_style == 'color' ? 'background: url(' + Utils.optimizeImage(image.src, '1x') + '); ' : '';
    var lowQualityImage = boostPFSConfig.custom.image_loading_style == 'blur-up' ? Utils.optimizeImage(image.src, '50x') : '';

    html += '<div class="image-element__wrap" style="' + backgroundColor + heightStyle + widthStyle + '">' +
      '<img alt="{{itemTitle}}"' +
      ' class="lazyload transition--' + boostPFSConfig.custom.image_loading_style + ' ' + additionalClass + '"' +
      (lowQualityImage && lowQualityImage !== '' ?
        ' src="' + lowQualityImage + '"' : '') +
      ' data-src="' + Utils.optimizeImage(image.src, '1600x') + '"' +
      ' data-sizes="auto"' +
      ' data-aspectratio="' + aspectRatio + '"' +
      ' data-srcset="' + bgset(image) + '"' +
      ' srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="' +
      ' height="' + image.height + '"' +
      ' width="' + image.width + '"' +
      ' style="' + heightStyle + '"' +
      '/>' +
      '</div>';
    return html;
  }

  function buildHover(data) {
    var html = '';
    if (boostPFSConfig.custom.enable_quickshop || boostPFSConfig.custom.thumbnail_hover_enabled) {
      html = boostPFSTemplate.itemHoverHtml;
      if (boostPFSConfig.custom.thumbnail_hover_enabled) {
        var itemProductInfoHover = '<div class="quick-shop__info animated fadeInDown">' +
          '<div class="thumbnail-overlay">' +
          '<div class="info text-align-center">' +
          '{{itemProductInfo}}' +
          '</div>' +
          '</div>' +
          '</div>';
        html = html.replace(/{{itemProductInfoHover}}/g, itemProductInfoHover);
      } else {
        html = html.replace(/{{itemProductInfoHover}}/g, '');
        html = html.replace(/{{itemReviews}}/g, '');
      }
      if (!boostPFSConfig.custom.enable_quickshop) {
        html = html.replace(/{{itemQuickShop}}/g, '');
      }
    }
    return html;
  }

  function buildPrice(data) {
    var html = '';
    var onSale = data.compare_at_price_max > data.price_min;
    var soldOut = !data.available;
    var priceVaries = data.price_max != data.price_min;
    html += '<span class="product-thumbnail__price price ' + (onSale ? 'sale' : '') + '"> ';
    if (data.price_min > 0) {
      if (priceVaries) {
        html += '<small><em>' + boostPFSConfig.label.from + '</em></small> ';
      }
      html += '<span class="money">' + Utils.formatMoney(data.price_min, 'money_with_currency') + '</span> ';
    } else {
      html += boostPFSConfig.custom.free_price_text;
    }
    if (onSale) {
      html += '<span class="product-thumbnail__was-price compare-at-price">' +
        '<span class="money">' + Utils.formatMoney(data.compare_at_price_max, 'money_with_currency') + '</span>' +
        '</span>';
    }

    return html;
  }

  function buildSwatch(data) {
    var html = '';
    var values = [];
    var swatchItems = [];
    if (boostPFSConfig.custom.collection_swatches) {
      data.variants.forEach(function (variant) {
        var colorValue = '';
        var optionValue = '';
        variant.merged_options.forEach(function (option) {
          var key = option.split(':')[0];
          var value = option.split(':')[1];
          if ((key.toLowerCase().indexOf('color') != -1 || key.toLowerCase().indexOf('colour') != -1) && values.indexOf(value.toLowerCase()) == -1) {
            values.push(value.toLowerCase());
            colorValue = value;
            optionValue = key;
          }
        });
        if (colorValue) {
          var swatchItem = '<a href="{{variantUrl}}" class="swatch swatch__style--{{swatchShape}}" data-swatch-name="meta-{{slugifyOptionValue}}_{{slugifyColorValue}}">' +
            '<span data-image="{{variantImage}}" style="background-color: {{colorBackground}}; background-image: url({{variantImage}});">' +
            '<img class="swatch__image" src="{{colorImage}}" onerror="this.className += \' swatch__image--empty\'">' +
            '</span>' +
            '</a>';

          swatchItem = swatchItem.replace(/{{swatchShape}}/g, boostPFSConfig.custom.collection_swatches_shape);
          swatchItem = swatchItem.replace(/{{colorBackground}}/g, Utils.slugify(colorValue).split('-').pop());
          swatchItem = swatchItem.replace(/{{slugifyOptionValue}}/g, Utils.slugify(optionValue).replace('-', '_'));
          swatchItem = swatchItem.replace(/{{slugifyColorValue}}/g, Utils.slugify(colorValue).replace('-', '_'));
          swatchItem = swatchItem.replace(/{{variantUrl}}/g, Utils.buildProductItemUrl(data) + '?variant=' + variant.id);

          var colorImage = boostPFSAppConfig.general.file_url.split('?')[0] + Utils.slugify(colorValue) + '_50x.png';
          swatchItem = swatchItem.replace(/{{colorImage}}/g, colorImage);

          var variantImage = '';
          var noImageClass = '';
          if (variant.image) {
            switch (boostPFSConfig.custom.products_per_row) {
              case 2: variantImage = Utils.optimizeImage(variant.image, '600x'); break;
              case 3: variantImage = Utils.optimizeImage(variant.image, '500x'); break;
              default: variantImage = Utils.optimizeImage(variant.image, '400x'); break;
            }
          }
          swatchItem = swatchItem.replace(/{{variantImage}}/g, variantImage);
          swatchItems.push(swatchItem);
        }
      })
    }
    if (swatchItems.length > 0) {
      html = '<div class="thumbnail-swatch is-justify-' + boostPFSConfig.custom.thumbnail_text_alignment + ' is-flex-wrap">' +
        swatchItems.join(' ') +
        '</div>';
    }
    return html;
  }

  function bgset(image) {
    var bgset = '';
    if (image) {
      var aspect_ratio = image.width / image.height;

      if (image.width > 180) bgset += ' ' + Utils.optimizeImage(image.src, '180x') + ' 180w ' + Math.round(180 / aspect_ratio) + 'h,';
      if (image.width > 360) bgset += ' ' + Utils.optimizeImage(image.src, '360x') + ' 360w ' + Math.round(360 / aspect_ratio) + 'h,';
      if (image.width > 540) bgset += ' ' + Utils.optimizeImage(image.src, '540x') + ' 540w ' + Math.round(540 / aspect_ratio) + 'h,';
      if (image.width > 720) bgset += ' ' + Utils.optimizeImage(image.src, '720x') + ' 720w ' + Math.round(720 / aspect_ratio) + 'h,';
      if (image.width > 900) bgset += ' ' + Utils.optimizeImage(image.src, '900x') + ' 900w ' + Math.round(900 / aspect_ratio) + 'h,';
      if (image.width > 1080) bgset += ' ' + Utils.optimizeImage(image.src, '1080x') + ' 1080w ' + Math.round(1080 / aspect_ratio) + 'h,';
      if (image.width > 1296) bgset += ' ' + Utils.optimizeImage(image.src, '1296x') + ' 1296w ' + Math.round(1296 / aspect_ratio) + 'h,';
      if (image.width > 1512) bgset += ' ' + Utils.optimizeImage(image.src, '1512x') + ' 1512w ' + Math.round(1512 / aspect_ratio) + 'h,';
      if (image.width > 1728) bgset += ' ' + Utils.optimizeImage(image.src, '1728x') + ' 1728w ' + Math.round(1728 / aspect_ratio) + 'h,';
      if (image.width > 1950) bgset += ' ' + Utils.optimizeImage(image.src, '1950x') + ' 1950w ' + Math.round(1950 / aspect_ratio) + 'h,';
      if (image.width > 2100) bgset += ' ' + Utils.optimizeImage(image.src, '2100x') + ' 2100w ' + Math.round(2100 / aspect_ratio) + 'h,';
      if (image.width > 2260) bgset += ' ' + Utils.optimizeImage(image.src, '2260x') + ' 2260w ' + Math.round(2260 / aspect_ratio) + 'h,';
      if (image.width > 2450) bgset += ' ' + Utils.optimizeImage(image.src, '2450x') + ' 2450w ' + Math.round(2450 / aspect_ratio) + 'h,';
      if (image.width > 2700) bgset += ' ' + Utils.optimizeImage(image.src, '2700x') + ' 2700w ' + Math.round(2700 / aspect_ratio) + 'h,';
      if (image.width > 3000) bgset += ' ' + Utils.optimizeImage(image.src, '3000x') + ' 3000w ' + Math.round(3000 / aspect_ratio) + 'h,';
      if (image.width > 3350) bgset += ' ' + Utils.optimizeImage(image.src, '3350x') + ' 3350w ' + Math.round(3350 / aspect_ratio) + 'h,';
      if (image.width > 3750) bgset += ' ' + Utils.optimizeImage(image.src, '3750x') + ' 3750w ' + Math.round(3750 / aspect_ratio) + 'h,';
      if (image.width > 4100) bgset += ' ' + Utils.optimizeImage(image.src, '4100x') + ' 180w ' + Math.round(4100 / aspect_ratio) + 'h,';
      bgset += ' ' + image.src + ' ' + image.width + 'w ' + image.height + 'h,';
    }
    return bgset;
  }

  // Build Pagination
  ProductPaginationDefault.prototype.compileTemplate = function (totalProduct) {
    if (!totalProduct) totalProduct = this.totalProduct

    // Get page info
    var currentPage = parseInt(Globals.queryParams.page);
    var totalPage = Math.ceil(totalProduct / Globals.queryParams.limit);

    if (totalPage > 1) {
      var paginationHtml = boostPFSTemplate.paginateHtml;
      // Build Previous
      var previousHtml = (currentPage > 1) ? boostPFSTemplate.previousActiveHtml : '';
      previousHtml = previousHtml.replace(/{{itemUrl}}/g, Utils.buildToolbarLink('page', currentPage, currentPage - 1));
      paginationHtml = paginationHtml.replace(/{{previous}}/g, previousHtml);
      // Build Next
      var nextHtml = (currentPage < totalPage) ? boostPFSTemplate.nextActiveHtml : '';
      nextHtml = nextHtml.replace(/{{itemUrl}}/g, Utils.buildToolbarLink('page', currentPage, currentPage + 1));
      paginationHtml = paginationHtml.replace(/{{next}}/g, nextHtml);
      // Create page items array
      var beforeCurrentPageArr = [];
      for (var iBefore = currentPage - 1; iBefore > currentPage - 3 && iBefore > 0; iBefore--) {
        beforeCurrentPageArr.unshift(iBefore);
      }
      if (currentPage - 4 > 0) {
        beforeCurrentPageArr.unshift('...');
      }
      if (currentPage - 4 >= 0) {
        beforeCurrentPageArr.unshift(1);
      }
      beforeCurrentPageArr.push(currentPage);
      var afterCurrentPageArr = [];
      for (var iAfter = currentPage + 1; iAfter < currentPage + 3 && iAfter <= totalPage; iAfter++) {
        afterCurrentPageArr.push(iAfter);
      }
      if (currentPage + 3 < totalPage) {
        afterCurrentPageArr.push('...');
      }
      if (currentPage + 3 <= totalPage) {
        afterCurrentPageArr.push(totalPage);
      }
      // Build page items
      var pageItemsHtml = '';
      var pageArr = beforeCurrentPageArr.concat(afterCurrentPageArr);
      for (var iPage = 0; iPage < pageArr.length; iPage++) {
        if (pageArr[iPage] == '...') {
          pageItemsHtml += boostPFSTemplate.pageItemRemainHtml;
        } else {
          pageItemsHtml += (pageArr[iPage] == currentPage) ? boostPFSTemplate.pageItemSelectedHtml : boostPFSTemplate.pageItemHtml;
        }
        pageItemsHtml = pageItemsHtml.replace(/{{itemTitle}}/g, pageArr[iPage]);
        pageItemsHtml = pageItemsHtml.replace(/{{itemUrl}}/g, Utils.buildToolbarLink('page', currentPage, pageArr[iPage]));
      }
      paginationHtml = paginationHtml.replace(/{{pageItems}}/g, pageItemsHtml);
      return paginationHtml;
    }

    return '';
  };

  // Build Sorting
  ProductSorting.prototype.compileTemplate = function() {
    var html = '';
    if (boostPFSTemplate.hasOwnProperty('sortingHtml')) {
      var sortingArr = Utils.getSortingList();
      if (sortingArr) {
        var paramSort = Globals.queryParams.sort || '';
        // Build content
        var sortingItemsHtml = '';
        for (var k in sortingArr) {
          activeClass = '';
          activeCheckbox = '';
          if (paramSort == k) {
            activeClass = 'boost-pfs-filter-sort-item-active';
            activeCheckbox = 'active';
          }
          sortingItemsHtml += '<li class="boost-pfs--dflex"><span class="boost-pfs--checkbox ' + activeCheckbox + '"></span><a href="#" data-sort="' + k + '" class="' + activeClass + '">' + sortingArr[k] + '</a></li>';
        }
        html = boostPFSTemplate.sortingHtml.replace(/{{sortingItems}}/g, sortingItemsHtml);
      }
    }
    return html;
  };

  ProductSorting.prototype.render = function() {
    jQ(Selector.topSorting).html(this.compileTemplate());

    if (jQ('.boost-pfs-filter-custom-sorting').hasClass('boost-pfs-filter-sort-active')) {
      jQ('.boost-pfs-filter-custom-sorting').toggleClass('boost-pfs-filter-sort-active');
    }

    var labelSort = '';
    var paramSort = Globals.queryParams.sort || '';
    var sortingList = Utils.getSortingList();
    if (paramSort.length > 0 && sortingList && sortingList[paramSort]) {
      labelSort = sortingList[paramSort];
    } else {
      labelSort = Labels.sorting_heading;
    }

    jQ('.boost-pfs-filter-custom-sorting button span span').text(labelSort);
  }

  // Build Sorting event
  ProductSorting.prototype.bindEvents = function() {
    var _this = this;
    jQ('.boost-pfs-filter-filter-dropdown a').click(function(e) {
      e.preventDefault();
      FilterApi.setParam('sort', jQ(this).data('sort'));
      FilterApi.setParam('page', 1);
      FilterApi.applyFilter('sort');
    });

    jQ(".boost-pfs-filter-custom-sorting > button").click(function() {
      if (!jQ('.boost-pfs-filter-filter-dropdown').is(':animated')) {
        jQ('.boost-pfs-filter-filter-dropdown').toggle().parent().toggleClass('boost-pfs-filter-sort-active');
      }
    });

    jQ(Selector.filterTreeMobileButton).click(function() {
      jQ('.boost-pfs-filter-top-sorting-mobile .boost-pfs-filter-filter-dropdown').hide();
    });

    jQ(document).on('click', function (e) {
      if (jQ(e.target).parents('.boost-pfs-filter-top-sorting').find(".boost-pfs-filter-filter-dropdown").length === 0) {
        jQ('.boost-pfs-filter-filter-dropdown').hide().parent().removeClass('boost-pfs-filter-sort-active');
      }
    });
  };

  // Add additional feature for product list, used commonly in customizing product list
  ProductList.prototype.afterRender = function (data, eventType) {
    if (!data) data = this.data
    if (!eventType) eventType = this.eventType

    if (boostPFSConfig.custom.enable_quickshop && data.length > 0) {
      var count = 0;
      data.forEach(function (product) {
        var url = Utils.buildProductItemUrl(product, true);
        jQ.ajax({
          type: "GET",
          url: url + '?view=boost-pfs-quickview',
          success: function (result) {
            if (jQ('[data-boost-pfs-quickshop-id="' + product.id + '"]').length == 1) {
              jQ('[data-boost-pfs-quickshop-id="' + product.id + '"]').replaceWith(result);
            }
            count++;
            if (count == data.length) {
              buildTheme();
            }
          }
        });
      })
    } else {
      buildTheme();
    }
  };

  // Build additional elements
  Filter.prototype.afterRender = function (data, eventType) { };

  function buildTheme() {
    if (window.SPR && typeof SPR.initDomEls == 'function' && typeof SPR.loadBadges == 'function') {
      SPR.initDomEls();
      SPR.loadBadges();
    }

    if (typeof Shopify.PaymentButton != 'undefined' && typeof Shopify.PaymentButton.init == 'function') {
      Shopify.PaymentButton.init();
    }

    if (boostPFSConfig.custom.hasOwnProperty('show_multiple_currencies') &&
      boostPFSConfig.custom.show_multiple_currencies == true &&
      typeof convertCurrencies == 'function') {
      convertCurrencies();
    }
  }

  jQ( window ).ready(function () {
    console.log('aaaaxs');
    jQ('.sort-by--label').on('click', function () {
      if (!jQ(this).hasClass('active')) {
        jQ(this).addClass('active');
        jQ('.sort-by .boost-pfs-filter-top-sorting').addClass('active');
      } else {
        jQ(this).removeClass('active');
        jQ('.sort-by .boost-pfs-filter-top-sorting').removeClass('active');
      }
    })
  })
})();