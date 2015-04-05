//保护密码控件
(function ($) {
    $.fn.securePassword = function () {
        var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        Math.uuidFast = function () {
            var chars = CHARS, uuid = new Array(36), rnd = 0, r;
            for (var i = 0; i < 36; i++) {
                if (i == 8 || i == 13 || i == 18 || i == 23) {
                    uuid[i] = '-';
                } else if (i == 14) {
                    uuid[i] = '4';
                } else {
                    if (rnd <= 0x02) rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
                    r = rnd & 0xf;
                    rnd = rnd >> 4;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
            return uuid.join('');
        };

        var createSecureDom = function () {
            var sum = 12;
            var str = '<div class="ui-pass1"  style="position:absolute;top:2px;left:16px;width:200px;z-index:99;">';
            for (var i = 0; i < sum; i++) {
                str += '<a href=\"javascript:void(0);\" style="display: inline-block;width: 38px;height: 38px;margin: 7px 10px 5px 0px;"></a>';
            };
            str += "</div>";
            return str;
        };
        var point = function (input) {
            var x = input.offset().left;
            var y = input.offset().top;
            var h = input.outerHeight();
            if ($(document).height() - input.offset().top  - h - 157 > 0 || input.offset().top < 157) {
                return {
                    top: y + h,
                    left: x
                }
            } else {
                return {
                    top: y-157,
                    left: x
                };
            }
        };
        var ie6 = (function () {
            var isIE=!!window.ActiveXObject;
            var isIE6 = isIE && !window.XMLHttpRequest;
            return isIE6 ? true : false; 
          })();
        var loadSecureDom = function () {
            var _this = $(this);
            _this.attr('readonly', true).attr("maxlength", 16);
            var name = _this.attr('name');
            if (typeof name == 'undefined' || name == '') {
                return;
            };           
            var p = point(_this);
            var uuid = Math.uuidFast();
            _this.attr('name', name + '$$$' + uuid);
            var id = new Date().getTime();
            _this.attr("data-id", id);
            var obj = $("<div class='ui-pass' data-id=" + id + "></div>");
            obj.css({ width: '203px', height: '155px', padding: '0px 10px 0px 5px', display: 'none', 'font-size': '0px', border: '1px solid #e3e3e3', "overflow": "hidden", "background-color": "#f3f2f1", "line-height": "0px"});
            var str = createSecureDom();
            obj.append(str);
            obj.css({ position: "absolute", left: p.left + "px", top: p.top + "px", "z-index": 9999 });
            obj.appendTo($("body"));
            if(ie6){
                 $('<iframe data-id='+ id + ' src="about:blank" frameBorder="0" scrolling="no" height="155px" width="220px" style="display:none;position:absolute;left: ' + p.left + 'px;top:' + p.top + 'px;z-index:100"></iframe>').appendTo($("body"));
            }
             obj.find("a").bind("mouseup", function (event) {
                event.stopPropagation();
                var $target = $(event.target);
                var index = $target.index();
                var val = $.trim(_this.val());
                if (index < 10) {
                    if (val.length >= 16) {
                        return;
                    }
                    val += index;
                    _this.val(val);
                    return;
                }
                if (index == 10) {
                    _this.val("");
                }
                if (index == 11) {
                    hidePassUI(obj)
                    _this.blur();
                }
            });
        };
        function hidePassUI($pass){
            $pass.hide();
            var _dataID = $pass.attr("data-id");
            ($('iframe[data-id='+_dataID+']').length>0)?$('iframe[data-id='+_dataID+']').hide():"";
        }
        $(document).bind("click", function (event) {
            var $target = $(event.target);
            if ($target.hasClass('ui-pass') || $target.hasClass('ui-pass1') || $target.is($(".ui-pass a"))) {
                return;
            }
            var ui = $('div.ui-pass:visible');
            hidePassUI(ui);
            if (ui.length > 0) {
                ui.each(function () {
                    var id = $(this).attr("data-id");
                    var input = $('input[data-id="' + id + '"]');
                        input.trigger('blur');
                });
            }

        });
        $(window).bind("scroll",function(){
           if(ie6){
             var ui = $('div.ui-pass:visible');
             hidePassUI(ui);
           }
        });
        var imgLoad = function (url, callback) {
            var img = new Image();
            img.onload = function () {
                callback();
            };
            img.src = url;
        };
        $(window).bind('resize', function (event) {
            var ui = $('div.ui-pass:visible');
            if (ui.length > 0) {
                ui.each(function () {
                    var div = $(this);
                    var id = div.attr("data-id");
                    var input = $('input[data-id="' + id + '"]');
                    var p = point(input);
                    div.css({ left: p.left + "px", top: p.top + "px" });
                    $('iframe[data-id='+id+']').css({ left: p.left + "px", top: p.top + "px" });
                });
            }
        });
        $(this).each(function () {
            loadSecureDom.call(this);
            $(this).bind({
                "focus": function () {
                    var _id = $(this).attr("data-id");
                    hidePassUI($(".ui-pass"));
                    var _bgurl = $(this).attr("bgurl");
                    var bgurl = (typeof _bgurl !== "undefined" && _bgurl != ""  ) ? _bgurl :'/styles/images/pwd_loading.gif';               
                    var div = $("div.ui-pass[data-id=" + _id + "]");
                    var p = point($(this));
                    div.css({ left:  p.left + "px", top: p.top + "px" });
                    var obj = $("[data-id=" + _id + "]").not(this);
                    obj.show();
                    if($('iframe[data-id]').length>0){
                         $('iframe[data-id]').hide();
                         $('iframe[data-id='+_id+']').css({ left: p.left + "px", top: p.top + "px" }).show();
                    }
                    obj.find('.ui-pass1').css('background', "url(" + bgurl + ") center center no-repeat");
                    var name = $(this).attr("name");
                    var uuid = name.substr(name.indexOf("$$$") + 3);
                    var url = "/SecurePwdImage.html?uuid=" + uuid;
                    imgLoad(url, function () {
                        obj.find('.ui-pass1').css('background', 'url(' + url + ') -4px 0 no-repeat');
                    });
                }, "click": function (event) {
                    event.stopPropagation();
                }, "keydown": function (event) {
                    if (event.keyCode == 8) {
                        $(this).val("");
                        return false;
                    }
                }
            });
        });
    };
})(jQuery);

$(function() {
    $('[securepwd]').securePassword();
});

