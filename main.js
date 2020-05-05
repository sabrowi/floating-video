jQuery(function ($) {
  var $window = $(window);
  var $featuredMedia = $("#featured-media");
  var $featuredVideo = $("#featured-video");

  var player;
  var top = $featuredMedia.offset().top;
  var offset = Math.floor(top + $featuredMedia.outerHeight() / 2);

  $window
    .on("resize", function () {
      top = $featuredMedia.offset().top;
      offset = Math.floor(top + $featuredMedia.outerHeight() / 2);
    })
    .on("scroll", function () {
      $featuredVideo.toggleClass(
        "is-sticky",
        $window.scrollTop() > offset && $featuredVideo.hasClass("is-playing")
      );
    });
});

window.onYoutubeIframeAPIReady = function () {
  player = new YT.Player("featured-video", {
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
};

function onPlayerStateChange(event) {
  var isPlay = 1 === event.data;
  var isPause = 2 === event.data;
  var isEnd = 0 === event.data;

  if (isPlay) {
    $featuredVideo.removeClass("is-paused");
    $featuredVideo.toggleClass("is-playing");
  }

  if (isPause) {
    $featuredVideo.removeClass("is-playing");
    $featuredVideo.toggleClass("is-paused");
  }

  if (isEnd) {
    $featuredVideo.removeClass("is-playing", "is-paused");
  }
}
