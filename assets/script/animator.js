import config from './config.js';
import { play } from './utils.js';

export default class Animator extends EventTarget {
    currentAnimation;
    canvas;


    constructor(canvas) {
        super();
        this.canvas = canvas;
    }

    animate(animation, player, name = "") {

        const keyFrames = animation.frames;
        let maxTime = 0;
        const singleKeyframeTimeInMillis = config.TICKS_PER_SECOND / config.tickSpeed * 1000 / config.tickSpeed;

        for (const [time, frame] of Object.entries(keyFrames)) {
            const timeOut = (config.TICKS_PER_SECOND / config.tickSpeed) * 1000 * time / config.tickSpeed;
            this.keyframe(frame, timeOut, player);
            maxTime = Math.max(maxTime, time);
        }

        if (animation.animationTime) {
            maxTime = animation.animationTime;
        }

        setTimeout(() => {
            this.dispatchEvent(new CustomEvent('animationdone', { detail: { animationName: name } }));
        }, (maxTime + 4) * config.TICKS_PER_SECOND / config.tickSpeed * (1000 / config.tickSpeed));
    }

    keyframe(frame, timeout, player) {

        const specialNames = ['DOWN', 'UP'];

        setTimeout(() => {
            for (let [itemAnimationName, animation] of Object.entries(frame)) {
                let checked = false;

                let transferredName = itemAnimationName;

                specialNames.forEach(specialName => {
                    if (specialName.toUpperCase() === transferredName.toUpperCase()) {
                        checked = true;
                        transferredName = animation;
                        // console.log('CHECKED TRUE ');
                    }
                });

                const toAnimatePlayer = transferredName.split('%')[0];
                let itemName = player;


                /*
                *
                * player: A true
                * toAnim: B false
                * repl: %A - B true
                * repl: %B - A false
                *
                * player: A false
                * toAnim: A false
                * repl: %A - A false
                * repl: %B - B true
                *
                * player: B true
                * toAnim: A false
                * repl: %A - B true
                * repl: %B - A false
                *
                * player: B true
                * toAnim: B true
                * repl: %A - A false
                * repl: %B - B false
                *
                * XOR
                * */
                // console.log(player)
                // console.log(player)
                // console.log(player)
                // console.log(player)
                // console.log(player)
                // console.log(player)
                // console.log(player)
                // console.log(player)
                // console.log(player)
                // console.log(player)
                // console.log("-----------------------------------");
                // console.log(itemAnimationName);
                // console.log("------------------------")

                console.log("----------------------------------------")
                console.log(player);
                console.log(toAnimatePlayer);
                if (player === 'A' && toAnimatePlayer === 'A') {
                    itemName = transferredName.replace(/A%/g, "A");
                } else if (player === 'A' && toAnimatePlayer === 'B') {
                    itemName = transferredName.replace(/B%/g, 'B');
                } else if (player === 'B' && toAnimatePlayer === 'A') {
                    itemName = transferredName.replace(/A%/g, 'B');
                } else if (player === 'B' && toAnimatePlayer === 'B') {
                    itemName = transferredName.replace(/B%/g, 'A');
                }


                const item = this.canvas.getByPos(itemName);
                console.log('itemName:', itemName);

                if (item) {
                    if (checked) {
                        switch (itemAnimationName.toUpperCase()) {
                            case 'UP':
                                this.canvas.toLayer(item, 1);
                                break;
                            case 'DOWN':
                                this.canvas.toLayer(item, 0);
                                break;
                        }
                        // return
                        continue;
                    }


                    frame[transferredName](item, itemName.charAt(0));
                } else {
                    throw new Error(`Item with pos ${ itemName } does not exist`);
                }

            }
        }, timeout);
    }
};