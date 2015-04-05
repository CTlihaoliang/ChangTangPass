

//消息列表平台代号


//当前页码
var msgPageIndex = 1;
//日期反序列化
function convertJSONDateToJSDateObject(jsondate) {
    var date = new Date(parseInt(jsondate.replace("/Date(", "").replace(")/", ""), 10));
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hh = date.getHours();
    var mm = date.getMinutes();
    var ss = date.getSeconds();
    return year + "-" + formateDate(month) + "-" + formateDate(day) + " " + formateDate(hh) + ":" + formateDate(mm) + ":" + formateDate(ss);
}
function formateDate(d) {
    if (d < 10) {
        return '0' + d;
    }
    return d;
}

//创建js分页控件
function initPager(code, recordCount, pageIndex, pageCount, data) {

    //初始化设置
    // $("#msgPgNum").hide().empty();
    if (pageCount > 1) {
        $("#msgPgNum").show().pager({ pagenumber: pageIndex, pagecount: pageCount, totalcount: recordCount, buttonClickCallback: msgPageClick });
    }

    //显示统计信息
    // $("#msgPgCnt").hide().empty();
    if (recordCount > 0) {
        $("#msgPgCnt").show().html("共<span>" + recordCount + "</span>条消息 当前<span>" + pageIndex + "</span>/<span>" +
            pageCount + "</span>页");
        msgPageIndex = pageIndex;
    }

    //数据列表填充
    $("#msgListMaster").empty();
    $.each(data, function (key, value) {
        var item = '<li><span class="m-li-td">';
        item += '<input type="checkbox"  id="chkMsgItem' + key + '" name="chkMsgItems" />';
        item += '<input type="hidden" value="' + data[key].id + '" />';
        item += '<input type="hidden" value="' + key + '" />';
        item += '<input type="hidden" value="' + code + '" />';
        item += '</span>';
        item += '<span class="m-li-td2 msg-type' + (data[key].isRead ? '-on' : '') + '" title="' + (data[key].isRead ? '已' : '未') + '读">';
        item += '&nbsp;';
        item += '</span>';
        item += (code == 0 ? '<span class="m-li-td">' + (data[key].platName != '' ? '[' + data[key].platName + ']' : '&nbsp;') + '</span>' : '');
        item += '<p class="' + (code > 0 ? 'm-li-td2 m-title2' : 'm-li-td m-title') + (data[key].isRead ? "" : " fb") + '" id="msgItemTitle' + data[key].id + '">';
        item += '<a href="javascript:void(0);" onclick="seeMsgView(this,' + code + ',' + data[key].id + ')">';
        item += data[key].title;
        item += '</a>';
        item += '</p>';

        item += '<div class="m-list-date">';
        item += convertJSONDateToJSDateObject(data[key].createTime);
        item += '</div>';
        item += '</li>';
        $("#msgListMaster").append(item);
    });

    //绑定复选框更改状态事件
    if (recordCount > 0) {
        $(document).on("click", "#msgListMaster input[name='chkMsgItems']", function () {
            var notCheckedSize = $("#msgListMaster input:not(:checked)[name='chkMsgItems']").size();
            if (notCheckedSize > 0) {
                $("#chkAllMsgItems").attr("checked", false);
            } else if (notCheckedSize == 0) {
                $("#chkAllMsgItems").attr("checked", true);
            }
        });
    }

    //列表操作动作
    $("#msgListAction").empty().hide();
    if (recordCount > 0) {
        $("#msgListAction").show().html(
               "<div class=\"m-s-td\">" +
                    "<input type=\"checkbox\" id=\"chkAllMsgItems\" name=\"chkAllMsgItems\" />" +
                    "<label for=\"chkAllMsgItems\">全部</label>" +
                "</div>" +
                "<div class=\"m-s-td\">" +
                "<a href=\"javascript:void(0);\" class=\"btn-b2\" onclick=\"setMsgRead();return false;\">设为已读<i></i></a> " +
                "<a href=\"javascript:void(0);\" class=\"btn-b2\" onclick=\"deleteMsgItems();return false;\">删除所选<i></i></a> " +
                "<a href=\"javascript:void(0);\" class=\"btn-b2\" onclick=\"clearMsgItems();return false;\">清空<i></i></a>" +
                "</div>");
        //全部选中或取消
        $(document).on("click", "#chkAllMsgItems", function () {
            var inputs = $("#msgListMaster input[name='chkMsgItems']");
            inputs.prop("checked", this.checked);
        });
    }

    //没有任何消息记录
    if (recordCount <= 0) {
        showMsgCenterInfo("当前没有消息记录！");
    }
}

//分页按钮事件
var msgPageClick = function (pageIndex) {
    getMsgList(pageIndex, false, 2, null, null);
};

//ajax获取列表全局变量标记
var ajax_get_list_ajax_globa = null;
var change_get_list_ajax_globa = 0;

