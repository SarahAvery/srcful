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
        console.log(rating);

        // We need to do something with the value!!
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
  });
})(jQuery);
