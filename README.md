# About
QR code generator written in TypeScript. <br>
Check live demo: https://themanandhisshadow.github.io/qr-code-generator/

# Basic usage
> **Note**
>
> `qr()` function input not case sensitive. For example: `qr(text: "Hello world")` and `qr(text: "HELLO WORLD")` returns same qr code! 
```js
let qrCode = qr({
  text: 'Hello world!',
  textOrigin: input,
  correction: correctionLevelSelector.value,
  size: 400,
});
```

> **Warning**
>
> All `qr()` function params are optional, but at least one of two text source params (`text`, `textOrigin`) should be passed to the params object!

> **Note**
>
> Text sources can only contain allowed letters ```[a-zA-Z0-9$%*+-./:]``` and `whitespaces`

1. Create variable that will contains `qr()` function result. Call the `qr()` function with the following parameters:
* `text?: string` - text to convert;
* `textOrigin?: HTMLInputElement` - input, that contains text to convert;
* `correction?: string` - qr code correction level;
* `size?: number` - qr code canvas size in pixels.

2. As result, `qr()` function returns following object:
```js
{
  canvas: HTMLCanvasElement, // contains canvas with ready qr code
  data: {
    blocks: string[],
    correction: string,
    encodedData: string,
    originalData: string,
    serviceData: string,
    stream: string[],
    version: {
      number: number,
      capacity: number,
    },
  },
}
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Get qrCode.canvas element and make necessary DOM manipulations. For example:
```js
codeContainer.appendChild(qrCode.canvas);
```
