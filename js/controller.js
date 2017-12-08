var arrowLeft = false;
var arrowRight = false;
var arrowUp = false;

window.onload = function () {

    world.init();
    mario.init();
    goomba.init();
    goomba.move();

    document.onkeydown = function (event) {
        switch (event.key) {
            case "ArrowLeft":
                arrowLeft = true;
                break;
            case "ArrowRight":
                arrowRight = true;
                break;
            case "ArrowUp":
                arrowUp = true;
                break;
        }
    };
    
    document.onkeyup = function (event) {
        switch (event.key) {
            case "ArrowLeft":
                arrowLeft = false;
                break;
            case "ArrowRight":
                arrowRight = false;
                break;
            case "ArrowUp":
                arrowUp = false;
                break;
        }
    };

    setInterval(marioMovement, 25);

    function marioMovement() {
        if (arrowLeft) {
            mario.moveLeft();
        }
        if (arrowRight) {
            mario.moveRight();
        }
        if (arrowUp && !mario.isDead) {
            mario.jump();
        } else {
            mario.fall();
        }
        mario.currentAnimation();
        mario.domElement.style.top = mario.top + "px";
        mario.domElement.style.left = mario.left + "px";
        document.querySelector(".map").style.left = world.backgroundPosition + "px";
    }
};