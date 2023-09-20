// Declare variables at the beginning
let dino, gameOver, obstacle;
let dx, dy, ox, oy ,dinoX;
let score = 0;
let cross = true;

let audio = new Audio('gameRingtone.mp3');
let audioOver = new Audio('gameover.mp3');


setTimeout(() => {
    audio.play();
}, 1000);

document.onkeydown = function(e) {
    if (e.keyCode == 38) {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 700);
    }
    if (e.keyCode == 39) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px";
    }
    if (e.keyCode == 37) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112 )+ "px";
    }
}

setInterval(() => {
    // Retrieve elements inside the interval function
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    // Get the current positions
    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    // Calculate offsets
    const offsetX = Math.abs(dx - ox);
    const offsetY = Math.abs(dy - oy);

    // Check for collision and show game over
    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = 'Game Over - Play Again';
        gameOver.style.color = 'red';
        obstacle.classList.remove('obstacleAni');
        audioOver.play();
        setTimeout(()=>
        {
            audioOver.pause();
            audio.pause();
        },1000)
    }
    else if(offsetX < 145 && cross){
        score+=1;
        updateScore(score)
        cross = false;
        setTimeout(()=>
        {
            cross = true;
        },1000);

        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's'; 
        }, 500);
        
    }
}, 10);

function updateScore (score)
{
    scoreCont.innerHTML= "Your score: " + score;
}
