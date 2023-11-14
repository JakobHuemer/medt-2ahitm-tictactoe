import Block from './models/block.js';
import Animator from './animator.js';
import config from './config.js';

let id = 1;


export default class Canvas {
    blocks = new Map();
    topLayer;
    bottomLayer;
    gameField;
    animator;

    constructor(topLayer, bottomLayer, gameField) {

        this.animator = new Animator(this);

        if (!topLayer || !bottomLayer || !gameField) {
            throw Error('No bottom, top or gameField layer specified');
        }

        this.topLayer = topLayer;
        this.bottomLayer = bottomLayer;
        this.gameField = gameField
    }

    add(toAdd) {
        if (Array.isArray(toAdd)) {
            for (const item of toAdd) {
                this.add(item);
            }
            return;
        }

        // console.log("TO ADD: ", toAdd.pos)
        // console.log(toAdd.pos);

        if (!toAdd instanceof Block || this.blocks.has(toAdd.pos)) {
            if (!toAdd instanceof Block) {
                throw new Error('toAdd musst be of type Block');
            } else {
                throw new Error('This pos already exists');
            }
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
        } else if (toAdd.lvl === 0) {
            this.bottomLayer.appendChild(toAdd.element);
        } else {
            this.gameField.appendChild(toAdd.element);
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
        // console.log('ITEM', item);
        if (typeof item === 'string') {
            // console.log('AWDAWDAWDAWDAWD');
            item = this.getByPos(item);
            // console.log(item);
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


    /**
     *
     * @param player {'A' | 'B'}
     * @param fieldId {number} - 0 - 8
     */
    feedNewBlock(player, fieldId) {
        // console.log("FEED NEW BLOCKEDY BLOCK BLOCK -----------------------------------------------------------")
        // console.log(this.blocks)
        let fieldBlockPos = this.fieldToPos(fieldId);

        let temp = this.getByPos(player + 'N6');
        this.blocks.delete(player + "N6");
        id++;
        temp.pos = 'PLACED' + fieldId;
        temp.element.classList.add('placed-' + fieldId);
        this.blocks.set('PLACED' + fieldId, temp);

        for (let i = 6; i > 1; i--) {
            this.blocks.set(player + "N" + i, this.blocks.get(player + "N" + (i-1)))
            this.blocks.get(player + 'N' + i).pos = player + 'N' + i;
            // console.log(this.blocks.get(player + "N" + (i)))
            // console.log("LOOP END ----------------------")
        }
        // this.removeBlock('AN1');
        // console.log(this.blocks)
        this.blocks.delete(player + "N1")

        this.add(new Block(player + 'N1', player === 'A' ? config.player1Block : config.player2Block, player === "A" ? 1 : 9, 3));

        // console.log("DONE FEEDING NEW BLOCKEDY BLOCK BLOCK -----------------------------------------------------------")
        // console.log(this.blocks)
    }


    fieldToPos(fieldId) {
        let temp = {
            0: ['AN1', 'BU9'],
            1: ['AN2', 'BU8'],
            2: ['AN3', 'BU7'],
            3: ['AN4', 'BU6'],
            4: ['AN5', 'BU5'],
            5: ['AN6', 'BU4'],
            6: ['AN7', 'BU3'],
            7: ['AN8', 'BU2'],
            8: ['AN9', 'BU1'],
        }

        return temp[fieldId];
    }
};