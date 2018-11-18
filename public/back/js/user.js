// 一进入页面, 发送ajax请求, 获取数据, 进行页面动态渲染
$(function(){
  var currentPage = 1;
  var pageSize = 5;
  //一进入页面,先渲染第一页
  render();
  function render(){
    $.ajax({
      type:'get',
      url:'/user/queryUser',
      data:{
        page: currentPage,
        pageSize: pageSize
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        $('tbody').html(template("tmp",info));
        // 进行分页初始化
        $('#pagintor').bootstrapPaginator({
          bootstrapMajorVersion:3,//版本号
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,page){
            currentPage = page;
            render();
          }
        });
      }
    });
  }

  // 测试分页插件
  // $("#pagintor").bootstrapPaginator({
  //   bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
  //   currentPage:1,//当前页
  //   totalPages:3,//总页数
  //   size:"small",//设置控件的大小，mini, small, normal,large
  //   onPageClicked:function(a, b, c, page){
  //     //为按钮绑定点击事件 page:当前点击的按钮值
  //     console.log(page);     
  //   }
  // });


  // 给启用禁用按钮, 添加点击事件 (通过事件委托)
  // 事件委托: $('父元素').on("事件名称", "子元素", function() { .... })
  // 优点: 1. 可以给动态生成的元素, 绑定事件
  //       2. 可以进行批量注册事件, 性能效率更高
  var currentId;
  var isDelete;
  $('.lt_content tbody').on("click",".btn",function(){
    // 显示模态框
    $('#userModal').modal("show");
    currentId = $(this).parent().data("id");
    console.log(currentId);
    // 根据类名获取更改后的状态
    isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
  });


  // 确认按钮被点击, 发送ajax请求, 改变用户状态
  $('#confirmBtn').click(function(){
    $.ajax({
      type:'post',
      url:'/user/updateUser',
      data:{
        id:currentId,
        isDelete:isDelete
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        if(info.success) {
          // 关闭模态框
          $("#userModal").modal("hide");
          // 页面重新渲染
          render();
        }
      }
    });
  });
});