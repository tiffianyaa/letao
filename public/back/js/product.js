$(function(){
  // 1. 一进入页面, 发送请求, 渲染页面
  var currentPage = 1;
  var pageSize = 3;
  render();
  function render(){
    $.ajax({
      type:'get',
      url:'/product/queryProductDetailList',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        $('tbody').html(template("tmp",info));
      }
    });
  }
  // 2. 点击添加按钮, 显示添加模态框
  // 3. 通过事件委托, 给所有dropdown里面的 a 添加点击事件
  // 4. 进行文件上传配置
  // 5. 进行表单校验初始化
  // 6. 注册表单校验成功事件, 阻止默认的提交, 通过 ajax 提交
})