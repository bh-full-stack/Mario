var mario = {
    top: 185,
    left: 20,
    domElement: undefined,
    faceRight: true,
    jumpStart: 185,
    jumpFlag: false,
    fallFlag: false,
    isDead: false,
    init: function() {
        mario.domElement = document.querySelector("#mario");
        mario.domElement.className = "mario--face--right"
    },
    currentAnimation: function () {
        if (arrowRight) {
            mario.domElement.className = mario.jumpFlag ? "mario--right--up" : "mario--move--right";
            mario.faceRight = true;
        } else if (arrowLeft) {
            mario.domElement.className = mario.jumpFlag ? "mario--left--up" : "mario--move--left";
            mario.faceRight = false;
        } else if (arrowUp) {
            mario.domElement.className = mario.faceRight ? "mario--right--up" : "mario--left--up";
        } else if (mario.faceRight) {
            mario.domElement.className = "mario--face--right";
        } else {
            mario.domElement.className = "mario--face--left";                
        }
    },
    respawn: function () {
        mario.top = 185;
        mario.left = 20;
        mario.jumpStart = 185;
        mario.jumpFlag = false;
        mario.fallFlag = false;
        mario.isDead = false;
        world.backgroundPosition = 0;
    },
    hasCollision: function () {
        for (var i = 0; i < world.objectsXcoord.length; i++) {
            if (
                (mario.left - world.backgroundPosition + 16 >= world.objectsXcoord[i]) &&
                (mario.left - world.backgroundPosition <= world.objectsXcoord[i] + world.objectsWidth[i]) &&
                (mario.top + 16 >= world.objectsYcoord[i]) &&
                (mario.top <= world.objectsYcoord[i] + world.objectsHeight[i])
            ) {
                if (world.objectsType[i] == "hole") {
                    mario.isDead = true;
                    return false;
                } 
                return true;
            } 
        }

        for (var j = 0; j < goomba.xCoord.length; j++) {
            if (
                (mario.left - world.backgroundPosition + 16 >= goomba.xCoord[j]) &&
                (mario.left - world.backgroundPosition <= goomba.xCoord[j] + goomba.width[j]) &&
                (mario.top + 16 >= goomba.yCoord[j]) &&
                (mario.top <= goomba.yCoord[j] + goomba.height[j])
            ) {
                if(!mario.jumpFlag && mario.fallFlag && (mario.top < 178)) {
                    document.querySelector("#goomba" + j).remove();
                    goomba.xCoord[j] = 0;
                    goomba.yCoord[j] = 0;
                } else {
                    setTimeout(mario.respawn, 250);
                    return false;
                }
            }
        }

        return false;
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
            if (mario.top === 185 && !mario.isDead) {
                mario.fallFlag = false;
            }
            else if (mario.isDead) {
                mario.top += 2;
                if (mario.top >= 224) {
                    mario.respawn();
                }
            }
        }
    }
};