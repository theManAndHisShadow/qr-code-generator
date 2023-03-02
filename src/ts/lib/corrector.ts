import { decimalToBinary, verticalFlatten } from "./helper";

interface DataCollection {
    [key: string]: Array<number>
}

interface Dictionary<Type> {
    [key: string]: Type;
}

function getGaloisFieldValue(value: string, reversed?: boolean){
    reversed = reversed || false;
    
    let data:Dictionary<string> = {
        "0":"1","1":"2","2":"4","3":"8","4":"16","5":"32","6":"64","7":"128","8":"29","9":"58",
        "10":"116","11":"232","12":"205","13":"135","14":"19","15":"38","16":"76","17":"152","18":"45","19":"90",
        "20":"180","21":"117","22":"234","23":"201","24":"143","25":"3","26":"6","27":"12","28":"24","29":"48",
        "30":"96","31":"192","32":"157","33":"39","34":"78","35":"156","36":"37","37":"74","38":"148","39":"53",
        "40":"106","41":"212","42":"181","43":"119","44":"238","45":"193","46":"159","47":"35","48":"70","49":"140",
        "50":"5","51":"10","52":"20","53":"40","54":"80","55":"160","56":"93","57":"186","58":"105","59":"210",
        "60":"185","61":"111","62":"222","63":"161","64":"95","65":"190","66":"97","67":"194","68":"153","69":"47",
        "70":"94","71":"188","72":"101","73":"202","74":"137","75":"15","76":"30","77":"60","78":"120","79":"240",
        "80":"253","81":"231","82":"211","83":"187","84":"107","85":"214","86":"177","87":"127","88":"254","89":"225",
        "90":"223","91":"163","92":"91","93":"182","94":"113","95":"226","96":"217","97":"175","98":"67","99":"134",
        "100":"17","101":"34","102":"68","103":"136","104":"13","105":"26","106":"52","107":"104","108":"208","109":"189",
        "110":"103","111":"206","112":"129","113":"31","114":"62","115":"124","116":"248","117":"237","118":"199","119":"147",
        "120":"59","121":"118","122":"236","123":"197","124":"151","125":"51","126":"102","127":"204","128":"133","129":"23",
        "130":"46","131":"92","132":"184","133":"109","134":"218","135":"169","136":"79","137":"158","138":"33","139":"66",
        "140":"132","141":"21","142":"42","143":"84","144":"168","145":"77","146":"154","147":"41","148":"82","149":"164",
        "150":"85","151":"170","152":"73","153":"146","154":"57","155":"114","156":"228","157":"213","158":"183","159":"115",
        "160":"230","161":"209","162":"191","163":"99","164":"198","165":"145","166":"63","167":"126","168":"252","169":"229",
        "170":"215","171":"179","172":"123","173":"246","174":"241","175":"255","176":"227","177":"219","178":"171","179":"75",
        "180":"150","181":"49","182":"98","183":"196","184":"149","185":"55","186":"110","187":"220","188":"165","189":"87",
        "190":"174","191":"65","192":"130","193":"25","194":"50","195":"100","196":"200","197":"141","198":"7","199":"14",
        "200":"28","201":"56","202":"112","203":"224","204":"221","205":"167","206":"83","207":"166","208":"81","209":"162",
        "210":"89","211":"178","212":"121","213":"242","214":"249","215":"239","216":"195","217":"155","218":"43","219":"86",
        "220":"172","221":"69","222":"138","223":"9","224":"18","225":"36","226":"72","227":"144","228":"61","229":"122",
        "230":"244","231":"245","232":"247","233":"243","234":"251","235":"235","236":"203","237":"139","238":"11","239":"22",
        "240":"44","241":"88","242":"176","243":"125","244":"250","245":"233","246":"207","247":"131","248":"27","249":"54",
        "250":"108","251":"216","252":"173","253":"71","254":"142","255":"1",
    }

    let result;
    if(reversed === true) {
        let reversed = Object.entries(data).map(([key, value]) => [value, key]);
        let reversedData = Object.fromEntries(reversed);

        result = reversedData[value];
    } else {
        result = data[value];
    }

    return Number(result);
}



export function getPolynomials(correctionBytesAmount: number){
    let data:DataCollection = {
        "7":  [87, 229, 146, 149, 238, 102, 21],
        "10": [251, 67, 46, 61, 118, 70, 64, 94, 32, 45],
        "13": [74, 152, 176, 100, 86, 100, 106, 104, 130, 218, 206, 140, 78],
        "15": [8, 183, 61, 91, 202, 37, 51, 58, 58, 237, 140, 124, 5, 99, 105],
        "16": [120, 104, 107, 109, 102, 161, 76, 3, 91, 191, 147, 169, 182, 194, 225, 120],
        "17": [43, 139, 206, 78, 43, 239, 123, 206, 214, 147, 24, 99, 150, 39, 243, 163, 136],
        "18": [215, 234, 158, 94, 184, 97, 118, 170, 79, 187, 152, 148, 252, 179, 5, 98, 96, 153],
        "20": [17, 60, 79, 50, 61, 163, 26, 187, 202, 180, 221, 225, 83, 239, 156, 164, 212, 212, 188, 190],
        "22": [210, 171, 247, 242, 93, 230, 14, 109, 221, 53, 200, 74, 8, 172, 98, 80, 219, 134, 160, 105, 165, 231],
        "24": [229, 121, 135, 48, 211, 117, 251, 126, 159, 180, 169, 152, 192, 226, 228, 218, 111, 0, 117, 232, 87, 96, 227, 21],
        "26": [173, 125, 158, 2, 103, 182, 118, 17, 145, 201, 111, 28, 165, 53, 161, 21, 245, 142, 13, 102, 48, 227, 153, 145, 218, 70],
        "28": [168, 223, 200, 104, 224, 234, 108, 180, 110, 190, 195, 147, 205, 27, 232, 201, 21, 43, 245, 87, 42, 195, 212, 119, 242, 37, 9, 123],
        "30": [41, 173, 145, 152, 216, 31, 179, 182, 50, 48, 110, 86, 239, 96, 222, 125, 42, 173, 226, 193, 224, 130, 156, 37, 251, 216, 238, 40, 192, 180],
    };

    return data[correctionBytesAmount];
}



