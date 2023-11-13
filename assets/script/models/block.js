import config from '../config.js';

export default class Block {

  _element;
  _pos;

  get pos() {
    return this._pos;
  }

  set pos(value) {
    this._pos = value;
  }

  constructor(pos, blockType, x = 0, y = 0, facing = 0, lvl = 1, element) {
    if (!pos) {
      throw new Error('No pos provided!');
    }


    this._pos = pos;
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
    // console.log(pos)
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

  setTop(top, ticks = 2) {
    this.#setPos('top', top, config.canvasHeight, ticks = -1);
  }

  setLeft(left, ticks = 2) {
    this.#setPos('left', left, config.canvasWidth, ticks = -1);
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

        console.log('Retract: ' + arrivalAt + '\nExtend: ' + extendedAt);

        setTimeout(() => {
          this._element.querySelector('.piston-extender').style.transition = `none`;
        }, extendedAt);

        console.log('TICKS: ' + config.TICKS_PER_SECOND / config.tickSpeed * (1000 / config.tickSpeed) * ticks);

        setTimeout(() => {
          this.element.style.transition = 'unset';
          this.element.style[prop] = propVal / canvasDimension * 100 + '%';
        }, arrivalAt);
      }, config.TICKS_PER_SECOND / config.tickSpeed * (1000 / config.tickSpeed));

    } else {

      console.log(animationProperties);
      console.log('Animspeed: ' + animSpeed);


      this._element.animate([animationProperties], {
        fill: 'forwards',
        duration: animSpeed,
        iterations: 1,
        easing: 'linear',
      });
    }

  }


  moveDown(ticks) {
    this.setTop(this._top + 1, ticks);
  }

  moveUp(ticks) {
    this.setTop(this._top - 1, ticks);
  }

  moveRight(ticks) {
    this.setLeft(this._left + 1, ticks);
  }

  moveLeft(ticks) {
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

    // console.log(this._element);
  }

  trigger() {
    // console.log('TRIGGER: ' + (config.tickSpeed / config.ticksPerSecond * 100));
    this._element.src = '/assets/img/' + this._blockType + '_on' + config.blockFileExtension;

    clearInterval(this.triggerTimeout);
    this.triggerTimeout = setTimeout(() => {
      this._element.src = 'assets/img/' + this._blockType + config.blockFileExtension;
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
            <img class="piston-base" src="/assets/img/piston_base.png" alt="piston-base">
            <img class="piston-extender" src="/assets/img/piston_extender${ this._sticky ? '_sticky.png' : '.png' }" alt="piston-extender">
        `;

    this._element.style.height = 1 / config.canvasHeight * 100 * 2 + '%';

    this._element.style.transform = 'translateY(-50%) ' + this._element.style.transform;

    this._element.setAttribute('extended', this._extended);
    // this._element.setAttribute('extended', "true");

    this._element.style.width = (parseInt(this._element.style.width) * 2).toString();
    this._element.style.transformOrigin = '50% 75%';
//                                                                                                                              duration of one tick in ms
    console.log();
    this._element.querySelector('.piston-extender').style.transition = `top ${ config.TICKS_PER_SECOND / config.tickSpeed * (1000 / config.tickSpeed) * config.pistonTickDuration }ms linear`;

  }

  extend() {
    this._extended = true;
    this._element.setAttribute('extended', 'true');
  }

  retract() {
    this._element.querySelector('.piston-extender').style.transition = `top ${ config.TICKS_PER_SECOND / config.tickSpeed * (1000 / config.tickSpeed) * config.pistonTickDuration }ms linear`;
    this._element.setAttribute('extended', 'false');
    this._extended = false;
  }

  powerFor(ticks) {
    setTimeout(() => {

      ticks *= config.TICKS_PER_SECOND / config.tickSpeed;

      this.extend();
      const extendedAt = config.TICKS_PER_SECOND / config.TICKS_PER_SECOND * (1000 / config.tickSpeed) * ticks;
      const retractAt = config.TICKS_PER_SECOND / config.tickSpeed * (1000 / config.tickSpeed) * config.pistonTickDuration;

      console.log('Retract: ' + retractAt + '\nExtend: ' + extendedAt);

      setTimeout(() => {
        this._element.querySelector('.piston-extender').style.transition = `none`;
      }, extendedAt);

      console.log('TICKS: ' + config.TICKS_PER_SECOND / config.tickSpeed * (1000 / config.tickSpeed) * ticks);

      setTimeout(() => {
        this.retract();
      }, retractAt);
    }, config.TICKS_PER_SECOND / config.tickSpeed * (1000 / config.tickSpeed));
  }

}