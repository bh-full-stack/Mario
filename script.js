window.onload = function () {
    var marioLeft = 20;
    var marioTop = 185;
    var backgroundPosition = 0;

    var objectsXcoord = [];
    var objectsYcoord = [];
    var objectsWidth = [];
    var objectsHeight = [];
    var objectsType = [];

    var arrowLeft = false;
    var arrowRight = false;
    var arrowUp = false;
    var arrowDown = false;

    var jumpStart = 185;
    var jumpFlag = false;
    var fallFlag = false;

    function collisionDetection () {
        for (var i=0; i < objectsXcoord.length; i++) {
            if ((marioLeft + 16 - backgroundPosition >= objectsXcoord[i]) && (marioLeft - backgroundPosition <= objectsXcoord[i] + objectsWidth[i])) {
                if ((marioTop + 16 >= objectsYcoord[i]) && (marioTop <= objectsYcoord[i] + objectsHeight[i])) {
                    return true;
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
                arrowLeft = true;
                break;
            case "ArrowRight":
                arrowRight = true;
                break;
            case "ArrowUp":
                arrowUp = true;
                break;
            case "ArrowDown":
                arrowDown = true;
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
            case "ArrowDown":
                arrowDown = false;
                break;
        }
    };

    setInterval(function() {
        if (arrowLeft) {

            if (marioLeft > 0) {
                marioLeft -= 2;
                if (collisionDetection()) {
                    marioLeft += 2;
                }
            }
            if (marioLeft < 48 && backgroundPosition < 0) {
                marioLeft = 48;
                backgroundPosition += 2;
            }

        }
        if (arrowRight) {

            if (marioLeft < 224) {
                marioLeft += 2;
                if (collisionDetection()) {
                    marioLeft -= 2;
                }
            }
            if (marioLeft > 176 && backgroundPosition > -3144) {
                marioLeft = 176;
                backgroundPosition -= 2;
            }

        }
        if (arrowUp) {
            if (!jumpFlag && !fallFlag) {
                jumpStart = marioTop;
                jumpFlag = true;
            }
            if (jumpFlag && !fallFlag) {
                if (marioTop + 16 > jumpStart - 54) {
                    marioTop -= 2;
                    if (collisionDetection()) {
                        marioTop += 2;
                        fallFlag = true;
                    }
                } else {
                    fallFlag = true;
                }
            }
            if (fallFlag) {
                if (marioTop < 185) {
                    marioTop += 2;
                }
                if (collisionDetection()) {
                    marioTop -= 2;
                    fallFlag = false;
                    jumpFlag = true;
                    jumpStart = marioTop;
                }
                if (marioTop === 185) {
                    fallFlag = false;
                }
            }
        } else {
            jumpFlag = false;
            fallFlag = true;
            if (fallFlag) {
                if (marioTop < 185) {
                    marioTop += 2;
                }
                if (collisionDetection()) {
                    marioTop -= 2;
                    fallFlag = false;
                }
                if (marioTop === 185) {
                    fallFlag = false;
                }
            }
        }
/*        if (arrowDown) {
            if (marioTop<185) {
                marioTop += 2;
            }
            if (collisionDetection()) {
                marioTop -= 2;
            }
        }
*/

        document.querySelector(".mario").style.top = marioTop + "px";
        document.querySelector(".mario").style.left = marioLeft + "px";
        document.querySelector(".map").style.left = backgroundPosition + "px";
    }, 25);
};