//获取消息列表
function getMsgList(pageIndex, isLock, loadType, msgIds, aCode) {

    //是否限单个访问
    if (isLock && change_get_list_ajax_globa != 0) {
        return false;
    }

    //设置ajax访问在正进行中标记
    change_get_list_ajax_globa = 1;

    //中止多个ajax访问
    abortMsgMultAjax();

    //ajax请求前与后的动作
    var loadingBeforeFun = null;
    var loadingCompleteFun = null;
    if (loadType == 2 || loadType == 3) {
        if (loadType == 3) {
            loadingBeforeFun = function () {
                dMessage.showLoading("提交中，请稍候……");
            };
            loadingCompleteFun = function () {
                change_get_list_ajax_globa = 0;
                dMessage.closeLoading();
            };
        } else {
            loadingBeforeFun = function () {
            };
            loadingCompleteFun = function () {
                change_get_list_ajax_globa = 0;
            };
        }
    } else {
        loadingBeforeFun = function () {
            showMsgCenterLoading();
        };
        loadingCompleteFun = function () {
            change_get_list_ajax_globa = 0;
            $("#msgLoadingBox").hide().empty();
        };
    }

    /*创建ajax访问*/
    ajax_get_list_ajax_globa = $.ajax({
        url: "ajax/getmessage.ashx",
        dataType: "json",
        data: "lpcode=" + msglPCode + "&page=" + pageIndex +
                 (msgIds != null ? "&msgids=" + msgIds : "") + (aCode != null ? "&acode=" + aCode : ""),
        cache: false,
        beforeSend: function () {
            loadingBeforeFun();
        },
        success: function (jsonData) {
            var tipDefaultMsg = "服务器繁忙，请稍候再试！";
            //验证返回数据是否有效
            if (!jsonData) {
                showMsgInfo(tipDefaultMsg);
                return;
            }
            //请求的处理是否成功，并给出提示
            if (jsonData.valid != true) {
                showMsgInfo((!!jsonData.msg ? jsonData.msg : tipDefaultMsg));
                return;
            }
            //操作提示消息
            if (jsonData.valid == true && jsonData.affect <= 0 && jsonData.msg != "") {
                showMsgAlertInfo(jsonData.msg);
            }
            //初始分页控件
            initPager(jsonData.code, jsonData.total, jsonData.pageIndex, jsonData.pageCount, jsonData.data);
        },
        complete: function () {
            loadingCompleteFun();
        },
        error: function () {
            // showMsgInfo(tipDefaultMsg);
        }
    });
};

//初始化函数
$(function () {

    //绑定显示平台消息事件
    $("#J_msg_til span").bind("click", function () {
        if (!($(this).hasClass("on"))) {
            $(this).addClass("on").siblings().removeClass();
            msglPCode = $(this).find("input:hidden:first").val();
            getMsgList(1, false, 1, null, null);
        }
    });
    //初始获取默认消息列表
    getMsgList(1, false, 1, null, null);
});

//设置消息为已读
function setMsgRead() {
    var msgIds = getMsgChecked().join("-");
    if (!!msgIds) {
        getMsgList(msgPageIndex, true, 3, msgIds, 2);
    } else {
        showMsgAlertInfo("请先选择要操作的消息！");
    }
}

function closeDialog() {
    if ($ && $.dialog) {
        $.dialog.closeAll();
    }
}
function closeAllDialog() {
    if ($ && $.dialog) {
        $.dialog.closeAll();
    }
}

//删除指定消息
function deleteMsgItems() {
    var msgIds = getMsgChecked().join("-");
    if (!!msgIds) {
        getMsgList(msgPageIndex, true, 3, msgIds, 4);
    } else {
        showMsgAlertInfo("请先选择要操作的消息！");
    }
}

//清空当前消息列表
function clearMsgItems() {
    var inputs = $("#msgListMaster input[name='chkMsgItems']");
    var msgIds = "";
    if (inputs.size() > 0) {
        msgIds = inputs.map(function () {
            return $(this).next("input:hidden").val();
        }).get().join("-");
    }
    if (!!msgIds) {
        lhgdialog.confirm("确认清空？",
            function () {
                getMsgList(msgPageIndex, true, 3, msgIds, 8);
            });
    } else {
        showMsgAlertInfo("没有可清空的消息！");
    }
}

//获取选中消息ID数组
function getMsgChecked() {
    var inputs = $("#msgListMaster input[name='chkMsgItems']");
    if (inputs.size() > 0) {
        return inputs.map(function () {
            if (this.checked) {
                return $(this).next("input:hidden").val();
            }
        }).get();
    }
    return new Array();
}

//终止同时多个ajax请求消息
function abortMsgMultAjax() {
    if (ajax_get_list_ajax_globa) {
        try {
            ajax_get_list_ajax_globa.abort();
        } catch (e) {
            ajax_get_list_ajax_globa = null;
        }
    }
}

