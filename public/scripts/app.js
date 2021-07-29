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




(function ($, db, req) {
  $(document).ready(function (db) {
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
        db.query(`SELECT COUNT(*) FROM resource_ratings WHERE resource_id = $1 AND user_id = $2;`, [req.params.id, req.session.userId])
        .then((data) => {
          console.log(data.rows[0]);
          if (data.rows[0] === 0) {
            db.query(`INSERT INTO resource_ratings (rating, user_id, resource_id)
                  VALUES()`)
          } else { 
            // db.query('UPDATE resource_ratings ON 
          }
        });
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
        $(".comment-btn").addClass("active");
        db.query(`INSERT INTO resource_comments (title, content, user_id, resource_id)
         VALUES("title", "content", 5, 2);`)
        // `, [])
        .then(db.query(`SELECT COUNT(resource_comments.id) as count FROM resource_comments`))
        .then((data) => {
          let numComments = data.rows[0];
        })
        .then(db.query(`SELECT * FROM resource_comments WHERE resource_id = $1;`, [numComments]))
        .then((data) => {
          let commentInfo = data.rows[0];
          const newComment = createCommentElement(commentInfo)
          .then($(".comment-container").prepend("newComment"))
          .then($(".comment-btn").removeClass("active"))
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

    $(".load-more").find(".load-more").on("click", function() { 
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
