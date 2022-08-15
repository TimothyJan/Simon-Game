
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
started = false;
var level = 0;

// Start Game after key press
$(document).keypress(function(){
  if (!started){
    $("#level-title").text("Level: " + level);
    nextSequence();
    started = true;
  }
});

// User Clicked Button
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  //Checks pressed button matches gamePattern
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
  //reset userClickedPattern
  userClickedPattern = [];

  // Level Incremented
  level += 1;
  $("#level-title").text("Level: " + level);

  //Random color
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //Animate flash for random button
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name){
  // Plays sound based on button
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  // Animates button press
  $("#"+currentColour).addClass("pressed");
  setTimeout(function() {
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  // Checks that most recent user button matches gamePattern
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
        }, 1000);
        }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      $(document).keypress(startOver());
    }
}

function startOver(){
  // Resetslevel, gamePattern and started
  level = 0;
  gamePattern = [];
  started = false;
}
