//tree的类
function Tree(n){
    'use strict';
    var index =0;//默认下标为0
    this.root = null;
    this.pageN = 0;
    this.nodes = [];//该树的所有节点
    var that = this;
    var clickTarget = null;//被鼠标点击的树dom节点
    //遍历节点按顺序存入数组
    this.orderNodes =[];

    if(!isNaN(Number(n))&&n>0){
        this.pageN = n;
    }    //是几叉树

    this.getIndex = function(){
        return index;
    };
    this.getClickTarget = function(){
        return clickTarget;
    };
    this.getClickTargetNode = function(){
        if(clickTarget) {
            for(var i=0;i<this.nodes.length;i++){
                if (this.nodes[i].dom == clickTarget){
                    return this.nodes[i];
                }
            }
        }else{
            return null;
        }
    };
    this.deleteClickTarget = function(){
        clickTarget = null;
    };
    this.clearOrderNodes = function(){
        this.orderNodes = [];
    };
    //在树中插入节点
    this.insert = function(data){
        if(!this.root){
            this.root = new Node(data);
            this.nodes.push(this.root);
        }else{
            insertNode(this,data);
        }
    };

    function insertNode(tree,data){
        var newNode = new Node(data);
        var pageN = tree.pageN;
        //通过for循环遍历每一个节点然后插入
        for(var i=0;i<tree.nodes.length;i++){
            if(tree.nodes[i].children.length<pageN){
                newNode.parentNode = tree.nodes[i];
                tree.nodes[i].children.push(newNode);
                tree.nodes.push(newNode);
                return;
            }
        }
    }

    function Node(data){
        'use strict';
        this.parentNode = null;
        this.index = index++;
        this.dom = document.createElement("div");
        this.dom.innerHTML = "<span>"+data+"</span>";
        this.dom.setAttribute("id","treeNode-"+this.index);
        this.dom.addEventListener("click",function(e){
            var event = e||window.event;
            var target = event.target||event.srcElement;
            if(clickTarget&&clickTarget!=target){
                clickTarget.style.backgroundColor = "#ffffff";
            }
            if(target.style.backgroundColor=="green"){
                target.style.backgroundColor = "#ffffff";
                clickTarget = null;
            }else{
                target.style.backgroundColor = "green";//选中的节点为绿色
                clickTarget = target;
            }

            event.stopPropagation();
        },false);
        this.children = [];//默认为任意节点数组
        this.getChildrenLength = function(){
            return this.children.length;
        };
        this.insertChild = function(data){
            var newNode = new Node(data);
            this.dom.appendChild(newNode.dom);
            that.nodes.push(newNode);//在树中添加节点
        };
    }
}
/* *
 *二叉树遍历
 * 深度优先遍历
 * */
