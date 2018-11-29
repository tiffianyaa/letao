$(function(){
  //1.用户信息渲染
  $.ajax({
    url:'/user/queryUserMessage',
    dataType:'json',
    success:function(info){
      console.log(info);
      if(info.error === 400){
        //未登录,拦截到登录页
        location.href = "login.html";
        return;
      }
      //说明当前用户已登录,info就是当前用户的信息
      var htmlStr = template('userTmp',info);
      $('#userInfo').html(htmlStr);
    }
  });
  //2.退出功能
  $('#logout').click(function(){
    $.ajax({
      url:'/user/logout',
      dataType:'json',
      success:function(info){
        console.log(info);
        if(info.success){
          //退出成功,跳转到登录页
          location.href = "login.html";
        }
      }
    });
  });
});