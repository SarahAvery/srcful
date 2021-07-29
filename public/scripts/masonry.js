(function ($) {
  $(document).ready(function () {
    const grid = $(".home-page .card-container").masonry({
      itemSelector: ".card",
      gutter: 10,
      fitWidth: true,
    });

    // recompute layout after 500ms to optimistically assume images will have finished loading
    setTimeout(() => grid.masonry("layout"), 500);
  });
  // eslint-disable-next-line no-undef
})(jQuery);
