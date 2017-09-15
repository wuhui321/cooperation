require("../css/reset.css");
require("../css/animate.css");
require("../less/adidasAni.less");
require("../less/style.less");
require("pixi.js");
// require("./lib/sharewx.js");
var frame_start = [];
var frame_loop = [
    require("../assets/images/content/frame/loop/p0.jpg"),
    require("../assets/images/content/frame/loop/p1.jpg")
];
for (var i = 0; i < 48; i++) {
    frame_start.push(require("../assets/images/content/frame/start/x" + i + ".jpg"));
}
var LOAD_IMG = [
    // require("../assets/images/video/"),
    // video
    "https://ks3-cn-beijing.ksyun.com/static.toptest.yidianzixun.com/public/file/1505200196927/poster.jpg",
    require("../assets/images/video/hint.png"),
    require("../assets/images/video/poster.jpg"),
    require("../assets/images/video/hand.png"),
    require("../assets/images/video/circle-1.png"),
    require("../assets/images/video/circle-2.png"),
    require("../assets/images/video/circle-3.png"),
    require("../assets/images/video/skip.png"),
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
    require("../assets/images/content/frame/loop/p0.jpg"),
    require("../assets/images/content/frame/loop/p1.jpg")
];
LOAD_IMG = LOAD_IMG.concat(frame_start);

var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
var isWeixinBrowser = (/micromessenger/i).test(navigator.userAgent);
var webHandle = {
    skip: false,
    monitor: {
        MT: function() {
            var s = new Image();
            s.src = "https://track.dajie.com/CfHQssljRgT7M";
            s.onload = function() {
                window.location.href = "https://company.dajie.com/nb/vsite/adidas_2018/manage.html?id=2";
            }
            setTimeout(function() {
                window.location.href = "https://company.dajie.com/nb/vsite/adidas_2018/manage.html?id=2";
            }, 300);
        },
        register: function() {
            var s = new Image();
            s.src = "https://track.dajie.com/CTws1xZ7fPInZ";
            s.onload = function() {
                window.location.href = "https://company.dajie.com/nb/vsite/adidas_2018/enroll.html";
            }
            setTimeout(function() {
                window.location.href = "https://company.dajie.com/nb/vsite/adidas_2018/enroll.html";
            }, 300);
        }
    },
    pageHistory: {
        push: function(flag = "#played") {
            var state = {
                title: "title",
                url: "#"
            };
            window.history.pushState(state, "title", flag);
        }
    },
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
            end: function() {
                console.log("video play end");
                var $shareHintBtn = $("#shareHintBtn"),
                    $shareHintPage = $("#shareHintPage"),
                    $closeHintBtn = $("#closeHintBtn"),
                    $videoPage = $("#videoPage");
                if (!webHandle.skip) {
                    webHandle.video.$box.hide().remove();
                } else {
                    $videoPage.hide().remove();
                }
                // $("#animationBox").show();
                $shareHintBtn.on("click", function(e) {
                    e.stopPropagation();
                    $shareHintPage.show();
                    $closeHintBtn.on("click", function(e) {
                        e.stopPropagation();
                        $shareHintPage.hide();
                    });
                });
                $("#MT_Btn").on("click", function() {
                    if (webHandle.skip) {
                        webHandle.pageHistory.push("");
                    } else {
                        webHandle.pageHistory.push();
                    }
                    webHandle.monitor.MT();
                });
                $("#registBtn").on("click", function() {
                    if (webHandle.skip) {
                        webHandle.pageHistory.push("");
                    } else {
                        webHandle.pageHistory.push();
                    }
                    webHandle.monitor.register();
                });
                // webHandle.pixiAni.start();
                setTimeout(function() {
                    $("#adidasLogo, #pageText3").show();
                }, 300);
                $("#adidasLogo").on("webkitAnimationEnd", function() {
                    $("#pageText3").show();
                    webHandle.pixiAni.start();
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
                $(".skip-btn").show();
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
    pixiAni: {
        $DOM: null,
        aniApp: null,
        startTexture: [],
        loopTexture: [],
        flag: null,
        imgCount: 0,
        aniSprite: null,
        start: function() {
            var self = this,
                aniApp = self.aniApp;


            frame_start.forEach(function(item) {
                var tmp = PIXI.Texture.fromImage(item);
                self.startTexture.push(tmp);
            });
            frame_loop.forEach(function(item) {
                var tmp = PIXI.Texture.fromImage(item);
                self.loopTexture.push(tmp);
            });
            self.aniSprite = new PIXI.Sprite(self.startTexture[0]);
            aniApp.stage.addChild(self.aniSprite);
            aniApp.renderer.render(self.aniSprite);
            setInterval(function() {
                if (self.flag && self.flag === 'start') {
                    if (self.imgCount < frame_start.length - 1) {
                        self.aniSprite.texture = self.startTexture[self.imgCount];
                        // self.aniSprite.texture = PIXI.Texture.fromImage(frame_start[self.imgCount]);
                        // if (self.imgCount === 35) {
                        //     $("#adidasLogo, #pageText3").show();
                        // }
                        self.imgCount++;
                    } else {
                        self.imgCount = 0;
                        self.flag = "loop";
                    }
                }
                // else if (self.flag && self.flag === 'loop') {
                //     if (self.imgCount > frame_loop.length - 1) {
                //         self.imgCount = 0;
                //     }
                //     self.aniSprite.texture = self.loopTexture[self.imgCount];
                //     self.imgCount++;
                // }
            }, 100);
            setTimeout(function() {
                self.flag = "start";
            }, 300);
        },
        init: function() {
            var self = this,
                $DOM,
                aniApp;
            $DOM = self.$DOM = $("#brick");
            aniApp = self.aniApp = new PIXI.Application(640, 1136, { transparent: true, antialias: true });
            $DOM.html(aniApp.view);
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
                    setTimeout(function() {
                        self.$dom.hide().remove();
                        if (!webHandle.skip) {
                            webHandle.video.$box.css({
                                "opacity": 1
                            });
                        } else {
                            webHandle.video.event.end();
                        }
                    }, 1000);
                }, 5000);
            }
        },
        animate: function() {
            let self = this,
                imgCount = LOAD_IMG.length,
                proPercent = parseInt((self.loadNum) / imgCount * 100) + "%";
            setTimeout(() => {
                self.$progressText.text(proPercent);
            }, 2000);
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
        self.pixiAni.init();
        // if (isAndroid || (isiOS && !isWeixinBrowser)) {
        //     $("#videoClick").show();
        // }
        let urlHASH = window.location.hash;
        console.log(typeof window.location.hash);
        if (urlHASH === "#played") {
            self.skip = true;
        } else {
            $("#videoClick").show();
            self.video.init();
        }
    }
};
webHandle.init();