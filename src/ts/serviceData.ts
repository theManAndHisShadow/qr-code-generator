import { decimalToBinary } from "./helpers";

/**
 * Get code version that can contains bit flow.
 * @param bitsArray correction array
 * @param bitStreamSize bit stream length
 * @returns object {number: version number, capacity: version capacity}
 */
export function choseVersion(bitsArray:number[], bitStreamSize: number){
    let filtred = bitsArray.filter(bits => bitStreamSize <= bits);
    let optimal = bitsArray.indexOf(filtred[0]);

    return {
        // version number stored at array index, therefore version = index + 1
        number: optimal + 1,

        // optimal capacity value is nearest version capacity at filtered array
        capacity: filtred[0],
    };
}



/**
 * Returns optimal code version using correction level and bit flow length
 * @param correction level L M Q H
 * @param bitStreamSize bit stream length
 * @returns code version
 */
export function getOptimalQRCodeVersion(bitStreamSize:number, correction:string){
    interface DataCollection {
        [key: string]: Array<number>
    }

    const data: DataCollection = {
        /**
         * QR code capacity level 
         * depends at QR_VERSION 
         * QR code level saved at index starting from zero (level = index + 1)
         * CORRECTION_LEVEL : [QR_VERSION_1, QR_VERSION_N+1...40]
         */

        L:[
            152, 272, 440, 640, 864, 1088, 1248, 1552, 1856, 2192, 
            2592, 2960, 3424, 3688, 4184, 4712, 5176, 5768, 6360, 
            6888, 7456, 8048, 8752, 9392, 10208, 10960, 11744, 
            12248, 13048, 13880, 14744, 15640, 16568, 17528, 
            18448, 19472, 20528, 21616, 22496, 23648
        ],
        
        M:[
            128, 224, 352, 512, 688, 864, 992, 1232, 1456, 1728,
            2032, 2320, 2672, 2920, 3320, 3624, 4056, 4504, 
            5016, 5352, 5712, 6256, 6880, 7312, 8000, 
            8496, 9024, 9544, 10136, 10984, 11640, 
            12328, 13048, 13800, 14496, 15312, 
            15936, 16816, 17728, 18672
        ],

        Q:[
            104, 176, 272, 384, 496, 608, 704, 880, 1056, 1232,
            1440, 1648, 1952, 2088, 2360, 2600, 2936, 3176, 
            3560, 3880, 4096, 4544, 4912, 5312, 5744, 
            6032, 6464, 6968, 7288, 7880, 8264, 
            8920, 9368, 9848, 10288, 10832, 
            11408, 12016, 12656, 13328
        ],

        H:[
            72, 128, 208, 288, 368, 480, 528, 688, 800, 976,
            1120, 1264, 1440, 1576, 1784, 2024, 2264, 2504,
            2728, 3080, 3248, 3536, 3712, 4112, 4304,
            4768, 5024, 5288, 5608, 5960, 6344, 
            6760, 7208, 7688, 7888, 8432, 
            8768, 9136, 9776, 10208
        ],
    };

    let correctionLevelArray = data[correction];
    let qrVersion = choseVersion(correctionLevelArray, bitStreamSize);

    return qrVersion;
}



/**
 * Returns object with all service data: version, capacity, service prefix bits; 
 * contains encoded data, but not original data (originalData = '').
 * @param bitStream encoded bits stream
 * @param correction level
 * @returns 
 */
export function getServiceData(bitStream: string, correction: string){
    let version = getOptimalQRCodeVersion(bitStream.length, correction);
    let serviceDataBitsSize: number = 1;

    if(version.number >= 1 || version.number <= 9){
        serviceDataBitsSize = 9;
    } else if(version.number >= 10 && version.number <= 26) {
        serviceDataBitsSize = 11;
    } else if(version.number >= 27 && version.number <= 40) {
        serviceDataBitsSize = 13;
    }

    // 0010 - bits prefix for number and letters method encoding
    let serviceData = `0010${decimalToBinary(bitStream.length, serviceDataBitsSize)}`;

    return {
        version: version,
        serviceData: serviceData,
    };
}