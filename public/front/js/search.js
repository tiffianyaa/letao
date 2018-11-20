$(function(){
  // 分析功能
  // 1.根据搜索历史,进行渲染展示
  // 2. 清空所有历史
  // 3. 删除单个历史记录
  // 4. 添加历史记录


  // 由于我们都是进行本地的存储工作,所以要约定一个键名:search_list

  // 添加假数据的过程(在控制台执行)
  // var arr = ["耐克","阿迪","耐克王","阿迪王","老北京"];
  // var jsonStr = JSON.stringify(arr);
  // localStorage.setItem("search_list",jsonStr);

  /*
  * 功能1: 根据搜索历史, 进行渲染展示
  * (1) 从本地存储中, 读取历史记录
  * (2) 读取出来是json字符串, 转换成数组
  * (3) 通过模板引擎进行渲染
  * */
  render();
  
  
  function getHistory(){
    // 读取不存在的 item 时, 返回 null, 应该进行处理
    // 封装一个方法,读取本地存储,返回数组
    var jsonStr = localStorage.getItem("search_list") || '[]';
    var arr = JSON.parse(jsonStr);
    return arr;
  }
  function render(){
    // 封装一个方法,读取本地历史,通过模版引擎,进行页面渲染
    var arr = getHistory();    
    $('.lt_history').html(template('searchTmp',{list:arr}));
  }
  

  /*
  * 功能2: 清空所有历史
  * (1) 给清空记录添加点击事件 (事件委托)
  * (2) 清空所有的历史记录数据(只删除自己的) localStorage.removeItem("search_list")
  * (3) 页面重新渲染
  * */
  $('.lt_history').on('click','.btn_empty',function(){
    mui.confirm("你确定要清空所有历史记录吗","温馨提示",["取消","确认"],function(e){
      console.log(e);
      if(e.index === 1) {
        // 确定清空
        localStorage.removeItem('search_list');
        render();
      }
    }); 
  });


  /*
  * 功能3: 删除单个历史记录
  * (1) 通过事件委托给所有删除按钮, 添加点击事件
  * (2) 获取需要删除的项的下标
  * (3) 根据下标从数组中删除该项
  * (4) 将修改后的数组, 转成 jsonStr, 存储到本地
  * (5) 重新渲染
  * */
  $('.lt_history').on('click','.btn-delete',function(){
    // 获取下标
    var index = $(this).data("index");
    // 获取本地存储的数组
    var arr = getHistory();
    // 根据下标, 删除数组中的对应项(splice方法会改变原数组)
    arr.splice(index,1);
    // 转成jsonStr, 存储到本地
    localStorage.setItem('search_list',JSON.stringify(arr));
    // 页面重新渲染
    render();
  });

  /*
  * 功能4: 添加单个历史记录功能
  * (1) 给搜索按钮添加点击事件
  * (2) 获取搜索框的内容
  * (3) 添加到数组的最前面  unshift
  * (4) 转成 jsonStr, 存储到本地存储中
  * (5) 重新渲染
  * */
  $('.search_btn').on('click',function(){
    // 获取搜索关键字
    var key = $('.search_input').val().trim();
    if(key === "") {
      mui.toast("请输入搜索关键字");
      return;
    }
    var arr = getHistory();
    // 功能需求:
    // 1. 如果有重复项, 需要先将重复项删除, 后面再添加到最前面
    // 数组的indexOf方法,看数组中是否存在此元素,如果有,返回下标,若没有返回-1
    var index = arr.indexOf(key);
    if(index != -1) {
      arr.splice(index,1);
    }
    // 2. 如果长度超过了 10个, 删除最后一个 pop()  
    if(arr.length >= 10) {
      arr.pop();
    }
    
    arr.unshift(key);
    var jsonStr = JSON.stringify(arr);
    localStorage.setItem('search_list',jsonStr);
    render();  
    // 清空搜索框的内容
    $('.search_input').val("");  

    // 跳转到搜索列表页
    location.href = "searchList.html?key="+"匡威";
  });
});