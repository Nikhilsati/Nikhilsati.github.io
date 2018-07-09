var canvas;
var canvasContext;
var ballx = 50;
var ballSpeedXmax=6;
var ballSpeedXmin=3;
var ballSpeedX = Math.floor(Math.random() * (ballSpeedXmax - ballSpeedXmin)) + ballSpeedXmin;
var bally = 50;
var ballSpeedYmax=6;
var ballSpeedYmin=3;
var ballSpeedY = Math.floor(Math.random() * (ballSpeedYmax - ballSpeedYmin)) + ballSpeedYmin;
var paddle1y = 250;
var paddle2y = 250;
let count = 0;
const PADDLE_HEIGHT = 250;
const calculateMousePos = (evt) => {
    var react =canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - react.left - root.scrollLeft;
    var mouseY = evt.clientY - react.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    };
}
    

window.onload = function() {
    
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    var framesPerSecond = 300;
    setInterval(function() {    
                                moveEverything();
                                drawEverything(); 
                            }, 1000/framesPerSecond);
    canvas.addEventListener('mousemove', function(evt) {
        var mousePos = calculateMousePos(evt);
        paddle1y = mousePos.y -(PADDLE_HEIGHT/2);
    });
    
    }

const countDisp = () => {
    document.getElementById("score").innerHTML = count;
}

const ballReset = () => {
    ballx =  canvas.width; 
    bally =  canvas.height/2; 
    count = 0;
    countDisp();
}

const moveEverything = () => {
    
    ballx = ballx + ballSpeedX;
    if ( ballx > canvas.width) {
        ballSpeedX = -ballSpeedX;
    }
    if ( ballx < 0) {
        
//        
        if  (bally > paddle1y &&  bally < paddle1y+PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
            count=count+1;
            countDisp(); 
        }
        else 
        ballReset();
        
    }
     bally = bally + ballSpeedY;
    
    if ( bally > canvas.height) {
        ballSpeedY =  -ballSpeedY;
    }
    if ( bally < 0) {
        ballSpeedY = -ballSpeedY;
        
    }
    
    
}
const drawEverything = () => {
    
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    colorRect(0, paddle1y, 20, PADDLE_HEIGHT, 'white');
    colorCircle(ballx, bally, 10, 'white');
   
}
const colorCircle = (centerX, centerY, radius, drawColor) => {
     canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();

    
}
const colorRect = (leftX ,topY, width, height, drawColor) => {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}