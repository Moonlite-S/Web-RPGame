$(document).ready(function () {

    var prologue = "<h1>Hey there traveler! Or should I say <span class=\"playerFirstName\"</span>!</h1>" +
        "<a class=\"to_prologue_1\" href=\"#\"><h2>Next</h2></a>";

    //Confimation on character creation
    $(document).on("click", ".to_prologue", function () {
        $(".main.title").animate({ 'opacity': 0 }, 500, function () {
            $(".main.title").html(prologue);
            $(".playerFirstName").html(userPlayer.getName("firstName"));
        }).animate({ 'opacity': 1 }, 500);
    });

    var prologue_text_1 = "<h1>I should be moving mbut i stil feel the same  lol</h1>" +
        "<a class=\"to_prologue_2\" href=\"#\"><h2>Next</h2></a>";

    nextButton(".to_prologue_1", prologue_text_1);

    var prologue_text_2 = "<h1> I am really hesitant on actually doign a story with this...</h1>";

    nextButton(".to_prologue_2", prologue_text_2);
});