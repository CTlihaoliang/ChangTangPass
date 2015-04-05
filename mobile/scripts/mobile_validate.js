$(function(){ 
	var sendSmsVerifyCode = function () {
    var $this = $(this);
    var time = 10;
    $this.addClass("disabled").prop("disabled", true);
    $this.html("正在发送验证码");
    $this.unbind('click',sendSmsVerifyCode);
    // $.ajax({
    //     type: "POST",
    //     url: "SendVerifyCode.aspx?method=sms",
    //     data: { mobile: mobile, mobileType: mobileType, hidRegFrom: from },
    //     dataType: "json",
    //     success: function (data) {
    //         if (data.Successed) {
                 countDown();
    //         } else {  
    //             alert(data.Message)
    //         }
    //     },
    //     error: function () {
    //         $this.removeClass("disabled").prop("disabled", false);
    //     }
    // });

    function countDown() {
        if (time == 0) {
            $this.removeClass("disabled").prop("disabled", false);
            $this.html("点击发送验证码");
            $this.bind("click",sendSmsVerifyCode);
        } else {
            time--;
            $this.html("<span>" + time + "秒</span>后重新获取");
            setTimeout(countDown, 1000);
        }
    }
};
 $(".ms_fun .getCode").bind("click",sendSmsVerifyCode);
 $("#Vform").submit(function(event) {
 	var value = $("#verify").val().replace(/\s*/,"");
 	var reg =  new RegExp("^[0-9]{6}$");
 	if (reg.test(value)) {
 		 return true;
 	} else if(value == ""){
       alert("验证码不能为空");    
    }else {
       alert("验证码输入不正确");   
    }
    event.preventDefault();
    return false;
 });
})