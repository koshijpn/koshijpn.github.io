$(document).ready(function() {
  var pagetop = $('#page_top');
  pagetop.hide();
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      pagetop.fadeIn();
    } else {
      pagetop.fadeOut();
    }
  });
});
