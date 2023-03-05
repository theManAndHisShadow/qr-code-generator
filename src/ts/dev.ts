const devModeCheckbox = document.querySelector('#dev__mode-checkbox input') as HTMLInputElement;
const devContainer = document.querySelector('#dev') as HTMLInputElement;
const devRenderParamsContainer = document.querySelector('#dev__render-params') as HTMLInputElement;
const devInfo = document.querySelector('#dev__info div') as HTMLDivElement;



// check dev mode state
devModeCheckbox?.addEventListener('click', () => {
    if(devModeCheckbox.checked){
        devContainer.classList.remove('non-active');
        devInfo.parentElement.removeAttribute('hidden');
        devRenderParamsContainer.removeAttribute('hidden');
    } else {
        devContainer.classList.add('non-active');
        devInfo.parentElement.setAttribute('hidden', '');
        devRenderParamsContainer.setAttribute('hidden', '');
    }
});



/**
 * Print dev info to HTML page.
 * @param qrCode data object
 */
export function printDevInfo(qrCode: any){
    if(devModeCheckbox.checked){
        let devData = {
            correction: qrCode.data.correction,
            version: qrCode.data.version,
        }
        devInfo.innerHTML = JSON.stringify(devData);
    } else {
        devInfo.innerHTML = "";
    }
}



/**
 * Returns default dev params object.
 * @returns object
 */
export function getDefaultDevParams(){
    let defaultDevParams = {
        state: false,
        queitRegion: false,
        boundingRectCorners: false,
        finderPatterns: false,
        timingPatterns: false,
        aligmentPatterns: false,
    };

    return defaultDevParams;
}



/**
 * Parses all development parameters stored in the data-dev-param attribute 
 * and combines them into a single object.
 * @returns object
 */
export function parseDevParams(){
    const devParams = {state: devModeCheckbox.checked};
    const signature = 'data-dev-param';

    Array.from(document.querySelectorAll(`[${signature}]`))
        .forEach((input: HTMLInputElement) => {
        let key = input.getAttribute(signature);

        Object.defineProperty(devParams, key, {
            value: Boolean(input.checked),
        });
    });

    return devParams;
}