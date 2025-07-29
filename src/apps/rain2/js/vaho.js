import RainRenderer from './rainrenderer';
import Raindrops from './raindrops';
import loadImages from './imageloader';
import createCanvas from './createcanvas';
import TweenLite, {
  Quint
 } from 'gsap';

import idropalpha from 'assets/images/drop-alpha.png'
import idropcolor from 'assets/images/drop-color.png'
import i2015 from 'assets/images/2015.png'
import i2015light from 'assets/images/2015light.png'

let TextureImg,

    dropColor, dropAlpha,
    
    dpi,
    
    textureFg,
    textureFgCtx,
    textureBg,
    textureBgCtx,
    
    textureBgSize={
      width:456,
      height:256
    },
    textureFgSize={
      width:114,
      height:64
    },
    
    raindrops,
    renderer,
    canvas;

let parallax={ x:0, y:0 };

let BrushSizeStart = { x: 320, y: 10 };
let BrushSizeTarget = { x: 1400, y: 20 };
let BrushSizeSlope = (BrushSizeTarget.y - BrushSizeStart.y) / (BrushSizeTarget.x - BrushSizeStart.x);

let Texture2015WidthStart = { x: 320, y: 250 };
let Texture2015WidthTarget = { x: 1400, y: 700 };
let Texture2015WidthSlope = (Texture2015WidthTarget.y - Texture2015WidthStart.y) / (Texture2015WidthTarget.x - Texture2015WidthStart.x);

export default (CanvasElement, Texture) => {

  canvas = CanvasElement
  TextureImg = Texture

  loadImages([
    { name:'dropAlpha', src: idropalpha },
    { name:'dropColor', src: idropcolor },
    { name:'img2015', src: i2015 },
    { name:'img2015light', src: i2015light },
  ]).then((images)=>{
    dropColor = images.dropColor.img;
    dropAlpha = images.dropAlpha.img;
    window.textureTITLE = images.img2015.img;
    window.textureTITLELight = images.img2015light.img;
    window.VahoReady = true;

    init(CanvasElement)
  });
}

const init = (CanvasElement) => {

  dpi=window.devicePixelRatio;

  CanvasElement.width=window.innerWidth;
  CanvasElement.height=window.innerHeight;
  CanvasElement.style.width=window.innerWidth+'px';
  CanvasElement.style.height=window.innerHeight+'px';

  window.BrushSize = BrushSizeSlope * window.innerWidth - BrushSizeSlope * BrushSizeStart.x + BrushSizeStart.y;
  window.Texture2015Width = Texture2015WidthSlope * window.innerWidth - Texture2015WidthSlope * Texture2015WidthStart.x + Texture2015WidthStart.y;
  window.Texture2015Heigth = window.Texture2015Width * textureBgSize.height / textureBgSize.width;
  window.Texture2015Top = window.innerHeight / 2 - window.Texture2015Heigth / 2;
  window.Texture2015Left = window.innerWidth / 2 - window.Texture2015Width / 2;

  raindrops = new Raindrops(
    CanvasElement.width,
    CanvasElement.height,
    dpi,
    dropAlpha,
    dropColor,
    {
      minR: 10,
      maxR: 20,
      collisionRadiusIncrease:0.002,
      dropletsRate:50,
      dropletsSize:[3,7.5],
      dropletsCleaningRadiusMultiplier:0.30,
    }
  );

  textureFg = createCanvas(textureFgSize.width,textureFgSize.height);
  textureFgCtx = textureFg.getContext('2d');
  textureBg = createCanvas(textureBgSize.width,textureBgSize.height);
  textureBgCtx = textureBg.getContext('2d');

  generateTextures();

  renderer = new RainRenderer(
    CanvasElement, 
    raindrops.canvas, 
    textureFg, 
    textureBg, 
    null,
    {
      brightness:1.1,
      alphaMultiply:6,
      alphaSubtract:3,
      parallaxFg:40
    }
  );

  setupParallax();  

  const handDraw = e => {
    
    let x, y

    if(e.clientX) {
      
      x = e.clientX;
      y = e.clientY;

    } else {

      x = e.changedTouches[0].clientX
      y = e.changedTouches[0].clientY
    }

    window.BrushX = x
    window.BrushY = y
  }

  const startDrawing = e => {

    window.Drawing = true
  }

  const endDrawing = e => {

    window.Drawing = false
  }

  document.addEventListener('mousemove', handDraw);
  document.addEventListener('mousedown', startDrawing);
  document.addEventListener('mouseup', endDrawing);
  document.addEventListener('touchstart', startDrawing); 
  document.addEventListener('touchmove', handDraw); 
  document.addEventListener('touchend', endDrawing); 

  window.VahoActivo = true
}

function setupParallax(){

  document.addEventListener('mousemove',(event)=>{

    if(!window.VahoActivo) { return; }

    let x=event.pageX;
    let y=event.pageY;

    TweenLite.to(parallax,1,{
      x:((x/canvas.width)*2)-1,
      y:((y/canvas.height)*2)-1,
      ease:Quint.easeOut,
      onUpdate:()=>{
        renderer.parallaxX=parallax.x;
        renderer.parallaxY=parallax.y;
      }
    })
  });
}

function generateTextures() {

  textureFgCtx.drawImage(
    TextureImg, 
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
    TextureImg, 
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
