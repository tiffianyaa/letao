$(function(){
  var currentPage = 1;
  var pageSize = 5;
  render();
  // 通过ajax获取数据
  function render(){
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page: currentPage,
        pageSize: pageSize
      },
      dataType:'json',
      success:function(info) {
        console.log(info);
        $(".lt_content tbody").html(template("tmp",info));  
        //分页
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:currentPage,//当前页
          totalPages:Math.ceil(info.total/info.size),//总页数
          onPageClicked:function(a, b, c,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            console.log(page);  
            currentPage = page;
            // 重新渲染表格
            render();
          }
        });     
      }
    });
       
  }
});