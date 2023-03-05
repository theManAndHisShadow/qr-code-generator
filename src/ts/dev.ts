const devModeCheckbox = document.querySelector('#dev__mode-checkbox input') as HTMLInputElement;
const devContainer = document.querySelector('#dev') as HTMLInputElement;
const devRenderParamsContainer = document.querySelector('#dev__render-params') as HTMLInputElement;
const devInfo = document.querySelector('#dev__info div') as HTMLDivElement;



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
    interface Settings {
        [key: string]: boolean
    }

    let defaultDevParams:Settings = {
        // main property, state of dev mode
        state: false,

        queitRegion: true,
        boundingRectCorners: true,
        finderPatterns: true,
        timingPatterns: true,
        aligmentPatterns: true,
        versionCodes: true,
        correctionLevelAndMaskCodes: true,
        encodedDataDirectionColumns: true,
    };

    return defaultDevParams;
}



/**
 * Shows or hides dev block container and inner elements.
 * @param state state of dev mode
 */
function toggleDevBlockContainer(state: boolean){
    if(state === false) {
        devContainer.classList.add('non-active');
        devInfo.parentElement.setAttribute('hidden', '');
        devRenderParamsContainer.setAttribute('hidden', '');
    } else {
        devContainer.classList.remove('non-active');
        devInfo.parentElement.removeAttribute('hidden');
        devRenderParamsContainer.removeAttribute('hidden');
    }
}



/**
 * Renders all setting items states on HTML dev block.
 * @param paramsObject dev oarameters object
 */
function renderSettingsStates(paramsObject: any){
    const signature = 'data-dev-param';
    const keys = Object.keys(paramsObject);

    toggleDevBlockContainer(paramsObject.state);

    keys.forEach(key => {
        // all dev params checkbopx marked by attr "data-dev-param"
        // loop all and set checked state from localeStorage
        let checkbox: HTMLInputElement = document.querySelector(`[${signature}="${key}"]`);
        checkbox.checked = paramsObject[key];
        
        // add event listener for all target checkboxes
        checkbox.addEventListener('click', () => {
            // save new state to localStorage
            updateSettingsAtLocalStorage(key, checkbox.checked);
            toggleDevBlockContainer(devModeCheckbox.checked);
        });
    });
}



/**
 * Updates dev param at local storage.
 * @param propertyName 
 * @param value 
 */
function updateSettingsAtLocalStorage(propertyName: string, value: boolean){
    let devParams = JSON.parse(localStorage.getItem('devParams'));
    devParams[propertyName] = value;

    localStorage.setItem('devParams', JSON.stringify(devParams))
}



/**
 * Loads dev params object, renders it at HTML, 
 * adds click ev listener at checkbox for dev param properties updating.
 * @returns dev param object.
 */
export function loadDevParams(){
    if(!localStorage.getItem('devParams')) {
        localStorage.setItem('devParams', JSON.stringify(getDefaultDevParams()));
    }

    let devParams = JSON.parse(localStorage.getItem('devParams'));

    renderSettingsStates(devParams);

    return devParams;
}