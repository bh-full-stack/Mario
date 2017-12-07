var arrowLeft = false;
var arrowRight = false;
var arrowUp = false;

window.onload = function () {

    world.init();

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
        if (arrowUp) {
            mario.jump();
        } else {
            mario.fall();
        }
        document.querySelector(".mario").style.top = mario.top + "px";
        document.querySelector(".mario").style.left = mario.left + "px";
        document.querySelector(".map").style.left = world.backgroundPosition + "px";
    }
};