
$(function () {

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
    initArea("#provice1", "#city1", "#area1");

    initDate.call(null, $("#year"), $("#month"), $("#day"));
    //表单校验  
   
    var dateValidate = function () {
        if ($("#year").val() == -1) {
            return true;
        } else {
            var y = $("#year").val();
            var m = $("#month").val();
            var d = $("#day").val();
            if (y == 0 && m == 0 && d == 0) {
                $("#year").parent().next(".ifoTip").hide();
                return true;
            }
            var rule = validateRules.isDate(y,m, d);
            if (rule) {
                $("#year").parent().next(".ifoTip").hide();
                return true;
            } else {
                var msg = "出生年月日期不对";
                if (y == 0 || m == 0 || d == 0) {
                    msg = "生日未选择完整";
                }
                $("#year").parent().next(".ifoTip").addClass("error").html(msg).show();
                return false;
            }
        }
    };
    $('#year,#month,#day').bind('change', function () {
        var flag = dateValidate();
        if (flag) {
            $('#BForm :submit').prop('disabled',false).removeClass('disabled');
        } else {
            $('#BForm :submit').prop('disabled',true).addClass('disabled');
        }
    });
    /*地区选择验证*/
    var areaValidate = function(p,c,d) {
        var _p =parseInt($('#'+p).val());
        var _c = parseInt($('#' + c).val());
        var _d = parseInt($('#' + d).val());
        var flag = false;
        if (_p == 0 && _c == 0 && _d == 0) {
            flag = true;
        }else if (_p > 0 && _c > 0) {
            if ($('#' + d + ' option').length <= 1) {
                flag = true;
            }else if (_d > 0) {
                flag = true;
            }
        }
        if (!flag) {
            $('#' + p).parent().next(".ifoTip").addClass("error").html("地区选择不正确。").show();
            $('#' + p).focus();
            return false;
        } else {
            $('#' + p).parent().next(".ifoTip").hide();
            return true;
        }
    };

    $('#BForm').regsubmit(function (form) { return formValidate(form) && dateValidate() && areaValidate('provice1', 'city1', 'area1'); });
   
    //$('[name="Degree"],[name="Business"],[name="AnnualIncome"]').each(function () {
    //    var selectedValue = $(this).attr('selectedValue');
    //    if (typeof selectedValue == 'undefined' || selectedValue == '0') {
    //        return;
    //    }
    //    try {
    //        $(this).val(selectedValue);
    //    }catch (e){}
    //});
});




