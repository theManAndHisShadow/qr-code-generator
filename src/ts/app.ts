import {qr} from './lib/qr';
import { sanitizeInput } from './lib/helper';

const input = document.querySelector('#controls__inputs input') as HTMLInputElement;
const correctionLevelSelector = document.querySelector('#controls__inputs select') as HTMLSelectElement;
const devModeCheckbox = document.querySelector('#controls__dev-mode-checkbox input') as HTMLInputElement;
const triggerButton = document.querySelector('#controls__trigger button');
const appResult = document.querySelector('#app #app__output') as HTMLDivElement;

triggerButton?.addEventListener('click', () => {
    if(input) {
        if(/[а-яёА-ЯЁ]+/gm.test(input.value)) {
            alert('Allowed only letters [a-zA-Z0-9$%*+-./:] and "whitespaces"!');
            input.value = sanitizeInput(input.value, false);
        }

        if(input.value.length > 0) {
            let qrCode = qr({
                textOrigin: input,
                correction: correctionLevelSelector.value,
                devMode: devModeCheckbox.checked,
            });
    
            appResult.children.length > 0 
                ? appResult.replaceChild(qrCode.canvas, appResult.children[0])
                : appResult.appendChild(qrCode.canvas);
    
            console.log(qrCode.data);
        }
    }
});