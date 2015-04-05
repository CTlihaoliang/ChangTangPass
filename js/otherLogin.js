
$(function () {
    //性别选择事件
    $(".ifo_input .sex").click(function () {
        if ($(this).hasClass("sex_1")) {
            $(this).addClass("checked").removeClass("unchecked").siblings("a").removeClass("checked").addClass("unchecked");
            $(this).siblings("i").after($(this).siblings("a"));
            $(this).siblings("input").val(0);
        } else {
            $(this).addClass("checked").removeClass("unchecked").siblings("a").removeClass("checked").addClass("unchecked");
            $(this).siblings("i").before($(this));
            $(this).siblings("input").val(1);
        }
    });


    if (resetsubmitButton) { resetsubmitButton(); }
    //注册事件
    $("#nick").ctValidate();
    $('#VForm').submit(function (event) {
        var isPass = formValidate(this);
        if (!isPass) {
            //event.preventDefault();
            return false;
        } else {
            $.dialog.tips('正在登录...', 600, 'loading.gif');
            return true;
        }
    });
});

/*初始化提交按钮(submit)*/
var resetsubmitButton = function () {
    $(":submit").each(function () {
        var $this = $(this);
        $this.removeAttr('disabled'); ///移除submit的disabled属性
        var normalText = $this.attr('normalText');
        if (normalText) {
            $this.val(normalText);
        }
    });
};
/*提示消息框*/
function showMsg(msg, callback) {
    if ($ && $.dialog && $.dialog.alert) {
        $.dialog.alert(msg, callback);
    } else {
        alert(msg);
        if (callback && typeof callback == 'function') {
            callback();
        }
    }
}
/*关闭提示信息*/
function closeDialog() {
    try {
        if (resetsubmitButton) { resetsubmitButton(); }
        $.dialog.closeAll();
    } catch (e) {
    }
}
/*数据保存成功*/
function saveSuccessed() {
    try {
        if (resetsubmitButton) { resetsubmitButton(); }
        if ($ && $.dialog && $.dialog.tips) {
            $.dialog.tips('保存成功,正在加载数据...', 600, 'loading.gif');
        }
        top.location = top.location;
    } catch (e) {
    }
}
