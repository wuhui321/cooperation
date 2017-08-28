require("./../css/swiper-3.3.1.min.css");
require("../css/reset.css");
require("../css/animate.css");
require("../less/style.less");
require("./lib/swiper-3.3.1.min.js");
require("pixi.js");
require("./lib/sharewx.js");

const LOAD_IMG = [
    require("../assets/images/content/back.png"),
    require("../assets/images/content/m-close.png"),
    require("../assets/images/content/m-open.png"),
    // page-1
    require("../assets/images/content/page1/bg.jpg"),
    require("../assets/images/content/page1/btns.png"),
    require("../assets/images/content/page1/c1.png"),
    require("../assets/images/content/page1/c2.png"),
    require("../assets/images/content/page1/c3.png"),
    require("../assets/images/content/page1/human.png"),
    require("../assets/images/content/page1/slogan.png"),
    require("../assets/images/content/page1/title.png"),
    // -----end-----
    // page-2
    require("../assets/images/content/page2/bg.jpg"),
    require("../assets/images/content/page2/beiyou.png"),
    require("../assets/images/content/page2/chuanda.png"),
    require("../assets/images/content/page2/huake.png"),
    require("../assets/images/content/page2/qinghua.png"),
    require("../assets/images/content/page2/shangjiao.png"),
    // -----end-----
    // page-3
    require("../assets/images/content/page3/bg.jpg"),
    require("../assets/images/content/page3/s1.png"),
    require("../assets/images/content/page3/t1.png"),
    require("../assets/images/content/page3/t2.png"),
    require("../assets/images/content/page3/t3.png"),
    // -----end-----
    // page-4
    require("../assets/images/content/page4/bg.jpg"), //23
    require("../assets/images/content/page4/b-left.png"),
    require("../assets/images/content/page4/b-right.png"),
    require("../assets/images/content/page4/path.png"),
    require("../assets/images/content/page4/p-1.png"),
    require("../assets/images/content/page4/p-2.png"),
    require("../assets/images/content/page4/p-3.png"),
    require("../assets/images/content/page4/p-4.png"),
    require("../assets/images/content/page4/p-5.png"),
    require("../assets/images/content/page4/p-6.png"),
    // -----end-----
    // page-5
    require("../assets/images/content/page5/bg.jpg"),
    require("../assets/images/content/page5/qr-code.png"),
    require("../assets/images/content/page5/rocket.png"),
    // -----end-----
    // add page-3 
    require("../assets/images/content/page3/s2.png"),
    require("../assets/images/content/page3/s3.png"),
    require("../assets/images/content/page3/s4.png"),
    require("../assets/images/content/page3/b1.png"),
    require("../assets/images/content/page3/b2.png"),
    require("../assets/images/content/page3/b3.png")
];

