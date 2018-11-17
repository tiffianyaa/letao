
//进度条事件

// 需求: 在第一个ajax请求时, 开启进度条
//       在所有的ajax请求都回来后, 关闭进度条

// ajax全局事件
// .ajaxSend()      ajax请求发送前
// .ajaxSuccess()   当每个ajax成功响应
// .ajaxError()     ajax请求发送失败
// .ajaxComplete()  ajax请求发送完成(不论成功还是失败)

// .ajaxStart()     当第一个ajax请求发送时调用
// .ajaxStop()     当所有的ajax请求完成时调用
$(document).ajaxStart(function() {
  //第一个ajax发送时调用,开启进度条
  NProgress.start();
});

// 所有的ajax请求完成时,关闭进度条
$( document ).ajaxStop(function() {
  setTimeout(function(){
    //关闭进度条
    NProgress.done();
  },500);
});

// jquery入口函数,会等待DOM结构加载完成之后,就执行
$(function(){
  // 公共的功能
  // 功能1:导航点击切换功能
  $('.lt_aside .category').click(function(){
    // 让它下一个兄弟元素child切换显示隐藏
    $(this).next().stop().slideToggle();
  });
  // 功能2:左侧菜单列表切换功能
  $('.lt_main .icon_left').click(function(){
    $('.lt_aside').toggleClass('hidemenu');
    $('.lt_main').toggleClass('hidemenu');
    $('.lt_main .lt_topbar').toggleClass('hidemenu');
  });
  // 功能3: 退出功能
  $('.lt_main .icon_right').click(function(){
    //显示模态框
    $('#myModal').modal('show');
  });

  // 模态框的按钮点击事件
  $('#logoutBtn').click(function(){
    // 发送ajax请求, 让后台销毁当前用户的登录状态
    $.ajax({
      type:'get',
      url:'/employee/employeeLogout',
      dataType:'json',
      success:function(info){
        if(info.success) {
          location.href='login.html'
        }
      }
    });
    // 错误方式:location.href='login.html';
  });
});