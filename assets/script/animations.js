const feedNewBlock = {
    animationTime: 25,
    frames: {
        0: {
            'A%N6': (item, player) => {
                if (player === 'A')
                    item.moveRight(2);
                else
                    item.moveLeft(2);
            },
            'A%04': (item, player) => {
                item.powerFor(2);
            },
            'A%04-O': item => {
                item.trigger();
            },
        },

        7: {
            'A%N5': (item, player) => {
                if (player === 'A')
                    item.moveDown(2);
                else
                    item.moveUp(2);
            },
            'A%03': (item, player) => {
                item.powerFor(2);
            },
            'A%03-O': item => {
                item.trigger();
            },
        },

        14: {
            'A%N4': (item, player) => {
                if (player === 'A')
                    item.moveRight(2);
                else
                    item.moveLeft(2);
            },
            'A%N3': (item, player) => {
                if (player === 'A')
                    item.moveRight(2);
                else
                    item.moveLeft(2);
            },
            'A%02': (item, player) => {
                item.powerFor(2);
            },
            'A%02-O': item => {
                item.trigger();
            },
        },

        21: {
            'A%N2': (item, player) => {
                if (player === 'A')
                    item.moveUp(2);
                else
                    item.moveDown(2);
            },
            'A%N1': (item, player) => {
                if (player === 'A')
                    item.moveUp(2);
                else
                    item.moveDown(2);
            },
            'A%01': (item, player) => {
                item.powerFor(2);
            },
            'A%01-O': item => {
                item.trigger();
            },
        },
    },
};

const U1 = {
    animationTime: 25,
    frames: {
        7: {
            'DOWN': 'A%N6',
        },
    },
};

const U4 = {
    animationTime: 25,
    frames: {
        5: {
            'A%1': item => {
                item.powerFor();
            },
            'A%N6': (item, player) => {
                if (player === 'A')
                    item.moveDown();
                else
                    item.moveUp();
            },
        },
        10: {
            'DOWN': 'A%N6',
        },
    },
};

const U5 = {
    animationTime: 25,
    frames: {
        ...U4.frames,
        10: {
            'A%4': item => {
                item.powerFor();
            },
            'A%N6': (item, player) => {
                if (player === 'A')
                    item.moveRight();
                else
                    item.moveLeft();
            },
        },
        15: {
            'DOWN': 'A%N6',
        },
    },
};

const U2 = {
    animationTime: 25,

    frames: {
        ...U5.frames,
        12: {
            'A%2': item => {
                item.powerFor(2);
            },
        },
        15: {
            'A%N6': (item, player) => {
                if (player === 'A')
                    item.moveUp(3);
                else
                    item.moveDown(3);
            },
        },
        20: {
            'DOWN': 'A%N6',
        },
    },
};

const U6 = {

    animationTime: 25,

    frames: {
        ...U5.frames,
        12: {
            'B%4': item => {
                item.powerFor(2);
            },
        },
        15: {
            'A%N6': (item, player) => {
                if (player === 'A')
                    item.moveRight(3);
                else
                    item.moveLeft(3);
            },
        },
        20: {
            'DOWN': 'A%N6',
        },
    },
};

const U3 = {

    animationTime: 25,

    frames: {
        ...U6.frames,

        17: {
            'A%3': item => {
                item.powerFor();
            },
        },
        20: {
            'A%N6': (item, player) => {
                if (player === 'A')
                    item.moveUp(3);
                else
                    item.moveDown(3);
            },
        },
        25: {
            'DOWN': 'A%N6',
        },
    },
};

const U7 = {
    animationTime: 25,

    frames: {
        ...U4.frames,
        7: {
            'B%3': item => {
                item.powerFor();
            },
        },
        10: {
            'A%N6': (item, player) => {
                if (player === 'A')
                    item.moveDown(3);
                else
                    item.moveUp(3);

            },
        },
        15: {
            'DOWN': 'A%N6',
        },
    },
};

const U8 = {
    animationTime: 25,

    frames: {
        ...U5.frames,
        12: {
            'B%2': item => {
                item.powerFor();
            },
        },
        15: {
            'A%N6': (item, player) => {
                if (player === 'A')
                    item.moveDown(3);
                else
                    item.moveUp(3);
            },
        },
        20: {
            'DOWN': 'A%N6',
        },
    },
};

const U9 = {
    animationTime: 25,

    frames: {
        ...U6.frames,
        17: {
            'B%1': item => {
                item.powerFor();
            },
        },

        20: {
            'A%N6': (item, player) => {
                if (player === 'A')
                    item.moveDown(3);
                else
                    item.moveUp(3);
            },
        },
        25: {
            'DOWN': 'A%N6',
        },
    },

};


export default {
    feedNewBlock,
    U1,
    U2,
    U3,
    U4,
    U5,
    U6,
    U7,
    U8,
    U9,
};