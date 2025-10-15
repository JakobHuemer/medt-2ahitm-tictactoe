import config from '../config.js';
import { play } from '../utils.js';

export default class Block extends EventTarget {

    _element;
    _pos;

    get pos() {
        return this._pos;
    }

    set pos(value) {
        this._pos = value;
    }

    constructor(pos, blockType, x = 0, y = 0, facing = 0, lvl = 1, element) {
        super();

        if (!pos) {
            throw new Error('No pos provided!');
        }


        this._pos = pos;
        this._blockType = blockType;
        this._top = y;
        this._left = x;
        this._facing = facing;
        this._lvl = lvl;

        if (element === null || element === undefined) {
            this._element = document.createElement('img');


            if (!Array.isArray(this._pos) && this._pos.match(/([A|B])N[123456]/g)) {
                let playerBlock = this._pos.match(/AN[123456]/g) ? 'player1Block' : 'player2Block';
                let el = this._element;

                if (config[playerBlock + 'Type'] === 'block') {
                    el.src = config.server + '/images/' + config[playerBlock] + '.png';
                } else if (config[playerBlock + 'Type'] === 'head') {
                    el.src = config.playerHeadApi + config[playerBlock];
                } else {
                    el.src = config[playerBlock];
                }


            } else {
                this._element.src = './assets/img/' + blockType + config.blockFileExtension;
                this._element.alt = blockType;
            }


            this._element.setAttribute('loading', 'lazy');

        } else {
            this._element = element;
        }

        this._element.style.left = this._left / config.canvasWidth * 100 + '%';
        this._element.style.top = this._top / config.canvasHeight * 100 + '%';

        this._element.setAttribute('level', this._lvl + '');
        this._element.style.height = 1 / config.canvasHeight * 100 + '%';

        this._element.style.transform = `rotate(${ this._facing * 90 }deg)`;

        this._element.style.zIndex = 4 + this._lvl + '';
        this._element.classList.add('noselect');
        this._element.setAttribute('draggable', false);
        this._element.onerror = () => {
            if (this._element instanceof HTMLImageElement) {
                this._element.src = "./assets/img/missing_texture.png"
            }
        }
    }

    delete() {
        this._element.remove();
    }

    set lvl(value) {
        this._lvl = value;
    }

    set element(element) {
        if (!this._element) {
            this._element = element;
        }
    }

    setTop(top, ticks = -1) {
        this.#setPos('top', top, config.canvasHeight, ticks);
    }

    setLeft(left, ticks = -1) {
        this.#setPos('left', left, config.canvasWidth, ticks);
    }

    #setPos(prop, propVal, canvasDimension, ticks = -1) {
        this['_' + prop] = propVal;

        let animSpeed = config.TICKS_PER_SECOND / config.tickSpeed * (1000 / config.tickSpeed) * config.pistonTickDuration;

        let animationProperties = {};
        animationProperties[prop] = propVal / canvasDimension * 100 + '%';

        this._element.style.transition = `top ${ config.TICKS_PER_SECOND / config.tickSpeed * (1000 / config.tickSpeed) * config.pistonTickDuration }ms linear, left ${ config.TICKS_PER_SECOND / config.tickSpeed * (1000 / config.tickSpeed) * config.pistonTickDuration }ms linear`;

        if (ticks > 0) {

            setTimeout(() => {

                ticks *= config.TICKS_PER_SECOND / config.tickSpeed;

                this.element.style[prop] = propVal / canvasDimension * 100 + '%';
                const extendedAt = config.TICKS_PER_SECOND / config.TICKS_PER_SECOND * (1000 / config.tickSpeed) * ticks;
                const arrivalAt = config.TICKS_PER_SECOND / config.tickSpeed * (1000 / config.tickSpeed) * config.pistonTickDuration;


                setTimeout(() => {
                    this._element.style.transition = `none`;
                }, extendedAt);


                setTimeout(() => {
                    this.element.style.transition = 'unset';
                    this.element.style[prop] = propVal / canvasDimension * 100 + '%';
                }, arrivalAt);
            }, config.TICKS_PER_SECOND / config.tickSpeed * (1000 / config.tickSpeed));

        } else {
            this._element.style[prop] = propVal / canvasDimension * 100 + '%';
        }

    }


    moveDown(ticks = 2) {
        this.setTop(this._top + 1, ticks);
    }

    moveUp(ticks = 2) {
        this.setTop(this._top - 1, ticks);
    }

    moveRight(ticks = 2) {
        this.setLeft(this._left + 1, ticks);
    }

    moveLeft(ticks = 2) {
        this.setLeft(this._left - 1, ticks);
    }


    get blockType() {
        return this._blockType;
    }

    get top() {
        return this._top;
    }

    get left() {
        return this._left;
    }

    get facing() {
        return this._facing;
    }

    get lvl() {
        return this._lvl;
    }

    get element() {
        return this._element;
    }
}

