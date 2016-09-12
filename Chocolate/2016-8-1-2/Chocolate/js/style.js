var MaxHeight,
  ContWidth,
  Lw,
  wLeft,
  MaxWidth,
  BarRange,
  BarWdith,
  InimWidth,
  ClickLeft,
  mWidth;

$(function(){

  MainHeight();
  $(window).resize(function(){
    MainHeight();
  });
  function MainHeight(){
  	MaxHeight = $(window).height()-36;
    MaxWidth = $(window).width()
  	 $("#content").height(MaxHeight);//内容区域高度
  	 $(".list-1 .list-ul").eq(0).width( 309 * ( MaxHeight/3 ) / 295 );//列表区域宽度
  	 $(".list-1").width($(".list-ul .list-ul").eq(0).width());
     $(".cot-m").height( MaxHeight - 173 );
     BarRange = MaxWidth - $(".bar-move").width();//可拖动的范围
     $(".nav-2-m").height((MaxHeight)/2-147);
  	 ContWidth();
  }
  function ContWidth(){
    Lw = 0;
    $(".list").each(function(i){
      Lw+=$(".cot-list").eq(i).width() + $(".list").eq(i).width();
    })
    mWidth = 0;
    $(".list").each(function(i){
      mWidth+=$(".list").eq(i).width();
    })
    InimWidth = $("#banner-box").width() + Lw + $(".nav-2").width() + $(".main-7").width()+1;
  	CWidth = $("#banner-box").width() + Lw + $(".nav-2").width() + $(".main-7").width()+1;
  	$(".cont").width(CWidth);
    if( (-parseInt($(".cont").css("left"))) + $(window).width() > $(".cont").width() ){
      $(".cont").animate({
        "left" :  -(CWidth - $(window).width())
      },300)
    }
     // wLeft = This.parents(".list").prev(".cot-list").position().left;
     //      if( wLeft > $(".cont").width() - $(window).width() ){
     //         wLeft =  $(".cont").width() - $(window).width();
     //      }
  }
(function($, window, document, undefined) {
    "use strict";
    var init = function(ele, opt) {
      this.$element = ele,
      this.eleUl = this.$element.find("ul"),
      this.eleLi = this.eleUl.find("li"),
      this.eleLiW = this.$element.width(),
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
        "width": 0 //默认宽度为0自适应宽度
      },
      this.options = $.extend({}, this.defaults, opt);
    }
    init.prototype = {
      beautify: function() {
        var This = this;
        if (This.options.width != 0) {
          This.eleLiW = This.options.width;
        }
        this.eleUl.css({
          width: This.eleLiW * This.eleLiN * 2,
        })
        if (This.options.width == 0) {
	        $(window).resize(function() {
	          This.eleLiW = This.$element.width();
	          This.eleUl.css({
	            width: This.eleLiW * This.eleLiN * 2,
	            "left": -This.eleLiW * This.eleInow
	          })
	          This.eleLi.css({
	            width: This.eleLiW
	          })
       		 })
	      }
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
          this.eleLi.css({
            width: this.eleLiW
          })
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
   $("#banner-box").myBanner({
      "mode": "opacity",
      "tabMode": "click",
      "autoPlay": true,
      "timerSpeed": 4000,
      "speed": 800,
      "width" : "100%"
    });
   $(".click-menu").click(function(){//点击打开菜单
   	$("body").removeClass("menu-show-exit").addClass("menu-show");
   })
   $(".menu-exit").click(function(){//点击关闭菜单
   	$("body").addClass("menu-show-exit").removeClass("menu-show");
   })
   var Mouse = true;
   var This;
     $("body").on("mouseover",".list-4-m",function(){//移入判断是否有滚动条
    This = $(this);
    if( This.height() < This.find(".list-4-cot").height() ){
      Mouse = false;
    }
   })
  $("body").on("mouseout",".list-4-m",function(){
      Mouse = true;
   })
   $("body").on("mouseover",".nav-m",function(){//移入判断是否有滚动条
    This = $(this);
    if( This.height() < This.find(".nav").height() ){
      Mouse = false;
    }
   })
  $("body").on("mouseout",".nav-m",function(){
      Mouse = true;
   })
   $("body").on("mouseover",".cot-m",function(){//移入判断是否有滚动条
    This = $(this);
    if( This.height() < This.find(".cot").height() ){
      Mouse = false;
    }
   })
  $("body").on("mouseout",".cot-m",function(){
   		Mouse = true;
   })
   $("body").on("mouseover",".nav-2-m ",function(){//移入判断是否有滚动条
    This = $(this);
    if( This.height() < This.find(".nav").height() ){
      Mouse = false;
    }
   })
  $("body").on("mouseout",".nav-2-m",function(){
      Mouse = true;
   })
    $("body").on("mouseover",".list-4-x",function(){//移入判断是否有滚动条
    This = $(this);
    console.log(This.height(),MaxHeight / 2 )
    if( This.height() < $(".list-4-y").height() ){
      Mouse = false;
    }
   })
  $("body").on("mouseout",".list-4-x",function(){
      Mouse = true;
   })
   var ContLeft;
   var Scope;
   $("#content").mousewheel(function(ev,delta){//滚动条判断
   	if( Mouse ){
      Mouse = false;
      ContLeft = parseInt($(".cont").css("left"));
      if( delta >0 ){//向上滚动
        ContLeft+=300;
       if( ContLeft > 0 ){
         ContLeft = 0;
        }
        ContStar(ContLeft);//滚动条滚动
        $(".cont").animate({
          "left" : ContLeft
        },300,function(){
          Mouse = true;
        })
      }else{//向下滚动
        ContLeft-=300;
        Scope = $(".cont").width() - $(window).width();
        if( Scope > 0 ){
          if( Math.abs( ContLeft ) > Scope ){
            ContLeft = -Scope;
          }
          ContStar(ContLeft);//滚动条滚动
          $(".cont").animate({
            "left" : ContLeft
          },300,function(){
           Mouse = true;
          })
        }
      }
     }
  })
   var ListWidth;
   $("body").on("click",".list-ul li",function(){
      This = $(this);
      if( $(this).hasClass("active") != true ){
        if( $(this).parents(".list").hasClass("list-1") ){//点击第一个列
          $(".cot-list-1").html('');
          $.ajax({
            type: "GET",
            url: "list-1.txt",
            data: "1",
            success: function(data) {
               $(".cot-list-1").html(data);
               MaxHeight = $(window).height()-38;
               $(".cot-m").height( MaxHeight - 173 );
            }
          })
        }
        if( $(this).parents(".list").hasClass("list-2") ){//点击第二个列
          $(".cot-list-2").html('');
          $.ajax({
            type: "GET",
            url: "list-2.txt",
            data: "1",
            success: function(data) {
               $(".cot-list-2").html(data);
                MaxHeight = $(window).height()-38;
               $(".cot-m").height( MaxHeight - 173 );
            }
          })
        }
         if( $(this).parents(".list").hasClass("list-3") ){//点击第三个列
          $(".cot-list-3").html('');
          $.ajax({
            type: "GET",
            url: "list-3.txt",
            data: "1",
            success: function(data) {
               $(".cot-list-3").html(data);
                MaxHeight = $(window).height()-38;
               $(".cot-m").height( MaxHeight - 173 );
            }
          })
        }
        if( $(this).parents(".list").hasClass("list-4") ){//点击第三个列
          $(".cot-list-4").html('');
          $.ajax({
            type: "GET",
            url: "list-4.txt",
            data: "1",
            success: function(data) {
               $(".cot-list-4").html(data);
                MaxHeight = $(window).height()-38;
               $(".cot-m").height( MaxHeight - 173 );
            }
          })
        }
         if( $(this).parents(".list").hasClass("list-5") ){//点击第三个列
           $(".cot-list-5").html('');
          $.ajax({
            type: "GET",
            url: "list-5.txt",
            data: "1",
            success: function(data) {
                $(".cot-list-5").html(data);
                MaxHeight = $(window).height()-38;
               $(".cot-m").height( MaxHeight - 173 );
            }
          })
        }
         if( $(this).parents(".list").hasClass("list-6") ){//点击第一个列
          $(".cot-list-6").html('');
          $.ajax({
            type: "GET",
            url: "list-6.txt",
            data: "1",
            success: function(data) {
               $(".cot-list-6").html(data);
                MaxHeight = $(window).height()-38;
               $(".cot-m").height( MaxHeight - 173 );
            }
          })
        }
        // if(  $(this).parents(".list").prev(".cot-list").width() == 0 ){
        //   $(".cot-list").width("0");
        // }else{

        // }
        ClickLeft = This.parents(".list").prev(".cot-list").position().left;
        $(".cot-list").width("0");

        ListWidth = parseInt($(this).parents(".list").prev(".cot-list").attr("max-width"));
        $(".list-ul li").removeClass("active");
        $(this).addClass("active").siblings("li");
        Lw = 0;
        $(".list").each(function(i){
          Lw+=$(".cot-list").eq(i).width() + $(".list").eq(i).width();
        })
        CWidth = $("#banner-box").width() + Lw+ ListWidth + $(".nav-2").width() + $(".main-7").width() +1;
        wLeft = This.parents(".list").prev(".cot-list").position().left;
        // $(".cont").css({
        //    "width" : InimWidth,
        //    "left" : parseInt($(this).css("left"))-765
        //  })
        if( wLeft > InimWidth - $(window).width() +765 ){
           wLeft =  CWidth - $(window).width() ;
             $(".cont").css({
              "width" : CWidth-765,
              "left" : -wLeft+765
             })
        }else if( ClickLeft > wLeft ){
          $(".cont").css({
           "width" : CWidth-765,
           "left" : -wLeft+765*2
         })
        }else{
            $(".cont").css({
             "width" : CWidth-765,
             "left" : -wLeft+765
           })
        }

        $(".cont").stop(false,true).animate({
          "width" : CWidth,
          "left" : -wLeft
        },500)
        $(this).parents(".list").prev(".cot-list").stop(true,true).animate({
          "width" : "765"
        },500,function(){
          This.parents(".list").prev(".cot-list").siblings(".cot-list").width("0");
        })
        ContStar("-"+wLeft);//滚动条滚动
      }
   })
   $("body").on("click",".cot-exit",function(){
      $(this).parents(".cot-list").next(".list").find(".list-ul li").removeClass("active");
    This = $(this);
       wLeft = This.parents(".cot-list").position().left;


      // $(".cont").stop(false,true).animate({
      //     "width" : mWidth,
      //     "left" : -wLeft
      //   },500)
      $(this).parents(".cot-list").stop(true,true).animate({
        "width" : "0"
      },500,function(){
        // MainHeight();
      })

       wLeft = This.parents(".cot-list").position().left;
        console.log( InimWidth - wLeft -765-310,$(window).width())
       if( InimWidth - wLeft -765-310  >  0 ){
         $(".cont").stop(false,true).animate({
           "width" : InimWidth,
           "left" : -wLeft +766
         })
       }else{
         $(".cont").css({
           "width" : InimWidth,
            "left" : -(InimWidth -$(window).width())
         })
         // $(".cont").stop(false,true).animate({
         //   "width" : InimWidth
         // })
       }

   })
$(".list-3").each(function(i){
  $(".list-3").eq(2*i).addClass("list-5-dou");
})
$(".list-5").each(function(i){
  $(".list-5").eq(2*i).addClass("list-5-dou");
})
var BarMove = $(".bar-move"),
    BarLeft,
    Dis,
    OlClientX,
    ClientX;
    BarWdith = $(".bar-move").width();
$("body").on("mousedown",".bar-down",function(ev){
  OlClientX = ev.clientX || event.clientX;
  Dis =  OlClientX - parseInt( BarMove.css("left") );
  $(window).bind("mousemove",function(ev){
    ClientX = ev.clientX || event.clientX;
    BarLeft = ClientX - Dis;
    if( BarLeft < 0 ){
      BarLeft = 0;
    }else if ( BarLeft > BarRange ){
      BarLeft = BarRange;
    }
    BarMove.removeClass("bar-down-animate").css({
      "left" : BarLeft
    })
    BarStar();
    ev.stopPropagation();
    return false;
  })
})
  $(".t-menu-box ul li").click(function(){
    This = $($(this).attr("obj"));
    SkipLeft(This);
  })
  function SkipLeft(SkipThis){
    $("body").removeClass("menu-show");
    $(".cont").addClass("cont-animate").css({
       "left" : - SkipThis.position().left
     })
    setTimeout(function(){
      $(".cont").removeClass("cont-animate");
    },300)
    BarMove.addClass("bar-down-animate").css({
      "left" : - BarRange * parseInt( - SkipThis.position().left )/ (CWidth-MaxWidth)
    })
  }
function BarStar(){//根据滚动条值计算内容距离
  $(".cont").css({
    "left" : - (CWidth-MaxWidth) * BarLeft / BarRange
  })
}
function ContStar(obj){//根据内容值计算滚动条距离
  BarMove.addClass("bar-down-animate").css({
    "left" : - BarRange * parseInt( obj || $(".cont").css("left")  )/ (CWidth-MaxWidth)
  })
}
$(window).on("mouseup",function(){
  $(window).unbind("mousemove");
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
$(".cont").css({
    "left" : -$(".list-4").position().left,
    "width" : CWidth
  })

})
