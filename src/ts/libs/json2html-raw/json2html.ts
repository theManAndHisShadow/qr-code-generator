import { isLink, isArray, isObject, addMultipleEventHandlers, emulateEvent} from './helpers';
import { updateTheme } from './themes';



// define some types
type ErrorHandler = (error: Error) => void



/**
 * Checks given value type and returns CSS class name for it.
 * @param value 
 * @returns CSS class name, for example: "json2html-type__boolean"
 */
function getValueTypeClassName(value: any){
    const classNameSample = 'json2html-type__';
    const type = value == null || value == "undefined" ? value : typeof value;

    return classNameSample + type;
}



/**
 * Checks given value type and if is type "string" wraps value to double quotes.
 * @param value 
 * @returns prepared value
 */
function wrapValue(value: any){
    const isString = typeof value == 'string';
    const isNull = value == null;
    
    let wrapped = value;
    if(isNull) wrapped = `${value}`;
    if(isString) wrapped = `"${value}"`;

    return wrapped;
}



/**
 * Renders pair, where key:value - value is primitive type value.
 * @param keyName
 * @param itemValue 
 * @returns ready for other manipulations HTML Node.
 */
function renderPrimitiveItem(params: {
    keyName: string, 
    itemValue: any, 
    highlightLinks: boolean, 
    openLinksInNewTab: boolean, 
    showTypeOnHover: boolean
}){
    const element = document.createElement('div');
    element.classList.add('json2html-pair');
    
    const propertyName = document.createElement('span');
    propertyName.textContent = params.keyName + ": ";
    propertyName.classList.add('json2html-key');
    
    const value = document.createElement('span');
    
    // if it`s a negative number - render "minus sign"
    if(typeof params.itemValue === 'number' && params.itemValue < 0){
        const minusSign = document.createElement('span');
        minusSign.classList.add('json2html-value__minus-sign');
        minusSign.textContent = '-';

        value.appendChild(minusSign);
        value.innerHTML += (Math.abs(params.itemValue));
    } else {
        value.textContent = wrapValue(params.itemValue);
    }

    // show browser tooltip at primitive key value on hover
    if(params.showTypeOnHover === true) {
        let tip = params.itemValue == null ? 'null' : typeof params.itemValue;

        // special tooltip for links
        if(params.highlightLinks === true && isLink(params.itemValue)) {
            tip = 'string (clickable link)'
        }

        value.setAttribute('title', tip);
    }

    // insert link if highlightLinks is true and string is link
    if(params.highlightLinks === true && isLink(params.itemValue)) {
        const link = document.createElement('a');
        if(params.openLinksInNewTab === true) link.setAttribute('target', '_blank');
        link.href = params.itemValue;
        link.textContent = `"${params.itemValue}"`;

        value.textContent = '';
        value.appendChild(link);
    }

    value.classList.add('json2html-value');
    value.classList.add(getValueTypeClassName(params.itemValue));

    element.appendChild(propertyName);
    element.appendChild(value);

    return element;
}



/**
 * Checks the presence of nested elements.
 * @param targetItem parent item to check
 * @returns 
 */
function hasNestedItems(targetItem: any){
    let result = false;
    
    Object.values(targetItem).forEach(targetItem => {
        if(targetItem !== null){
            if(isObject(targetItem) || isArray(targetItem)) result = true;
        }
    });

    return result;
}



/**
 * Updates the text content of the collapse button.
 * @param spoiler target spoiler, that affects to collapse buttons text contents
 * @param collapseButton Target collapse button. An optional argument. If empty, the function will itself look for a button
 */
function updateCollapseToggle(spoiler: Element, collapseButton?: Element){
    const collapseButtonClassName = 'json2html-collapse-all-toggle';
    collapseButton = collapseButton || spoiler.parentElement.querySelector(`.${collapseButtonClassName}`);

    const toggleState = spoiler.className.split('--')[1];
    const action = toggleState == "uncollapsed" ? "collapse" : "uncollapse";
    if(collapseButton) collapseButton.textContent = `(${action} all)`
}



/**
 * Renders collapse helper buttons near complex pairs.
 * @param params 
 */
