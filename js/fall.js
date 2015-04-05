/*
*option range
*hp:0~1,
*vp:0~1,
*sp:20~1000
*/
function fall(option) {
 var  ele = option.ele,
       hp = option.hp || 0.04,
       vp = option.vp || 0.7,
       sp = option.sp || 30;
 callback = option.callback || function(){};
 var f=$("#"+ele).get(0);
     if(f == null) return;
     f.style.display = "block"
     f.style.right='0px';
     f.style.bottom='40px';
 var i = null;
     i&&clearInterval(i);
 var h=1,v=1,hp=(hp>0&&hp<1)?hp:0.2,vp=(vp>0&&vp<1)?vp:0.5,sp=(sp>20 || sp<1000)?sp:30;
     i=setInterval(function(){
      if(f){
        var r=parseInt(f.style.right)+h,b=parseInt(f.style.bottom)-v;
        f.style.right=r+'px';
        f.style.bottom=b+'px';
        if(r>1000)clearInterval(i);
        if(b>-210){
          v+=2
        } else {
          h=(v>0)?v*hp:0;
          v*=(v>0)?-1*vp:0
        }
      }
     },sp);
   $(".close").bind("click",callback)
  }

  function GetCookie(nm) {
    var m = null;
    if (window.RegExp) {
        var re = new RegExp(";\\s*" + nm + "=([^;]*)", "i");
        m = re.exec(';' + document.cookie);
    }
    return (m ? unescape(m[1]) : null);
}

// 设置cookie值
function SetCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 86400000));
        expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + escape(value) + expires + ";path=/";
}
