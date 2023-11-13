import Block from './models/block.js';
import Animator from './animator.js';

let id = 1;


export default class Canvas {
    blocks = new Map();
    topLayer;
    bottomLayer;
    animator;

    constructor(topLayer, bottomLayer) {

        this.animator = new Animator(this);

        if (!topLayer || !bottomLayer) {
            throw Error('No bottom or lop layer specified');
        }

        this.topLayer = topLayer;
        this.bottomLayer = bottomLayer;
    }

    add(toAdd) {
        if (Array.isArray(toAdd)) {
            for (const item of toAdd) {
                this.add(item);
            }
            return;
        }

        console.log(toAdd.pos);


        if (!toAdd instanceof Block || this.blocks.has(toAdd.pos)) {
            // console.log(toAdd)
            // console.log(this.blocks.has(toAdd.pos));
            // console.log('RETURN');
            return;
        }

        // console.log(toAdd);
        //
        // console.log(toAdd.pos);


        id++;
        toAdd.id = id;
        toAdd.element.id = `block-${ id }`;

        this.blocks.set(toAdd.pos, toAdd);

        if (toAdd.lvl === 1) {
            this.topLayer.appendChild(toAdd.element);
        } else {
            this.bottomLayer.appendChild(toAdd.element);
        }

    }


    getByPos(checkPos) {
        if (this.blocks.get(checkPos)) {
            return this.blocks.get(checkPos);
        }

        for (const entry of this.blocks.entries()) {
            if (Array.isArray(entry[0])) {
                for (const item of entry[0]) {
                    if (item === checkPos) {
                        return entry[1];
                    }
                }
            } else if (entry[0] === checkPos) {
                return entry[1];
            }
        }
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

    toLayer(item, layer) {
        console.log('ITEM', item);
        if (typeof item === 'string') {
            console.log('AWDAWDAWDAWDAWD');
            item = this.getByPos(item);
            console.log(item);
        }

        if (!item) {
            return;
        }

        if (item.lvl === 1) {
            this.topLayer.querySelector('#block-' + item.id).remove();
        } else {
            this.bottomLayer.querySelector('#block-' + item.id).remove();
        }

        item.lvl = layer;


        if (item.lvl === 1) {
            this.topLayer.appendChild(item.element)
        } else {
            this.bottomLayer.appendChild(item.element)
        }

        item.element.setAttribute('level', layer);
    }



};