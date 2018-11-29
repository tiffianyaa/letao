$(function(){
  //登录功能
  $('#loginBtn').click(function(){
    //获取用户名和密码,发送ajax
    var username = $('#username').val().trim();
    var password = $('#password').val().trim();
    if( username ===''){
      mui.toast("请输入用户名");
      return;
    }
    if( password ===''){
      mui.toast("请输入密码");
      return;
    }
    $.ajax({
      type:'post',
      url:'/user/login',
      data:{
        username:username,
        password:password
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        if(info.success){
          //登录成功,跳转到用户中心
          // (1)地址栏传递了retUrl,获取,并跳回去
          // (2)地址栏没有retUrl,正常跳转到user.html
          
          if ( location.search.indexOf("retUrl") != -1 ) {
            // 有传递 retUrl
            var retUrl = location.search.replace("?retUrl=", "");
            // 跳转到指定地址
            location.href = retUrl;
          }
          else {
            // 没传递
            location.href = "user.html";
          }
        }
        if(info.error){
          mui.toast('用户名或者密码错误');
        }
      }
    });
  });
});