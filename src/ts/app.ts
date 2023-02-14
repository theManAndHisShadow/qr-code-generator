import {qr} from './lib/qr';

const input = document.querySelector('#app input') as HTMLInputElement;
const correctionLevelSelector = document.querySelector('#app select') as HTMLSelectElement;
const triggerButton = document.querySelector('#app button');
const appResult = document.querySelector('#app #app__output') as HTMLDivElement;

triggerButton?.addEventListener('click', () => {
    if(input && input.value.length > 0) {
        let qrCode = qr({
            text: input.value,
            correction: correctionLevelSelector.value,
        });

        appResult.children.length > 0 
            ? appResult.replaceChild(qrCode.canvas, appResult.children[0])
            : appResult.appendChild(qrCode.canvas);

        console.log(qrCode.data);
    }
});