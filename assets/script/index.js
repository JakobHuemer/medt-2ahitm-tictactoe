import Canvas from './canvas.js';
import config from './config.js';
import maps from './maps.js';
import animations from './animations.js';
import Game from './game.js';


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

const canvas = new Canvas(document.querySelector('#top'), document.querySelector('#bottom'), document.querySelector('.game-field'));
const game = Game(config.player1Block, config.player2Block);
canvas.add(maps.starterMap);
canvas.add(maps.gameField);
document.querySelector('h1').innerHTML = config.player1Block + ' is on the move!';

// setTimeout(() => {
//
//
//     canvas.animator.animate(animations[0], 'A', 'main');
//     canvas.animator.animate(animations[4], 'A', 'test');
//
//     canvas.animator.addEventListener('animationdone', (e) => {
//         console.log("THIS SIDHIAHDIAHWDWADHAWDHIHDAW")
//         console.log("THIS SIDHIAHDIAHWDWADHAWDHIHDAW")
//         console.log("THIS SIDHIAHDIAHWDWADHAWDHIHDAW")
//         console.log("THIS SIDHIAHDIAHWDWADHAWDHIHDAW")
//         console.log("THIS SIDHIAHDIAHWDWADHAWDHIHDAW")
//         console.log(e.detail.animationName);
//         if (e.detail.animationName === 'test') {
//
//             console.log('EWNDNDNANWDN');
//             console.log('EWNDNDNANWDN');
//             console.log('EWNDNDNANWDN');
//             console.log('EWNDNDNANWDN');
//             console.log('EWNDNDNANWDN');
//             console.log('EWNDNDNANWDN');
//             console.log('EWNDNDNANWDN');
//             console.log('EWNDNDNANWDN');
//             console.log('EWNDNDNANWDN');
//             console.log('EWNDNDNANWDN');
//             console.log('EWNDNDNANWDN');
//             console.log('EWNDNDNANWDN');
//             console.log('EWNDNDNANWDN');
//             console.log('EWNDNDNANWDN');
//             console.log('EWNDNDNANWDN');
//             console.log('EWNDNDNANWDN');
//             console.log('EWNDNDNANWDN');
//             console.log('EWNDNDNANWDN');
//             console.log('EWNDNDNANWDN');
//             canvas.feedNewBlock('A', 4);
//         }
//     });
// }, 2000);


// canvas.animator.animate(animations.feedNewBlock, "B", "test")
// canvas.animator.animate(animations.U8, 'B', 'test');



maps.gameField.forEach(block => {
    block.setPlayer('A');
    block.element.addEventListener('click', clickListener);
});


function clickListener(buttonEvent) {
    maps.gameField.forEach(block => {
        block.element.removeEventListener('click', clickListener);
    });

    let fieldId = buttonEvent.target.getAttribute('pos').substring(1);

    console.log('CURRENT PLAYER:', game.getWhoHasTurn() === 1 ? 'A' : 'B');


    canvas.animator.animate(animations.feedNewBlock, game.getWhoHasTurn() === 1 ? 'A' : 'B', 'base');
    canvas.animator.animate(animations['U' + fieldId], game.getWhoHasTurn() === 1 ? 'A' : 'B', 'main');

    console.log(fieldId);
    console.log(canvas.blocks);
    canvas.getByPos('H' + fieldId).setDisabled();
    maps.gameField.forEach(block => {
        if (block.element !== buttonEvent.target) {
            block.setPlayer(game.getWhoHasTurn() === 1 ? 'B' : 'A');
        }
    });
    console.log(canvas.blocks);

    document.querySelector('h1').innerHTML = (game.getWhoHasTurn() === 1 ? config.player2Block : config.player1Block) + ' is on the move!';

    canvas.animator.addEventListener('animationdone', e1 => {
        console.log("ANIMATION DONE WITH: " + e1.detail.animationName)
        if (e1.detail.animationName === 'main') {
            canvas.feedNewBlock(game.getWhoHasTurn() === 1 ? 'A' : 'B', fieldId);
            console.log("EVENENNENVENNENNEVEVEVEV")
            console.log(game.getWhoHasTurn())
            game.place(parseInt(fieldId) - 1);
            console.log(game.getWhoHasTurn())

            maps.gameField.forEach(block => {
                if (block._element !== buttonEvent.target) {
                    block.element.addEventListener('click', clickListener);
                }
            });
        }
    });

}

game.emitter.addEventListener('win', e => {
    console.log(e.detail);
    document.querySelector('h1').innerHTML = e.details.winner.name + ' won the game!';
});




