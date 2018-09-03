var LOAD_IMG = [
    "../images/page1/baby.png",
    "../images/page1/bg.jpg",
    "../images/page1/bowl.png",
    "../images/page1/glass.png",
    "../images/page1/hint.png",
    "../images/page1/star-1.png",
    "../images/page1/star-2.png",
    "../images/page1/title.png",
    "../images/page1/logo.png",
    "../images/page2/left-btn.png",
    "../images/page2/right-btn.png",
    "../images/page2/back-btn.png",
    "../images/page2/next-btn.png",
    "../images/page2/point-1-bg.jpg",
    "../images/page2/point-1-text-1.png",
    "../images/page2/point-1-text-2.png",
    "../images/page2/point-1.png",
    "../images/page2/point-2-bg.jpg",
    "../images/page2/point-2-text-1.png",
    "../images/page2/point-2-text-2.png",
    "../images/page2/point-2.png",
    "../images/page2/point-3-bg.jpg",
    "../images/page2/point-3-text.png",
    "../images/page2/point-3.png",
    "../images/page2/text.png"
];
// LOAD_IMG = LOAD_IMG.concat(frame_start);

var u = navigator.userAgent,
    isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
    isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    isWeixinBrowser = (/micromessenger/i).test(navigator.userAgent),
    webHandle;

webHandle = {
    loadService: {
        loadNum: 0,
        load: function(imgList, callback) {
            if (!Array.isArray(imgList)) {
                return;
            }
            var s,
                self = this;
            for (var i = 0; i < imgList.length; i++) {
                s = new Image();
                s.src = imgList[i];
                s.onload = function() {
                    self.loadNum++;
                    console.log(self.loadNum);
                    self.end(callback);
                }
            }
        },
        end: function(callback, loadProcess) {
            var self = this;
            if (self.loadNum < LOAD_IMG.length) {
                loadProcess && loadProcess();
            } else {
                callback && callback();
            }
        }
    },
    swiper: {
        swiperObj: null,
        init: function() {
            var self = this;
            self.swiperObj = new Swiper(".swiper-container", {
                direction: 'vertical',
                effect: 'fade',
                fadeEffect: {
                    crossFade: false,
                },
                noSwiping: true,
                noSwipingClass: 'stop-swiping',
                on: {
                    slideChangeTransitionEnd: function() {
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
            console.log(self.swiperObj);
        }
    },
    page2: {
        scrollObj: null,
        show: function() {
            $("#page2, #leftBtn, #rightBtn").removeClass("hide");
        },
        init: function() {
            this.scrollObj = new IScroll("#arWrapper", {
                fixedScrollbar: true,
                bounce: false
            });
            $("#page2Text").removeClass("hide");
            $("#page2Text").addClass("animated fillMode fadeOut").on("webkitAnimationEnd", function() {
                console.log("end");
                $("#page2Text").hide().remove();
            });
        }
    },
    init() {
        var self = this;
        self.loadService.load(LOAD_IMG, function() {
            $("#loadingBox").hide().remove();
            self.swiper.init();
        });

        // $("#leftBtn").on("click", function(e) {
        //     e.stopPropagation();
        //     console.log('left');
        //     // this.scrollObj.scrollBy(1, 0);
        // });

        // $("#rightBtn").on("click", function(e) {
        //     e.stopPropagation();
        //     console.log('right');
        //     // this.scrollObj.scrollBy(-1, 0);
        // });

        // $("#pageOneBtn").one("click", function(e) {
        //     // this.swiperObj.slideTo(1, 0);
        //     e.stopPropagation();
        //     webHandle.page2.show();
        // });

        // $("#point1, #point2, #point3").one("click", function(e) {
        //     e.stopPropagation();
        //     alert("point-1");
        // });
    }
};

webHandle.init();