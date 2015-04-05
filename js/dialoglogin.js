
$(function() {
//验证正则
    var validateRegExp = {
        chinese: "[\u4e00-\u9fa5]", //中文字符
        email: "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$", //邮件
        letter: "^[A-Za-z]+$", //字母
        mobile: "^0?(13|15|18|14)[0-9]{9}$", //手机
        notempty: "^\\S+$", //非空
        password: "^.*[A-Za-z0-9\\w_-]+.*$", //密码
        fullNumber: "^[0-9]+$", //数字
        username: "^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+$", //用户名
        code: "^[A-Za-z0-9]{4}$", //普通验证码
        mobileCode: "^[0-9]{6}$" //手机验证码
    };
//主函数
    (function($) {
        $.fn.ctValidate = function(callback) {
            var ele = this;
            var _type = ele.attr("id");
            var _error = $(".error ");
            ele.bind("focus", function() {
                validateSettings.onFocus.run({
                    element: ele,
                    errorEle: _error
                });
            });
            ele.bind("blur", function() {
                var str = ele.val();
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
            run: function(option) {
                option.element.removeClass(validateSettings.INPUT_style2).addClass(validateSettings.INPUT_style1);
            }
        },
        isNull: {
            run: function(option) {
                if (option.value == "") {
                    option.element.removeClass(validateSettings.INPUT_style1).addClass(validateSettings.INPUT_style2);
                    option.errorEle.removeClass("hidden").html(validatePrompt[option.type].isNull);
                } else {
                    option.element.removeClass(validateSettings.INPUT_style1).removeClass(validateSettings.INPUT_style2);
                    option.errorEle.addClass("hidden").html("");
                }

            }
        },
        validateUserName: {
            run: function(option) {
                var value = option.value;
                var type = option.type;
                var isExist = validateRules.isUserName(value, 4, 16) || validateRules.isMobile(value) || validateRules.isEmail(value);
                if (isExist) {
                    option.element.attr("status", 0);
                    option.element.removeClass(validateSettings.INPUT_style1).removeClass(validateSettings.INPUT_style2);
                    option.errorEle.addClass("hidden").html("");
                } else {
                    option.element.removeClass(validateSettings.INPUT_style1).addClass(validateSettings.INPUT_style2);
                    option.errorEle.removeClass("hidden").html(validatePrompt[type].error.badLength);
                }
            }
        },
        validatePassword: {
            run: function(option) {
                var value = option.value;
                var type = option.type;
                var isExist = true;
                var rule = validateRules.isPwd(value, 6, 20);
                if (rule) {
                    option.element.attr("status", 0);
                    option.element.removeClass(validateSettings.INPUT_style1).removeClass(validateSettings.INPUT_style2);
                    option.errorEle.addClass("hidden").html("");
                } else {
                    option.element.removeClass(validateSettings.INPUT_style1).addClass(validateSettings.INPUT_style2);
                    option.errorEle.removeClass("hidden").html(validatePrompt[type].error.badLength);

                }

            }
        },
        validateCode: {
            run: function(option) {
                var value = option.value;
                var type = option.type;
                var isExist = true;
                var rule = validateRules.isCode(value);
                if (rule) {
                    option.element.attr("status", 0);
                    option.element.removeClass(validateSettings.INPUT_style1).removeClass(validateSettings.INPUT_style2);
                    option.errorEle.addClass("hidden").html("");
                } else {
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
        isNull: function(str) {
            return (str == "" || typeof str != "string");
        },
        betweenLength: function(str, _min, _max) {
            return (str.length >= _min && str.length <= _max);
        },
        isUid: function(str) {
            return new RegExp(validateRegExp.username).test(str);
        },
        isUserName: function(str, _min, _max) {
            var _len = str.length;
            var _chineseLen = str.replace(/[^\u4e00-\u9fa5]/g, "").length;
            var len = _len - _chineseLen + _chineseLen * 2;
            return (len >= _min && len <= _max);
        },
        isPwd: function(str, _min, _max) {
            return (str.length >= _min && str.length <= _max && /^.*([\W_a-zA-z0-9-])+.*$/i.test(str));
        },
        isEmail: function(str) {
            return new RegExp(validateRegExp.email).test(str);
        },
        isCode: function(str) {
            return new RegExp(validateRegExp.code).test(str);
        },
        isTel: function(str) {
            return new RegExp(validateRegExp.tel).test(str);
        },
        isMobile: function(str) {
            return new RegExp(validateRegExp.mobile).test(str);
        }
    };
//验证文本
    var validatePrompt = {
        username: {
            onFocus: "用户名长度只能在4-20位字符之间",
            succeed: "",
            isNull: "请输入用户名",
            error: {
                badLength: "请检查用户名是否输入正确",
                badFormat: "该用户名不存在"
            }
        },
        pwd: {
            onFocus: "密码长度只能在6-16位字符之间",
            succeed: "",
            isNull: "请输入密码",
            error: {
                badLength: "密码长度只能在6-20位字符之间"
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
        username: function(option) {
            validateSettings.validateUserName.run(option);
        },
        pwd: function(option) {
            validateSettings.validatePassword.run(option);
        },
        code: function(option) {
            validateSettings.validateCode.run(option);
        },
        formSubmit: function(elements) {
            var bool = true;
            for (var i = 0; i < elements.length; i++) {
                if ($(elements[i]).attr("status") == 0) {
                    bool = true;
                } else {
                    
                    bool = false;
                    $(elements[i]).blur();
                    $(elements[i]).focus();
                    break;
                }
            }
            return bool;
        }
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
   
    //注册事件
    $("#username").ctValidate( validateFunction.username);
    $("#pwd").ctValidate(validateFunction.pwd);
    $("#code").ctValidate(validateFunction.code);
    $("#code").val('');
    setTimeout(function () {
        $("#username").focus();
    }, 100);
   
    $('#ifmLoginBox').remove();
    $(document.body).append('<iframe id="ifmLoginBox" name="ifmLoginBox" src="about:blank" style="display: none;"></iframe>');

    $("#code").bind('keyup', function(event) {
        if ($(this).val().length == 4) {
            $(this).parent().find('img').removeClass("code_enlarge");
            $("#loginsubmit").focus();
        } else {
            $(this).parent().find('img').addClass("code_enlarge");
        }
    });
    $('#formlogin').submit(function () {
        $("#loginsubmit").attr('disabled', true);
        var flag = validateFunction.formSubmit(["#username", "#pwd", "#code"]);
        if (flag) {
            $("#loginsubmit").val("正在登录中...");
            return true;
        }
        $("#loginsubmit").attr('disabled', false);
        return false;
    });
});


