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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.encodeStringToBinaryBytes = exports.convertAllItemsToCodes = exports.groupLettersByTwo = exports.sanitizeInput = void 0;\nvar helpers_1 = __webpack_require__(/*! ./helpers */ \"./src/ts/helpers.ts\");\n/**\n * Returns code of single letter.\n * @param letter target letter\n * @returns number code (0-44)\n */\nfunction getLetterCode(letter) {\n    var codes = {\n        \"0\": 0,\n        \"1\": 1,\n        \"2\": 2,\n        \"3\": 3,\n        \"4\": 4,\n        \"5\": 5,\n        \"6\": 6,\n        \"7\": 7,\n        \"8\": 8,\n        \"9\": 9,\n        \"A\": 10,\n        \"B\": 11,\n        \"C\": 12,\n        \"D\": 13,\n        \"E\": 14,\n        \"F\": 15,\n        \"G\": 16,\n        \"H\": 17,\n        \"I\": 18,\n        \"J\": 19,\n        \"K\": 20,\n        \"L\": 21,\n        \"M\": 22,\n        \"N\": 23,\n        \"O\": 24,\n        \"P\": 25,\n        \"Q\": 26,\n        \"R\": 27,\n        \"S\": 28,\n        \"T\": 29,\n        \"U\": 30,\n        \"V\": 31,\n        \"W\": 32,\n        \"X\": 33,\n        \"Y\": 34,\n        \"Z\": 35,\n        \" \": 36,\n        \"$\": 37,\n        \"%\": 38,\n        \"*\": 39,\n        \"+\": 40,\n        \"-\": 41,\n        \".\": 42,\n        \"/\": 43,\n        \":\": 44\n    };\n    return codes[letter];\n}\n/**\n * Removes all restricted symbols.\n * @param inputText\n * @returns sanitized string\n */\nfunction sanitizeInput(inputText) {\n    var sanitized = inputText.replace(/([^a-zA-Z0-9$%*+-./:\\s]|\\,)+/g, '');\n    var atUpperCase;\n    atUpperCase = sanitized.split('');\n    // unify all input data letter case\n    atUpperCase = atUpperCase.map(function (letter) {\n        return letter.toLocaleUpperCase();\n    });\n    return atUpperCase.join('');\n}\nexports.sanitizeInput = sanitizeInput;\n/**\n * Groups letters at string to pairs.\n * @param string target\n * @returns\n */\nfunction groupLettersByTwo(string) {\n    return string.match(/.{1,2}/g);\n}\nexports.groupLettersByTwo = groupLettersByTwo;\n/**\n * Convert all pair of letters to pair of codes.\n * @param groups\n * @returns\n */\nfunction convertAllItemsToCodes(groups) {\n    return groups.map(function (group) {\n        return group.length < 2\n            ? [getLetterCode(group[0])]\n            : [getLetterCode(group[0]), getLetterCode(group[1])];\n    });\n}\nexports.convertAllItemsToCodes = convertAllItemsToCodes;\n/**\n * Turns pair of letters to binary value.\n * @param pairs\n * @returns\n */\nfunction pairsToBinary(pairs) {\n    var binaries = pairs.map(function (pair) {\n        return pair.length < 2\n            ? (0, helpers_1.decimalToBinary)(pair[0], 6)\n            : (0, helpers_1.decimalToBinary)(pair[0] * 45 + pair[1], 11);\n    });\n    return binaries;\n}\n/**\n * Encode given string to binary line value.\n * @param string target\n * @returns binary value (string)\n */\nfunction encodeStringToBinaryBytes(string) {\n    var sanitized = sanitizeInput(string);\n    var grouped = groupLettersByTwo(sanitized);\n    var converted = convertAllItemsToCodes(grouped);\n    var binaries = pairsToBinary(converted);\n    return binaries.join('');\n}\nexports.encodeStringToBinaryBytes = encodeStringToBinaryBytes;\n\n\n//# sourceURL=webpack:///./src/ts/encoder.ts?");

