const mario = document.getElementById('mario');
const gameContainer = document.querySelector('.game-container');
const enemy1 = document.getElementById('enemy1');
const enemy2 = document.getElementById('enemy2');
const obstacle1 = document.getElementById('obstacle1');
let isJumping = false;
let marioPositionX = 50; // posição inicial de Mario na horizontal
let marioPositionY = 0;  // posição vertical do Mario
let enemySpeed = 3; // velocidade dos inimigos

// Função para mover Mario
function moveMario(direction) {
    if (direction === 'left') {
        marioPositionX -= 10; // move Mario 10px para a esquerda
    } else if (direction === 'right') {
        marioPositionX += 10; // move Mario 10px para a direita
    }

    // Impedir que Mario saia da tela
    if (marioPositionX < 0) marioPositionX = 0;
    if (marioPositionX > gameContainer.offsetWidth - mario.offsetWidth) {
        marioPositionX = gameContainer.offsetWidth - mario.offsetWidth;
    }

    mario.style.left = marioPositionX + 'px';
}

// Função para fazer o Mario pular
function jump() {
    if (isJumping) return;

    isJumping = true;
    mario.classList.add('mario-jumping');
    setTimeout(() => {
        mario.classList.remove('mario-jumping');
        isJumping = false;
    }, 300); // tempo do pulo
}

// Função para mover os inimigos e obstáculos
function moveObstaclesAndEnemies() {
    const marioRect = mario.getBoundingClientRect();
    const enemy1Rect = enemy1.getBoundingClientRect();
    const enemy2Rect = enemy2.getBoundingClientRect();
    const obstacle1Rect = obstacle1.getBoundingClientRect();

    // Verificar colisão com inimigos
    if (isColliding(marioRect, enemy1Rect) || isColliding(marioRect, enemy2Rect)) {
        alert('Game Over! Você colidiu com um inimigo!');
        resetGame();
    }

    // Verificar colisão com obstáculos
    if (isColliding(marioRect, obstacle1Rect) && !isJumping) {
        alert('Game Over! Você colidiu com um obstáculo!');
        resetGame();
    }

    // Continuar movendo os obstáculos e inimigos
    requestAnimationFrame(moveObstaclesAndEnemies);
}

// Função para detectar colisões
function isColliding(rect1, rect2) {
    return (
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top &&
        rect1.left < rect2.right &&
        rect1.right > rect2.left
    );
}

// Função para resetar o jogo
function resetGame() {
    marioPositionX = 50;
    marioPositionY = 0;
    mario.style.left = marioPositionX + 'px';
    mario.style.bottom = '30%';
    enemy1.style.animation = 'moveEnemy 3s linear infinite';
    enemy2.style.animation = 'moveEnemy 3s linear infinite';
    obstacle1.style.animation = 'moveObstacle 4s linear infinite';
}

// Detectar as teclas pressionadas
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        moveMario('left');
    } else if (event.key === 'ArrowRight') {
        moveMario('right');
    } else if (event.key === ' ' || event.key === 'ArrowUp') {
        jump();
    }
});

// Iniciar o movimento dos obstáculos e inimigos
moveObstaclesAndEnemies();