function renderCollapseButtons(params: {targetSpoiler: Element, renderIn: Element, collapsed: boolean, nestedObject: any}){
    const collapseButtonClassName = 'json2html-collapse-all-toggle';
    const isExist = params.renderIn.querySelector(`${collapseButtonClassName}`);
    const collapseAllNestedBtn = isExist || document.createElement('span');
    
    if(!isExist) collapseAllNestedBtn.className = collapseButtonClassName;
    
    // initial button element update
    updateCollapseToggle(params.targetSpoiler, collapseAllNestedBtn);

    // on click emulate clicking at spoiler buttons c:
    collapseAllNestedBtn.addEventListener('click', event => {
        // get all spoilers button on that tree branch
        const sploilers = params.renderIn.querySelectorAll('.' + params.targetSpoiler.className);
        
        sploilers.forEach(spoiler => {
            emulateEvent(spoiler, 'click');

            updateCollapseToggle(spoiler);
        });

    });

    // add once
    if(!isExist) params.renderIn.appendChild(collapseAllNestedBtn);
}



/**
 * Gruops array item onto groups segments using size arg.
 * @param array target array
 * @param size size of group
 * @returns 
 */
function groupBigArrayItems(array: any[], size: number){
    let startPosition = 0;
    const grouped:any = {};

    for(let i = 0; i <= Math.ceil(array.length / size); i++) {
        const endPosition = i*size > array.length ? array.length : i*size;
        const dynamicKeyName: string = `[${startPosition} ... ${endPosition - 1}]`;
        const clone = array.slice(startPosition, endPosition);
        const part: any[] = [];
        
        clone.forEach((item, index) => {
            part[index + startPosition] = item;
        });

        if(startPosition !== endPosition) grouped[dynamicKeyName] = part;

        startPosition = i*size;
    }

    return grouped
}



/**
 * Renders complex pair, where key:value - value is Object or Array.
 * @param keyName 
 * @param itemValue 
 * @returns ready for other manipulations HTML Node.
 */
