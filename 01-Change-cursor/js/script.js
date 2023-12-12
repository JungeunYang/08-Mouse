$(function () {
  // 대상을 변수에 저장
  const $window = $(window);
  const $cursor = $('.cursor');

  // 마우스가 움직일 때
  $window.on('mousemove', function (e) {
    /* 매개번수 자리에 e를 넣어주면 e와 관련된 정보 객체를 이 안으로 가지고 올 수 있음 */
    console.log(e);

    let mouseX = e.pageX;
    let mouseY = e.pageY;

    $cursor.css({
      left: mouseX,
      top: mouseY,
    });
  });

  // click 클래스 적용/삭제
  $window.on('mousedown', function () {
    $cursor.addClass('click');
  });
  $window.on('mouseup', function () {
    $cursor.removeClass('click');
  });
});
