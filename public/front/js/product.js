$(function(){
  // 1. 一进入页面, 获取商品id
  var productId = getSearch('productId');
  // 2. 发送请求, 请求对应商品的详情, 进行页面渲染
  $.ajax({
    url:'/product/queryProductDetail',
    data:{
      id:productId
    },
    dataType:'json',
    success:function(info){
      console.log(info);
      var htmlStr = template("productTmp",info);
      $('.lt_main .mui-scroll').html(htmlStr);
      // 需要在轮播图动态渲染完成之后, 手动初始化轮播图
      // 获得slider插件对象
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 4000//自动轮播周期，若为0则不自动播放，默认为0；
      });
      // 手动初始化 mui 数字框
      mui('.mui-numbox').numbox()
    }
  });
});