function renderComplexItem(params: {
    depth: number,
    keyName: string, 
    itemValue: any, 
    renderNestedLength: boolean, 
    highlightLinks: boolean, 
    openLinksInNewTab: boolean,
    collapseAll: boolean,  
    showLevel: number,
    showTypeOnHover: boolean,
    groupBigArrayItemsBy: number,
    isGroupItem: boolean,
}){ 
    let depth = params.depth + 1;
    const values = Object.values(params.itemValue);
    const useGrouping = values.length > params.groupBigArrayItemsBy;
    const nestedObject = useGrouping ? groupBigArrayItems(values, params.groupBigArrayItemsBy) : params.itemValue;
    const nestedObjectSize = Object.values(nestedObject).length;

    const renderedNested = render({
        depth: depth,
        parsedJSON: nestedObject,
        renderNestedLength: params.renderNestedLength,
        highlightLinks: params.highlightLinks,
        openLinksInNewTab: params.openLinksInNewTab,
        collapseAll: params.collapseAll,
        showLevel: params.showLevel,
        showTypeOnHover: params.showTypeOnHover,
        groupBigArrayItemsBy: params.groupBigArrayItemsBy,
        isGroupItem: useGrouping,
    });
    renderedNested.classList.add('json2html-nested-value');

    const nestedElement = document.createElement('div');
    nestedElement.classList.add('json2html-complex-pair');
    nestedElement.setAttribute('data-tree-level', `${depth}`);

    const spoilerBtn = document.createElement('span');
    spoilerBtn.textContent = '▶';

    // collapsin at start (or not)
    if(params.collapseAll === true){
        spoilerBtn.classList.add('json2html-spoiler-toggle--collapsed');
        renderedNested.setAttribute('hidden', '');
    } else {
        if(depth <= params.showLevel) {
            spoilerBtn.classList.add('json2html-spoiler-toggle--uncollapsed');
        } else {
            spoilerBtn.classList.add('json2html-spoiler-toggle--collapsed');
            renderedNested.setAttribute('hidden', '');
        }
    }

    const parentPropertyName = document.createElement('span');
    parentPropertyName.textContent = params.keyName + ": ";
    parentPropertyName.classList.add('json2html-key');

    const typeSignature = document.createElement('span');
    typeSignature.textContent = params.itemValue.constructor.name;

    if(nestedObjectSize > 0){
        // Adding multiple event handlers, 
        // clicking on an element from the array below should invoke callback
        addMultipleEventHandlers([
            spoilerBtn, 
            parentPropertyName, 
            typeSignature
        ], 'click', event => {
            const collapsed = 'json2html-spoiler-toggle--collapsed';
            const uncollapsed = 'json2html-spoiler-toggle--uncollapsed';
    
            // toggle nested object
            if(spoilerBtn.classList.contains(collapsed)) {
                spoilerBtn.classList.remove(collapsed);
                spoilerBtn.classList.add(uncollapsed);
                renderedNested.removeAttribute('hidden');
            } else {
                spoilerBtn.classList.add(collapsed);
                spoilerBtn.classList.remove(uncollapsed);
                renderedNested.setAttribute('hidden', '');
            };
    
            updateCollapseToggle(spoilerBtn);
        });
    }

    let rawConstructorName = params.itemValue.constructor.name;
    let rawConstructorName__firstLetter = rawConstructorName[0].toLowerCase();
    let rawConstructorName__otherLetters = rawConstructorName.slice(1);
    const constructorName =  rawConstructorName__firstLetter + rawConstructorName__otherLetters;

    // only for Array items
    if(params.renderNestedLength === true) {
        if(isArray(params.itemValue)) {
            // if it is part of grouped array - as length use group size 
            // because there a bug that show incorrect common array size
            let length = params.itemValue.length;

            if(params.isGroupItem){
                let firstIndex = Number(params.keyName.split(' ... ')[0].replace('[', ''));
                let lastIndex = Number(params.keyName.split(' ... ')[1].replace(']', ''));

                length = lastIndex - firstIndex + 1;
            }

            // specify empty variant
            const size = length == 0 ? 'empty' : length;

            // define item word
            const word = size == "empty" 
                    ? "" : size == 1 
                        ? ' item' : " items";
    
        
            typeSignature.textContent += ` (${size}${word})`;
        } else if(isObject(params.itemValue) && Object.keys(params.itemValue).length === 0){
            typeSignature.textContent += ` (empty)`;
        }
    }

    typeSignature.classList.add('json2html-type__' + constructorName);
    
    if(Object.values(nestedObject).length > 0) nestedElement.appendChild(spoilerBtn);

    nestedElement.appendChild(parentPropertyName);
    nestedElement.appendChild(typeSignature);

    // if item contains nested object 
    // render special button "collapse all" 
    // only complex values that can be collapsed 
    // cause primitive values conatins simple structures
    if(Object.values(nestedObject).length > 0 && hasNestedItems(nestedObject)) {
        renderCollapseButtons({
            targetSpoiler: spoilerBtn,
            renderIn: nestedElement,
            collapsed: params.collapseAll,
            nestedObject: nestedObject,
        });
    }

    if(Object.values(nestedObject).length > 0) nestedElement.appendChild(renderedNested);
    
    return nestedElement;
}



/**
 * Renders entire object tree into HTML tags and nodes.
 * @param parsedJSON regular object, parsed JSON object
 * @returns fully ready HTMLDivElement
 */
