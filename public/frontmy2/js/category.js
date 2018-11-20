$(function(){
  $.ajax({
    type:'get',
    url:'/category/queryTopCategory',
    dataType:'json',
    success:function(info){
      console.log(info);
      $('.lt_category_left ul').html(template("leftTmp",info));
      renderById(info.rows[0].id);
    }
  });

  function renderById(id){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      dataType:'json',
      data:{
        id:id
      },
      success:function(info){
        console.log(info);
        $('.lt_category_right ul').html(template('rightTmp',info))
      }
    });
  }

  $('.lt_category_left').on('click','a',function(){
    $(this).addClass('current').parent().siblings().find('a').removeClass('current');
    var id = $(this).data("id");
    renderById(id);
  })
})