/***/ }),

/***/ "./src/ts/helpers.ts":
/*!***************************!*\
  !*** ./src/ts/helpers.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\nvar __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.verticalFlatten = exports.decimalToBinary = void 0;\n/**\n * Converts decimal into to bynary.\n * @param number target\n * @param bit NB! bit size of result value\n * @returns\n */\nfunction decimalToBinary(number, bit) {\n    return number.toString(2).padStart(bit, \"0\");\n}\nexports.decimalToBinary = decimalToBinary;\n/**\n * Returns rotated rectangular matrix.\n * @param targetArray array to transpose\n * @returns\n */\nfunction rectangularTranspose(targetArray) {\n    // find max \n    var maxLen = __spreadArray([], targetArray, true).sort(function (a, b) { return b.length - a.length; })[0].length;\n    var result = Array.from({ length: maxLen }, function (item, i) { return targetArray.map(function (col) { return col[i]; }); });\n    return result;\n}\n/**\n * Returns flatted array by vertical direction.\n * @param array\n * @returns\n */\nfunction verticalFlatten(array) {\n    var flatted = [];\n    var transposed = rectangularTranspose(__spreadArray([], array, true));\n    flatted = transposed.flat(1).filter(function (item) { return item !== undefined && item.length > 0; });\n    return flatted;\n}\nexports.verticalFlatten = verticalFlatten;\n\n\n//# sourceURL=webpack:///./src/ts/helpers.ts?");

/***/ }),

/***/ "./src/ts/qr.ts":
/*!**********************!*\
  !*** ./src/ts/qr.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.qr = exports.prepareData = void 0;\nvar encoder_1 = __webpack_require__(/*! ./encoder */ \"./src/ts/encoder.ts\");\nvar serviceData_1 = __webpack_require__(/*! ./serviceData */ \"./src/ts/serviceData.ts\");\nvar structurer_1 = __webpack_require__(/*! ./structurer */ \"./src/ts/structurer.ts\");\n/**\n * Prepares input data to working format.\n * @param targetToConvert target data (string, number to encode)\n * @param correction encoding correction level\n * @returns\n */\nfunction prepareData(targetToConvert, correction) {\n    var encodedString = (0, encoder_1.encodeStringToBinaryBytes)(targetToConvert);\n    var serviceData = (0, serviceData_1.getServiceData)(encodedString, correction);\n    var totalLength = serviceData.serviceData.length + encodedString.length;\n    // check multiplicity 8\n    if (totalLength % 8 > 0) {\n        var shortage = (Math.ceil(totalLength / 8) * 8) - totalLength;\n        // add extra zero data\n        encodedString += '0'.repeat(shortage);\n        totalLength = serviceData.serviceData.length + encodedString.length;\n    }\n    // fill bit stream to full capacity\n    for (var i = 0, j = 0; i < serviceData.version.capacity - totalLength; i += 8, j++) {\n        if (j % 2 > 0) {\n            encodedString += '00010001';\n        }\n        else {\n            encodedString += '11101100';\n        }\n    }\n    return {\n        correction: correction,\n        version: serviceData.version,\n        stream: serviceData.serviceData + encodedString,\n        originalData: targetToConvert,\n        serviceData: serviceData.serviceData,\n        encodedData: encodedString\n    };\n}\nexports.prepareData = prepareData;\nfunction qr(targetToConvert, correction) {\n    correction = correction || 'M';\n    var data = prepareData(targetToConvert, correction);\n    var grouped = (0, structurer_1.divideIntoBlocks)(data);\n    return data;\n}\nexports.qr = qr;\n\n\n//# sourceURL=webpack:///./src/ts/qr.ts?");

/***/ }),

