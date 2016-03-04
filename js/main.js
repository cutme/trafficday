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
	function exist(o) {
		
		/* exist('.js-bigcaro') && S.bigcaro(); */

		d = ($(o).length>0) ? true : false;
		return d;
	}
	
	function goToTarget(target) {
		$('html, body').animate({
			scrollTop: target
		}, {
			duration: 1500,
			easing: 'easeOutCubic'
		});
	}

	function window_smaller_than(num) {
		d = ($(window).width() < num) ? true : false;
		return d;
	}

	var L = {
		go: function() {
			var el = $('.js-go'), t;
			
			el.each(function() {
				$(this).on('click', function(e) {
					e.preventDefault();
					t = $(this).attr('href');
					goToTarget( $(t).offset().top - 90 );
				});
			})
			
			
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
				fixedContentPos:true,
				type: 'iframe',
				mainClass: 'mfp-fade contact'
			});
		},
		modernizrSupport: function() {
			var m = Modernizr, placeholder = m.input.placeholder, svg = m.svg;
			if (svg === false) {
				var i = document.getElementsByTagName("img"),
					j, y;
				for (j = i.length; j--;) {
					y = i[j].src;
					if (y.match(/svg$/)) {
						i[j].src = y.slice(0, -3) + 'png';
					}
				}
			}
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
	
	var N =  {
		mobileNav: function() {
			function shTrigger() {
				var t = $('.c-nav-trigger'), n = $('.c-nav-primary'), status = false;
				
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
	}
	$(document).ready(function() {
		L.init();
		N.mobileNav();
	});
});

