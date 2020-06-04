var gamePattern = [];
var userClickedPattern = [];
var colors=["red","yellow","green","blue"];
var start=false;
var level=0;
$("#ru").click(function(){
    $("#rules").css("visibility","visible");
    $("#close").click(function(){
        $("#rules").css("visibility","collapse");
    })
}); 
$('#start').click(function(){
    if(!start){
        setTimeout(function(){
            nextSeq();
        },300);
        start=true;
       
    }
});
$(".btn").click(function(){
    if (start===true){
    var userColor=$(this).attr("id");
    music(userColor);
    anime(userColor);
    userClickedPattern.push(userColor);
    check(userClickedPattern.length-1);
    }
});     

    


function nextSeq(){
    userClickedPattern = [];
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
    },150)  
}

function startOver(){
    start=false;
    level=0;
    gamePattern = [];
}

function check(i){
    if(userClickedPattern[i]===gamePattern[i]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSeq();
            },1000);        
        } 
    }
    else{
        music("wrong");
        $("body").addClass("game-over");
        $("h2").text("Game Over ☹! Press Start Button to restart");
        setTimeout(function(){ $("body").removeClass("game-over")},400);
      
        startOver();
    }
}