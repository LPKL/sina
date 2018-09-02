/**
 * Created by Administrator on 2018/9/2.
 */
var $oul = $('.ulBox');
var $listBox = $('.listBox');
function bannerFn() {
    var mySwiper = new Swiper('.bannerBox', {
        autoplay: {
            //鼠标滑过之后是否继续autoplay
            disableOnInteraction: false,
            //在当前窗口的停留时间
            delay: 2000,
        },
        loop: true,//无缝滚动
        pagination: {//分页器
            el: '.pageBox',
            type: 'fraction',//分页器的类型
            currentClass: 'currentPage',//变动数字盒子的类名
            totalClass: 'totalPage'//总共数字的盒子类名
        }
    })
}
// 获取数据ajax
/*$.ajax({
 type:'get',//请求方式
 url:'data/banner.json',//请求路径
 data:{t:123,q:234},//发送给后台的数据
 success:function (d) {//成功后的回调函数
 giveHtml(d);//获取到数据，加载数据
 bannerFn();//等页面加载完了，载执行轮播图
 },
 error:function () {//失败后的回调函数

 }
 })*/
// 把数据转成页面可见的数据
function giveHtml(data) {
    data = data || [];
    var str = '';//用来处理拼接好的结构字符串
    data.forEach((item)=> {
        str += `  <li class="swiper-slide">
                    <a href="##">
                        <img src="${item.img}" alt="">
                        <div>${item.title}</div>
                    </a>
                </li>`
    })
    $oul.html(str);
}

//promise写法
var p = new Promise(function (resolve, reject) {
    $.ajax({
        type: 'get',
        url: 'data/banner.json',
        success: function (data) {
            resolve(data);
        },
        error: function (res) {
            reject(res);
        }
    })
});
p.then(function (data) {
    //第一个参数是promise执行的成功函数
    giveHtml(data);
    // bannerFn();//放到下面
    return data
}, function () {
    //第二个参数，promise执行失败的函数
    console.log('没拿到数据')
}).then(function (data) {//将成功的数据传过来
    bannerFn();
}, function () {

})

// 新闻列表
var listPro = new Promise(function (resolve, reject) {
    $.ajax({
        type: 'post',
        url: 'data/list.json',
        success: function (data) {
            resolve(data);
            console.log(data);

        },
        error: function (res) {
            reject(res)
        }
    })
});
listPro.then(function (data) {
    giveListHtml(data);
});
//把数据放到列表中
function giveListHtml(data) {
    data = data || [];
    var str = '';
    data.forEach((item)=> {
        switch (item.type) {
            case 0://无图结构
                str += ` <a href="##">
            <div class="text_box">
                <p>${item.title}</p>
                <div class="comment_box">
                    <em class="">
                        <span class="">${item.num}</span>
                        <span class="icon_com"></span>
                    </em>
                </div>
            </div>
        </a>`;
                break;
            case 1:
                str += `<a href="##">
            <div class="img_box">
                <img src="${item.img}" alt="">
            </div>
            <div class="text_box">
                <p>${item.title}</p>
                <div class="comment_box">
                    <em class="">
                        <span class="">${item.num}</span>
                        <span class="icon_com"></span>
                    </em>
                </div>
            </div>
        </a>`;
                break;
            case 3:
                str += `<a href="##" class="psp">
                   <p class="three_title">${item.title}</p>
                <div class="three_pic">
                <div><img src="${item.img[0]}" alt=""></div>
                <div><img src="${item.img[1]}" alt=""></div>
                <div><img src="${item.img[2]}" alt=""></div>
            </div>
            <div class="comment_box">
                <em class="">
                    <span class="">${item.num}</span>
                    <span class="icon_com"></span>
                </em>
            </div>
        </a>`
                break;
        }
    })
    $listBox.html(str);
}