//先序遍历
Tree.prototype.perOrder = function(node){
    var that = this;
    if(node){
        this.orderNodes.push(node);
        node.children.forEach(function(node){
            that.perOrder(node)
        });
    }
    if(this.orderNodes.length==this.nodes.length){
        return this.orderNodes;
    }
};
//二叉树中序遍历
Tree.prototype.inOrder = function(node){
    if(node) {
        this.inOrder(node.children[0]);
        this.orderNodes.push(node);
        this.inOrder(node.children[1]);
    }
    if(this.orderNodes.length==this.nodes.length){
        return this.orderNodes;
    }
};
//后序遍历
Tree.prototype.postOrder = function(node){
    var that = this;
    if(node) {
        node.children.forEach(function(node){
            that.postOrder(node);
        });
        this.orderNodes.push(node);
    }
    if(this.orderNodes.length==this.nodes.length){
        return this.orderNodes;
    }
};
//广度优先遍历
Tree.prototype.wideOrder = function(node){
    if(node){
        this.orderNodes.push(node);
        if(node.children.length>0){
            this.orderNodes.concat(node.children);
        }
    }
    if(this.orderNodes.length==this.nodes.length){
        return this.orderNodes;
    }
};
//生成一个N叉树，如果是一个二叉树还需要进行左右节点大小判断
function buildTree(node){
    if(node.index==0){
        document.querySelector("section").appendChild(node.dom);
    }
    if(node.children.length>0){
        node.children.forEach(function(elem){
            node.dom.appendChild(elem.dom);
            buildTree(elem);
        });
    }
}
//删除dom节点
function deleteNodeDom(){
   /* var node = tree.getClickTargetNode();
     node.dom.parentNode.removeChild(node.dom);
     deleteNode(node);*/
    tree.nodes.forEach(function(node){
        if(node.dom == tree.getClickTarget()){
            node.dom.parentNode.removeChild(node.dom);
            deleteNode(node);
            tree.deleteClickTarget();
        }
    });
}
//删除tree中的node以及该node的children
function deleteNode(node){

    if(node.getChildrenLength()>0){
        node.children.forEach(function(node){
            deleteNode(node);
        });
    }
    var targetNode = node;
    //在父节点中删除此节点
    targetNode.parentNode.children.forEach(function(node,index){
       if(targetNode==node){
           targetNode.parentNode.children.splice(index,1);
       }
    });
    //在tree中删除此节点
    tree.nodes.forEach(function(node,index){
        if(node==targetNode){
            tree.nodes.splice(index,1);//改变原数组的删除方法
        }
    });
}
//添加节点
function appendNode(){
    var data = document.getElementById("nodeData").value;
    var insertNode = tree.getClickTargetNode();
    if(data){
        if(insertNode){
            insertNode.insertChild(data);
        }else{
            alert("请选择节点");
        }
    }else{
        alert("请输入数据!");
    }
}
//将遍历可视化
function seeChange(nodes,time){
    var hasChange =false;
    var rightNowIndex = 0;
    var buttons = document.querySelectorAll("nav input[type='button']");
    Array.prototype.forEach.call(buttons,function(elem){
        elem.disabled = "disabled";
    });//按钮不可按
    console.log(nodes);
    var timer = setTimeout(function(){
        if(!nodes[rightNowIndex]){
            clearTimeout(timer);
            Array.prototype.forEach.call(buttons,function(elem){
                elem.removeAttribute("disabled");
            });//按钮可按
        }else{
            if(!hasChange){
                nodes[rightNowIndex].dom.style.backgroundColor = "red";
                hasChange = true;
            }else{
                nodes[rightNowIndex].dom.style.backgroundColor = "#ffffff";
                hasChange = false;
                rightNowIndex++;
            }
            timer = setTimeout(arguments.callee,time);
        }
    },time);
}
//将查询可视化
function seeSearchChange(nodes,condition,time){
    nodes.forEach(function(elem){
        elem.dom.style.backgroundColor = "#ffffff";
    });
    var hasChange =false;
    var rightNowIndex = 0;
    var buttons = document.querySelectorAll("nav input[type='button']");
    var matchNodes=[];//匹配的节点
    Array.prototype.forEach.call(buttons,function(elem){
        elem.disabled = "disabled";
    });//按钮不可按
    var timer = setTimeout(function(){
        if(!nodes[rightNowIndex]){
            clearTimeout(timer);
            Array.prototype.forEach.call(buttons,function(elem){
                elem.removeAttribute("disabled");
            });//按钮可按
            if(matchNodes.length==0){alert("未找到匹配节点");}
        }else{
            if(!hasChange){
                nodes[rightNowIndex].dom.style.backgroundColor = "red";
                if(nodes[rightNowIndex].dom.firstChild.textContent.search(condition)>=0){
                    matchNodes.push(nodes[rightNowIndex]);
                    rightNowIndex++;//下一个节点
                }else{
                    hasChange = true;
                }
            }else{
                nodes[rightNowIndex].dom.style.backgroundColor = "#ffffff";
                hasChange = false;
                rightNowIndex++;
            }
            timer = setTimeout(arguments.callee,time);
        }
    },time);
}
//树的遍历事件
function changeTree(order){
    tree.clearOrderNodes();//清空树的遍历数组
    switch(order){
        case "perOrder":
            seeChange(tree.perOrder(tree.root),500);
            break;
        case "inOrder"://二叉树才有中序遍历
            if(tree.pageN==2){
                seeChange(tree.inOrder(tree.root),500);
            }
            break;
        case "postOrder":
            seeChange(tree.postOrder(tree.root),500);
            break;
        case "wideOeder":
            seeChange(tree.wideOrder(tree.root),500);
            break;
        default:
            seeChange(tree.nodes,500);//默认按照添加顺序遍历
            break;
    }
}
function search(){
    var condition = document.getElementById("condition").value;
    //非二叉树的情况下直接按节点顺序遍历
    if(condition){
        seeSearchChange(tree.nodes,condition,500);
    }
}
var tree = new Tree(4);
tree.insert("fruit");
tree.insert("phone");
tree.insert("fruit");
tree.insert("xiaomi");
tree.insert("xigua");
tree.insert("phone");
tree.insert("iphone");
tree.insert("nokia");
tree.insert("mi");
tree.insert("chuizi");
tree.insert("xiaomi");
tree.insert("xigua");
tree.root.dom.setAttribute("style","width:100%;height:100%;border:none;");
buildTree(tree.root);
//手动生成一个二叉树
/*var binaryTree = new Tree(2);
binaryTree.insert(1);
binaryTree.insert(2);
binaryTree.insert(3);
binaryTree.insert(4);
binaryTree.insert(5);
binaryTree.insert(6);
binaryTree.insert(7);
binaryTree.root.dom.setAttribute("style","width:100%;height:100%;border:none;");
buildTree(binaryTree.root);*/

