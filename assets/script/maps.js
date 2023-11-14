import Block, { HoverBlock, Observer, Piston } from './models/block.js';
import config from './config.js';

export default {

    starterMap: [
        new Block('AREP', 'repeating_command_block_front', 0, 3, 2),
        new Block('BREP', 'repeating_command_block_front', 10, 3, 2),

        new Piston('A01', 1, 4),
        new Piston('A02', 0, 1, 1),
        new Piston('A03', 3, 0, 2),
        new Piston('A04', 2, 2, 1),
        new Piston('A1', 4, 1, 2, true),
        new Piston('A2', 5, 1, 2, true),
        new Piston('A3', 6, 1, 2, true),
        new Piston('A4', 3, 3, 1, true),
        new Piston('A5', 3, 4, 1, true),

        new Piston('B01', 9, 2, 2),
        new Piston('B02', 10, 5, 3),
        new Piston('B03', 7, 6),
        new Piston('B04', 8, 4, 3),
        new Piston('B1', 6, 5, 0, true),
        new Piston('B2', 5, 5, 0, true),
        new Piston('B3', 4, 5, 0, true),
        new Piston('B4', 7, 3, 3, true),
        new Piston('B5', 7, 2, 3, true),


        new Block(['AU1', 'BU9'], 'piston_top_sticky', 4, 2, 0, 0),
        new Block(['AU2', 'BU8'], 'piston_top_sticky', 5, 2, 0, 0),
        new Block(['AU3', 'BU7'], 'piston_top_sticky', 6, 2, 0, 0),
        new Block(['AU4', 'BU6'], 'piston_top_sticky', 4, 3, 0, 0),
        new Block(['AU5', 'BU5'], 'piston_top_sticky', 5, 3, 0, 0),
        new Block(['AU6', 'BU4'], 'piston_top_sticky', 6, 3, 0, 0),
        new Block(['AU7', 'BU3'], 'piston_top_sticky', 4, 4, 0, 0),
        new Block(['AU8', 'BU2'], 'piston_top_sticky', 5, 4, 0, 0),
        new Block(['AU9', 'BU1'], 'piston_top_sticky', 6, 4, 0, 0),

        new Observer('A01-O', 1, 4, 0, 0),
        new Observer('A02-O', 0, 1, 0, 0),
        new Observer('A03-O', 3, 0, 0, 0),
        new Observer('A04-O', 2, 2, 0, 0),
        new Observer('A1-O', 4, 1, 0, 0),
        new Observer('A2-O', 5, 1, 0, 0),
        new Observer('A3-O', 6, 1, 0, 0),
        new Observer('A4-O', 3, 3, 0, 0),
        new Observer('A5-O', 3, 4, 0, 0),
        new Observer('B01-O', 9, 2, 0, 0),
        new Observer('B02-O', 10, 5, 0, 0),
        new Observer('B03-O', 7, 6, 0, 0),
        new Observer('B04-O', 8, 4, 0, 0),
        new Observer('B1-O', 6, 5, 0, 0),
        new Observer('B2-O', 5, 5, 0, 0),
        new Observer('B3-O', 4, 5, 0, 0),
        new Observer('B4-O', 7, 3, 0, 0),
        new Observer('B5-O', 7, 2, 0, 0),

        new Block('AN1', config.player1Block, 1, 3),
        new Block('AN2', config.player1Block, 1, 2),
        new Block('AN3', config.player1Block, 1, 1),
        new Block('AN4', config.player1Block, 2, 1),
        new Block('AN5', config.player1Block, 3, 1),
        new Block('AN6', config.player1Block, 3, 2),

        new Block('BN1', config.player2Block, 9, 3),
        new Block('BN2', config.player2Block, 9, 4),
        new Block('BN3', config.player2Block, 9, 5),
        new Block('BN4', config.player2Block, 8, 5),
        new Block('BN5', config.player2Block, 7, 5),
        new Block('BN6', config.player2Block, 7, 4),
    ],


    gameField: [


        new HoverBlock("H1", 4, 2),
        new HoverBlock("H2", 5, 2),
        new HoverBlock("H3", 6, 2),
        new HoverBlock("H4", 4, 3),
        new HoverBlock("H5", 5, 3),
        new HoverBlock("H6", 6, 3),
        new HoverBlock("H7", 4, 4),
        new HoverBlock("H8", 5, 4),
        new HoverBlock("H9", 6, 4),
    ],

};
