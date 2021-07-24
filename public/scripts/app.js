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
        $(".edit-btn").css("background-color", "rgb(125, 201, 194)");
      });

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
