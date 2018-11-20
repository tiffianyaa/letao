$(function(){
  //一进入页面,请求左侧数据,并进行渲染
  $.ajax({
    type:'get',
    url:'/category/queryTopCategory',
    dataType:'json',
    success:function(info){
      console.log(info);
      $('.lt_category_left ul').html(template('left_tmp',info));
      // 渲染第一个,id不一定是1,可能会被删掉了,所以需要传入的是第0项对应的id
      renderById( info.rows[0].id );
    }
  });


  // 给左侧添加点击事件,通过事件委托实现
  $('.lt_category_left ul').on('click','a',function(){
    //高亮效果
    $(this).addClass('current').parent().siblings().find("a").removeClass('current');
    var id = $(this).data("id");
    renderById(id);
    
  });

  //封装一个方法,根据一级分类的id渲染二级分类
  function renderById(id) {
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