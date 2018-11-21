$(function(){
  // 准备假数据
  /*
  var arr = ["a","b","c","d","e"];
  var jsonStr = JSON.stringify(arr);
  localStorage.setItem("search_list",jsonStr);
  */
  render();
  // 封装小方法
  // 获取数据
  function getHistory(){
    var jsonStr = localStorage.getItem("search_list") || "[]";
    var arr = JSON.parse(jsonStr);
    return arr;//如果有传数据,返回数组,如果没有数据,返回空数组
  }
  // 渲染
  function render(){
    var arr = getHistory();
    $('.lt_history').html(template("tmp",{list:arr}));
  }

  // 清空记录
  $('.lt_history').on('click','.empty_btn',function(){
    mui.confirm("你确定要清空搜索历史吗","温馨提示",["取消","确认"],function(e){
      if(e.index === 1){
        localStorage.removeItem("search_list");
        render();
      }
    })
  });

  // 删除一条记录
  $('.lt_history').on('click','.btn_delete',function(){
    var index = $(this).data("index");
    var arr = getHistory();
    arr.splice(index,1);
    localStorage.setItem("search_list",JSON.stringify(arr));
    render();
  });

  // 添加记录
  $('.search_btn').on("click",function(){
    var key = $('.search_input').val().trim();
    if(key === ""){
      mui.toast("请输入搜索关键字");
    }
    var arr = getHistory();
    // 如果已经搜索过了的,删除之前的记录,添加现在的记录
    var index = arr.indexOf(key);
    if(index !== -1){
      arr.splice(index,1);
    }
    //数据超过10条,删除最前面的记录
    if(arr.length >= 10){
      arr.pop();
    }
    arr.unshift(key);
    localStorage.setItem("search_list",JSON.stringify(arr));
    render();
    $('.search_input').val('');
    // 跳转到搜索列表界面
    location.href = "searchList.html?key="+key;
  });
});