/*
 * Copyright (c) 2022 Marketify
 * Author: Marketify
 * This file is made for CURRENT TEMPLATE
*/

jQuery(document).ready(function () {


	"use strict";

	applyTranslations(localStorage.getItem("lang") || "en");
	document.body.setAttribute("dir", (localStorage.getItem("lang") || "en") === "ar" ? "rtl" : "ltr");


	jQuery('.anchor_nav').onePageNav(); // ✅ تمت إضافته هنا
	// here all ready functions

	shark_tm_modalbox();
	shark_tm_nav_bg();
	shark_tm_trigger_menu();
	shark_tm_modalbox_news();
	shark_tm_modalbox_portfolio();
	shark_tm_portfolio();
	progress_by_frenify();
	shark_tm_cursor();
	shark_tm_imgtosvg();
	shark_tm_popup();
	shark_tm_data_images();
	shark_tm_contact_form();
	shark_tm_owl_carousel(); // ✅ هنا بيتنفذ الكاروسيل
	shark_tm_totop();
	shark_tm_down();

	jQuery(window).on('load', function () {
		shark_tm_my_load();

		// ✅ تم حذف الـ owlCarousel المكرر من هنا 👇
	});

	jQuery(window).on('scroll', function () {
		shark_tm_progress_line();
	});
});


// -----------------------------------------------------
// ---------------   FUNCTIONS    ----------------------
// -----------------------------------------------------

// -----------------------------------------------------
// --------------------   MODALBOX    ------------------
// -----------------------------------------------------

function shark_tm_modalbox() {

	"use strict";

	jQuery('.shark_tm_all_wrap').prepend('<div class="shark_tm_modalbox"><div class="box_inner"><div class="close"><a href="#"><i class="icon-cancel"></i></a></div><div class="description_wrap"></div></div></div>');
}

// -------------------------------------------------
// -------------   TOPBAR BG SCROLL  ---------------
// -------------------------------------------------

function shark_tm_nav_bg() {

	"use strict";

	jQuery(window).on('scroll', function () {
		var menu = jQuery('.shark_tm_header');
		var progress = jQuery('.progressbar');
		var WinOffset = jQuery(window).scrollTop();

		if (WinOffset >= 100) {
			menu.addClass('animate');
			progress.addClass('animate');
		} else {
			menu.removeClass('animate');
			progress.removeClass('animate');
		}
	});
}

// -----------------------------------------------------
// ---------------   TRIGGER MENU    -------------------
// -----------------------------------------------------

function shark_tm_trigger_menu() {

	"use strict";

	var hamburger = jQuery('.trigger .hamburger');
	var mobileMenu = jQuery('.shark_tm_mobile_menu .dropdown');
	var mobileMenuList = jQuery('.shark_tm_mobile_menu .dropdown .dropdown_inner ul li a');

	hamburger.on('click', function () {
		var element = jQuery(this);

		if (element.hasClass('is-active')) {
			element.removeClass('is-active');
			mobileMenu.slideUp();
		} else {
			element.addClass('is-active');
			mobileMenu.slideDown();
		}
		return false;
	});

	mobileMenuList.on('click', function () {
		jQuery('.trigger .hamburger').removeClass('is-active');
		mobileMenu.slideUp();
		return false;
	});
}

// -------------------------------------------------
// -------------  MODALBOX NEWS  -------------------
// -------------------------------------------------

function shark_tm_modalbox_news() {

	"use strict";

	var modalBox = jQuery('.shark_tm_modalbox');
	var button = jQuery('.shark_tm_news .shark_tm_full_link,.shark_tm_news .details .title a');
	var closePopup = modalBox.find('.close');

	button.on('click', function () {
		var element = jQuery(this);
		var parent = element.closest('.list_inner');
		var content = parent.find('.news_hidden_details').html();
		var image = element.closest('.list_inner').find('.image .main').data('img-url');
		var meta = parent.find('.meta').html();
		var title = parent.find('.details .title a').text();
		modalBox.addClass('opened');
		modalBox.find('.description_wrap').html(content);
		modalBox.find('.news_popup_informations').prepend('<div class="image"><img src="img/thumbs/4-2.jpg" alt="" /><div class="main" data-img-url="' + image + '"></div></div>');
		modalBox.find('.news_popup_informations .image').after('<div class="details"><div class="meta">' + meta + '</div><div class="title"><h3>' + title + '</h3></div><div>');
		shark_tm_data_images();
		return false;
	});
	closePopup.on('click', function () {
		modalBox.removeClass('opened');
		modalBox.find('.description_wrap').html('');
		return false;
	});
}

