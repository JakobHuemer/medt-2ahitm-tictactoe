export const feed = {
    0: {
        'A%N6': item => {
            item.moveRight();
        },
        'A%04': item => {
            item.powerFor(2);
        },
    },

    5: {
        'A%N5': item => {
            item.moveDown();
        },
        'A%03': item => {
            item.powerFor(2)
        },
    },

    10: {
        "A%N4": item => {
            item.moveRight()
        },
        "A%N3": item => {
            item.moveRight();
        },
        "A%02": item => {
            item.powerFor(2);
        }
    }
};