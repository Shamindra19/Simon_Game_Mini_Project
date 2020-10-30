//alert("Hi Simon");
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern=[];
var started=false;
var level=0;

$(document).keypress(function()
{
  if(!started)
  {
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }
});
$(".btn").click(function(){
  var userChosenColor=$(this).attr("id");
  userClickPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickPattern.length-1);
});

function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel]===userClickPattern[currentLevel])
  {
    //console.log("Success");
        if(userClickPattern.length===gamePattern.length)
    {
      setTimeout(function(){nextSequence();},1000);
    }
  }
  else
  {
  //  console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    var v=$("#level-title").html("<br>");
    $("#level-title").text("Game Over,Your Score: "+(level-1));
    $("#level-title").append("<br>Press any Key to Restart");
    setTimeout(function(){$("body").removeClass("game-over");},200);

    startOver();
  }
}

function nextSequence()
{
  userClickPattern=[];
  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}

function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColor)
{
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){$("#"+currentColor).removeClass("pressed")},100);
}
function startOver()
{
  level=0;
  gamePattern=[];
  started=false;
}
