(function() {
    //三种监听事件的方式，1、HTML-onX属性。2、element.onclick()或者setAttribute("onclick","function(){}")。3、addeventListener()
    var button = document.getElementById("button");
    var weather = document.getElementById("aqi-input");
    var output = document.getElementById("aqi-display");
    button.addEventListener("click",function(){
        output.innerHTML = weather.value;
    },false);//只在冒泡阶段触发
})();