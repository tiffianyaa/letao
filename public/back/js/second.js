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
    }
  });



  //4.表单校验
  $('#form').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [':disabled', ':hidden', ':not(:visible)'],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 30,
            message: '用户名长度必须在6到30之间'
          },
          //正则校验
          regexp: {
            regexp: /^[a-zA-Z0-9_\.]+$/,
            message: '用户名由数字字母下划线和.组成'
          }
        }
      },
    }
  });
  //4.表单校验成功事件

  
  
});