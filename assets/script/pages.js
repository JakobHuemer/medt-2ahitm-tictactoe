import MenuButton, { MenuButtonCycle, MenuSlider } from './models/menubutton.js';
import Ui from './ui.js';
import config from './config.js';
import InputField from './models/inputfield.js';
import { play } from './utils.js';

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
            document.createElement('div'),
            document.createElement('div'),
            document.createElement('div'),
            new MenuButton('Local', () => ui.showPage('local')),
            new MenuButton('Settings', () => {
                config.redirectAfterSettings = 'homepage';
                ui.showPage('settings');
            }),
        ]);

        this.wrapper.classList.add('wrapper-main-menu');

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
                    console.log('CHANGE');
                    config.currentlyPlayingBackgroundMusic.volume = config.musicVolume;
                }
            }, 0.01),
            new MenuSlider('Effects: %v%', 'volume', 0, 100, () => {
            }, () => {
            }, 0.01),
            new MenuSlider('Tickspeed: %v tps', 'tickSpeed', 1, 50, () => {
            }),
            new MenuButton('Appearance', () => ui.showPage('appearance')),

            new MenuButton('Done', () => ui.showPage(config.redirectAfterSettings)),
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

            new MenuButtonCycle('High Contract Mode', {
                'On': true,
                'Off': false,
            }, 'darkMode', () => {
                config.texturesChanged = true;
            }),

            new MenuButton('Done', () => {
                this.ui.dispatchEvent(new Event('reloadUI'));
                ui.showPage('settings');
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
            img.src = config.playerHeadApi + config[configTexture];
        } else {
            img.src = config[configTexture];
        }
    }
}


export class EscapeMenuPage extends Page {
    constructor(ui) {
        super(ui, '', [
            new MenuButton('Back to game', () => ui.showPage('none')),
            new MenuButton('Leave', () => {
                // TODO: IMPLEMENT LEAVE FROM ONLINE GAME AND REFRESH PAGE ON LOCAL
                ui.showPage('none');
            }),
            new MenuButton('Settings', () => {
                config.redirectAfterSettings = 'escapemenu';
                ui.showPage('settings');
            }),
        ]);
    }
}


export class LocalGamePage extends Page {
    constructor(ui) {

        let tempDownElement = document.createElement('div');
        tempDownElement.classList.add('ui-create-down-container');


        let player2 = document.createElement('div');

        tempDownElement.appendChild(
            new MenuButton('Cancel', () => ui.showPage('homepage')).element,
        );

        tempDownElement.appendChild(
            new MenuButton('Create', () => {
                this.ui.dispatchEvent(new Event('local'));
            }).element,
        );

        super(ui, 'Create local game', [
            LocalGamePage.createPlayerInput('player1Name'),
            LocalGamePage.createPlayerInput('player2Name'),

            tempDownElement,
        ]);


    }


    static createPlayerInput(playerName) {

        let img1 = document.createElement('img');
        img1.src = config.playerHeadApi + config[playerName];
        let player1 = document.createElement('div');
        player1.classList.add('ui-create-local-entry');
        player1.appendChild(
            new InputField(playerName, config[playerName], [], () => {
            }, () => {
                img1.src = config.playerHeadApi + config[playerName];
            }).element,
        );
        player1.appendChild(img1);

        return player1;
    }
}


export class PostGamePage extends Page {
    constructor(ui) {

        let results = document.createElement('div');


        super(ui, '', [
            PostGamePage.createResultEntry(ui, "player1"),
            PostGamePage.createResultEntry(ui, "player2"),
            new MenuButton('Rematch', () => {
                this.ui.rematch();
            }),
            new MenuButton("Leave", () => {
                this.ui.leave();
            })
        ]);

    }

    static createResultEntry(ui, player) {

        let resField = document.createElement('div');
        resField.classList.add('ui-postgame-result');

        let resImg = document.createElement('img');
        resImg.src = config.playerHeadApi + config[player + 'Name'];

        let playerNameWins = document.createElement('span');
        playerNameWins.innerHTML = config[player + "Name"] + ': ';

        let playerPoints = document.createElement('span');
        playerPoints.innerHTML = ui.gameManager.game[player]['points'];

        resField.appendChild(resImg);
        resField.appendChild(playerNameWins);
        resField.appendChild(playerPoints);

        return resField;
    }
}