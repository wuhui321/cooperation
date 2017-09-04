require("./lib/sharewx.js");
var LOAD_IMG = [
    "https://ks3-cn-beijing.ksyun.com/static.toptest.yidianzixun.com/public/file/1504524297458/slogan_dajie.png",
    "https://ks3-cn-beijing.ksyun.com/static.toptest.yidianzixun.com/public/file/1503926454869/logo.png",
    "https://ks3-cn-beijing.ksyun.com/static.toptest.yidianzixun.com/public/file/1503927473271/click.png",
    "https://ks3-cn-beijing.ksyun.com/static.toptest.yidianzixun.com/public/file/1504152382847/skip.png"
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
                window.location.href = "app.html";
            }
        },
        setVideoSize: function() {
            let self = this;
            let wHeight = document.documentElement.offsetHeight,
                wWidth = document.documentElement.offsetWidth,
                pHeight = wWidth * 1334 / 750;
            $(self.player).css({
                'height': pHeight,
                'margin-top': parseInt(wHeight - pHeight) / 2
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
            document.addEventListener("WeixinJSBridgeReady", function() {
                setTimeout(function() {
                    self.event.play(self.player);
                }, 500);
            }, false);
        }
    },

    load: {
        loadNum: 0,
        $dom: null,
        $progressBar: null,
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
                    self.$progressBar.css({
                        "webkitTransform": "translate3d(0, 0, 0)",
                        "transform": "translate3d(0, 0, 0);"
                    });
                    self.$dom.hide().remove();
                }, 3000);
            }
        },
        animate: function() {
            let self = this,
                imgCount = LOAD_IMG.length,
                proPercent = parseInt((imgCount - self.loadNum) / imgCount * 100) + "%";
            setTimeout(() => {
                self.$progressBar.css({
                    "webkitTransform": "translate3d(-" + proPercent + ", 0, 0)",
                    "transform": "translate3d(-" + proPercent + ", 0, 0);"
                });
            }, 2000);
        },
        init: function() {
            let self = this;
            self.$dom = $("#loadingBox");
            self.$progressBar = $("#progressBar");

            self.start();
        }
    },

    init() {
        let self = this;
        self.load.init();
        if (isAndroid || (isiOS && !isWeixinBrowser)) {
            $("#videoClick").show();
        }
        self.video.init();
    }
};
webHandle.init();