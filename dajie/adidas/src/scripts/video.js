require("../css/reset.css");
require("../css/animate.css");
require("../less/adidasAni.less");
require("../less/style.less");
// require("./lib/sharewx.js");
var LOAD_IMG = [
    // require("../assets/images/video/"),
    // video
    "https://ks3-cn-beijing.ksyun.com/static.toptest.yidianzixun.com/public/file/1505200196927/poster.jpg",
    require("../assets/images/video/hint.png"),
    require("../assets/images/video/poster.jpg"),
    // loading
    require("../assets/images/loading/bg.jpg"),
    require("../assets/images/loading/adidas_logo.png"),
    require("../assets/images/loading/dajie_logo.png"),
    require("../assets/images/loading/shoes_1.png"),
    require("../assets/images/loading/shoes_2.png"),
    require("../assets/images/loading/shoes_3.png"),
    require("../assets/images/loading/shoes_4.png"),
    // content
    require("../assets/images/content/adidas_logo.png"),
    require("../assets/images/content/bg.jpg"),
    require("../assets/images/content/brick_close.jpg"),
    require("../assets/images/content/brick_open.jpg"),
    require("../assets/images/content/m_open.png"),
    require("../assets/images/content/share_close.png"),
    require("../assets/images/content/share_hint.png"),
    require("../assets/images/content/slogan.png"),
    require("../assets/images/content/text_1.png"),
    require("../assets/images/content/text_2.png"),
    require("../assets/images/content/text_3.png"),
    require("../assets/images/content/title.png"),
    // 序列帧
];
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
var isWeixinBrowser = (/micromessenger/i).test(navigator.userAgent);
var webHandle = {
    video: {
        $box: null,
        player: null,
        event: {
            play: function(player) {
                let self = this;
                if (player.paused) {
                    player.play();
                }
                player.addEventListener('ended', () => {
                    self.end();
                });
                player.addEventListener('x5videoexitfullscreen', () => {
                    self.end();
                });
            },
            end: function(player) {
                console.log("video play end");
                var $shareHintBtn = $("#shareHintBtn"),
                    $shareHintPage = $("#shareHintPage"),
                    $closeHintBtn = $("#closeHintBtn");
                webHandle.video.$box.hide().remove();
                $("#animationBox").show();
                $shareHintBtn.on("click", function(e) {
                    e.stopPropagation();
                    $shareHintPage.show();
                    $closeHintBtn.on("click", function(e) {
                        e.stopPropagation();
                        $shareHintPage.hide();
                    });
                });
                $("#pageText3").on("webkitAnimationEnd", function() {
                    // $("#pageText1, #pageText2, #pageText3").removeClass("scaleAni").addClass("infinite shake");
                    $("#pageText1, #pageText2, #pageText3").removeClass("scaleAni").addClass("aniCount shakeAni");
                });
            }
        },
        setVideoSize: function() {
            let self = this;
            let wHeight = document.documentElement.offsetHeight,
                wWidth = document.documentElement.offsetWidth,
                pHeight = wWidth * 852 / 480;
            $(self.player).css({
                'height': pHeight,
                // 'margin-top': parseInt(wHeight - pHeight) / 2
            });
        },
        init: function() {
            let self = this;
            self.$box = $("#videoPage");
            self.player = $("#videoPlayer").get(0);
            self.setVideoSize();

            $("#videoClick").one('touchend', function() {
                $(this).hide();
                setTimeout(function() {
                    self.event.play(self.player);
                }, 100);
            });
            $(".skip-btn").one('touchend', function(e) {
                e.stopPropagation();
                self.event.end();
            });
            // document.addEventListener("WeixinJSBridgeReady", function() {
            //     setTimeout(function() {
            //         self.event.play(self.player);
            //     }, 500);
            // }, false);
        }
    },

    load: {
        loadNum: 0,
        $dom: null,
        $progressText: null,
        start: function() {
            let s,
                self = this;
            for (let i = 0; i < LOAD_IMG.length; i++) {
                s = new Image();
                s.src = LOAD_IMG[i];
                s.onload = function() {
                    self.loadNum++;
                    self.end();
                }
            }
        },
        end: function() {
            let self = this;
            if (self.loadNum < LOAD_IMG.length) {
                self.animate();
            } else {
                setTimeout(() => {
                    self.$progressText.text("100%");
                    self.$dom.hide().remove();
                    webHandle.video.$box.css({
                        "opacity": 1
                    });
                }, 500);
            }
        },
        animate: function() {
            let self = this,
                imgCount = LOAD_IMG.length,
                proPercent = parseInt((self.loadNum) / imgCount * 100) + "%";
            setTimeout(() => {
                self.$progressText.text(proPercent);
            }, 500);
        },
        init: function() {
            let self = this;
            self.$dom = $("#loadingBox");
            self.$progressText = $("#progressText");

            self.start();
        }
    },

    init() {
        let self = this;
        self.load.init();
        // if (isAndroid || (isiOS && !isWeixinBrowser)) {
        //     $("#videoClick").show();
        // }
        $("#videoClick").show();
        self.video.init();
    }
};
webHandle.init();