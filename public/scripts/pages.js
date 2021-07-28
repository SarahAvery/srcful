// const getUrlParameter = function getUrlParameter(sParam) {
//   let sPageURL = window.location.search.substring();
//   console.log(sPageURL);
//   //   sURLVariables = sPageURL.split("/"),
//   //   sParameterName,
//   //   i;

//   // for (i = 0; i < sURLVariables.length; i++) {
//   //   sParameterName = sURLVariables[i].split("=");

//   //   if (sParameterName[0] === sParam) {
//   //     return typeof sParameterName[1] === undefined
//   //       ? true
//   //       : decodeURIComponent(sParameterName[1]);
// };
// //   }
// //   return false;
// // };

// let searchParams = new URLSearchParams(window.location.search);

// console.log("hi " + searchParams);

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

// (function ($) {
//   $(document).ready(function () {
//     // let currentPageNum = 1;
//     // console.log("currentPageNum ", currentPageNum);

//     const host = $(location).attr("host");
//     const href = $(location).attr("href");

//     // console.log("host", host);

//     const currPageNum = href.split(`${host}/page/`)[1];
//     parseInt(currPageNum);
//     console.log("currPageNum", parseInt(currPageNum));
//     // console.log(typeof parseInt(currPageNum));

//     // const currHref = $("#next").attr("href");
//     // console.log("currHref ", currHref);

//     // const oldHref = $("#next").attr("href");
//     // console.log("oldHref ", oldHref);

//     $("#next").on("click", () => {
//       if (currPageNum === undefined) {
//         $("#next").attr("href", "/page/2");
//       }

//       console.log("currPageNum", parseInt(currPageNum));

//       const nextPage = parseInt(currPageNum) + 1;
//       console.log("nextPage ", nextPage);

//       // String(nextPage);
//       // console.log(typeof nextPage);

//       // const oldHref = $("#next").attr("href");
//       // console.log("oldHref ", oldHref);

//       // const newHref = $("#next").attr("href", `/page/${nextPage}`);
//       // console.log("newHref ", newHref);

//       // $("#next").attr("href", `/page/${parseInt(nextPage)}`);
//       // console.log($("#next").attr("href", newHref));
//     });
//   });
// })(jQuery);
