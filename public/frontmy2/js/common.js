mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false //是否显示滚动条
});

// 封装一个方法,获取通过locationStorage传递的数据
function getSearch(k){
  var str = location.search;
  str = decodeURI(str);
  str = str.slice(1);
  var arr = str.split("&");
  var obj = {};
  arr.forEach(function(v,i){
    var key = v.split('=')[0];
    var value = v.split('=')[1];
    obj[key] = value;
  });
  return obj[k];
}