/*
author:@lihaoliang;
date:@2014-2-28;
*/
var validateRegExp = {
    chinese: "[\u4e00-\u9fa5]", //中文字符
    email: "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$", //邮件
    idcard: "^\\d{6}(19|20)\\d\\d(0[1-9]|1[012])(0[1-9]|[12]\\d|3[01])\\d{3}[\\dX]$", //身份证
    letter: "^[A-Za-z]+$", //字母
    mobile: "^(13|15|18|14|17)[0-9]{9}$", //手机
    notempty: "^\\S+$", //非空
    password: "^.*[A-Za-z0-9\\w_-]+.*$", //密码
    fullNumber: "^[0-9]+$", //数字
    username: "^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+$", //用户名
    emailCode: "^[A-Za-z0-9]{6}$", //邮箱验证码
    mobileCode: "^[0-9]{6}$", //手机验证码
    realname: "^[\\u4e00-\\u9fa5]{2,7}$", // 真实姓名
    qqnumber: "^[1-9]\\d{4,10}$",//qq号码
    protectPwd: "^[0-9]{8,16}$",//保护密码
    oldProtectPwd: "^[0-9]{2,16}$",//旧保护密码
    comChar:"(?!^(\\d+|[a-zA-Z]+)$)^[\\da-zA-Z]+$",//数字和字符的组合
    sameChar:"^(.)\\1+$"//同一字符
};
var weakPwdArray = ["123456", "123456789", "111111", "5201314", "12345678", "123123", "password", "1314520", "123321", "7758521", "1234567", "5211314", "666666", "520520", "woaini", "520131", "11111111", "888888", "hotmail.com", "112233", "123654", "654321", "1234567890", "a123456", "88888888", "163.com", "000000", "yahoo.com.cn", "sohu.com", "yahoo.cn", "111222tianya", "163.COM", "tom.com", "139.com", "wangyut2", "pp.com", "yahoo.com", "147258369", "123123123", "147258", "987654321", "100200", "zxcvbnm", "123456a", "521521", "7758258", "111222", "110110", "1314521", "11111111", "12345678", "a321654", "111111", "123123", "5201314", "00000000", "q123456", "123123123", "aaaaaa", "a123456789", "qq123456", "11112222", "woaini1314", "a123123", "a111111", "123321", "a5201314", "z123456", "liuchang", "a000000", "1314520", "asd123", "88888888", "1234567890", "7758521", "1234567", "woaini520", "147258369", "123456789a", "woaini123", "q1q1q1q1", "a12345678", "qwe123", "123456q", "121212", "asdasd", "999999", "1111111", "123698745", "137900", "159357", "iloveyou", "222222", "31415926", "123456", "111111", "123456789", "123123", "9958123", "woaini521", "5201314", "18n28n24a5", "abc123", "password", "123qwe", "123456789", "12345678", "11111111", "dearbook", "00000000", "123123123", "1234567890", "88888888", "111111111", "147258369", "987654321", "aaaaaaaa", "1111111111", "66666666", "a123456789", "11223344", "1qaz2wsx", "xiazhili", "789456123", "password", "87654321", "qqqqqqqq", "000000000", "qwertyuiop", "qq123456", "iloveyou", "31415926", "12344321", "0000000000", "asdfghjkl", "1q2w3e4r", "123456abc", "0123456789", "123654789", "12121212", "qazwsxedc", "abcd1234", "12341234", "110110110", "asdasdasd", "123456", "22222222", "123321123", "abc123456", "a12345678", "123456123", "a1234567", "1234qwer", "qwertyui", "123456789a", "qq.com", "369369", "163.com", "ohwe1zvq", "xiekai1121", "19860210", "1984130", "81251310", "502058", "162534", "690929", "601445", "1814325", "as1230", "zz123456", "280213676", "198773", "4861111", "328658", "19890608", "198428", "880126", "6516415", "111213", "195561", "780525", "6586123", "caonima99", "168816", "123654987", "qq776491", "hahabaobao", "198541", "540707", "leqing123", "5403693", "123456", "123456789", "111111", "5201314", "123123", "12345678", "1314520", "123321", "7758521", "1234567", "5211314", "520520", "woaini", "520131", "666666", "RAND#a#8", "hotmail.com", "112233", "123654", "888888", "654321", "1234567890", "a123456","7654321", "87654321", "987654321", "332211","abcdef","abcdefg","aabbcc","aaabbbccc","111222333"];

