/**
 * getData方法
 * 读取id为source的列表，获取其中城市名字及城市对应的空气质量
 * 返回一个数组，格式见函数中示例
 */
function getData() {
    //document.querySelectorAll("#source li");
    var sourceLis = document.getElementById("source").getElementsByTagName("li");
    var sourceData = [];
    for(var i=0;i<sourceLis.length;i++){
        var soc = sourceLis[i].textContent.match(/(.*)空气质量：(.*)/);
        sourceData.push(new Array(soc[1],Number(soc[2])));
    }
    /*
     data = [
     ["北京", 90],
     ["北京", 90]
     ……
     ]
     */

    return sourceData;

}

/**
 * sortAqiData
 * 按空气质量对data进行从小到大的排序
 * 返回一个排序后的数组
 */
function sortAqiData(data) {
    return data.sort(function(arra,arrb){
        return arra[1]-arrb[1];
    })
}


/**
 * render
 * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
 * 格式见ul中的注释的部分
 */
function render(data) {
    var resortUl = document.getElementById("resort");
    resortUl.innerHTML="";
    data.forEach(function(arr,index){
        var resortLi = document.createElement("li");
        resortLi.innerHTML = "第"+(index+1)+"名："+arr[0]+"空气质量：<b>"+arr[1]+"</b>";
        resortUl.appendChild(resortLi);
    });
}

function btnHandle() {
    var aqiData = getData();
    aqiData = sortAqiData(aqiData);
    render(aqiData);
}

function init() {
    document.getElementById("sort-btn").addEventListener("click",function(){
        btnHandle();
    });
    // 在这下面给sort-btn绑定一个点击事件，点击时触发btnHandle函数

}

init();