// -------------------------------------------------
// -------------  MODALBOX PORTFOLIO  --------------
// -------------------------------------------------

function shark_tm_modalbox_portfolio() {

	"use strict";

	var modalBox = jQuery('.shark_tm_modalbox');
	var button = jQuery('.shark_tm_portfolio .portfolio_popup');
	var closePopup = modalBox.find('.close');

	button.off().on('click', function () {
		var element = jQuery(this);
		var parent = element.closest('.list_inner');
		var content = parent.find('.hidden_content').html();
		var image = parent.find('.image .main').data('img-url');
		var details = parent.find('.details').html();
		modalBox.addClass('opened');
		modalBox.find('.description_wrap').html(content);
		modalBox.find('.popup_details').prepend('<div class="top_image"><img src="img/thumbs/4-2.jpg" alt="" /><div class="main" data-img-url="' + image + '"></div></div>');
		modalBox.find('.popup_details .top_image').after('<div class="portfolio_main_title">' + details + '<div>');
		shark_tm_data_images();
		return false;
	});
	closePopup.on('click', function () {
		modalBox.removeClass('opened');
		modalBox.find('.description_wrap').html('');
		return false;
	});
}

// filterable 

function shark_tm_portfolio() {

	"use strict";

	if (jQuery().isotope) {

		// Needed variables
		var filter = jQuery('.shark_tm_portfolio .portfolio_filter ul');

		if (filter.length) {
			// Isotope Filter 
			filter.find('a').on('click', function () {
				var element = jQuery(this);
				var selector = element.attr('data-filter');
				var list = element.closest('.shark_tm_portfolio').find('.portfolio_list').children('ul');
				list.isotope({
					filter: selector,
					animationOptions: {
						duration: 750,
						easing: 'linear',
						queue: false
					}
				});

				filter.find('a').removeClass('current');
				element.addClass('current');
				return false;
			});
		}
	}
}

// -------------------------------------------------
// -------------  PROGRESS BAR  --------------------
// -------------------------------------------------

function tdProgress(container) {

	"use strict";

	container.find('.progress_inner').each(function () {
		var progress = jQuery(this);
		var pValue = parseInt(progress.data('value'), 10);
		var pColor = progress.data('color');
		var pBarWrap = progress.find('.bar');
		var pBar = progress.find('.bar_in');
		var number = progress.find('.number');
		var label = progress.find('.label');
		number.css({ right: (100 - pValue) + '%' });
		setTimeout(function () { label.addClass('opened'); }, 500);
		pBar.css({ width: pValue + '%', backgroundColor: pColor });
		setTimeout(function () { pBarWrap.addClass('open'); });
	});
}
function progress_by_frenify(wrapper) {

	"use strict";

	var element;
	if (wrapper) {
		element = wrapper.find('.dodo_progress');
	} else {
		element = jQuery('.dodo_progress');
	}
	element.each(function () {
		var pWrap = jQuery(this);
		pWrap.find('.number').css({ right: '100%' });
		console.log(pWrap.find('.number').length);
		pWrap.waypoint({ handler: function () { tdProgress(pWrap); }, offset: '90%' });
	});
}

// -----------------------------------------------------
// ---------------   PRELOADER   -----------------------
// -----------------------------------------------------

function shark_tm_preloader() {

	"use strict";

	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
	var preloader = $('#preloader');

	if (!isMobile) {
		setTimeout(function () {
			preloader.addClass('preloaded');
		}, 800);
		setTimeout(function () {
			preloader.remove();
		}, 2000);

	} else {
		preloader.remove();
	}
}

// -----------------------------------------------------
// -------------------    COUNTER    -------------------
// -----------------------------------------------------

jQuery('.tm_counter').each(function () {

	"use strict";

	var el = jQuery(this);
	el.waypoint({
		handler: function () {

			if (!el.hasClass('stop')) {
				el.addClass('stop').countTo({
					refreshInterval: 50,
					formatter: function (value, options) {
						return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
					},
				});
			}
		}, offset: '80%'
	});
});

// -----------------------------------------------------
// -----------------   MY LOAD    ----------------------
// -----------------------------------------------------

