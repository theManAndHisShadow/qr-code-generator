const devModeCheckbox = document.querySelector('#dev__mode-checkbox input') as HTMLInputElement;
const devContainer = document.querySelector('#dev') as HTMLInputElement;
const devToolsContainer = document.querySelector('#dev__tools') as HTMLInputElement;
const devInfo = document.querySelector('#dev__info') as HTMLDivElement;

devModeCheckbox?.addEventListener('click', () => {
    if(devModeCheckbox.checked){
        devContainer.classList.remove('non-active');
        devToolsContainer.removeAttribute('hidden');
    } else {
        devContainer.classList.add('non-active');
        devInfo.innerHTML = "";
        devToolsContainer.setAttribute('hidden', '');
    }
});

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

export function parseDevParams(){
    const devParams = {state: devModeCheckbox.checked};
    const signature = 'data-dev-param';

    Array.from(document.querySelectorAll(`[${signature}]`))
        .forEach(input => {
        let pair = input.getAttribute(signature).split(':');

        Object.defineProperty(devParams, pair[0], {
            value: Boolean(pair[1]),
        });
    });

    return devParams;
}