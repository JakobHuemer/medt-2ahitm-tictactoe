export default class Game extends EventTarget {
    _player1;
    _player2;

    _map;
    _whoHasTurn;

    constructor(placerName1, playerName2) {
        super();
        this._map = [
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
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
        console.log('PLACE');
        console.log("----------------------------------------------------------")
        if (this.whoHasTurn === undefined) {
            return false;
        }

        if (this.map[field] === 0) {
            this.map[field] = this.whoHasTurn;

            if (this.checkWinner(this.whoHasTurn)) {
                this.whoHasTurn === 1 ? this.player1.points++ : this.player2.points++;
                this.dispatchEvent(new CustomEvent('win', { detail: this.whoHasTurn === 1 ? this.player1 : this.player2 }));
                console.log("DISPATCHING EVENT ")
                console.log("DISPATCHING EVENT ")
                console.log("DISPATCHING EVENT ")
                console.log("DISPATCHING EVENT ")
                console.log("DISPATCHING EVENT ")
                console.log("DISPATCHING EVENT ")
                console.log("DISPATCHING EVENT ")
            }
            this._whoHasTurn = Game.rev(this.whoHasTurn);

            if (this.map.filter(item => item === 0).length === 0) {
                this.dispatchEvent(new CustomEvent('tie'));
                console.log("DISPATCHING TIE")
                console.log("DISPATCHING TIE")
                console.log("DISPATCHING TIE")
                console.log("DISPATCHING TIE")
                console.log("DISPATCHING TIE")
                console.log("DISPATCHING TIE")
                console.log("DISPATCHING TIE")
            }

            return true;
        } else {
            return false;
        }
    }


    checkWinner(id) {
        const checks = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];

        for (const check of checks) {
            if (check.every(index => this.map[index] === id)) {
                return true;
            }
        }
        return false;
    }

    newGame() {
        this.map = [0, 0, 0, 0, 0, 0, 0, 0, 0];
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
        return this._map;
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