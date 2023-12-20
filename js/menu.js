$(document).ready(function() {
  // ハンバーガーメニューの要素を取得
  const navbar = $('.openbtn span');

  // ハンバーガーメニューの初期の位置を取得
  const aboutOffset = $('#about').offset().top;

  // スクロールイベントを監視
  $(window).scroll(function() {
      // 現在のスクロール位置を取得
      const scrollPos = $(window).scrollTop();

      // スクロール位置が#aboutまでスクロールしたら、ハンバーガーメニューの色を変更
      if (scrollPos >= aboutOffset) {
          navbar.addClass('navbar-scrolled');
      } else {
          navbar.removeClass('navbar-scrolled');
      }
  });

  // ページロード時にハンバーガーメニューの色を変更
  const initialScrollPos = $(window).scrollTop();
  if (initialScrollPos >= aboutOffset) {
      navbar.addClass('navbar-scrolled');
  } else {
      navbar.removeClass('navbar-scrolled');
  }

  // ハンバーガーメニューボタンのクリックイベント
  $(".openbtn").click(function() {
      $(this).toggleClass('active');
      $("#g-nav").toggleClass('panelactive');
      $("#container").toggleClass('mainblur');
  });

  // ナビゲーションのリンクがクリックされたら
  $("#g-nav a").click(function() {
      $(".openbtn").removeClass('active');
      $("#g-nav").removeClass('panelactive');
      $("#container").removeClass('mainblur');
  });
  
  });
