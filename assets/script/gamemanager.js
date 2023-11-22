import Game from './game.js';
import config from './config.js';
import Canvas from './canvas.js';
import maps from './maps.js';
import animations from './animations.js';
import Ui from './ui.js';
import { AppearancePage, HomePage, LocalGamePage, PostGamePage, SettingsPage } from './pages.js';
import { loadUI } from './utils.js';
import { HoverBlock } from './models/block.js';


export class GameManager extends EventTarget {

    game;
    currentFieldId;

    constructor() {
        super();


        this.game = new Game(config.player1Name, config.player2Name);
        this.canvas = new Canvas(document.querySelector('.canvas #top'),
            document.querySelector('.canvas #bottom'),
            document.querySelector('.canvas .game-field'),
        );

        // this.ui.addEventListener('reloadUI', reload);

        let reload = () => {
            this.ui = loadUI(this);

            this.ui.addEventListener('reloadUI', reload);

            this.ui.addEventListener('local', () => {
                this.ui.hide();

                this.createNewGame();
            });

        };

        reload();

    }


    createNewGame() {
        if (!this.game) {
            console.error('CREATING NEW GAME !!!!!!!!!!!!!!');
            console.error('CREATING NEW GAME !!!!!!!!!!!!!!');
            console.error('CREATING NEW GAME !!!!!!!!!!!!!!');
            console.error('CREATING NEW GAME !!!!!!!!!!!!!!');
            console.error('CREATING NEW GAME !!!!!!!!!!!!!!');
            console.error('CREATING NEW GAME !!!!!!!!!!!!!!');
            console.error('CREATING NEW GAME !!!!!!!!!!!!!!');
            console.error('CREATING NEW GAME !!!!!!!!!!!!!!');
            console.error('CREATING NEW GAME !!!!!!!!!!!!!!');
            console.error('CREATING NEW GAME !!!!!!!!!!!!!!');
            console.error('CREATING NEW GAME !!!!!!!!!!!!!!');
            console.error('CREATING NEW GAME !!!!!!!!!!!!!!');
            console.error('CREATING NEW GAME !!!!!!!!!!!!!!');
            console.error('CREATING NEW GAME !!!!!!!!!!!!!!');
            console.error('CREATING NEW GAME !!!!!!!!!!!!!!');
            console.error('CREATING NEW GAME !!!!!!!!!!!!!!');
            console.error('CREATING NEW GAME !!!!!!!!!!!!!!');
            console.error('CREATING NEW GAME !!!!!!!!!!!!!!');
            console.error('CREATING NEW GAME !!!!!!!!!!!!!!');
            console.error('CREATING NEW GAME !!!!!!!!!!!!!!');
            console.error('CREATING NEW GAME !!!!!!!!!!!!!!');
            console.error('CREATING NEW GAME !!!!!!!!!!!!!!');
            this.game = new Game(config.player1Name, config.player2Name);
        }
        this.game.player1.name = config.player1Name;
        this.game.player2.name = config.player2Name;

        // console.log(JSON.parse(JSON.stringify(this.canvas)));
        this.canvas.clear();
        let i = 0;

        // console.log(JSON.parse(JSON.stringify(this.canvas)));

        let copyOfGameField = maps.gameField.map(subArr => {
            let constructor = subArr[0];
            let args = subArr.slice(1);
            return new (Function.prototype.bind.apply(constructor, [null].concat(args)));
        });

        let copyOfStarterMap = maps.starterMap.map(subArr => {
            let constructor = subArr[0];
            let args = subArr.slice(1);
            return new (Function.prototype.bind.apply(constructor, [null].concat(args)));
        });

        this.canvas.add(copyOfStarterMap);
        this.canvas.add(copyOfGameField);



        document.querySelector('h1.canvas-title').innerHTML = this.game.player1.name + ' is on the move!';

        let clickListener = (buttonEvent) => {
            copyOfGameField.forEach(block => {
                block.element.removeEventListener('click', clickListener);
                block.setDisabled();
            });

            let fieldId = buttonEvent.target.getAttribute('pos').substring(1); // 1 - 9
            this.currentFieldId = fieldId;

            let translatedFieldId = this.game.whoHasTurn === 1 ? fieldId : 10 - parseInt(fieldId);

            this.canvas.animator.animate(animations.feedNewBlock, this.game.whoHasTurn === 1 ? 'A' : 'B', 'base');

            let animationDone = () => {



                this.canvas.feedNewBlock(this.game.whoHasTurn === 1 ? 'A' : 'B');
                document.querySelector('h1.canvas-title').innerHTML = (this.game.whoHasTurn === 1 ? this.game.player2.name : this.game.player1.name) + ' is on the move!';

                this.game.place(parseInt(this.currentFieldId) - 1);

                for (let i = 0; i < 9; i++) {
                    let elem = this.canvas.getByPos('H' + (i + 1));
                    if (this.game.map[i] === 0) {
                        elem.setPlayer(this.game.whoHasTurn === 1 ? 'A' : 'B');
                        elem.element.addEventListener('click', clickListener);
                    } else {
                        elem.setDisabled();
                        elem.element.removeEventListener('click', clickListener);
                        // elem.element.removeEventListener('click', this);
                    }
                }

            };

            this.canvas.animator.animate(animations['U' + translatedFieldId], this.game.whoHasTurn === 1 ? 'A' : 'B', 'main', animationDone);

            this.canvas.getByPos('H' + fieldId).setDisabled();


            // this.canvas.animator.removeEventListener('animationdone', animationDone);
            //
            // if (i === 0) {
            //     // replace eventlistener with callback
            //     this.canvas.animator.addEventListener('animationdone', animationDone);
            // }
            // i++;

        };


        copyOfGameField.forEach(block => {
            block.setPlayer('A');
            block.element.addEventListener('click', clickListener);
        });

        this.canvas.reloadTextures();

        console.log("NOW SETTING ON WIN FUNCTION")

        this.game.onWin = (winner) => {
            document.querySelector('h1.canvas-title').innerHTML = winner.name + ' won the game!';

            postGame();
        }


        this.game.onTie = () => {
            document.querySelector('h1.canvas-title').innerHTML = 'It\'s a tie!';

            postGame();
        }

        let postGame = () => {


            this.ui.show();
            this.ui.removePage('postgamepage');
            this.ui.addPage('postgamepage', new PostGamePage(this.ui));
            console.log(this.ui.pages);
            this.ui.showPage('postgamepage');


            this.ui.rematch = () => {
                this.ui.hide();
                console.log(this.game);
                this.game.newGame();
                console.log(this.game);
                this.createNewGame();
            };

            this.ui.leave = () => {
                this.game = null;
                this.ui.show();
                this.ui.showPage('homepage');
            }
            ;
        };

    };
}

