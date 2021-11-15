let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

//позиционирование canvas
let xCoordCenterPage = document.documentElement.clientWidth / 2;
let yCoordCenterPage = document.documentElement.clientHeight / 2;

cvs.style.left = xCoordCenterPage - cvs.width / 2 + "px";
cvs.style.top = yCoordCenterPage - cvs.height / 2 + "px";



let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

//audio
let fly = new Audio();
let score_audio = new Audio();

fly.src = "audio/fly.mp3"
score_audio.src = "audio/score.mp3"


//создание блоков
let pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
}

//расстояние жежду блоками(пролет)
let gap = 110;


//взлет и звук взлета
document.addEventListener("keydown", moveUp, false);
function moveUp() {
    if(document.documentElement.contains(cvs) == false){
        document.removeEventListener("keydown", moveUp, false);
        return;
    }
    yPos += -50;
    fly.play();
}
console.log(document.documentElement.contains(cvs))



//позиция птички
let xPos = 10;
let yPos = 150;
let grav = 1.1;

let score = 0;

//отрисовка
function draw() {
    ctx.drawImage(bg, 0, 0);
    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--; // движение блоков влево

        if (pipe[i].x == 30) { //создание новых блоков
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        //столкновения
        if (xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
            gameOver();
            
        }
        else if (pipe[i].x == 5)//счет
         {
            score++;
            score_audio.play();

        }
        
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;
    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Cчет:" + score, 10, cvs.height - 20)
    requestAnimationFrame(draw);
}



//startButton

let startButton = document.getElementById("startButton");

let clientX = document.documentElement.clientWidth  / 2;
let clientY = document.documentElement.clientHeight / 2;

let xCoordForButt = clientX - 100;

startButton.style.left = xCoordForButt + "px";

startButton.onclick = function(){
    
     draw();
}


//gameOver
function gameOver(){
    cvs.remove();
    
    let divGameOver = document.createElement("div");
    divGameOver.innerHTML = "<h1> Game Over!</h1> \n <h3>For restart click RESTART</h3>";

    divGameOver.style.position = "absolute";
    divGameOver.style.color = "red";
    divGameOver.style.textAlign = "center";
    divGameOver.style.left = xCoordForButt + "px";
    divGameOver.style.top = clientY - 100 + "px";


    

    
    document.body.append(divGameOver);
    throw new Error("STOP GAME");
}




