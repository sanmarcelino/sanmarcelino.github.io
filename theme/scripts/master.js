/*!
 * Vessiere
 * 2020 | DST
 */
 
VS = {

    init: function() {
        VS.globalFunction();
        VS.salAnimate();
    },

    globalFunction: function() { 
        if( $('.carousel-main').length >=1 ){ 
			$('.carousel-main').slick({  
	            slide: '.carousel-item', 
	            speed: 500,   
	            slidesToShow: 1, 
	            slidesToScroll: 1,    
	            autoplay: false,  
	            arrows: false,
                dots: true,
                infinite: false,  
                adaptiveHeight: true 
	        });
        } 

        if( $('.carousel-sample').length >=1 ){ 
			$('.carousel-sample').slick({  
                dots: true, 
                infinite: true,
                speed: 300, 
                slidesToShow: 1,
                adaptiveHeight: true
	        });  
        } 

		if( $('.slider-main-banner').length >=1 ){
			$('.slider-main-banner').slick({
	            slide: '.slider-item-wrapper',
	            speed: 500, 
	            slidesToShow: 1,
	            slidesToScroll: 1,
	            autoplay: true,  
	            arrows: false,
                dots: true,
                //fade: false,  
                infinite: false,
                adaptiveHeight: true, 
                autoplaySpeed: 5000,
                once: false,
                responsive: [
                    {
					    breakpoint: 816,
						settings: {
							slide: '.slider-item-wrapper',
							slidesToShow: 1,
							slidesToScroll: 1,
							infinite: false,
                            dots: false,
                            arrows: true,
                            adaptiveHeight: false,
						}
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slide: '.slider-item-wrapper',
                            arrows: true,
                            dots: false,
                        }
                    },
				]
	        });
        } 

        if( $('.slider-album').length >=1 ){
            $('.slider-album .slider-for').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: '.slider-nav'
              }); 
              $('.slider-album .slider-nav').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                asNavFor: '.slider-for',
                dots: false,
                focusOnSelect: true
              });
        } 

        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
        })
         
        //Mobile Click
        $(document).on('click', '.btn-primary.mobile', function(e) {
            e.preventDefault(); 
            var html = $(this).html();
            $(this).closest(".section-inner").toggleClass("active");
            $(this).html(html == "Solution" ? "Scenario" : "Solution");
            $(this).toggleClass('active');
        }); 

        //When Bootstrap Modal clicked
        $(document).on('click', '[data-bs-toggle="modal"]', function(e) {
            e.preventDefault();
            if( $('.slider').length >=1 ){ 
                $('.slider').slick('unslick').slick('reinit').slick();
            } 
        });

        //Modal target
        $(document).on('click', '[data-toggle="lightbox"], [data-toggle="modal"]', function(e) {
            e.preventDefault();
            var target = $(this).data("target"); 
            $(target).fadeIn('fast');
            $('body').addClass('lightbox-open'); //used to disable scroll outside
        });

        //Modal Close [Custom]
        $(document).on('click', '[data-toggle="close"]', function(e) {
            e.preventDefault();
            $(this).closest('.lightbox').fadeOut();
            $('body').removeClass('lightbox-open');
        });

        //Submit button
        $(document).on('click', '.btn-submit', function(e) {
            e.preventDefault(); 

            var selected = [];
            $.each($("input[name='options']:checked"), function(){
                selected.push($(this).val());
            });
            //var selections = selected.join(", ");
            var selections = selected;
            var selections_joined = [selections.slice(0, -1).join(', '), selections.slice(-1)[0]].join(selections.length < 2 ? '' : ' and ');
            $('.lightbox-body .selected').html(selections_joined);

            var target = $(this).data("target"); 
            $(target).fadeIn('fast');
            $('body').addClass('lightbox-open'); //used to disable scroll outside
        });

        //Thumbnail
        $(document).on('click', '.thumbnail-main-wrapper img', function(e) {
            var container = document.getElementById("main-image");
            container.src = this.src;
        });

        $(window).resize(function() {
        }); 
   
        window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');

        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
            }, false);
        });
        }, false);
 
    },

    salAnimate: function() {
        sal({ 
            rootMargin: '0% 50%',
            threshold: 0.30, // 50%
            animateClassName: 'sal-animate',
            disabledClassName: 'sal-disabled',
            selector: '[data-sal]',
            once: true, // run only once
            disabled: false,
            adaptiveHeight: true
        });
    },


};

$(document).ready(function() { 
    VS.init();
});