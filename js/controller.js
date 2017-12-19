var arrowLeft = false;
var arrowRight = false;
var arrowUp = false;

window.onload = function () {

    world.init();
    mario.init();
    goombas.init();

    document.onkeydown = function (event) {
        score.saveStartTime();
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
};