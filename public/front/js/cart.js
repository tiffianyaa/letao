$(function(){
  // 一进入页面, 发送ajax请求, 获取购物车列表数据, 并渲染
  // (1) 当前用户未登录,  后台返回 error,  跳转到登录页
  // (2) 当前用户已登录,  后台返回 购物车数据, 进行渲染
  render();
  function render(){
    $.ajax({
      url:'/cart/queryCart',
      dataType:'json',
      success:function(info){
        console.log(info);
        if(info.error === 400){
          // 未登录, 拦截到登录页, 希望跳回来
          location.href = "login.html?retUrl=" + location.href;
          return;
        }
        //已登录,返回购物车数据
        var htmlStr = template("cartTmp",{list:info});
        $('.lt_main .mui-scroll').html(htmlStr);
      }
    });
  }

  // 删除功能
  // (1) 通过事件委托给删除按钮, 添加点击事件
  // (2) 获取需要删除的当前 id, 发送请求
  // (3) 删除成功, 页面重新渲染
  $('.lt_main').on("click",'.btn_delete',function(){
    var id = $(this).data("id");
    $.ajax({
      url:'/cart/deleteCart',
      data:{
        //后台要求传数组(衍生,可以支持批量删除)
        id:[id]
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        if(info.success){
          //重新渲染页面
          render();
        }
      }
    });
    
  });
});