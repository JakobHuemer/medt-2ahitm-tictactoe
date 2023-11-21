import MenuButton, { MenuButtonCycle, MenuSlider } from './models/menubutton.js';
import Ui from './ui.js';
import config from './config.js';
import InputField from './models/inputfield.js';
import { testAudio } from './utils.js';


export class Page extends EventTarget {
    ui;

    constructor(ui, title, elements) {
        super();
        this.ui = ui;

        if (!ui instanceof Ui) {
            throw Error('Ui musst be of type Ui');
        }

        this.element = document.createElement('div');


        this.title = title;
        this.titleElement = document.createElement('span');
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
            if (!item) {
                console.log('CONTINUED');
                continue;
            }
            if (item instanceof MenuButton || item instanceof InputField) {
                this.wrapper.appendChild(item.element);
            } else if (item instanceof Promise) {
                const resolvedItem = await item;
                this.wrapper.appendChild(resolvedItem);
            } else {

                this.wrapper.appendChild(item);
            }
        }
    }

    onShow() {

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
            new MenuButton('Settings', () => {
                config.redirectAfterSettings = 'homepage';
                ui.show('settings');
            }),
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
                if (config.currentlyPlayingBackgroundMusic) {
                    config.currentlyPlayingBackgroundMusic.volume = config.musicVolume;
                }
            }, () => {
                if (config.currentlyPlayingBackgroundMusic) {
                    console.log("CHANGE")
                    config.currentlyPlayingBackgroundMusic.volume = config.musicVolume;
                }
            }, 0.01),
            new MenuSlider('Effects: %v%', 'volume', 0, 100, () => {
            }, () => {
            }, 0.01),
            new MenuSlider('Tickspeed: %v tps', 'tickSpeed', 1, 50, () => {
            }),
            new MenuButton('Appearance', () => ui.show('appearance')),

            new MenuButton('Done', () => ui.show(config.redirectAfterSettings)),
        ]);

        this.wrapper.classList.add('wrapper-settings-menu');
    }
}

export class AppearancePage extends Page {
    constructor(ui) {


        super(ui, 'Appearance', [
            AppearancePage.createField('backgroundBlock'),
            AppearancePage.createField('player1Block'),
            AppearancePage.createField('player2Block'),
            new MenuButtonCycle('Show own Player 2 profile picture', {
                'On': true,
                'Off': false,
            }, 'displayOwnConfigurationOnPublic', () => {
            }),
            new MenuButtonCycle('High Contract Mode', {
                'On': true,
                'Off': false,
            }, 'darkMode', () => {
                config.texturesChanged = true;
            }),

            new MenuButton('Done', () => {
                if (config.texturesChanged) {
                    this.dispatchEvent(new Event('reloadUI'));
                }
                ui.show('settings');

            }),
        ]);
        this.wrapper.classList.add('wrapper-settings-textures-menu');
    }

    static async createField(configTexture) {

        let configTextureToNames = {
            'backgroundBlock': 'Background',
            'player1Block': 'Player 1',
            'player2Block': 'Player 2',
        };

        let firstElement = document.createElement('div');
        firstElement.classList.add('ui-textures-element');
        firstElement.classList.add('ui-textures-element-' + configTexture);

        let span = document.createElement('span');
        span.classList.add('textures-span-' + configTexture);
        span.innerHTML = configTextureToNames[configTexture];

        let img = document.createElement('img');
        img.classList.add('textures-img-p1');
        AppearancePage.updateImage(img, configTexture);

        img.addEventListener('error', e => {
            e.target.src = '/assets/img/missing_texture.png';
        });

        const res = await fetch(config.server + '/texture?q=');
        const data = await res.json();
        let autocompletionData = Object.values(data.images).map(el => el.replace(/.png/g, ''));

        let inputField = new InputField(configTexture, config[configTexture], autocompletionData, () => {
        }, () => {
            config.texturesChanged = true;
            AppearancePage.updateImage(img, configTexture);
        });

        let switcher = new MenuButtonCycle('Type',
            {
                'Block': 'block',
                'Head': 'head',
                'Custom': 'custom',
            },
            configTexture + 'Type', () => {
                config.texturesChanged = true;
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


export class EscapeMenuPage extends Page {
    constructor(ui) {
        super(ui, '', [
            new MenuButton('Back to game', () => ui.show('none')),
            new MenuButton('Leave', () => {
                // TODO: IMPLEMENT LEAVE FROM ONLINE GAME AND REFRESH PAGE ON LOCAL
                ui.show('none');
                console.log('IMPLEMENT');
            }),
            new MenuButton('Settings', () => {
                config.redirectAfterSettings = 'escapemenu';
                ui.show('settings');
            }),
        ]);
    }
}


export class LocalGamePage extends Page {
    constructor(ui) {

        let tempDownElement = document.createElement('div');
        tempDownElement.classList.add('ui-create-down-container');
        tempDownElement.appendChild(
            new MenuButton('Cancel', () => ui.show('homepage')).element,
        );

        tempDownElement.appendChild(
            new MenuButton('Create', () => ui.show('none')).element,
        );

        super(ui, 'Create local game', [
            new InputField('player1Name', config.player1Name, [], () => {
            }, () => {
            }),
            new InputField('player2Name', config.player2Name, [], () => {
            }, () => {
            }),
            tempDownElement,
            // new MenuButton('Cancel', () => ui.show('homepage')).element,
            // new MenuButton('Create', () => ui.show('none')).element,

        ]);


    }
}