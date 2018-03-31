require("../css/swiper-4.2.0.min.css");
require("../css/reset.css");
require("../css/animate.css");
require("../less/loading.less");
require("../less/style.less");
require("../less/page-2.less");
require("../less/page-3.less");
const Swiper = require("../scripts/lib/swiper-4.2.0.min");
require("pixi.js");

var FRAME_IMG = [];
for (var i = 0; i < 38; i++) {
    FRAME_IMG.push(require("../assets/images/fruits/img" + i + ".png"));
}

const LOAD_IMG = [
    require("../assets/images/page1/baby.png"),
    require("../assets/images/page1/bg.jpg"),
    require("../assets/images/page1/bowl.png"),
    require("../assets/images/page1/glass.png"),
    require("../assets/images/page1/hint.png"),
    require("../assets/images/page1/star-1.png"),
    require("../assets/images/page1/star-2.png"),
    require("../assets/images/page1/title.png"),
    require("../assets/images/page1/logo.png"),
    require("../assets/images/page2/left-btn.png"),
    require("../assets/images/page2/right-btn.png"),
    require("../assets/images/page2/back-btn.png"),
    require("../assets/images/page2/next-btn.png"),
    require("../assets/images/page2/point-1-bg.jpg"),
    require("../assets/images/page2/point-1-text-1.png"),
    require("../assets/images/page2/point-1-text-2.png"),
    require("../assets/images/page2/point-1.png"),
    require("../assets/images/page2/point-2-bg.jpg"),
    require("../assets/images/page2/point-2-text-1.png"),
    require("../assets/images/page2/point-2-text-2.png"),
    require("../assets/images/page2/point-2.png"),
    require("../assets/images/page2/point-3-bg.jpg"),
    require("../assets/images/page2/point-3-text.png"),
    require("../assets/images/page2/point-3.png"),
    require("../assets/images/page2/text.png")
];
FRAME_IMG = FRAME_IMG.concat([
    require("../assets/images/page3/bg.jpg"),
    require("../assets/images/page3/btn.png"),
    require("../assets/images/page3/text-1.png"),
    require("../assets/images/page3/text-2-1.png"),
    require("../assets/images/page3/text-2-2.png")
]);

var u = navigator.userAgent,
    isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
    isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    isWeixinBrowser = (/micromessenger/i).test(navigator.userAgent),
    webHandle,
    minX,
    timefragment = 0, // 时间片计时
    nowts = 0; // 当前时间;

