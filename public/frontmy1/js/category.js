$(function(){
  var id = 1;
  $.ajax({
    type:'get',
    url:'/category/queryTopCategory',
    dataType:'json',
    success:function(info){
      console.log(info);
      $('.lt_category_left ul').html(template('left_tmp',info));
      // 渲染第一个一级分类下面的二级分类
      render(info.rows[0].id);
    }
  });

  // 左侧a的点击事件,事件委托注册
  $('.lt_category_left').on('click','a',function(){
    $(this).addClass('current').parent().siblings().find("a").removeClass('current');
    var id = $(this).data("id");
    render(id);
  });

  // 根据左侧高亮场馆的id来渲染右侧页面
  function render(id) {
    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data:{
        id:id
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        $('.lt_category_right ul').html(template('right_tmp',info));
      }
    });
  }
});