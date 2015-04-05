/*
author:@lihaoliang;
date:@2014-3-4;
*/
function AutoEmail(option) {
    this.config = {
        targetInput: "",
        emailArray: ["@163.com", "@qq.com", "@126.com", "@hotmail.com", "@gmail.com", "@sohu.com", "@sina.com", "@msn.com"]
    };
    this.curentArray = [];
    this.targetContent = "";
    this.arrLen = "";
    this.cur = -1;
};

AutoEmail.prototype = {
    normalCss: { background: '#FFFCF5', color: '#555' },
    hoverCss: { background: '#A6A7A4', color: '#fff' },
    init: function(option) {
        this.config = $.extend(this.config, option || {});
        this.arrLen = this.config.emailArray.length;
        this.createContent();
        this.bindEvent();
    },
    createContent: function() {
        var $input = this.config.targetInput;
        var x = this.getPosition($input).left;
        var y = this.getPosition($input).top;
        var ele = $("<div class='ui-email'></div>");
        var _width = $input.width();
        ele.css({ position: "absolute", left: x + "px", top: y + "px" });
        ele.css({border:'1px solid #e3e3e3',width: _width+'px',display: 'none',overflow: 'hidden','background-color':'#FFFCF5'});
        ele.appendTo($("body"));
        this.targetContent = ele;
    },
    bindEvent: function() {
        var _this = this;
        this.config.targetInput.bind("keyup", function(e) {
            if (e.keyCode == 13 || e.keyCode == 38 || e.keyCode == 40) {
                e.stopPropagation();
                return;
            }
            var value = $(this).val();
            var _index = value.indexOf("@");
            var _value = (_index == -1) ? value : value.substring(0, _index);
            var _ovalue = (_index == -1) ? "" : value.substring(_index, value.length);
            if (_ovalue != "") {
                this.curentArray = _this.config.emailArray;
                var arr = $.grep(this.curentArray, function(n, i) {
                    return new RegExp(_ovalue + '[^"]*').test(n);
                });
                _this.toFragment.call(_this, _value, arr);
                _this.arrLen = arr.length;
            } else {
                _this.toFragment.call(_this, _value, _this.config.emailArray);
                _this.arrLen = _this.config.emailArray.length;
            }

        });
        this.targetContent.on("click", 'li', function() {
            _this.config.targetInput.val($(this).html());
            _this.config.targetInput.focus();
            _this.config.targetInput.blur();
            _this.visible();
        });
        this.targetContent.on('mouseover', 'li', function () {
            $(this).css(_this.hoverCss);
        });
        this.targetContent.on('mouseout', 'li', function () {
            $(this).css(_this.normalCss);
        });
        $(document).bind("click", function() {
            _this.visible();
        });
        $(document).bind("keydown", function(e) {
            if (e.keyCode == 40) { //向下
                _this.goDown();
            } else if (e.keyCode == 38) { //向上
                _this.goUp();
            } else if (e.keyCode == 13) {
                var li = _this.targetContent.find("li.hover");
                if (li.length > 0) {
                    var value = li.html();
                    _this.config.targetInput.val(value);
                }
                _this.visible();
            } else if (e.keyCode == 9 || e.keyCode == 27) {
                _this.visible();
            } else {

            }

        });
    },
    goUp: function() {
        if (this.cur == 0 || this.cur == -1) {
            this.cur = 0;
        } else {
            this.cur--;
        }
        this.changeSelect();
    },
    goDown: function() {
        if (this.cur >= this.arrLen - 1) {
            this.cur = this.arrLen - 1;
        } else {
            this.cur++;
        }
        this.changeSelect();
    },
    getPosition: function(ele) {
        var x = ele.offset().left;
        var y = ele.offset().top + ele.outerHeight();
        return {
            left: x,
            top: y
        };
    },
    changeSelect: function() {
        var ele = this.targetContent.find("li").eq(this.cur);
        ele.addClass("hover").css(this.hoverCss)
            .siblings().removeClass("hover").css(this.normalCss);
        this.config.targetInput.val(ele.html());
    },
    visible: function() {
        this.cur = -1;
        this.targetContent.hide();
    },
    showFragment: function () {
        var point = this.getPosition(this.targetContent);
        if (point.left <= 0) {
            var point2 = this.getPosition(this.config.targetInput);
            this.targetContent.css({ "left": point2.left + "px", "top": point2.top + "px" });
        };
        this.targetContent.show();
    },
    toFragment: function (value, arr) { //生成补全列表
        if (value == "" || arr.length <= 0) {
            this.visible();
            return;
        }
        var str = "";
        str = "<ul>";
        $.each(arr, function (i, v) {
            str += "<li style=\"padding-left: 3px;height: 24px;font-size:14px;color: #555;font-family: \"Microsoft YaHei\";\">" + value + "" + v + "</li>";
        });
        str += "</ul>";
        this.targetContent.html(str);
        this.showFragment();
    }
};

(function($) {
    $.fn.autoEmail = function() {
        $(this).each(function() {
            var $this = $(this);
            $this.attr('autocomplete', 'off');
            new AutoEmail().init({ targetInput: $this });
        });
    };
})(jQuery);