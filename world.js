var world = {
    backgroundPosition: 0,
    objectsXcoord: [],
    objectsYcoord: [],
    objectsWidth: [],
    objectsHeight: [],
    objectsType: [],
    init: function() {
        $.getJSON("objects.json", function (json) {
            json.forEach(function (jsonObject) {
                var newObject = document.createElement("DIV");
                newObject.style.position = "absolute";
                newObject.style.top = jsonObject.dy + "px";
                newObject.style.left = jsonObject.dx + "px";
                newObject.style.width = jsonObject.dw + "px";
                newObject.style.height = jsonObject.dh + "px";
                newObject.style.background = 
                    "url('objects.png') -" + jsonObject.sx + "px " + jsonObject.sy + "px";
                document.querySelector(".map").appendChild(newObject);

                world.objectsXcoord.push(jsonObject.dx);
                world.objectsYcoord.push(jsonObject.dy);
                world.objectsWidth.push(jsonObject.dw);
                world.objectsHeight.push(jsonObject.dh);
                world.objectsType.push(jsonObject.type);
            });
        });
    }
};