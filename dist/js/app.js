(()=>{"use strict";var e,t,r,n,o,a={866:function(e,t,r){var n=this&&this.__spreadArray||function(e,t,r){if(r||2===arguments.length)for(var n,o=0,a=t.length;o<a;o++)!n&&o in t||(n||(n=Array.prototype.slice.call(t,0,o)),n[o]=t[o]);return e.concat(n||Array.prototype.slice.call(t))};Object.defineProperty(t,"__esModule",{value:!0}),t.addCorrectionBytes=t.calculateCorrectionBytes=t.getCorrectionBytesAmount=t.getPolynomials=void 0;var o=r(166);function a(e,t){var r,n={0:"1",1:"2",2:"4",3:"8",4:"16",5:"32",6:"64",7:"128",8:"29",9:"58",10:"116",11:"232",12:"205",13:"135",14:"19",15:"38",16:"76",17:"152",18:"45",19:"90",20:"180",21:"117",22:"234",23:"201",24:"143",25:"3",26:"6",27:"12",28:"24",29:"48",30:"96",31:"192",32:"157",33:"39",34:"78",35:"156",36:"37",37:"74",38:"148",39:"53",40:"106",41:"212",42:"181",43:"119",44:"238",45:"193",46:"159",47:"35",48:"70",49:"140",50:"5",51:"10",52:"20",53:"40",54:"80",55:"160",56:"93",57:"186",58:"105",59:"210",60:"185",61:"111",62:"222",63:"161",64:"95",65:"190",66:"97",67:"194",68:"153",69:"47",70:"94",71:"188",72:"101",73:"202",74:"137",75:"15",76:"30",77:"60",78:"120",79:"240",80:"253",81:"231",82:"211",83:"187",84:"107",85:"214",86:"177",87:"127",88:"254",89:"225",90:"223",91:"163",92:"91",93:"182",94:"113",95:"226",96:"217",97:"175",98:"67",99:"134",100:"17",101:"34",102:"68",103:"136",104:"13",105:"26",106:"52",107:"104",108:"208",109:"189",110:"103",111:"206",112:"129",113:"31",114:"62",115:"124",116:"248",117:"237",118:"199",119:"147",120:"59",121:"118",122:"236",123:"197",124:"151",125:"51",126:"102",127:"204",128:"133",129:"23",130:"46",131:"92",132:"184",133:"109",134:"218",135:"169",136:"79",137:"158",138:"33",139:"66",140:"132",141:"21",142:"42",143:"84",144:"168",145:"77",146:"154",147:"41",148:"82",149:"164",150:"85",151:"170",152:"73",153:"146",154:"57",155:"114",156:"228",157:"213",158:"183",159:"115",160:"230",161:"209",162:"191",163:"99",164:"198",165:"145",166:"63",167:"126",168:"252",169:"229",170:"215",171:"179",172:"123",173:"246",174:"241",175:"255",176:"227",177:"219",178:"171",179:"75",180:"150",181:"49",182:"98",183:"196",184:"149",185:"55",186:"110",187:"220",188:"165",189:"87",190:"174",191:"65",192:"130",193:"25",194:"50",195:"100",196:"200",197:"141",198:"7",199:"14",200:"28",201:"56",202:"112",203:"224",204:"221",205:"167",206:"83",207:"166",208:"81",209:"162",210:"89",211:"178",212:"121",213:"242",214:"249",215:"239",216:"195",217:"155",218:"43",219:"86",220:"172",221:"69",222:"138",223:"9",224:"18",225:"36",226:"72",227:"144",228:"61",229:"122",230:"244",231:"245",232:"247",233:"243",234:"251",235:"235",236:"203",237:"139",238:"11",239:"22",240:"44",241:"88",242:"176",243:"125",244:"250",245:"233",246:"207",247:"131",248:"27",249:"54",250:"108",251:"216",252:"173",253:"71",254:"142",255:"1"};if(!0===(t=t||!1)){var o=Object.entries(n).map((function(e){var t=e[0];return[e[1],t]}));r=Object.fromEntries(o)[e]}else r=n[e];return Number(r)}function i(e){return{7:[87,229,146,149,238,102,21],10:[251,67,46,61,118,70,64,94,32,45],13:[74,152,176,100,86,100,106,104,130,218,206,140,78],15:[8,183,61,91,202,37,51,58,58,237,140,124,5,99,105],16:[120,104,107,109,102,161,76,3,91,191,147,169,182,194,225,120],17:[43,139,206,78,43,239,123,206,214,147,24,99,150,39,243,163,136],18:[215,234,158,94,184,97,118,170,79,187,152,148,252,179,5,98,96,153],20:[17,60,79,50,61,163,26,187,202,180,221,225,83,239,156,164,212,212,188,190],22:[210,171,247,242,93,230,14,109,221,53,200,74,8,172,98,80,219,134,160,105,165,231],24:[229,121,135,48,211,117,251,126,159,180,169,152,192,226,228,218,111,0,117,232,87,96,227,21],26:[173,125,158,2,103,182,118,17,145,201,111,28,165,53,161,21,245,142,13,102,48,227,153,145,218,70],28:[168,223,200,104,224,234,108,180,110,190,195,147,205,27,232,201,21,43,245,87,42,195,212,119,242,37,9,123],30:[41,173,145,152,216,31,179,182,50,48,110,86,239,96,222,125,42,173,226,193,224,130,156,37,251,216,238,40,192,180]}[e]}function c(e,t){return{L:[7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],M:[10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],Q:[13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],H:[17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]}[e][t-1]}function u(e){var t=n([],e.blocks,!0).map((function(e){return e.map((function(e){return parseInt(String(e),2)}))})),r=c(e.correction,e.version.number),u=i(r),l=[];return t.forEach((function(e){for(var t=e.length,i=Math.max(t,r),c=[],s=[],v=0;v<i;v++)c[v]=e[v]?e[v]:0;for(var d=0;d<e.length;d++){var f=c.shift();if(0!==f){v=a(String(f),!0);for(var p=n([],u,!0),g=0;g<p.length;g++){var h=p[g],m=h+v>254?(h+v)%255:h+v;m=a(String(m)),c[g]=c[g]^m,s[g]=(0,o.decimalToBinary)(c[g],8)}}}l.push(s)})),l}t.getPolynomials=i,t.getCorrectionBytesAmount=c,t.calculateCorrectionBytes=u,t.addCorrectionBytes=function(e){var t=u(e),r=n([],e.blocks,!0),a=(0,o.verticalFlatten)(r),i=(0,o.verticalFlatten)(t),c=a.concat(i);return e.stream=c,e}},65:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.encodeStringToBinaryBytes=t.convertAllItemsToCodes=t.groupLettersByTwo=t.sanitizeInput=void 0;var n=r(166);function o(e){return{0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,G:16,H:17,I:18,J:19,K:20,L:21,M:22,N:23,O:24,P:25,Q:26,R:27,S:28,T:29,U:30,V:31,W:32,X:33,Y:34,Z:35," ":36,$:37,"%":38,"*":39,"+":40,"-":41,".":42,"/":43,":":44}[e]}function a(e){return e.replace(/([^a-zA-Z0-9$%*+-./:\s]|\,)+/g,"").split("").map((function(e){return e.toLocaleUpperCase()})).join("")}function i(e){return e.match(/.{1,2}/g)}function c(e){return e.map((function(e){return e.length<2?[o(e[0])]:[o(e[0]),o(e[1])]}))}t.sanitizeInput=a,t.groupLettersByTwo=i,t.convertAllItemsToCodes=c,t.encodeStringToBinaryBytes=function(e){return c(i(a(e))).map((function(e){return e.length<2?(0,n.decimalToBinary)(e[0],6):(0,n.decimalToBinary)(45*e[0]+e[1],11)})).join("")}},166:function(e,t){var r=this&&this.__spreadArray||function(e,t,r){if(r||2===arguments.length)for(var n,o=0,a=t.length;o<a;o++)!n&&o in t||(n||(n=Array.prototype.slice.call(t,0,o)),n[o]=t[o]);return e.concat(n||Array.prototype.slice.call(t))};Object.defineProperty(t,"__esModule",{value:!0}),t.verticalFlatten=t.decimalToBinary=void 0,t.decimalToBinary=function(e,t){return e.toString(2).padStart(t,"0")},t.verticalFlatten=function(e){var t,n;return(t=r([],e,!0),n=r([],t,!0).sort((function(e,t){return t.length-e.length}))[0].length,Array.from({length:n},(function(e,r){return t.map((function(e){return e[r]}))}))).flat(1).filter((function(e){return void 0!==e&&e.length>0}))}},853:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.qr=t.prepareData=void 0;var n=r(65),o=r(879),a=r(890),i=r(866),c=r(924);function u(e,t){var r=(0,n.encodeStringToBinaryBytes)(e),a=(0,o.getServiceData)(r,t),i=a.serviceData.length+r.length;if(i%8>0){var c=8*Math.ceil(i/8)-i;r+="0".repeat(c),i=a.serviceData.length+r.length}for(var u=0,l=0;u<a.version.capacity-i;u+=8,l++)r+=l%2>0?"00010001":"11101100";return{correction:t,version:a.version,stream:a.serviceData+r,originalData:e,serviceData:a.serviceData,encodedData:r}}t.prepareData=u,t.qr=function(e){e.correction=e.correction||"M",e.size=e.size||400;var t=u(e.text,e.correction),r=(0,a.divideIntoBlocks)(t),n=(0,i.addCorrectionBytes)(r),o=document.createElement("canvas");return o.width=e.size,o.height=e.size,(0,c.drawQR)(o,n),{canvas:o,data:n}}},924:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.drawQR=void 0,t.drawQR=function(e,t){var r;(r=e.getContext("2d")).fillStyle="white",r.fillRect(0,0,r.canvas.width,r.canvas.height)}},879:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getServiceData=t.getOptimalQRCodeVersion=t.choseVersion=void 0;var n=r(166);function o(e,t){var r=e.filter((function(e){return t<=e}));return{number:e.indexOf(r[0])+1,capacity:r[0]}}function a(e,t){return o({L:[152,272,440,640,864,1088,1248,1552,1856,2192,2592,2960,3424,3688,4184,4712,5176,5768,6360,6888,7456,8048,8752,9392,10208,10960,11744,12248,13048,13880,14744,15640,16568,17528,18448,19472,20528,21616,22496,23648],M:[128,224,352,512,688,864,992,1232,1456,1728,2032,2320,2672,2920,3320,3624,4056,4504,5016,5352,5712,6256,6880,7312,8e3,8496,9024,9544,10136,10984,11640,12328,13048,13800,14496,15312,15936,16816,17728,18672],Q:[104,176,272,384,496,608,704,880,1056,1232,1440,1648,1952,2088,2360,2600,2936,3176,3560,3880,4096,4544,4912,5312,5744,6032,6464,6968,7288,7880,8264,8920,9368,9848,10288,10832,11408,12016,12656,13328],H:[72,128,208,288,368,480,528,688,800,976,1120,1264,1440,1576,1784,2024,2264,2504,2728,3080,3248,3536,3712,4112,4304,4768,5024,5288,5608,5960,6344,6760,7208,7688,7888,8432,8768,9136,9776,10208]}[t],e)}t.choseVersion=o,t.getOptimalQRCodeVersion=a,t.getServiceData=function(e,t){var r=a(e.length,t),o=1;return r.number>=1||r.number<=9?o=9:r.number>=10&&r.number<=26?o=11:r.number>=27&&r.number<=40&&(o=13),{version:r,serviceData:"0010".concat((0,n.decimalToBinary)(e.length,o))}}},890:(e,t)=>{function r(e,t){return{L:[1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],M:[1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],Q:[1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],H:[1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]}[e][t-1]}Object.defineProperty(t,"__esModule",{value:!0}),t.divideIntoBlocks=t.getBlocksAmount=void 0,t.getBlocksAmount=r,t.divideIntoBlocks=function(e){for(var t,n,o=e.stream.length/8,a=r(e.correction,e.version.number),i=o/a,c=[],u=[],l=0;l<a;l++){if(o%a>0){var s=o%a,v=l>=s?Math.ceil(i):Math.floor(i);n=(t=l>=s?v*l-s:v*l)+v}else n=(t=i*l)+i;u=e.stream.slice(8*t,8*n).match(/.{1,8}/g),c.push(u)}return e.blocks=c,e}}},i={};e=function e(t){var r=i[t];if(void 0!==r)return r.exports;var n=i[t]={exports:{}};return a[t].call(n.exports,n,n.exports,e),n.exports}(853),t=document.querySelector("#app input"),r=document.querySelector("#app select"),n=document.querySelector("#app button"),o=document.querySelector("#app #app__output"),null==n||n.addEventListener("click",(function(){if(t&&t.value.length>0){var n=(0,e.qr)({text:t.value,correction:r.value});o.children.length>0?o.replaceChild(n.canvas,o.children[0]):o.appendChild(n.canvas),console.log(n.data)}}))})();