var goombas = {
    interval: undefined,
    xCoord: [],
    yCoord: [],
    width: [],
    height: [],
    direction: [],
    init: function () {
        $.getJSON("goombas.json", function (json) {
            json.forEach(function (jsonObject, index) {
                var newGoomba = document.createElement("DIV");
                newGoomba.style.position = "absolute";
                newGoomba.style.top = jsonObject.DY + "px";
                newGoomba.style.left = jsonObject.DX + "px";
                newGoomba.style.width = jsonObject.DWidth + "px";
                newGoomba.style.height = jsonObject.DHeight + "px";
                newGoomba.style.background =
                    "url('img/goombas.png') -" + jsonObject.SX + "px " + jsonObject.SY + "px";
                newGoomba.id = "goombas" + index;
                newGoomba.className = "goombas";
                document.querySelector(".map").appendChild(newGoomba);

                goombas.xCoord.push(jsonObject.DX);
                goombas.yCoord.push(jsonObject.DY);
                goombas.width.push(jsonObject.DWidth);
                goombas.height.push(jsonObject.DHeight);
                goombas.direction.push("left");
            });
            goombas.interval = setInterval(goombas.heartBeat, 40);
        });
    },
    heartBeat: function () {
        for (var i = 0; i < goombas.xCoord.length; i++) {
            for (var j = 0; j < world.objectsXcoord.length; j++) {
                if (
                    (goombas.xCoord[i] == (world.objectsXcoord[j] + world.objectsWidth[j])) &&
                    (goombas.direction[i] == "left") &&
                    (world.objectsType[j] == "pipe")
                ) {
                    goombas.direction[i] = "right";
                }
                else if (
                    ((goombas.xCoord[i] + goombas.width[i]) == world.objectsXcoord[j]) &&
                    (goombas.direction[i] == "right") &&
                    (world.objectsType[j] == "pipe")
                ) {
                    goombas.direction[i] = "left";
                }
            }
        }

        for (var i = 0; i < goombas.xCoord.length; i++) {
            if (goombas.direction[i] == "left") {
                goombas.xCoord[i] -= 1;
            } else {
                goombas.xCoord[i] += 1;
            }
            if (document.querySelector("#goombas" + i)) {
                document.querySelector("#goombas" + i)
                    .style.left = goombas.xCoord[i] + "px";
            }
        }

    },
    die: function (id) {
        document.querySelector("#goombas" + id).className = "goombas--dead";
        goombas.xCoord[id] = undefined;
        goombas.yCoord[id] = undefined;
        setTimeout( function () {
            document.querySelector("#goombas" + id).remove();
        }, 250);
    },
    reset: function () {
        clearInterval(goombas.interval);

        for (var i = 0; i < goombas.xCoord.length; i++) {
            if (document.querySelector("#goombas" + i) != null) {
                document.querySelector("#goombas" + i).remove();
            }
        }

        goombas.xCoord = [];
        goombas.yCoord = [];
        goombas.width = [];
        goombas.height = [];
        goombas.direction = [];

        goombas.init();
    }
};