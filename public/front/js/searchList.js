$(function(){
  var key = getSearch("key");
  console.log(key);

  //1.将搜索关键字赋值给 input 
  $('.search_input').val(key);
  //2.一进入页面,需要根据input框中的搜索关键字进行渲染页面(因为中途可能更改搜索值)
  render();

  //3.点击搜索按钮,实现搜索功能
  $('.search_btn').click(function(){
    render();
  });

  // 4.给排序按钮,添加点击效果
      // (1) 如果自己没有current类,加上current类
      // (2) 如果自己有current类,改变箭头方向

      // 属性选择器
  $('.lt_sort a[data-type]').click(function(){
    if($(this).hasClass('current')){
      // 有current类,改变箭头方向(箭头方向可以来回切换)

      // ★特殊用法:在两个类名之间切换,用两个toggleClass()
      $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
    }else {
      // 没有current类
      $(this).addClass('current').siblings().removeClass('current');
    }
    render();
  });

  function render(){
    // 每次请求渲染时,先显示loading中的效果
    $('.lt_product').html('<div class="loading"></div>');
    var params = {}; //所有用于请求的参数

    // 这是3个必选参数
    params.proName = $('.search_input').val(); //动态获取搜索框的val值
    params.page = 1;
    params.pageSize = 100;

    // 还有两个额外的可选参数
    // (1) 通过判断有没有current的a,来决定需不需要传参
    // (2) 通过判断箭头方向,决定升序还是降序排列,1升序,2降序
    // 思路:利用选择器来实现(选择器的特殊使用方法)
    var $current = $('.lt_sort a.current');
    // console.log($current);
    if($current.length === 1){
      // 存在带有current类名的li
      //需要排序
      var sortName = $current.data('type'); //排序的键
      var sortValue = $current.find("i").hasClass("fa-angle-down") ? 2:1; //排序的值
      // console.log(sortName + ":" + sortValue);
      params[sortName] = sortValue;
    }
    // 模拟网络延迟
    setTimeout(function(){
      $.ajax({
        url:'/product/queryProduct',
        data:params,
        dataType:'json',
        success:function(info){
          console.log(info);
          $('.lt_product').html(template("productTmp",info));
        }
      });
    },500);
  }
})