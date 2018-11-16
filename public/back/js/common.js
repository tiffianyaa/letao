
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