//主函数
(function ($) {
    $.fn.ctValidate = function () {
        return this.each(function () {
            var ele = $(this);
            var type = ele.attr("type");
            var _reg = ele.attr("data-reg");
            if (typeof _reg === "undefined") return;
            if (type == "checkbox" || type == "radio") {
                if (ele.attr("checked") == true) {

                }
            };
            switch (type) {
                case "text":
                case "password":
                    ele.bind({
                        "focus": function () {
                            validateSettings.onFocus.run({
                                element: ele,
                                reg: _reg
                            });
                        },
                        "blur": function () {
                            var str = ele.val();
                            if (validateRules.isNull(str)) {
                                validateSettings.isNull.run({
                                    element: ele,
                                    value: str,
                                    reg: _reg
                                });
                            } else {
                                validateFunction[_reg].call(this, {
                                    element: ele,
                                    value: str,
                                    reg: _reg
                                });
                            }
                        }
                    });
                    break;
                default:
                    ele.bind("click", function () {
                        validateSettings.validate.run({
                            element: ele,
                            reg: _reg
                        });
                    });
                    break;
            };
        });
    };
})(jQuery);

 var cache = {
      item:{},
      setCache:function (key,option){
            this.item[key] = this.item[key] || {};
            option.value && (this.item[key]["preValue"] = option.value);
            option.content && (this.item[key]["content"] = option.content);
            option.loadStatus && (this.item[key]["loadStatus"] = option.loadStatus);
      },
      getCache:function(key){
            return this.item[key];
      },
      has:function(key){
         return this.item.hasOwnProperty(key);
      }
    };

