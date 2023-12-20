$(function () {
    var video01 = document.getElementById("video01");
    var video02 = document.getElementById("video02");
    var video03 = document.getElementById("video03");
    var video04 = document.getElementById("video04");
    var video05 = document.getElementById("video05");
    var video06 = document.getElementById("video06");

    video01.controls = false;
    video02.controls = false;
    video03.controls = false;
    video04.controls = false;
    video05.controls = false;
    video06.controls = false;


    // video01の再生が終わった場合
    video01.addEventListener("ended", function () {
      $(this).hide();
      $(video02).show();
      video02.play();
    });

    // video02の再生が終わった場合
    video02.addEventListener("ended", function () {
      $(this).hide();
      $(video03).show();
      video03.play();
    });

    // video03の再生が終わった場合
    video03.addEventListener("ended", function () {
        $(this).hide();
        $(video04).show();
        video04.play();
        });

    // video04の再生が終わった場合
    video04.addEventListener("ended", function () {
        $(this).hide();
        $(video05).show();
        video05.play();
        });
    
    // video05の再生が終わった場合
    video05.addEventListener("ended", function () {
        $(this).hide();
        $(video06).show();
        video06.play();
        });

    // video06の再生が終わった場合
    video06.addEventListener("ended", function () {
      $(this).hide();
      $(video01).show();
      video01.play();
      });

  });