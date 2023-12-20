$(document).ready(function() {
	$('#g-nav-list a[href^="#"]').on('click', function(event) {
	  event.preventDefault();
	  var target = $(this.getAttribute('href'));
	  if (target.length) {
		$('html, body').stop().animate({
		  scrollTop: target.offset().top
		}, 500);
	  }

	});
  });
