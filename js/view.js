
var getView = {
    RealCard:
                "<div class='field clearfix'>" +
                          "<div class='ifo_lable'>身份证号</div>" +
                          "<div class='ifo_input'><input data-reg='idCard' id='card' name='VerifyIDCard' maxLength='18' type='text' placeholder='请输入身份证号'  data-required='true' /><i></i>" +
                          "</div>" +
                          "<div class='ifo ifoTip'></div>" +
                 "</div>"
   ,
    RealName:
         "<div class='field clearfix'>" +
                        "<div class='ifo_lable'>真实姓名</div>" +
                        "<div class='ifo_input'><input data-reg='trueName' id='name' name='VerifyTrueName' type='text' maxLength='4' placeholder='请填写真实姓名' data-required='false' /><i></i>" +
                        "</div>" +
                        "<div class='ifo ifoTip'></div>" +
                  "</div>"
   ,
    ProtectPassword:
                 "<div class='field clearfix forget_pwd'>" +
                          "<div class='ifo_lable'>保护密码</div>" +
                          "<div class='ifo_input'><input data-reg='oldProtectPwd' name='VerifySecurePassword' maxLength='20' type='password' id='p-password' data-required='true' /><i></i>" +
                          "<div class='forgetProtectPWD'><a class='d-link ' target='_blank' href='http://kf.uc108.com/self/restsecurepwdbyappeal.aspx'>忘记保护密码?</a></div>"+
                          "</div>" +
                          "<div class='ifo ifoTip'></div>" +
                 "</div>"
   ,
    LoginPassword:
           "<div class='field clearfix'>" +
                          "<div class='ifo_lable'>登录密码</div>" +
                          "<div class='ifo_input'><input data-reg='oldPwd' name='VerifyPassword' maxLength='20' type='password' id='l-password' data-required='true' /><i></i>" +
                          "</div>" +
                          "<div class='ifo ifoTip'></div>" +
               "</div>"
   ,
    PhoneCode:
               "<div class='field clearfix'>" +
                        "<div class='ifo_lable'>验证码</div>" +
                         "<div class='ifo_input phone_code_box' >" +
                            " <input data-reg='mobileCode' id='code' class='inputCode' name='VerifyCode' maxLength='6'  type='text' placeholder='验证码'  /><button type='button' class='getCode phoneCode'>点击获取手机验证码</button>" +
                        " </div>" +
                        "<div class='ifo ifoTip'></div>" +
                "</div>"
   ,
    EmailCode:
               "<div class='field clearfix'>" +
                        "<div class='ifo_lable'>验证码</div>" +
                         "<div class='ifo_input phone_code_box' >" +
                            " <input data-reg='emailCode' id='code2' class='inputCode' name='VerifyCode' maxLength='6'  type='text' placeholder='验证码'  /><button type='button' class='getCode'>点击获取邮箱验证码</button>" +
                        " </div>" +
                        "<div class='ifo ifoTip'></div>" +
                "</div>"
};

//验证方式select的change事件句柄
var correctVerifyType = function () {
    var path = window.location.pathname.toLowerCase();
    if (path.indexOf('/idcard_fill') == 0) {
        return { m: 9, e: 9 };
    }
    if (path.indexOf('/mobile_modify') == 0) {
        return { m: 15, e: 7 };
    }
    if (path.indexOf('/email_modify') == 0 || path.indexOf('/emailbind') == 0) {
        return { m: 11, e: 11 };
    }
    if (path.indexOf('/pwd_modify') == 0) {
        return { m: 5, e: 5 };
    }
    if (path.indexOf('/securepwd_modify') == 0) {
        return { m: 8, e: 8 };
    }
    if (path.indexOf('/account_unbind') == 0) {
        return { m: 3, e: 3 };
    }
    return { m: 0, e: 0 };
};

