var This;
var mWidth;
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
      DefWidth();
      $(window).resize(function(){
        DefWidth();
      })
      function DefWidth(){
       $(".one").height($(window).height());
       $(".two").css({
        "marginTop" : $(window).height()
       })
      }
      // Banner切换
      var SldLi = $(".sld-top li"),
          Slda = $(".sld-down a"),
          SldFl = $(".sld-fl"),
          SldFr = $(".sld-fr"),
          SldTimer = null,
       SldPage = 0;
      SldAnimate();
      SldFl.click(function(){//点击左边
       SldPage--;
       SldAnimate();
      })
      SldFr.click(function(){//点击右边
       SldPage++;
       SldAnimate();
      })
      Slda.click(function(){//点击底部
       SldPage = $(this).index();
       SldAnimate();
      })
      SldPlay();
      function SldPlay(){
        SldTimer = setInterval(function(){
         SldPage++;
         SldAnimate();
        },4000)
      }
      $(".sld").mouseover(function(){
        clearInterval(SldTimer);
      })
      $(".sld").mouseout(function(){
         SldPlay();
      })
      function SldAnimate(){
        if( SldPage < 0 ){
          SldPage = SldLi.length-1;
        }
        if( SldPage > SldLi.length-1 ){
          SldPage = 0;
        }
        SldLi.removeClass("sld-show").css({
          "opacity" : "0",
          "zIndex" : "2"
        }).eq(SldPage).addClass("sld-show").css({
          "opacity" :"1",
          "zIndex" :"3"
        });
        Slda.removeClass("active").eq(SldPage).addClass("active");
      }
      // Banner结束
      var ScrVal = $(window).scrollTop(),
       MaxCt = $(".ct"),
       One = $(".one");
       OneM = $(".one-m"),
       Two = $(".two"),
       Two3 = $(".two-3"),
       TwoOne5 = $(".two-one-5"),
       SixBorder = $(".six-border"),
       ThreeBg = $(".three-1 li");
       var SetTime = null;
      $(window).scroll(function(){
       ScrVal = $(window).scrollTop();
       AllAnimate();
       clearTimeout(SetTime);
         ScrBg();
      })
      function AllAnimate(){
        $(".an-two").each(function(i){
            if( ScrVal  > $(this).offset().top- $(window).height() ){
              $(this).addClass("an-two-show");
            }
        })
         $(".an-three").each(function(i){
            if( ScrVal  > $(this).offset().top- $(window).height() ){
              $(this).addClass("an-two-show");
            }
        })
      }
      ScrBg();

      function ScrBg(){
          OneM.css({
            "top" : -ScrVal/5+"px"
            // "transform": "translateY("+((ScrVal))+"px)",
            // "-webkit-transform": "translateY("+((ScrVal))+"px)"
          })
          console.log(ScrVal);
          Two3.css({
            "marginTop" : -$(window).height()/2,
             "transform": "translateY("+(ScrVal/2)+"px)",
             "-webkit-transform": "translateY("+(ScrVal/2)+"px)"
          })
          TwoOne5.css({
            "marginTop" : $(window).height()/2,
             "transform": "translateY(-"+(ScrVal/2)+"px)",
             "-webkit-transform": "translateY(-"+(ScrVal/2)+"px)"
          })
          ThreeBg.css({
            "marginTop" : -$(window).height()/2-600,
             "transform": "translateY("+(ScrVal/2)+"px)",
             "-webkit-transform": "translateY("+(ScrVal/2)+"px)"
          })
           SixBorder.css({
            "transform": "translateY(-"+(ScrVal - 3200)/1+"px)",
            "-webkit-transform": "translateY(-"+(ScrVal - 3200)/1+"px)"
          })
           $(".six-2 li").css({
            "marginTop" : (ScrVal - 3000)/2,
            "transform": "translateY(-"+(ScrVal - 3000)/2+"px)",
            "-webkit-transform": "translateY(-"+(ScrVal - 3000)/2+"px)"
          })
      }
      // Three
      var ThreeLi = $(".three-down li"),
          ThreeA = $(".three-a a"),
       ThreeTrue = true,
      ThreePage = 0;
      $(window).scroll(function(){
          if( ThreeTrue && ScrVal >  $(".three").offset().top -$(window).height()+200){
            ThreeAnimate();
            ThreeTrue = false;
          }
      })
      ThreeA.click(function(){//点击底部
       ThreePage = $(this).index();
       ThreeAnimate();
      })
      function ThreeAnimate(){
        ThreeLi.removeClass("three-show").css({
          "opacity" : "0",
          "zIndex" : "2"
        }).eq(ThreePage).addClass("three-show").css({
          "opacity" :"1",
          "zIndex" :"3"
        });
        ThreeA.removeClass("active").eq(ThreePage).addClass("active");
      }
      // ThreeEnd
      //Five
     var  ProPage = 0,
     mWidth = $(window).width()-100,
       MaxProPage = 0,
       CarouPage = 2,
       ProAnimate = true,
       ProductMax = $(".five-1 .product-max"),
       ProdUl = $(".five-1 .product-max ul"),
       ProdLi = $(".five-1 .product-max li"),
       ProLiW = $(".five-1 .product-max li").eq(0).width();
       $(".five-1").show();
       $(".five-2").hide();
       $(".five-3").hide();
       $(".five-4").hide();
       $(window).resize(function(){
        mWidth = $(window).width()-100;
        ProductWidth();
        ProductAnimate("true");
       })
    var FourA = $(".four-a a");
       FourA.click(function(){
        This = $(this);
          ProPage = 0,
          ProductMax = $(".five-"+(This.index()+1)+" .product-max"),
          ProdUl = $(".five-"+(This.index()+1)+" .product-max ul"),
          ProdLi = $(".five-"+(This.index()+1)+" .product-max li"),
          ProLiW = $(".five-"+(This.index()+1)+" .product-max li").eq(0).width();
          FourA.removeClass("active");
          This.addClass("active");
          if( This.index() == 0 ){
            $(".five-1").show();
            $(".five-2").hide();
            $(".five-3").hide();
            $(".five-4").hide();
          }else if(This.index() == 1){
            $(".five-1").hide();
            $(".five-2").show();
            $(".five-3").hide();
            $(".five-4").hide();
          }else if(This.index() == 2){
            $(".five-1").hide();
            $(".five-2").hide();
            $(".five-3").show();
            $(".five-4").hide();
          }else if(This.index() == 3){
            $(".five-1").hide();
            $(".five-2").hide();
            $(".five-3").hide();
            $(".five-4").show();
          }
          ProductWidth();
          ProductAnimate("true");
       })
      var ProduTrue = true;
      $(window).scroll(function(){
          if( ProduTrue && ScrVal > $(".five").offset().top-$(window).height()+200){
             $(".five-1").show();
             $(".five-2").hide();
             ProductWidth();
             ProductAnimate();
             ProduTrue = false;
          }
      })



      function ProductWidth() {
      ProdUl.width(ProLiW * ProdLi.length);
       PageNum = Math.floor(mWidth / ProLiW);
       ThisPage = PageNum * ProPage;
       ProductMax.width(ProLiW * PageNum);
       MaxProPage = Math.ceil((ProLiW * ProdLi.length) / ProductMax.width()) - 1;
     }
     var ProFl = $(".pro-btn-fl"),
       ProFr = $(".pro-btn-fr");
     ProFl.click(function() {
       ProPage--;
       ProductAnimate();
     })
     ProFr.click(function() {
       ProPage++;
       ProductAnimate();
     })
     function ProductAnimate(State) {
       if (ProPage < 0) {
         ProPage = 0;
       } else if (ProPage > MaxProPage) {
         ProPage = MaxProPage;
       } else {
         ThisPage = PageNum * ProPage;
         ProdUl.css({
           "left": -ProdLi.eq(ThisPage).position().left
         })
          ProdLi.removeClass("pro-animate-1 pro-animate-2 pro-animate-3 pro-animate-4 pro-animate-5 pro-animate-6 pro-animate-7 pro-animate-8 pro-animate-9");
         for (var i = 0; i < PageNum; i++) {
           ProdLi.eq(ThisPage + i).addClass("pro-animate-" + (i + 1));
         }

       }
       if (State == "true") {
         ThisPage = 0;
         ProPage = 0;
         ProdUl.css({
           "left": 0
         })
          ProdLi.removeClass("pro-animate-1 pro-animate-2 pro-animate-3 pro-animate-4 pro-animate-5 pro-animate-6 pro-animate-7 pro-animate-8 pro-animate-9");
         for (var i = 0; i < PageNum; i++) {
           ProdLi.eq(ThisPage + i).addClass("pro-animate-" + (i + 1));
         }
       }

     }

      //FiveEnd
      var SixPage = 0;
      SixAnimate();
      $(".six-3-a").eq(0).addClass("six-active");
      $(".six-3-a").mouseover(function(){
        This = $(this);
        SixPage = This.index();
        SixAnimate();
      })
      function SixAnimate(){
        $(".six-2 li").css({
          "opacity" : "0",
          "zIndex" : "1"
        }).eq(SixPage).css({
          "opacity" : "1",
          "zIndex" : "2"
        })
        $(".six-3-a").removeClass("six-active").eq(SixPage).addClass("six-active");
        $(".six-5").css({
          "opacity" : "0",
          "zIndex" : "2"
        }).eq(SixPage).css({
          "opacity" :"1",
          "zIndex" :"3"
        });
      }

})