/*jshint expr:true */

function debouncer(func, timeout) {
	var timeoutID;
	timeout = timeout || 200;
	return function() {
		var scope = this,
			args = arguments;
		clearTimeout(timeoutID);
		timeoutID = setTimeout(function() {
			func.apply(scope, Array.prototype.slice.call(args));
		}, timeout);
	};
}
jQuery(function($) {
	function goToTarget(t) {
		$('html, body').animate({
			scrollTop: t
		}, {
			duration: 1500,
			easing: 'easeOutCubic'
		});
	}
	function window_smaller_than(num) {
		var d = ($(window).width() < num) ? true : false;
		return d;
	}
	var L = {
		go: function() {
			var el = $('.js-go'),
				t, _t, n = $('.c-nav-primary'), tr = $('.c-nav-trigger');
			el.each(function() {
				$(this).on('click', function(e) {
					_t = $(this);
					e.preventDefault();
					t = _t.attr('href');
					el.removeClass('is-active');
					_t.addClass('is-active');
					$('html').hasClass('mobile') && 
						n.removeClass('is-active').hide();
						tr.removeClass('is-active');
					goToTarget($(t).offset().top - 90);
				});
			});
		},
		magnific: function() {
			$('.mfp-video').magnificPopup({
				iframe: {
					patterns: {
						youtube_short: {
							index: 'youtu.be/',
							id: 'youtu.be/',
							src: '//www.youtube.com/embed/%id%?autoplay=1'
						}
					}
				},
				fixedContentPos: true,
				type: 'iframe',
				mainClass: 'mfp-fade contact'
			});
		},
		modernizrSupport: function() {
			var m = Modernizr.addTest('svgasimg', document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1'));

			function replaceSvgImg() {
				var i = document.getElementsByTagName("img"),
					j, y;
				for (j = i.length; j--;) {
					y = i[j].src;
					if (y.match(/svg$/)) {
						i[j].src = y.slice(0, -3) + 'png';
					}
				}
			}
			m.svgasimg ? true : replaceSvgImg();
		},
		select: function() {
			$('select').selectbox();
		},
		init: function() {
			L.go();
			L.magnific();
			L.modernizrSupport();
			L.select();
		}
	};
	var N = {
		mobileNav: function() {
			function shTrigger() {
				var t = $('.c-nav-trigger'),
					n = $('.c-nav-primary'),
					status = false;

				function init() {
					n.addClass('is-mobile');
					status = true;
				}
				t.on('click', function(e) {
					e.preventDefault();
					$(this).toggleClass('is-active');
					n.slideToggle();
				});
				$(window).resize(debouncer(function(e) {
					if (window_smaller_than(800)) {
						if (status === false) {
							init();
						}
					} else {
						if (status === true) {
							t.removeClass('is-active');
							n.removeClass('is-mobile').attr('style', '');
							status = false;
						}
					}
				}));
				if (window_smaller_than(800)) {
					init();
				}
			}
			shTrigger();
		}
	};
	var S = {
		logotypes: function() {
			var owl = $('.owl-carousel');
			
			owl.each(function() {
				$(this).owlCarousel({
					dots: false,
					loop: true,
					items: 4,
					loop: true,
					nav: true,
					navText: ['',''],
					smartSpeed: 450,
					responsive: {
						0: {
							items: 2
				        },
				        480: {
							items: 2
				        },
				        641: {
							items: 3
				        },
				        769: {
							items: 4
				        }
				    },
				});
			});
		}
	};
	$(document).ready(function() {
		L.init();
		N.mobileNav();
		S.logotypes();
	});
});