var methodChange = function () {
    correctVerifyType();
    var _value = $(this).val();
    _value = (typeof _value == "number") ? String(_value) : _value;
    switch (_value) {
        case "0":
            $(".m-view").html(getView.RealCard + getView.RealName);
            $("#card").ctValidate();
            $("#name").ctValidate();
            break;
        case "1":
            $(".m-view").html(getView.PhoneCode);
            var me = correctVerifyType();
            $(".m-view [name='VerifyCode']").next('button:eq(0)').attr('verifyType', me.m);
            $(".m-view [name='VerifyCode']").ctValidate();
            break;
        case "2":
            $(".m-view").html(getView.EmailCode);
            var me = correctVerifyType();
            $(".m-view [name='VerifyCode']").next('button:eq(0)').attr('verifyType', me.e);
            $(".m-view [name='VerifyCode']").ctValidate();
            break;
        case "3":
            $(".m-view").html(getView.ProtectPassword);
            $('.m-view #p-password').securePassword();
            $('.m-view #p-password').ctValidate();
            var url = window.location.pathname.toLowerCase();
            if (url.indexOf('securepwd_modify') > -1) {
                $('.m-view #p-password').parent().prev().text('原保护密码');
            }
            break;
        case "4":
            $(".m-view").html(getView.LoginPassword);
            $("#l-password").ctValidate();
            var url = window.location.pathname.toLowerCase();
            if (url.indexOf('pwd_modify') > -1) {
                $("#l-password").parent().prev().text('原登录密码');
            }
            break;
        default:
            break;
    }
};
//获取验证码事件句柄
var getCode = function () {
    var $this = $(this);
    var verifyType = $this.attr("verifyType");
    if ($this.hasClass("phoneCode")) {
        var mobile = '';
        if ($this.hasClass("bindMobile")) {
            mobile = $("#phone").val();
        }
        sendSmsVerifyCode(this, mobile, verifyType);
    } else {
        sendEmailVerifyCode(this, verifyType);
    }
};

