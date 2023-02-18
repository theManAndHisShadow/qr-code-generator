/**
 * Return amount of blocks, that depends at correction level and version number.
 * @param correction level
 * @param versionNumber 
 * @returns 
 */
export function getBlocksAmount(correction: string, versionNumber: number){
    interface DataCollection {
        [key: string]: Array<number>
    }

    const data: DataCollection = {
        L:[
            1, 1, 1, 1, 1, 2, 2,
            2, 2, 4, 4, 4, 4, 4, 6, 
            6, 6, 6, 7, 8, 8, 9, 9, 10, 
            12, 12, 12, 13, 14, 15, 16, 
            17, 18, 19, 19, 20, 21, 22, 24, 25
        ],
        
        M:[
            1, 1, 1, 2, 2, 4, 4, 
            4, 5, 5, 5, 8, 9, 9, 10, 
            10, 11, 13, 14, 16, 17, 17, 
            18, 20, 21, 23, 25, 26, 28, 
            29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49
        ],

        Q:[
            1, 1, 2, 2, 4, 4, 6, 
            6, 8, 8, 8, 10, 12, 16, 
            12, 17, 16, 18, 21, 20, 23, 
            23, 25, 27, 29, 34, 34, 35, 
            38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68
        ],

        H:[
            1, 1, 2, 4, 4, 4, 5, 
            6, 8, 8, 11, 11, 16, 16, 
            18, 16, 19, 21, 25, 25, 25, 
            34, 30, 32, 35, 37, 40, 42, 
            45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81
        ],
    };

    // index = version - 1
    return data[correction][versionNumber - 1];
}



/**
 * Modifies data object, copies stream and divide it into bytes groups (blocks).
 * @param preparedData object
 * @returns modified data object
 */
export function divideIntoBlocks(preparedData: any){
    let streamSize = preparedData.stream.length / 8;
    let amountOBlocks = getBlocksAmount(preparedData.correction, preparedData.version.number);
    let blockByteSize = streamSize / amountOBlocks;

    let block: string[] = [];
    let blocks: string[][] = [];
    let blocksPositionIndexes: number[][] = [];

    let positionStart:number;
    let positionEnd:number;

    for(let i = 0; i < amountOBlocks; i++) {
        // if not divided evenly
        if(streamSize % amountOBlocks > 0) {
            let overload = streamSize % amountOBlocks;

            // last n bytes + 1 
            // for example: 180 bytes, 8 groups, streamSize % amountOBlocks -> 22 bytes and overload 4 byte, 
            // then blocks = 22, 22, 22, 22, 23, 23, 23, 23 = gives at sum 180 

            let byteSize = i >= amountOBlocks - overload 
                ? Math.ceil(blockByteSize)
                : Math.floor(blockByteSize);

            positionStart =  blocksPositionIndexes.length === 0 ? 0 : blocksPositionIndexes[i - 1][1];
            positionEnd = positionStart + byteSize;

            blocksPositionIndexes.push([positionStart, positionEnd]);
        } else {
            // if divided evenly - OK
            positionStart = blockByteSize * i;
            positionEnd = positionStart + blockByteSize;
        }

        let part = preparedData.stream.slice(positionStart * 8, positionEnd * 8);
        block = part.match(/.{1,8}/g);
        
        blocks.push(block);
     }

    preparedData.blocks = blocks;

    return preparedData;
}