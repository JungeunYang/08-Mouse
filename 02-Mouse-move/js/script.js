$(function () {
  // 대상을 변수에 저장
  const $window = $(window);
  const $objWrap = $('.obj-wrap');
  const $obj1 = $objWrap.find('.obj1');
  const $obj2 = $objWrap.find('.obj2');
  const $obj3 = $objWrap.find('.obj3');
  const $obj4 = $objWrap.find('.obj4');

  // 마우스 좌표값
  let x = 0;
  let y = 0;

  // 보정되는 마우스 좌표값
  let mx = 0;
  let my = 0;
  let speed = 0.008;

  // 반복되는 동작(moving)을 변수에 저장 (취소시키려고)
  let movingObj;

  // 함수를 3개 만들기
  // 1. 마우스 좌표값 받아오는 함수
  function getOffset() {
    $window.on('mousemove', function (e) {
      x = e.pageX - $window.outerWidth() / 2;
      y = e.pageY - $window.outerHeight() / 2;
    });
  }

  // 2. 오브젝트를 움직이게 하는 함수
  function moving() {
    mx += (x - mx) * speed;
    my += (y - my) * speed;
    // A += B --> A = A + B

    // 마우스에 좌표값 적용
    $obj1.css({
      transform: `translate(${mx}px, ${my}px) rotate(${my}deg)`,
    });
    $obj2.css({
      transform: `translate3d(${-mx}px, ${-my}px, ${mx}px)`,
    });
    $obj3.css({
      transform: `translate3d(${-mx * 0.5}px, ${my * 0.7}px, ${mx * 0.05}px) rotateY(${mx}deg)`,
    });
    $obj4.css({
      transform: `translate3d(${mx / 0.3}px, ${my / 0.3}px, ${-mx / 0.5}px)`,
      filter: `blur(${mx * 0.3}px)`,
    });

    // 부드럽게 반복
    movingObj = requestAnimationFrame(moving);
  }

  // 3. 1번과 2번을 실행시키는 함수
  // function initMoving () {} -> 이름 있는 함수
  // function () {} -> 무명 함수
  const initMoving = function () {
    getOffset();
    moving();
  };

  initMoving();

  // 스크롤 값이 콘텐츠 영역을 넘어가면
  $window.on('scroll', function () {
    let scrollTop = $(this).scrollTop();
    let targetPos = $('.scroll-area').offset().top;
    console.log(scrollTop, targetPos);

    if (scrollTop >= targetPos) {
      // 만약 스크롤값이 targetPos를 넘어가면
      // 애니메이션을 멈추고
      cancelAnimationFrame(movingObj);
    }
    // 그렇지 않으면 다시 애니메이션 실행
    if (scrollTop === 0) initMoving();
  });
});