let webHandle = {
    video: {
        $box: null,
        player: null,
        event: {
            play(player) {
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
                webHandle.canvasAni.init();
            },
            end(player) {
                let self = this;
                webHandle.video.$box.hide().remove();
                webHandle.audio.init();
                $("#content-page-1").show();
                console.log('play end');
            }
        },
        setVideoSize() {
            let self = this;
            let wHeight = document.documentElement.offsetHeight,
                wWidth = document.documentElement.offsetWidth,
                pHeight = wWidth * 1334 / 750;
            $(self.player).css({
                'height': pHeight,
                'margin-top': parseInt(wHeight - pHeight) / 2
            });
        },
        init() {
            let self = this;
            self.$box = $("#videoPage");
            self.player = $("#videoPlayer").get(0);
            self.setVideoSize();

            self.$box.one('click', (e) => {
                self.event.play(self.player);
            });
            document.addEventListener("WeixinJSBridgeReady", function() {
                setTimeout(function() {
                    self.event.play(self.player);
                }, 500);
            }, false);
        }
    },
    content: {
        dom: '.swiper-container',
        swiper: null,
        aniPage: ['content-page-1', 'content-page-2', 'content-page-3', 'content-page-4', 'content-page-5'],
        event: {
            toPage(swiper, pIndex) {
                let self = this,
                    s = swiper || self.swiper,
                    i = pIndex || 0;
                s.slideTo(i, 0);
            },
            toDetail(swiper) {
                let a = ['btnMap', 'btnPlan', 'btnTimeLine', 'btnNote', 'btnUrl'],
                    self = this,
                    s = swiper || webHandle.content.swiper;
                for (let i = 0; i < a.length; i++) {
                    $("#" + a[i]).on('click', () => {
                        if (i === a.length - 1) {
                            window.location.href = "https://m.dajie.com/ats/show/jobsListPage/6695127";
                        } else {
                            self.toPage(s, i + 1);
                        }
                    });
                }
            }
        },
        cleanAnimation() {
            let self = this,
                aniPage = self.aniPage;
            for (let i = 0; i < aniPage.length; i++) {
                $("#" + aniPage[i]).hide();
            }
            // $(".flow-part").hide();
            webHandle.canvasAni.bicycleSpri.x = 340;
            webHandle.canvasAni.bicycleSpri.y = 480;
            webHandle.canvasAni.bicycleSpri.alpha = 0;
            webHandle.canvasAni.currentStep = 1;
        },
        startAnimation(pIndex) {
            let self = this,
                aniPage = self.aniPage;
            $("#" + aniPage[pIndex]).show();
        },
        init() {
            let self = this,
                event = self.event;
            this.swiper = new Swiper(self.dom, {
                direction: 'vertical',
                initialSlide: 0,
                speed: 500,
                effect: 'fade',
                fade: {
                    crossFade: false,
                },
                noSwiping: true,
                onSlideChangeEnd(s) {
                    self.cleanAnimation();
                    self.startAnimation(s.activeIndex);
                    $("#audioTool").show();
                    if (s.activeIndex === 4) {
                        $("#audioTool").hide();
                    }
                },
                onInit(s) {
                    event.toDetail(s);
                    $(".back-btn").on("click", () => {
                        event.toPage(s, 0);
                    });
                }
            });
        }
    },
    audio: {
        player: null,
        $box: null,
        event: {
            play(player) {
                let $box = webHandle.audio.$box;
                // if (player.paused) {
                //     player.play();
                //     $box.removeClass("audio-close-icon").addClass("audio-open-icon");
                //     $box.attr('flag', 'open');
                // }
                player.play();
                $box.removeClass("audio-close-icon").addClass("audio-open-icon");
                $box.attr('flag', 'open');
            },
            stop(player) {
                let $box = webHandle.audio.$box;
                // if (!player.paused) {
                //     player.pause();
                //     $box.removeClass("audio-open-icon").addClass("audio-close-icon");
                //     $box.attr('flag', 'close');
                // }
                player.pause();
                $box.removeClass("audio-open-icon").addClass("audio-close-icon");
                $box.attr('flag', 'close');
            }
        },
        init() {
            let self = this;
            self.player = $("#audioPlayer").get(0);
            self.$box = $("#audioTool");
            self.$box.on('click', (e) => {
                let flag = self.$box.attr("flag");
                console.log('init click event');
                if (flag === "close") {
                    self.event.play(self.player);
                } else {
                    self.event.stop(self.player);
                }
            });
            self.event.play(self.player);
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
        start() {
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
        end() {
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
                    $("#content-page-1").show();
                }, 3000);
            }
        },
        animate() {
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
        init() {
            let self = this;
            self.$dom = $("#loadingBox");
            self.$progressBar = $("#progressBar");
            self.start();
        }
    },
    canvasAni: {
        $dom: null,
        app: null,
        currentStep: 1,
        bicycleSpri: null,
        IMG_SOURCE: {
            BICYCLE_LEFT: LOAD_IMG[23],
            BICYCLE_RIGHT: LOAD_IMG[24],
            PATH: LOAD_IMG[25]
        },
        animateX(aniObj, direction, destination, step, callback) {
            switch (direction) {
                case 1:
                    aniObj.x += step;
                    if (aniObj.x >= destination) {
                        callback();
                    }
                    break;
                case -1:
                    aniObj.x -= step;
                    if (aniObj.x <= destination) {
                        callback();
                    }
                    break;
            }
        },
        animateY(aniObj, direction, destination, step, callback) {
            switch (direction) {
                case 1:
                    aniObj.y += step;
                    if (aniObj.y >= destination) {
                        callback();
                    }
                    break;
                case -1:
                    aniObj.y -= step;
                    if (aniObj.y <= destination) {
                        callback();
                    }
                    break;
            }
        },
        start() {
            let self = this,
                app = self.app,
                bicycle_spr,
                path_spr;
            const TEXTURE_IMG = {
                BICYCLE_LEFT: PIXI.Texture.fromImage(self.IMG_SOURCE.BICYCLE_LEFT),
                BICYCLE_RIGHT: PIXI.Texture.fromImage(self.IMG_SOURCE.BICYCLE_RIGHT),
                PATH: PIXI.Texture.fromImage(self.IMG_SOURCE.PATH)
            };
            path_spr = new PIXI.Sprite(TEXTURE_IMG.PATH);
            path_spr.x = 0;
            path_spr.y = 0;

            bicycle_spr = this.bicycleSpri = new PIXI.Sprite(TEXTURE_IMG.BICYCLE_RIGHT);
            bicycle_spr.x = 340;
            bicycle_spr.y = 480;
            bicycle_spr.anchor.set(0.5, 1);
            bicycle_spr.alpha = 0;

            app.stage.addChild(path_spr);
            app.stage.addChild(bicycle_spr);

            // self.$dom.on('webkitAnimationEnd', (e) => {
            //     let step = 1;
            //     bicycle_spr.x = 340;
            //     bicycle_spr.y = 480;
            //     bicycle_spr.alpha = 1;
            //     app.ticker.add((delta) => {
            //         switch (self.currentStep) {
            //             case 1:
            //                 self.animateX(bicycle_spr, 1, 463, step, () => {
            //                     self.currentStep++;
            //                 });
            //                 break;
            //             case 2:
            //                 self.animateY(bicycle_spr, -1, 365, step, () => {
            //                     self.currentStep++;
            //                 });
            //                 break;
            //             case 3:
            //                 self.animateX(bicycle_spr, 1, 571, step, () => {
            //                     self.currentStep++;
            //                     // $("#flowPart_2").show();
            //                 });
            //                 break;
            //             case 4:
            //                 self.animateY(bicycle_spr, 1, 522, step, () => {
            //                     self.currentStep++;
            //                 });
            //                 break;
            //             case 5:
            //                 self.animateX(bicycle_spr, -1, 133, step, () => {
            //                     self.currentStep++;
            //                 });
            //                 break;
            //             case 6:
            //                 self.animateY(bicycle_spr, 1, 866, step, () => {
            //                     self.currentStep++;
            //                     // $("#flowPart_3").show();
            //                 });
            //                 break;
            //             case 7:
            //                 self.animateX(bicycle_spr, 1, 240, step, () => {
            //                     self.currentStep++;
            //                 });
            //                 break;
            //             case 8:
            //                 self.animateY(bicycle_spr, -1, 574, step, () => {
            //                     self.currentStep++;
            //                 });
            //                 break;
            //             case 9:
            //                 self.animateX(bicycle_spr, 1, 629, step, () => {
            //                     self.currentStep++;
            //                     // $("#flowPart_4").show();
            //                 });
            //                 break;
            //             case 10:
            //                 self.animateY(bicycle_spr, 1, 948, step, () => {
            //                     self.currentStep++;
            //                 });
            //                 break;
            //             case 11:
            //                 self.animateX(bicycle_spr, -1, 489, step, () => {
            //                     self.currentStep++;
            //                 });
            //                 break;
            //             case 12:
            //                 self.animateY(bicycle_spr, -1, 668, step, () => {
            //                     self.currentStep++;
            //                     // $("#flowPart_5").show();
            //                 });
            //                 break;
            //             case 13:
            //                 self.animateX(bicycle_spr, -1, 350, step, () => {
            //                     self.currentStep++;
            //                 });
            //                 break;
            //             case 14:
            //                 self.animateY(bicycle_spr, 1, 805, step, () => {
            //                     self.currentStep++;
            //                     // $("#flowPart_6").show();
            //                     bicycle_spr.alpha = 0;
            //                 });
            //                 break;
            //         }
            //     });
            // });
        },
        destroy() {
            let self = this;
            self.app = null;
        },
        init() {
            let self = this;
            self.app = new PIXI.Application(750, 1211, {
                transparent: true,
                antialias: true
            });
            self.$dom = $("#canvasBox").html(self.app.view);
            self.start();
        }
    },
    init() {
        let self = this;
        // self.video.init();
        self.load.init();
        self.audio.init();
        self.content.init();
        self.canvasAni.init();
    }
};
webHandle.init();