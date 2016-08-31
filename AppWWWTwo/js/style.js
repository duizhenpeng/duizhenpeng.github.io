$(function() {
  $(".ico-2").click(function() {
    if (oStop) {
      oStop = false;
      $(".qr-box").hide();
      $(".ico-2-tips").show();
      $(".fixed-qr-box").show();
      setTimeout(function() { //规避显示隐藏时动画效果无效
        $(".fixed-mark").addClass("fixed-mark-show");
        $(".qr-box").addClass("qr-box-show");
      }, 1);
      setTimeout(function() {
        oStop = true;
      }, 70)
    }
  })
  var oStop = true;
  $(".ico-3").click(function() { //在手机上查看此页面
    if (oStop) {
      oStop = false;
      $(".qr-box").hide();
      $(".qr-code").show();
      $(".fixed-qr-box").show();
      setTimeout(function() { //规避显示隐藏时动画效果无效
        $(".fixed-mark").addClass("fixed-mark-show");
        $(".qr-box").addClass("qr-box-show");
      }, 1);
      setTimeout(function() {
        oStop = true;
      }, 70)
    }
  })
  $(".fixed-mark").click(function() {
    oVerdict();
  })
  $(".qr-close").click(function() {
    oVerdict();
  })

  function oVerdict() { //在手机上查看此页面关闭
    if (oStop)
      oStop = false;
    $(".fixed-qr-box").addClass("fixed-box-animate");
    setTimeout(function() {
      $(".fixed-mark").removeClass("fixed-mark-show");
      $(".qr-box").removeClass("qr-box-show");
    }, 10)
    setTimeout(function() {
      $(".fixed-qr-box").hide();
      $(".qr-box").hide();
      oStop = true;
    }, 300)
  }
  Visual($(".bright-1"), 100);
  Visual($(".bright-2"), 100);
  Visual($(".bright-3"), 100);
  Visual($(".bright-4"), 100);
  VisualTxt($(".phone-2"), 100);

  function Visual(obj, speed, dir) {
    $(window).mousemove(function(e) {
      var x = e.clientX,
        y = e.clientY,
        clientWidth = $(window).width(),
        clientHeight = $(window).height();

      obj.css({
        "transform": "translate3d(" + (x - clientWidth / 2) / speed + "px," + (y - clientHeight / 2) / speed + "px, 0px)"
      });
    })
  }

  function VisualTxt(obj, speed, dir) {
    $(window).mousemove(function(e) {
      var x = e.clientX,
        y = e.clientY,
        clientWidth = $(window).width(),
        clientHeight = $(window).height();
      obj.css({
        "transform": "translate3d(" + -(x - clientWidth / 2) / speed + "px," + -(y - clientHeight / 2) / speed + "px, 0px)"
      });
    });
  }

  $(window).resize(function() {
    PhoneCss();
  })
  PhoneCss();

  function PhoneCss() {
    var ua = navigator.userAgent;
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
      isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
      isAndroid = ua.match(/(Android)\s+([\d.]+)/),
      isMobile = isIphone || isAndroid;
    if (isMobile) {
      $("body").addClass("body-600");
    } else {
      $("body").removeClass("body-600");
    }
  }
  // $(window).resize(function(){
  //   PhoneCss();
  // })
  // PhoneCss();
  // alert($(window).width())
  // function PhoneCss(){
  //  if( $(window).width() > 600 ){
  //   $("body").removeClass("body-600");
  //  }else{
  //   $("body").addClass("body-600");
  //  }
  // }
})