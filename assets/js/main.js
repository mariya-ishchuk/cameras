$(function() {
	var currentIndex = 0;
    var carouselTimer, carouselInterval;

    var setCurrentPagination = function(index) {
        $('.carousel-paginator').removeClass('active');
        $($('.carousel-paginator')[index]).addClass('active');
    };
    $('.jcarousel').jcarousel();

    function setCarouselInterval() {
        carouselInterval && clearInterval(carouselInterval);
        carouselInterval = setInterval(function(){
            currentIndex = hahndleImageSelection(currentIndex + 1);
            $('.jcarousel').jcarousel('scroll', currentIndex);
            setCurrentPagination(currentIndex);
        }, 3000);
    };
    setCarouselInterval();

    function setCarouseTimer() {
        carouselInterval && clearInterval(carouselInterval);
        carouselTimer && clearTimeout(carouselTimer);
        carouselTimer = setTimeout(function(){
            setCarouselInterval();
        }, 3000);
    };

    function hahndleImageSelection(index) {
    	if ($('.carousel-img').length -1 < index) {
    		return 0;
    	} else if (index < 0) {
    		return $('.carousel-img').length -1;
    	} else {
    		return index;
    	}
    }

    $('.next-carousel-button').click(function(){
        setCarouseTimer();
    	currentIndex = hahndleImageSelection(currentIndex + 1);
    	$('.jcarousel').jcarousel('scroll', currentIndex);
    	setCurrentPagination(currentIndex);
    });

    $('.prev-carousel-button').click(function(){
        setCarouseTimer();
    	currentIndex = hahndleImageSelection(currentIndex - 1);
    	$('.jcarousel').jcarousel('scroll', currentIndex);
    	setCurrentPagination(currentIndex);
    });

    $($('.carousel-paginator')[currentIndex]).addClass('active');

    $('.carousel-paginator').click(function(e) {
        setCarouseTimer();
    	currentIndex = parseInt(e.target.dataset.picture);
    	setCurrentPagination(currentIndex);
    	$('.jcarousel').jcarousel('scroll', e.target.dataset.picture);
    });

    function handleStickyVisibility() {
        if ($(window).scrollTop() > 100) {
            $('.header-placeholder').addClass("visible");
            $('header').addClass("sticky");
        } else if ($(window).scrollTop() <= 20 && $('.header-placeholder').hasClass("visible")) {
            $('.header-placeholder').removeClass("visible");
            $('header').removeClass("sticky");
        }
    }

    handleStickyVisibility();

    $(window).on("scroll", function(){
        handleStickyVisibility();
    });

    // SOFT SCROLL
    $('a[href*="#"]:not([href="#"])').on('mousedown touchstart', function() {
      $('.nav-container').addClass('visible') && $('.nav-container').removeClass('visible');
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top - $("header").height()
          }, 500);
          return false;
        }
      }
    });

    $('.navigation').click(function(){
        if (!$('.nav-container').hasClass('visible')) {
            $('.nav-container').addClass('visible');
            $('.nav-container').focus();
        } else {
            $('.nav-container').removeClass('visible');
        }
    });

    $('.nav-container').blur(function(){
        $('.nav-container').removeClass('visible');
    });
    
    // FORM
    $('#send').click(sendForm);

    function sendForm (e) {
        e.preventDefault();
        $.ajax({
            url: "https://formspree.io/yanees.co@gmail.com", 
            method: "POST",
            data: {
                name: $('#name').val(),
                email: $('#email').val(),
                message: $('#message').val()
            },
            dataType: "json",
            success: function() {
                $('form')[0].reset();
                $('#thanks').html('Thank you for contacting!');
            }
        });
    }
});

