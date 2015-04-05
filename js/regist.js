/*
author:@lihaoliang;
date:@2014-2-14;
*/
$(function() {
    //选项卡模块
    var TabChange = function() {
        this.init.call(this, 0);
    };
    TabChange.prototype = {
        init: function(index) {
            $(".m-tag li").eq(index).addClass("on");
            $(".m-regist .m-reg-method").eq(index).show();
            this.bindEvent();
        },
        bindEvent: function() {
            $(".m-tag li").bind("click", function(event) {
                $(this).addClass("on").siblings().removeClass("on");
                var _index = $(this).index();
                $(".m-regist .m-reg-method").hide();
                $(".m-regist .ifo_input").css({ "zoom": "1" });
                $(".m-regist .m-reg-method").eq(_index).show();
            });
        }
    };
   //验证正则
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
        code: "^[A-Za-z0-9]{4}$", //普通验证码
        mobileCode: "^[0-9]{6}$", //手机验证码
        realname: "^[\\u4e00-\\u9fa5]{2,7}$", // 真实姓名
        comChar:"(?!^(\\d+|[a-zA-Z]+)$)^[\\da-zA-Z]+$",//数字和字符的组合
        sameChar:"^(.)\\1+$"//同一字符
    };
var weakPwdArray = ["123456", "123456789", "111111", "5201314", "12345678", "123123", "password", "1314520", "123321", "7758521", "1234567", "5211314", "666666", "520520", "woaini", "520131", "11111111", "888888", "hotmail.com", "112233", "123654", "654321", "1234567890", "a123456", "88888888", "163.com", "000000", "yahoo.com.cn", "sohu.com", "yahoo.cn", "111222tianya", "163.COM", "tom.com", "139.com", "wangyut2", "pp.com", "yahoo.com", "147258369", "123123123", "147258", "987654321", "100200", "zxcvbnm", "123456a", "521521", "7758258", "111222", "110110", "1314521", "11111111", "12345678", "a321654", "111111", "123123", "5201314", "00000000", "q123456", "123123123", "aaaaaa", "a123456789", "qq123456", "11112222", "woaini1314", "a123123", "a111111", "123321", "a5201314", "z123456", "liuchang", "a000000", "1314520", "asd123", "88888888", "1234567890", "7758521", "1234567", "woaini520", "147258369", "123456789a", "woaini123", "q1q1q1q1", "a12345678", "qwe123", "123456q", "121212", "asdasd", "999999", "1111111", "123698745", "137900", "159357", "iloveyou", "222222", "31415926", "123456", "111111", "123456789", "123123", "9958123", "woaini521", "5201314", "18n28n24a5", "abc123", "password", "123qwe", "123456789", "12345678", "11111111", "dearbook", "00000000", "123123123", "1234567890", "88888888", "111111111", "147258369", "987654321", "aaaaaaaa", "1111111111", "66666666", "a123456789", "11223344", "1qaz2wsx", "xiazhili", "789456123", "password", "87654321", "qqqqqqqq", "000000000", "qwertyuiop", "qq123456", "iloveyou", "31415926", "12344321", "0000000000", "asdfghjkl", "1q2w3e4r", "123456abc", "0123456789", "123654789", "12121212", "qazwsxedc", "abcd1234", "12341234", "110110110", "asdasdasd", "123456", "22222222", "123321123", "abc123456", "a12345678", "123456123", "a1234567", "1234qwer", "qwertyui", "123456789a", "qq.com", "369369", "163.com", "ohwe1zvq", "xiekai1121", "19860210", "1984130", "81251310", "502058", "162534", "690929", "601445", "1814325", "as1230", "zz123456", "280213676", "198773", "4861111", "328658", "19890608", "198428", "880126", "6516415", "111213", "195561", "780525", "6586123", "caonima99", "168816", "123654987", "qq776491", "hahabaobao", "198541", "540707", "leqing123", "5403693", "123456", "123456789", "111111", "5201314", "123123", "12345678", "1314520", "123321", "7758521", "1234567", "5211314", "520520", "woaini", "520131", "666666", "RAND#a#8", "hotmail.com", "112233", "123654", "888888", "654321", "1234567890", "a123456","7654321", "87654321", "987654321", "332211","abcdef","abcdefg","aabbcc","aaabbbccc","111222333"];
 //主函数
    (function($) {
        $.fn.ctValidate = function() {
            return this.each(function() {
                var ele = $(this);
                var type = ele.attr("type");
                var _reg = ele.attr("data-reg");
                if (_reg == "undefined") return;
                if (ele.is(':checkbox') || ele.is(":radio")) {
                    if (this.checked) {

                    }
                };
                switch (type) {
                case "text":
                case "password":
                    ele.bind({
                      "focus": function() {
                            validateSettings.onFocus.run({
                                element: ele,
                                reg: _reg
                            });
                        },
                        "blur": function() {
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
                    ele.bind("click", function() {
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
              var _this = $(this);
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
                        };
                        cache.setCache(reg,{loadStatus:"1"});
                    }
                });
         },
         "mobile": function(option) {
                var _this=$(this);
                var str = $.trim(option.value);
                var reg = option.reg;
                var eleParent = _this.closest(".ifo_input");
                if (!validateRules.isMobile(str)) {
                    eleParent.nextAll(".ifoTip").html(validatePrompt[reg].error.badLength).addClass("error").show();
                    validateSettings.isError.run({element:_this});
                    return;
                }
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
                    url: "?method=5",
                    data: { mobile: _this.val() },
                    dataType: "json",
                    success: function(data) {
                        _this.attr('status', data.Successed ? 1 : 0);
                        if (!data.Successed) {
                            eleParent.nextAll(".ifoTip").html(data.Message).addClass("error").removeClass("wait").show();
                            cache.setCache(reg,{content:data.Message});
                        } else {
                            eleParent.nextAll(".ifoTip").removeClass("wait").hide();
                            _this.addClass("iRight");
                        };
                        cache.setCache(reg,{loadStatus:"1"});
                    }
                });
         },
         "email": function(option) {
                 var _this=$(this);
                 var str = $.trim(option.value);
                 var reg = option.reg;
                 var eleParent = _this.closest(".ifo_input");
                 if (!validateRules.isEmail(str)) {
                    eleParent.nextAll(".ifoTip").html(validatePrompt[reg].error.badLength).addClass("error").show();
                    validateSettings.isError.run({element:_this});
                    return;
                 }
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
                    url: "?method=6",
                    data: { email: _this.val() },
                    dataType: "json",
                    success: function(data) {
                        _this.attr('status', data.Successed ? 1 : 0);
                        if (!data.Successed) {
                            eleParent.nextAll(".ifoTip").html(data.Message).addClass("error").show();
                            cache.setCache(reg,{content:data.Message});
                        } else {
                            eleParent.nextAll(".ifoTip").hide();
                            _this.addClass("iRight");
                        };
                        cache.setCache(reg,{loadStatus:"1"});
                    }
                  });
         },
         "pwd":function(option) {
                 var _this=$(this);
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
                    validateSettings.isError.run({element:_this});
                     return;
                 } 
                 if (validateRules.isExistBlank(str)) {
                     eleParent.nextAll(".ifoTip").html(validatePrompt[reg].error.badFormat4).addClass("error").show();
                     validateSettings.isError.run({element:_this});
                     return;
                 }
                 if (!validateRules.isPwd(str,6,16)){
                    eleParent.nextAll(".ifoTip").html(validatePrompt[reg].error.badLength).addClass("error").show();
                    validateSettings.isError.run({element:_this});   
                 } else {
                    eleParent.nextAll(".ifoTip").html(validatePrompt[reg].onFocus).hide();
                     validateSettings.isSuccess.run({element:_this});
                 }
          },
          "pwdRepeat": function(option) {
                 var _this = $(this);
                 var str = option.value;
                 var reg = option.reg;
                 var eleParent = _this.closest(".ifo_input");
                 var id = _this.attr("data-refer")
                 var pwd = $("#"+id).val();
                 if (!validateRules.isPwdRepeat(str, pwd)) {
                    eleParent.nextAll(".ifoTip").html(validatePrompt[reg].error.badFormat).addClass("error").show();
                    validateSettings.isError.run({element:_this}); 
                 } else {
                    eleParent.nextAll(".ifoTip").html(validatePrompt[reg].onFocus).hide();
                    validateSettings.isSuccess.run({element:_this}); 
                 }
          },
          "idCard": function(option) {
                 var _this = $(this);
                 var str = $.trim(option.value);
                 var reg = option.reg;
                 var eleParent = _this.closest(".ifo_input");
                 if (!validateRules.isPersonCard(str)) {
                    eleParent.nextAll(".ifoTip").html(validatePrompt[reg].error.badFormat).addClass("error").show();
                    validateSettings.isError.run({element:_this}); 
                 } else {
                    eleParent.nextAll(".ifoTip").html(validatePrompt[reg].onFocus).hide();
                    validateSettings.isSuccess.run({element:_this}); 
                 }
          },
          "trueName": function(option) {
                var _this = $(this);
                var str = $.trim(option.value);
                var reg = option.reg;
                var eleParent = _this.closest(".ifo_input");
                if (!validateRules.isTureName(str)) {
                    eleParent.nextAll(".ifoTip").html(validatePrompt[reg].error.badFormat).addClass("error").show();
                    validateSettings.isError.run({element:_this}); 
                } else {
                    eleParent.nextAll(".ifoTip").html(validatePrompt[reg].onFocus).hide();
                    validateSettings.isSuccess.run({element:_this}); 
                }
          },
          "pcCode": function(option) {
                var _this = $(this);
                var str = $.trim(option.value);
                var reg = option.reg;
                var eleParent = _this.closest(".ifo_input");
                if (!validateRules.isCode(str)) {
                    eleParent.nextAll(".ifoTip").html(validatePrompt[reg].error.badFormat).addClass("error").show();
                    validateSettings.isError.run({element:_this}); 
                } else {
                    eleParent.nextAll(".ifoTip").html(validatePrompt[reg].onFocus).hide();
                    validateSettings.isSuccess.run({element:_this}); 
                }
          },
          "mobileCode": function(option) {
                var _this = $(this);
                var str = $.trim(option.value);
                var reg = option.reg;
                var eleParent = _this.closest(".ifo_input");
                if (!validateRules.isMobileCode(str)) {
                    eleParent.nextAll(".ifoTip").html(validatePrompt[reg].error.badFormat).addClass("error").show();
                    validateSettings.isError.run({element:_this}); 
                } else {
                    eleParent.nextAll(".ifoTip").html(validatePrompt[reg].onFocus).hide();
                    validateSettings.isSuccess.run({element:_this}); 
                }
          }
    }
      //配置
    var validateSettings = {
        onFocus: {
            run: function(option) {
                var type=option.reg;
                var ele = option.element;
                var eleParent = option.element.closest(".ifo_input");
                type && (ele.val() ==""?cache.setCache(type,{value:""}):"");
                ele.removeClass("iWrong iRight");
                eleParent.nextAll(".ifoTip").html(validatePrompt[type].onFocus).removeClass("error").show();   
                ele.removeClass("highlight2").addClass("highlight1");
            }
        },
        isNull: {
            run: function(option) {
               var ele = option.element;
               var eleParent = option.element.closest(".ifo_input");
               var property = option.element.attr("data-require");
               var def = ( typeof property !=="undefined" && property.toLowerCase()=="false" )? true:false;
               if( def ){ 
                 if (typeof ele.attr("status") !=="undefined") {
                  ele.removeAttr("status");
                 }
                 ele.removeClass("highlight1 highlight2");
                 eleParent.nextAll(".ifoTip").hide();
               } else {
                var type=option.reg;
                eleParent.nextAll(".ifoTip").html(validatePrompt[type].isNull).addClass("error").show();
                ele.removeClass("iRight").addClass("iWrong");
                ele.addClass("highlight2");
                ele.attr('status',0);
               }           
            }
         },
         isSuccess: {
            run: function(option){
                var ele = option.element;
                ele.closest(".ifo_input").nextAll(".ifoTip").hide();
                ele.addClass("iRight");
                ele.removeClass("highlight1 highlight2");
                ele.attr('status',1);
            }
         },
         isError: {
            run: function(option){
                var ele = option.element;
                ele.removeClass("iRight").addClass("iWrong");
                ele.addClass("highlight2");
                ele.attr('status',0);
            }
         }

    };
    //验证规则
  var validateRules = {
        isNull: function(str) {
            return (str == "" || typeof str != "string");
        },
        isUserName: function(str, _min, _max) {
            // var _len = str.length;
            // var _chineseLen = str.replace(/[^\u4e00-\u9fa5]/g, "").length;
            // var len = _len - _chineseLen + _chineseLen * 2;
            // return (len >= _min && len <= _max);
            var len = mbStringLength(str);
           return (len >= _min && len<= _max);
        },
        betweenLength: function(str, _min, _max) {
            return (str.length >= _min && str.length <= _max);
        },
        isUid: function(str) {
            return new RegExp(validateRegExp.username).test(str);
        },
        fullNumberName: function(str) {
            return new RegExp(validateRegExp.fullNumber).test(str);
        },
        isPwd: function(str, _min, _max) {
           // return (str.length >= _min && str.length <= _max && /^.*([\W_a-zA-z0-9-])+.*$/i.test(str));
           var len = mbStringLength(str);
           return (len >= _min && len<= _max);
        },
        isPwdRepeat: function(str1, str2) {
            return (str1 == str2);
        },
        isEmail: function(str) {
            return new RegExp(validateRegExp.email).test(str);
        },
        isMobile: function(str) {
            return new RegExp(validateRegExp.mobile).test(str);
        },
        isCode: function(str) {
            return new RegExp(validateRegExp.code).test(str);
        },
        isMobileCode: function(str) {
            return new RegExp(validateRegExp.mobileCode).test(str);
        },
        isPersonCard: function(str) {
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
            for (var i = 17; i >= 0; i --) {
                iSum += (Math.pow(2, i) % 11) * parseInt(str.charAt(17 - i), 11);
            }
            if (iSum % 11 != 1) {
                return false;
            }
            return true;
            // return new RegExp(validateRegExp.idcard).test(str);
        },
        isTureName: function(str) {
            return new RegExp(validateRegExp.realname).test(str);
        },
        existOtherLetter: function(str) { //特殊字符
            var FORBID_STR = "!#$@%^~&*`'.,:;\"/\\|?<>()[]{}+-= ";
            var l = str.length;
            if (l > 0) {
                for (var i = 0; i < l; i++) {
                    if (FORBID_STR.indexOf(str.substr(i, 1)) != -1) {
                        return true;
                    }
                }
            }
            return false;
        },
        isUNline: function(str) { //下划线开头和结尾        
            if (str.substr(0, 1) == "_" || str.substr(str.length - 1, 1) == "_") {
                return true;
            }
            return false;
        },
        isComChar: function(str) {
           return new RegExp(validateRegExp.comChar).test(str);
        },
        isContaindByuUserName: function (str1,str2){
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
                badFormat3: "请不要用手机号码注册"
               // badFormat3: "用户名是手机号，请直接用<a href='javascript:void(0)' class='mobile_register d-link'>手机号码注册</a>"
            }
        },
        pwd: {
            onFocus: "由6-16位字符组成",
            succeed: "",
            isNull: "请输入密码",
            error: {
                badLength: "密码长度只能在6-16位字符之间",
                badFormat: "两次输入密码不一致",
                badFormat2:"不能使用过于简单的密码",
                badFormat3: "密码不能是用户名的一部分",
                badFormat4: "密码中不能含有空格"
            }
        },
        pwdRepeat: {
            onFocus: "请再次输入密码",
            succeed: "",
            isNull: "请输入确认密码",
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
                badLength: "请输入11位手机号码"
            }
        },
        email: {
            onFocus: "请输入您常用的邮箱地址",
            succeed: "",
            isNull: "请输入您常用的邮箱地址",
            wait: "校验中，请稍候...",
            error: {
                beUsed: "该邮箱已被使用，请使用其它邮箱注册",
                badLength: "邮箱地址格式不对"
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
        protocol: {
            onFocus: "",
            succeed: "",
            isNull: "",
            error: "请先阅读并同意《畅唐用户协议》"
        },
        idCard: {
            onFocus: "请输入18位身份证号码",
            succeed: "",
            isNull: "请输入身份证号码",
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
        }
    };
    //初始化tab选项卡
    var model = new TabChange();
        model = null;
    // $("form").delegate('.mobile_register', 'click', function(event) {
    //  $(".m-tag li").eq(1).trigger('click');
    //  $("#p_number").focus();
    //  $("#p_number").val($("#username").val());
    //  $("#p_number").blur();
    // });
    //注册事件
    $("form input[type=text],form input[type=password]").ctValidate();
    //性别选择事件
    $(".ifo_input .sex").click(function() {
        if ($(this).hasClass("checked")) {
           // $(this).removeClass("checked").siblings("a").addClass("checked");             
        } else {
            $(this).addClass("checked").siblings("a").removeClass("checked");  
        } ;
        if ($(this).hasClass("sex_1")){
          $(this).siblings("input").val(0);
        } else {
          $(this).siblings("input").val(1);
        };    
    });
    //验证码放大事件
    $("#code").bind({
        "focus": function() {
            $(this).next("img").addClass("code_enlarge");
        },
        "blur": function() {
            $(this).next("img").removeClass("code_enlarge");
        }
    });
    var changeValidateCode = function (imgDom){
       imgDom.attr('src', 'http://user.ct108.org:1906/ValidateCode.html?_d='+new Date().getTime())
    };
    //换一张事件
    $(".change_code a").bind("click", function(event) {
      event.preventDefault();
        var $img = $(this).parent().prev().find("img");
        changeValidateCode($img);
    });
    $(".code_input img").bind("click", function() {
        changeValidateCode($(this));
    });
 //获取手机验证码事件
    $(".phone_code_box .getCode").bind("click", function() {
        var mobile = $('#p_number');
        var str = mobile.val(); 
        var passed = validateRules.isMobile(str) && mobile.attr('status') == 1;
        if (!passed) {
         var _tipEle = mobile.parent().nextAll(".ifoTip");
            if (_tipEle.hasClass("wait")) {
                _tipEle.html("校验中，请稍候...").addClass("error").show();
            } else {
              _tipEle.html("请先输入正确的手机号码").addClass("error").show();
              validateSettings.isError.run({element:mobile});  
            }
             return;
        }
        sendSmsVerifyCode(this, mobile.val(), VerifyCodeType.Register);
    });
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
    //检验表单
    function checkForm(ele) {
        var arr = $(ele).find("input").not("input[type=submit],input[type=button]");
        for (var i = 0; i < arr.length; i++) {
            var obj = $(arr[i]);
            var reg = obj.attr("data-reg");
            var status = obj.attr("status");
            var property = obj.attr("data-require");
            var def = ( typeof property !=="undefined" && property.toLowerCase() == "false" )? true:false;
            if (typeof reg == 'undefined' || (status == "1")) {
                continue;
            }
            obj.blur();
            status = obj.attr("status");
            if (typeof status != "undefined" && status == "0") {
                return false;
            }else if( typeof status == "undefined" && def == false){
                return false;
            } else {
                continue;
            } 
        }
        return true;
    }

//表单提交
    $("form").submit(function(event) {
        if (checkForm(this)) {
            var $submit = $(this).find(':submit');
            $submit.prop('disabled', true);
            $submit.addClass("disabled");
            $.dialog.tips('正在提交注册信息...', 600, 'loading.gif');
            return true;
        } else {
            event.preventDefault();
            return false;
        }
    });
    //邮箱自动完成
   $('#e_address').autoEmail();



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
        $this.closest(".ifo_input").nextAll(".ifoTip").html("手机号格式不正确").addClass("error").show();
       // $this.prev("i").removeClass("right").addClass("wrong");
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
        url: "SendVerifyCode.aspx?method=sms",
        data: { mobile: mobile, mobileType: mobileType, hidRegFrom: from },
        dataType: "json",
        success: function (data) {
            if (data.Successed) {
                countDown();
            } else {
                $this.removeClass("disabled").prop("disabled", false);
                $this.html("点击重新获取验证码");
                var message = (data.Message.length > 18)? "<div class='tip-over'>"+data.Message+"</div>":data.Message;
                $this.closest(".ifo_input").nextAll(".ifoTip").html(message).addClass("error").show();
               // $this.prev("i").removeClass("right").addClass("wrong");
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

});






