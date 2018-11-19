$(function(){
  // 1. 一进入页面, 发送请求, 渲染页面(分页)
  var currentPage = 1;
  var pageSize = 3;
  var picArr = []; //用于存储上传的图片对象
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
        // 分页渲染
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
  
  // 2. 点击添加按钮, 显示添加模态框
  $('#addBtn').click(function(){
    $('#addModal').modal('show');
    //发送ajax请求,获取所有的二级分类名称进行渲染
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:1,
        pageSize:100
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        $('.dropdown-menu').html(template("dropdownTmp",info));
      }
    });
  });

  // 3. 通过事件委托, 给所有dropdown里面的 a 添加点击事件
  $('.dropdown-menu').on("click","a",function(){
    // 获取文本,添加给按钮
    var txt = $(this).text();
    $('#dropdownText').text(txt);
    //获取id,添加给隐藏域
    var id = $(this).data("id");
    $('[name="brandId"]').val(id); 
    // 将表单校验状态改成成功
    $("#form").data("bootstrapValidator").updateStatus("brandId","VALID");   
  });

  // 4. 进行文件上传配置
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象
    done:function (e, data) {
      console.log(data);
      var picObj = data.result; //后台返回的结果(图片名称picName/图片地址picAddr)
      var picUrl = picObj.picAddr; //图片地址
      picArr.unshift(picObj); //从数组前面添加图片对象
      //结构上,往最前面追加图片prepend  与append正好相反
      $('#imgBox').prepend('<img src="'+ picUrl +'" style="height:100px;">');
      // 只能上传3张图片
      if(picArr.length > 3) {
        //选择了四张图片
        //移除数组中最后一项元素
        picArr.pop();
        // 删除第一张传入的图片
        $('#imgBox img:last-of-type').remove();       
      }
      if(picArr.length == 3) {
        //选择了3张图片,校验状态改成成功
        $("#form").data('bootstrapValidator').updateStatus("picStatus","VALID");       
      }
    }
  });

  // 5. 进行表单校验初始化
  $('#form').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],  
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },  
    //3. 指定校验字段
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存数量"
          },
          // 正则校验, 非零开头的数字
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '请输入非零开头的数字'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输入尺码"
          },
          // 校验需求: 必须是 xx-xx 的格式,  xx两位数字
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '必须是 xx-xx 的格式,  xx两位数字'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },
      // 专门用于标记文件上传是否满3张的
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      }

    }
  
  });

  // 6. 注册表单校验成功事件, 阻止默认的提交, 通过 ajax 提交
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    var params = $('#form').serialize();
    console.log(params);
    // 还要拼接上三张图片名称和图片地址
    params += "&picName1="+ picArr[0].picName +"&picAddr1="+ picArr[0].picAddr;
    params += "&picName2="+ picArr[0].picName +"&picAddr2="+ picArr[0].picAddr;
    params += "&picName3="+ picArr[0].picName +"&picAddr3="+ picArr[0].picAddr;
    
    $.ajax({
      type:'post',
      url:'/product/addProduct',
      data:params,
      dataType:'json',
      success:function(info) {
        console.log(info);
        if(info.success) {
          // 关闭模态框
          $('#addModal').modal('hide');
          // 重新渲染页面
          currentPage = 1;
          render();
          //重置表单的内容和状态
          $('#form').data('bootstrapValidator').resetForm(true);
          // 按钮和图片不会重置,需要手动重置
          $('#dropdownText').text('请选择二级分类');
          //移除图片
          $('#imgBox img').remove();
          //清空数组
          picArr = [];
        }
      }
    });
  });
})