require("../css/swiper-4.2.0.min.css");
require("../css/reset.css");
require("../css/animate.css");
require("../less/loading.less");
require("../less/style.less");
require("../less/page-2.less");
require("../less/page-3.less");
const Swiper = require("../scripts/lib/swiper-4.2.0.min");
const IScroll = require("../scripts/lib/iscroll");
// require("pixi.js");
// var frame_start = [];
// for (var i = 0; i < 49; i++) {
//     frame_start.push(require("../assets/images/content/frame/start/x" + i + ".jpg"));
// }
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
    require("../assets/images/page2/right-btn.png")
];
// LOAD_IMG = LOAD_IMG.concat(frame_start);

var u = navigator.userAgent,
    isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
    isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    isWeixinBrowser = (/micromessenger/i).test(navigator.userAgent),
    webHandle;

webHandle = {
    load: {
        loadNum: 0,
        start(imgList, callback) {
            if (!Array.isArray(imgList)) {
                return;
            }
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
        event() {
            $("#pageOneBtn").on("click", () => {
                this.swiperObj.slideTo(1, 0);
            });
        },
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
                    init() {
                        self.event();
                    },
                    slideChangeTransitionEnd() {
                        switch (this.activeIndex) {
                            case 0:
                                break;
                            case 1:
                                $("#text1").removeClass("hide");
                                break;
                        }
                    }
                }
            });
        }
    },
    page2: {
        scrollObj: null,
        init() {
            this.scrollObj = new IScroll("#arWrapper");
            $("#leftBtn").on("click", () => {
                console.log('left');
                this.scrollObj.scrollBy(-10, 0);
            });
            $("#rightBtn").on("click", () => {
                console.log('right');
                this.scrollObj.scrollBy(10, 0);
            });
        }
    },
    init() {
        this.load.loadNum = LOAD_IMG.length;

        this.load.start(LOAD_IMG, () => {
            $("#loadingBox").hide().remove();
            this.swiper.init();
        });

        this.page2.init();
    }
};

webHandle.init();