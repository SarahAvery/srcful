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
        const url = window.location.href;
        const id = url.substring(url.lastIndexOf('/') + 1).split('?')[0];
        $.ajax({ url: '/api/resource_ratings', method: 'POST', data: {rating, resourceId: id} })
      });

    // Comment Button
    $(".comment-container")
      .find(".comment-btn")
      .on("click", function (event) {
        event.preventDefault();
        const url = window.location.href;
        const host = window.location.hostname;
        const port = window.location.port;
        const id = url.substring(url.lastIndexOf('/') + 1).split('?')[0];
        $.get(`http://${host}:${port}/profile`, function(data) {
          return data;
        })
        
        .then((data) => {
          let username = data.split('username: <span>')[1].split('</span>')[0];
         
        const currentTime = new Date();
        const formattedTime = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short', hour12: 'true'}).format(currentTime);
        const day = formattedTime.slice(0,2);
        const month = formattedTime.slice(3,6).toUpperCase();
        const year = formattedTime.slice(7,11);
        const time = formattedTime.slice(13,18);
        const twelveHourSuffix = formattedTime.slice(19,21).toUpperCase();
        const fullyFormattedTime = `${month}-${day}-${year} ${time}${twelveHourSuffix}`
         
        const commentItems = { 
          title: $('#comment-title').val(), username: username, 
          content: $('#comment-content').val(), post_time: fullyFormattedTime, resourceId: id
          }
          
        $('#comment-content').val('');
        $('#comment-title').val('');
        if(commentItems.content !== "" && username !== "") {
          const newComment = createCommentElement(commentItems);
          $('.inputComment').after(newComment);
          $.ajax({ url: '/api/resource_comments/' + id, method: 'POST', data: commentItems })
          const sup = $(this).closest(".card").find(".comment-dots sup");
          const commentCount = Number(sup.text());
          sup.text(commentCount + 1);
        }
      });
    });
      

      const createCommentElement = function(commentInfo) {

        let $comment = $(
          `<div class="comment">
            <div class="comment-body">
              <h4 class="comment-title">${commentInfo.title}</h4>
              <p class="username">@${commentInfo.username} </p>
              <p class="comment-content">${commentInfo.content}</p>
            </div>
            <div>
              <p class="comment-date">${commentInfo.post_time}</p>
            </div>
          </div>`
          );
        return $comment;
      };
      
    // !!! When need to handle this with ajax, like tweeter. Once comment is rendered, the button will need to have the active class removed

    // Comments Load More Button

    $("#load-more").find(".load-more").on("click", function() { 
      $(this).remove();
      const url = window.location.href;
      const host = window.location.hostname;
      const port = window.location.port;
      const id = url.substring(url.lastIndexOf('/') + 1).split('?')[0];
      $.get(`http://${host}:${port}/api/resource_comments/` + id, function(data) {
        const resource = data[0];
        resource.moreComments.forEach(function(comment) {
          const thisComment = createCommentElement(comment);
          $('#load-more').before(thisComment);
        });
      });
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
