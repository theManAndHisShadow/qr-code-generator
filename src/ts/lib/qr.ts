import {encodeStringToBinaryBytes} from './encoder';
import {getServiceData} from './serviceData';
import {divideIntoBlocks} from './structurer';
import {drawQR} from './renderer';


/**
 * Prepares input data to working format.
 * @param text target data (string, number to encode)
 * @param correction encoding correction level
 * @returns 
 */
export function prepareData(text: string, correction: string){
    let encodedString = encodeStringToBinaryBytes(text);
    let serviceData = getServiceData(encodedString, correction);
    let totalLength = serviceData.serviceData.length + encodedString.length;

    // check multiplicity 8
    if(totalLength % 8 > 0) {
        let shortage = (Math.ceil(totalLength / 8) * 8) - totalLength;
        
        // add extra zero data
        encodedString += '0'.repeat(shortage);
        totalLength = serviceData.serviceData.length + encodedString.length;
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



export function qr(params: {text: string, correction?: string}){
    params.correction = params.correction || 'M';

    let data = prepareData(params.text, params.correction);
    let grouped = divideIntoBlocks(data);

    return data;
}