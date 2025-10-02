const isTouchDevice = () => "ontouchstart" in window || navigator.maxTouchPoints > 0;
const isMobileOrTablet = () => /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
const VIDEO_DURATION = 3;
const VIDEO_FWD_PATH = "assets/cover-f.mp4";
const VIDEO_FWD_REV_PATH = "assets/cover-fr.mp4";

const video = document.querySelector("#image");

if (isTouchDevice() || isMobileOrTablet()) {
  video.src = VIDEO_FWD_REV_PATH;
  video.loop = true;
  video.play();
} else {
  const body = document.querySelector("body");
  video.pause();
  video.src = VIDEO_FWD_PATH;

  body.addEventListener("mousemove", (e) => (video.currentTime = (e.clientX / body.clientWidth) * VIDEO_DURATION));
}
