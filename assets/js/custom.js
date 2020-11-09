/*--------------------- Copyright (c) 2017 -----------------------
------------------------------------------------------------------
[Master Javascript]

Project: vanguard responvive Html Template
Version: 1.0.0
-------------------------------------------------------------------*/
(function($) {
  "use strict";
  var vanguard = {
    initialised: false,
    version: 1.0,
    mobile: false,
    init: function() {
      if (!this.initialised) {
        this.initialised = true;
      } else {
        return;
      }
      /*-------------- vanguard Functions Calling ---------------------------------------------------
      ------------------------------------------------------------------------------------------------*/
      this.RTL();
      this.toggle();
      this.blog_slider();
      this.index_slider();
      this.testimonial_slider();
      this.responsive_menu();
      this.portfolio();
      this.video();
      this.vg_scroll();
    },
    /*-------------- vanguard Functions definition ---------------------------------------------------
    ---------------------------------------------------------------------------------------------------*/
    RTL: function() {
      // On Right-to-left(RTL) add class 
      var rtl_attr = $("html").attr('dir');
      if (rtl_attr) {
        $('html').find('body').addClass("rtl");
      }
    },
	toggle: function(){
		$(".toggle-icon").click(function() {
		  $(this).toggleClass("pushed");
		});
	},
	blog_slider: function(){
		$('.vg_blog_wrapper .owl-carousel').owlCarousel({
			loop:true,
			margin:30,
			autoplay: true,
			nav:false,
			smartSpeed: 2000,
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				1000:{
					items:2
				}
			}
		})
	},
	index_slider: function(){
		$('.vg_slider_wrapper .owl-carousel').owlCarousel({
			loop:false,
			items:1,
			nav:false,
			smartSpeed: 2000,
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				1000:{
					items:1
				}
			}
		});
		$('#slider').nivoSlider({
			animSpeed: 1000,                   // Slide transition speed 
			pauseTime: 4000, 
			controlNav: false,  
			prevText: '<i class="fa fa-angle-double-left" aria-hidden="true"></i>',
			nextText: '<i class="fa fa-angle-double-right" aria-hidden="true"></i>', 			
		});
	},
	testimonial_slider: function(){
		 $('.vg_testimonial_slider .owl-carousel').owlCarousel({
			loop:false,
			items:1,
			nav:false,
			dots:true,
			autoplay: false,
			smartSpeed: 2000,
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				1000:{
					items:1
				}
			}
		});
	},
	responsive_menu:function(){
		var w = window.innerWidth;
		if(w <= 991){
			 $(".vg_menu >ul>li").find('.sub-menu').parent().addClass('dropdown');
			 $(".vg_menu >ul>li.dropdown>a").append('<div class="show-submenu"><i class="fa fa-angle-down"></i></div>');

			$(".vg_menu >ul>li.dropdown > a").on("click", function() {
				$('.vg_menu >ul>li.dropdown > a > .show-submenu > i').toggleClass('fa fa-angle-up');
				$('.vg_menu >ul>li.dropdown > a > .show-submenu > i').toggleClass('fa fa-angle-down');
			});
			
			$('.vg_menu >ul>li.dropdown>a').click(function() {
				$('.vg_menu >ul>li.dropdown>a').not($(this)).
				parent().find('.sub-menu').hide();
				$(this).parent().find('.sub-menu').toggle();
			});
			

			$('.sub-menu').parent().hover(function() {
			var menu = $(this).find("ul");var menupos = $(menu).offset();
			if (menupos.left + menu.width() > $(window).width()) {var newpos = -$(menu).width();   
			 menu.css({'left': 'auto','right': '100%'});}
			 }); 
		}
		},
	portfolio: function(){
		$('.portfolio').magnificPopup({
		  type: 'image',
		  delegate: 'a',
		  gallery:{
			enabled:true
		  },
		  zoom: {
			enabled: true, // By default it's false, so don't forget to enable it

			duration: 300, // duration of the effect, in milliseconds
			easing: 'ease-in-out', // CSS transition easing function

			// The "opener" function should return the element from which popup will be zoomed in
			// and to which popup will be scaled down
			// By defailt it looks for an image tag:
			opener: function(openerElement) {
			  // openerElement is the element on which popup was initialized, in this case its <a> tag
			  // you don't need to add "opener" option if this code matches your needs, it's defailt one.
			  return openerElement.is('a') ? openerElement : openerElement.find('img');
			}
		  }
		});
	},
	video: function(){
		$('.video').magnificPopup({
			type: 'iframe',
		});
	},
	vg_scroll: function(){
		$.scrollIt();
	}
	
   };
   
   $(document).ready(function() {
    vanguard.init();
	
	// Contact Form Submition
	function checkRequire(formId , targetResp){
		targetResp.html('');
		var email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
		var url = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
		var image = /\.(jpe?g|gif|png|PNG|JPE?G)$/;
		var mobile = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
		var facebook = /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/;
		var twitter = /^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9(\.\?)?]/;
		var google_plus = /^(https?:\/\/)?(www\.)?plus.google.com\/[a-zA-Z0-9(\.\?)?]/;
		var check = 0;
		$('#er_msg').remove();
		var target = (typeof formId == 'object')? $(formId):$('#'+formId);
		target.find('input , textarea , select').each(function(){
			if($(this).hasClass('require')){
				if($(this).val().trim() == ''){
					check = 1;
					$(this).focus();
					targetResp.html('You missed out some fields.');
					$(this).addClass('error');
					return false;
				}else{
					$(this).removeClass('error');
				}
			}
			if($(this).val().trim() != ''){
				var valid = $(this).attr('data-valid');
				if(typeof valid != 'undefined'){
					if(!eval(valid).test($(this).val().trim())){
						$(this).addClass('error');
						$(this).focus();
						check = 1;
						targetResp.html($(this).attr('data-error'));
						return false;
					}else{
						$(this).removeClass('error');
					}
				}
			}
		});
		return check;
	}
	$(".submitForm").on("click", function() {
		var _this = $(this);
		var targetForm = _this.closest('form');
		var errroTarget = targetForm.find('.response');
		var check = checkRequire(targetForm , errroTarget);
		if(check == 0){
			var formDetail = new FormData(targetForm[0]);
			$.ajax({
				method : 'post',
				url : 'ajax.php',
				data:formDetail,
				cache:false,
				contentType: false,
				processData: false
			}).done(function(resp){
				console.log(resp);
				if(resp == 1){
					targetForm.find('input').val('');
					targetForm.find('textarea').val('');
					errroTarget.html('<p style="color:green;">Mail has been sent successfully.</p>');
				}else{
					errroTarget.html('<p style="color:red;">Something went wrong please try again latter.</p>');
				}
			});
		}
	});
  });
  $(window).on('load', function(){
		setTimeout(function() {
			$('body').addClass('site_loaded');	
		}, 500);
  });
	
})(jQuery);
