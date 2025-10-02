const isTouchDevice = () => "ontouchstart" in window || navigator.maxTouchPoints > 0;
const isMobileOrTablet = () => /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
const getImgPath = (i) => `assets/stills/frame_${String(i).padStart(3, "0")}.webp`;

const NUM_STILLS = 47;
const FRAME_RATE = 15;
const MS = 1_000;

const VIDEO_DURATION = 3;
const VIDEO_FWD_PATH = "assets/cover-f.mp4";
const VIDEO_FWD_REV_PATH = "assets/cover-fr.mp4";

const video = document.querySelector("video");
const img = document.querySelector("img");

const autoplayFallback = () => {
  var index = 0;
  var fwd = true;
  img.src = getImgPath(index);

  const stepFrame = () => {
    if (fwd) {
      index++;
      if (index >= NUM_STILLS) {
        index = NUM_STILLS;
        fwd = false;
      }
    } else {
      index--;
      if (index <= 0) {
        index = 0;
        fwd = true;
      }
    }

    img.src = getImgPath(index);
  };

  setInterval(stepFrame, MS / FRAME_RATE);
  video.style.display = "none";
};

if (isTouchDevice() || isMobileOrTablet()) {
  video.src = VIDEO_FWD_REV_PATH;
  video.loop = true;
  video.play().catch(() => {
    autoplayFallback();
  });
} else {
  const body = document.querySelector("body");
  video.pause();
  video.src = VIDEO_FWD_PATH;

  body.addEventListener("mousemove", (e) => (video.currentTime = (e.clientX / body.clientWidth) * VIDEO_DURATION));
  img.style.display = "none";
}
