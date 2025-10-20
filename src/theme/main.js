import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollTrigger,ScrollToPlugin);
import './main.scss';

// https://tympanus.net/codrops/2022/01/19/animate-anything-along-an-svg-path/?utm_source=chatgpt.com
// https://medium.com/%40fibianmejia/creating-a-stunning-delete-effect-with-svg-and-javascript-635e722294d4

// window.addEventListener('load', () => {

//   ScrollTrigger.defaults({
//     scroller: '.entry-content'
//   });

//   ScrollTrigger.create({
//     snap: 1 / 3, // divide el scroll total en 3 secciones iguales
//   });
// });