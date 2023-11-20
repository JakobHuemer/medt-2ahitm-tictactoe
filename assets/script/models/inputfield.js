import config from '../config.js';

export default class InputField {
    _value;
    configSetOption;
    element;
    _autocompletionData;
    inputCallback;
    changeCallback;

    changeCallbackTimeout;

    constructor(configSetOption, placeHolder, autocompletionData, inputCallback, changeCallback) {
        this.configSetOption = configSetOption;
        this._autocompletionData = autocompletionData;


        if (typeof inputCallback === 'function')
            this.inputCallback = inputCallback
        else
            this.inputCallback = () => {}


        if (typeof changeCallback === "function")
            this.changeCallback = changeCallback
        else
            this.changeCallback = () => {}



        this.element = document.createElement('div');
        this.input = document.createElement('input');
        this.input.type = 'text';

        if (placeHolder !== null && placeHolder !== undefined) {
            this.input.placeholder = placeHolder;
        }

        this.element.classList.add('menu-input');

        this.input.classList.add('menu-input-field');

        this.autocompleteElement = document.createElement('span');
        this.autocompleteElement.classList.add('menu-input-autocomplete');

        this.element.appendChild(this.input);
        this.element.appendChild(this.autocompleteElement);


        if (config[configSetOption] !== undefined && config[configSetOption] !== null) {
            this._value = configSetOption[configSetOption];
        } else this.value = '';


        this.element.addEventListener('input', () => {
            // console.log('==================================');
            // console.log(!!this.autocompletionData)
            // console.log(Array.isArray(this.autocompletionData))
            // console.log(this.autocompletionData)
            this.value = this.input.value;

            this.autocomplete();

            if (!!this.changeCallbackTimeout) {
                clearTimeout(this.changeCallbackTimeout)
            }
            this.changeCallbackTimeout = setTimeout(this.changeCallback, 100);
            this.inputCallback(this.input.value);
        });

        this.element.addEventListener('keydown', e => {
            if (e.key === 'Tab') {
                e.preventDefault();

                this.value = this.autocompleteElement.innerHTML;
            }
        });
    }


    set value(value) {
        this._value = value;
        this.input.value = value;
        config[this.configSetOption] = this._value;
    }


    set autocompletionData(value) {
        this._autocompletionData = value;
        this.autocomplete();
    }

    autocomplete() {
        if (!!this._autocompletionData && Array.isArray(this._autocompletionData)) {
            // console.log('TRUE');
            let matches = this._autocompletionData.filter(e => e.toLowerCase().startsWith(this.input.value.toLowerCase()));
            // console.log(matches);
            this.autocompleteElement.innerHTML = !this.input.value ? '' : matches.length > 0 ? matches.sort()[0] : '';
            // console.log('CONFIG: ' + config[this.configSetOption]);
        }
    }

};