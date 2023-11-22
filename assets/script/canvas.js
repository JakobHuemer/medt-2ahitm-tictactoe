import Block from './models/block.js';
import Animator from './animator.js';
import config from './config.js';

let id = 1;


export default class Canvas {
    blocks = [];
    topLayer;
    bottomLayer;
    gameField;
    animator;

    player1Blocks = [];
    player2Blocks = [];

    constructor(topLayer, bottomLayer, gameField) {

        this.animator = new Animator(this);

        if (!topLayer || !bottomLayer || !gameField) {
            throw Error('No bottom, top or gameField layer specified');
        }

        this.topLayer = topLayer;
        this.bottomLayer = bottomLayer;
        this.gameField = gameField;
    }

    clear() {
        this.blocks = []
        this.player1Blocks = [];
        this.player2Blocks = [];
        this.gameField.innerHTML = '';
        this.bottomLayer.innerHTML = '';
        this.topLayer.innerHTML = '';
    }

    deleteBlock(toDelete) {

        if (!toDelete) {
            return false;
        }

        let temp = this.blocks.filter(block => {
            // console.log('comparing: ' + toDelete + ' === ' + block._pos + ': ' + (toDelete !== block._pos));
            return toDelete !== block._pos;
        });

        this.blocks = temp;

    }

    reloadTextures() {
        console.log('RELOADING TEXTURES');

        console.log(this.player1Blocks)
        console.log("-----------------")
        console.log(this.player2Blocks)

        for (let el of this.player1Blocks) {
            console.log(getTextures('player1Block'));
            el.element.src = getTextures('player1Block');
        }
        for (let el of this.player2Blocks) {
            el.element.src = getTextures('player2Block');
        }

        function getTextures(playerBlock) {
            if (config[playerBlock + 'Type'] === 'block') {
                return config.server + '/images/' + config[playerBlock] + '.png';
            } else if (config[playerBlock + 'Type'] === 'head') {
                return config.playerHeadApi + config[playerBlock];
            } else {
                return config[playerBlock];
            }
        }
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

        if (!toAdd instanceof Block || !!this.getByPos(toAdd.pos)) {
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

        if (!Array.isArray(toAdd.pos)) {

            if (toAdd.pos.match(/AN[123456]/g)) {
                this.player1Blocks.push(toAdd);
            } else if (toAdd.pos.match(/BN[123456]/g)) {
                this.player2Blocks.push(toAdd);
            }

        }
        this.blocks.push(toAdd);
        if (toAdd.lvl === 1) {
            this.topLayer.appendChild(toAdd.element);
        } else if (toAdd.lvl === 0) {
            this.bottomLayer.appendChild(toAdd.element);
        } else {
            this.gameField.appendChild(toAdd.element);
        }

    }


    getByPos(checkPos) {

        const foundBlock = this.blocks.find(block => block.pos === checkPos);
        if (foundBlock) {
            return foundBlock;
        }

        this.blocks.forEach(block => {
            if (Array.isArray(block.pos)) {
                for (const singlePos of block.pos) {
                    if (singlePos === checkPos) {
                        return block;
                    }
                }
            } else if (block.pos === checkPos) {
                return block;
            }
        });
        // for (const entry of this.blocks.entries()) {
        //     if (Array.isArray(entry[0])) {
        //         for (const item of entry[0]) {
        //             if (item === checkPos) {
        //                 return entry[1];
        //             }
        //         }
        //     } else if (entry[0] === checkPos) {
        //         return entry[1];
        //     }
        // }
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
            this.topLayer.appendChild(item.element);
        } else {
            this.bottomLayer.appendChild(item.element);
        }

        item.element.setAttribute('level', layer);
    }


    /**
     *
     * @param player {'A' | 'B'}
     * @param fieldId {number} - 0 - 8
     */
    feedNewBlock(player) {

        id++;
        this.getByPos(player + 'N6').pos = 'PLACED' + id;

        // this.getByPos(player + 'N5').element.classList.replace(/5/g, '6');
        // this.getByPos(player + 'N5').pos = player + 'N6';
        // console.log(this.getByPos(player + 'N6'));
        //
        // this.getByPos(player + 'N4').element.classList.replace(/4/g, '5');
        // this.getByPos(player + 'N4').pos = player + 'N5';
        // console.log(this.getByPos(player + 'N5'));
        //
        // this.getByPos(player + 'N3').element.classList.replace(/3/g, '4');
        // this.getByPos(player + 'N3').pos = player + 'N4';
        // console.log(this.getByPos(player + 'N4'));
        //
        // this.getByPos(player + 'N2').element.classList.replace(/2/g, '3');
        // this.getByPos(player + 'N2').pos = player + 'N3';
        // console.log(this.getByPos(player + 'N3'));
        //
        // this.getByPos(player + 'N1').element.classList.replace(/1/g, '2');
        // this.getByPos(player + 'N1').pos = player + 'N2';
        // console.log(this.getByPos(player + 'N2'));

        // for (let i = 1; i < 6; i++) {
        //     this.getByPos(player + 'N' + i)
        //         .element.classList.replace(player + 'NNN' + i,
        //         player + 'NNN' + (i + 1));
        //     this.getByPos(player + 'N' + i).pos = player + 'N' + (i + 1);
        //     console.log(this.getByPos(player + 'N' + (i + 1)).pos);
        //     console.log(this.getByPos(player + 'N' + (i + 1)).element.classList);
        //     console.log('-----------------------------------');
        // }

        for (let i = 5; i > 0; i--) {
            this.getByPos(player + 'N' + i).delete();
            this.removeBlock(player + 'N' + i);
            this.deleteBlock(player + 'N' + i);
        }


        const blocksToAdd = [
            [3, 1],
            [2, 1],
            [1, 1],
            [1, 2],
            [1, 3],
        ];

        let index = 5;

        for (const coords of blocksToAdd) {
            this.add(
                new Block(player + 'N' + index,
                    player === 'A' ? config.player1Block : config.player2Block,
                    player === 'A' ? coords[0] : config.canvasWidth - 1 - coords[0],
                    player === 'A' ? coords[1] : config.canvasHeight - 1 - coords[1],
                ),
            );

            index--;
        }


        const newBlockArrays = [];

        let newLastBlock = new Block(player + 'N6',
            player === 'A' ? config.player1Block : config.player2Block,
            player === 'A' ? 3 : 7,
            player === 'A' ? 2 : 4,
        );

        this.add(newLastBlock);

        let firstBlock = new Block(player + 'N1',
            player === 'A' ? config.player1Block : config.player2Block,
            player === 'A' ? 1 : 9,
            3,
        );

        firstBlock.element.classList.add(player + 'NNN1');

        // this.add(firstBlock);
    }

};