// 一进入页面, 发送ajax请求, 获取数据, 进行页面动态渲染
$(function(){
  $.ajax({
    type:'get',
    url:'/user/queryUser',
    data:{
      page:1,
      pageSize:5
    },
    dataType:'json',
    success:function(info){
      console.log(info);
      $('tbody').html(template("tmp",info));
    }
  });
});