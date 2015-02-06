$(document).ready(function () {
    $("#red").click(function () {
        $("#myBox").css("background-color", "red");
    });

    $("#blue").click(function () {
        $("#myBox").css("background-color", "blue");
    });

    $("#clear").click(function () {
        $("#myBox").css("background-color", "white");
    });

    $("#hide").click(function () {
        $("#myBox").hide();
        $(".buttonGroup").hide();
    });

    $("#show").click(function () {
        $("#myBox").show();
        $(".buttonGroup").show();
    });

    $("#animate").click(function () {
        $("#myBox").animate({ right: '50px' });
    });

    $("#animateCenter").click(function () {
        $("#myBox").animate({ right: '520px' });
    });

    $("#fade").click(function () {
        $("#myBox").fadeTo("slow", 0.15);
    });

    $("#brighten").click(function () {
        $("#myBox").fadeTo("slow", 1);
    });
});