webHandle = {
    load: {
        loadNum: 0,
        start(imgList, callback) {
            if (!Array.isArray(imgList)) {
                return;
            }
            this.loadNum = 0;
            let s,
                self = this;
            for (let i = 0; i < imgList.length; i++) {
                s = new Image();
                s.src = imgList[i];
                s.onload = function() {
                    self.loadNum++;
                    self.end(callback);
                }
            }
        },
        end(callback, loadProcess) {
            let self = this;
            if (self.loadNum < LOAD_IMG.length) {
                loadProcess && loadProcess();
            } else {
                callback && callback();
            }
        },
    },
    swiper: {
        swiperObj: null,
        init() {
            let self = this;
            this.swiperObj = new Swiper(".swiper-container", {
                direction: 'vertical',
                effect: 'fade',
                fadeEffect: {
                    crossFade: false,
                },
                noSwiping: true,
                noSwipingClass: 'stop-swiping',
                on: {
                    slideChangeTransitionEnd() {
                        switch (this.activeIndex) {
                            case 0:
                                break;
                            case 1:
                                break;
                        }
                    }
                }
            });
        }
    },
    page2: {
        scrollObj: null,
        curPoint: 1,
        show() {
            let self = this;
            this.init();
            $("#page2, #leftBtn, #rightBtn").removeClass("hide");
            $("#arWrapper").scrollLeft(700);
            self.deviceService();

            $("#point1, #point2, #point3").one("click", function(e) {
                console.log("point1");
                e.stopPropagation();
                $("#page2Text").addClass("block");
                $("#pointBox").removeClass("hide");
                $("#arWrapper").addClass("animated timing zoomOutBig");
                $(".point-" + self.curPoint + "-box").removeClass("hide");
                $(this).hide().remove();

                if (self.curPoint >= 3) {
                    webHandle.swiper.swiperObj.slideNext();
                    $("#backBtn").hide();
                    $("#nextBtn").show();
                }
            });

            $("#backBtn, #nextBtn").on("click", () => {
                if (self.curPoint >= 3) {
                    $("#page2").addClass("hide").remove();
                    $(".step-1").removeClass("hide");

                    webHandle.pixiAni.start();
                }
                $("#page2Text").removeClass("block");
                $("#point" + (self.curPoint + 1)).removeClass("hide");
                $("#arWrapper").removeClass(" animated timing zoomOutBig");
                $("#pointBox").addClass("hide");
                if (self.curPoint >= 3) {
                    $("#pointBox").remove();
                }

                self.curPoint++;

                switch (self.curPoint) {
                    case 2:
                        $("#leftBtn").removeClass("hide");
                        break;
                    case 3:
                        $("#rightBtn").removeClass("hide");
                        break;
                }
            });
        },
        deviceService() {
            window.addEventListener('deviceorientation', function(evt) {
                nowts = new Date().getTime();
                if (nowts - timefragment > 37) {
                    timefragment = nowts;
                    var alpha = evt.alpha, //垂直于屏幕的轴 0 ~ 360
                        beta = evt.beta, //横向 X 轴 -180 ~ 180
                        gamma = evt.gamma; //纵向 Y 轴 -90 ~ 90

                    var left = $("#arWrapper").scrollLeft();

                    var _left;
                    _left = left + (gamma / 90 * 30);

                    console.log(gamma);

                    $("#arWrapper").scrollLeft(_left);
                }
            }, false);
        },
        loadFruitsImg() {
            webHandle.load.start(FRAME_IMG, () => {
                webHandle.pixiAni.init();
            });
        },
        init() {
            $("#page2Text").removeClass("hide");
            $("#page2Text").addClass("animated fillMode fadeOut").on("webkitAnimationEnd", () => {
                $("#page2Text").hide().remove();
            });

            this.loadFruitsImg();
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
        start() {
            var self = this,
                aniApp = self.aniApp;

            FRAME_IMG.forEach(function(item) {
                var tmp = PIXI.Texture.fromImage(item);
                self.startTexture.push(tmp);
            });

            self.aniSprite = new PIXI.Sprite(self.startTexture[0]);
            aniApp.stage.addChild(self.aniSprite);
            aniApp.renderer.render(self.aniSprite);
            let loopFlag = setInterval(function() {
                if (self.flag && self.flag === 'start') {
                    if (self.imgCount < 38) {
                        self.aniSprite.texture = self.startTexture[self.imgCount];
                        self.imgCount++;
                        if (self.imgCount == 5) {
                            self.textAni();
                        }
                    } else {
                        self.flag = "end";
                        clearInterval(loopFlag);
                    }
                }
            }, 60);
            setTimeout(() => {
                this.flag = "start";
            }, 300);
        },
        textAni() {
            $("#text1").removeClass("hide").on("webkitAnimationEnd", () => {
                $(".step-1").addClass("animated timing fillMode delay-1 fadeOut");
                $(".step-1").on("webkitAnimationEnd", function() {
                    setTimeout(() => {
                        $(".step-2").removeClass("hide");
                    }, 1500);
                });
            });
        },
        init() {
            var self = this,
                $DOM,
                aniApp;
            $DOM = self.$DOM = $("#fruits");
            aniApp = self.aniApp = new PIXI.Application(640, 1008, { transparent: true, antialias: true });
            $DOM.html(aniApp.view);
        }
    },
    audioService: {
        $DOM: null,
        $player: null,
        play(player) {
            let $box = this.$DOM;

            player.play();
            $box.removeClass("audio-close-icon").addClass("audio-open-icon");
            $box.attr('flag', 'open');
        },
        pause(player) {
            let $box = this.$DOM;
            player.pause();
            $box.removeClass("audio-open-icon").addClass("audio-close-icon");
            $box.attr('flag', 'close');
        },
        init() {
            let self = this;
            self.$player = $("#audioPlayer").get(0);
            self.$DOM = $("#audioBtn");

            self.$DOM.on("click", (e) => {
                let flag = self.$DOM.attr("flag");
                if (flag === "close") {
                    self.play(self.$player);
                } else {
                    self.pause(self.$player);
                }
            });
            self.play(self.$player);
            document.addEventListener("WeixinJSBridgeReady", () => {
                setTimeout(() => {
                    self.play(self.$player);
                }, 500);
            }, false);
        }
    },
    init() {
        this.load.start(LOAD_IMG, () => {
            $("#loadingBox").hide().remove();
            this.swiper.init();
        });

        this.audioService.init();

        $("#pageOneBtn").one("click", (e) => {
            e.stopPropagation();

            webHandle.page2.show();
            $(".page-1").html("");
        });

        $("#leftBtn, #rightBtn").on("webkitAnimationEnd", function() {
            $(this).addClass("hide");
        });
    }
};

webHandle.init();