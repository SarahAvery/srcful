/* eslint-disable no-undef */
// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });




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

    // Star Rating
  
    
    $(".rating")
      .find("form")
      .on("click", (e) => {
        const rating = e.target.value;
        const url = window.location.href;
        const id = url.substring(url.lastIndexOf('/') + 1).split('?')[0];
        $.ajax({ url: '/api/resource_ratings', method: 'POST', data: {rating, resourceId: id} })

      });


    // Create New Resource Article Textarea

    $("#article-div")
      .find("textarea")
      .on("click", () => {
        $("#article-div").css({ width: "600px", margin: "0 -50%" });
        $("textarea").css({ width: "600px", height: "300px" });
      });

    // Comment Button
    $(".comment-container")
      .find(".comment-btn")
      .on("click", function (event) {
        event.preventDefault();
        const url = window.location.href;
        const id = url.substring(url.lastIndexOf('/') + 1).split('?')[0];
        $.get('http://localhost:8080/profile', function(data) {
          return data;
        })
        .then((data) => {
          let username = data.split('username: <span>')[1].split('</span>')[0];
         
        const commentStuff = { 
          title: $('#comment-title').val(), username: username, 
          description: $('#comment-content').val(), updated_at: new Date(), resourceId: id
          }
        $('#comment-content').val('');
        $('#comment-title').val('');
        const newComment = createCommentElement(commentStuff);
        $('.inputComment').after(newComment);
        $.ajax({ url: '/api/resource_comments', method: 'POST', data: commentStuff })
        });
      });
      

      const createCommentElement = function(commentInfo) {

        let $comment = $(
          `<div class="comment">
            <div class="comment-body">
              <h4 class="comment-title">${commentInfo.title}</h4>
              <p class="username">Posted By: ${commentInfo.username} </p>
              <p class="comment-content">${commentInfo.description}</p>
            </div>
            <div>
              <p class="comment-date">${commentInfo.updated_at}</p>
            </div>
          </div>`
          );
        return $comment;
      };
      
    // !!! When need to handle this with ajax, like tweeter. Once comment is rendered, the button will need to have the active class removed

    // Comments Load More Button

    $("#load-more").find(".load-more").on("click", function() { 
      $(this).remove();
      $('#hidden-comments').removeClass('hidden');
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

    // // Like button
    // $(".like-btn").on("click", function(e) {
    //     $(this).toggleClass("liked");
    //     const url = ($(this).attr("class").includes("liked")) ? "/like" : "/like/remove";
    //     $.post(url, resource_id);
    //   });

    // DONT REMOVE BELOW CODE PLEASE

    //   const animateTopHandler = function () {
    //     $("html").animate({ scrollTop: 0 }, "slow");
    //   };

    //   $("#topBtn").on("click", animateTopHandler);
    // });

    // $(document).scroll(function () {
    //   // scroll button
    //   const scrollPosition = $(window).scrollTop();
    //   if (scrollPosition > 100) {
    //     $("#topBtn").css("visibility", "visible");
    //   } else {
    //     $("#topBtn").css("visibility", "hidden");
    //   }

    //   // nav
    //   if (scrollPosition > 300) {
    //     $("body").addClass("scrolled");
    //   } else {
    //     $("body").removeClass("scrolled");
    //   }

    $("#update_profile").on("submit", function (event) {
      event.preventDefault();

      const data = $(this).serialize();

      $.ajax({
        url: $(this).attr("action"),
        method: "POST",
        data,
      })
        .then((res) => {
          console.log(res);
          // update view on sucess
        })
        .catch((err) => {
          // update view on err
        });
    });
  });
})(jQuery);
