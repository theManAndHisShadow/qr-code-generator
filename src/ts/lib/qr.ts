import {encodeStringToBinaryBytes} from './encoder';
import {getServiceData} from './serviceData';
import {divideIntoBlocks} from './structurer';
import {addCorrectionBytes} from './corrector';
import {drawQR} from './renderer';


/**
 * Prepares input data to working format.
 * @param text target data (string, number to encode)
 * @param correction encoding correction level
 * @returns 
 */
export function prepareData(text: string, correction: string){
    let encodedString = encodeStringToBinaryBytes(text);
    let serviceData = getServiceData(encodedString.length, correction);
    let totalLength = serviceData.serviceData.length + encodedString.length;

    // check multiplicity 8
    if(totalLength % 8 > 0) {
        let shortage = (Math.ceil(totalLength / 8) * 8) - totalLength;
        
        // add extra zero data
        encodedString += '0'.repeat(shortage);
        totalLength = serviceData.serviceData.length + encodedString.length;
    }

    if(totalLength > serviceData.version.capacity) {
        serviceData = getServiceData(totalLength, correction);
    }

    // fill bit stream to full capacity
    for(
        let i = 0, j = 0; 
        i < serviceData.version.capacity - totalLength;
        i += 8, j++
    ){
        if(j % 2 > 0) {
            encodedString += '00010001';
        } else {
            encodedString += '11101100';
        }
    }
    

    return {
        correction: correction,
        version: serviceData.version,
        stream: serviceData.serviceData + encodedString,
        originalData:text,
        serviceData: serviceData.serviceData,
        encodedData: encodedString
    };
}



export function qr(params: {text?: string, textOrigin?:HTMLInputElement, correction?: string, size?: number, dev?: object}){
    params.dev = params.dev || {
        state: false,
    };

    if(params.text || params.textOrigin) {
        // params.textOrigin has more priority than params.text
        let text = params.textOrigin && params.textOrigin.value || params.text;

        params.correction = params.correction || 'M';
        params.size = params.size || 400;
    
        let data = prepareData(text, params.correction);
        let groupedData = divideIntoBlocks(data);
        let readyData = addCorrectionBytes(groupedData);
        
        readyData.dev = params.dev;
    
        let canvas = document.createElement('canvas');
        canvas.width = params.size;
        canvas.height = params.size;
    
        if(canvas && canvas.getContext('2d')) drawQR(canvas, readyData);
    
        return {
            canvas: canvas, 
            data: readyData
        };
    } else {
        throw new TypeError('qr(text?: string, textOrigin?:HTMLInputElement...): at least one text source must be passed to function');
    }
}