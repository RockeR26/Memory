var gamePattern = [];
var userClickedPattern = [];
var colors=["red","yellow","green","blue"];
var start=false;
var level=0;
$("#ru").click(function(){
    $("#body").css("opacity",0.5);
    $("#rules").css("opacity",1);
    setTimeout(function(){
        $("#body").css("opacity",1);
        $("#rules").css("opacity",0); 
    },7000);
});
$('#start').click(function(){
    if(!start){
        start=true;
        setTimeout(function(){
            nextSeq();
            $(".btn").click(function(){
                var userColor=$(this).attr("id");
                music(userColor);
                anime(userColor);
                userClickedPattern.push(userColor);
                check();
            });
        },300);
    }
});
function nextSeq(){
    userClickedPattern=[];
    level++;
    randomNo=Math.floor(Math.random()*4);
    randomColor=colors[randomNo];
    music(randomColor);
    anime(randomColor);
    gamePattern.push(randomColor);
    $("h2").text("Level "+level);
}
function music(val){
    var audio=new Audio("sounds/"+val+".mp3");
    audio.play();
}
function anime(color){
    $("#"+color).addClass("pressed")
    setTimeout(function(){
        $("#"+color).removeClass("pressed");  
    },100)  
}
function startOver(){
    start=false;
    level=0;
    gamePattern=[];
}
function check(){
    if(userClickedPattern[(userClickedPattern.length-1)]===gamePattern[(userClickedPattern.length-1)]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSeq();
            },1000);        
    }}
    else{
        $("body").addClass("game-over")
        setTimeout(function(){ $("body").removeClass("game-over")},400);
        music("wrong");
        $("h2").text("Game Over ☹! Press Start Button to restart");
        startOver();
    }
}