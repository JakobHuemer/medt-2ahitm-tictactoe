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


maps.gameField.forEach(block => {
    block.setPlayer('A');
    block.element.addEventListener('click', clickListener);
});


function clickListener(buttonEvent) {
    maps.gameField.forEach(block => {
        block.element.removeEventListener('click', clickListener);
        block.setDisabled();
    });

    let fieldId = buttonEvent.target.getAttribute('pos').substring(1); // 1 - 9

    let translatedFieldId = game.getWhoHasTurn() === 1 ? fieldId : 10 - parseInt(fieldId);
    console.log('Translated field:', translatedFieldId);

    console.log('Player: ' + (game.getWhoHasTurn() === 1 ? 'B' : 'A'));
    canvas.animator.animate(animations.feedNewBlock, game.getWhoHasTurn() === 1 ? 'A' : 'B', 'base');
    canvas.animator.animate(animations['U' + translatedFieldId], game.getWhoHasTurn() === 1 ? 'A' : 'B', 'main');

    canvas.getByPos('H' + fieldId).setDisabled();


    canvas.animator.addEventListener('animationdone', e1 => {

        if (e1.detail.animationName === 'main') {
            canvas.feedNewBlock(game.getWhoHasTurn() === 1 ? 'A' : 'B', fieldId);
            document.querySelector('h1').innerHTML = (game.getWhoHasTurn() === 1 ? config.player2Block : config.player1Block) + ' is on the move!';

            game.place(parseInt(fieldId) - 1);
            // console.log(game.map);

            for (let i = 0; i < 9; i++) {
                let elem = canvas.getByPos('H' + (i + 1));
                if (game.map[i] === 0) {
                    elem.setPlayer(game.getWhoHasTurn() === 1 ? 'A' : 'B');
                    elem.element.addEventListener('click', clickListener);
                } else {
                    elem.setDisabled();
                    elem.element.removeEventListener('click', clickListener);
                    // elem.element.removeEventListener('click', this);
                }
            }
        }
    });
}


game.emitter.addEventListener('win', e => {
    console.log(e.detail);
    document.querySelector('h1').innerHTML = e.detail.winner.name + ' won the game!';
    game.newGame();
});


game.emitter.addEventListener("tie", e => {
    console.log(e);
    document.querySelector('h1').innerHTML = 'It\'s a tie!';
    game.newGame();
})

