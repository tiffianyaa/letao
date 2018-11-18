$(function(){
  // 通过ajax获取数据
  $.ajax({
    type:'get',
    url:'/category/queryTopCategoryPaging',
    data:{
      page: 1,
      pageSize: 5
    },
    dataType:'json',
    success:function(info) {
      console.log(info);
      
    }
  });
});