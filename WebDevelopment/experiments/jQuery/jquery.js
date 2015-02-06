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

$(function () {
    var availableTags = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];
    $("#tags").autocomplete({
        source: availableTags
    });

    $("#slider").slider({
        value: 40,
        animate: "slow",
        orientation: "horizontal"
    });

    $("#datepicker").datepicker();
    $("#dialog").dialog({
        autoOpen: true,
        buttons: {
            OK: function () { $(this).dialog("close"); }
        },
        title: "Success"       
    });

    $("#tabs").tabs();
    $("#btn").click(function () {
        $("#msg").addClass("msg").html("<b>You have successfully completed the form</b>");
    });
});