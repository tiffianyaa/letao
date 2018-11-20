mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false //是否显示滚动条
});

// 对于地址栏的解析封装(返回对于属性值)
function getSearch(k) {
  //  获取地址栏信息
  var str = location.search;
  // 解码并去除问号
  str = decodeURI(str).slice(1);
  var arr = str.split("&");
  var obj = {};
  arr.forEach(function(v,i){
    var key = v.split('=')[0];
    var value = v.split('=')[1];
    obj[key] = value;
  });
  return obj[k];
}