var validateFunction = {
     "userName":function(option) {
              var _this=$(this);
              var str = $.trim(option.value);
              var reg = option.reg;
              var eleParent = _this.closest(".ifo_input");
                if (validateRules.existOtherLetter(str)) {
                    eleParent.nextAll(".ifoTip").html(validatePrompt[reg].error.badFormat).addClass("error").show();
                    validateSettings.isError.run({element:_this});   
                    return;
                };
                if (validateRules.isUNline(str)) {
                    eleParent.nextAll(".ifoTip").html(validatePrompt[reg].error.badFormat2).addClass("error").show();
                    validateSettings.isError.run({element:_this});
                    return;
                };
                if (validateRules.isMobile(str)) {
                    eleParent.nextAll(".ifoTip").html(validatePrompt[reg].error.badFormat3).addClass("error").show();
                    validateSettings.isError.run({element:_this});
                    return;
                };
                if (!validateRules.isUserName(str,4,16)) {
                    eleParent.nextAll(".ifoTip").html(validatePrompt[reg].error.badLength).addClass("error").show();
                    validateSettings.isError.run({element:_this});
                    return;
                };
                if((cache.getCache(reg).preValue && (cache.getCache(reg).preValue == str ))|| (cache.getCache(reg).loadStatus && (cache.getCache(reg).loadStatus == 0))) {
                    if(_this.attr("status") == 1) {
                        validateSettings.isSuccess.run({element:_this});
                    } else {
                        eleParent.nextAll(".ifoTip").html(cache.getCache(reg).content).addClass("error").show();
                    }
                    return;
                }
                eleParent.nextAll(".ifoTip").html(validatePrompt[reg].wait).addClass("error").show();
                cache.setCache(reg,{value:str,content:validatePrompt[reg].wait,loadStatus:"0"});
                $.ajax({
                    type: "POST",
                    url: "?method=4",
                    data: { userName: _this.val() },
                    dataType: "JSON",
                    success: function(data) {
                        _this.attr('status', data.Successed ? 1 : 0);
                        if (!data.Successed) {
                            eleParent.nextAll(".ifoTip").html(data.Message).addClass("error").show();
                            cache.setCache(reg,{content:data.Message});
                        } else {   
                            validateSettings.isSuccess.run({element:_this});
                        }
                        cache.setCache(reg,{loadStatus:"1"});
                    }
                });
         },
    "mobile": function (option) {
        var _this = $(this);
        var str = $.trim(option.value);
        var reg = option.reg;
        var eleParent = _this.closest(".ifo_input");
        if (!validateRules.isMobile(str)) {
            eleParent.nextAll(".ifoTip").html(validatePrompt[reg].error.badLength).addClass("error").show();
            validateSettings.isError.run({ element: _this });
            return;
        }
        eleParent.nextAll(".ifoTip").html(validatePrompt[reg].onFocus).hide();
        validateSettings.isSuccess.run({ element: _this });
    },
    "email": function (option) {
        var _this = $(this);
        var str = $.trim(option.value);
        var reg = option.reg;
        var eleParent = _this.closest(".ifo_input");
        if (!validateRules.isEmail(str)) {
            eleParent.nextAll(".ifoTip").html(validatePrompt[reg].error.badLength).addClass("error").show();
            validateSettings.isError.run({ element: _this });
            return;
        }
        eleParent.nextAll(".ifoTip").html(validatePrompt[reg].onFocus).hide();
        validateSettings.isSuccess.run({ element: _this });
    },
    "pwd": function (option) {
        var _this = $(this);
        var str = option.value;
        var reg = option.reg;
        var eleParent = _this.closest(".ifo_input");
        var property = _this.attr("data-refer");
        var str2 = (typeof property !== "undefined" && $("#"+property).length>0)? $("#"+property).val():property;
        if (!validateRules.isContaindByuUserName(str,str2)) {
            eleParent.nextAll(".ifoTip").html(validatePrompt[reg].error.badFormat3).addClass("error").show();
            validateSettings.isError.run({ element: _this });
            return;
        }
        if (validateRules.isWeakPwd(str)) {
            eleParent.nextAll(".ifoTip").html(validatePrompt[reg].error.badFormat2).addClass("error").show();
            validateSettings.isError.run({ element: _this });
            return;
        }
        if (validateRules.isExistBlank(str)) {
                     eleParent.nextAll(".ifoTip").html(validatePrompt[reg].error.badFormat4).addClass("error").show();
                     validateSettings.isError.run({element:_this});
                     return;
                 }
        if (!validateRules.isPwd(str, 6, 16)) {
            eleParent.nextAll(".ifoTip").html(validatePrompt[reg].error.badLength).addClass("error").show();
            validateSettings.isError.run({ element: _this });
        } else {
            eleParent.nextAll(".ifoTip").html(validatePrompt[reg].onFocus).hide();
            validateSettings.isSuccess.run({ element: _this });
        }
    },
    "oldPwd": function (option) {
        var _this = $(this);
        var str = option.value;
        var reg = option.reg;
        var eleParent = _this.closest(".ifo_input");
        if (!validateRules.isPwd(str, 1, 16)) {
            eleParent.nextAll(".ifoTip").html(validatePrompt[reg].error.badLength).addClass("error").show();
            validateSettings.isError.run({ element: _this });
        } else {
            eleParent.nextAll(".ifoTip").html(validatePrompt[reg].onFocus).hide();
            validateSettings.isSuccess.run({ element: _this });
        }
    },
    "protectPwd": function (option) {
        var _this = $(this);
        var str = option.value;
        var reg = option.reg;
        var eleParent = _this.closest(".ifo_input");
        if($(".ui-pass").is(":visible")) return;
        if (!validateRules.isProtectPwd(str)) {
            eleParent.nextAll(".ifoTip").html(validatePrompt[reg].error.badLength).addClass("error").show();
            validateSettings.isError.run({ element: _this });
        } else {
            eleParent.nextAll(".ifoTip").html(validatePrompt[reg].onFocus).hide();
            validateSettings.isSuccess.run({ element: _this });
        }
    },
    "oldProtectPwd": function (option) {
        var _this = $(this);
        var str = option.value;
        var reg = option.reg;
        var eleParent = _this.closest(".ifo_input");
        if($(".ui-pass").is(":visible")) return;
        if (!validateRules.isOldProtectPwd(str)) {
            eleParent.nextAll(".ifoTip").html(validatePrompt[reg].error.badLength).addClass("error").show();
            validateSettings.isError.run({ element: _this });
        } else {
            eleParent.nextAll(".ifoTip").html(validatePrompt[reg].onFocus).hide();
            validateSettings.isSuccess.run({ element: _this });
        }
    },
    "pwdRepeat": function (option) {
        var _this = $(this);
        var str = option.value;
        var reg = option.reg;
        var eleParent = _this.closest(".ifo_input");
        var id = _this.attr("data-refer");
        if (typeof id === 'undefined') {
            return;
        }
        var pwd = $("#" + id).val();
        if (!validateRules.isPwdRepeat(str, pwd)) {
            eleParent.nextAll(".ifoTip").html(validatePrompt[reg].error.badFormat).addClass("error").show();
            validateSettings.isError.run({ element: _this });
        } else {
            eleParent.nextAll(".ifoTip").html(validatePrompt[reg].onFocus).hide();
            validateSettings.isSuccess.run({ element: _this });
        }
    },
    "idCard": function (option) {
        var _this = $(this);
        var str = $.trim(option.value);
        var reg = option.reg;
        var eleParent = _this.closest(".ifo_input");
        if (!validateRules.isPersonCard(str)) {
            eleParent.nextAll(".ifoTip").html(validatePrompt[reg].error.badFormat).addClass("error").show();
            validateSettings.isError.run({ element: _this });
        } else {
            eleParent.nextAll(".ifoTip").html(validatePrompt[reg].onFocus).hide();
            validateSettings.isSuccess.run({ element: _this });
        }
    },
    "trueName": function (option) {
        var _this = $(this);
        var str = $.trim(option.value);
        var reg = option.reg;
        var eleParent = _this.closest(".ifo_input");
        if (!validateRules.isTureName(str)) {
            eleParent.nextAll(".ifoTip").html(validatePrompt[reg].error.badFormat).addClass("error").show();
            validateSettings.isError.run({ element: _this });
        } else {
            eleParent.nextAll(".ifoTip").html(validatePrompt[reg].onFocus).hide();
            validateSettings.isSuccess.run({ element: _this });
        }
    },
    "pcCode": function (option) {
        var _this = $(this);
        var str = $.trim(option.value);
        var reg = option.reg;
        var eleParent = _this.closest(".ifo_input");
        if (!validateRules.isCode(str)) {
            eleParent.nextAll(".ifoTip").html(validatePrompt[reg].error.badFormat).addClass("error").show();
            validateSettings.isError.run({ element: _this });
        } else {
            eleParent.nextAll(".ifoTip").html(validatePrompt[reg].onFocus).hide();
            validateSettings.isSuccess.run({ element: _this });
        }
    },
    "mobileCode": function (option) {
        var _this = $(this);
        var str = $.trim(option.value);
        var reg = option.reg;
        var eleParent = _this.closest(".ifo_input");
        if (!validateRules.isMobileCode(str)) {
            eleParent.nextAll(".ifoTip").html(validatePrompt[reg].error.badFormat).addClass("error").show();
            validateSettings.isError.run({ element: _this });
        } else {
            eleParent.nextAll(".ifoTip").html(validatePrompt[reg].onFocus).hide();
            validateSettings.isSuccess.run({ element: _this });
        }
    },
    "emailCode": function (option) {
        var _this = $(this);
        var str = $.trim(option.value);
        var reg = option.reg;
        var eleParent = _this.closest(".ifo_input");
        if (!validateRules.isEmailCode(str)) {
            eleParent.nextAll(".ifoTip").html(validatePrompt[reg].error.badFormat).addClass("error").show();
            validateSettings.isError.run({ element: _this });
        } else {
            eleParent.nextAll(".ifoTip").html(validatePrompt[reg].onFocus).hide();
            validateSettings.isSuccess.run({ element: _this });
        }
    },
    "nick": function (option) {
        var _this = $(this);
        var str = $.trim(option.value);
        var reg = option.reg;
        var eleParent = _this.closest(".ifo_input");
        if (validateRules.existOtherLetter(str)) {
            eleParent.nextAll(".ifoTip").html(validatePrompt[reg].error.badFormat2).addClass("error").show();
            validateSettings.isError.run({ element: _this });
            return;
        };
        if (validateRules.isUNline(str)) {
            eleParent.nextAll(".ifoTip").html(validatePrompt[reg].error.badFormat).addClass("error").show();
            validateSettings.isError.run({ element: _this });
            return;
        };
        if (!validateRules.isNick(str,4,12)) {
            eleParent.nextAll(".ifoTip").html(validatePrompt[reg].error.badLength).addClass("error").show();
            validateSettings.isError.run({ element: _this });
        } else {
            eleParent.nextAll(".ifoTip").html(validatePrompt[reg].onFocus).hide();
            validateSettings.isSuccess.run({ element: _this });
        }
    },
    "qq": function (option) {
        var _this = $(this);
        var str = $.trim(option.value);
        var reg = option.reg;
        var eleParent = _this.closest(".ifo_input");
        if (!validateRules.isQQ(str)) {
            eleParent.nextAll(".ifoTip").html(validatePrompt[reg].error.badFormat).addClass("error").show();
            validateSettings.isError.run({ element: _this });
        } else {
            eleParent.nextAll(".ifoTip").html(validatePrompt[reg].onFocus).hide();
            validateSettings.isSuccess.run({ element: _this });
        }
    },
    "detailAdrress": function (option) {
        var _this = $(this);
        var str = $.trim(option.value);
        var reg = option.reg;
        var eleParent = _this.closest(".ifo_input");
        if (!validateRules.isDetailAdrress(str,4,63)) {
            eleParent.nextAll(".ifoTip").html(validatePrompt[reg].error.badLength).addClass("error").show();
            validateSettings.isError.run({ element: _this });
        } else {
            eleParent.nextAll(".ifoTip").html(validatePrompt[reg].onFocus).hide();
            validateSettings.isSuccess.run({ element: _this });
        }
    }

};
//配置
var validateSettings = {
    onFocus: {
        run: function (option) {
            var type = option.reg;
            var ele = option.element;
            var eleParent = option.element.closest(".ifo_input");
            type && (ele.val() ==""?cache.setCache(type,{value:""}):"");
            ele.removeClass("iWrong iRight");
            eleParent.nextAll(".ifoTip").html(validatePrompt[type].onFocus).removeClass("error").show();
            ele.removeClass("highlight2").addClass("highlight1");
            ele.parents('form').find(':submit').removeAttr('disabled').removeClass('disabled');
        }
    },
    isNull: {
        run: function (option) {
            var ele = option.element;
            var eleParent = option.element.closest(".ifo_input");
            var property = option.element.attr("data-require");
            var require = (typeof property === "undefined" || property.toLowerCase() == "true") ? true : false;
            if($(".ui-pass").is(":visible")) return;
            if (!require) {
                if (typeof ele.attr("status") !== "undefined") {
                    ele.removeAttr("status");
                }
                ele.removeClass("highlight1 highlight2");
                eleParent.nextAll(".ifoTip").hide();
                ele.attr('status', 1);
            } else {
                var type = option.reg;
                eleParent.nextAll(".ifoTip").html(validatePrompt[type].isNull).addClass("error").show();
                ele.removeClass("iRight").addClass("iWrong");
                ele.addClass("highlight2");
                ele.attr('status', 0);
            }
        }
    },
    isSuccess: {
        run: function (option) {
            var ele = option.element;
            ele.closest(".ifo_input").nextAll(".ifoTip").hide();
            ele.addClass("iRight");
            ele.removeClass("highlight1 highlight2");
            ele.attr('status', 1);
        }
    },
    isError: {
        run: function (option) {
            var ele = option.element;
            ele.removeClass("iRight").addClass("iWrong");
            ele.addClass("highlight2");
            ele.attr('status', 0);
        }
    }
};

