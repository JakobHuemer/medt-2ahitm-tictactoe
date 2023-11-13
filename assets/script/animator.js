import config from './config.js';

export default class Animator {
    currentAnimation;
    canvas;


    constructor(canvas) {
        this.canvas = canvas;
    }

    animate(keyFrames, player) {

        const singleKeyframeTimeInMillis = config.TICKS_PER_SECOND / config.tickSpeed * 1000 / config.tickSpeed;

        for (const [time, frame] of Object.entries(keyFrames)) {
            console.log('Animating:', time, ' ', frame);
            const timeOut = (config.TICKS_PER_SECOND / config.tickSpeed) * 1000 * time / config.tickSpeed;
            this.keyframe(frame, timeOut, player);
        }
    }

    keyframe(frame, timeout, player) {
        setTimeout(() => {
            console.log('FRAME', frame);
            for (const [itemAnimationName, animation] of Object.entries(frame)) {

                console.log('ItemAnimationName: ' + itemAnimationName);
                console.log('Player', player);


                const toAnimatePlayer = itemAnimationName.split('%')[0];
                console.log('ItemAnimationName: ' + itemAnimationName);


                let itemName = player;


                if (player !== toAnimatePlayer) {
                    itemName = itemAnimationName.replace('A%', 'B').replace('B%', 'A');
                } else {
                    itemName = itemAnimationName.replace('A%', 'A').replace('B%', 'B');
                }

                console.log('New Name', itemName);

                const item = this.canvas.getByPos(itemName);


                console.log('Item', item);
                if (item) {
                    frame[itemAnimationName](item);
                }

            }
        }, timeout);
    }
};