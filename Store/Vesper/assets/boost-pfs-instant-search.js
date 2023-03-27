// Override Settings
var boostPFSInstantSearchConfig = {
  search: {

  }
};

(function () {
  BoostPFS.inject(this);

  // Customize style of Suggestion box
  SearchInput.prototype.customizeInstantSearch = function (suggestionElement, searchElement, searchBoxId) {
    if (!suggestionElement) suggestionElement = this.$uiMenuElement;
    if (!searchElement) searchElement = this.$element;
    if (!searchBoxId) searchBoxId = this.id;
  };

  BoostPFS.prototype.beforeBuildSearchBox = function (id) {
    // Remove theme's instant search events
    var cloneSearchBar = jQ(id).clone();
    jQ(id).replaceWith(cloneSearchBar);

    if (Utils.InstantSearch.isFullWidthMobile()) {
      jQ(id).removeAttr('autofocus');
      if (jQ(id).is(':focus')) {
        jQ(id).blur();
      }
    }
  };

  BoostPFS.prototype.afterCloseSuggestionMobile = function (searchBoxId, isCloseSearchBox) {
    // Close theme's search pop up
    if (isCloseSearchBox) {
      jQ('.mobile-search').hide();
      jQ('body').attr('style', '')
    }
  };

  // Bind Event for input search style 3
  var bindEvents = InstantSearchStyle3.prototype.bindEvents;
  InstantSearchStyle3.prototype.bindEvents = function() {
    bindEvents.call(this);
    var self = this;
    
    jQ('.header__link.action-area__link').off('click').click(function(e) {
      e.preventDefault();
      jQ('.search__fields input').focus();
      self.openSuggestionStyle3();
      jQ('.js-search-popup').addClass('boost-hidden');
    });
  }
})();