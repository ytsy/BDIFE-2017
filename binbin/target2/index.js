var aqiData = [
    ["北京", 90],
    ["上海", 50],
    ["福州", 10],
    ["广州", 50],
    ["成都", 90],
    ["西安", 100]
];

(function(){
    //对数据排序：参数依次-数据、升序或降序、过滤条件(>或其他)、过滤界限
    function sortCity(arry,sortOrder,filterCondition,filterData){
        var newArray = [];
        if(filterCondition===">"){
            newArray = arry.filter(function(elem){
                return (elem[1]>filterData);
            });
        }else{
            newArray = arry.filter(function(elem){
                return (elem[1]<=filterData);
            });
        }
        //过滤结果按照城市名升序排列
        if(sortOrder==='asc'){
            newArray = newArray.sort(function(elem1,elem2){
                return elem1[0].localeCompare(elem2[0]);
            });
        }else{
            newArray = newArray.sort(function(elem1,elem2){
                return elem2[0].localeCompare(elem1[0]);
            });
        }
        return newArray;
    }
    //将排序结果显示在页面上
    function produceList(arry){
        var sortOrder = document.querySelector("input[name=order]:checked").value;
        var filterCondition = document.getElementById("filterCondition").value;
        var filterData = document.getElementById("filterData").value==""?0:document.getElementById("filterData").value;
        var ulDom= document.getElementById("aqi-list");
        ulDom.innerHTML="";//清空,初始化
        var newArray = sortCity(arry,sortOrder,filterCondition,filterData);
        for(var i=0;i<newArray.length;i++){
            var liDom = document.createElement("li");
            liDom.innerHTML = newArray[i][0]+":"+newArray[i][1];
            ulDom.appendChild(liDom);
        }
        return newArray;
    }
    var listData =  produceList(aqiData);
    document.getElementById("resultFunction").addEventListener("click",function(){
        listData = produceList(listData);
    },false);
    //初始化数据
    document.getElementById("initFunction").addEventListener("click",function(){
        var ulDom = document.getElementById("aqi-list");
        ulDom.innerHTML = "";
        for(var i=0;i<aqiData.length;i++){
            var liDom = document.createElement("li");
            liDom.innerHTML = aqiData[i][0]+":"+aqiData[i][1];
            ulDom.appendChild(liDom);
        }
        listData= aqiData;
    },false);
})();
