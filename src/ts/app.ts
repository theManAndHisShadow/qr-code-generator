import {qr} from './lib/qr';

const input = document.querySelector('#app input');
const triggerButton = document.querySelector('#app button');
const appResultTargets = document.querySelectorAll('[data-qr-code-container]');

triggerButton?.addEventListener('click', () => {
    if(input) {
        console.log(input);
    }
});