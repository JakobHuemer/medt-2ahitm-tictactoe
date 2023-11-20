import config from '../config.js';
import { play } from '../utils.js';

export default class MenuButton extends EventTarget {
    content;
    element;
    _computedOutput;

    constructor(content, clickCallback) {
        super();
        this.element = document.createElement('div');
        this.element.classList.add('ui-button');
        this.element.innerHTML = `
            <span class="ui-button-content">${ content }</span>
        `;

        this.element.addEventListener('mousedown', (e) => {
            if (typeof clickCallback === 'function') {
                clickCallback(e);
            }
        });
        this.content = content;
    }

    set computedOutput(value) {
        this._computedOutput = value;
        this.element.querySelector('.ui-button-content').innerHTML = this._computedOutput;
    }

};


export class MenuButtonCycle extends MenuButton {
    options;
    configSetOption;
    value;

    /**
     *
     * @param content
     * @param options {Map} - the value will be shown and the key will be given
     * @param configSetOption {string} - the config option to set
     * @param callback {function}
     */
    constructor(content, options, configSetOption, callback) {

        if (options.size === 0) {
            throw new Error('Options musst not be of size 0');
        }

        super(content, () => {
            this.currentIndex++;

            play('click');

            if (this.currentIndex >= this.options.size) {
                this.currentIndex = 0;
            }

            config[configSetOption] = Array.from(options.values())[this.currentIndex];
            this.value = Array.from(options.keys())[this.currentIndex];
            this.computedOutput = this.content + ': ' + this.value;
            if (typeof callback === 'function') {
                callback();
            }

        });


        if (config[configSetOption] !== null && config[configSetOption] !== undefined) {
            this.value = config[configSetOption];
        } else {
            this.value = Array.from(options.keys())[0];
        }

        if (!this.currentIndex) {
            this.currentIndex = 0;
        }

        this.options = options;
        this.configSetOption = configSetOption;


        config[configSetOption] = this.value;
        this.computedOutput = this.content + ': ' + this.value;

    }
}


export class MenuSlider extends MenuButton {
    startValue;
    endValue;
    stepSize;
    value;
    sliderElement;

    /**
     * @param content {string} - string with the value as %v
     * @param configSetOption {string} - the config option to set
     * @param from {number}
     * @param to {number}
     * @param step {number}
     */
    constructor(content, configSetOption, from, to, step, callback) {
        super(' ');


        this.startValue = from;
        this.endValue = to;
        this.stepSize = step;


        if (config[configSetOption] !== null && config[configSetOption] !== undefined) {
            console.log('DEFINED');
            this.value = config[configSetOption];
        } else {
            this.value = this.startValue;
            console.log('NEW INIT VALUE:', this.startValue);
        }

        this.content = content;
        this.element.classList.add('menu-slider');
        this.sliderElement = document.createElement('input');
        this.sliderElement.type = 'range';
        this.sliderElement.min = this.startValue;
        this.sliderElement.max = this.endValue;
        this.sliderElement.value = this.value;
        this.sliderElement.classList.add('menu-slider-slider');
        this.element.appendChild(this.sliderElement);

        this.computedOutput = this.content.replace(/%v/, this.value);


        this.sliderElement.addEventListener('change', () => {
            this.value = this.sliderElement.value;
            config[configSetOption] = this.value;
            this.computedOutput = this.content.replace(/%v/g, this.value);
            play('click');

            if (typeof callback === 'function') {
                callback();
            }
        });

        this.sliderElement.addEventListener('input', () => {
            this.value = this.sliderElement.value;
            this.computedOutput = this.content.replace(/%v/g, this.value);
        });
    }

}