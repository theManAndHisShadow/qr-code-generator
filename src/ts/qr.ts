import {encodeStringToBinaryBytes} from './encoder'
import {getServiceData} from './serviceData'

function prepareData(targetToConvert: string, correction?: string){
    let encodedString = encodeStringToBinaryBytes(targetToConvert);
    let serviceData = getServiceData(encodedString, correction);

    serviceData.originalData = targetToConvert;

    return serviceData;
}

export function qr(targetToConvert: string, correction?: string){
    let data = prepareData(targetToConvert, correction);

    return data;
}

console.log(qr('hello'));