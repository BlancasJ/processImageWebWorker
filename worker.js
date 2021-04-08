"use strict";

let imageWidth = null;
let imageHeight = null;

let imgData = null;
let originalPixels = null;
let currentPixels = null;

function getIndex(x, y){
  return (x + y * imageWidth) * 4
}

function clamp(value) {
  return Math.max(0, Math.min(Math.floor(value), 255))
}

const R_OFFSET = 0
const G_OFFSET = 1
const B_OFFSET = 2

function addBlue(x, y, value) {
  const index = getIndex(x, y) + B_OFFSET;
  const currentValue = currentPixels[index];
  currentPixels[index] = clamp(currentValue + value);
}

function commitChanges() {
  for (let i = 0; i < imgData.data.length; i++) {
    imgData.data[i] = currentPixels[i]
  }

  postMessage(imgData);
}

function processImage(value) {
  currentPixels = originalPixels.slice();

  for(let i = 0; i < imageHeight; i++){
    for(let j = 0; j < imageWidth; j++){
      addBlue(j, i, value);
    }
  }

  commitChanges();
}

onmessage = function(event) {
  if(event.data[0]){
    imageWidth = event.data[1];
    imageHeight = event.data[2];
    imgData = event.data[3];
    originalPixels = event.data[4];
    const range = event.data[5];
    processImage(range);
  }
}


