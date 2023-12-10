var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStart = false;
var level = 0;

$(document).keydown(function () {
    if (!gameStart){
        $("#level-title").text ("Level 0")
        newSequence ();
        gameStart = true;
        
    }
});

$(".btn").click (function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        
        console.log("success");
        
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
             newSequence();
            }, 1000);
            userClickedPattern = [];
         }
    }

      else {
        console.log("wrong");
        
        playSound("wrong");
        
        $("body").addClass("game-over");
        setTimeout(function () {
         $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function newSequence () {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor (Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour); 
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function (){
    $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStart = false;
}