import Canvas from './canvas.js';
import config from './config.js';
import { starterMap } from './maps.js';
import { feed } from './animations.js';


const canvasElement = document.querySelector('.canvas');
const bgTiles = document.querySelector('.bg-tiles');

addEventListener('resize', onResize);

function onResize() {
    const boundings = canvasElement.getBoundingClientRect();
    const regularTileSize = boundings.width / 11;
    const xOffset = boundings.left % regularTileSize;
    const yOffset = boundings.top % regularTileSize;

    bgTiles.style.background = `url(/assets/img/${ config.backgroundBlock + config.blockFileExtension }) ${ xOffset }px ${ yOffset }px / ${ regularTileSize }px repeat`;
    console.log(regularTileSize);
}

onResize();


const canvas = new Canvas(document.querySelector('#top'), document.querySelector('#bottom'));
console.log(starterMap);
canvas.add(starterMap);

let temp = false;
setTimeout(() => {
    // canvas.animator.animate(feed, 'A');
}, 1000);

setInterval(() => {

    // canvas.getByPos('A5').powerFor(2);
    // canvas.getByPos('A04').extend();
    canvas.getByPos('OA5').trigger();
        canvas.getByPos('A04').powerFor(2);

    // canvas.getByPos("AN6").moveDown()



    // canvas.getByPos('A04').extend();

    canvas.getByPos('AN6')?.moveRight();

    setTimeout(() => {

        canvas.getByPos('A04').powerFor(2);

        setTimeout(() => {
            canvas.getByPos('AN6')?.moveLeft();
        }, 200)
    }, 3000);
}, 6000);