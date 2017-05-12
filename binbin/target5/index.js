/**
 *插入
 */
var numberDom = document.getElementById("inputNumber");
var parentDom = document.getElementById("source");
var buttons = document.querySelectorAll("#inputNumber ~ button");
var datasNumber = document.getElementById("blockNumber");

numberDom.addEventListener("keypress",function(e){
    var event = e||window.event;
    if(!numberOnly(event)){
        if(event.preventDefault()){
            event.preventDefault();
        }else{
            event.returnValue=false;
        }
        event.stopPropagation();//阻止冒泡
    }
},false);

document.body.onload=function(){
    verify(numberDom);
};
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
    if(elem){
        deleteNumber(elem);
        alert("你删除的数据是："+elem.textContent);
    }
}
function outRight(elem){
    if(elem) {
        deleteNumber(elem);
        alert("你删除的数据是：" + elem.textContent);
    }
}
function deleteNumber(elem){
    elem.parentNode.removeChild(elem);
}
function addNumber(way){
    var number = numberDom.value;
    var childDom = document.createElement("li");
    childDom.textContent = number;
    childDom.style.height=(number/100)*100+"%";
    childDom.addEventListener("click",function(e){
        deleteNumber(e.target);
        datasNumber.textContent="数据量："+parentDom.childElementCount;
    },false);
    switch(way){
        case "leftin":
            if(number==""){
                alert("请输入数字。");
                return;
            }
            insertLeft(parentDom,childDom);
            break;
        case "rightin":
            if(number==""){
                alert("请输入数字。");
                return;
            }
            insertRight(parentDom,childDom);
            break;
        case "leftout":
            outLeft(parentDom.firstElementChild);
            break;
        case "rightout":
            outRight(parentDom.lastElementChild);
            break;
    }
    datasNumber.innerText="数据量："+parentDom.childElementCount;
    numberDom.focus();
    hasEnough(parentDom,numberDom,buttons);
    numberDom.value ="";
    verify(numberDom);
}

//验证是否为数字
function numberOnly(event){
    event = event||window.event;
    var isNumber = event.charCode === 0||/\d/.test(String.fromCharCode(event.charCode));
    if(!isNumber){
        alert("请输入数字！");
    }
    return isNumber;
}
//验证数字是否符合要求
function verify(dom){
    var errorMsg = "";
    if(dom.value<20||dom.value>100||isNaN(Number(dom.value))){
        errorMsg = "请输入大于20小于100的数字！";
        insertErrorMsg(dom,errorMsg,true);
        Array.prototype.forEach.call(buttons,function(bt){
            if(bt.id=="left-in"||bt.id=="right-in"){
                bt.disabled="disabled";
            }
        });
    }else{
        insertErrorMsg(dom,"",false);
        Array.prototype.forEach.call(buttons,function(bt){
            if(bt.id=="left-in"||bt.id=="right-in"){
                bt.removeAttribute("disabled");
            }
        });
        hasEnough(parentDom,numberDom,buttons);
    }

}
//验证是否达到数量要求
function hasEnough(parentDom,valueDom,buttonsDom) {
    if(parentDom.childElementCount>=60){
        var errorMsg = "增加的数量已达上限！";
        insertErrorMsg(valueDom,errorMsg,true);
        Array.prototype.forEach.call(buttonsDom,function(bt){
            if(bt.id=="left-in"||bt.id=="right-in"){
                bt.disabled="disabled";
            }
        });
    }else{
        insertErrorMsg(valueDom,"",false);
        Array.prototype.forEach.call(buttonsDom,function(bt){
            if(bt.id=="left-in"||bt.id=="right-in"){
                bt.removeAttribute("disabled");
            }
        });
    }
}
//插入错误信息
function insertErrorMsg(dom,msg,ifshow){
    //是否已经存在错误提示信息
    var hasMsg = Boolean(dom.parentElement.querySelector("span[name='errorMsg']"));
    if(ifshow){
        if(!hasMsg){
            var errorMsg = document.createElement("span");
            errorMsg.className="errorMsg";
            errorMsg.style.top=(dom.offsetTop+dom.offsetHeight+5)+"px";
            errorMsg.style.left=dom.offsetLeft+"px";
            errorMsg.textContent = msg;
            errorMsg.setAttribute("name","errorMsg");
            dom.offsetParent.appendChild(errorMsg);
        }
    }else if(hasMsg){
        var errorDom = document.getElementsByName("errorMsg")[0]||document.querySelector("[name='errorMsg']");
        dom.parentNode.removeChild(errorDom);
    }
}

//排序
function popSort(){
    var ul =document.getElementById("source");
    var children = ul.children;
    if(ul.childElementCount>=2){
        /*for(var i=children.length-1;i>0;i--){
            for(var j=0;j<i;j++){
                if(children[j].textContent>children[j+1].textContent){
                    setTimeout(function(children,j){
                        ul.insertBefore(children[j+1],children[j]);
                    },1000,children,j);
                }
            }
        }*/
        var beginindex = 0;
        var endindex = children.length-1;
        var ifchangeColor= true;
        var timer = setTimeout(function(){
            if(beginindex==endindex){
                clearTimeout(timer);//循环到最后退出循环,恢复颜色
                for(var n=0;n<children.length;n++){
                    children[n].setAttribute("class","");
                }
                console.log("排序完成。");
            }else if(beginindex<=endindex-1){
                //变色
                if(ifchangeColor){
                    changeColor(children[beginindex],children[beginindex+1]);
                    //变色之后下一轮为数据对比
                    ifchangeColor=false;
                }else{
                    //交换dom节点
                    if(children[beginindex].textContent>children[beginindex+1].textContent){
                        changeindex(ul,children[beginindex],children[beginindex+1]);
                    }
                    if(beginindex==endindex-1){
                        children[beginindex].setAttribute("class","");
                        beginindex=0;
                        endindex--;
                    }else{
                        beginindex++;
                    }
                    //数据对比之后下一轮是变色
                    ifchangeColor=true;
                }
                timer = setTimeout(arguments.callee,1000);//继续循环
            }
        },1000);
    }else{
        alert("请添加数据。");
    }
}
//改变颜色
function changeColor(dom1,dom2){
    if(dom1.previousElementSibling){
        dom1.previousElementSibling.setAttribute("class","");
    }
    dom1.setAttribute("class","redBG");
    dom2.setAttribute("class","redBG");
}
//改变位置
function changeindex(parent,dom1,dom2){
    parent.insertBefore(dom2,dom1);
}
//定时执行