//验证规则
var validateRules = {
    isNull: function (str) {
        return (str == "" || typeof str != "string");
    },
    isUserName: function (str, _min, _max) {
        // var _len = str.length;
        // var _chineseLen = str.replace(/[^\u4e00-\u9fa5]/g, "").length;
        // var len = _len - _chineseLen + _chineseLen * 2;
        // return (len >= _min && len <= _max);
        var len = mbStringLength(str);
        return (len >= _min && len <= _max);
    },
    betweenLength: function (str, _min, _max) {
        return (str.length >= _min && str.length <= _max);
    },
    isUid: function (str) {
        return new RegExp(validateRegExp.username).test(str);
    },
    fullNumberName: function (str) {
        return new RegExp(validateRegExp.fullNumber).test(str);
    },
    isPwd: function (str, _min, _max) {
        // return (str.length >= _min && str.length <= _max && /^.*([\W_a-zA-z0-9-])+.*$/i.test(str));
        var len = mbStringLength(str);
        return (len >= _min && len<= _max);
    },
    isPwdRepeat: function (str1, str2) {
        return (str1 == str2);
    },
    isEmail: function (str) {
        return new RegExp(validateRegExp.email).test(str);
    },
    isMobile: function (str) {
        return new RegExp(validateRegExp.mobile).test(str);
    },
    isCode: function (str) {
        return new RegExp(validateRegExp.code).test(str);
    },
    isMobileCode: function (str) {
        return new RegExp(validateRegExp.mobileCode).test(str);
    },
    isEmailCode: function (str) {
        return new RegExp(validateRegExp.emailCode).test(str);
    },
    isPersonCard: function (str) {
        var iSum = 0;
        if (!/^\d{17}(\d|x)$/i.test(str)) {
            return false;
        }
        str = str.replace(/x$/i, "a");
        var sBirthday = str.substr(6, 4) + "-" + Number(str.substr(10, 2)) + "-" + Number(str.substr(12, 2));
        var d = new Date(sBirthday.replace(/-/g, "/"));
        if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) {
            return false;
        }
        for (var i = 17; i >= 0; i--) {
            iSum += (Math.pow(2, i) % 11) * parseInt(str.charAt(17 - i), 11);
        }
        if (iSum % 11 != 1) {
            return false;
        }
        return true;
    },
    isTureName: function (str) {
        return new RegExp(validateRegExp.realname).test(str);
    },
    isNick: function (str, _min, _max) {
        var _len = str.length;
        var _chineseLen = str.replace(/[^\u4e00-\u9fa5]/g, "").length;
        var len = _len - _chineseLen + _chineseLen * 2;
        return (len >= _min && len <= _max);
    },
    isQQ: function (str) {
        return new RegExp(validateRegExp.qqnumber).test(str);
    },
    isProtectPwd: function (str) {
        var pass =  new RegExp(validateRegExp.protectPwd).test(str);
        if(pass){
            var arrStr = str.split(""),
                     i = 0,
                   len = arrStr.length,
                  temp = [];
            for(i;i<len;i++){
              if($.inArray(arrStr[i], temp) == -1){
                temp.push(arrStr[i]);
              }
            }
            return (temp.length < 3)? false : true;
         } else {
            return false
        }    
    },
    isOldProtectPwd: function (str) {
        return new RegExp(validateRegExp.oldProtectPwd).test(str);
    },
    isDetailAdrress: function (str) {
        return new RegExp(validateRegExp.detailAdrress).test(str);
    },
    existOtherLetter: function (str) { //特殊字符
        var FORBID_STR = "!#$@%^~&*`'.,:;\"/\\|?<>()[]{}+-= ";
        var l = str.length;
        if (l > 0) {
            for (var i = 0; i < l; i++) {
                if (FORBID_STR.indexOf(str.substr(i, 1)) > -1) {
                    return true;
                }
            }
        }
        return false;
    },
    isUNline: function (str) { //下划线开头和结尾        
        if (str.substr(0, 1) == "_" || str.substr(str.length - 1, 1) == "_") {
            return true;
        }
        return false;
    },
    isComChar: function(str) {
      return new RegExp(validateRegExp.comChar).test(str);
    },
    isContaindByuUserName: function (str1,str2){
      if (str2 === undefined ) {
        return true;
      } 
      return str2.indexOf(str1) === -1 ? true:false;
    },
    isWeakPwd: function (str) {
         var isSameChar = new RegExp(validateRegExp.sameChar).test(str);
         if ($.inArray(str,weakPwdArray) !==-1 || isSameChar ) {
            return true;
         } else {
            return false;
         }
    },
    isDate: function (y, m, d) {//年，月，日
        var _date = y + "/" + m + "/" + d;
        var date = new Date(_date);
        if (_date != (date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate())) {
            return false;
        } else {
            return true;
        }
    },
    isDetailAdrress :function (str, _min, _max) {
        var _len = str.length;
        var _chineseLen = str.replace(/[^\u4e00-\u9fa5]/g, "").length;
        var len = _len - _chineseLen + _chineseLen * 2;
        return (len >= _min && len <= _max);
    },
    isExistBlank: function(str) {
          return (/\s/).test(str);
    }
};
//验证文本
var validatePrompt = {
    userName: {
            onFocus: "由4-16位字符组成，中文算2个字符",
            succeed: "",
            isNull: "请输入用户名",
            wait: "校验中，请稍候...",
            error: {
                beUsed: "该用户名已被使用，请使用其它用户名注册",
                badLength: "用户名长度只能在4-16位字符之间",
                badFormat: "用户名不能包含特殊字符",
                badFormat2: "用户名不能以下划线开始和结尾",
                badFormat3: "用户名不能是手机号码"
            }
        },
    pwd: {
        onFocus: "由6-16位字符组成",
        succeed: "",
        isNull: "请输入密码",
        error: {
            badLength: "密码长度只能在6-16位字符之间",
            badFormat: "两次输入密码不一致",
            badFormat2: "不能使用过于简单的密码",
            badFormat3: "密码不能是用户名的一部分",
            badFormat4: "密码中不能包含空格"
        }
    },
    oldPwd: {
        onFocus: "请输入登录密码",
        succeed: "",
        isNull: "请输入登录密码",
        error: {
            badLength: "密码长度只能在1-16位字符之间"
        }
    },
    protectPwd: {
        onFocus: "8位及以上，至少3种不同数字组成",
        succeed: "",
        isNull: "请输入保护密码",
        error: {
            badLength: "8位及以上，至少3种不同数字组成"
        }
    },
    oldProtectPwd: {
        onFocus: "请输入保护密码",
        succeed: "",
        isNull: "请输入保护密码",
        error: {
            badLength: "请输入正确的保护密码"
        }
    },
    pwdRepeat: {
        onFocus: "请再次输入密码",
        succeed: "",
        isNull: "请输入密码",
        error: {
            badLength: "密码长度只能在6-16位字符之间",
            badFormat: "两次输入密码不一致"
        }
    },
    pcCode: {
        onFocus: "请输入4位验证码",
        succeed: "",
        isNull: "请输入短信验证码",
        error: {
            badLength: "请输入4位验证码"
        }
    },
    mobile: {
        onFocus: "请输入11位手机号码",
        succeed: "",
        isNull: "请输入11位手机号码",
        wait: "校验中，请稍候...",
        error: {
            beUsed: "该手机号已被使用，请使用其它手机号",
            badLength: "手机号码位数或格式不对"
        }
    },
    email: {
        onFocus: "请输入您常用的邮箱地址",
        succeed: "",
        isNull: "请输入您常用的邮箱地址",
        wait: "校验中，请稍候...",
        error: {
            beUsed: "该邮箱已被使用，请使用其它邮箱地址",
            badLength: "邮箱地址格式不对"
        }
    },
    emailCode: {
        onFocus: "请输入邮箱收到的验证码",
        succeed: "",
        isNull: "请输入邮箱验证码",
        error: {
            badLength: "请输入邮箱收到的验证码"
        }
    },
    mobileCode: {
        onFocus: "请输入手机收到的短信验证码",
        succeed: "",
        isNull: "请输入短信验证码",
        error: {
            badLength: "请输入手机收到的短信验证码"
        }
    },
    nick: {
        onFocus: "由4-12位字符组成，中文算2个字符",
        isNull: "由4-12位字符组成，中文算2个字符",
        error: {
            badLength: "昵称只能在4-12位字符之间",
            badFormat: "昵称不能以下划线开始或结尾",
            badFormat2: "昵称不能含有特殊字符"
        }
    },
    qq: {
        onFocus: "由5-10位数字组成",
        isNull: "",
        error: "QQ号码只能是5-10位数字"
    },
    idCard: {
        onFocus: "请输入18位身份证号码",
        succeed: "",
        isNull: "请输入18位身份证号码",
        error: {
            badLength: "身份证号码长度是18位字符"
        }
    },
    trueName: {
        onFocus: "请输入真实姓名",
        succeed: "",
        isNull: "请输入真实姓名",
        error: {
            badLength: "真实姓名只能是2-6位汉字"
        }
    },
    detailAdrress:{
        onFocus: "详细地址不包含省、市、区",
        succeed: "",
        isNull: "详细地址不包含省、市、区",
        error: {
            badLength: "详细地址是由4-63位字符组成"
        }
    }
};

