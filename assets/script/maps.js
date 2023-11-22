import config from './config.js';
import Block, { HoverBlock, Observer, Piston } from './models/block.js';

export default {

    starterMap: [
        [Block, 'AREP', 'repeating_command_block_front', 0, 3, 2],
        [Block, 'BREP', 'repeating_command_block_front', 10, 3, 2],

        [Piston, 'A01', 1, 4],
        [Piston, 'A02', 0, 1, 1],
        [Piston, 'A03', 3, 0, 2],
        [Piston, 'A04', 2, 2, 1],
        [Piston, 'A1', 4, 1, 2, true],
        [Piston, 'A2', 5, 1, 2, true],
        [Piston, 'A3', 6, 1, 2, true],
        [Piston, 'A4', 3, 3, 1, true],
        [Piston, 'A5', 3, 4, 1, true],

        [Piston, 'B01', 9, 2, 2],
        [Piston, 'B02', 10, 5, 3],
        [Piston, 'B03', 7, 6],
        [Piston, 'B04', 8, 4, 3],
        [Piston, 'B1', 6, 5, 0, true],
        [Piston, 'B2', 5, 5, 0, true],
        [Piston, 'B3', 4, 5, 0, true],
        [Piston, 'B4', 7, 3, 3, true],
        [Piston, 'B5', 7, 2, 3, true],


        [Block, ['AU1', 'BU9'], 'piston_top_sticky', 4, 2, 0, 0],
        [Block, ['AU2', 'BU8'], 'piston_top_sticky', 5, 2, 0, 0],
        [Block, ['AU3', 'BU7'], 'piston_top_sticky', 6, 2, 0, 0],
        [Block, ['AU4', 'BU6'], 'piston_top_sticky', 4, 3, 0, 0],
        [Block, ['AU5', 'BU5'], 'piston_top_sticky', 5, 3, 0, 0],
        [Block, ['AU6', 'BU4'], 'piston_top_sticky', 6, 3, 0, 0],
        [Block, ['AU7', 'BU3'], 'piston_top_sticky', 4, 4, 0, 0],
        [Block, ['AU8', 'BU2'], 'piston_top_sticky', 5, 4, 0, 0],
        [Block, ['AU9', 'BU1'], 'piston_top_sticky', 6, 4, 0, 0],

        [Observer, 'A01-O', 1, 4, 0, 0],
        [Observer, 'A02-O', 0, 1, 0, 0],
        [Observer, 'A03-O', 3, 0, 0, 0],
        [Observer, 'A04-O', 2, 2, 0, 0],
        [Observer, 'A1-O', 4, 1, 0, 0],
        [Observer, 'A2-O', 5, 1, 0, 0],
        [Observer, 'A3-O', 6, 1, 0, 0],
        [Observer, 'A4-O', 3, 3, 0, 0],
        [Observer, 'A5-O', 3, 4, 0, 0],
        [Observer, 'B01-O', 9, 2, 0, 0],
        [Observer, 'B02-O', 10, 5, 0, 0],
        [Observer, 'B03-O', 7, 6, 0, 0],
        [Observer, 'B04-O', 8, 4, 0, 0],
        [Observer, 'B1-O', 6, 5, 0, 0],
        [Observer, 'B2-O', 5, 5, 0, 0],
        [Observer, 'B3-O', 4, 5, 0, 0],
        [Observer, 'B4-O', 7, 3, 0, 0],
        [Observer, 'B5-O', 7, 2, 0, 0],

        [Block, 'AN1', config.player1Block, 1, 3],
        [Block, 'AN2', config.player1Block, 1, 2],
        [Block, 'AN3', config.player1Block, 1, 1],
        [Block, 'AN4', config.player1Block, 2, 1],
        [Block, 'AN5', config.player1Block, 3, 1],
        [Block, 'AN6', config.player1Block, 3, 2],

        [Block, 'BN1', config.player2Block, 9, 3],
        [Block, 'BN2', config.player2Block, 9, 4],
        [Block, 'BN3', config.player2Block, 9, 5],
        [Block, 'BN4', config.player2Block, 8, 5],
        [Block, 'BN5', config.player2Block, 7, 5],
        [Block, 'BN6', config.player2Block, 7, 4],
    ],

    gameField: [
        [HoverBlock, 'H1', 4, 2],
        [HoverBlock, 'H2', 5, 2],
        [HoverBlock, 'H3', 6, 2],
        [HoverBlock, 'H4', 4, 3],
        [HoverBlock, 'H5', 5, 3],
        [HoverBlock, 'H6', 6, 3],
        [HoverBlock, 'H7', 4, 4],
        [HoverBlock, 'H8', 5, 4],
        [HoverBlock, 'H9', 6, 4],
    ],

};
