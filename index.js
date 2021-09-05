var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var started = false;
var buttonColors = ["red", "blue", "green", "yellow"];


$(document).keypress(() => {

    if (!started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
});



$(".btn").click(function() {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    makeSound(userChosenColor);
    addAnimation(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);



});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);

        }



    } else {
        makeSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game over,press A Any Key");

        setTimeout(() => {
            $("body").removeClass("game-over")

        }, 200);
        startover();
    }



}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("level " + level);
    var randomNumber = (Math.floor(Math.random() * 3) + 1);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    makeSound(randomChosenColor);


    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function addAnimation(colorButton) {
    var activeButton = $("#" + colorButton);
    activeButton.addClass("pressed");
    setTimeout(() => {
        activeButton.removeClass("pressed");
    }, 100);
}

function makeSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function startover() {
    level = 0;
    gamePattern = [];
    started = false;

}