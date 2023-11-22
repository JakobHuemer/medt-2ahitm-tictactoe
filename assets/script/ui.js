import config from './config.js';
import { GameManager } from './gamemanager.js';

let id = 0;

export default class Ui extends EventTarget {
    visible;
    currentPage;
    menuElement;
    pages;
    _loadingProgress;
    preloadElements = [
        '/assets/img/gui/button.png',
        '/assets/img/gui/button-dark.png',
        '/assets/img/gui/button-active.png',
        '/assets/img/gui/button-active-dark.png',
        '/assets/img/gui/button-slider.png',
        '/assets/img/gui/button-slider-dark.png',
        '/assets/img/gui/button-slider-slider.png',
        '/assets/img/gui/button-slider-slider-dark.png',
        '/assets/img/gui/button-slider-slider-active.png',
        '/assets/img/gui/button-slider-slider-active-dark.png',
        '/assets/img/gui/tictactoe-logo.jpg',
        '/assets/img/gui/tictactoe-logo-tiny.png',
        '/assets/img/gui/title-dark.png',
        '/assets/img/gui/title-light.png',
    ];

    pagesToObjects;

    constructor(gameManager) {
        super();
        this.gameManager = gameManager;
        this.pages = new Map();
        this.pagesToObjects = new Map();

        this.loadingElement = document.querySelector('.ui-loading-screen');
        this.loadingProgressElement = document.querySelector('.progress');
        // this.loadingElement.classList.add('ui-loading-screen');
        // this.loadingElement.style.background = config.darkMode ?
        //     "black" : "#EF323D"


        // document.body.appendChild(this.loadingElement)

        this.element = document.createElement('div');
        this.element.classList.add('ui-wrapper');
        if (config.backgroundBlockType === 'block') {
            this.element.style.background = `${ config.server }/images/dirt.png") center / 5rem repeat`;
        }
        this.element.style.zIndex = 10000;

        // this.loadingProgressElement.animate([
        //     {
        //         width: "0%"
        //     },
        //     {
        //         width: '60%',
        //     },
        //     {
        //         width: '95%',
        //     },
        //     {
        //         width: '100%',
        //     }
        // ], {
        //     duration: 2300,
        //     iterations: 1,
        // })

        this.preloadImages(() => {
            this.loadingElement.animate([
                {
                    opacity: 1,
                },
                {
                    opacity: 0,
                    visibility: 'hidden',
                },
                {
                    opacity: 0,
                    visibility: 'hidden',
                },
            ], {
                duration: 800,
                iterations: 1,
            });

            setTimeout(() => {
                this.loadingElement.style.visibility = 'hidden';
            }, 750);
        });

        // setTimeout(() => {
        //
        // }, 1900)
        //
        // setTimeout(() => {
        //     this.loadingElement.style.visibility = 'hidden';
        // }, 2700)

        // setTimeout(() => {
        //     this.onReady(document.querySelector(".canvas"), () => {
        //         console.log('MEMO');
        //         this.loadingElement.style.visibility = 0;
        //     });
        // }, 2000)
    }

    addPage(name, page) {
        id++;
        let el = page.element;
        page.id = id;
        el.classList.add('page-nr-' + id);
        this.pages.set(name, el);
        this.pagesToObjects.set(el, page);
        this.element.appendChild(el);

        if (page instanceof EventTarget) {
            page.addEventListener('reloadUI', () => {
                this.dispatchEvent(new Event('reloadUI'));
            });
        }
    }

    removePage(name) {
        console.log("REMOVING ")
        console.log("REMOVING ")
        console.log("REMOVING ")
        console.log("REMOVING ")
        console.log("REMOVING ")
        console.log(this.pagesToObjects);
        if (this.pages.get(name)) {
            console.log(this.pages);
            console.log('REMOVING', this.pages.get(name));
            document.querySelectorAll('.page-nr-' + this.pages.get(name).id).forEach(item => item.remove());
            this.pages.delete(name);
        }
    }

    showPage(pageName) {
        for (const [name, page] of this.pages.entries()) {
            if (name === pageName) {

                setTimeout(() => page.style.visibility = 'visible', 100);
                this.currentPage = pageName;
            } else
                page.style.visibility = 'hidden';
        }
    }

    setBackground(img, size, xOffset, yOffset) {
        console.log('DISPLAY IMAGE', img);
        console.log('TYPE', config.backgroundBlockType);
        if (config.backgroundBlockType === 'block')
            this.element.style.backgroundImage = `url(${ config.server }/images/${ img }.png)`;
        else if (config.backgroundBlockType === 'head')
            this.element.style.backgroundImage = `url(${ config.playerHeadApi }${ config.backgroundBlock }`;
        else
            this.element.style.backgroundImage = `url(${ config.backgroundBlock })`;

        if (size !== undefined && size !== null) {
            this.element.style.backgroundSize = size + 'px';
            this.element.style.backgroundPositionX = xOffset + 'px';
            this.element.style.backgroundPositionY = yOffset + 'px';
        }
    }


    preloadImages(callback) {

        let total = this.preloadElements.length;
        let done = 0;

        this.preloadElements.forEach(item => {
            let img = new Image();
            img.onload = () => {
                done++;
                this.loadingProgress = done / total;
                // console.log(this._loadingProgress * 100);
                this.loadingProgressElement.style.width = (this._loadingProgress * 100) + '%';
                if (done >= total) {
                    console.log('FERTIG');
                    callback();
                }
            };
            // done++;
            // callback()

            img.src = item;
        });
    };


    set loadingProgress(value) {
        this._loadingProgress = value;
        this.loadingProgressElement.style.width = this._loadingProgress + '%';
    }

    hide() {
        this.element.style.display = 'none';
    }

    show() {
        this.element.style.display = 'block';
    }
}