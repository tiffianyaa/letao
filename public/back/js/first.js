$(function(){
  var currentPage = 1;
  var pageSize = 5;
  render();
  // 1.通过ajax获取数据
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

  // 2.点击添加分类,显示模态框
  $('#addBtn').click(function(){
    $('#addModal').modal('show');
    // $('#cateaddBtn').click(function(){
    //   $.ajax({
    //     type:'post',
    //     url:'/category/addTopCategory',
    //     data:{

    //     },
    //   });
    // });
  });

  // 3.表单校验功能
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入一级分类'
          }
        }
      }
    }
  });

  // 4. 注册表单校验成功事件, 阻止默认的提交, 通过ajax提交
  $('#form').on("success.form.bv",function(e){
    // 阻止submit默认的提交功能
    e.preventDefault();
    $.ajax({
      type:'post',
      url:'/category/addTopCategory',
      data:$('#form').serialize(),
      dataType:'json',
      success:function(info) {
        console.log(info);
        if(info.success) {
          //添加成功
          //关闭模态框
          $('#addModal').modal('hide');
          //重新刷新第一页
          currentPage = 1;
          render();
          //重置表单的内容和状态
          $('#form').data('bootstrapValidator').resetForm(true);
        }
      }
    });
  });

});