/***/ "./src/ts/serviceData.ts":
/*!*******************************!*\
  !*** ./src/ts/serviceData.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getServiceData = exports.getOptimalQRCodeVersion = exports.choseVersion = void 0;\nvar helpers_1 = __webpack_require__(/*! ./helpers */ \"./src/ts/helpers.ts\");\n/**\n * Get code version that can contains bit flow.\n * @param bitsArray correction array\n * @param bitStreamSize bit stream length\n * @returns object {number: version number, capacity: version capacity}\n */\nfunction choseVersion(bitsArray, bitStreamSize) {\n    var filtred = bitsArray.filter(function (bits) { return bitStreamSize <= bits; });\n    var optimal = bitsArray.indexOf(filtred[0]);\n    return {\n        // version number stored at array index, therefore version = index + 1\n        number: optimal + 1,\n        // optimal capacity value is nearest version capacity at filtered array\n        capacity: filtred[0],\n    };\n}\nexports.choseVersion = choseVersion;\n/**\n * Returns optimal code version using correction level and bit flow length\n * @param correction level L M Q H\n * @param bitStreamSize bit stream length\n * @returns code version\n */\nfunction getOptimalQRCodeVersion(bitStreamSize, correction) {\n    var data = {\n        /**\n         * QR code capacity level\n         * depends at QR_VERSION\n         * QR code level saved at index starting from zero (level = index + 1)\n         * CORRECTION_LEVEL : [QR_VERSION_1, QR_VERSION_N+1...40]\n         */\n        L: [\n            152, 272, 440, 640, 864, 1088, 1248, 1552, 1856, 2192,\n            2592, 2960, 3424, 3688, 4184, 4712, 5176, 5768, 6360,\n            6888, 7456, 8048, 8752, 9392, 10208, 10960, 11744,\n            12248, 13048, 13880, 14744, 15640, 16568, 17528,\n            18448, 19472, 20528, 21616, 22496, 23648\n        ],\n        M: [\n            128, 224, 352, 512, 688, 864, 992, 1232, 1456, 1728,\n            2032, 2320, 2672, 2920, 3320, 3624, 4056, 4504,\n            5016, 5352, 5712, 6256, 6880, 7312, 8000,\n            8496, 9024, 9544, 10136, 10984, 11640,\n            12328, 13048, 13800, 14496, 15312,\n            15936, 16816, 17728, 18672\n        ],\n        Q: [\n            104, 176, 272, 384, 496, 608, 704, 880, 1056, 1232,\n            1440, 1648, 1952, 2088, 2360, 2600, 2936, 3176,\n            3560, 3880, 4096, 4544, 4912, 5312, 5744,\n            6032, 6464, 6968, 7288, 7880, 8264,\n            8920, 9368, 9848, 10288, 10832,\n            11408, 12016, 12656, 13328\n        ],\n        H: [\n            72, 128, 208, 288, 368, 480, 528, 688, 800, 976,\n            1120, 1264, 1440, 1576, 1784, 2024, 2264, 2504,\n            2728, 3080, 3248, 3536, 3712, 4112, 4304,\n            4768, 5024, 5288, 5608, 5960, 6344,\n            6760, 7208, 7688, 7888, 8432,\n            8768, 9136, 9776, 10208\n        ],\n    };\n    var correctionLevelArray = data[correction];\n    var qrVersion = choseVersion(correctionLevelArray, bitStreamSize);\n    return qrVersion;\n}\nexports.getOptimalQRCodeVersion = getOptimalQRCodeVersion;\n/**\n * Returns object with all service data: version, capacity, service prefix bits;\n * contains encoded data, but not original data (originalData = '').\n * @param bitStream encoded bits stream\n * @param correction level\n * @returns\n */\nfunction getServiceData(bitStream, correction) {\n    var version = getOptimalQRCodeVersion(bitStream.length, correction);\n    var serviceDataBitsSize = 1;\n    if (version.number >= 1 || version.number <= 9) {\n        serviceDataBitsSize = 9;\n    }\n    else if (version.number >= 10 && version.number <= 26) {\n        serviceDataBitsSize = 11;\n    }\n    else if (version.number >= 27 && version.number <= 40) {\n        serviceDataBitsSize = 13;\n    }\n    // 0010 - bits prefix for number and letters method encoding\n    var serviceData = \"0010\".concat((0, helpers_1.decimalToBinary)(bitStream.length, serviceDataBitsSize));\n    return {\n        version: version,\n        serviceData: serviceData,\n    };\n}\nexports.getServiceData = getServiceData;\n\n\n//# sourceURL=webpack:///./src/ts/serviceData.ts?");

