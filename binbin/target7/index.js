
function Tree(n){
    'use strict';
    var index =0;//默认下标为0
    this.root = null;
    this.pageN = 0;
    this.nodes = [];//所有节点
    //遍历节点按顺序存入数组
    this.orderNodes =[];

    if(!isNaN(Number(n))&&n>0){
        this.pageN = n;
    }    //是几叉树

    this.getIndex = function(){
        return index;
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
                tree.nodes[i].children.push(newNode);
                tree.nodes.push(newNode);
                return;
            }
        }
    }

    function Node(data){
        'use strict';
        this.index = index++;
        this.dom = document.createElement("div");
        this.dom.textContent = data;
        this.dom.setAttribute("id","treeNode-"+this.index);
        this.children = [];//默认为任意节点数组
    }



}
//先序遍历
Tree.prototype.perOrder = function(node){

    if(node){
        this.orderNodes.push(node);
        this.perOrder(node.children[0]);
        this.perOrder(node.children[1]);
    }
    if(this.orderNodes.length==this.nodes.length){
        return this.orderNodes;
    }
};
//中序遍历
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
    if(node) {
        this.postOrder(node.children[0]);
        this.postOrder(node.children[1]);
        this.orderNodes.push(node);
    }
    if(this.orderNodes.length==this.nodes.length){
        return this.orderNodes;
    }
};

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

//将数据可视化
function seeChange(nodes,time){
    var hasChange =false;
    var rightNowIndex = 0;
    var buttons = document.querySelectorAll("nav input[type='button']");
    //Array.prototype.slice.call(buttons);//将类数组变为数组
    Array.prototype.forEach.call(buttons,function(elem){
        elem.disabled = "disabled";
    });//按钮不可按
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
var binaryTree = new Tree(2);//生成一个二叉树
binaryTree.insert(1);
binaryTree.insert(2);
binaryTree.insert(3);
binaryTree.insert(4);
binaryTree.insert(5);
binaryTree.insert(6);
binaryTree.insert(7);
binaryTree.root.dom.setAttribute("style","width:100%;height:100%;border:none;");
buildTree(binaryTree.root);

function changeTree(order){
    binaryTree.clearOrderNodes();//清空树的遍历数组
    switch(order){
        case "perOrder":
            seeChange(binaryTree.perOrder(binaryTree.root),500);
            break;
        case "inOrder":
            seeChange(binaryTree.inOrder(binaryTree.root),500);
            break;
        case "postOrder":
            seeChange(binaryTree.postOrder(binaryTree.root),500);
            break;
    }
}
