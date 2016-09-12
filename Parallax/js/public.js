var This;
$(function(){
  $(".menu-hover").mouseover(function(){
      $(".menu-hover").removeClass("menu-active");
      $(this).addClass("menu-active");
     })
      $(".menu-hover").mouseout(function(){
      $(".menu-hover").removeClass("menu-active");
     })
      $("body").on("click", ".weibo", function () {//分享到新浪微博
          window.open("http://service.weibo.com/share/share.php?title=" + document.title + "&url=" + window.location.href);
      })
      $("body").on("click", ".twitter", function () {//分享到新浪微博
          window.open("https://twitter.com/intent/tweet?text="+ document.title +"&via="+ window.location.href);
      })
      $("body").on("click", ".facebook", function () {//分享到新浪微博
          window.open("https://www.facebook.com/sharer/sharer.php?u="+ window.location.href);
      })
      $("body").on("click", ".share-21", function () {//分享到Vk
          window.open(" https://vk.com/share.php?url="+ window.location.href);
      })
      $("body").on("click",".click-love",function(){
        $(this).addClass("click-love-true");
      })
      // News
        $(".ab-a a").eq(0).addClass("active");
        $(".put-box").hide();
        $(".put-box").eq(0).show();
      $(".ab-a a").click(function(){
        This = $(this);
        $(".ab-a a").removeClass("active");
        This.addClass("active");
        $(".put-box").hide();
        $(".put-box").eq(This.index()).show();
      })
      // NewsEnd
      NewsResize();
      $(window).resize(function(){
        NewsResize();
      })
      function NewsResize(){
        if( $(window).width() < 1029 ){
          $("body").addClass("body-1029").removeClass("body-1382");
        }else if( $(window).width() < 1382 ){
          $("body").addClass("body-1382").removeClass("body-1029");
        }else{
          $("body").removeClass("body-1382 body-1029");
        }
      }
      $(window).scroll(function(){
        MenuScroll();
      })
      MenuScroll();
      function MenuScroll(){
        if( $(window).scrollTop() > 0 ){
          $(".header").addClass("header-fixed");
        }else{
          $(".header").removeClass("header-fixed");
        }
      }
})