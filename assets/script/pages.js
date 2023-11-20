import MenuButton from './models/menubutton';
import Ui from './ui.js';

export class HomePage extends HTMLDivElement {
    ui;

    constructor(ui) {
        super();
        if (!ui instanceof Ui) {
            throw new Error('Ui musst be of type Ui');
        }
        this.ui = ui;

        this.classList.add('menu-wrapper');

        this.appendChild(new MenuButton('Local', () => {

        }));
    }
}