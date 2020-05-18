//Variables for game board
var cborder = "#ec6407";
var ccolor = "#1a074b";
var Canvas = document.getElementById("board");
var dimen = Canvas.getContext("2d");

var maze = [];
for(var i = 0 ; i < 20 ; i++)
{
    for (var j = 0 ; j < 2 ; j++)
    {
        maze.push({x:160 + (i * 10), y:170 + (j * 10)});
        maze.push({x:160 + (i * 10), y:350 + (j * 10)});
    }
}
maze.push({x:160, y:190}, {x:160, y:200}, {x:170, y:190}, {x:170, y:200}, {x:340, y:190}, {x:340, y:200}, {x:350, y:190}, {x:350, y:200});
maze.push({x:160, y:330}, {x:160, y:340}, {x:170, y:330}, {x:170, y:340}, {x:340, y:330}, {x:340, y:340}, {x:350, y:330}, {x:350, y:340});

for(var i = 0 ; i < 6 ; i++)
{
    for (var j = 0 ; j < 2 ; j++)
    {
        maze.push({x:120 + (i * 10), y : 210 + (j * 10)});
        maze.push({x:340 + (i * 10), y : 210 + (j * 10)});
        maze.push({x:120 + (i * 10), y : 310 + (j * 10)});
        maze.push({x:340 + (i * 10), y : 310 + (j * 10)});
    }
}
for(var i = 0 ; i < 9 ; i++)
{
    for (var j = 0 ; j < 3 ; j++)
    {
        maze.push({x:40 + (i * 10), y : 40 + (j * 10)});
        maze.push({x:40 + (i * 10), y : 450 + (j * 10)});
        maze.push({x:390 + (i * 10), y : 40 + (j * 10)});
        maze.push({x:390 + (i * 10), y : 450 + (j * 10)});
    }
}
for(var i = 0 ; i < 6 ; i++)
{
    for (var j = 0 ; j < 3 ; j++)
    {
        maze.push({x:40 + (i * 10), y : 70 + (j * 10)});
        maze.push({x:40 + (i * 10), y : 420 + (j * 10)});
        maze.push({x:420 + (i * 10), y : 70 + (j * 10)});
        maze.push({x:420 + (i * 10), y : 420 + (j * 10)});
    }
}
for(var i = 0 ; i < 3 ; i++)
{
    for (var j = 0 ; j < 3 ; j++)
    {
        maze.push({x:40 + (i * 10), y : 100 + (j * 10)});
        maze.push({x:40 + (i * 10), y : 390 + (j * 10)});
        maze.push({x:450 + (i * 10), y : 100 + (j * 10)});
        maze.push({x:450 + (i * 10), y : 390 + (j * 10)});
    }
}
for(var i = 0 ; i < 8 ; i++)
{
    for (var j = 0 ; j < 2 ; j++)
    {
        maze.push({x:220 + (i * 10), y : 260 + (j * 10)});
        maze.push({x:220 + (i * 10), y : 60 + (j * 10)});
        maze.push({x:220 + (i * 10), y : 450 + (j * 10)});
    }
}
for(var i = 0 ; i < 2 ; i++)
{
    for (var j = 0 ; j < 4 ; j++)
    {
        maze.push({x:60 + (i * 10), y : 240 + (j * 10)});
        maze.push({x:450 + (i * 10), y : 240 + (j * 10)});
    }
}

var snake = [{x:300,y:260},{x:290,y:260},{x:280,y:260}];
var dx = 10;
var dy = 0;
var score = 0;
var temp;
var t = 1;
var speed = 100;

function drawSnake()
{
    snake.forEach(designSnake);
    dimen.fillStyle = "#f4ff00";
    dimen.strokeStyle = "#0d789d";
    dimen.fillRect(snake[0].x,snake[0].y,10,10);
    dimen.strokeRect(snake[0].x,snake[0].y,10,10);
}

function designSnake(snakePart)
{
    dimen.fillStyle = "#8ddffc";
    dimen.strokeStyle = "#0d789d";
    dimen.fillRect(snakePart.x,snakePart.y,10,10);
    dimen.strokeRect(snakePart.x,snakePart.y,10,10);
}

function drawMaze(mazePart)
{
    dimen.fillStyle = cborder;
    dimen.fillRect(mazePart.x,mazePart.y,10,10);
}

function blankCanvas()
{
    dimen.fillStyle = ccolor;
    dimen.fillRect(10,10,board.width-20,board.height-20);
    dimen.fillStyle = cborder;
    dimen.fillRect(0,0,board.width,10);
    dimen.fillRect(0,0,10,board.height);
    dimen.fillRect(0,510,board.width,10);
    dimen.fillRect(510,0,10,board.height);
    maze.forEach(drawMaze);
}

