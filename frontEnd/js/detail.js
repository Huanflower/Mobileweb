$(function(){

  getDetailData();
})

var getDetailData = function(){
  // id
  var url = new URLSearchParams(location.search);
  var id = url.get('id');

  $.ajax({
    type:'get',
    url:'/product/queryProductDetail',
    data:{
      id:id
    },
    success:function(data){
        // console.log(data);
        var detail = template('detailTemplate',data);
        $('.lt-detail').html(detail);

        // 鞋码要处理 35-56
        var size = data.size;
        // console.log(size);
        var first = size.slice(0,2);
        var second = size.slice(3,5);
        // console.log(second);
        var obj = {
            arr:[first,second]
        };
        var sizeList = template('sizeTemplate',obj);
        // console.log(sizeList);
        $('.detail-size').append(sizeList);
        // console.log(obj.arr);
    }
  })
}
