import MenuButton, { MenuButtonCycle, MenuSlider } from './models/menubutton.js';
import Ui from './ui.js';
import config from './config.js';
import InputField from './models/inputfield.js';
import { testAudio } from './utils.js';

export class Page {
    ui;

    constructor(ui, title, elements) {
        this.ui = ui;

        if (!ui instanceof Ui) {
            throw Error('Ui musst be of type Ui');
        }

        this.element = document.createElement('div');


        this.title = title;
        this.titleElement = document.createElement('div');
        this.titleElement.classList.add('menu-title');
        this.titleElement.innerHTML = this.title;

        this.element.appendChild(this.titleElement);

        this.wrapper = document.createElement('div');
        this.element.classList.add('ui-page');
        this.wrapper.classList.add('ui-inner-wrapper');
        this.element.appendChild(this.wrapper);

        this.addElements(elements);
    }


    async addElements(elements) {

        for (const item of elements) {
            if (item instanceof MenuButton) {
                this.wrapper.appendChild(item.element);
            } else if (item instanceof Promise) {
                const resolvedItem = await item;
                this.wrapper.appendChild(resolvedItem);
            } else {
                this.wrapper.appendChild(item);
            }
        }
    }
}

export class HomePage extends Page {

    constructor(ui) {

        let img = document.createElement('img');
        img.src = '/assets/img/gui/title-' + (config.darkMode ? 'dark' : 'light') + '.png';

        super(ui, `<img src='/assets/img/gui/title-${ config.darkMode ? 'dark' : 'light' }.png' alt="Minecraft Title">`, [
            // img,
            document.createElement('div'),
            document.createElement('div'),
            document.createElement('div'),
            new MenuButton('Local', () => ui.show('local')),
            new MenuButton('Public', () => ui.show('public')),
            new MenuButton('Settings', () => ui.show('settings')),
        ]);


        // this.element.classList.add('ui-page');
        this.wrapper.classList.add('wrapper-main-menu');


        // this.element.appendChild(new MenuButton('Local', () => ui.show('local')).element);
        // this.element.appendChild(new MenuButton('public', () => ui.show('public')).element);
        // this.element.appendChild(new MenuButton('settings', () => ui.show('settings')).element);
    }
}

export class SettingsPage extends Page {
    constructor(ui) {
        super(ui, 'Settings', [
            new MenuSlider('Music: %v%', 'musicVolume', 0, 100, () => {
            }, 0.01),
            new MenuSlider('Effects: %v%', 'volume', 0, 100, () => {
            }, 0.01),
            new MenuSlider('Tickspeed: %v tps', 'tickSpeed', 1, 50, () => {
            }),
            new MenuButton('Appearance', () => ui.show('textures')),

            new MenuButton('Done', () => ui.show(config.redirectAfterSettings)),
        ]);

        this.wrapper.classList.add('wrapper-settings-menu');
    }
}

export class TexturesPage extends Page {
    constructor(ui) {


        super(ui, 'Appearance', [
            TexturesPage.createField('backgroundBlock'),
            TexturesPage.createField('player1Block'),
            TexturesPage.createField('player2Block'),
            new MenuButtonCycle('High Contract Mode', {
                'On': true,
                'Off': false,
            }, 'darkMode', () => {
            }),
            new MenuButton('Done', () => ui.show('settings')),
        ]);
        this.wrapper.classList.add('wrapper-settings-textures-menu');
    }

    static async createField(configTexture) {

        let configTextureToNames = {
            'backgroundBlock': 'Background',
            'player1Block': 'Player 1',
            'player2Block': 'Player 2',
        }

        let firstElement = document.createElement('div');
        firstElement.classList.add('ui-textures-element');
        firstElement.classList.add('ui-textures-element-' + configTexture);

        let span = document.createElement('span');
        span.classList.add('textures-span-' + configTexture);
        span.innerHTML = configTextureToNames[configTexture];

        let img = document.createElement('img');
        img.classList.add('textures-img-p1');
        TexturesPage.updateImage(img, configTexture);

        img.addEventListener("error", e => {
            e.target.src = "/assets/img/missing_texture.png"
        })

        const res = await fetch(config.server + '/texture?q=');
        const data = await res.json();
        let autocompletionData = Object.values(data.images).map(el => el.replace(/.png/g, ''));

        let inputField = new InputField(configTexture, config[configTexture], autocompletionData, () => {
        }, () => {
            TexturesPage.updateImage(img, configTexture);
        });

        let switcher = new MenuButtonCycle('Type',
            {
                'Block': 'block',
                'Head': 'head',
                'Custom': 'custom',
            },
            configTexture + 'Type', () => {
                this.updateImage(img, configTexture);
            });

        firstElement.appendChild(span);
        firstElement.appendChild(inputField.element);
        firstElement.appendChild(switcher.element);
        firstElement.appendChild(img);
        return firstElement;
    }

    static updateImage(img, configTexture) {
        if (config[configTexture + 'Type'] === 'block') {
            img.src = config.server + '/images/' + config[configTexture] + '.png';
        } else if (config[configTexture + 'Type'] === 'head') {
            console.log('HEAD HEAD HEAD');
            img.src = config.playerHeadApi + config[configTexture];
        } else {
            // config.player1BlockType = custom
            img.src = config[configTexture];
        }
    }
}