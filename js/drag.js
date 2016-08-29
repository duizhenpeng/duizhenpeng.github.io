function drag(obj,site,fn){
	var dmW = document.documentElement.clientWidth || document.body.clientWidth
	var dmH = document.documentElement.clientHeight || document.body.clientHeight
	var site = site || {};
	var adsorb = site.n || 0;
	var l = site.l || 0;
	var r = (site.r || site.r==0)?site.r:dmW - obj.offsetWidth;
	var t = site.t || 0;
	var b = (site.b || site.b==0)?site.b:dmH - obj.offsetHeight;
	obj.onmousedown=function(ev){
		var oEvent = ev || event;
		var siteX = oEvent.clientX-obj.offsetLeft;
		var siteY = oEvent.clientY- obj.offsetTop;
		if(obj.setCapture){
			obj.onmousemove=move;
			obj.onmouseup=up;
			obj.setCapture();
		}else{
			document.onmousemove=move;
			document.onmouseup=up;
		}
		function move(ev){
			var oEvent = ev || event;
			var iLeft = oEvent.clientX - siteX;
			var iTop = oEvent.clientY - siteY;
			if(iLeft <=l+adsorb){
				iLeft=0;
			}
			if(iLeft >=r-adsorb){
				iLeft= r;
			}
			if(iTop<=t+adsorb){
				iTop =0;
			}
			if(iTop >=b-adsorb){
				iTop = b;
			}
			if(fn){
				fn({left:iLeft,top:iTop})
			}else{
				obj.style.left = iLeft + 'px';
				obj.style.top = iTop + 'px';
			}
		}
		function up(){
			this.onmousemove=null;
			this.onmouseup=null;
			if(obj.setCapture){
				obj.releaseCapture();
			}
		}
		return false;
	}


}