/**
 * Return amount of blocks, that depends at correction level and version number.
 * @param correction level
 * @param versionNumber 
 * @returns 
 */
export function getCorrectionBytesAmount(correction: string, versionNumber: number){
    const data: DataCollection = {
        L:[
            7, 10, 15, 20, 26, 18, 20, 24,
            30, 18, 20, 24, 26, 30, 22, 24, 
            28, 30, 28, 28, 28, 28, 30, 30, 
            26, 28, 30, 30, 30, 30, 30, 30, 
            30, 30, 30, 30, 30, 30, 30, 30
        ],
        
        M:[
            10, 16, 26, 18, 24, 16, 18, 22, 
            22, 26, 30, 22, 22, 24, 24, 28, 
            28, 26, 26, 26, 26, 28, 28, 28, 
            28, 28, 28, 28, 28, 28, 28, 28, 
            28, 28, 28, 28, 28, 28, 28, 28
        ],

        Q:[
            13, 22, 18, 26, 18, 24, 18, 22, 
            20, 24, 28, 26, 24, 20, 30, 24, 
            28, 28, 26, 30, 28, 30, 30, 30, 
            30, 28, 30, 30, 30, 30, 30, 30, 
            30, 30, 30, 30, 30, 30, 30, 30
        ],

        H:[
            17, 28, 22, 16, 22, 28, 26, 26, 
            24, 28, 24, 28, 22, 24, 24, 30, 
            28, 28, 26, 28, 30, 24, 30, 30, 
            30, 30, 30, 30, 30, 30, 30, 30, 
            30, 30, 30, 30, 30, 30, 30, 30, 
        ],
    };

    // index = version - 1
    return data[correction][versionNumber - 1];
}



/**
 * Returns corretin bytes array for all blocs.
 * @param dataObject qr data object
 * @returns ready corrcetion bytes array
 */
export function calculateCorrectionBytes(dataObject: any){
    // copy blocks and convert to dec 0-255 int
    let blocks:number[][] = [...dataObject.blocks].map((block:number[]) => {
        return block.map((byte:number) => parseInt(String(byte), 2));
    });

    // get correction bytes amount depends on correction level and version number
    let correctionBytesAmount = getCorrectionBytesAmount(dataObject.correction, dataObject.version.number);

    // Reed–Solomon`s methods polynomials
    let polynomials = getPolynomials(correctionBytesAmount);

    // store correction bytes per block
    let allCorrectionBytes:string[][] = [];

    blocks.forEach(block => {
        // get bytes amount from current block
        let bytes = block.length;

        // get max of two values
        let max = Math.max(bytes, correctionBytesAmount);

        // helper array
        let buffer:number[] = [];

        // single block bytes stream
        let blockCorrectionBytes: string[] = [];

        // fill buffer
        for(let b = 0; b < max; b++) {
            buffer[b] = block[b] ? block[b] : 0;
        }


        // 
        for(let i = 0; i < block.length; i++){
            // get first item
            let a = buffer.shift();
            if(a !== 0) {
                // get reversed Glois Field value
                let b = getGaloisFieldValue(String(a), true);

                // copy original polynomials
                let modPoly = [...polynomials];
        
                for(let j = 0; j < modPoly.length; j++){
                    let p = modPoly[j];
                    let v = p + b > 254 ? (p + b) % 255 : p + b
                    v = getGaloisFieldValue(String(v));

                    // XOR
                    buffer[j] = buffer[j] ^ v;
                    blockCorrectionBytes[j] = decimalToBinary(buffer[j], 8);
                }
            }
        }

        allCorrectionBytes.push(blockCorrectionBytes);
    });

    return allCorrectionBytes;
}



/**
 * Modifies and returns data object with stream, that has new order and contains correction bytes.
 * @param dataObject 
 * @returns modified data object with new array of stream
 */
export function addCorrectionBytes(dataObject: any){
    // calculate correction bytes
    let correctionBytes = calculateCorrectionBytes(dataObject);

    // copy blocks
    let blocks = [...dataObject.blocks];

    // make blocks and correction bytes flatted
    let flattedBytes = verticalFlatten(blocks);
    let flattedCorrectionBytes = verticalFlatten(correctionBytes);


    let newStream = flattedBytes.concat(flattedCorrectionBytes).join('');
    dataObject.stream = newStream;

    return dataObject;
}