export function parseDevParams(){
    const devParams = {state: false};
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