const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");

const topImage = new Image();
topImage.src = "top.png";

let isDrawing = false;

topImage.onload = function () {
  canvas.width = topImage.width;
  canvas.height = topImage.height;
  ctx.drawImage(topImage, 0, 0);
};

function getMousePos(canvas, evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function scratch(e) {
  if (!isDrawing) return;

  const pos = getMousePos(canvas, e);

  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, 25, 0, Math.PI * 2);
  ctx.fill();
}

canvas.addEventListener("mousedown", () => isDrawing = true);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mousemove", scratch);

// Optional: Touch support for phones
canvas.addEventListener("touchstart", () => isDrawing = true);
canvas.addEventListener("touchend", () => isDrawing = false);
canvas.addEventListener("touchmove", function (e) {
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  const pos = {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top
  };

  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, 25, 0, Math.PI * 2);
  ctx.fill();
});
