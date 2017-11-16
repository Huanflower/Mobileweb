$(function(){

   getDetailData();
})

var getDetailData = function () {
    var url = new URLSearchParams(location.search);
    var id = url.get('id');
    $.ajax({
        type: 'get',
        url: '/product/queryProductDetail',
        data: {
            id: id
        },
        success: function (data) {
            // console.log(data);
            var detail = template('datailTemplate',data);
            $('.lt-detail').html(detail);
        }
    })
}