import RainRenderer from "./rain-renderer";
import Raindrops from "./raindrops";
import loadImages from "./image-loader";
import createCanvas from "./create-canvas";
import TweenLite, {
  Quint
 } from "gsap";

import dropAlphaImg from 'assets/images/drop-alpha.png'
import dropColorImg from 'assets/images/drop-color.png'

let videoBg, 
    dropColor, dropAlpha,
    raindrops,
    renderer,
    canvas,
    textureFg,
    textureFgCtx,
    textureBg,
    textureBgCtx;

let textureBgSize = {
  width:456,
  height:256
}

let textureFgSize = {
  width:114,
  height:64
}

let parallax = {
  x:0,
  y:0
};

window.drawing = false;
window.brushsize = 30;
window.brushx = 0;
window.brushy = 0;

export default function (
  videoelement,
  containerelement
){

  videoBg = videoelement
  canvas = containerelement

  loadImages([
    { name: "dropAlpha", src: dropAlphaImg},
    { name: "dropColor", src: dropColorImg},
  ])
  .then((images) =>{
    
    dropColor = images.dropColor.img;
    dropAlpha = images.dropAlpha.img;

    init();
  });
}

function init(){  

  let dpi = window.devicePixelRatio;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.width = window.innerWidth+"px";
  canvas.style.height = window.innerHeight+"px";

  raindrops = new Raindrops(
    canvas.width,
    canvas.height,
    dpi,
    dropAlpha,
    dropColor,
    {
      // minR:30,
      // maxR:60,
      // collisionRadiusIncrease:0.002,
      // dropletsRate:35,
      // dropletsSize:[3,7.5],
      // dropletsCleaningRadiusMultiplier:0.30,
      
      trailRate:1,
      trailScaleRange:[0.2,0.45],
      collisionRadius : 0.45,
      dropletsCleaningRadiusMultiplier : 0.28,
    }
  );

  textureFg = createCanvas(
    textureFgSize.width,
    textureFgSize.height
  );  
  textureFgCtx = textureFg.getContext('2d');

  textureBg = createCanvas(
    textureBgSize.width,
    textureBgSize.height
  );
  textureBgCtx = textureBg.getContext('2d');

  generateTextures();

  renderer = new RainRenderer(
    canvas, 
    raindrops.canvas, 
    textureFg, 
    textureBg, 
    null,
    {
      // brightness:1.1,
      // alphaMultiply:6,
      // alphaSubtract:3,
      // parallaxFg: 30
      brightness:1.04,
      alphaMultiply:6,
      alphaSubtract:3,
    }
  );

  updateTextures();

  const moveparalax = event  => {

    let x, y

    if(event.clientX) {
      
      x = event.clientX;
      y = event.clientY;

    } else {

      x = event.changedTouches[0].clientX
      y = event.changedTouches[0].clientY
    }
  }

  const move = e => {

    let x, y

    if(e.clientX) {
      
      x = e.clientX;
      y = e.clientY;

    } else {

      x = e.changedTouches[0].clientX
      y = e.changedTouches[0].clientY
    }

    TweenLite.to(
      parallax,
      1,
      {
        x:((x/canvas.width)*2)-1,
        y:((y/canvas.height)*2)-1,
        ease: Quint.easeOut,
        onUpdate:() =>{
        renderer.parallaxX = parallax.x;
        renderer.parallaxY = parallax.y;
      }
    }) 
    
    window.brushx = x;
    window.brushy = y;
  }

  const start = e => {

    window.drawing = true
  }

  const end = e => {
    
    window.drawing = false
  }

  document.addEventListener('mousemove', move);
  //document.addEventListener('mousedown', start);
  //document.addEventListener('mouseup', end);
  //document.addEventListener('touchstart', start); 
  document.addEventListener('touchmove', move); 
  //document.addEventListener('touchend', end);
}

function updateTextures(){

  generateTextures();
  renderer.updateTextures();  

  requestAnimationFrame(updateTextures);
}

function generateTextures(){

  textureFgCtx.drawImage(
    videoBg,
    0,
    textureBgSize.height,
    textureFgSize.width,
    textureFgSize.height,
    0,
    0,
    textureFgSize.width,
    textureFgSize.height
  );

  textureBgCtx.drawImage(
    videoBg,
    0,
    0,
    textureBgSize.width,
    textureBgSize.height,
    0,
    0,
    textureBgSize.width,
    textureBgSize.height
  );
}
