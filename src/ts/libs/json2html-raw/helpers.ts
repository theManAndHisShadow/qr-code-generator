// define some types
type EventCallbackHandler = (event: Event) => void



/**
 * Checks if given string is a link.
 * @param target string to check
 * @returns 
 */
export function isLink(target: string){
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(target);
}



/**
 * Checks if value is Array.
 * @param value 
 * @returns 
 */
export function isArray(value: any){
    return value !== null && value.constructor.name === "Array";
}



/**
 * Checks if value is Object.
 * @param value 
 * @returns 
 */
export function isObject(value: any){
    return value !== null && value.constructor.name === "Object";
}



/**
 * Adds multiple event handlers
 * @param targets array of targets
 * @param evenType event type
 * @param callback callback function with access to event instance
 */
export function addMultipleEventHandlers(targets: HTMLSpanElement[], evenType: string, callback: EventCallbackHandler){
    targets.forEach(target => {
        target.addEventListener(evenType, event => {
            callback(event);
        });
    });
}



/**
 * Emulates event by eventType on target element.
 * @param target event target
 * @param evenType event trigger type, for example "click"
 */
export function emulateEvent(target: Element, evenType: string){
    const evObj = document.createEvent('Events');
    evObj.initEvent(evenType, true, false);
    target.dispatchEvent(evObj);
}