var gamePattern = [];
var userClickedPattern = [];
var randomColor=[ "red" , "blue" , "green" , "yellow" ];
var level=0;
var started=false;

function nextSeq() {
    userClickedPattern=[];
    level++;
    $("h2").text("Level " + level);
    var randomNo = Math.floor(Math.random()*4);
    var colorChosen = randomColor[randomNo];
    music(colorChosen);
    $("#"+colorChosen).fadeIn(150).fadeOut(150).fadeIn(150);
    gamePattern.push(colorChosen);
}
function music (name){
    var audio=new Audio("sounds/"+ name +".mp3")
    audio.play();
} 

function animate(name){
    $("#"+name).addClass("pressed");
    setTimeout(function (){
        $("#"+name).removeClass("pressed");
    },100);
}
function checkAnswer(stage) {
    if(gamePattern[stage]===userClickedPattern[stage]){
        if(userClickedPattern.length===gamePattern.length)
            { 
                setTimeout(function () {
                    nextSeq();
                },1000);
            }
    }
    else{
        music("wrong");
        $("body").addClass("game-over");
        $("h2").text("Game Over, Press Enter to restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}
function startOver() {
    level=0;
    gamePattern=[];
    started=false;
}


$(document).keydown(function () {
    if(!started){
        started=true;
        nextSeq();
    }
});
$(".btn").click(function () {
var userChosen = $(this).attr("id");
userClickedPattern.push(userChosen);
music(userChosen);
animate(userChosen);
checkAnswer(userClickedPattern.length-1);
});