/*地区选择框*/
var initArea = function (province, city, district, func) {
    var getSelectedValue = function (obj) {
        var val = obj.attr('selectedvalue') || '';
        if (val == '')
            return val;
        if (val.length % 2 == 1) {
            val = '0' + val;
        }
        return val;
    };
    var $province = $(province);
    var $city = $(city);
    var $district = $(district);
    $(province + ',' + city + ',' + district).bind('change', function () {
        $(this).parents('form').find(':submit').prop('disabled', false).removeClass('disabled');
    });
    var selectedProvince = getSelectedValue($province);;
    var selectedCity = getSelectedValue($city);
    var selectedDistrict = getSelectedValue($district);

    var initOptions = function (obj, items, callback) {
        for (var i = 0; i < items.length; i++) {
            obj.append('<option value="' + items[i].ID + '">' + items[i].Name + '</option>');
        }
        if (callback) {
            callback();
        }
    };
    var removeOptions = function (items) {
        if ($.isArray(items)) {
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                item.find('option:gt(0)').remove();

                try { item.val(0); } catch (e) { }
            }
        } else {
            items.find('option:gt(0)').remove();
            try { items.val(0); } catch (e) { }
            items = [items];
        }
        return items;
    };
    var loadArea = function (parentVal, childObjs, callback) {
        if (typeof childObjs == "undefined") {
            return;
        }
        childObjs = removeOptions(childObjs);
        if (parentVal == '00' && childObjs.length < 3) {
            return;
        }
        var data = window["Data_" + parentVal];
        if (data) {
            initOptions(childObjs[0], data, callback);
        } else {
            $.getJSON("areapage.html", { parent: parentVal }, function (json) {
                window["Data_" + parent] = json;
                initOptions(childObjs[0], json, callback);
            });
        }
    };
    $province.append('<option value="0">请选择</option>');
    $city.append('<option value="0">请选择</option>');
    $district.append('<option value="0">请选择</option>');
    $province.change(function () {
        if (this.value == 0) {
            removeOptions([$city, $district]);
            return;
        }
        loadArea(this.value, [$city, $district]);
    });
    $city.change(function () {
        if (this.value == 0) {
            removeOptions([$district]);
            return;
        }
        loadArea(this.value, $district);
    });

    var area = {
        obj: $province,
        value: selectedProvince,
        child: {
            obj: $city,
            value: selectedCity,
            child: {
                obj: $district,
                value: selectedDistrict
            }
        }
    };
    var setInit = function (obj, callback) {
        if (obj.value == '' || obj.value == '00') {
            if (callback) {
                callback();
                return;
            }
        }
        try { obj.obj.val(obj.value); } catch (e) { }
        if (obj.child) {
            loadArea(obj.value, obj.child.obj, function () {
                setInit(obj.child, callback);
            });
        } else {
            if (callback) {
                callback();
            }
        }
    };
    loadArea('00', [$province, $city, $district], function () {
        setInit(area, func);
    });
};
/*日期*/
function initDate(yearEle, monthEle, dayEle) {
    var selectedValue = yearEle.attr('selectedvalue');
    var year = 0;
    var month = 0;
    var day = 0;
    if (selectedValue) {
        year = selectedValue.substring(0, 4);
        month = parseInt(selectedValue.substr(4, 2));
        day = parseInt(selectedValue.substr(6, 2));
    }
    var initDateOptions = function (d) {
        var y = yearEle.val();
        var m = monthEle.val();
        d = (typeof d != 'number' || d == 0) ? dayEle.val() : d;
        var max = 30;
        if (m == 2) {
            max = (y % 4 == 0 && y % 100 != 0) || (y % 400 == 0) ? 29 : 28;
        } else if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) {
            max = 31;
        }
        dayEle.find('option:gt(0)').remove();
        for (var i = 1; i <= max; i++) {
            dayEle.append("<option value='" + i + "'" + (d == i ? " selected" : "") + ">" + i + "日</option>");
        };
    };

    var date = new Date().getFullYear();
    yearEle.append(function () {
        var str = "<option value='0'>请选择</option>";
        var i = 80;
        while (i--) {
            str += "<option value='" + (date - i) + "'" + ((date - i) == year ? " selected" : "") + ">" + (date - i) + "年</option>";
        };
        return str;
    });
    monthEle.append(function () {
        var str = "<option value='0'>请选择</option>";
        for (var i = 1; i <= 12; i++) {
            str += "<option value='" + i + "'" + (i == month ? " selected" : "") + ">" + i + "月</option>";
        };
        return str;
    });
    dayEle.append("<option value='0'>请选择</option>");
    initDateOptions(day);
    yearEle.bind('change', initDateOptions);
    monthEle.bind('change', initDateOptions);
};



/*表单操作相关*/
(function ($) {
    $.fn.regsubmit = function (callback) {
        $(this).each(function () {
            var $this = $(this);
            if (!$this.is('form')) {
                return;
            }
            var $submit = $(this).find('[type="submit"]');
            var XRequestedWith = $(this).find('[name="X-Requested-With"]');
            if (XRequestedWith.length == 0) {
                $this.append('<input type="hidden" name="X-Requested-With" value="IFRAME"/>');
            }
            $submit.attr('normalText', $submit.val());
            $this.submit(function () {
                var _submit = $(this).find('[type="submit"]');
                var flag = true;
                if (callback && typeof callback == 'function') {
                    flag = callback(this);
                }
                _submit.val(_submit.attr('normalText'));
                if (flag) {
                    _submit.attr('disabled', true);
                    _submit.addClass('disabled');
                    _submit.val("正在提交...");
                    if ($ && $.dialog && $.dialog.tips) {
                        $.dialog.tips('正在提交保存数据...', 600, 'loading.gif');
                    }
                    _submit.val("正在提交...");
                    return true;
                } else {
                    return false;
                }
            });
        });
    };
})(jQuery);