function advance()
{
    temp = score;
    const head = {x:snake[0].x+dx,y:snake[0].y+dy};
    snake.unshift(head);
    const eat = snake[0].x==X && snake[0].y==Y;
    if(eat)
        {
            if(speed === 50)
            {
                score = score + 5;
            }
            else if(speed === 75)
            {
                score = score + 4;
            }
            else if(speed === 100)
            {
                score = score + 3;
            }
            else if(speed === 125)
            {
                score = score + 2;
            }
            else if(speed === 150)
            {
                score = score + 1;
            }
            document.getElementById("points").innerHTML = score;
            createFood();
            drawFood();
        }
    else
        {
            snake.pop();
        }
}

function main()
{
    if (EndGame()) 
    {
        alert("Game over !! Your score is " + score + ". Refresh page to play again, or go back to Main Menu.");
        return;
    }
    setTimeout(function onTick()
    {
        blankCanvas();
        createFood();
        drawFood();
        advance();
        drawSnake();
        main();
    },speed);

}
document.addEventListener("keydown",directions)
function directions(event)
{
    const left = 37;
    const right = 39;
    const up = 40
    const down = 38;
    const key = event.keyCode;
    const goUp = dy == 10;
    const goDown = dy == -10;
    const goLeft = dx == -10;
    const goRight = dx == 10;
    
    if(key == left && !goRight)
        {
            dy = 0;
            dx = -10;
        }
    
    if(key == right && !goLeft)
        {
            dy = 0;
            dx = 10;
        }
    
    if(key == up && !goDown)
        {
            dy = 10;
            dx = 0;
        }
    
    if(key == down && !goUp)
        {
            dy = -10;
            dx = 0;
        }
}

document.getElementById("faster").addEventListener("click", speedUp);
function speedUp()
{
    if(speed === 150)
    {
        speed = 125;
    }
    else if(speed === 125)
    {
        speed = 100;
    }
    else if(speed === 100)
    {
        speed = 75;
    }
    else if(speed === 75)
    {
        speed = 50;
    }
}

document.getElementById("slower").addEventListener("click", speedDown);
function speedDown()
{
    if(speed === 50)
    {
        speed = 75;
    }
    else if(speed === 75)
    {
        speed = 100;
    }
    else if(speed === 100)
    {
        speed = 125;
    }
    else if(speed === 125)
    {
        speed = 150;
    }
}

function randomTen(min, max)
{
      return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function createFood()
{
    if(t == 1 || score != temp)
        {
            X = randomTen(10,board.width-20);
            Y = randomTen(10,board.height-20);
            snake.forEach(function foodinSnake(part)
            {
                var foodisonsnake = (part.x==X && part.y==Y);
                if(foodisonsnake)
                {
                    createFood();
                }
            });
            maze.forEach(function foodinMaze(part)
            {
                var foodisonmaze = (part.x==X && part.y==Y);
                if(foodisonmaze)
                {
                    createFood();
                }
            });
            t++;
            temp = score;
        }
    else return;
            
}

function drawFood()
{
    dimen.fillStyle="#d900ff";
    dimen.fillRect(X,Y,10,10);        
}

function EndGame()
{
    for (let i = 4; i < snake.length; i++)
    {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y)
        {
            return true;
        }
    }
    for (let i = 0; i < maze.length; i++)
    {
        if (maze[i].x === snake[0].x && maze[i].y === snake[0].y)
        {
            return true;
        }
    }

    const LeftWall = snake[0].x < 10;
    const RightWall = snake[0].x > board.width - 20;
    const ToptWall = snake[0].y < 10;
    const BottomWall = snake[0].y > board.height - 20;

    return LeftWall || RightWall || ToptWall || BottomWall
}
setTimeout(function onTick()
{
    document.getElementById("timer").innerHTML = "9";
},1000);
setTimeout(function onTick()
{
    document.getElementById("timer").innerHTML = "8";
},2000);
setTimeout(function onTick()
{
    document.getElementById("timer").innerHTML = "7";
},3000);
setTimeout(function onTick()
{
    document.getElementById("timer").innerHTML = "6";
},4000);
setTimeout(function onTick()
{
    document.getElementById("timer").innerHTML = "5";
},5000);
setTimeout(function onTick()
{
    document.getElementById("timer").innerHTML = "4";
},6000);
setTimeout(function onTick()
{
    document.getElementById("timer").innerHTML = "3";
},7000);
setTimeout(function onTick()
{
    document.getElementById("timer").innerHTML = "2";
},8000);
setTimeout(function onTick()
{
    document.getElementById("timer").innerHTML = "1";
},9000);
setTimeout(function onTick()
{
    document.getElementById("start_text").style.visibility = "hidden";
    main();
},10000);