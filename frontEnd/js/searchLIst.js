$(function () {

    var flag = true;

    var judge = true;

    //    getSearchListData();

    // 下拉刷新
    mui.init({
        //必须在区域滚动的情况下才可以
        pullRefresh: {
            container: ".lt-search", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                style: 'circle', //必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                color: '#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
                height: '50px', //可选,默认50px.下拉刷新控件的高度,
                range: '100px', //可选 默认100px,控件可下拉拖拽的范围
                offset: '0px', //可选 默认0px,下拉刷新控件的起始位置
                auto: true, //可选,默认false.首次加载自动上拉刷新一次
                callback: function () {
                    getSearchListData();
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });


    // 排序
    // 价格排序
    $('.order-price').on('tap', function () {
        $('.search-result-order a').removeClass('active');
        $(this).addClass('active');
        // 降序

        if (flag == true) {
            // 升序
            getSearchListData(1, 1, 2);

            flag = false;
            $(this).find('i').addClass('fa-angle-up');
            $(this).find('i').removeClass('fa-angle-down');

        } else {
            // 降序
            getSearchListData(1, 2, 2);
            flag = true;
            $(this).find('i').addClass('fa-angle-down');
            $(this).find('i').removeClass('fa-angle-up');
        }
    })

    $('.order-stock').on('tap', function () {
        $('.search-result-order a').removeClass('active');
        $(this).addClass('active');
        //true 降序

        if (judge == true) {
            getSearchListData(1, null, 2);
            judge = false;
            $(this).find('i').addClass('fa-angle-up');
            $(this).find('i').removeClass('fa-angle-down');
        } else {
            getSearchListData(1, 2, 2);
            judge = true;
            $(this).find('i').addClass('fa-angle-down');
            $(this).find('i').removeClass('fa-angle-up');
        }
    })
})

// 点击进入商品详情页
$('.search-result-list').on('tap', 'button', function () {
    var id = $(this).data('id');
    // console.log(id);
    location.href = './detail.html?id=' + id;
})

// 获取搜索结果
var getSearchListData = function (pageNum, price, num) {

    //1、怎么获取到url呢？
    // console.log(location.href);
    //2、怎么获取url中的参数呢？
    //使用url de 一个内置对象
    var url = new URLSearchParams(location.search);

    var proName = url.get('proName');
    //  console.log(proName);


    $.ajax({
        type: 'get',
        url: '/product/queryProduct',
        data: {
            proName: proName || '',
            page: pageNum || 1,
            pageSize: 6,
            price: price || null,
            num: num || 2
        },
        success: function (data) {
            // console.log(data);
            var searchList = template('searchListTemplate', data);
            $('.search-result-list').html(searchList);
        }
    })
}