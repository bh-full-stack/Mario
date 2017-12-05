window.onload = function() {
    marioLeft = 0;
    document.onkeydown = function (event) {
         switch (event.key) {
            case "ArrowLeft":
                console.log("left");
                if (marioLeft > 0) {
                    marioLeft -= 1;
                }
                break;
            case "ArrowRight":
                console.log("right");
                if (marioLeft < 224) {
                    marioLeft += 1;
                }
                break;
        }
        document.querySelector(".mario").style.left = marioLeft + "px";
    };
};