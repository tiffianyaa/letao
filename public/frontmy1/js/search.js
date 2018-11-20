$(function(){
  //准备假数据
  /*
  var arr = ["张三","李四","王五"];
  var jsonStr = JSON.stringify(arr);
  localStorage.setItem("search_list",jsonStr);
  */
  
  render();
  function getHistory(){
    var jsonStr = localStorage.getItem("search_list") || "[]";
    var arr = JSON.parse(jsonStr);
    return arr;
  }
  function render(){
    var arr = getHistory();
    $('.lt_history').html(template("tmp",{list:arr}));
  }

  //清空所有历史
  $('.lt_history').on('click','.empty_btn',function(){   
    mui.confirm("你确定要删除所有记录吗","温馨提示",["取消","确认"],function(e){
      console.log(e);
      if(e.index===1){
        localStorage.removeItem("search_list");
        render();
      }
    });
  });

  //删除单个历史记录
  $('.lt_history').on("click",".btn_delete",function(){
    var index = $(this).data("index");
    var arr = getHistory();
    arr.splice(index,1);
    localStorage.setItem("search_list",JSON.stringify(arr));
    render();
  });

  //添加历史记录
  $('.search_btn').on('click',function(){
    var key = $('.search_input').val().trim();
    if(key === ""){
      mui.toast("请输入关键字");
    }
    var arr = getHistory();
    // 1. 如果有重复项, 需要先将重复项删除, 后面再添加到最前面
    var index = arr.indexOf(key)
    if(index !== -1){
      arr.splice(index,1);
    }
    // 2. 如果长度超过了 10个, 删除最后一个 pop() 
    if(arr.length >= 10){
      arr.pop();
    }
    arr.unshift(key);
    localStorage.setItem("search_list",JSON.stringify(arr));
    render();
    // 清空搜索框
    $('.search_input').val('');
    // 跳转到搜索列表页
    location.href="searchList.html?key="+key;
  });
});