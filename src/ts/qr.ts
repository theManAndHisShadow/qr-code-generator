import {encodeStringToBinaryBytes} from './encoder'

export function qr(targetToConvert: string){
    return encodeStringToBinaryBytes(targetToConvert);
}

console.log(qr('hello'));