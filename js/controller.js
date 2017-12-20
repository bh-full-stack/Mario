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

    document.querySelector(".modal-window__form").onsubmit = function(event) {
        event.preventDefault();
        var name = document.querySelector("#name").value;
        localStorage.name = name;
        modalWindow.showMessage(name);
    };

    document.querySelector("#new_game_button").onclick = function() {
        modalWindow.hide();
        mario.respawn();
    };

    document.querySelector("#clear_name_button").onclick = function() {
        localStorage.removeItem("name");
        modalWindow.showForm();
    };
    document.querySelector("#save_score_button").onclick = function() {
        modalWindow.showScoreSaved(localStorage.name, score.points);
    };
};