//密码强度
function pwdLevel(value) {
    var pattern_1 = /^.*([\W_])+.*$/i;
    var pattern_2 = /^.*([a-zA-Z])+.*$/i;
    var pattern_3 = /^.*([0-9])+.*$/i;
    var level = 0;
    if (value.length > 10) {
        level++;
    }
    if (pattern_1.test(value)) {
        level++;
    }
    if (pattern_2.test(value)) {
        level++;
    }
    if (pattern_3.test(value)) {
        level++;
    }
    if (level > 3) {
        level = 3;
    }
    return level;
} 
   //密码强度检测事件
  function fnLeverStrength (objInput,objStreng){
     var  value = objInput.val();
     var element = objStreng;
     var pass = !validateRules.isWeakPwd(value) && !validateRules.isExistBlank(value) && validateRules.isPwd(value, 6, 16);
     if (value.length >= 6 && pass) {
            element.parent().show();
            var level = pwdLevel(value);
            switch (level) {
                case 1:
                    element.removeClass().eq(level-1).addClass("strengthA");
                    break;
                case 2:
                    element.removeClass().eq(level-1).addClass("strengthB");
                    break;
                case 3:
                    element.removeClass().eq(level-1).addClass("strengthC");
                    break;
                default:
                    break;
            }
        } else {
            element.parent().hide();
        }
 };
