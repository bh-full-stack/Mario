var score = 600;
var startTime;
var endTime = 0;
var overtime;
var penalty;

function gainPointsPerKill() {
    score += 100;
    console.log(score);
}

function scoreReset() {
    score = 600;
}

function saveStartTime() {
    if (!mario.hasMoved) {
        startTime = Date.now();
        mario.hasMoved = true;
    }
}

function calculateScore() {
    overtime = (endTime - startTime) / 1000 - 42;
    penalty = overtime * 20;
    score -= Math.floor(penalty);
    if (score <= 0) {
        score = 0;
    }
    document.querySelector('#score').textContent = score;
}