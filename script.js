window.onload = function () {
    var marioLeft = 20;
    var marioTop = 185;
    var backgroundPosition = 0;

    var objectsXcoord = [];
    var objectsYcoord = [];
    var objectsWidth = [];
    var objectsHeight = [];
    var objectsType = [];

    function collisionDetection (direction) {
        switch(direction) {
            case "left":
                for (var i=0; i < objectsXcoord.length; i++) {
                    if (objectsXcoord[i] + objectsWidth[i] == marioLeft - backgroundPosition) {
                        if ((objectsYcoord[i] <= marioTop) && (objectsYcoord[i] + objectsHeight[i] >= marioTop)) {
                            return true;
                        }
                    }
                }
                break;
            case "right":
                for (var i=0; i < objectsXcoord.length; i++) {
                    if (objectsXcoord[i] == marioLeft + 16 -backgroundPosition) {
                        if ((objectsYcoord[i] <= marioTop) && (objectsYcoord[i] + objectsHeight[i] >= marioTop)) {
                            return true;
                        }
                    }
                }

        }
        return false;
    }

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
            objectsXcoord.push(jsonObject.dx);
            objectsYcoord.push(jsonObject.dy);
            objectsWidth.push(jsonObject.dw);
            objectsHeight.push(jsonObject.dh);
            if (jsonObject.type == undefined) {
                objectsType.push("undefined");
            } else {
                objectsType.push(jsonObject.type);
            }
            newObject.style.background = "url('objects.png') -" + jsonObject.sx + "px " + jsonObject.sy + "px";
        });

    });

    document.onkeydown = function (event) {
        switch (event.key) {
            case "ArrowLeft":
                if (!collisionDetection("left")) {
                    if (marioLeft > 0) {
                        marioLeft -= 2;
                    }
                    if (marioLeft < 48 && backgroundPosition < 0) {
                        marioLeft = 48;
                        backgroundPosition += 2;
                    }
                }
                break;
            case "ArrowRight":
                if (!collisionDetection("right")) {
                    if (marioLeft < 224) {
                        marioLeft += 2;
                    }
                    if (marioLeft > 176 && backgroundPosition > -3144) {
                        marioLeft = 176;
                        backgroundPosition -= 2;
                    }
                }
                break;
        }
        console.log(marioLeft - backgroundPosition);
        console.log(marioTop + 16);
        document.querySelector(".mario").style.left = marioLeft + "px";
        document.querySelector(".map").style.left = backgroundPosition + "px";
    };
};