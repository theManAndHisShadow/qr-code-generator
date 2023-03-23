export interface ThemesLibrary {
    [key: string]: {
        [key: string]: {
            selector: string,
            properties: {
                [key: string]: string,
            },
        }, 
    };
}



/**
 * Returns theme css properties object.
 * @param themeName name of theme
 * @returns CSS props object {selector: string, props: {cssProp:value}}
 */
function getThemeProperies(themeName: string){
    const themes:ThemesLibrary = {
        andromeda: {
            container: {
                selector: '.json2html-container',
                properties: {
                    background: '#23262E',
                },
            },

            spoilerToggle: {
                selector: `.json2html-spoiler-toggle--collapsed, .json2html-spoiler-toggle--uncollapsed`,
                properties: {
                    color: '#9c967a',
                },
            },

            key: {
                selector: '.json2html-key',
                properties: {
                    color: '#00e8c6',
                },
            },

            valueTypeBoolean: {
                selector: '.json2html-type__boolean',
                properties: {
                    color: '#ee5d43',
                },
            },

            valueMinusSign: {
                selector: '.json2html-value__minus-sign',
                properties: {
                    color: '#ee5d43',
                },
            },

            valueTypeNumber: {
                selector: '.json2html-type__number',
                properties: {
                    color: '#f39c12',
                },
            },

            valueTypeString: {
                selector: '.json2html-type__string',
                properties: {
                    color: '#96E072',
                },
            },

            valueTypeStringLink: {
                selector: '.json2html-type__string a, .json2html-type__string a:visited',
                properties: {
                    color: '#3B79C7',
                },
            },

            valueTypeNull: {
                selector: '.json2html-type__null',
                properties: {
                    color: '#4e4f54',
                },
            },

            valueTypeUndefined: {
                selector: '.json2html-type__undefined',
                properties: {
                    color: '#f92672',
                },
            },

            valueComplexItemSignature: {
                selector: '.json2html-type__array, .json2html-type__object',
                properties: {
                    color: "#646b7c",
                },
            },

            collapseAllToggle: {
                selector: '.json2html-collapse-all-toggle',
                properties: {
                    color: '#8490a8',
                },
            },
        
        },

        daylight: {
            container: {
                selector: '.json2html-container',
                properties: {
                    background: 'white',
                },
            },

            spoilerToggle: {
                selector: `.json2html-spoiler-toggle--collapsed, .json2html-spoiler-toggle--uncollapsed`,
                properties: {
                    color: '#585858',
                },
            },

            key: {
                selector: '.json2html-key',
                properties: {
                    color: 'blue',
                },
            },

            valueTypeBoolean: {
                selector: '.json2html-type__boolean',
                properties: {
                    color: 'blueviolet',
                },
            },

            valueMinusSign: {
                selector: '.json2html-value__minus-sign',
                properties: {
                    color: '#b44343',
                },
            },

            valueTypeNumber: {
                selector: '.json2html-type__number',
                properties: {
                    color: '#1e7fcc',
                },
            },

            valueTypeString: {
                selector: '.json2html-type__string',
                properties: {
                    color: '#4caf50',
                },
            },

            valueTypeStringLink: {
                selector: '.json2html-type__string a, .json2html-type__string a:visited',
                properties: {
                    color: '#4caf50',
                },
            },

            valueTypeNull: {
                selector: '.json2html-type__null',
                properties: {
                    color: '#9b9b9b',
                },
            },

            valueTypeUndefined: {
                selector: '.json2html-type__undefined',
                properties: {
                    color: '#795548',
                },
            },

            valueComplexItemSignature: {
                selector: '.json2html-type__array, .json2html-type__object',
                properties: {
                    color: "#646b7c",
                },
            },

            collapseAllToggle: {
                selector: '.json2html-collapse-all-toggle',
                properties: {
                    color: '#000000',
                },
            },
        
        },

        dracula: {
            container: {
                selector: '.json2html-container',
                properties: {
                    background: '#282a36',
                },
            },

            spoilerToggle: {
                selector: `.json2html-spoiler-toggle--collapsed, .json2html-spoiler-toggle--uncollapsed`,
                properties: {
                    color: '#ffffff',
                },
            },

            key: {
                selector: '.json2html-key',
                properties: {
                    color: '#8be9fd',
                },
            },

            valueTypeBoolean: {
                selector: '.json2html-type__boolean',
                properties: {
                    color: '#bd93f9',
                },
            },

            valueMinusSign: {
                selector: '.json2html-value__minus-sign',
                properties: {
                    color: '#ff79c6',
                },
            },

            valueTypeNumber: {
                selector: '.json2html-type__number',
                properties: {
                    color: '#bd93f9',
                },
            },

            valueTypeString: {
                selector: '.json2html-type__string',
                properties: {
                    color: '#f1fa8c',
                },
            },

            valueTypeStringLink: {
                selector: '.json2html-type__string a, .json2html-type__string a:visited',
                properties: {
                    color: '#ff79c6',
                },
            },

            valueTypeNull: {
                selector: '.json2html-type__null',
                properties: {
                    color: '#6272a4',
                },
            },

            valueTypeUndefined: {
                selector: '.json2html-type__undefined',
                properties: {
                    color: '#ffb86c',
                },
            },

            valueComplexItemSignature: {
                selector: '.json2html-type__array, .json2html-type__object',
                properties: {
                    color: "#f8f8f2",
                },
            },

            collapseAllToggle: {
                selector: '.json2html-collapse-all-toggle',
                properties: {
                    color: 'white',
                },
            },
        
        },

        'github-dark': {
            container: {
                selector: '.json2html-container',
                properties: {
                    background: '#0d1117',
                },
            },

            spoilerToggle: {
                selector: `.json2html-spoiler-toggle--collapsed, .json2html-spoiler-toggle--uncollapsed`,
                properties: {
                    color: '#afafaf',
                },
            },

            key: {
                selector: '.json2html-key',
                properties: {
                    color: '#c9d1d9',
                },
            },

            valueTypeBoolean: {
                selector: '.json2html-type__boolean',
                properties: {
                    color: '#b392f0',
                },
            },

            valueMinusSign: {
                selector: '.json2html-value__minus-sign',
                properties: {
                    color: '#ff79c6',
                },
            },

            valueTypeNumber: {
                selector: '.json2html-type__number',
                properties: {
                    color: '#9ecbff',
                },
            },

            valueTypeString: {
                selector: '.json2html-type__string',
                properties: {
                    color: '#9ecbff',
                },
            },

            valueTypeStringLink: {
                selector: '.json2html-type__string a, .json2html-type__string a:visited',
                properties: {
                    color: '#9ecbff',
                },
            },

            valueTypeNull: {
                selector: '.json2html-type__null',
                properties: {
                    color: '#6a737d',
                },
            },

            valueTypeUndefined: {
                selector: '.json2html-type__undefined',
                properties: {
                    color: '#9ecbff',
                },
            },

            valueComplexItemSignature: {
                selector: '.json2html-type__array, .json2html-type__object',
                properties: {
                    color: "#9ecbff",
                },
            },

            collapseAllToggle: {
                selector: '.json2html-collapse-all-toggle',
                properties: {
                    color: '#6a737d',
                },
            },
        
        },

        'github-light': {
            container: {
                selector: '.json2html-container',
                properties: {
                    background: '#ffffff',
                },
            },

            spoilerToggle: {
                selector: `.json2html-spoiler-toggle--collapsed, .json2html-spoiler-toggle--uncollapsed`,
                properties: {
                    color: '#afafaf',
                },
            },

            key: {
                selector: '.json2html-key',
                properties: {
                    color: '#25292f',
                },
            },

            valueTypeBoolean: {
                selector: '.json2html-type__boolean',
                properties: {
                    color: '#6f42c1',
                },
            },

            valueMinusSign: {
                selector: '.json2html-value__minus-sign',
                properties: {
                    color: '#25292f',
                },
            },

            valueTypeNumber: {
                selector: '.json2html-type__number',
                properties: {
                    color: '#005cc5',
                },
            },

            valueTypeString: {
                selector: '.json2html-type__string',
                properties: {
                    color: '#0a3069',
                },
            },

            valueTypeStringLink: {
                selector: '.json2html-type__string a, .json2html-type__string a:visited',
                properties: {
                    color: '#0a3069',
                },
            },

            valueTypeNull: {
                selector: '.json2html-type__null',
                properties: {
                    color: '#6a737d',
                },
            },

            valueTypeUndefined: {
                selector: '.json2html-type__undefined',
                properties: {
                    color: '#005cc5',
                },
            },

            valueComplexItemSignature: {
                selector: '.json2html-type__array, .json2html-type__object',
                properties: {
                    color: "#005cc5",
                },
            },

            collapseAllToggle: {
                selector: '.json2html-collapse-all-toggle',
                properties: {
                    color: '#6a737d',
                },
            },
        
        },

        'gruvbox-dark': {
            container: {
                selector: '.json2html-container',
                properties: {
                    background: '#282828',
                },
            },

            spoilerToggle: {
                selector: `.json2html-spoiler-toggle--collapsed, .json2html-spoiler-toggle--uncollapsed`,
                properties: {
                    color: '#585858',
                },
            },

            key: {
                selector: '.json2html-key',
                properties: {
                    color: '#98971A',
                },
            },

            valueTypeBoolean: {
                selector: '.json2html-type__boolean',
                properties: {
                    color: '#B16286',
                },
            },

            valueMinusSign: {
                selector: '.json2html-value__minus-sign',
                properties: {
                    color: '#8ec07c',
                },
            },

            valueTypeNumber: {
                selector: '.json2html-type__number',
                properties: {
                    color: '#B16286',
                },
            },

            valueTypeString: {
                selector: '.json2html-type__string',
                properties: {
                    color: '#458588',
                },
            },

            valueTypeStringLink: {
                selector: '.json2html-type__string a, .json2html-type__string a:visited',
                properties: {
                    color: '#689D6A',
                },
            },

            valueTypeNull: {
                selector: '.json2html-type__null',
                properties: {
                    color: '#504945',
                },
            },

            valueTypeUndefined: {
                selector: '.json2html-type__undefined',
                properties: {
                    color: '#CC241D',
                },
            },

            valueComplexItemSignature: {
                selector: '.json2html-type__array, .json2html-type__object',
                properties: {
                    color: "#A89984",
                },
            },

            collapseAllToggle: {
                selector: '.json2html-collapse-all-toggle',
                properties: {
                    color: '#6a737d',
                },
            },
        
        },

        'gruvbox-light': {
            container: {
                selector: '.json2html-container',
                properties: {
                    background: '#FBF1C7',
                },
            },

            spoilerToggle: {
                selector: `.json2html-spoiler-toggle--collapsed, .json2html-spoiler-toggle--uncollapsed`,
                properties: {
                    color: '#9c967a',
                },
            },

            key: {
                selector: '.json2html-key',
                properties: {
                    color: '#98971A',
                },
            },

            valueTypeBoolean: {
                selector: '.json2html-type__boolean',
                properties: {
                    color: '#B16286',
                },
            },

            valueMinusSign: {
                selector: '.json2html-value__minus-sign',
                properties: {
                    color: '#CC241D',
                },
            },

            valueTypeNumber: {
                selector: '.json2html-type__number',
                properties: {
                    color: '#B16286',
                },
            },

            valueTypeString: {
                selector: '.json2html-type__string',
                properties: {
                    color: '#458588',
                },
            },

            valueTypeStringLink: {
                selector: '.json2html-type__string a, .json2html-type__string a:visited',
                properties: {
                    color: '#689D6A',
                },
            },

            valueTypeNull: {
                selector: '.json2html-type__null',
                properties: {
                    color: '#BDAE93',
                },
            },

            valueTypeUndefined: {
                selector: '.json2html-type__undefined',
                properties: {
                    color: '#CC241D',
                },
            },

            valueComplexItemSignature: {
                selector: '.json2html-type__array, .json2html-type__object',
                properties: {
                    color: "#7C6F64",
                },
            },

            collapseAllToggle: {
                selector: '.json2html-collapse-all-toggle',
                properties: {
                    color: '#7C6F64',
                },
            },
        
        },

        horizon: {
            container: {
                selector: '.json2html-container',
                properties: {
                    background: '#fffbf7',
                },
            },

            spoilerToggle: {
                selector: `.json2html-spoiler-toggle--collapsed, .json2html-spoiler-toggle--uncollapsed`,
                properties: {
                    color: '#585858',
                },
            },

            key: {
                selector: '.json2html-key',
                properties: {
                    color: '#da103f',
                },
            },

            valueTypeBoolean: {
                selector: '.json2html-type__boolean',
                properties: {
                    color: '#8a31b9',
                },
            },

            valueMinusSign: {
                selector: '.json2html-value__minus-sign',
                properties: {
                    color: '#b44343',
                },
            },

            valueTypeNumber: {
                selector: '.json2html-type__number',
                properties: {
                    color: '#1766a5',
                },
            },

            valueTypeString: {
                selector: '.json2html-type__string',
                properties: {
                    color: '#f6661e',
                },
            },

            valueTypeStringLink: {
                selector: '.json2html-type__string a, .json2html-type__string a:visited',
                properties: {
                    color: '#c14e15',
                },
            },

            valueTypeNull: {
                selector: '.json2html-type__null',
                properties: {
                    color: '#9b9b9b',
                },
            },

            valueTypeUndefined: {
                selector: '.json2html-type__undefined',
                properties: {
                    color: '#3f51b5',
                },
            },

            valueComplexItemSignature: {
                selector: '.json2html-type__array, .json2html-type__object',
                properties: {
                    color: "#846e64",
                },
            },

            collapseAllToggle: {
                selector: '.json2html-collapse-all-toggle',
                properties: {
                    color: '#black',
                },
            },
        
        },

        monokai: {
            container: {
                selector: '.json2html-container',
                properties: {
                    background: '#272822',
                },
            },

            spoilerToggle: {
                selector: `.json2html-spoiler-toggle--collapsed, .json2html-spoiler-toggle--uncollapsed`,
                properties: {
                    color: '#585858',
                },
            },

            key: {
                selector: '.json2html-key',
                properties: {
                    color: '#F92672',
                },
            },

            valueTypeBoolean: {
                selector: '.json2html-type__boolean',
                properties: {
                    color: '#AE81FF',
                },
            },

            valueMinusSign: {
                selector: '.json2html-value__minus-sign',
                properties: {
                    color: '#f92672',
                },
            },

            valueTypeNumber: {
                selector: '.json2html-type__number',
                properties: {
                    color: '#AE81FF',
                },
            },

            valueTypeString: {
                selector: '.json2html-type__string',
                properties: {
                    color: '#E6DB74',
                },
            },

            valueTypeStringLink: {
                selector: '.json2html-type__string a, .json2html-type__string a:visited',
                properties: {
                    color: '#F8F8F2',
                },
            },

            valueTypeNull: {
                selector: '.json2html-type__null',
                properties: {
                    color: '#75715E',
                },
            },

            valueTypeUndefined: {
                selector: '.json2html-type__undefined',
                properties: {
                    color: '#FD971F',
                },
            },

            valueComplexItemSignature: {
                selector: '.json2html-type__array, .json2html-type__object',
                properties: {
                    color: "#66D9EF",
                },
            },

            collapseAllToggle: {
                selector: '.json2html-collapse-all-toggle',
                properties: {
                    color: 'white',
                },
            },
        
        },
    }

    return themes[themeName];
}



