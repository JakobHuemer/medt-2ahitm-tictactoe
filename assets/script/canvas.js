import Block from './models/block.js';

let id = 1;


export default class Canvas {
    blockArray = [];
    topLayer;
    bottomLayer;

    constructor(topLayer, bottomLayer) {

        if (!topLayer || !bottomLayer) {
            throw Error('No bottom or lop layer specified');
        }

        this.topLayer = topLayer;
        this.bottomLayer = bottomLayer;
    }

    add(toAdd) {
        if (Array.isArray(toAdd)) {
            for (const item of toAdd) {
                this.add(item)
            }
            return;
        }

        if (!toAdd instanceof Block) {
            return;
        }

        id++;
        toAdd.id = id;
        toAdd.element.id = `block-${ id }`;

        if (toAdd.lvl === 1) {
            this.topLayer.appendChild(toAdd.element);
        } else {
            this.bottomLayer.appendChild(toAdd.element);
        }

        this.blockArray.push(toAdd);
    }



    getByPos(checkPos) {
        for (const block of this.blockArray) {
            if (Array.isArray(block.pos)) {
                for (const pos of block.pos) {
                    if (pos == checkPos) return block;
                }
            } else if (block.pos == checkPos) return block;
        }

        return null;
    }

    removeBlock(checkPos) {
        let block = this.getByPos(checkPos);

        const id = block.id;

        if (block.lvl === 1) {
            this.topLayer.querySelector(`#block-${ id }`)?.remove();
        } else {
            this.bottomLayer.querySelector('#block-${id}')?.remove();
        }
    }


};