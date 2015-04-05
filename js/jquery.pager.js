(function($) {
    $.fn.pager = function(options) {
        var opts = $.extend({}, $.fn.pager.defaults, options);
        return this.each(function() {
            $(this).empty().append(renderpager(parseInt(options.pagenumber), parseInt(options.pagecount), options.buttonClickCallback));
            //$('.pages li').mouseover(function() { document.body.style.cursor = "pointer"; }).mouseout(function() { document.body.style.cursor = "auto"; });
        });
    };

    function renderpager(pagenumber, pagecount, buttonClickCallback) {
        var $pager = $("<div class='Pager'></div>");

        $pager.append(renderButton('首页', pagenumber, pagecount, buttonClickCallback)).append(renderButton('上页', pagenumber, pagecount, buttonClickCallback));
        var startPoint = 1;
        var endPoint = 7;
        var thpoint = "";
        if (pagenumber > 3) {
            startPoint = pagenumber - 3;
            endPoint = pagenumber + 3;
        }
        if (endPoint > pagecount) {
            startPoint = pagecount - 6;
            endPoint = pagecount;
            thpoint = "";
        }
        if (startPoint < 1) {
            startPoint = 1;
        }
        for (var page = startPoint; page <= endPoint; page++) {
            var currentButton = $('<a href="javascript:void(0);">' + (page) + '</a>');
            if (page == pagenumber) {
                if (pagecount == 1 || pagenumber > pagecount) {
                    continue;
                }
                currentButton.addClass('CurrentPage');
            } else {
                currentButton.click(function() {
                    buttonClickCallback(this.firstChild.data);
                });
            }

            currentButton.appendTo($pager);
        }
        $pager.append(thpoint).append(renderButton('下页', pagenumber, pagecount, buttonClickCallback)).append(renderButton('末页', pagenumber, pagecount, buttonClickCallback));
        // var strgoto = $("<input type=\"text\" value=\"" + pagenumber + "\" id=\"gotoval\" onkeyup=\"value=value.replace(/[^\\d]/g,'')\" maxlength=\"12\" class=\"jump\" />");
        //$pager.append("到").append(strgoto)
        //$pager.append(changepage('GO', pagecount, buttonClickCallback));
        return $pager;
    }
    function changepage(buttonLabel, pagecount, buttonClickCallback) {
        var $btngoto = $("<input value=\"" + buttonLabel + "\" class=\"btn-go\" type=\"button\" />");
        $btngoto.click(function() {
            var gotoval = $('#gotoval').val();
            var patrn = /^[1-9]{1,20}$/;
            if (!patrn.exec(gotoval)) {
                //alert("请输入非零的正整数！");
                //return false;
                intval = 1;
            }
            var intval = parseInt(gotoval);
            if (intval > pagecount) {
                //alert("您输入的页面超过总页数 " + pagecount);
                //return;
                intval = pagecount;
            }
            buttonClickCallback(intval);
        });
        return $btngoto;
    }

    function renderButton(buttonLabel, pagenumber, pagecount, buttonClickCallback) {
        var $Button = $("<a href=\"javascript:void(0);\" >" + buttonLabel + "</a>");
        var destPage = 1;
        switch (buttonLabel) {
            case "首页":
                destPage = 1;
                break;
            case "上页":
                destPage = pagenumber - 1;
                break;
            case "下页":
                destPage = pagenumber + 1;
                break;
            case "末页":
                destPage = pagecount;
                break;
        }
        if (buttonLabel == "首页" || buttonLabel == "上页") {
            pagenumber <= 1 ? $Button = "" : $Button.click(function() { buttonClickCallback(destPage); });
        }
        else if (buttonLabel == "末页" || buttonLabel == "下页") {
            pagenumber >= pagecount ? $Button = "" : $Button.click(function() { buttonClickCallback(destPage); });
        } else {
            pagenumber >= pagecount ? "" : $Button.click(function() { buttonClickCallback(destPage); });
        }
        return $Button;
    }

    $.fn.pager.defaults = {
        pagenumber: 1,
        pagecount: 1
    };
})(jQuery);