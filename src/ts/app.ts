import { loadDevParams, printDevInfo } from './dev';
import { qr } from './qr-core/qr';
import { sanitizeInput } from './helper';



const input = document.querySelector('#controls__inputs input') as HTMLInputElement;
const correctionLevelSelector = document.querySelector('#controls__inputs select') as HTMLSelectElement;
const triggerButton = document.querySelector('#controls__trigger button');
const appResult = document.querySelector('#app #app__output') as HTMLDivElement;


// init var at start
let devParams = loadDevParams();

triggerButton?.addEventListener('click', () => {

    // update var at every 'generate' click
    devParams = loadDevParams();

    if(input) {
        if(/[а-яёА-ЯЁ]+/gm.test(input.value)) {
            alert('Allowed only letters [a-zA-Z0-9$%*+-./:] and "whitespaces"!');
            input.value = sanitizeInput(input.value, false);
        }

        if(input.value.length > 0) {
            let qrCode = qr({
                textOrigin: input,
                correction: correctionLevelSelector.value,
                dev: devParams,
            });
    
            appResult.children.length > 0 
                ? appResult.replaceChild(qrCode.canvas, appResult.children[0])
                : appResult.appendChild(qrCode.canvas);
                

            printDevInfo(qrCode);
            console.log(qrCode.data);
        }
    }
});