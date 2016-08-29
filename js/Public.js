 function LeftList(obj, objul) {
   var oIco = obj.find(".ico");
   var oSlide = obj;
   var oUl = objul.eq(0);
   var aLi = obj.find("li");
   for (var i = 0; i < aLi.length; i++) {
     var ahtml = document.createElement('a'); //创建一个li
     oIco.append(ahtml); //在li里边的第一个里插入
   }
   var aBtn = oIco.find("a");
   aBtn[0].className = 'active';
   var oBtnLeft = obj.find(".btnLeft");
   var oBtnRight = obj.find(".btnRight");
   var oLeftBot = obj.find(".btnLeft-Botton");
   var oRightBot = obj.find(".btnRight-Botton");
   var baseWidth = aLi.eq(0).width(); //一个li的宽度
   //复制
   var oImgList = aLi.eq(0).clone(true);
   oUl.append(oImgList);
   oUl.css({
     width: baseWidth * (aLi.length + 1)
   })
   var iNow = 0;
   var t = null;
   for (var i = 0; i < aBtn.length; i++) {
     aBtn[i].index = i;
     aBtn[i].onclick = function() {
       move(this.index)
       iNow = this.index;
     }
     aBtn[i].onmouseover = function() {
       move(this.index)
       iNow = this.index;
     }
   }
   oBtnLeft.mouseover(function() {
     oLeftBot.css({
       opacity: "1"
     })
   })
   oBtnLeft.mouseout(function() {
     oLeftBot.css({
       opacity: ".8"
     })
   })
   oBtnRight.mouseover(function() {
     oRightBot.css({
       opacity: "1"
     })
   })
   oBtnRight.mouseout(function() {
     oRightBot.css({
       opacity: ".8"
     })
   })

   time();

   function time() {
     t = setInterval(function() {
       iNow++
       move(iNow)
     }, 3000)
   }
   oSlide.mouseover(function() {
     clearInterval(t);
     oLeftBot.show();
     oRightBot.show();
     oBtnRight.show();
     oBtnLeft.show();
   })
   oSlide.mouseout(function() {
     time();
     oLeftBot.hide();
     oRightBot.hide();
     oBtnRight.hide();
     oBtnLeft.hide();
   })
   oBtnLeft.click(function() {
     iNow--;
     move(iNow)
   })
   oBtnRight.click(function() {
     iNow++;
     move(iNow)
   })

   function move(index) {
     //拉到第一个
     //运动到第二
     if (index > aLi.length) {
       oUl.css({
         left: 0
       }) //拉到第一个
       index = 1;
       iNow = index;
     }
     //拉到最后一个
     //运动到倒数第二
     if (index < 0) {
       oUl.css({
         left: -(aLi.length) * baseWidth
       }) //拉到最后一个
       index = aLi.length - 1;
       iNow = index;
     }
     for (var i = 0; i < aBtn.length; i++) {
       aBtn[i].className = '';
     }
     if (index == aBtn.length) {
       aBtn[0].className = 'active';
     } else {
       aBtn[index].className = 'active';
     }

     objul.stop(true, false).animate({
       left: -index * baseWidth
     }, 400)
   }
 }
 //轮播图
 $(function() {
  //input选中
  $(".input-txt").each(function(i){
    $(this).attr("val",$(this).val());
  })
  $(".input-txt").focus(function(){
    if($(this).val()==$(this).attr("val")){
      $(this).val("");
    }
  })
  $(".input-txt").blur(function(){
    if($(this).val()==""){
      $(this).val($(this).attr("val")).css({color:"#bababa"});
    }
  })

  //实用有趣
  $(".list-hover li").mouseover(function(){
    $(this).addClass("active").siblings("li").removeClass("active");
  })
  $(".list-hover li").mouseout(function(){
    $(".list-hover li").removeClass("active");
  })
  // 切换点击
  $(".guarantee-tit span").each(function(i){
    $(this).click(function(){
      $(this).addClass("active").siblings("span").removeClass("active");
      $(".guaran-box ul").eq(i).show().siblings("ul").hide();
    })
  })
  // 登录窗
  var oStop = true;
    $(".lan-mark").height($(window).height());
    $(".landing").click(function(){
       if(oStop){
         oStop = false;
         $(".lan-hide").show();
          setTimeout(function(){//规避显示隐藏时动画效果无效
                $(".lan-mark").addClass("lan-mark-show");
                $(".lan-box").addClass("lan-box-show");
            },1);
          setTimeout(function(){
              oStop =true;
          },70)
        }
    })
    $(".ico-wei").mouseover(function(){
      $(this).addClass("ico-wei-hover")
    })
    $(".ico-wei").mouseout(function(){
      $(this).removeClass("ico-wei-hover")
      $(this).addClass("ico-wei-show")
    })
    $(".ico-qq").mouseover(function(){
      $(this).addClass("ico-wei-hover")
    })
    $(".ico-qq").mouseout(function(){
      $(this).removeClass("ico-wei-hover")
      $(this).addClass("ico-wei-show")
    })
    $(".exit").click(function(){
        oVerdict();
    })
    $(".lan-mark").click(function(){
        oVerdict();
    })
    function oVerdict() {
      if(oStop)
         oStop = false;
        $(".lan-box").addClass("lan-box-animate");//规避显示隐藏时动画效果无效
        setTimeout(function(){
          $(".lan-box").removeClass("lan-box-show");
          $(".lan-mark").removeClass("lan-mark-show")
        },600)
        setTimeout(function(){
          $(".lan-box").removeClass("lan-box-animate");
          $(".lan-box").removeClass("lan-box-show");
          $(".lan-mark").removeClass("lan-mark-show")
          $(".ico-qq").removeClass("ico-wei-show");
          $(".ico-wei").removeClass("ico-wei-show");
          $(".lan-hide").hide();
          oStop = true;
        },1200)
    }
    $(".click-input span").click(function(){
      $(this).prev().attr("checked",true).siblings("input").attr("checked",false);
    });
    $(".click-input input").click(function(){
       $(this).attr("checked",true).siblings("input").attr("checked",false);
    });
    //右侧固定高度宽度判断
   //右侧固定高度
   $("#toggle-nav").click(function(){
      if($("#toggle-nav").attr("class")!="header-button open"){
         $("#toggle-nav").addClass("open");
         $(".ranking-box").stop().animate({
            left: "0"
          },300)
      }else{
         $("#toggle-nav").removeClass("open");
          $(".ranking-box").stop().animate({
            left: -96
          },300)
      }
   })

   FixedHeight();
   $(window).resize(function(){
    $(".lan-mark").height($(window).height());
     FixedHeight();
   })
   function FixedHeight() {
     if($(".logo-left").offset().left<96){
      $("#toggle-nav").removeClass("open");
      $(".ranking-box").stop().animate({
        left: -96
      },300)
     }else{
      $("#toggle-nav").addClass("open");
      $(".ranking-box").stop().animate({
        left: "0"
      },300)
     }
     $(".ranking-box").css({
       height: $(window).height()
     })
   }
   //返回顶部
   $(".fh").click(function() { //点击返回顶部
     $('body,html').animate({
       scrollTop: 0
     }, 200);
   });
   $(window).scroll(function() {
     if ($(window).scrollTop() > 0) {
       $(".fh").addClass("fh-animate");
     } else {
       $(".fh").removeClass("fh-animate");
     };
   });

   //左侧菜单
   $(".ac-top-left").mouseover(function() {
     $(".menu-left").css({
       height: "450"
     });
   })
   $(".ac-top-left").mouseout(function() {
     $(".menu-left").css({
       height: "0"
     });
   })
   //shine
   $(".shine").mouseover(function() {
     $(".shine-down").css({
       height: "255"
     });
   })
   $(".shine").mouseout(function() {
     $(".shine-down").css({
       height: "0"
     });
   })
 })