function render(params: {
    depth: number,
    parsedJSON: any, 
    renderNestedLength: boolean, 
    openLinksInNewTab: boolean,
    highlightLinks: boolean, 
    collapseAll: boolean,
    showLevel: number  
    showTypeOnHover: boolean, 
    groupBigArrayItemsBy: number,
    isGroupItem: boolean,
}){
    const keys = Object.keys(params.parsedJSON);

    // rendered child nodes
    const siblings: any[] = [];

    // result node
    const rendered: HTMLDivElement = document.createElement('div');
    rendered.classList.add('json2html-container');
    
    // render per key
    keys.forEach(key => {
        // if key has complex value - use renderComplexItem()
        if(isArray(params.parsedJSON[key]) || isObject(params.parsedJSON[key])) {
            const nestedElement = renderComplexItem({
                depth: params.depth,
                keyName: key,
                itemValue: params.parsedJSON[key],
                renderNestedLength: params.renderNestedLength,
                highlightLinks: params.highlightLinks,
                openLinksInNewTab: params.openLinksInNewTab,
                collapseAll: params.collapseAll,
                showLevel: params.showLevel,
                showTypeOnHover: params.showTypeOnHover,
                groupBigArrayItemsBy: params.groupBigArrayItemsBy,
                isGroupItem: params.isGroupItem,
           });

            siblings.push(nestedElement);

        // if key has primitive value - use renderPrimitiveItem()
        } else {
            const element = renderPrimitiveItem({
                keyName: key,
                itemValue:  params.parsedJSON[key],
                highlightLinks: params.highlightLinks,
                openLinksInNewTab: params.openLinksInNewTab,
                showTypeOnHover: params.showTypeOnHover,
            });
            
            siblings.push(element);
        }
    });

    // make tree
    siblings.forEach(node => {
        rendered.appendChild(node);
    });

    return rendered;
}



/**
 * Renders JSON string in colored and formatted HTML block.
 * @param params.json JSON string to render
 * @param params.rootName Name of root rendered object key. By default 'json'.
 * @param params.renderNestedLength Allows render Array length in Array type signature. By default - true.
 * @param params.highlightLinks Allows render url string as <a> clickable tag. By default - true.
 * @param params.openLinksInNewTab On true value - opens links at new browser tab. By default - true.
 * @param params.collapseAll On true value - renders HTML block at start with minimized (collapsed) content. By default - true.
 * @param params.showLevel Collapse all levels except given level value. 
 * This option ignoring if params.collapseAll is true! By default - 1.
 * @param params.showTypeOnHover On true value - show default html "title" tooltip on primitive values with their type. By default - true.
 * @param params.theme Renders HTML block with given theme. By default uses "dracula" theme. 
 * Supports 9 themes: andromeda, daylight, dracula, gruvbox-dark, gruvbox-light, github-light, github-dark, horizon, monokai. 
 * Also supports user themes. For more info check project`s github mini wiki.
 * @param params.onError error handler callback function, gives access to Error instance.
 * @param params.groupBigArrayItemsBy Size of group in big array. By default - 100. Minimum value - 25 
 * That means if array length > 100 - array will be grouped onto 'n' groups by 100 items.
 * @returns 
 */
export function json2html(params: {
    json: string, 
    rootName?: string,
    renderNestedLength?: boolean, 
    highlightLinks?: boolean, 
    openLinksInNewTab?: boolean,
    collapseAll?: boolean, 
    showLevel?: number,
    showTypeOnHover?: boolean, 
    theme?: string,
    onError?:ErrorHandler,
    groupBigArrayItemsBy?: number,
}){
    // default values
    params.rootName = params.rootName || 'json';
    params.renderNestedLength = params.renderNestedLength == false ? false : true;
    params.highlightLinks = params.highlightLinks == false ? false : true;
    params.openLinksInNewTab = params.openLinksInNewTab == false ? false : true;
    params.collapseAll = params.collapseAll == true ? true : false;
    params.showLevel = params.showLevel || 1;
    params.showTypeOnHover = params.showTypeOnHover == false ? false : true;
    params.theme = params.theme || 'andromeda';
    params.groupBigArrayItemsBy = params.groupBigArrayItemsBy <= 25 ? 25 : params.groupBigArrayItemsBy || 100;


    // update json2html theme at start
    updateTheme(params.theme);

    // Wrapping JSON.parse call in trycatch
    try {
        const parsed = JSON.parse(params.json);
        const rendered = render({
            depth: 0,
            parsedJSON: {[params.rootName]: parsed},
            renderNestedLength: params.renderNestedLength,
            highlightLinks: params.highlightLinks,
            openLinksInNewTab: params.openLinksInNewTab,
            collapseAll: params.collapseAll,
            showLevel: params.showLevel,
            showTypeOnHover: params.showTypeOnHover,
            groupBigArrayItemsBy: params.groupBigArrayItemsBy,
            isGroupItem: false,
        });
        
        return rendered;
    } catch (error) {
        // Invoking params.onError for error handling 
        params.onError(error);
    }
}