import config from '../config.js';
import { play } from '../utils.js';

export default class MenuButton extends EventTarget {
    content;
    element;
    _computedOutput;
    soundOndClick;

    constructor(content, clickCallback, soundOnClick = true) {

        super();
        this.element = document.createElement('div');
        this.element.classList.add('ui-button');
        this.element.innerHTML = `
            <span class="ui-button-content">${ content }</span>
        `;

        this.element.addEventListener('mousedown', (e) => {
            if (soundOnClick) {
                play('click');
            }
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
     * @param options {Object} - the value will be shown and the key will be given
     * @param configSetOption {string} - the config option to set
     * @param callback {function}
     */
    constructor(content, options, configSetOption, callback) {

        if (Object.keys(options).length === 0) {
            console.log(options)
            throw new Error('Options musst not be of size 0');
        }


        super(content, () => {
            this.currentIndex++;


            if (this.currentIndex >= Object.keys(options).length) {
                this.currentIndex = 0;
            }

            this.value = Object.keys(options)[this.currentIndex];
            config[this.configSetOption] = options[this.value];
            this.computedOutput = this.content + ': ' + this.value;
            if (typeof callback === 'function') {
                callback();
            }

        });


        if (config[configSetOption] !== null && config[configSetOption] !== undefined) {
            console.log("Already Exists")
            let tempIndex = 0;
            this.value = Object.keys(options).find(k => {
                console.log("K", options[k])
                console.log("TEST", config[configSetOption])
                tempIndex++;
                return options[k] == config[configSetOption];
            })

            console.log('tempIndex', tempIndex);

            console.log(this.value)
            this.currentIndex = tempIndex - 1;
        } else {
            this.value = Object.keys(options)[0];
            config[configSetOption] = options[this.value];
        }

        if (!this.currentIndex) {
            this.currentIndex = 0;
        }

        this.options = options;
        this.configSetOption = configSetOption;


        config[configSetOption] = options[this.value];
        this.computedOutput = this.content + ': ' + this.value;

    }
}


export class MenuSlider extends MenuButton {
    startValue;
    endValue;
    value;
    sliderElement;
    multiplier;

    /**
     * @param content {string} - string with the value as %v
     * @param configSetOption {string} - the config option to set
     * @param from {number}
     * @param to {number}
     * @param callback
     * @param multiplier
     */
    constructor(content, configSetOption, from, to, callback, multiplier = 1) {
        super(' ', () => {}, false);


        this.startValue = from;
        this.endValue = to;
        this.multiplier = multiplier;


        if (config[configSetOption] !== null && config[configSetOption] !== undefined) {
            this.value = config[configSetOption] / this.multiplier;
        } else {
            this.value = this.startValue;
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
            config[configSetOption] = this.value * this.multiplier;
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