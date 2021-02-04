

(function($) {
    'use strict';
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('body').addClass('mobile');
    }

    /* ------------------------------------------------------------------------ */
    /*  Init body backround type
    /* ------------------------------------------------------------------------ */
    function pageBackground() {
        var body = $('body');
        if (body.hasClass('image-background')) { // Image background
            $.backstretch(["images/backgrounds/bg-4.jpg"]); // Replace here Image Background
        } else if (body.hasClass('slideshow-background')) { // Slideshow background
            $.backstretch([
                "images/backgrounds/bg-3.jpg", // Add different images
                "images/backgrounds/bg-4.jpg",
                "images/backgrounds/bg-6.jpg",
                "images/backgrounds/bg-1.jpg",
                "images/backgrounds/bg-2.jpg"
            ], {
                duration: 3000,
                fade: 800
            });
        } else if (body.hasClass('video-youtube-background') || body.hasClass('video-youtube-list')) { // Video background
            if (!$('html').hasClass('touch') && !body.hasClass('mobile')) { // Detect mobile devices
                // Init YOUTUBE PLAYER
                var videoPlayer = $(".video-player");
                if (videoPlayer.length) {
                    if (body.hasClass('video-youtube-background')) { // Youtube SINGLE video
                        videoPlayer.each(function() {
                            $(this).mb_YTPlayer();
                        });
                    } else if (body.hasClass('video-youtube-list')) { // Youtube LIST video
                        var videos = [{
                            videoURL: "a-11dtG7aK4",
                            containment: 'body',
                            autoPlay: true,
                            mute: true,
                            startAt: 0,
                            opacity: 1,
                            loop: false,
                            ratio: "4/3",
                            addRaster: true
                        }, {
                            videoURL: "fpViZkhpPHk",
                            containment: 'body',
                            autoPlay: true,
                            mute: true,
                            startAt: 0,
                            opacity: 1,
                            loop: false,
                            ratio: "4/3",
                            addRaster: false
                        }, {
                            videoURL: "lNMfEyFFNHw",
                            containment: 'body',
                            autoPlay: true,
                            mute: true,
                            startAt: 0,
                            opacity: 1,
                            loop: false,
                            ratio: "4/3",
                            addRaster: true
                        }];
                        videoPlayer.YTPlaylist(videos, true);
                    }
                    if (videoPlayer.hasClass('video-blur')) {
                        var filters = {
                            blur: 45
                        };
                        videoPlayer.YTPApplyFilters(filters);
                    }
                }
            } else { // Default background on mobile devices
                $.backstretch(["images/backgrounds/bg-4.jpg"]);
            }
        }
    }
    pageBackground();

    /* ------------------------------------------------------------------------ */
    /*  FitVivs | responsive video
    /* ------------------------------------------------------------------------ */

    /* ------------------------------------------------------------------------ */
    /*  Tooltips
    /* ------------------------------------------------------------------------ */
    $("body").tooltip({
        selector: '[data-toggle=tooltip]'
    });

    /* ------------------------------------------------------------------------ */
    /*  Full page js
    /* ------------------------------------------------------------------------ */
    var isSlideAnimation = false;
    var slideElem = $('.page');

    var prevIndex = 0;
    $('#fullpage').fullpage({
        anchors: ['welcome', 'about', 'gallery', 'contacts'],
        menu: '#header-nav',
        scrollingSpeed: 800,
        autoScrolling: true,
        scrollBar: true,
        easing: 'easeInOutCubic',
        resize: false,
        css3: false,
        responsive: 1000,
        onLeave: function(index, nextIndex, direction) {
            if (!isSlideAnimation) {
                slideElem.addClass('transition');
            }
            isSlideAnimation = true;
        },
        afterLoad: function(anchorLink, index) {
            slideElem.removeClass('transition');
            $('#sidebar-nav li').eq(prevIndex).removeClass('current');
            $('#sidebar-nav li').eq(index - 1).addClass('current');
            isSlideAnimation = false;
            prevIndex = index - 1;
        },
        afterRender: function() {
            isSlideAnimation = false;
        }
    });
    $('.js-to-slide').on('click', function() {
        var elem = $(this),
            slideID = elem.data('slide');
        $.fn.fullpage.moveTo(slideID);
    });

    /* ------------------------------------------------------------------------ */
    /*  Contact form
    /* ------------------------------------------------------------------------ */
    var contactForm = $('#contact-form');
    if (contactForm.length) {
        $(document).on('submit', '#contact-form', function(e) {
            e.preventDefault();
            var user_name = contactForm.find('input[name=name]').val();
            var user_email = contactForm.find('input[name=email]').val();
            var user_message = contactForm.find('textarea[name=message]').val();
            //data to be sent to server
            var post_data = {
                'userName': user_name,
                'userEmail': user_email,
                'userMessage': user_message
            };

            function ValidateEmail(email) {
                var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
                return pattern.test(email);
            }
            if (ValidateEmail(user_email) && (user_message.length > 1) && (user_name.length > 1)) {
                $.post('sendmail.php', post_data, function(response) {
                    contactForm.find('.success-message').fadeIn(500);
                    contactForm.find('.error-message').fadeOut(200);
                });
            } else {
                contactForm.find('.error-message').fadeIn(500);
                contactForm.find('.success-message').fadeOut(200);
            }
            return false;
        });
    }

    /* ------------------------------------------------------------------------ */
    /*  Popups
    /* ------------------------------------------------------------------------ */
    

    /* ------------------------------------------------------------------------ */
    /*  ANIMATED ELEMENTS
    /* ------------------------------------------------------------------------ */
    $('.animated').appear();
    $('.animated').on('appear', function() {
        var elem = $(this);
        var animation = elem.data('animation');
        if (!elem.hasClass('visible')) {
            var animationDelay = elem.data('animation-delay');
            if (animationDelay) {
                setTimeout(function() {
                    elem.addClass(animation + " visible");
                }, animationDelay);
            } else {
                elem.addClass(animation + " visible");
            }
        }
    });

    /* ------------------------------------------------------------------------ */
    /*  VERTICAL ALIGMENT BLOCKS
    /* ------------------------------------------------------------------------ */
    function verticalCenterBlock() {
        $('.js-vertical-middle').each(function() {
            var _this = $(this);
            var height = _this.outerHeight();
            _this.addClass('vertical-middle').css('margin-top', -(height / 2));
        });
    }

    $(window).on('resize', verticalCenterBlock);

    $(window).on('load', function() {

        // Remove setTimeout
        setTimeout(function() {
            verticalCenterBlock();
        }, 0);

        /*
            Loader
        */
        $('.loading').fadeOut('300');

        /* Starting Animation on Load */
        $('.onstart').each(function() {
            var elem = $(this);
            if (!elem.hasClass('visible')) {
                var animationDelay = elem.data('animation-delay');
                var animation = elem.data('animation');
                if (animationDelay) {
                    setTimeout(function() {
                        elem.addClass(animation + " visible");
                    }, animationDelay);
                } else {
                    elem.addClass(animation + " visible");
                }
            }
        });


        /* ------------------------------------------------------------------------ */
        /*  Carousel
        /* ------------------------------------------------------------------------ */
        var carousel = $(".owl-carousel");
        if (carousel.length) {
            carousel.each(function() {
                var currentCarousel = $(this);
                if (currentCarousel.hasClass('js-gallery')) {
                    currentCarousel.owlCarousel({
                        items: 1,
                        dots: true,
                        center: false,
                        autoplay: false,
                        autoplayHoverPause: true

                    });
                } else {
                    currentCarousel.owlCarousel({
                        items: 4,
                        dots: false,
                        nav: false,
                        center: false,
                        autoplay: false,
                        autoplayHoverPause: true,
                        responsive: {
                            0: {
                                items: 1
                            },
                            767: {
                                items: 2
                            },
                            991: {
                                items: 3
                            },
                            1199: {
                                items: 4
                            }
                        }
                    });
                }

                // Custom navigation
                var customNav = currentCarousel.next('.owl-carousel-nav');
                if (customNav.length) {
                    customNav.on('click', '.prev', function() {
                        currentCarousel.trigger('prev.owl.carousel');
                    });
                    customNav.on('click', '.next', function() {
                        currentCarousel.trigger('next.owl.carousel');
                    });
                }
            });
        }
    });
})(jQuery);