jQuery(document).ready(function() {
    //页面中引入 <script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    //页面中引入<script src="http://special.dajie.com/html/djappshare/dajieWebViewBridge.js"></script>
    //再把当前文件引入 <script type="text/javascript" src="sharewx.js"></script>

    var descContent = "我潮流我自由我享受，我在阿迪等你一起freestyle！"; // 微信分享描述
    var shareTitle = '来阿迪，工作生活一起6，才是真正freestyle！'; // 微信分享标题
    // 微信分享图片
    var imgUrl = 'https://ks3-cn-beijing.ksyun.com/static.toptest.yidianzixun.com/public/file/1503672810390/share.jpg'; //图片路径

    if (imgUrl.indexOf(window.location.protocol) < 0) {
        if (imgUrl[0] == '.') {
            imgUrl = '/' + imgUrl;
        }
        imgUrl = window.location.protocol + '//' + window.location.host + imgUrl;
    }

    var localUrl = window.location.origin + window.location.pathname;
    var localSearch = window.location.search;

    // 微信分享网址
    // var message_link = localUrl + localSearch;
    var message_link = "https://company.dajie.com/nb/vsite/mobike_h5/video.html";

    dajieApp.set('shareOption', {
        "isShow": "true"
    });
    dajieApp.set('shareMessage', {
        "imgUrl": imgUrl,
        "title": shareTitle,
        "desc": descContent,
        "link": message_link
    });



    function load_wx_config(callback) {
        var url = encodeURIComponent(window.location.href);
        jQuery.ajax({
            type: "GET",
            dataType: "jsonp",
            url: "https://company.dajie.com/weixin/jssdk/config?url=" + url + "&callback=?",
            data: {},
            success: function(result) {
                if (result.code == 0) {
                    wx.error(function(res) {
                        alert("wx.error:" + res);
                    });
                    wx.config(jQuery.extend(result.data, {
                        debug: false
                    }));
                    callback && callback(result.data);
                }
            }
        });
    }

    function load_wx(config) {
        wx.ready(function() {
            wx.showOptionMenu();
            wx.onMenuShareAppMessage({
                title: shareTitle,
                desc: descContent,
                link: message_link,
                imgUrl: imgUrl,
                trigger: function(res) {},
                success: function(res) {},
                cancel: function(res) {},
                fail: function(res) {}
            });

            wx.onMenuShareTimeline({
                title: shareTitle,
                link: message_link,
                imgUrl: imgUrl,
                trigger: function(res) {},
                success: function(res) {},
                cancel: function(res) {},
                fail: function(res) {}
            });

            wx.onMenuShareQQ({
                title: shareTitle,
                desc: descContent,
                link: message_link,
                imgUrl: imgUrl,
                trigger: function(res) {},
                complete: function(res) {},
                success: function(res) {},
                cancel: function(res) {},
                fail: function(res) {}
            });

            wx.onMenuShareWeibo({
                title: shareTitle,
                desc: descContent,
                link: message_link,
                imgUrl: imgUrl,
                trigger: function(res) {},
                complete: function(res) {},
                success: function(res) {},
                cancel: function(res) {},
                fail: function(res) {}
            });
        });
    }

    load_wx_config(function() {
        load_wx();
    });

});