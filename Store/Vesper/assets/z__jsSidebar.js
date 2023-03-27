/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
window.PXUTheme.jsSidebar = {
  init: function() {

    const facetedFilterForm = document.querySelector('[data-faceted-filter-form]')
    if (facetedFilterForm) {
      facetedFilterForm.addEventListener('change', e => {
        if (e.target.type == 'number') return;
        facetedFilterForm.submit();
      });
    }

    const openSidebarBlocks = document.querySelectorAll('[data-sidebar-block__toggle="open"]');

    openSidebarBlocks.forEach(function(block){
      window.PXUTheme.jsSidebar.openSidebarBlock($(block));
    })


    $('[data-has-toggle-option]').on('click', '[data-sidebar-block__toggle="closed"]', function (e) {

      e.preventDefault();
      window.PXUTheme.jsSidebar.openSidebarBlock($(this));
    });

    $('[data-has-toggle-option]').on('click', '[data-sidebar-block__toggle="open"]', function(e) {

      e.preventDefault();
      window.PXUTheme.jsSidebar.closeSidebarBlock($(this));
    });

    if ($('[data-product-sidebar]').length) {
      $('.section--has-sidebar-option').addClass('has-sidebar-enabled');
      $('.section--has-sidebar-option').removeClass('has-sidebar-disabled');
    } else {
      $('.section--has-sidebar-option').removeClass('has-sidebar-enabled');
      $('.section--has-sidebar-option').addClass('has-sidebar-disabled');

    }

  },
  openSidebarBlock: function ($toggleBtn) {

    const $parentBlock = $toggleBtn.closest('.sidebar__block');
    const $toggleIcon = $toggleBtn.find('.icon');

    $toggleBtn.attr('data-sidebar-block__toggle', 'open');

    $parentBlock.addClass('is-active');
    $parentBlock.attr('aria-expanded', true);
    $parentBlock.find('[data-sidebar-block__content--collapsible]').slideDown();
  },
  closeSidebarBlock: function ($toggleBtn) {

    const $parentBlock = $toggleBtn.closest('.sidebar__block');
    const $toggleIcon = $toggleBtn.find('.icon');

    $toggleBtn.attr('data-sidebar-block__toggle', 'closed');

    $parentBlock.removeClass('is-active');
    $parentBlock.attr('aria-expanded', false);
    $parentBlock.find('[data-sidebar-block__content--collapsible]').slideUp();
  },
  unload: function() {
    const $toggleBtn = $('[data-sidebar-block__toggle]');
    $toggleBtn.off();
  }
}

/******/ })()
;