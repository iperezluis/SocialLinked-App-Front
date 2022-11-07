const constraints = {
  audio: false,
  video: {
    width: 780,
    height: 450,
  },
};

// Access webcam
let actualStream;
const openCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    console.log("stream", stream);
    actualStream = stream;
    handleSuccess(stream);
  } catch (error) {
    console.log(error);
  }
};

// Success
// if (document.querySelector("#video")) {
//   document.querySelector("#video").remove();
// }
let video = document.createElement("video");
function handleSuccess(stream) {
  video.setAttribute("id", "video");
  video.setAttribute("autoPlay", true);
  video.setAttribute("playsInline", true);
  // video.setAttribute("style", "{{position:'absolute',top:0}}");
  document.querySelector("#video-wrap").appendChild(video);
  window.stream = stream;
  video.srcObject = stream;
}

// Stop webcam
const closeCamera = () => {
  video.srcObject.getTracks().map((videos) => videos.stop());
  video.srcObject.getTracks()[0].stop();
  video.remove();
};

// Draw image
const drawImage = () => {
  // document.getElementById("canvas").remove();
  const snap = document.querySelector("#snap");
  // document.querySelector("#video").remove();
  let canvas = document.createElement("canvas");
  canvas.setAttribute("id", "canvas");
  canvas.setAttribute("width", "640");
  canvas.setAttribute("height", "480");
  document.querySelector("#myCanvas").appendChild(canvas);
  const context = canvas.getContext("2d");
  snap.addEventListener("click", () => {
    context.drawImage(video, 0, 0, 640, 480);
    context.fillStyle = "rgba(255,10,10,1)";
    // context.fillRect(50, 50, 640, 480);
    // context.translate(0, 0);
    // context.direction=
    // context.fillText(new Date(), 30, 30);
  });
};

module.exports = { openCamera, drawImage, closeCamera };
