const constraints = {
  audio: true,
  video: {
    width: 780,
    height: 450,
  },
};

// Access webcam
// let stream;
export const openCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    // getStream(stream);
    console.log("stream", stream.getAudioTracks()[0]);
    handleSuccess(stream);
  } catch (error) {
    console.log(error);
  }
};

// Success
// if (document.querySelector("#video")) {
//   document.querySelector("#video").remove();
// }
// let hasMuted = false;
let video = document.createElement("video");
function handleSuccess(stream) {
  video.setAttribute("id", "video");
  video.setAttribute("autoPlay", true);
  video.setAttribute("playsInline", true);
  video.setAttribute("muted", "true");
  // video.setAttribute("style", "{{position:'absolute',top:0}}");
  document.querySelector("#video-wrap").appendChild(video);
  window.stream = stream;
  video.srcObject = stream;
}

// Stop webcam
export const closeCamera = () => {
  video.srcObject.getTracks().map((videos) => videos.stop());
  video.srcObject.getTracks()[0].stop();
  video.remove();
};
//stream capturado
// const getStream = (streamCap) => {
//   return { streamCap };
// };
// console.log("stream capturado", stream);
// Muted audio
export const muteAudio = () => {
  // const { streamCap } = getStream;
  // console.log("stream capturado", streamCap);
  console.log("windows features", window.stream.getAudioTracks()[0]);
  let audio = window.stream.getAudioTracks()[0];
  if (!audio.enabled) {
    audio.enabled = true;
    return { hasAudio: true };
  }
  if (audio.enabled) {
    audio.enabled = false;
    return { hasAudio: false };
  }
};

// Draw image
export const drawImage = () => {
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

module.exports = { openCamera, drawImage, closeCamera, video, muteAudio };
