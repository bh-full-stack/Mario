var goomba = {
    xCoord: [],
    yCoord: [],
    width: [],
    height: [],
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
                    "url('enemies.png') -" + jsonObject.SX + "px " + jsonObject.SY + "px";
                newEnemy.id = "goomba" + index;
                document.querySelector(".map").appendChild(newEnemy);

                goomba.xCoord.push(jsonObject.DX);
                goomba.yCoord.push(jsonObject.DY);
                goomba.width.push(jsonObject.DWidth);
                goomba.height.push(jsonObject.DHeight);
            });
        });
    }
}