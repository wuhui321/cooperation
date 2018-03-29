require("../css/swiper-4.2.0.min.css");
require("../css/reset.css");
require("../css/animate.css");
require("../less/loading.less");
require("../less/style.less");
require("../less/page-2.less");
require("../less/page-3.less");
const Swiper = require("../scripts/lib/swiper-4.2.0.min");
const IScroll = require("../scripts/lib/iscroll");
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
// LOAD_IMG = LOAD_IMG.concat(frame_start);

var u = navigator.userAgent,
    isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
    isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    isWeixinBrowser = (/micromessenger/i).test(navigator.userAgent),
    webHandle,
    minX;;

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
                                $("#text1").removeClass("hide");
                                // $("#linkBtn").one("click", (e) => {
                                //     e.stopPropagation();
                                //     _czc.push(["_trackEvent", "用户", "分享"]);
                                //     setTimeout(() => {
                                //         window.open("http://wx2.ismartgo.com/wxgame/game/gerberapr1173/shakeAndRemind.do");
                                //     }, 500);
                                // });
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
            // $("#leftBtn").on("click", (e) => {
            //     e.stopPropagation();
            //     console.log('left');
            //     this.scrollObj.scrollBy(5, 0);
            // });

            // $("#rightBtn").on("click", (e) => {
            //     e.stopPropagation();
            //     console.log('right');
            //     this.scrollObj.scrollBy(-5, 0);
            // });

            $("#leftBtn, #rightBtn").on("webkitAnimationEnd", function() {
                $(this).addClass("hide");
            });

            $("#point1, #point2, #point3").one("click", function(e) {
                e.stopPropagation();

                $("#pointBox").removeClass("hide");
                $("#arWrapper").addClass("animated timing zoomOutBig");
                $(".point-" + self.curPoint + "-box").removeClass("hide");
                $(this).hide().remove();

                if (self.curPoint >= 3) {
                    webHandle.swiper.swiperObj.slideNext();
                }
            });

            $("#backBtn").on("click", () => {
                if (self.curPoint >= 3) {
                    $("#page2").addClass("hide");
                    $(".step-1").removeClass("hide");

                    webHandle.pixiAni.start();
                }
                $("#point" + (self.curPoint + 1)).removeClass("hide");
                $("#arWrapper").removeClass(" animated timing zoomOutBig");
                $("#pointBox").addClass("hide");
                self.curPoint++;

            });
        },
        loadFruitsImg() {
            webHandle.load.start(FRAME_IMG, () => {
                webHandle.pixiAni.init();
            });
        },
        init() {
            this.scrollObj = new IScroll("#arWrapper", {
                fixedScrollbar: true,
                bounce: false
            });
            this.scrollObj.scrollTo(-400, 0);
            // this.scrollObj.on('scrollStart', function() {
            //     minX = this.x; // console.log(this);
            // });
            // this.scrollObj.on('scroll', function() {
            //     minX = minX < this.x ? minX : this.x; // console.log(this);
            // });
            // this.scrollObj.on('scrollEnd', function() {
            //     minX = minX < this.x ? minX : this.x; //
            //     if (this.x - minX > 10 && (this.directionX === 1)) { //加载
            //     }
            // });
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
            setInterval(function() {
                if (self.flag && self.flag === 'start') {
                    if (self.imgCount < FRAME_IMG.length - 1) {
                        self.aniSprite.texture = self.startTexture[self.imgCount];
                        console.log(self.imgCount);
                        self.imgCount++;
                    } else {
                        self.imgCount = 0;
                        self.flag = "end";

                        $(".step-1").addClass("hide").remove();
                        $(".step-2").removeClass("hide");
                    }
                }
            }, 60);
            setTimeout(() => {
                this.flag = "start";
            }, 300);
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
    init() {
        this.load.start(LOAD_IMG, () => {
            $("#loadingBox").hide().remove();
            this.swiper.init();
        });

        $("#pageOneBtn").one("click", (e) => {
            e.stopPropagation();
            webHandle.page2.show();
        });
    }
};

webHandle.init();