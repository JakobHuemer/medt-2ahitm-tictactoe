import Block, { Observer, Piston } from './models/block.js';


export const starterMap = [
    new Block('AREP', 'repeating_command_block_front', 0, 3),
    new Block('BREP', 'repeating_command_block_front', 10, 3),

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

    new Observer('OA01', 1, 4, 0, 0),
    new Observer('OA02', 0, 1, 0, 0),
    new Observer('OA03', 3, 0, 0, 0),
    new Observer('OA04', 2, 2, 0, 0),
    new Observer('OA1', 4, 1, 0, 0),
    new Observer('OA2', 5, 1, 0, 0),
    new Observer('OA3', 6, 1, 0, 0),
    new Observer('OA4', 3, 3, 0, 0),
    new Observer('OA5', 3, 4, 0, 0),
    new Observer('OB01', 9, 2, 0, 0),
    new Observer('OB02', 10, 5, 0, 0),
    new Observer('OB03', 7, 6, 0, 0),
    new Observer('OB04', 8, 4, 0, 0),
    new Observer('OB1', 6, 5, 0, 0),
    new Observer('OB2', 5, 5, 0, 0),
    new Observer('OB3', 4, 5, 0, 0),
    new Observer('OB4', 7, 3, 0, 0),
    new Observer('OB5', 7, 2, 0, 0),
];

