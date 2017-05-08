/**
 *插入
 */
function insertLeft(parentDom,childDom){
    if(parentDom.firstElementChild){
        parentDom.insertBefore(childDom,parentDom.firstElementChild);
    }else{
        parentDom.appendChild(childDom);
    }
}
function insertRight(parentDom,childDom){
    parentDom.appendChild(childDom);
}
function outLeft(elem){
    deleteNumber(elem);
    alert("你删除的数据是："+elem.innerText);
}
function outRight(elem){
    deleteNumber(elem);
    alert("你删除的数据是："+elem.innerText);
}
function showNumber(way){
    var number = (document.getElementById("inputNumber").value=="")?0:document.getElementById("inputNumber").value;
    var parentDom = document.getElementById("source");
    var childDom = document.createElement("li");
    childDom.textContent = number;
    childDom.addEventListener("click",function(e){
        deleteNumber(e.target);
    },false);

    switch(way){
        case "leftin":
            insertLeft(parentDom,childDom);
            break;
        case "rightin":
            insertRight(parentDom,childDom);
            break;
        case "leftout":
            outLeft(parentDom.firstElementChild);
            break;
        case "rightout":
            outRight(parentDom.lastElementChild);
            break;
    }
    document.getElementById("inputNumber").value ="";
}
function deleteNumber(elem){
    elem.parentNode.removeChild(elem);
}