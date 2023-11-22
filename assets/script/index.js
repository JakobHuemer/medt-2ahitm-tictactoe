import config from './config.js';
import { loadUI, play, preloadImages } from './utils.js';
import { GameManager } from './gamemanager.js';

let soundTracks = [
    'MiceOnVenus',
    'Minecraft',
    'Minecraft',
    'SubwooferLullaby',
];

async function playBackgroundMusic() {
    let newSoundTrack = "soundtracks/SubwooferLullaby";
    // let newSoundTrack = "soundtracks/" + soundTracks[Math.floor(Math.random() * soundTracks.length)];
    play(newSoundTrack, "musicVolume", playBackgroundMusic)
}

playBackgroundMusic()


if (config.darkMode) {
    document.querySelector('.ui-loading-screen').classList.add('dark');
    document.querySelector('.ui-loading-screen .progress-bar').classList.add('dark');
}

const gameManager = new GameManager()
let UI = gameManager.ui;
// let UI = loadUI();



// const canvas = new Canvas(document.querySelector('#top'), document.querySelector('#bottom'), document.querySelector('.game-field'));
// const game = Game(config.player1Block, config.player2Block);
// canvas.add(maps.starterMap);
// canvas.add(maps.gameField);
// document.querySelector('h1.canvas-title').innerHTML = game.player1.name + ' is on the move!';

// const UI = new Ui()
//
// UI.addPage('homepage', new HomePage(UI).element);
// UI.addPage("settings", new SettingsPage(UI).element)
// UI.addPage("appearance", new AppearancePage(UI).element)
// UI.addPage('escapemenu', new EscapeMenuPage(UI).element);
// UI.show('homepage');




//
// // document.querySelector(".wrapper").appendChild(tempButton.element)
//
// const tempButtonSlider = new MenuSlider('Size: %v%', 'size', 1, 40, 1);
// // document.querySelector('.wrapper').appendChild(tempButtonSlider.element);
//
// const inputField = new InputField('testingSomeOtherOption', 'Player1', ['concrete', 'orange', 'purple', 'cat', 'cell', 'console']);
// // inputField.autocomplete("something")
// // document.querySelector(".wrapper").appendChild(inputField.element)

//
//
// function createGame() {
//     maps.gameField.forEach(block => {
//         block.setPlayer('A');
//         block.element.addEventListener('click', clickListener);
//     });
//
//
//     function clickListener(buttonEvent) {
//         maps.gameField.forEach(block => {
//             block.element.removeEventListener('click', clickListener);
//             block.setDisabled();
//         });
//
//         let fieldId = buttonEvent.target.getAttribute('pos').substring(1); // 1 - 9
//
//         let translatedFieldId = game.getWhoHasTurn() === 1 ? fieldId : 10 - parseInt(fieldId);
//         console.log('Translated field:', translatedFieldId);
//
//         console.log('Player: ' + (game.getWhoHasTurn() === 1 ? 'B' : 'A'));
//         canvas.animator.animate(animations.feedNewBlock, game.getWhoHasTurn() === 1 ? 'A' : 'B', 'base');
//         canvas.animator.animate(animations['U' + translatedFieldId], game.getWhoHasTurn() === 1 ? 'A' : 'B', 'main');
//
//         canvas.getByPos('H' + fieldId).setDisabled();
//
//
//         canvas.animator.addEventListener('animationdone', e1 => {
//
//             if (e1.detail.animationName === 'main') {
//                 canvas.feedNewBlock(game.getWhoHasTurn() === 1 ? 'A' : 'B', fieldId);
//                 document.querySelector('h1.canvas-title').innerHTML = (game.getWhoHasTurn() === 1 ? game.player2.name : game.player1.name) + ' is on the move!';
//
//                 game.place(parseInt(fieldId) - 1);
//                 // console.log(game.map);
//
//                 for (let i = 0; i < 9; i++) {
//                     let elem = canvas.getByPos('H' + (i + 1));
//                     if (game.map[i] === 0) {
//                         elem.setPlayer(game.getWhoHasTurn() === 1 ? 'A' : 'B');
//                         elem.element.addEventListener('click', clickListener);
//                     } else {
//                         elem.setDisabled();
//                         elem.element.removeEventListener('click', clickListener);
//                         // elem.element.removeEventListener('click', this);
//                     }
//                 }
//             }
//         });
//     }
//
//
//     game.emitter.addEventListener('win', e => {
//         console.log(e.detail);
//         document.querySelector('h1.canvas-title').innerHTML = e.detail.winner.name + ' won the game!';
//         game.newGame();
//         document.querySelector('.game-field').remove();
//     });
//
//
//     game.emitter.addEventListener('tie', e => {
//         console.log(e);
//         document.querySelector('h1.canvas-title').innerHTML = 'It\'s a tie!';
//         game.newGame();
//         document.querySelector('.game-field').remove();
//     });
//
// }
