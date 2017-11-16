$(function () {

  var flag = true;
  var judge = true;
  // getSearchListData();

  mui.init({
    // 注意: 按照文档上书写的DOM结构无特殊要求，只需要指定一个下拉刷新容器标识即可
    // 但是实际上不行,按照实践要求 必须在区域滚动的基础上才可以
    pullRefresh : {
      container:"#lt-search",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {
        style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
        color:'#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
        height:'50px',//可选,默认50px.下拉刷新控件的高度,
        range:'100px', //可选 默认100px,控件可下拉拖拽的范围
        offset:'0px', //可选 默认0px,下拉刷新控件的起始位置
        auto: true,//可选,默认false.首次加载自动上拉刷新一次
        callback:function(){
          // console.log(1);
          getSearchListData();
    
        }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }
    }
  });

  // 1.排序
  // 1.1 价格
  $('.order-price').on('tap',function(){
    $('.search-result-order a').removeClass('active');
    $(this).addClass('active');
    // 降序
  
    if(flag == true) {
      // 升序
      getSearchListData(1,1,2);

      flag = false;
      $(this).find('i').addClass('fa-angle-up');
      $(this).find('i').removeClass('fa-angle-down');

    }else {
      // 降序
      getSearchListData(1,2,2);
      flag = true;
      $(this).find('i').addClass('fa-angle-down');
      $(this).find('i').removeClass('fa-angle-up');
    }
  })
  // 1.2 销量
  // 在业务中 最好去除掉不同排序标准的影响 如果不同的标准可以不传参数 那直接传null
// 问题： 在排序业务中 产生了价格和库存的排序的影响
// 解决:  如果拿某一个作为标准 那一定要把其他的标准写空
//        再采取单一变量的标准去获取数据
  $('.order-stock').on('tap',function(){
    $('.search-result-order a').removeClass('active');
    $(this).addClass('active');
    // 降序
  
    if(judge == true) {
      // console.log(1);
      // 升序
      // getSearchListData(页码,价格,num);
      getSearchListData(1,null,1);

      judge = false;
      $(this).find('i').addClass('fa-angle-up');
      $(this).find('i').removeClass('fa-angle-down');

    }else {
      // console.log(2);
      // 降序
      getSearchListData(1,null,2);
      judge = true;
      $(this).find('i').addClass('fa-angle-down');
      $(this).find('i').removeClass('fa-angle-up');
    }
  })
})
// 1.3 点击进入商品详情页
$('.search-result-list').on('tap','button',function(){
  var id = $(this).data('id');
  location.href= "./detail.html?id="+id;
})

 // 获取搜索结果
 var getSearchListData = function (pageNum,price,num) {
  
      // 1.怎么获取到url呢？
      // console.log(location.href);
      // 2.怎么获取到url中的参数呢？
      // 使用url的一个内置对象URLSearchParams
      var url = new URLSearchParams(location.search);
      var proName = url.get('proName');
      // console.log(proName);
  
  
      $.ajax({
        type:'get',
        url:'/product/queryProduct',
        data: {
          proName: proName||'',
          page:pageNum||1,
          pageSize: 6,
          price: price||null,
          num: num||2
        },
        success:function(data){
          console.log(data);
          var searchList = template('searchListTemplate',data);
          $(".search-result-list").html(searchList);
        }
      })
    }

