import config from '../config.js';

export default class Block {

    _element;
    _pos

    get pos() {
        return this._pos;
    }

    set pos(value) {
        this._pos = value;
    }

    constructor(pos ,blockType, x = 0, y = 0, facing = 0, lvl = 1, element) {
        if (!pos) {
            throw new Error('No pos provided!');
        }



        this._blockType = blockType;
        this._top = y;
        this._left = x;
        this._facing = facing;
        this._lvl = lvl;

        // console.log('-------------------------------');
        // console.log(document.createElement('div'));
        // console.log('ELEMENT');
        // console.log(element);
        if (element === null || element === undefined) {
            this._element = document.createElement('img');

            this._element.src = '/assets/img/' + blockType + config.blockFileExtension;
            this._element.alt = blockType;

            // console.log('This element created');
        } else {
            // console.log('This element already exists');
            this._element = element;
        }

        this._element.style.left = this._left / config.canvasWidth * 100 + '%';
        this._element.style.top = this._top / config.canvasHeight * 100 + '%';

        this._element.setAttribute('level', this._lvl + '');
        this._element.style.height = 1 / config.canvasHeight * 100 + '%';

        this._element.style.transform = `rotate(${ this._facing * 90 }deg)`;

        this._element.style.zIndex = 4 + this._lvl + '';
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

    setTop(top) {
        this.#setPos('top', top, config.canvasHeight);
    }

    setLeft(left) {
        this.#setPos('left', left, config.canvasWidth);
    }

    #setPos(prop, propVal, canvasDimension) {
        this['_' + prop] = propVal;

        let animSpeed = config.pistonTickDuration / (config.tickSpeed / config.ticksPerSecond);

        let animationProperties = {};
        animationProperties[prop] = propVal / canvasDimension * 100 + '%';

        // console.log(animationProperties);
        // console.log('Animspeed: ' + animSpeed);


        this._element.animate([animationProperties], {
            fill: 'forwards',
            duration: animSpeed * 100,
            iterations: 1,
            easing: 'linear',
        });

    }

    moveDown() {
        this.setTop(this._top + 1);
    }

    moveUp() {
        this.setTop(this._top - 1);
    }

    moveRight() {
        this.setLeft(this._left + 1);
    }

    moveLeft() {
        this.setLeft(this._left - 1);
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

        // console.log(this._element);
    }

    trigger() {
        // console.log('TRIGGER: ' + (config.tickSpeed / config.ticksPerSecond * 100));
        this._element.src = '/assets/img/' + this._blockType + '_on' + config.blockFileExtension;

        clearInterval(this.triggerTimeout);
        this.triggerTimeout = setTimeout(() => {
            this._element.src = 'assets/img/' + this._blockType + config.blockFileExtension;
        }, config.tickSpeed / config.ticksPerSecond * 100);

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
            <img class="piston-base" src="/assets/img/piston_base.png" alt="piston-base">
            <img class="piston-extender" src="/assets/img/piston_extender${ this._sticky ? '_sticky.png' : '.png' }" alt="piston-extender">
        `;

        this._element.style.height = 1 / config.canvasHeight * 100 * 2 + '%';

        this._element.style.transform = 'translateY(-50%) ' + this._element.style.transform;

        this._element.setAttribute('extended', this._extended);
        // this._element.setAttribute('extended', "true");

        this._element.style.width = (parseInt(this._element.style.width) * 2).toString();
        this._element.style.transformOrigin = '50% 75%';

        this._element.querySelector('.piston-extender').style.transition = `top ${ config.tickSpeed / config.ticksPerSecond * 100 * config.pistonTickDuration }ms linear`;
    }

    extend() {
        this._element.setAttribute('extended', 'true');
    }

    retract() {
        this._element.setAttribute('extended', 'false');
    }
}