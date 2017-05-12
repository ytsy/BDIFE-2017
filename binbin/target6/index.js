/**
 *插入
 */
var parentDom = document.getElementById("source");
var textareaDom = document.getElementById("inputData");
//制表符
textareaDom.addEventListener("keydown",function(e){
    var event = e||window.event;
    var keyCode = e.keyCode;
    if(keyCode==9){//tab键转化为四个空格
        textareaDom.value+="   ";
        if(e.returnValue){
            e.returnValue= false;
        }else{
            e.preventDefault();
        }
    }
},false);
//从左侧插入数据
function insertLeft(parentDom,arr){
    if(parentDom.firstElementChild){
        arr.reverse();
        arr.map(function(elem){
            parentDom.insertBefore(elem,parentDom.firstElementChild);
        });
    }else{
        arr.map(function(elem){
            parentDom.appendChild(elem);
        });
    }
}
function insertRight(parentDom,arr){
    arr.map(function(elem){
        parentDom.appendChild(elem);
    });
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
    var dataString = (textareaDom=="")?0:textareaDom.value;
    var data = [];//存储数据
    var dataDom = [];//存储Dom
    data = dataString.replace(/\s|,|，|、/g," ").split(/\s+/);//可避免出现无法匹配到混合标点符号的现象
    data.map(function(number){
        if(number){//防止出现空字符串
            var childDom = document.createElement("li");
            childDom.textContent = number;
            childDom.addEventListener("click",function(e){
                deleteNumber(e.target);
            },false);
            dataDom.push(childDom);
        }
    });
    switch(way){
        case "leftin":
            insertLeft(parentDom,dataDom);
            break;
        case "rightin":
            insertRight(parentDom,dataDom);
            break;
        case "leftout":
            outLeft(parentDom.firstElementChild);
            break;
        case "rightout":
            outRight(parentDom.lastElementChild);
            break;
    }
    textareaDom.focus();
    textareaDom.value ="";
}
function deleteNumber(elem){
    elem.parentNode.removeChild(elem);
}
//搜索
function searchFunction(){
    var condition = document.getElementById("condition").value;
    if(condition&&parentDom.children.length>0){
        var newDoms = Array.prototype.slice.call(parentDom.children);
        newDoms.map(function(elem){
            elem.setAttribute("class","");
        });
        newDoms.map(function(elem){
            if(elem.textContent.match(condition)){
                elem.setAttribute("class","redBg");
            }
        });
    }
}