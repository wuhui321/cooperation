var handler,
    LOAD_IMG;

LOAD_IMG = [
    'image/music/open.png',
    'image/music/close.png',
    'image/page1/bg.jpg',
    'image/page1/slogan-1.png',
    'image/page1/slogan-2.png',
    'image/page1/title.png',
    'image/page2/bg.jpg',
    'image/page2/cloud.png',
    'image/page2/hand.png',
    'image/page2/star1.png',
    'image/page2/star2.png',
    'image/page2/star3.png',
    'image/page2/star4.png',
    'image/page2/text.png',
    'image/page2/title.png',
    'image/page3/bg.jpg',
    'image/page3/house.png',
    'image/page3/left-cloud.png',
    'image/page3/line-2.png',
    'image/page3/line.png',
    'image/page3/right-cloud.png',
    'image/page3/square.png',
    'image/page3/step1.png',
    'image/page3/step2.png',
    'image/page3/step3.png',
    'image/page3/text.png',
    'image/page3/title.png',
    'image/page4/book.png',
    'image/page4/slide-4.png',
    'image/page4/title.png',
    'image/page4/culture/p1.png',
    'image/page4/culture/p2.png',
    'image/page4/culture/p3.png',
    'image/page4/culture/p4.png',
    'image/page4/culture/p5.png',
    'image/page4/town/p1.png',
    'image/page4/town/p2.png',
    'image/page4/town/p3.png',
    'image/page4/town/p4.png',
    'image/page4/town/p5.png',
    'image/page4/travel/p1.png',
    'image/page4/travel/p2.png',
    'image/page4/travel/p3.png',
    'image/page4/travel/p4.png',
    'image/page4/travel/p5.png',
    'image/page5/bg.jpg',
    'image/page5/earth.png',
    'image/page5/left-cloud.png',
    'image/page5/line.png',
    'image/page5/right-cloud.png',
    'image/page5/square.png',
    'image/page5/title.png',
    'image/page5/tower.png',
    'image/page6/line.png',
    'image/page6/o1.png',
    'image/page6/o2.png',
    'image/page6/o3.png',
    'image/page6/point.png',
    'image/page6/text1.png',
    'image/page6/text2.png',
    'image/page6/text3.png',
    'image/page6/title.png',
    'image/page7/bg.jpg',
    'image/page7/point1.png',
    'image/page7/point2.png',
    'image/page7/point3.png',
    'image/page8/bg.jpg',
    'image/page8/line.png',
    'image/page8/title.png',
    'image/page8/workflow.png',
    'image/page9/line.png',
    'image/page9/list.png',
    'image/page9/title.png',
    'image/page10/circle.png',
    'image/page10/earth.png',
    'image/page10/erweima.png',
    'image/page10/slogan.png',
    'image/page10/title.png',
    'image/page11/bg.jpg',
    'image/page11/btn-guide1.png',
    'image/page11/btn-guide2.png',
    'image/page11/btn.png',
    'image/page11/earth.png',
    'image/page11/line.png',
    'image/page11/slogan.png',
    'image/page11/title.png',
    'image/star/star1.png',
    'image/star/star2.png',
    'image/star/star3.png',
    'image/star/star4.png',
    'image/bg.jpg',
    'image/logo.png',
    'image/next.png',
    'image/share.jpg',
];

handler = {
    loadService: {
        count: 0,
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
                    self.count++;
                    $(".plan").text(self.count);
                    self.end(callback);
                }
            }
        },
        end: function(callback, loadProcess) {
            var self = this;
            if (self.count < LOAD_IMG.length) {
                loadProcess && loadProcess();
            } else {
                callback && callback();
            }
        }
    },
    audio: {
        player: null,
        $box: null,
        event: {
            play: function(player) {
                var $box = handler.audio.$box;
                player.play();
                $box.removeClass("audio-close-icon").addClass("audio-open-icon");
                $box.attr('flag', 'open');
            },
            stop(player) {
                let $box = handler.audio.$box;
                player.pause();
                $box.removeClass("audio-open-icon").addClass("audio-close-icon");
                $box.attr('flag', 'close');
            }
        },
        init() {
            var self = this;
            self.player = $("#audioPlayer").get(0);
            self.$box = $("#audioTool");
            self.$box.on('click', function(e) {
                var flag = self.$box.attr("flag");
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
    s: {
        obj: null,
        // objV: null,
        btn: null,
        init: function() {
            var self = this;
            self.obj = new Swiper(".swiper-container-h", {
                direction: 'vertical',
                effect: 'fade',
                fadeEffect: {
                    crossFade: false,
                },
                noSwiping: true,
                on: {
                    slideChangeTransitionEnd: function() {
                        $(".page-common .element-box").hide();
                        var pre_dom = "#page" + (this.activeIndex) + " .element-box";
                        var cur_dom = "#page" + (this.activeIndex + 1) + " .element-box";
                        $(pre_dom).hide();
                        $(cur_dom).show();
                        switch (this.activeIndex) {
                            case 2:
                                $(".p-box").hide();
                                $("#page3 .step").one('click', function() {
                                    var f = $(this).data("flag");
                                    handler.s.btn = f;
                                    handler.s.obj.slideTo(3);
                                });
                                break;
                            case 3:
                                switch (handler.s.btn) {
                                    case "culture":
                                        $(".culture").show();
                                        var $culture_p5 = $('#culture-p5');
                                        $culture_p5.on('webkitAnimationEnd', function() {
                                            $(".town").show();
                                            var $town_p5 = $('#town_p5');
                                            $town_p5.on('webkitAnimationEnd', function() {
                                                $(".travel").show();
                                            });
                                        });
                                        break;
                                    case "travel":
                                        $(".travel").show();
                                        var $travel_p5 = $('#travel-p5');
                                        $travel_p5.on('webkitAnimationEnd', function() {
                                            $(".culture").show();
                                            var $culture_p5 = $('#culture-p5');
                                            $culture_p5.on('webkitAnimationEnd', function() {
                                                $(".town").show();
                                            });
                                        });
                                        break;
                                    case "town":
                                        $(".town").show();
                                        var $town_p5 = $('#town-p5');
                                        $town_p5.on('webkitAnimationEnd', function() {
                                            $(".culture").show();
                                            var $culture_p5 = $('#culture-p5');
                                            $culture_p5.on('webkitAnimationEnd', function() {
                                                $(".travel").show();
                                            });
                                        });
                                        break;
                                }

                                // if (!self.objV) {
                                //     self.objV = new Swiper(".swiper-container-v", {
                                //         pagination: {
                                //             el: '.swiper-pagination-v',
                                //             clickable: true,
                                //         }
                                //     });
                                // }
                                break;
                            case 4:
                                $(".p-box").hide();
                                break;
                        }
                    }
                }
            });
        }
    },
    init: function() {
        var self = this;
        self.loadService.load(LOAD_IMG, function() {
            $("#loadingBox").hide().remove();
            self.s.init();
            self.audio.init();
            setTimeout(function() {
                $("#page1 .element-box").show();
            }, 1000);
        });
    }
};

handler.init();