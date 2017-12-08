var goomba = {
    xCoord: [],
    yCoord: [],
    width: [],
    height: [],
    direction: [],
    move: function() {
        setInterval(function() {

            for (var i = 0; i < goomba.xCoord.length; i++) {
                for (var j = 0; j < world.objectsXcoord.length; j++) {
                    if (
                        (goomba.xCoord[i] == (world.objectsXcoord[j] + world.objectsWidth[j])) && 
                        (goomba.direction[i] == "left") &&
                        (world.objectsType[j] == "pipe")
                    ) {
                        goomba.direction[i] = "right";
                    }
                }
            }

            for (var i = 0; i < goomba.xCoord.length; i++) {
                for (var j = 0; j < world.objectsXcoord.length; j++) {
                    if (
                        ((goomba.xCoord[i] + goomba.width[i]) == world.objectsXcoord[j]) && 
                        (goomba.direction[i] == "right") &&
                        (world.objectsType[j] == "pipe")
                    ) {
                        goomba.direction[i] = "left";
                    }
                }
            }

            for (var i = 0; i < goomba.xCoord.length; i++) {
                if (goomba.direction[i] == "left") {
                    goomba.xCoord[i] -= 1;
                } else {
                    goomba.xCoord[i] += 1;
                }
                if (document.querySelector("#goomba" + i)) {
                    document.querySelector("#goomba" + i)
                    .style.left = goomba.xCoord[i] + "px";
                }
            }

        }, 40)
    },
    init: function() {
        $.getJSON("enemies.json", function (json) {
            json.forEach(function (jsonObject, index) {
                var newEnemy = document.createElement("DIV");
                newEnemy.style.position = "absolute";
                newEnemy.style.top = jsonObject.DY + "px";
                newEnemy.style.left = jsonObject.DX + "px";
                newEnemy.style.width = jsonObject.DWidth + "px";
                newEnemy.style.height = jsonObject.DHeight + "px";
                newEnemy.style.background = 
                    "url('img/enemies.png') -" + jsonObject.SX + "px " + jsonObject.SY + "px";
                newEnemy.id = "goomba" + index;
                document.querySelector(".map").appendChild(newEnemy);

                goomba.xCoord.push(jsonObject.DX);
                goomba.yCoord.push(jsonObject.DY);
                goomba.width.push(jsonObject.DWidth);
                goomba.height.push(jsonObject.DHeight);
                goomba.direction.push("left");
            });
        });
    }
}