/* YOUR CODE HERE! */

const container = document.getElementsByClassName("box-container")[0];
var box1 = document.getElementsByClassName("box")[0];
var isDown = {box1 : false};
var textnum = 1;

colors = ['green', 'yellow', 'red', 'blue', 'purple'];

offset = [0, 0];
var mousePosition;

function onMouseDown(event){
    var el = document.elementFromPoint(event.clientX, event.clientY);
    var check = 0;
    for (var i in isDown){
        if (isDown[i] == true){
            check = 1;
        }
    }
    if (check == 0){
        isDown[el] = true;
    }
    offset = [
        el.offsetLeft - event.clientX,
        el.offsetTop - event.clientY
    ];
}

function onMouseUp(event){
    for (var i in isDown){
        if (isDown[i]){
            isDown[i] = false;
        }
    }
}

function onMouseMove(event){
    event.preventDefault();
    var el = document.elementFromPoint(event.clientX, event.clientY);
    if (isDown[el]) {
        mousePosition = {

            x : event.clientX,
            y : event.clientY

        };
        el.style.left = (mousePosition.x + offset[0]) + 'px';
        el.style.top  = (mousePosition.y + offset[1]) + 'px';
    }
}

function onMouseClick(event){
    var el = document.elementFromPoint(event.clientX, event.clientY);
    if(event.shiftKey){
        if (el.classList.contains('box-large')){
            el.classList.remove('box-large');
        } else {
            el.classList.add('box-large');
        }
    }
    if(event.altKey){
        if (container.children.length > 1){
            el.remove();
        }
    }
}

function onMouseRightClick(event){
    var el = document.elementFromPoint(event.clientX, event.clientY);
    console.log(el.style.background);
    var i = colors.indexOf(el.style.background);
    if (i+1 >= colors.length){
        i = 0;
    } else {
        i = i + 1;
    }
    el.style.background = colors[i];
}

function onMouseDoubleClick(event){
    var el = document.elementFromPoint(event.clientX, event.clientY);
    var child = document.createElement('div');
    textnum = textnum + 1;
    var text = document.createTextNode(textnum);
    child.classList.add('box');
    isDown[child] = false;


    child.style.left = (el.offsetLeft + el.offsetWidth) + 'px';
    child.style.top  = (el.offsetTop + el.offsetHeight) + 'px';

    child.addEventListener('dblclick', onMouseDoubleClick, true);
    child.addEventListener('click', onMouseClick, true);
    child.addEventListener('contextmenu', onMouseRightClick, true);
    child.addEventListener('mousedown', onMouseDown, true);
    child.addEventListener('mouseup', onMouseUp, true);
    child.addEventListener('mousemove', onMouseMove, true);

    child.appendChild(text);
    container.appendChild(child);

    


}

box1.addEventListener('dblclick', onMouseDoubleClick, true);
box1.addEventListener('click', onMouseClick, true);
box1.addEventListener('contextmenu', onMouseRightClick, true);
box1.addEventListener('mousedown', onMouseDown, true);
box1.addEventListener('mouseup', onMouseUp, true);
box1.addEventListener('mousemove', onMouseMove, true);


