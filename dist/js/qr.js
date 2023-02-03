/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/encoder.ts":
/*!***************************!*\
  !*** ./src/ts/encoder.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.encodeStringToBinaryBytes = exports.decimalToBinary = exports.convertAllItemsToCodes = exports.groupLettersByTwo = exports.sanitizeInput = void 0;\n/**\n * Returns code of single letter.\n * @param letter target letter\n * @returns number code (0-44)\n */\nfunction getLetterCode(letter) {\n    var codes = {\n        \"0\": 0,\n        \"1\": 1,\n        \"2\": 2,\n        \"3\": 3,\n        \"4\": 4,\n        \"5\": 5,\n        \"6\": 6,\n        \"7\": 7,\n        \"8\": 8,\n        \"9\": 9,\n        \"A\": 10,\n        \"B\": 11,\n        \"C\": 12,\n        \"D\": 13,\n        \"E\": 14,\n        \"F\": 15,\n        \"G\": 16,\n        \"H\": 17,\n        \"I\": 18,\n        \"J\": 19,\n        \"K\": 20,\n        \"L\": 21,\n        \"M\": 22,\n        \"N\": 23,\n        \"O\": 24,\n        \"P\": 25,\n        \"Q\": 26,\n        \"R\": 27,\n        \"S\": 28,\n        \"T\": 29,\n        \"U\": 30,\n        \"V\": 31,\n        \"W\": 32,\n        \"X\": 33,\n        \"Y\": 34,\n        \"Z\": 35,\n        \" \": 36,\n        \"$\": 37,\n        \"%\": 38,\n        \"*\": 39,\n        \"+\": 40,\n        \"-\": 41,\n        \".\": 42,\n        \"/\": 43,\n        \":\": 44\n    };\n    return codes[letter];\n}\n/**\n * Removes all restricted symbols.\n * @param inputText\n * @returns sanitized string\n */\nfunction sanitizeInput(inputText) {\n    var sanitized = inputText.replace(/([^a-zA-Z0-9$%*+-./:\\s])+/g, '');\n    var atUpperCase;\n    atUpperCase = sanitized.split('');\n    atUpperCase = atUpperCase.map(function (letter) {\n        return letter.toLocaleUpperCase();\n    });\n    return atUpperCase.join('');\n}\nexports.sanitizeInput = sanitizeInput;\n/**\n * Groups letters at string to pairs.\n * @param string target string\n * @returns\n */\nfunction groupLettersByTwo(string) {\n    return string.match(/.{1,2}/g);\n}\nexports.groupLettersByTwo = groupLettersByTwo;\n/**\n * Convert all pair of letters to pair of codes.\n * @param groups\n * @returns\n */\nfunction convertAllItemsToCodes(groups) {\n    return groups.map(function (group) {\n        return group.length < 2\n            ? [getLetterCode(group[0])]\n            : [getLetterCode(group[0]), getLetterCode(group[1])];\n    });\n}\nexports.convertAllItemsToCodes = convertAllItemsToCodes;\n/**\n * Turns pair of letters to binary value.\n * @param pairs\n * @returns\n */\nfunction pairsToBinary(pairs) {\n    var binaries = pairs.map(function (pair) {\n        return pair.length < 2\n            ? decimalToBinary(pair[0], 6)\n            : decimalToBinary(pair[0] * 45 + pair[1], 11);\n    });\n    return binaries;\n}\n/**\n * Converts decimal into to bynary.\n * @param number target number\n * @param bit NB! bit size of result value\n * @returns\n */\nfunction decimalToBinary(number, bit) {\n    return number.toString(2).padStart(bit, \"0\");\n    ;\n}\nexports.decimalToBinary = decimalToBinary;\n/**\n * Encode given string to binary line value.\n * @param string target string.\n * @returns binary value (string)\n */\nfunction encodeStringToBinaryBytes(string) {\n    var sanitized = sanitizeInput(string);\n    var grouped = groupLettersByTwo(sanitized);\n    var converted = convertAllItemsToCodes(grouped);\n    var binaries = pairsToBinary(converted);\n    return binaries.join('');\n}\nexports.encodeStringToBinaryBytes = encodeStringToBinaryBytes;\n\n\n//# sourceURL=webpack:///./src/ts/encoder.ts?");

/***/ }),

/***/ "./src/ts/qr.ts":
/*!**********************!*\
  !*** ./src/ts/qr.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.qr = void 0;\nvar encoder_1 = __webpack_require__(/*! ./encoder */ \"./src/ts/encoder.ts\");\nfunction qr(targetToConvert) {\n    return (0, encoder_1.encodeStringToBinaryBytes)(targetToConvert);\n}\nexports.qr = qr;\nconsole.log(qr('hello'));\n\n\n//# sourceURL=webpack:///./src/ts/qr.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/ts/qr.ts");
/******/ 	
/******/ })()
;