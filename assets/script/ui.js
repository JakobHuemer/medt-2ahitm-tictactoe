export default class Ui {
    visible;
    currentPage;
    menuElement;
    pages;

    constructor() {
        this.pages = new Map();
    }

    addPage(name, el) {
        this.pages.set(name, el);
    }

    show(page) {
        if (this.pages.get(page))
            this.currentPage = this.pages.get(page);
        
    }
}