//表单验证
var formValidate = function (form) {
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
};
/*
发送验证码方法
*/
var VerifyCodeType = {
    BindMobile: 7, //绑定手机
    VerifyBindMobile: 15,//验证已绑定手机号
    OpenMobile: 16,  //开通手机登录
    ConfirmBindMobile: 17,
    BindEmail: 11,   //绑定Email
    ConfirmEmail: 14,//
    SetSecurePwd: 8, //设置安全密码
    SetIDCardTrueName: 9, //设置实名认证信息
    AccountActive: 10,//激活
    UpdatePassword: 5,//修改密码
    Register: -1, //注册帐号,
    UnBindHall: 3,    //解绑大厅,
    CancelLogin: 18  //取消登录
};
var sendSmsVerifyCode = function (obj, mobile, mobileType) {
    var $this = $(obj);
    var reg = new RegExp(validateRegExp.mobile);
    if ((mobileType == -1 || mobileType == 7 || mobileType == 10) && !reg.test(mobile)) {
        $this.removeClass("disabled").prop("disabled", false);
        $this.html("点击重新获取验证码");
        //$this.parent().nextAll(".ifoTip").html("手机号格式不正确").addClass("error").show();
        $this.prev("i").removeClass("right").addClass("wrong");
        $this.addClass("highlight2");
        return;
    }
    var time = 120;
    $this.addClass("disabled").prop("disabled", true);
    $this.html("正在发送验证码");
    var from = 0;
    var hidFrom = $this.parentsUntil('form').parent().find('[name="hidRegFrom"]');
    if (hidFrom.length > 0) {
        from = hidFrom.val();
    }
    $.ajax({
        type: "POST",
        url: "/SendVerifyCode.aspx?method=sms",
        data: { mobile: mobile, mobileType: mobileType, hidRegFrom: from,d:new Date().getTime() },
        dataType: "json",
        beforeSend:function(){
            $this.parent().nextAll(".ifoTip").hide();
        },
        success: function (data) {
            if (data.Successed) {
                countDown();
            } else {
                $this.removeClass("disabled").prop("disabled", false);
                $this.html("点击重新获取验证码");
                var message = (data.Message.length > 18)? "<div class='tip-over'>"+data.Message+"</div>":data.Message;
                $this.parent().nextAll(".ifoTip").html(message).addClass("error").show();
                $this.prev("i").removeClass("right").addClass("wrong");
                $this.addClass("highlight2");
            }
        },
        error: function () {
            $this.removeClass("disabled").prop("disabled", false);
        }
    });

    function countDown() {
        if (time == 0) {
            $this.removeClass("disabled").prop("disabled", false);
            $this.html("点击发送验证码");
        } else {
            time--;
            $this.html("<span style='color:red'>" + time + "秒</span>后重新获取");
            setTimeout(countDown, 1000);
        }
    }
};
/*发送Email验证码*/
var sendEmailVerifyCode = function (obj, emailType, email, gourl) {
    if (emailType == 15) {
        return;
    }
    email = email || "";
    gourl = gourl || "";
    var $this = $(obj);
    $.ajax({
        type: "POST",
        url: "/SendVerifyCode.aspx?method=email",
        data: { emailType: emailType, email: email, gourl: encodeURIComponent(gourl),d:new Date().getTime() },
        dataType: "json",
        success: function (data) {
            if (data.Successed) {
                var m = parserEmail(data.Data);
                $.dialog.Alert("<h4>验证码已发送到" + m.email + " </h4><p><a href='http://mail." + m.host + "' target='_blank'>进入邮箱</a></p>", $.dialog.messageIcon.Successed);
            } else {
                $.dialog.Alert('<h4>'+data.Message+'</h4>', $.dialog.messageIcon.Information);
            }
        },
        error: function () {
            $this.removeClass("disabled").prop("disabled", false);
        }
    });
};

