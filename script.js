const canvas = document.getElementById("game");
const cntx = canvas.getContext("2d");
class snakeCord
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }
}
// initial values
let speed = 7;
let cnt = 20;
let size = canvas.width/cnt-2;
let headX = 10;
let headY = 10;
const snakeArray = [];
let initialLength = 2;
let fruitX = 5;
let fruitY = 5;
let xCord = 0;
let yCord = 0;
let score = 0;
const echoFruit = new Audio("gulp.mp3");
function playGame()
{
    clearScreen();
    changeSnakePosition();
    if(isGameOver())
    {
      clearScreen();
      cntx.fillStyle =  'white';
      cntx.font = "50px Verdana";
      let gar = cntx.createLinearGradient(0,0,canvas.width,0);
      gar.addColorStop("0" ,"magenta");
      gar.addColorStop("0.5" ,"yellow");
      gar.addColorStop("1.0" ,"red");
      cntx.fillStyle = gar;
      cntx.fillText("Game Over! ",canvas.width/6.5,canvas.height/2);
      return;
    }
    checkCollision();
    drawFruit();
    drawSnake();
    drawScore();
    if(score>100)
       speed = 11;
    setTimeout(playGame,1000/speed);
}
function isGameOver()
{
    if(xCord===0  && yCord===0)
      return false;
    else if(headX<0)
      return true;
    else if(headX===cnt)
     return true;
    else if(headY<0)
     return true;
    else if(headY===cnt)
     return true;
    else
    {
        for(let i=0;i<snakeArray.length;i++)
        {
            if(snakeArray[i].x===headX && snakeArray[i].y===headY)
              return true;
        }
    }
    return false;
}
function drawScore()
{
    cntx.fillStyle = 'white';
    cntx.font = "10px Verdana";
    cntx.fillText("Score "+ score,canvas.width-50,10);
}
function clearScreen()
{
    cntx.fillStyle = 'black';
    cntx.fillRect(0,0,canvas.width,canvas.height);
}
function drawSnake()
{
    cntx.fillStyle = 'green';
    for(let i=0;i<snakeArray.length;i++)
    {
        cntx.fillRect(snakeArray[i].x*cnt,snakeArray[i].y*cnt,size,size);
    }
    snakeArray.push(new snakeCord(headX,headY));
    while(snakeArray.length>initialLength)
    {
        snakeArray.shift();
    }
    cntx.fillStyle = 'orange';
    cntx.fillRect(headX*cnt,headY*cnt,size,size);
}
function changeSnakePosition()
{
    headX = headX+xCord;
    headY = headY+yCord;
}
function drawFruit()
{
    cntx.fillStyle = 'red';
    cntx.fillRect(fruitX*cnt,fruitY*cnt,size,size);
}
function checkCollision()
{
    if(fruitX==headX && fruitY==headY)
    {
        fruitX = Math.floor(Math.random()*cnt);
        fruitY = Math.floor(Math.random()*cnt);
        initialLength++;
        score+=10;
        echoFruit.play();
    }
}
// keyboard Events
document.body.addEventListener('keydown',function(event){
    // upward movement
    if(event.keyCode==38)
    {
        if(yCord==1)
          return;
        yCord=-1;
        xCord=0;
    }
    // downward movement
    else if(event.keyCode==40)
    {
        if(yCord==-1)
          return;
        yCord=1;
        xCord=0;
    }
    // left movement
    else if(event.keyCode==37)
    {
        if(xCord==1)
          return;
        yCord=0;
        xCord=-1;
    }
    // right movement
    else if(event.keyCode==39)
    {
        if(xCord==-1)
          return;
        yCord=0;
        xCord=1;
    }
})
playGame();