/**
 * Return ready CSS code.
 * @param themeName name of theme
 * @returns 
 */
export function generateCSSCode(themeObject: any){
    let cssCode = `
/* generated by src/ts/lib/themes.ts generateCSSCode() function */
    `;
        
    const elements = Object.keys(themeObject);

    elements.forEach((element: string) => {
        const selector = themeObject[element].selector;
        const properties:string = [...Object.keys(themeObject[element].properties)]
                                        .map((property:string) => {
                                            return `${property}: ${themeObject[element].properties[property]};\n`
                                        })
                                        .join('');
        

        cssCode += `\n${selector} {
    ${properties}}\n`;
    });
    
    return cssCode;
}



/**
 * Creates or updates json2html style node.
 * @param themeName name of theme
 */
export function updateThemeCSS(cssCode: string, dataMarker: string){
    // Checks if style tag already exists
    const themeCSS = document.head.querySelector(dataMarker); //'[data-style-origin="json2html"]'

    // if exist
    if(themeCSS){
        // just update
        themeCSS.innerHTML = cssCode;
    } else {
        // else create and insert style tag
        const style = document.createElement('style');
        const dataAttrName = dataMarker.split('=')[0].replace(/\[+/gm, '');
        const dataAttrvalue = dataMarker.split('=')[1].replace(/(\]|\")+/gm, '');

        style.type = 'text/css';
        style.setAttribute(dataAttrName, dataAttrvalue);
        style.innerHTML = cssCode;
        document.head.appendChild(style);
    }
}



/**
 * Updates theme using name of theme string.
 * @param themeName name of theme
 */
export function updateTheme(themeName: string){
    const isUserTheme = /css\/themes\/[a-zA-Z\-0-9]+\.css/.test(themeName);

    if(isUserTheme){
        const path = themeName;
        const userThemeStyle = document.createElement('link');

        userThemeStyle.href = path;
        userThemeStyle.rel = 'stylesheet';

        document.head.appendChild(userThemeStyle);
    } else {
        const themeColors = getThemeProperies(themeName);
        const cssCode = generateCSSCode(themeColors);
    
        // for saving info about source
        const dataMarker = '[data-style-origin="json2html"]';
    
        updateThemeCSS(cssCode, dataMarker);
    }
}