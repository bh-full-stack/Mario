var mario = {
    interval: undefined,
    top: 185,
    left: 20,
    domElement: undefined,
    faceRight: true,
    jumpStart: 185,
    jumpFlag: false,
    fallFlag: false,
    isDead: false,
    isDying: false,
    hasMoved: false,
    init: function() {
        mario.domElement = document.querySelector("#mario");
        mario.domElement.className = "mario--face--right";
        mario.respawn();
    },
    heartBeat: function() {
        if (mario.isDead) {
            mario.respawn();
            return;
        }
        if (arrowLeft && !mario.isDying) {
            mario.moveLeft();
        }
        if (arrowRight && !mario.isDying) {
            mario.moveRight();
        }
        if (arrowUp && !mario.isDying) {
            mario.jump();
        } else {
            mario.fall();
        }
        mario.currentAnimation();
        mario.domElement.style.top = mario.top + "px";
        mario.domElement.style.left = mario.left + "px";
        document.querySelector(".map").style.left = world.backgroundPosition + "px";
    },
    currentAnimation: function () {
        if (arrowRight) {
            mario.domElement.className = mario.jumpFlag || mario.fallFlag ? "mario--jump--right" : "mario--move--right";
            mario.faceRight = true;
        } else if (arrowLeft) {
            mario.domElement.className = mario.jumpFlag || mario.fallFlag ? "mario--jump--left" : "mario--move--left";
            mario.faceRight = false;
        } else if (arrowUp) {
            mario.domElement.className = mario.faceRight ? "mario--jump--right" : "mario--jump--left";
        } else if (mario.faceRight) {
            mario.domElement.className =  mario.fallFlag ? "mario--jump--right" : "mario--face--right";
        } else {
            mario.domElement.className = mario.fallFlag ? "mario--jump--left" : "mario--face--left";
        }
    },
    respawn: function () {
        clearInterval(mario.interval);
        setTimeout(function() {
            mario.top = 185;
            mario.left = 20;
            mario.jumpStart = 185;
            mario.jumpFlag = false;
            mario.fallFlag = false;
            mario.isDead = false;
            mario.isDying = false;
            mario.hasMoved = false;
            world.backgroundPosition = 0;

            goombas.reset();
            score.reset();
            mario.interval = setInterval(mario.heartBeat, 25);
        }, 250);
    },
    hasCollision: function () {
        if (!mario.isDead) {
            for (var i = 0; i < world.objectsXcoord.length; i++) {
                if (
                    (mario.left - world.backgroundPosition + 16 >= world.objectsXcoord[i]) &&
                    (mario.left - world.backgroundPosition <= world.objectsXcoord[i] + world.objectsWidth[i]) &&
                    (mario.top + 16 >= world.objectsYcoord[i]) &&
                    (mario.top <= world.objectsYcoord[i] + world.objectsHeight[i])
                ) {
                    if (world.objectsType[i] == "hole") {
                        mario.isDying = true;
                        return false;
                    }
                    return true;
                }
            }
            for (var j = 0; j < goombas.xCoord.length; j++) {
                if (
                    (mario.left - world.backgroundPosition + 16 >= goombas.xCoord[j]) &&
                    (mario.left - world.backgroundPosition <= goombas.xCoord[j] + goombas.width[j]) &&
                    (mario.top + 16 >= goombas.yCoord[j]) &&
                    (mario.top <= goombas.yCoord[j] + goombas.height[j])
                ) {
                    if (mario.fallFlag && (mario.top < 178)) {
                        goombas.die(j);
                    } else {
                        mario.isDead = true;
                        return false;
                    }
                }
            }
            return false;
        }
    },
    moveLeft: function () {
        if (mario.left > 0) {
            mario.left -= 2;
            if (mario.hasCollision()) {
                mario.left += 2;
            }
        }
        if (mario.left < 48 && world.backgroundPosition < 0) {
            mario.left = 48;
            world.backgroundPosition += 2;
        }
    }, 
    moveRight: function () {
        if (mario.left < 224) {
            mario.left += 2;
            if (mario.hasCollision()) {
                mario.left -= 2;
            }
        }
        if (mario.left > 176 && world.backgroundPosition > -3144) {
            mario.left = 176;
            world.backgroundPosition -= 2;
        } else if (world.backgroundPosition <= -3144) {
            modalWindow.show(localStorage.name, score.points);
            if (score.hasGameEnded()) {
                score.calculateScore();
            }
        }
    }, 
    jump: function () {
        if (!mario.jumpFlag && !mario.fallFlag) {
            mario.jumpStart = mario.top;
            mario.jumpFlag = true;
        }
        if (mario.jumpFlag && !mario.fallFlag) {
            if (mario.top + 16 > mario.jumpStart - 54) {
                mario.top -= 2;
                if (mario.hasCollision()) {
                    mario.top += 2;
                    mario.fallFlag = true;
                }
            } else {
                mario.fallFlag = true;
            }
        } else {
            mario.jumpStart = mario.top;
        }
        if (mario.fallFlag) {
            if (mario.top < 185) {
                mario.top += 2;
            }
            if (mario.hasCollision()) {
                mario.top -= 2;
                mario.fallFlag = false;
                mario.jumpFlag = true;
            }
            if (mario.top === 185) {
                mario.fallFlag = false;
            }
        }
    },
    fall: function () {
        mario.jumpFlag = false;
        mario.fallFlag = true;
        if (mario.fallFlag) {
            if (mario.top < 185) {
                mario.top += 2;
            }
            if (mario.hasCollision()) {
                mario.top -= 2;
                mario.fallFlag = false;
            }
            if (mario.top === 185 && !mario.isDying) {
                mario.fallFlag = false;
            } else if (mario.isDying) {
                mario.top += 2;
                if (mario.top >= 224) {
                    mario.isDead = true;
                }
            }
        }
    }
};