var score = {
    points: 600,
    startTime: 0,
    endTime: 0,
    overtime: 0,
    penalty: 0,

    gainPointsPerKill: function() {
        score.points += 100;
    },

    reset: function() {
        score.points = 600;
    },

    saveStartTime: function () {
        if (!mario.hasMoved) {
            score.startTime = Date.now();
            mario.hasMoved = true;
        }
    },

    calculateScore: function() {
        score.endTime = Date.now();
        score.overtime = (score.endTime - score.startTime) / 1000 - 42;
        score.penalty = score.overtime * 20;
        score.points -= Math.floor(score.penalty);
        if (score.points <= 0) {
            score.points = 0;
        }
        document.querySelector('#score').textContent = score.points.toString();
    },

    hasGameEnded: function () {
        return score.startTime > score.endTime;
    }
};