$(function () {
    $('[data-reg]').ctValidate();	//注册验证事件
    $(".validate select").bind("change", methodChange);	//校验选择事件
    $(".validate select").val($(".validate select option:eq(0)").val());
    $("form").on("click", ".getCode", getCode);		//获取校验码
    try{
        $('form [name="VerifySecurePassword"]').securePassword();//保护密码
    } catch (e) { }
    if (resetsubmitButton) { resetsubmitButton(); }
    $(document.body).append('<iframe id="formTarget" name="formTarget" src="about:blank" style="display: none;"></iframe>');
    $('form').attr('target', 'formTarget');
    $('.getCode').removeAttr("disabled");
});
/*初始化提交按钮(submit)*/
var resetsubmitButton = function () {
    $(":submit").each(function () {
        var $this = $(this);
        $this.removeAttr('disabled'); ///移除submit的disabled属性
        $this.removeClass('disabled');
        var normalText = $this.attr('normalText');
        if (normalText) {
            $this.val(normalText);
        }
    });
};
/*提示消息框*/
function showMsg(msg, callback,title,btnValue,unclose,icon) {
    if ($ && $.dialog && $.dialog.alert) {
        $.dialog.alert(msg, callback);
        if (title) {
            $('.ui_title').text(title)
        }
        if (unclose) {
            $('.ui_close').hide();
        }
        if (btnValue) {
            $('.ui_state_highlight').val(btnValue);
        }
        if (icon) {
            $('.ui_icon_bg').attr('src',icon);
        }
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
function saveSuccessed(callback) {
    try {
        if (resetsubmitButton) { resetsubmitButton(); }
        if (callback) {
            callback();
        } else {
            if ($ && $.dialog && $.dialog.tips) {
                $.dialog.tips('保存成功,正在加载数据...', 600, 'loading.gif');
            }
            top.location = top.location;
        }
    } catch (e) {
    }
}

function successedRediret(url) {
    if ($ && $.dialog && $.dialog.tips) {
        $.dialog.tips('保存成功,正在加载数据...', 600, 'loading.gif');
    }
    if (typeof url == 'undefined') {
        url = top.location.url;
    }

    top.location = correcturlmode(url);
}
function correcturlmode(url) {
    if (url == '' || url == '#' || url.substr(0, 11).toLowerCase() == 'javascript:') {
        return url;
    }
    var topurl = top.location.href.toLowerCase();
    if (topurl.indexOf("mode=1") > -1 && url.toLowerCase().indexOf("mode=1") == -1) {
        url += (url.indexOf("?") > -1) ? "&" : "?";
        url += "mode=1";
    }
    return url;
}
function successedPage(option) {
    var html = getTipInfo(option);
    var result = $('.m-operate-result');
    if (result.length == 0) {
        $('.m-title').after(html);
        result = $('.m-operate-result');
    }
    result.show();

    $('.validate').hide();
}

function getTipInfo(option) {
    var opts = $.extend({
        status: "success",//fail
        icon: "",
        title: "操作成功！",
        content: "",
        link: []
    }, option || {});

    var _status = (opts.status == "success") ? "success" : "fail",
          _icon = (opts.icon !== "" && opts.icon != null) ? "<i style='background:url(" + opts.icon + ")'></i>" : "<i></i>",
              i = 0,
           _len = opts.link.length,
          _link = (function () {
              var str = ""
              if (_len <= 0) return str;
              for (; i < _len; i++) {
                  var _target = opts.link[i].target ? "target="+opts.link[i].target+"": "";
                  str += "<a class='" + (opts.link[i].css || "d-button-link") + "' href='" +correcturlmode( opts.link[i].href) + "' "+_target+">" + opts.link[i].text + "</a>"
              };
              return str;
          })();

    var strHTML = "<div class='m-tip'><div class='wraper'><div class='tip " + _status + "'>";
    strHTML += _icon;
    if(_len <= 0) {
        strHTML += "<h4 class='pt10'>" + opts.title + "</h4>";
    } else {
        strHTML += "<h4>" + opts.title + "</h4>";
    } 
    if(opts.content) {
        strHTML += "<p>" + opts.content + "</p>";
    } else {

    };
    strHTML += "<div class='func'>" + _link + "</div>";
    strHTML += "</div></div></div>"

    return strHTML;
}


function doCloseAwardImage(){
  $(".m-menu .award").hide();
  $("#dangle").hide();
}