//自适应位置显示提示信息
function showMsgInfo(msg) {
    //var inputs = $("#msgListMaster input[name='chkMsgItems']");
    //if (inputs.size() > 0) {
        showMsgAlertInfo(msg);
    //} else {
    //    showMsgCenterInfo(msg);
    //}
}

//显示alert提示信息
function showMsgAlertInfo(msg) {
    setTimeout(function () {
        dMessage.show(msg, 5);
    }, 50);
}

//显示在列表内容区域提示信息
function showMsgCenterInfo(msg) {
    $("#msgListMaster").empty();
    $("#msgListAction,#msgLoadingBox,#msgPgCnt,#msgPgNum").hide().empty();
    if (msg.indexOf('当前没有消息记录') > -1) {
        $("#msgCenterInfoBox").show().html("<div class=\"action-state no-info\"></div>");
    } else {
        $("#msgCenterInfoBox").show().html("<div class=\"action-state\"><div class=\"a-s-con\"><h3 style=\"padding-top:14px\">" + msg + "</h3></p></div></div>");
    }
}

//显示加载中样式信息
function showMsgCenterLoading() {
    $("#msgListMaster").empty();
    $("#msgListAction,#msgCenterInfoBox,#msgPgCnt,#msgPgNum").hide().empty();
    $("#msgLoadingBox").show().html("<div id=\"msgCenterLoading\" class=\"action-state\"><div class=\"a-s-con loading\"></div></div>");
}

//设置消息项样式
function setMsgItemStyle(id) {
    jQuery("#msgItemTitle" + id).removeClass("fb");
    $("#msgListMaster input[name='chkMsgItems']").parent().parent("li").removeClass("msg-bg");
    jQuery("#msgItemTitle" + id).parent("li").addClass("msg-bg").find("span:first").next("span").removeClass("msg-type").addClass("msg-type-on");
}

//查看消息
function seeMsgView(obj, code, id) {

    var itemCurrent = $(obj).parent().parent("li");
    var itemPrev = $(obj).parent().parent("li").prev();
    var itemPrevSize = itemPrev.size();
    var itemPrevId = 0;
    if (itemPrevSize > 0) {
        itemPrevId = itemPrev.find("input[name='chkMsgItems']").next("input:hidden").val();
    }

    var itemNext = $(obj).parent().parent("li").next();
    var itemNextSize = itemNext.size();
    var itemNextId = 0;
    if (itemNextSize > 0) {
        itemNextId = itemNext.find("input[name='chkMsgItems']").next("input:hidden").val();
    }

    var total = $("#msgListMaster input[name='chkMsgItems']").size();
    var index = itemCurrent.find("input[name='chkMsgItems']").next().next("input:hidden").val();

    var viewMsgDialog = $.dialog.list['StationMsgView'];
    if (!viewMsgDialog) {
        viewMsgDialog = $.dialog({
            id: 'StationMsgView', title: '请稍候...', content: 'url:messageview.html?code=' + code + '&msgid=' + id + '&prevmsgid=' + itemPrevId + '&nextmsgid=' + itemNextId + '&total=' + total + '&index=' + (parseInt(index) + 1),
            close: function () { $("#msgListMaster input[name='chkMsgItems']").parent().parent("li").removeClass("msg-bg"); }, max: false, min: false, resize: false, width: 460, height: 235, fixed: true
        });
    }
    else {
        viewMsgDialog.title("请稍候...").content('url:messageview.html?code=' + code + '&msgid=' + id + '&prevmsgid=' + itemPrevId + '&nextmsgid=' + itemNextId + '&total=' + total + '&index=' + (parseInt(index) + 1), false, true);
    }
}

//根据消息ID,查看消息
function seeMsgViewById(id) {
    {
        var newItemObj = null;
        var newItemCode = null;
        var chkMsgItems = $("#msgListMaster input[name='chkMsgItems']");
        var chkMsgItemsSize = chkMsgItems.size();
        if (chkMsgItemsSize > 0) { }
        chkMsgItems.each(function () {
            if (parseInt($(this).next("input:hidden").val()) == id) {
                newItemObj = $(this);
                newItemCode = $(this).next().next().next("input:hidden").val()
            }
        });
    }

    if (newItemObj != null && newItemCode != null) {
        seeMsgView(newItemObj, newItemCode, id);
        return true;
    } else {

        if (chkMsgItemsSize > 0) {
            var chkMsgItemsEq = chkMsgItems.eq(0);
            seeMsgView(chkMsgItemsEq,
            chkMsgItemsEq.next().next().next("input:hidden").val(),
            chkMsgItemsEq.next("input:hidden").val());
            return true;
        }
        else {
            closeDialog("StationMsgView");
            return false;
        }
    }
}




