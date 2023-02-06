import {encodeStringToBinaryBytes} from './encoder'
import {getServiceData} from './serviceData'


function prepareData(targetToConvert: string, correction: string){
    let encodedString = encodeStringToBinaryBytes(targetToConvert);
    let serviceData = getServiceData(encodedString, correction);

    return {
        correction: correction,
        version: serviceData.version,
        originalData:targetToConvert,
        serviceData: serviceData.serviceData,
        encodedData: encodedString
    };
}



export function qr(targetToConvert: string, correction?: string){
    correction = correction || 'M';

    let data = prepareData(targetToConvert, correction);

    return data;
}

console.log(qr('hello'));