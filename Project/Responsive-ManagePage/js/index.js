var lineChartData = {
    //X坐标数据
    labels : ["周一","周二","周三","周四","周五","周六","周末"],
    datasets : [
        {
            //统计表的背景颜色
            fillColor : "rgba(0,0,255,0.5)",
            //统计表画笔颜色
            strokeColor : "rgba(0,0,255,0.6)",
            //点的颜色
            pointColor : "rgba(0,0,255,0.3)",
            //点边框的颜色
            pointStrokeColor : "rgba(0,0,255,0.6)",
            //鼠标触发时点的颜色
            pointHighlightFill : "#000",
            //鼠标触发时点边框的颜色
            pointHighlightStroke : "#000",
            //Y坐标数据
            data : [300,555,655,714,899,905,1000]
        },
        {
            fillColor : "rgba(0,255,0,0.5)",
            strokeColor : "rgba(0,255,0,0.6)",
            pointColor : "rgba(0,255,0,0.3)",
            pointStrokeColor : "rgba(0,255,0,0.6)",
            pointHighlightFill : "#000",
            pointHighlightStroke : "#000",
            data : [314,455,755,650,999,700,1000]
        },
        {
            fillColor : "rgba(255,0,0,0.5)",
            strokeColor : "rgba(255,0,0,0.6)",
            pointColor : "rgba(255,0,0,0.3)",
            pointStrokeColor : "rgba(255,0,0,0.6)",
            pointHighlightFill : "#000",
            pointHighlightStroke : "#000",
            data : [114,255,455,414,599,605,500]
        }
    ]
};

window.onload = function(){
    var ctx = $("#myChart").get(0).getContext("2d");
    window.myLine = new Chart(ctx).Line(lineChartData, {
        responsive: true
    });
};