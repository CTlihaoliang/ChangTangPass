/*
author:@lihaoliang;
date:@2014-2-17;
*/
$(function () {
    //验证正则
    var validateRegExp = {
        chinese: "[\u4e00-\u9fa5]", //中文字符
        email: "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$", //邮件
        letter: "^[A-Za-z]+$", //字母
        mobile: "^(13|15|18|14|17)[0-9]{9}$", //手机
        notempty: "^\\S+$", //非空
        password: "^.*[A-Za-z0-9\\w_-]+.*$", //密码
        fullNumber: "^[0-9]+$", //数字
        username: "^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+$", //用户名
        code: "^[A-Za-z0-9]{4}$", //普通验证码
        mobileCode: "^[0-9]{6}$" //手机验证码
    };
    //主函数
    (function ($) {
        $.fn.ctValidate = function (callback) {
            var ele = this;
            var _type = ele.attr("id");
            var _error = $(".error ");
            ele.bind("focus", function () {
                validateSettings.onFocus.run({
                    element: ele,
                    errorEle: _error
                });
            });
            ele.bind("blur", function () {
                var str = $.trim(ele.val());
                if (validateRules.isNull(str)) {
                    validateSettings.isNull.run({
                        element: ele,
                        value: str,
                        type: _type,
                        errorEle: _error
                    });
                } else {
                    callback({
                        element: ele,
                        value: str,
                        type: _type,
                        errorEle: _error
                    });
                }
            });
        };
    })(jQuery);
    //配置
    var validateSettings = {
        onFocus: {
            run: function (option) {
                option.element.removeClass(validateSettings.INPUT_style2).addClass(validateSettings.INPUT_style1);
            }
        },
        isNull: {
            run: function (option) {
                if (option.value == "") {
                    option.element.attr("status", 0);
                    option.element.removeClass(validateSettings.INPUT_style1).addClass(validateSettings.INPUT_style2);
                    option.errorEle.removeClass("hidden").html(validatePrompt[option.type].isNull);
                } else {
                    option.element.removeClass(validateSettings.INPUT_style1).removeClass(validateSettings.INPUT_style2);
                    option.errorEle.addClass("hidden").html("");
                }

            }
        },
        validateUserName: {
            run: function (option) {
                var value = option.value;
                var type = option.type;
                var isExist = validateRules.isUserName(value, 1, 16) || validateRules.isMobile(value) || validateRules.isEmail(value);
                if (isExist) {
                    option.element.attr("status", 1);
                    option.element.removeClass(validateSettings.INPUT_style1).removeClass(validateSettings.INPUT_style2);
                    option.errorEle.addClass("hidden").html("");
                } else {
                    option.element.attr("status", 0);
                    option.element.removeClass(validateSettings.INPUT_style1).addClass(validateSettings.INPUT_style2);
                    option.errorEle.removeClass("hidden").html(validatePrompt[type].error.badLength);
                }
            }
        },
        validatePassword: {
            run: function (option) {
                var value = option.value;
                var type = option.type;
                var isExistBlank = value && (/\s/).test(value);
                if (isExistBlank) {
                    option.element.attr("status", 0);
                    option.element.removeClass(validateSettings.INPUT_style1).addClass(validateSettings.INPUT_style2);
                    option.errorEle.removeClass("hidden").html(validatePrompt[type].error.badFormat);
                    return;
                }
                var rule = validateRules.isPwd(value, 1, 16);
                if (rule) {
                    option.element.attr("status", 1);
                    option.element.removeClass(validateSettings.INPUT_style1).removeClass(validateSettings.INPUT_style2);
                    option.errorEle.addClass("hidden").html("");
                } else {
                    option.element.attr("status", 0);
                    option.element.removeClass(validateSettings.INPUT_style1).addClass(validateSettings.INPUT_style2);
                    option.errorEle.removeClass("hidden").html(validatePrompt[type].error.badLength);

                }

            }
        },
        validateCode: {
            run: function (option) {
                var value = option.value;
                var type = option.type;
                var isExist = true;
                var rule = validateRules.isCode(value);
                if (rule) {
                    option.element.attr("status", 1);
                    option.element.removeClass(validateSettings.INPUT_style1).removeClass(validateSettings.INPUT_style2);
                    option.errorEle.addClass("hidden").html("");
                } else {
                    option.element.attr("status", 0);
                    option.element.removeClass(validateSettings.INPUT_style1).addClass(validateSettings.INPUT_style2);
                    option.errorEle.removeClass("hidden").html(validatePrompt[option.type].error.badLength);

                }

            }
        },
        INPUT_style1: "highlight1",
        INPUT_style2: "highlight2"
    };
    //验证规则
    var validateRules = {
        isNull: function (str) {
            return (str == "" || typeof str != "string");
        },
        betweenLength: function (str, _min, _max) {
            return (str.length >= _min && str.length <= _max);
        },
        isUid: function (str) {
            return new RegExp(validateRegExp.username).test(str);
        },
        isUserName: function (str, _min, _max) {
            // var _len = str.length;
            // var _chineseLen = str.replace(/[^\u4e00-\u9fa5]/g, "").length;
            // var len = _len - _chineseLen + _chineseLen * 2;
            var len = mbStringLength(str);
            return (len >= _min && len <= _max);
        },
        isPwd: function (str, _min, _max) {
           // return (str.length >= _min && str.length <= _max && /^.*([\W_a-zA-z0-9-])+.*$/i.test(str));
           var len = mbStringLength(str);
           return (len >= _min && len<= _max);
        },
        isEmail: function (str) {
            return new RegExp(validateRegExp.email).test(str);
        },
        isCode: function (str) {
            return new RegExp(validateRegExp.code).test(str);
        },
        isTel: function (str) {
            return new RegExp(validateRegExp.tel).test(str);
        },
        isMobile: function (str) {
            return new RegExp(validateRegExp.mobile).test(str);
        }
    };
    //验证文本
    var validatePrompt = {
        username: {
            onFocus: "用户名长度只能在4-16位字符之间",
            succeed: "",
            isNull: "请输入用户名",
            error: {
                badLength: "请检查用户名是否输入正确",
                badFormat: "该用户名不存在"
            }
        },
        pwd: {
            onFocus: "密码长度只能在1-16位字符之间",
            succeed: "",
            isNull: "请输入密码",
            error: {
                badLength: "密码长度只能在1-16位字符之间",
                badFormat: "密码中不能含有空格"
            }
        },
        code: {
            onFocus: "验证码长度是4位字符",
            succeed: "",
            isNull: "请输入验证码",
            error: {
                badLength: "验证码错误"
            }
        }
    };
    //回调函数
    var validateFunction = {
        username: function (option) {
            validateSettings.validateUserName.run(option);
        },
        pwd: function (option) {
            validateSettings.validatePassword.run(option);
        },
        code: function (option) {
            validateSettings.validateCode.run(option);
        },
        formSubmit: function (form) {
            var flag = true;
            $(form).find('[data-reg]').each(function () {
                $(this).blur();
                var status = $(this).attr('status');
                if (status && (status == 1)) {
                    flag = true;
                } else {
                    flag = false;
                    $(this).blur();
                    return false;
                }
                return true;
            });
            return flag;
        }
    };
    //计算字节数
    function mbStringLength(s) {
        var totalLength = 0;
        var i;
        var charCode;
        for (i = 0; i < s.length; i++) {
          charCode = s.charCodeAt(i);
          if (charCode < 0x007f) {
            totalLength = totalLength + 1;
          } else if ((0x0080 <= charCode) && (charCode <= 0x07ff)) {
            totalLength += 2;
          } else if ((0x0800 <= charCode) && (charCode <= 0xffff)) {
            totalLength += 2; //配合后端gb编码也算2字节
          }
        }
        //alert(totalLength);
        return totalLength;
      };
//验证码放大事件
    $("#code").bind({
        "focus": function() {
            $(this).parent().find('img').addClass("code_enlarge");
        },
        "blur": function() {
            $(this).parent().find('img').removeClass("code_enlarge");
        }
    });

    $(".otherAccount").bind("click",function(event){
        event.preventDefault();
        $(this).closest('.m-login-finish').hide();
        $(".m-login").show();
    })
    $("#code").val('');
    $('[placeholder]').placeholder();
    $('#ifmLoginBox').remove();
    $(document.body).append('<iframe id="ifmLoginBox" name="ifmLoginBox" src="about:blank" style="display: none;"></iframe>');
//注册事件
    $("#username").ctValidate( validateFunction.username);
    $("#pwd").ctValidate(validateFunction.pwd);
    $("#code").ctValidate(validateFunction.code);
    $('#formlogin').submit(function () {
        $("#loginsubmit").prop('disabled', true).addClass("disabled");
        var flag = validateFunction.formSubmit(this);
        if (flag) {
            $("#loginsubmit").val("正在登录中...");
            return true;
        }
        $("#loginsubmit").attr('disabled', false).removeClass("disabled");;
        return false;
    });
});
function ShowLogonBox() {
}

