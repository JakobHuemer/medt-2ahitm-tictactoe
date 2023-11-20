import config from './config.js';

export default class Ui {
    visible;
    currentPage;
    menuElement;
    pages;

    constructor() {
        this.pages = new Map();
        this.element = document.createElement('div');
        this.element.classList.add("ui-wrapper")
        if (config.backgroundBlockType === 'block') {
            console.log(`${config.server + '/images/' + config.backgroundBlock + '.png'}`)
            this.element.style.background = `${config.server}/images/dirt.png") center / 5rem repeat`
        }
        this.element.style.zIndex = 1000;
    }

    addPage(name, el) {
        this.pages.set(name, el);
        this.element.appendChild(el);
    }

    show(pageName) {
        for (const [name, page] of this.pages.entries()) {
            if (name === pageName)
                setTimeout(() => page.style.visibility = 'visible', 100);
            else
                page.style.visibility = 'hidden';
        }
    }
}