function shark_tm_my_load() {

	"use strict";

	var speed = 500;
	setTimeout(function () { shark_tm_preloader(); }, speed);
}

// -----------------------------------------------------
// ------------------   CURSOR    ----------------------
// -----------------------------------------------------

function shark_tm_cursor() {

	"use strict";

	var myCursor = jQuery('.mouse-cursor');

	if (myCursor.length) {
		if ($("body")) {
			const e = document.querySelector(".cursor-inner"),
				t = document.querySelector(".cursor-outer");
			let n, i = 0,
				o = !1;
			window.onmousemove = function (s) {
				o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"), e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)", n = s.clientY, i = s.clientX
			}, $("body").on("mouseenter", "a, .cursor-pointer", function () {
				e.classList.add("cursor-hover"), t.classList.add("cursor-hover")
			}), $("body").on("mouseleave", "a, .cursor-pointer", function () {
				$(this).is("a") && $(this).closest(".cursor-pointer").length || (e.classList.remove("cursor-hover"), t.classList.remove("cursor-hover"))
			}), e.style.visibility = "visible", t.style.visibility = "visible"
		}
	}
};

// -----------------------------------------------------
// ---------------    IMAGE TO SVG    ------------------
// -----------------------------------------------------

function shark_tm_imgtosvg() {

	"use strict";

	jQuery('img.svg').each(function () {

		var jQueryimg = jQuery(this);
		var imgClass = jQueryimg.attr('class');
		var imgURL = jQueryimg.attr('src');

		jQuery.get(imgURL, function (data) {
			// Get the SVG tag, ignore the rest
			var jQuerysvg = jQuery(data).find('svg');

			// Add replaced image's classes to the new SVG
			if (typeof imgClass !== 'undefined') {
				jQuerysvg = jQuerysvg.attr('class', imgClass + ' replaced-svg');
			}

			// Remove any invalid XML tags as per http://validator.w3.org
			jQuerysvg = jQuerysvg.removeAttr('xmlns:a');

			// Replace image with new SVG
			jQueryimg.replaceWith(jQuerysvg);

		}, 'xml');

	});
}

// -----------------------------------------------------
// --------------------   POPUP    ---------------------
// -----------------------------------------------------

function shark_tm_popup() {

	"use strict";

	jQuery('.gallery_zoom').each(function () { // the containers for all your galleries
		jQuery(this).magnificPopup({
			delegate: 'a.zoom', // the selector for gallery item
			type: 'image',
			gallery: {
				enabled: true
			},
			removalDelay: 300,
			mainClass: 'mfp-fade'
		});

	});
	jQuery('.popup-youtube, .popup-vimeo').each(function () { // the containers for all your galleries
		jQuery(this).magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: true
		});
	});

	jQuery('.soundcloude_link').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true,
		},
	});
}

// -----------------------------------------------------
// ---------------   DATA IMAGES    --------------------
// -----------------------------------------------------

function shark_tm_data_images() {

	"use strict";

	var data = jQuery('*[data-img-url]');

	data.each(function () {
		var element = jQuery(this);
		var url = element.data('img-url');
		element.css({ backgroundImage: 'url(' + url + ')' });
	});
}

// -----------------------------------------------------
// ----------------    CONTACT FORM    -----------------
// -----------------------------------------------------

function shark_tm_contact_form() {

	"use strict";

	jQuery(".contact_form #send_message").on('click', function () {

		var name = jQuery(".contact_form #name").val();
		var email = jQuery(".contact_form #email").val();
		var message = jQuery(".contact_form #message").val();
		var subject = jQuery(".contact_form #subject").val();
		var success = jQuery(".contact_form .returnmessage").data('success');

		jQuery(".contact_form .returnmessage").empty(); //To empty previous error/success message.
		//checking for blank fields	
		if (name === '' || email === '' || message === '') {

			jQuery('div.empty_notice').slideDown(500).delay(2000).slideUp(500);
		}
		else {
			// Returns successful data submission message when the entered information is stored in database.
			jQuery.post("modal/contact.php", { ajax_name: name, ajax_email: email, ajax_message: message, ajax_subject: subject }, function (data) {

				jQuery(".contact_form .returnmessage").append(data);//Append returned message to message paragraph


				if (jQuery(".contact_form .returnmessage span.contact_error").length) {
					jQuery(".contact_form .returnmessage").slideDown(500).delay(2000).slideUp(500);
				} else {
					jQuery(".contact_form .returnmessage").append("<span class='contact_success'>" + success + "</span>");
					jQuery(".contact_form .returnmessage").slideDown(500).delay(4000).slideUp(500);
				}

				if (data === "") {
					jQuery("#contact_form")[0].reset();//To reset form fields on success
				}

			});
		}
		return false;
	});
}

