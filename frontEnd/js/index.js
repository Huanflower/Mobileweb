// mui框架内置了图片轮播插件，通过该插件封装的JS API，用户可以设定是否自动轮播及轮播周期
var gallery = mui('.mui-slider');
gallery.slider({
    interval: 3000//自动轮播周期，若为0则不自动播放，默认为0；
});

//用户不希望图片自动播放 手滑时播放可用
// var gallery = mui('.mui-slider');
// gallery.slider().gotoItem(index);//跳转到第index张图片，index从0开始；


// var myScroll = new IScroll('#wrapper');