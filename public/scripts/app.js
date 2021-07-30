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

    const newArticle = $(".new-form ");
    const newDescription = newArticle.find("textarea");

    newArticle.click(function (e) {
      if (!newDescription.is(e.target)) {
        newDescription.css({ height: "100px" });
      } else {
        newDescription.css({ height: "300px" });
      }
    });

    // $("#article-div")
    //   .find("textarea")
    //   .on("click", () => {
    //     $("textarea").css({ height: "300px" });
    //   });

    // Star Rating
    $(".rating")
      .find("form")
      .on("click", function (e) {
        const rating = e.target.value;
        const url = window.location.href;
        const id = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
        $.ajax({
          url: "/api/resource_ratings",
          method: "POST",
          data: { rating, resourceId: id },
        }).then(function (res) {
          document.getElementById("avgrating").innerHTML = res.avg_rating;
        });
      });

    // Add Comment Button
    $(".comment-container")
      .find(".comment-btn")
      .on("click", function (event) {
        event.preventDefault();
        const url = window.location.href;
        const resourceId = url
          .substring(url.lastIndexOf("/") + 1)
          .split("?")[0];
        const username = $("#comment-form").attr("data-username");

        const currentTime = new Date();
        const formattedTime = new Intl.DateTimeFormat("en-CA", {
          dateStyle: "medium",
          timeStyle: "short",
          hour12: "true",
        }).format(currentTime);

        const commentItems = {
          title: $("#comment-title").val(),
          username: username,
          content: $("#comment-content").val(),
          postTime: formattedTime,
          resourceId,
        };

        $("#comment-content").val("");
        $("#comment-title").val("");
        if (commentItems.content !== "" && username !== "") {
          const newComment = createCommentElement(commentItems);
          $(".inputComment").after(newComment);
          $.ajax({
            url: "/api/resource_comments/" + resourceId,
            method: "POST",
            data: commentItems,
          });
          const sup = $(this).closest(".card").find(".comment-dots sup");
          const commentCount = Number(sup.text());
          sup.text(commentCount + 1);
        }
      });

    const createCommentElement = function (commentInfo) {
      let $comment = $(
        `<div class="comment">
            <div class="comment-body">
              <h4 class="comment-title">${commentInfo.title}</h4>
              <p class="username">@${commentInfo.username} </p>
              <p class="comment-content">${commentInfo.content}</p>
            </div>
            <div>
              <p class="comment-date">${commentInfo.postTime}</p>
            </div>
          </div>`
      );
      return $comment;
    };

    // Comments Load More Button
    $("#load-more")
      .find(".load-more")
      .on("click", function () {
        $(this).remove();
        const url = window.location.href;
        const resourceId = url
          .substring(url.lastIndexOf("/") + 1)
          .split("?")[0];
        $.get(`/api/resource_comments/${resourceId}/all`).then((data) => {
          const moreComments = data.slice(3);

          moreComments.forEach(function (comment) {
            const formattedComment = {
              ...comment,
              postTime: comment.post_time,
            };

            const thisComment = createCommentElement(formattedComment);
            $("#load-more").before(thisComment);
          });
        });
      });

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
