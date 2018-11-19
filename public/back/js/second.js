$(function(){
  //1.渲染页面
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render(){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function(info) {
        console.log(info);
        $('tbody').html(template('tmp',info));
        //分页初始化
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a, b, c,page){
            currentPage = page;
            render();
          }
        });
      }
    });
  }

  //2.添加分类,模态框显示
  $('#addBtn').click(function(){
    // 发送ajax请求,获取下拉菜单的列表数据(全部的一级分类)
    //通过分页获取一级分类的接口,模拟获取全部数据的接口
    //page:1,pageSize写大一点,从而获取全部数据
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:1,
        pageSize:100
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        $('.dropdown-menu').html(template('dropdownTmp',info));
      }
    });
    $("#addModal").modal('show');
  });

  //3.给下拉菜单的所有的a添加点击事件,通过事件委托注册
  $('.dropdown-menu').on('click','a',function(){
    //获取a 的文本
    var txt = $(this).text();
    $('#dropdownText').text(txt);
    //获取a的id值,传给隐藏域
    var id = $(this).data("id");
    $('[name="categoryId"]').val(id);
    //因为更改button按钮的值只会改input的value值,不能进行校验
    //所以要手动触发,input的input事件
    // $('[name="categoryId"]').trigger('input');

    // 手动将 name="categoryId"的校验状态,改成校验成功
    $("#form").data('bootstrapValidator').updateStatus('categoryId', 'VALID');
  });

  //4.进行上传文件初始化
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      console.log(data);
      //后台返回的结果(根据打印的内容观察得出)
      var result = data.result;
      //获取文件上传的地址
      var picUrl = result.picAddr;
      //设置给img的src
      $('#imgBox img').attr("src",picUrl);
      // 将src路径,实时设置给input
      $('[name="brandLogo"]').val(picUrl);
      //将name="brandLogo"的校验状态,改成成功
      $("#form").data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
    }
  });

  //5.表单校验
  $('#form').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    //这里需要对隐藏域进行校验
    excluded: [],
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //3. 指定校验字段
    fields: {
      brandName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入二级分类名称'
          }
        }
      },
      categoryId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      brandLogo: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择图片'
          }
        }
      }
    }
  });

  //6.注册表单校验成功事件,阻止默认的按钮提交,通过ajax请求提交表单
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    $.ajax({
      type:'post',
      url:'/category/addSecondCategory',
      // 表单序列化的时候可以多传数据,后台不使用而已
      data:$('#form').serialize(),
      dataType:'json',
      success:function(info){
        console.log(info);
        if(info.success) {
          // 关闭模态框
          $('#addModal').modal('hide');
          //重置表单内容和状态
          $('#form').data('bootstrapValidator').resetForm(true);
          // 注意:由于上方的下拉框和下面的图片不是表单元素,所以需要手动重置
          $('#dropdownText').html('请选择一级分类');
          $('#imgBox img').attr("src","./images/none.png");
          // 重新渲染页面
          render();
        }
      }
    });
  });

  
  
});