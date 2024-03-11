//ANIMATIONS FOR BLOCKS. ADJUST ACCORDING TO BLOCKS INCLUDED IN CURRENT PROJECT.


import $ from 'jquery';
// window.$ = window.jQuery = $;
let $jq = $.noConflict();
import AOS from 'aos';
import 'bootstrap';
import 'slick-carousel';

$jq(document).ready(() => {
	const KeyScripts = {
		init() {
			this._initJs();
			this._initHomeCarouselBlock();
			this._initStickyMenu();
			this._initAnimations();
		},
		_initJs() {
			$jq(document.documentElement).removeClass('no-js').addClass('js');
		},
		_initHomeCarouselBlock() {
			$jq('.home-carousel-block .carousel-wrapper').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true,
				centerMode: true,
				infinite: true,
				speed: 500,
				fade: true,
				prevArrow:
					'<button class="slick-prev" title="Previous Slide" aria-label="Previous Slide"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 32"><path fill="#000" fill-opacity="0.4" d="m16.5 0 5 5-11 11 11 11-5 5-16-16 16-16Z"/></svg></button>',
				nextArrow:
					'<button class="slick-next" title="Next Slide" aria-label="Next Slide"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 32"><path fill="#000" fill-opacity="0.4" d="m5.5 0-5 5 11 11-11 11 5 5 16-16-16-16Z"/></svg></button>',
				cssEase: 'linear',
			});
		},
		_initStickyMenu() {
			const header = document.getElementById('sticky-header');

			let startSticky = 100;

			if($jq('.header').height()) {
				startSticky = $jq('.header').height();
			}

			startSticky = 0;

			if( $jq('.alert-wrapper').length > 0  && $jq('.alert-wrapper').height()) {
				startSticky = startSticky + $jq('.alert-wrapper').height();
			}

			// console.log(startSticky);

			if( $jq('#wpadminbar').length > 0) {
				startSticky = startSticky + $jq('#wpadminbar').height();
			}

			window.addEventListener("scroll", () => {
				// console.log(scrollY);
				if (window.scrollY > startSticky) { // Adjust the scroll position where the change occurs
					header.classList.add('sticky');
				} else {
					header.classList.remove('sticky');
				}
			});
		},
		_initAnimations() {
			// Headings
			$jq('.stats-block .wp-block-heading,.carousel-block .wp-block-heading,.accordion-block .wp-block-heading,.stacked-squares-block .wp-block-heading, .inner-callout .wp-block-heading, .find-program-block .section-title, .featured-block .wp-block-heading, .video-block .wp-block-heading, .columns-block .row > .wp-block-heading, .news-block .title-container, .events-block .title-container, .stang-stories-block .heading-image, .story-block .heading-image, .text-block h2.wp-block-heading, .courses-field h2')
				.attr('data-aos', 'fade-down')
				.attr('data-aos-delay', 100);

			// $jq('.page-title')
			// 	.attr('data-aos', 'fade')
			// 	.attr('data-aos-delay', 200)
			// $jq('.page-title h1')
				// .attr('data-aos', 'fade-left')
				// .attr('data-aos-delay', 200);
			$jq('.image-text-block.has-image-on-the-left .column-image')
				.attr('data-aos', 'fade-right')
			$jq('.image-text-block.has-image-on-the-left .column-text')
				.attr('data-aos', 'fade-left')
				.attr('data-aos-delay', 200)
			$jq('.image-text-block:not(.has-image-on-the-left) .column-image')
				.attr('data-aos', 'fade-left')
			$jq('.image-text-block:not(.has-image-on-the-left) .column-text')
				.attr('data-aos', 'fade-right')
				.attr('data-aos-delay', 200);

			$jq('.carousel-block img')
				.attr('data-aos', 'fade')
				.attr('data-aos-delay', 200);

			$jq('.inner-callout')
				.attr('data-aos', 'zoom-in')
				.attr('data-aos-delay', 0);

			$jq('.video-block .wp-block-embed')
				.attr('data-aos', 'fade')
				.attr('data-aos-delay', 100);

			$jq('.quote-block blockquote')
				.attr('data-aos', 'zoom-in')
				.attr('data-aos-delay', 100);

			$jq('.quote-wrapper')
				.attr('data-aos', 'zoom-in')
				.attr('data-aos-delay', 100);

			$jq('.stats-block').each(function() {
				let cardDelay = 100;
				$jq(this).find('.column-stat').each(function() {
					cardDelay += 100;
					$jq(this)
						.attr('data-aos', 'fade')
						.attr('data-aos-delay', 100);
					$jq(this).find('p:first-child')
						.attr('data-aos', 'flip-up')
						.attr('data-aos-delay', cardDelay);
				});
			});

			$jq('.cards-block').each(function() {
				let cardDelay = 100;
				$jq(this).find('.column-card').each(function() {
					cardDelay += 100;
					$jq(this)
						.attr('data-aos', 'fade-up')
						.attr('data-aos-delay', cardDelay);
				});
			});

			$jq('.columns-block').each(function() {
				let cardDelay = 100;
				$jq(this).find('.column-inner').each(function() {
					cardDelay += 100;
					$jq(this)
						.attr('data-aos', 'fade-down')
						.attr('data-aos-delay', cardDelay);
				});
			});

			AOS.init({
				delay: 0, // values from 0 to 3000, with step 50ms
				duration: 600, // values from 0 to 3000, with step 50ms
				easing: 'ease', // default easing for AOS animations
				once: true, // whether animation should happen only once - while scrolling down
			});
		},
	};

	KeyScripts.init();
});
