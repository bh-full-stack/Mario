window.onload = function () {
    var marioLeft = 20;
    var backgroundPosition = 0;

    $.getJSON("objects.json", function (json) {
        var newObject;

        json.forEach(function (jsonObject) {
            newObject = document.createElement("DIV");
            document.querySelector(".map").appendChild(newObject);
            newObject.style.position = "absolute";
            newObject.style.top = jsonObject.dy + "px";
            newObject.style.left = jsonObject.dx + "px";
            newObject.style.width = jsonObject.dw + "px";
            newObject.style.height = jsonObject.dh + "px";
            newObject.style.background = "url('objects.png') -" + jsonObject.sx + "px " + jsonObject.sy + "px";
        });
    });

    document.onkeydown = function (event) {
        switch (event.key) {
            case "ArrowLeft":
                console.log("left");
                if (marioLeft > 0) {
                    marioLeft -= 2;
                }
                if (marioLeft < 48 && backgroundPosition < 0) {
                    marioLeft = 48;
                    backgroundPosition += 2;
                }
                break;
            case "ArrowRight":
                console.log("right");
                if (marioLeft < 224) {
                    marioLeft += 2;
                }
                if (marioLeft > 176 && backgroundPosition > -3144) {
                    marioLeft = 176;
                    backgroundPosition -= 2;
                }
                break;
        }
        document.querySelector(".mario").style.left = marioLeft + "px";
        document.querySelector(".map").style.left = backgroundPosition + "px";
    };
};