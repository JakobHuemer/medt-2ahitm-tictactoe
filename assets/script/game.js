import Maps from './maps.js';

export default class Game extends EventTarget {
    _player1;
    _player2;

    _map;
    _whoHasTurn;

    onTie = () => {}
    onWin = (player) => {}

    constructor(placerName1, playerName2) {
        super();
        this._map = [
            [0, 0, 0,],
            [0, 0, 0,],
            [0, 0, 0,],
        ];

        this._player1 = {
            name: placerName1,
            id: 1,
            points: 0,
        };

        this._player2 = {
            name: playerName2,
            id: 2,
            points: 0,
        };

        this._whoHasTurn = 1;
    }


    place(field) {
        if (this.whoHasTurn === undefined) {
            return false;
        }

        console.log(this.getField(field));
        if (this.getField(field) === 0) {
            console.log("FIELD:", field)
            this.setField(field, this.whoHasTurn);

            if (this.checkWinner(this.whoHasTurn)) {
                this.whoHasTurn === 1 ? this.player1.points++ : this.player2.points++;
                this.onWin(this.whoHasTurn === 1 ? this.player1 : this.player2);
                this.dispatchEvent(new CustomEvent('win', { detail: this.whoHasTurn === 1 ? this.player1 : this.player2 }));
            }
            this._whoHasTurn = Game.rev(this.whoHasTurn);

            if (this.map.filter(item => item === 0).length === 0) {
                this.onTie();
                this.dispatchEvent(new CustomEvent('tie'));
            }

            return true;
        } else {
            return false;
        }
    }

    getField(fieldId) {
        return this.map[fieldId];
    }

    setField(fieldId, toSet) {
        this._map[Math.floor(fieldId / 3)][fieldId % 3] = toSet;
    }


    checkWinner(id) {
        const checks = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];

        for (const check of checks) {
            if (check.every(index => this.getField(index) === id)) {
                return true;
            }
        }
        return false;
    }

    newGame() {
        this.map =[
            [0, 0, 0,],
            [0, 0, 0,],
            [0, 0, 0,],]
        this.whoHasTurn = 1;
    }

    static rev(id) {
        return id === 1 ? 2 : 1;
    }

    get player1() {
        return this._player1;
    }

    set player1(value) {
        this._player1 = value;
    }

    get player2() {
        return this._player2;
    }

    set player2(value) {
        this._player2 = value;
    }

    get map() {
        return [].concat(...this._map);
    }

    set map(value) {
        this._map = value;
    }

    get whoHasTurn() {
        return this._whoHasTurn;
    }

    set whoHasTurn(value) {
        this._whoHasTurn = value;
    }

}
