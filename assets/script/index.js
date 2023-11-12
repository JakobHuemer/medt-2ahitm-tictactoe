import Canvas from './canvas.js';
import config from './config.js';
import { starterMap } from './maps.js';


const canvasElement = document.querySelector('.canvas');
const bgTiles = document.querySelector('.bg-tiles');

addEventListener('resize', onResize);

function onResize() {
    const boundings = canvasElement.getBoundingClientRect();
    const regularTileSize = boundings.width / 11;
    const xOffset = boundings.left % regularTileSize;
    const yOffset = boundings.top % regularTileSize;

    bgTiles.style.background = `url(/assets/img/${ config.backgroundBlock + config.blockFileExtension }) ${ xOffset }px ${ yOffset  }px / ${ regularTileSize }px repeat`;
    console.log(regularTileSize);
}

onResize();


const canvas = new Canvas(document.querySelector('#top'), document.querySelector('#bottom'));
console.log(starterMap)
canvas.add(starterMap);
