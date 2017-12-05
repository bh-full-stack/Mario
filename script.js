window.onload = function () {
    var marioLeft = 20;
    var backgroundPosition = 0;

    /*function spawnMario() {
        marioLeft = 20;
        document.querySelector(".mario").style.top = "184px";
        document.querySelector(".mario").style.left = marioLeft + "px";
    }

    spawnMario();*/

    document.onkeydown = function (event) {
        switch (event.key) {
            case "ArrowLeft":
                console.log("left");
                if (marioLeft > 0) {
                    marioLeft -= 2;
                }
                if (marioLeft < 20 && backgroundPosition < 0) {
                    marioLeft = 20;
                    backgroundPosition += 2;
                }
                break;
            case "ArrowRight":
                console.log("right");
                if (marioLeft < 224) {
                    marioLeft += 2;
                }
                if (marioLeft > 204 && backgroundPosition > -3144) {
                    marioLeft = 204;
                    backgroundPosition -= 2;
                }
                break;

        }
        document.querySelector(".mario").style.left = marioLeft + "px";
        document.querySelector(".screen").style.backgroundPositionX = backgroundPosition + "px";
    };
};