export class Observer extends Block {

    triggerTimeout = null;

    constructor(pos, x = 0, y = 0, facing = 0, lvl = 1, state = false, element = null) {
        super(pos, 'observer_back', x, y, facing, lvl, element);
        this._state = state;

    }

    trigger() {
        this._element.src = './assets/img/' + this._blockType + '_on' + config.blockFileExtension;

        clearInterval(this.triggerTimeout);
        this.triggerTimeout = setTimeout(() => {
            this._element.src = './assets/img/' + this._blockType + config.blockFileExtension;
        }, config.TICKS_PER_SECOND / config.tickSpeed * 100);

    }
}


export class Piston extends Block {
    constructor(pos, x = 0, y = 0, facing = 0, sticky = false, extended = false, lvl = 1) {
        const elem = document.createElement('div');
        super(pos, 'piston', x, y, facing, lvl, elem);
        this._sticky = sticky;
        this._extended = extended;
        this._element.classList.add('piston');


        this._element.innerHTML = `
            <img loading="lazy" class="piston-base" src="./assets/img/piston_base.png" alt="piston-base">
            <img loading="lazy" class="piston-extender" src="./assets/img/piston_extender${ this._sticky ? '_sticky.png' : '.png' }" alt="piston-extender">
        `;

        this._element.style.height = 1 / config.canvasHeight * 100 * 2 + '%';

        this._element.style.transform = 'translateY(-50%) ' + this._element.style.transform;

        this._element.setAttribute('extended', this._extended);
        this._element.style.width = (parseInt(this._element.style.width) * 2).toString();
        this._element.style.transformOrigin = '50% 75%';
//                                                                                                                              duration of one tick in ms
        this._element.querySelector('.piston-extender').style.transition = `top ${ config.TICKS_PER_SECOND / config.tickSpeed * (1000 / config.tickSpeed) * config.pistonTickDuration }ms linear`;

    }

    extend() {
        this._extended = true;
        this._element.setAttribute('extended', 'true');
        play('piston-out');
    }

    retract() {
        this._element.querySelector('.piston-extender').style.transition = `top ${ config.TICKS_PER_SECOND / config.tickSpeed * (1000 / config.tickSpeed) * config.pistonTickDuration }ms linear`;
        this._element.setAttribute('extended', 'false');
        this._extended = false;
        play('piston-in');
    }

    powerFor(ticks = 2) {
        setTimeout(() => {

            ticks *= config.TICKS_PER_SECOND / config.tickSpeed;

            this.extend();
            const extendedAt = (1000 / config.tickSpeed) * ticks;
            const retractAt = config.TICKS_PER_SECOND / config.tickSpeed * (1000 / config.tickSpeed) * config.pistonTickDuration;

            setTimeout(() => {
                this._element.querySelector('.piston-extender').style.transition = `none`;
            }, extendedAt);

            setTimeout(() => {
                this.retract();
            }, retractAt);
        }, config.TICKS_PER_SECOND / config.tickSpeed * (1000 / config.tickSpeed));
    }

}


export class HoverBlock extends Block {

    errorAnimation = null;

    constructor(pos, x, y, facing, element) {
        super(pos, 'barrier', x, y, facing, 2, element);
        this._element.classList.add('hover-block');
        this._element.setAttribute('pos', pos);

        this._element.addEventListener('click', () => {
            if (this._element.classList.contains('hover-block-disabled')) {
                play("anvil-land")
                this.errorAnimation = this._element.animate([
                    {
                        transform: 'translateX(0%)',
                    },
                    {
                        transform: 'translateX(-3%)',
                    },
                    {
                        transform: 'translateX(4%)',
                    },
                    {
                        transform: 'translateX(-5%)',
                    },

                    {
                        transform: 'translateX(3.5%)',
                    },

                    {
                        transform: 'translateX(-3%)',
                    },

                    {
                        transform: 'translateX(2%)',
                    },

                    {
                        transform: 'translateX(-2%)',
                    },

                    {
                        transform: 'translateX(0%)',
                    },

                ], {
                    duration: 300,
                    iterations: 1,
                    fill: 'forwards',
                });
            }
        });
    }

    setDisabled() {
        this._element.classList.add('hover-block-disabled');
        this._element.src = './assets/img/barrier.png';
    }


    /**
     * @param player {'A'|'B'}
     */
    setPlayer(player) {
        if (this.errorAnimation) {
            this.errorAnimation.cancel()
        }
        let texture;

        let playerBlock = player === 'A' ? 'player1Block' : 'player2Block';

        if (config[playerBlock + 'Type'] === 'block') {
            texture = config.server + '/images/' + config[playerBlock] + '.png';
        } else if (config[playerBlock + 'Type'] === 'head') {
            texture = config.playerHeadApi + config[playerBlock];
        } else {
            texture = config[playerBlock];
        }
        this._element.classList.remove('hover-block-disabled');
        this._element.src = texture
    }

}
