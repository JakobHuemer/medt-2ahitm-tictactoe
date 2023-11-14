export default (playerName1, playerName2) => {


    let emitter = new EventTarget();


    const player1 = {
        name: playerName1,
        id: 1,
    };

    const player2 = {
        name: playerName2,
        id: 2,
    };

    const map = [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
    ];

    let whoHasTurn = 1; // id


    /**
     *
     * @param field {number} - 0 - 8
     * @return {boolean}
     */

    function place(field) {


        if (map[field] === 0) {
            map[field] = whoHasTurn;

            if (checkWinner(whoHasTurn)) {
                emitter.dispatchEvent(new CustomEvent('win', {
                    detail: {
                        winner: whoHasTurn === 1 ? player1 : player2,
                    },
                }));
                emitter = new EventTarget();
            }
            whoHasTurn = rev(whoHasTurn);

            return true;
        } else {
            return false;
        }
    }

    function getWhoHasTurn() {
        return whoHasTurn;
    }


    function checkWinner(id) {
        const checks = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];

        for (const check of checks) {
            if (check.every(index => map[index] === id)) {
                return true;
            }
        }
        return false;
    }

    function rev(id) {
        return id === 1 ? 2 : 1;
    }

    return {
        emitter,
        player1,
        player2,
        place,
        rev,
        getWhoHasTurn,
    };

}