function parserEmail(email) {
    if (email) {
        var index = email.indexOf('@');
        if (index > -1) {
            var mail = email.substr(0, index);
            if (mail.length > 1) {
                mail = mail.substr(0, 1);
            }
            mail += "***" + email.substr(index - 1,1);
            var host = email.substring(index + 1);
            return { email: mail + '@' + host, host: host };
        }
    }
    return { email: '您的邮箱', host: '#' };
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
            totalLength += 2;//配合后端gb编码也算2字节
          }
        }
        return totalLength;
      };

if ($ && $.dialog) {
    if (typeof $.dialog.message == 'undefined') {
        var _zIndex = function () {
            return lhgdialog.setting.zIndex;
        };
        $.dialog.messageIcon = {
            Successed: "success",
            Information: "fail"
        };
        var messageTitle = {
            "success": "成功",
            "fail": "提示"
        };
        $.dialog.Alert = function (content, icon, callback) {
            icon = icon || $.dialog.messageIcon.Information;
            var title = messageTitle[icon] || "提示";
            var html = "<div class='m-dialog'><div class='wrap-dialog'><div class='inside " + icon + "'><i></i>" + content + "</div></div></div>";
            return lhgdialog({
                title: title,
                id: 'Alert1',
                zIndex: _zIndex(),
                fixed: true,
                lock: true,
                content: html,
                ok: true,
                resize: false,
                min: false,
                max:false,
                close: callback,
                parent: parent || null,
                padding: 0
            });
        };
    }
}