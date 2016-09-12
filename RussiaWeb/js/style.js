   var This;
   $(function() {
     var ListMax = $(".list-max"),
       List = $(".list"),
       ListLenth = List.length,
       mHeight = $(window).height() - 139,
       mWidth = $(window).width() - 290,
       ProPage = 0,
       Page = 0,
       Mouse = true,
       PageNum = 5,
       MaxProPage = 0,
       CarouPage = 2,
       ProAnimate = true,
       ProductMax = $(".product-max"),
       ProdUl = $(".product-max ul"),
       ProdLi = $(".product-max li"),
       ProLiW = $(".product-max li").eq(0).width();

     MaxHeight();
     ProductAnimate();
     $(window).resize(function() {
       HistInit()
       MaxHeight();
       ProductAnimate("true");

     })

     function MaxHeight() {
       mHeight = $(window).height() - 139;
       mWidth = $(window).width() - 290,
       ListMax.height(mHeight * List.length);
       List.height(mHeight);
       ListMax.removeClass("animate").css({
         "top": -(mHeight * Page)
       })
       $(".btn-a").css({ //按钮高度
         "top": (mHeight - 50)
       })
       ProdUl.width(ProLiW * ProdLi.length);
       ProductWidth();
       if ($(window).width() < 1764) {
         $("body").addClass("body-1764");
       } else {
         $("body").removeClass("body-1764");
       }
     }

     function ProductWidth() {
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

     for( var i=0;i<$(".product li").length;i++){
      $(".product li").eq(2*i+1).addClass("pr-two");
     }
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
         ProdLi.removeClass("pro-animate-1 pro-animate-2  pro-animate-3 pro-animate-4 pro-animate-5 pro-animate-6 pro-animate-7");
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
         ProdLi.removeClass();
         for (var i = 0; i < PageNum; i++) {
           ProdLi.eq(ThisPage + i).addClass("pro-animate-" + (i + 1));
         }
       }

     }


     $(".nav a").click(function() {
       if (Mouse) {
         This = $(this);
         Mouse = false;
         $(".nav a").removeClass("active");
         This.addClass("active");
         ListMax.removeClass("animate").addClass("animate-10").css({
           "top": -(mHeight * This.index())
         })
         Page = This.index();
         setTimeout(function() {
           Mouse = true;
           List.removeClass("list-animate");
           List.eq(Page).addClass("list-animate");
           if (Page == 4) { //新闻页面
             $(".news-ul li").eq(0).addClass("active");
           }
         }, 400)
       }
     })
     $(".main").mousewheel(function(ev, delta) { //滚动条判断
       if (Mouse) {
         Mouse = false;
         if (delta > 0) { //向上滚动
           if (Page == 0) {
             Page = 0;
           } else {
             Page--;
           }
         } else { //向下滚动
           if (Page > ListLenth - 2) {
             Page = ListLenth - 1;
           } else {
             Page++;
           }
         }
         ListMax.removeClass("animate-10").addClass("animate").css({
           "top": -(mHeight * Page)
         })

         setTimeout(function() {
           Mouse = true;
           List.removeClass("list-animate");
           List.eq(Page).addClass("list-animate");
           $(".nav a").removeClass("active");
           $(".nav a").eq(Page).addClass("active");
           $(".news-ul li").removeClass("active");
           if (Page == 4) { //新闻页面
             $(".news-ul li").eq(0).addClass("active");
           }
         }, 800)
       }
     });
     $(".banner li").eq(0).addClass("an-show");
     (function($, window, document, undefined) {
       "use strict";
       var init = function(ele, opt) {
         this.$element = ele,
         this.eleUl = this.$element.find("ul"),
         this.eleLi = this.eleUl.find("li"),
         this.eleLiW = this.$element.width(),
         this.eleLiH = this.$element.height(),
         this.eleLiN = this.eleLi.length,
         this.eleLeft = this.$element.find(".btn-fl"),
         this.eleRight = this.$element.find(".btn-fr"),
         this.eleBtn = this.$element.find(".btn-a"),
         this.eleBtnA = null,
         this.eleTimer = null,
         this.eleInow = 0;
         this.defaults = {
           "mode": "move", //选择切换模式move是滚动opacity透明度
           "tabMode": "hover", //底部移入切换hover点击切换click
           "autoPlay": false, //自动滚动
           "timerSpeed": 2000, //定时器速度速度
           "speed": 300, //滚动速度
           "width": 0, //默认宽度为0自适应宽度,
           "direction": "left" //方向默认为左滚动
         },
         this.options = $.extend({}, this.defaults, opt);
       }
       init.prototype = {
         beautify: function() {
           var This = this;
           if (This.options.width != 0) {
             This.eleLiW = This.options.width;
           }
           if (This.options.direction == "left") {
             this.eleUl.css({
               width: This.eleLiW * This.eleLiN * 2,
             })
           } else if (This.options.direction == "top") {
             this.eleUl.css({
               height: This.eleLiH * This.eleLiN * 2,
             })
           }
           $(window).resize(function() {
             This.eleLiW = This.$element.width();
             This.eleLiH = This.$element.height();
             if (This.options.direction == "left") {
               This.eleUl.css({
                 width: This.eleLiW * This.eleLiN * 2,
                 "left": -This.eleLiW * This.eleInow
               })
               This.eleLi.css({
                 width: This.eleLiW
               })
             } else if (This.options.direction == "top") {
               This.eleUl.css({
                 "height": This.eleLiH * This.eleLiN * 2,
                 "top": -This.eleLiH * This.eleInow
               })
               This.eleLi.css({
                 width: This.eleLiW,
                 height: This.eleLiH
               })
             }
           })
           if (this.eleBtn.length > 0) { //是否增加下边切换
             if (this.eleBtn.find("a").length == 0) { //是否有预先预留的切换按钮
               this.eleLi.each(function(i) {
                 if (i == 0) {
                   This.eleBtn.append('<a href="javascript:;" class="active"><b></b></a>');
                 } else {
                   This.eleBtn.append('<a href="javascript:;"><b></b></a>');
                 }
               })
             }

             this.eleBtnA = this.eleBtn.find("a");
             if (this.options.tabMode == "hover") { //底部切换移动
               this.eleBtnA.mouseover(function() {
                 This.eleInow = $(this).index();
                 This.animate();
               })
             } else if (this.options.tabMode == "click") {
               this.eleBtnA.click(function() {
                 This.eleInow = $(this).index();
                 This.animate();
               })
             }
           }
           if (This.options.mode == "opacity") {
             This.eleLi.siblings("li").css({
               "opacity": "0",
               "zIndex": "1",
               "position": "absolute",
               "top": "0",
               "left": "0"
             }).eq("0").css({
               "opacity": "1",
               "zIndex": "2"
             });
           }
           if (this.options.mode == "move") { //是否无缝滚动
             this.eleUl.append(this.eleUl.html());
             this.eleLi = this.eleUl.find("li");
             if (This.options.direction == "left") {
               this.eleLi.css({
                 width: this.eleLiW
               })
             } else if (This.options.direction == "top") {
               this.eleLi.css({
                 height: This.eleLiH
               })
             }
           }
           if (this.eleLeft.length > 0) { //左边切换按钮
             this.eleLeft.click(function() {
               This.eleInow--;
               This.animate();
             })
           }
           if (this.eleRight.length > 0) { //右边切换按钮
             this.eleRight.click(function() {
               This.eleInow++;
               This.animate();
             })
           }
           if (this.options.autoPlay) { //是否自动滚动
             This.autoPlay(); //开启自动滚动
             this.$element.mouseover(function() {
               clearInterval(This.eleTimer);
             })
             this.$element.mouseout(function() {
               This.autoPlay();
             })
           }
         }
       }
       init.prototype.autoPlay = function() {
         var This = this;
         This.eleTimer = setInterval(function() {
           This.eleInow++;
           This.animate();
         }, This.options.timerSpeed)
       }
       init.prototype.animate = function() {
         var This = this;
         if (This.options.mode == "move") {
           if (This.options.direction == "left") {
             if (This.eleInow > This.eleLiN) {
               This.eleInow = "1";
               This.eleUl.css({
                 "left": "0"
               });
             } else if (This.eleInow < 0) {
               This.eleInow = This.eleLiN - 1;
               This.eleUl.css({
                 "left": -This.eleLiW * This.eleLiN + 1
               });
             }
             if (This.eleInow > This.eleLiN) {
               This.eleInow = "1";
               This.eleUl.css({
                 "left": "0"
               });
             } else if (This.eleInow < 0) {
               This.eleInow = This.eleLiN - 1;
               This.eleUl.css({
                 "left": -This.eleLiW * This.eleLiN + 1
               });
             }
             This.eleUl.stop(false, false).animate({
               "left": -This.eleLiW * This.eleInow
             }, This.options.speed)
           } else if (This.options.direction == "top") {
             if (This.eleInow > This.eleLiN) {
               This.eleInow = "1";
               This.eleUl.css({
                 "top": "0"
               });
             } else if (This.eleInow < 0) {
               This.eleInow = This.eleLiN - 1;
               This.eleUl.css({
                 "top": -This.eleLiH * This.eleLiN + 1
               });
             }
             if (This.eleInow > This.eleLiN) {
               This.eleInow = "1";
               This.eleUl.css({
                 "top": "0"
               });
             } else if (This.eleInow < 0) {
               This.eleInow = This.eleLiN - 1;
               This.eleUl.css({
                 "top": -This.eleLiH * This.eleLiN + 1
               });
             }
             This.eleLi.eq(This.eleInow).addClass("an-show").siblings("li").removeClass("an-show").addClass("an-hide");
             This.eleUl.css({
               "top": -This.eleLiH * This.eleInow
             })
           }
         } else if (This.options.mode == "opacity") {
           if (This.eleInow > This.eleLiN - 1) {
             This.eleInow = "0";
           } else if (This.eleInow < 0) {
             This.eleInow = This.eleLiN - 1;
           }
           This.eleLi.siblings("li").css({
             "opacity": "0",
             "zIndex": "1"
           }).eq(This.eleInow).css({
             "z-index": "2"
           }).stop(false, false).animate({
             "opacity": "1"
           }, This.options.speed)
         }
         if (this.options.tabMode == "hover" || this.options.tabMode == "click") {
           if (This.eleInow == This.eleLiN) {
             This.eleBtnA.removeClass("active").eq(0).addClass("active");
           } else {
             This.eleBtnA.removeClass("active").eq(This.eleInow).addClass("active");
           }
         }
       }
       $.fn.myBanner = function(options) {
         var Init = new init(this, options);
         return Init.beautify();
       }
     })(jQuery, window, document);
     //Banner轮播
     $(".banner-max").myBanner({
       "mode": "move",
       "tabMode": "hover",
       "autoPlay": true,
       "timerSpeed": 4000,
       "speed": 200,
       "direction": "top"
     });
     var HistUl = $(".hist-ul"),
       HistLi = $(".hist-ul li"),
       HistLiW = HistLi.width(),
       HistPage = 0;
     HistInit();

     function HistInit() {
       HistPage = 0;
       HistUl.css({
         "width": HistLiW * HistLi.length,
         "left": -HistLiW * HistPage
       })
     }

     $(".hist-ul li").click(function() { //发展历史点击
       This = $(this);
       HistPage = This.index();
       HistUl.css({
         "left": -(HistLiW * HistPage - $(window).width() / 2 + HistLiW / 2)
       })
     })
     //新闻区域
     var NewsPage = 0;
     var NewsUl = $(".news-ul");
     $(".news-one-box").eq(0).addClass("active");
     $(".news-one-box").mouseover(function() {
       $(".news-one-box").removeClass("active");
       $(this).addClass("active");
       NewsPage = $(this).index();
       NewsAnimate();
     })
     $(".news-btn-top").click(function() {
       NewsPage--;
       NewsAnimate();
     })
     $(".news-btn-down").click(function() {
       NewsPage++;
       NewsAnimate();
     })

     function NewsAnimate() {
       if (NewsPage < 0) {
         NewsPage = $(".news-ul li").length - 1;
       }
       if (NewsPage > $(".news-ul li").length - 1) {
         NewsPage = 0;
       }
       $(".news-ul li").eq(NewsPage).addClass("active").siblings("li").removeClass("active");
       $(".news-one-box").removeClass("active");
       $(".news-one-box").eq(NewsPage).addClass("active");
       NewsUl.css({
         "top": -480 * NewsPage
       })
     }
     //新闻区域结束
     // 合作伙伴
     var CarouUl = $(".carou-ul"),
       Carou = $(".carou"),
       CarouLi = $(".carou-ul li"),
       ThisImg = null,
       CarouThis = null;

     CarouAnimate();
     CarouLi.click(function() {
       This = $(this);
       CarouPage = This.index();
       CarouAnimate();
       Caroufr();
     })

     function CarouAnimate() {
       CarouThis = CarouLi.eq(CarouPage);
       CarouThis.addClass("active").siblings("li").removeClass("active");
       CarouUl.css({
         "top": -(CarouThis.position().top - mHeight / 2 + CarouThis.outerHeight() / 2)
       })
     }
     var CarouFrBox = $(".carou-fr-box"),
       CarouLeft = $(".carou-left"),
       CarouRight = $(".carou-right"),
       CarouFrUl = $(".carou-fr-box ul"),
       CarouFrUlLi = $(".carou-fr-box ul li");
     CarouLeft.click(function() {
       CarouPage--;
       if (CarouPage < 0) {
         CarouPage = CarouLi.length - 1;
       }
       Caroufr();
       CarouAnimate();
     })
     CarouRight.click(function() {
       CarouPage++;
       if (CarouPage > CarouLi.length - 1) {
         CarouPage = 0;
       }
       Caroufr();
       CarouAnimate();
     })
     Caroufr();
     $(window).resize(function() {
       Caroufr();
     })

     function Caroufr() {
       CarouFrUlLi.height(mHeight);
       CarouFrUlLi.removeClass("active").eq(CarouPage).addClass("active");
       CarouFrUl.css({
         "top": -mHeight * CarouPage
       })
     }
     $(".menu-hover").mouseover(function(){
      $(".menu-hover").removeClass("menu-active");
      $(this).addClass("menu-active");
     })
      $(".menu-hover").mouseout(function(){
      $(".menu-hover").removeClass("menu-active");
     })
     //合作伙伴结束
     // ListMax.addClass("animate").css({ //当前页码
     //   "top": -(mHeight * 5),
     //   "transition": "all 0s ease-in-out"
     // })
     // Page = 5;
     // List.eq(Page).addClass("list-animate");
      //  $(".product ul li").mouseover(function(){
      //   $(this).find(".product-bg").height("700px");
      // })

   })