// -----------------------------------------------------
// ----------------    OWL CAROUSEL    -----------------
// -----------------------------------------------------

function shark_tm_owl_carousel() {
	"use strict";

	// ✅ Testimonials Carousel
	var testimonials = jQuery('.testimonials-carousel');
	if (testimonials.length) {
		testimonials.owlCarousel({
			loop: false,
			items: 1,
			margin: 0,
			autoplay: true,
			autoplayTimeout: 7000,
			rtl: jQuery('body').hasClass('rtl'),
			dots: true,
			nav: false,
			onInitialized: function () {
				shark_tm_data_images();
			},
			onTranslated: function () {
				applyTranslations(localStorage.getItem("lang") || "en");
			}
		});
	}

	// ✅ Partners Carousel
	var partners = jQuery('.partners-carousel');
	if (partners.length) {
		partners.owlCarousel({
			loop: true,
			items: 5,
			margin: 0,
			autoplay: true,
			autoplayTimeout: 7000,
			dots: true,
			nav: false,
			responsive: {
				0: { items: 2 },
				480: { items: 3 },
				768: { items: 3 },
				1300: { items: 5 }
			}
		});
	}
}



function shark_tm_progress_line() {

	"use strict";

	var line = jQuery('.progressbar .line');
	var documentHeight = jQuery(document).height();
	var windowHeight = jQuery(window).height();
	var winScroll = jQuery(window).scrollTop();
	var value = (winScroll / (documentHeight - windowHeight)) * 100;
	var position = value;

	line.css('height', position + "%");
}

// -----------------------------------------------------
// -------------------    TOTOP    ---------------------
// -----------------------------------------------------

function shark_tm_totop() {

	"use strict";

	var text = $('.progressbar .text');
	text.css({ bottom: 105 + text.width() });
	$(".progressbar a").on('click', function (e) {
		e.preventDefault();
		$("html, body").animate({ scrollTop: 0 }, 'slow');
		return false;
	});

}


// -----------------------------------------------------
// -----------------    DOWN    ------------------------
// -----------------------------------------------------

function shark_tm_down() {

	"use strict";

	var topbar = jQuery('.shark_tm_header').outerHeight();

	jQuery('.anchor').on('click', function () {

		if ($.attr(this, 'href') !== '#') {
			$('html, body').animate({
				scrollTop: $($.attr(this, 'href')).offset().top - topbar - 50
			}, 800);
		}

		return false;
	});
}

// -----------------------------------------------------
// --------------------    WOW JS    -------------------
// -----------------------------------------------------

new WOW().init();

// -----------------------------------------------------
// -----------------    TILT    ------------------------
// -----------------------------------------------------

if (jQuery('.tilt-effect').length) {
	jQuery('.tilt-effect').tilt({
		maxTilt: 4,
		easing: "cubic-bezier(.03,.98,.52,.99)",
		speed: 500,
		transition: true
	});
}
document.getElementById("langToggleHeader").addEventListener("click", function () {
	const oldLang = localStorage.getItem("lang") || "en";
	const newLang = oldLang === "en" ? "ar" : "en";
	localStorage.setItem("lang", newLang);
	applyTranslations(newLang);
	document.body.setAttribute("dir", newLang === "ar" ? "rtl" : "ltr");
});

document.getElementById("langToggleMobile").addEventListener("click", function () {
	const oldLang = localStorage.getItem("lang") || "en";
	const newLang = oldLang === "en" ? "ar" : "en";
	localStorage.setItem("lang", newLang);
	applyTranslations(newLang);
	document.body.setAttribute("dir", newLang === "ar" ? "rtl" : "ltr");
});


// ✅ عشان زر اللغة يشتغل في أي وقت وأي مكان
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("langLabel")) {
        toggleLanguage();
    }
});


// 2. لما الصفحة تفتح لأول مرة طبق الترجمة حسب اللغة المخزنة
document.addEventListener("DOMContentLoaded", function () {
    const lang = localStorage.getItem("lang") || "en";
    applyTranslations(lang); // دي مهمة جدًا
});
