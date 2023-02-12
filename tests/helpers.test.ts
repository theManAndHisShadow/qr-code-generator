import { verticalFlatten } from "../src/ts/helpers";

let complexArray1 = [
    ['1', '6'           ],
    ['2', '7'           ],
    ['3', '8'           ],
    ['4', '9', 'C', 'D' ],
    ['5', '10', 'E', 'F'],
];

let complexArray2 = [
    ['1', 'A'          ],
    ['2', 'B', '#'     ],
    ['3', 'C'          ],
    ['4', 'D', '0', 'G'],
    ['5', 'E', 'H', 'Q'],
];

let complexArray3 = [
    ['1', 'A'                     ],
    ['2', 'B', '#', '-', '=', '~' ],
    ['3', 'C'                     ],
    ['4',                         ],
    ['5',                         ],
];

let complexArray4 = [
    ['1', 'A', 'z', 'x'                                            ],
    ['2', 'B', '#', '-', '=', '~'                                  ],
    ['3', 'C'                                                      ],
    ['4',                                                          ],
    ['5', '6', '7', '8', '9', '10', '11', '12', '13', 'L', 'J', 'P'],
];

describe('verticalFlatten() make one-dimension array from complex array', ()=> {
    test('verticalFlatten(complexArray1) returns simple array', ()=>{
        expect(verticalFlatten(complexArray1)).toEqual(['1', '2',  '3', '4', '5', '6',  '7', '8', '9', '10', 'C', 'E', 'D', 'F']);
    });

    test('verticalFlatten(complexArray2) returns simple array', ()=>{
        expect(verticalFlatten(complexArray2)).toEqual(['1', '2',  '3', '4', '5', 'A', 'B', 'C', 'D', 'E', '#', '0', 'H', 'G', 'Q']);
    });

    test('verticalFlatten(complexArray3) returns simple array', ()=>{
        expect(verticalFlatten(complexArray3)).toEqual(['1', '2',  '3', '4', '5', 'A', 'B', 'C', '#', '-', '=', '~']);
    });

    test('verticalFlatten(complexArray4) returns simple array', ()=>{
        expect(verticalFlatten(complexArray4)).toEqual(['1', '2', '3', '4', '5', 'A', 'B', 'C', '6', 'z', '#', '7', 'x', '-', '8', '=', '9', '~', '10', '11', '12', '13', 'L', 'J', 'P']);
    });
});