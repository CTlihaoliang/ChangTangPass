
$(function () {
    var rateline = $('.rate-line');
    var percent = rateline.attr('percent');
    $(".warm-tip i").bind("click", function () {
        $(this).closest(".warm-tip").fadeOut("slow");
    });
    rateline.addClass(percent < 25 ? "low" : (percent < 50 ? "middle" : "high")).animate({ "width": percent + "%" }, 1000);
});


