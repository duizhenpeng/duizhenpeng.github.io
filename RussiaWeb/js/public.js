$(function(){
  $(window).resize(function(){
    Merchand();
    DetailsResize();
  })
  DetailsResize();
  Merchand();
  function Merchand(){
    if( $(window).width() <= 1685 ){
       $("body").addClass("body-1685");
    }else{
       $("body").removeClass("body-1685");
    }
  }
  $(".menu-hover").mouseover(function(){
      $(".menu-hover").removeClass("menu-active");
      $(this).addClass("menu-active");
     })
      $(".menu-hover").mouseout(function(){
      $(".menu-hover").removeClass("menu-active");
     })

      function DetailsResize(){
          if( $(window).width() < 1214 ){
            $(".details").width("100%");
          }else{
            $(".details").width("1214");
          }
          if( $(window).width() < 900 ){
            $(".news-de").width("100%");
          }else{
            $(".news-de").width("900");
          }
      }
})