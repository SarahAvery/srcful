/* eslint-disable no-undef */

(function ($) {
  $(document).ready(function () {
    // Profile Edit Btn
    $(".profile-container")
      .find(".edit-btn")
      .on("click", function () {
        $(".edit-btn").toggleClass("active");
      });

    // Popout Edit
    $(".profile-container")
      .find(".edit-btn")
      .on("click", function () {
        if ($(".edit-btn").hasClass("active")) {
          $(".edit-popout").removeClass("hidden");
        } else {
          $(".edit-popout").addClass("hidden");
        }
      });

    // Profile Save Button CSS
    $(".profile-container")
      .find(".save-btn")
      .on("click", function () {
        $(".save-btn").toggleClass("active");
      });

    // My Resource Edit, Create New, Full Article Buttons
    $(".myresource-container")
      .find(".create-new")
      .on("click", function () {
        $(".create-new").toggleClass("active");
      });

    $(".myresource-container")
      .find(".edit-btn")
      .on("click", function () {
        $(".edit-btn").toggleClass("active");
      });

    $(".myresource-container")
      .find(".full")
      .on("click", function (e) {
        $(e.target).toggleClass("active");
      });

    // Resource/New Create Button

    $(".new-form")
      .find(".create-btn")
      .on("click", function () {
        $(".create-btn").addClass("active");
      });

    // Full Article Edit and Delete Buttons
    $(".resource-container")
      .find(".edit-btn")
      .on("click", function () {
        $(".edit-btn").addClass("active");
      });

    $(".resource-container")
      .find(".delete")
      .on("click", function () {
        $(".delete").addClass("active");
      });

    // Create New Resource Article Textarea

    $("#article-div")
      .find("textarea")
      .on("click", () => {
        $("#article-div").css({ width: "600px", margin: "0 -50%" });
        $("textarea").css({ width: "600px", height: "300px" });
      });

    // Star Rating
    $(".rating")
      .find("form")
      .on("click", (e) => {
        const rating = e.target.value;
        console.log(rating);

        // We need to do something with the value!!
      });

    // Comment Button
    $(".comment-container")
      .find(".comment-btn")
      .on("click", function () {
        $(".comment-btn").addClass("active");
      });
    // !!! When need to handle this with ajax, like tweeter. Once comment is rendered, the button will need to have the active class removed

    // Comments Load More Button

    $("#load-more")
      .find(".load-more")
      .on("click", function () {
        $(".load-more").addClass("active");
      });
    // !!! When need to handle this with ajax, like tweeter. Once more comments are fetched and rendered, the button will need to have the active class removed

    // Error Messages Login
    $(".login-form form")
      .find("input")
      .on("input", () => {
        $(".error-container").css({
          opacity: "0",
          transition: "opacity 400ms ease-in-out",
        });
      });

    // Error Messages Signup
    $(".signup-form form")
      .find("input")
      .on("input", () => {
        $(".error-container").css({
          opacity: "0",
          transition: "opacity 400ms ease-in-out",
        });
      });

    // Like button on /resource/:id
    $(".article-container .like-btn").on("click", function (e) {
      $(this).toggleClass("liked");
      const resourceId = window.location.pathname.match(/\d+/gi)[0];
      const url = $(this).hasClass("liked") ? "/api/like" : "/api/like/remove";

      const sup = $(this).closest(".card").find(".like-btn sup");
      const currentLikesCount = Number(sup.text());
      sup.text(currentLikesCount + ($(this).hasClass("liked") ? 1 : -1));
      $.post(url, { resourceId });
    });

    // Like buttons on /
    $(".home-page .like-btn").on("click", function (e) {
      // e.preventDefault();
      $(this).toggleClass("liked");
      const resourceId = $(this).closest(".card").attr("data-resource-id");
      const url = $(this).hasClass("liked") ? "/api/like" : "/api/like/remove";

      const sup = $(this).closest(".card").find(".like-btn sup");
      const currentLikesCount = Number(sup.text());
      sup.text(currentLikesCount + ($(this).hasClass("liked") ? 1 : -1));
      $.post(url, { resourceId });
    });
  });
})(jQuery);
