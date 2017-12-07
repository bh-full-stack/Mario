var mario = {
    top: 185,
    left: 20,
    jumpStart: 185,
    jumpFlag: false,
    fallFlag: false,
    hasCollision: function() {
        for (var i = 0; i < world.objectsXcoord.length; i++) {
            if (
                (mario.left - world.backgroundPosition + 16 >= world.objectsXcoord[i]) &&
                (mario.left - world.backgroundPosition <= world.objectsXcoord[i] + world.objectsWidth[i]) &&
                (mario.top + 16 >= world.objectsYcoord[i]) &&
                (mario.top <= world.objectsYcoord[i] + world.objectsHeight[i])
            ) {
                return true;
            } 
        }
        return false;
    },
    moveLeft: function() {
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
    moveRight: function() {
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
    jump: function() {
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
    fall: function() {
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
            if (mario.top === 185) {
                mario.fallFlag = false;
            }
        }
    }
};