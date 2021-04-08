"use strict";

function spinc(){
  const spinner = document.getElementById("spinner");
  let angle = 0;
  setInterval(() => {
    angle++;
    spinner.style.transform = `rotate(${angle}deg)`
  }, 20)
}

spinc()

const fileInput = document.getElementById("fileInput");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const srcImage = new Image;

let imgData = null;
let originalPixels = null;

fileInput.onchange = function(event) {
  if(event.target.files && event.target.files.item(0)){
    srcImage.src = URL.createObjectURL(event.target.files[0]);
  }
}

srcImage.onload = function() {
  canvas.width = srcImage.width;
  canvas.height = srcImage.height;
  ctx.drawImage(srcImage, 0, 0, srcImage.width, srcImage.height);
  imgData = ctx.getImageData(0, 0, srcImage.width, srcImage.height);
  originalPixels = imgData.data.slice();
}

const imageProcessWorker = new Worker("worker.js");

imageProcessWorker.onmessage = function(event) {
  const imgDataNew = event.data;
  ctx.putImageData(imgDataNew, 0, 0, 0, 0, srcImage.width, srcImage.height)
  
}

function startProcessImage(){
  // srcImage, imgData, originalPixels
  const range = Number(document.getElementById('blueRange').value);
  const output = document.getElementById('labelRange');
  output.innerText = range;
  imageProcessWorker.postMessage([true, srcImage.width, srcImage.height, imgData, originalPixels,range]);

}