/***/ }),

/***/ "./src/ts/structurer.ts":
/*!******************************!*\
  !*** ./src/ts/structurer.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.divideIntoBlocks = exports.getBlocksAmount = void 0;\n/**\n * Return amount of blocks, that depends at correction level and version number.\n * @param correction level\n * @param versionNumber\n * @returns\n */\nfunction getBlocksAmount(correction, versionNumber) {\n    var data = {\n        L: [\n            1, 1, 1, 1, 1, 2, 2,\n            2, 2, 4, 4, 4, 4, 4, 6,\n            6, 6, 6, 7, 8, 8, 9, 9, 10,\n            12, 12, 12, 13, 14, 15, 16,\n            17, 18, 19, 19, 20, 21, 22, 24, 25\n        ],\n        M: [\n            1, 1, 1, 2, 2, 4, 4,\n            4, 5, 5, 5, 8, 9, 9, 10,\n            10, 11, 13, 14, 16, 17, 17,\n            18, 20, 21, 23, 25, 26, 28,\n            29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49\n        ],\n        Q: [\n            1, 1, 2, 2, 4, 4, 6,\n            6, 8, 8, 8, 10, 12, 16,\n            12, 17, 16, 18, 21, 20, 23,\n            23, 25, 27, 29, 34, 34, 35,\n            38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68\n        ],\n        H: [\n            1, 1, 2, 4, 4, 4, 5,\n            6, 8, 8, 11, 11, 16, 16,\n            18, 16, 19, 21, 25, 25, 25,\n            34, 30, 32, 35, 37, 40, 42,\n            45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81\n        ],\n    };\n    // index = version - 1\n    return data[correction][versionNumber - 1];\n}\nexports.getBlocksAmount = getBlocksAmount;\n/**\n * Modifies data object, copies stream and divide it into bytes groups (blocks).\n * @param preparedData object\n * @returns modified data object\n */\nfunction divideIntoBlocks(preparedData) {\n    var streamSize = preparedData.stream.length / 8;\n    var amountOBlocks = getBlocksAmount(preparedData.correction, preparedData.version.number);\n    var blockByteSize = streamSize / amountOBlocks;\n    var blocks = [];\n    var block = [];\n    var positionStart, positionEnd;\n    for (var i = 0; i < amountOBlocks; i++) {\n        // if not divided evenly\n        if (streamSize % amountOBlocks > 0) {\n            var overage = streamSize % amountOBlocks;\n            // last n bytes + 1 \n            // for example: 180 bytes, 8 groups, streamSize % amountOBlocks -> 22 bytes and overage 4 byte, \n            // then blocks = 22, 22, 22, 22, 23, 23, 23, 23 = 180 at sum\n            var byteSize = i >= overage\n                ? Math.ceil(blockByteSize)\n                : Math.floor(blockByteSize);\n            positionStart = i >= overage ? byteSize * i - overage : byteSize * i;\n            positionEnd = positionStart + byteSize;\n        }\n        else {\n            // if divided evenly - OK\n            positionStart = blockByteSize * i;\n            positionEnd = positionStart + blockByteSize;\n        }\n        var part = preparedData.stream.slice(positionStart * 8, positionEnd * 8);\n        block = part.match(/.{1,8}/g);\n        blocks.push(block);\n    }\n    preparedData.blocks = blocks;\n    return preparedData;\n}\nexports.divideIntoBlocks = divideIntoBlocks;\n\n\n//# sourceURL=webpack:///./src/ts/structurer.ts?");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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