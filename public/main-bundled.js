!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=29)}([function(e,t,n){"use strict";var r=n(1),o=Object.prototype.toString;function i(e){return"[object Array]"===o.call(e)}function a(e){return void 0===e}function s(e){return null!==e&&"object"==typeof e}function c(e){if("[object Object]"!==o.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function u(e){return"[object Function]"===o.call(e)}function l(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),i(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}e.exports={isArray:i,isArrayBuffer:function(e){return"[object ArrayBuffer]"===o.call(e)},isBuffer:function(e){return null!==e&&!a(e)&&null!==e.constructor&&!a(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:s,isPlainObject:c,isUndefined:a,isDate:function(e){return"[object Date]"===o.call(e)},isFile:function(e){return"[object File]"===o.call(e)},isBlob:function(e){return"[object Blob]"===o.call(e)},isFunction:u,isStream:function(e){return s(e)&&u(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)},forEach:l,merge:function e(){var t={};function n(n,r){c(t[r])&&c(n)?t[r]=e(t[r],n):c(n)?t[r]=e({},n):i(n)?t[r]=n.slice():t[r]=n}for(var r=0,o=arguments.length;r<o;r++)l(arguments[r],n);return t},extend:function(e,t,n){return l(t,(function(t,o){e[o]=n&&"function"==typeof t?r(t,n):t})),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}}},function(e,t,n){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},function(e,t,n){"use strict";var r=n(0);function o(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(r.isURLSearchParams(t))i=t.toString();else{var a=[];r.forEach(t,(function(e,t){null!=e&&(r.isArray(e)?t+="[]":e=[e],r.forEach(e,(function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),a.push(o(t)+"="+o(e))})))})),i=a.join("&")}if(i){var s=e.indexOf("#");-1!==s&&(e=e.slice(0,s)),e+=(-1===e.indexOf("?")?"?":"&")+i}return e}},function(e,t,n){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t,n){"use strict";(function(t){var r=n(0),o=n(17),i={"Content-Type":"application/x-www-form-urlencoded"};function a(e,t){!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var s,c={adapter:(("undefined"!=typeof XMLHttpRequest||void 0!==t&&"[object process]"===Object.prototype.toString.call(t))&&(s=n(5)),s),transformRequest:[function(e,t){return o(t,"Accept"),o(t,"Content-Type"),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e)?e:r.isArrayBufferView(e)?e.buffer:r.isURLSearchParams(e)?(a(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):r.isObject(e)?(a(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300}};c.headers={common:{Accept:"application/json, text/plain, */*"}},r.forEach(["delete","get","head"],(function(e){c.headers[e]={}})),r.forEach(["post","put","patch"],(function(e){c.headers[e]=r.merge(i)})),e.exports=c}).call(this,n(16))},function(e,t,n){"use strict";var r=n(0),o=n(18),i=n(20),a=n(2),s=n(21),c=n(24),u=n(25),l=n(6);e.exports=function(e){return new Promise((function(t,n){var f=e.data,d=e.headers;r.isFormData(f)&&delete d["Content-Type"];var p=new XMLHttpRequest;if(e.auth){var m=e.auth.username||"",h=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";d.Authorization="Basic "+btoa(m+":"+h)}var v=s(e.baseURL,e.url);if(p.open(e.method.toUpperCase(),a(v,e.params,e.paramsSerializer),!0),p.timeout=e.timeout,p.onreadystatechange=function(){if(p&&4===p.readyState&&(0!==p.status||p.responseURL&&0===p.responseURL.indexOf("file:"))){var r="getAllResponseHeaders"in p?c(p.getAllResponseHeaders()):null,i={data:e.responseType&&"text"!==e.responseType?p.response:p.responseText,status:p.status,statusText:p.statusText,headers:r,config:e,request:p};o(t,n,i),p=null}},p.onabort=function(){p&&(n(l("Request aborted",e,"ECONNABORTED",p)),p=null)},p.onerror=function(){n(l("Network Error",e,null,p)),p=null},p.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(l(t,e,"ECONNABORTED",p)),p=null},r.isStandardBrowserEnv()){var y=(e.withCredentials||u(v))&&e.xsrfCookieName?i.read(e.xsrfCookieName):void 0;y&&(d[e.xsrfHeaderName]=y)}if("setRequestHeader"in p&&r.forEach(d,(function(e,t){void 0===f&&"content-type"===t.toLowerCase()?delete d[t]:p.setRequestHeader(t,e)})),r.isUndefined(e.withCredentials)||(p.withCredentials=!!e.withCredentials),e.responseType)try{p.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&p.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&p.upload&&p.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){p&&(p.abort(),n(e),p=null)})),f||(f=null),p.send(f)}))}},function(e,t,n){"use strict";var r=n(19);e.exports=function(e,t,n,o,i){var a=new Error(e);return r(a,t,n,o,i)}},function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t){t=t||{};var n={},o=["url","method","data"],i=["headers","auth","proxy","params"],a=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],s=["validateStatus"];function c(e,t){return r.isPlainObject(e)&&r.isPlainObject(t)?r.merge(e,t):r.isPlainObject(t)?r.merge({},t):r.isArray(t)?t.slice():t}function u(o){r.isUndefined(t[o])?r.isUndefined(e[o])||(n[o]=c(void 0,e[o])):n[o]=c(e[o],t[o])}r.forEach(o,(function(e){r.isUndefined(t[e])||(n[e]=c(void 0,t[e]))})),r.forEach(i,u),r.forEach(a,(function(o){r.isUndefined(t[o])?r.isUndefined(e[o])||(n[o]=c(void 0,e[o])):n[o]=c(void 0,t[o])})),r.forEach(s,(function(r){r in t?n[r]=c(e[r],t[r]):r in e&&(n[r]=c(void 0,e[r]))}));var l=o.concat(i).concat(a).concat(s),f=Object.keys(e).concat(Object.keys(t)).filter((function(e){return-1===l.indexOf(e)}));return r.forEach(f,u),n}},function(e,t,n){"use strict";function r(e){this.message=e}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,e.exports=r},function(e,t,n){e.exports=n(11)},function(e,t,n){
/*! @license DOMPurify | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.2.2/LICENSE */
e.exports=function(){"use strict";var e=Object.hasOwnProperty,t=Object.setPrototypeOf,n=Object.isFrozen,r=Object.getPrototypeOf,o=Object.getOwnPropertyDescriptor,i=Object.freeze,a=Object.seal,s=Object.create,c="undefined"!=typeof Reflect&&Reflect,u=c.apply,l=c.construct;u||(u=function(e,t,n){return e.apply(t,n)}),i||(i=function(e){return e}),a||(a=function(e){return e}),l||(l=function(e,t){return new(Function.prototype.bind.apply(e,[null].concat(function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(t))))});var f,d=x(Array.prototype.forEach),p=x(Array.prototype.pop),m=x(Array.prototype.push),h=x(String.prototype.toLowerCase),v=x(String.prototype.match),y=x(String.prototype.replace),g=x(String.prototype.indexOf),b=x(String.prototype.trim),T=x(RegExp.prototype.test),w=(f=TypeError,function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return l(f,t)});function x(e){return function(t){for(var n=arguments.length,r=Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return u(e,t,r)}}function A(e,r){t&&t(e,null);for(var o=r.length;o--;){var i=r[o];if("string"==typeof i){var a=h(i);a!==i&&(n(r)||(r[o]=a),i=a)}e[i]=!0}return e}function S(t){var n=s(null),r=void 0;for(r in t)u(e,t,[r])&&(n[r]=t[r]);return n}function E(e,t){for(;null!==e;){var n=o(e,t);if(n){if(n.get)return x(n.get);if("function"==typeof n.value)return x(n.value)}e=r(e)}return function(e){return console.warn("fallback value for",e),null}}var R=i(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),k=i(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),L=i(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),O=i(["animate","color-profile","cursor","discard","fedropshadow","feimage","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),N=i(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover"]),D=i(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),C=i(["#text"]),_=i(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","xmlns"]),M=i(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),j=i(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),U=i(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),F=a(/\{\{[\s\S]*|[\s\S]*\}\}/gm),I=a(/<%[\s\S]*|[\s\S]*%>/gm),P=a(/^data-[\-\w.\u00B7-\uFFFF]/),H=a(/^aria-[\-\w]+$/),B=a(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),q=a(/^(?:\w+script|data):/i),z=a(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),W="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function G(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var V=function(){return"undefined"==typeof window?null:window},X=function(e,t){if("object"!==(void 0===e?"undefined":W(e))||"function"!=typeof e.createPolicy)return null;var n=null;t.currentScript&&t.currentScript.hasAttribute("data-tt-policy-suffix")&&(n=t.currentScript.getAttribute("data-tt-policy-suffix"));var r="dompurify"+(n?"#"+n:"");try{return e.createPolicy(r,{createHTML:function(e){return e}})}catch(e){return console.warn("TrustedTypes policy "+r+" could not be created."),null}};return function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:V(),n=function(t){return e(t)};if(n.version="2.2.7",n.removed=[],!t||!t.document||9!==t.document.nodeType)return n.isSupported=!1,n;var r=t.document,o=t.document,a=t.DocumentFragment,s=t.HTMLTemplateElement,c=t.Node,u=t.Element,l=t.NodeFilter,f=t.NamedNodeMap,x=void 0===f?t.NamedNodeMap||t.MozNamedAttrMap:f,K=t.Text,$=t.Comment,J=t.DOMParser,Y=t.trustedTypes,Z=u.prototype,Q=E(Z,"cloneNode"),ee=E(Z,"nextSibling"),te=E(Z,"childNodes"),ne=E(Z,"parentNode");if("function"==typeof s){var re=o.createElement("template");re.content&&re.content.ownerDocument&&(o=re.content.ownerDocument)}var oe=X(Y,r),ie=oe&&Fe?oe.createHTML(""):"",ae=o,se=ae.implementation,ce=ae.createNodeIterator,ue=ae.getElementsByTagName,le=ae.createDocumentFragment,fe=r.importNode,de={};try{de=S(o).documentMode?o.documentMode:{}}catch(e){}var pe={};n.isSupported="function"==typeof ne&&se&&void 0!==se.createHTMLDocument&&9!==de;var me=F,he=I,ve=P,ye=H,ge=q,be=z,Te=B,we=null,xe=A({},[].concat(G(R),G(k),G(L),G(N),G(C))),Ae=null,Se=A({},[].concat(G(_),G(M),G(j),G(U))),Ee=null,Re=null,ke=!0,Le=!0,Oe=!1,Ne=!1,De=!1,Ce=!1,_e=!1,Me=!1,je=!1,Ue=!0,Fe=!1,Ie=!0,Pe=!0,He=!1,Be={},qe=A({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),ze=null,We=A({},["audio","video","img","source","image","track"]),Ge=null,Ve=A({},["alt","class","for","id","label","name","pattern","placeholder","summary","title","value","style","xmlns"]),Xe=null,Ke=o.createElement("form"),$e=function(e){Xe&&Xe===e||(e&&"object"===(void 0===e?"undefined":W(e))||(e={}),e=S(e),we="ALLOWED_TAGS"in e?A({},e.ALLOWED_TAGS):xe,Ae="ALLOWED_ATTR"in e?A({},e.ALLOWED_ATTR):Se,Ge="ADD_URI_SAFE_ATTR"in e?A(S(Ve),e.ADD_URI_SAFE_ATTR):Ve,ze="ADD_DATA_URI_TAGS"in e?A(S(We),e.ADD_DATA_URI_TAGS):We,Ee="FORBID_TAGS"in e?A({},e.FORBID_TAGS):{},Re="FORBID_ATTR"in e?A({},e.FORBID_ATTR):{},Be="USE_PROFILES"in e&&e.USE_PROFILES,ke=!1!==e.ALLOW_ARIA_ATTR,Le=!1!==e.ALLOW_DATA_ATTR,Oe=e.ALLOW_UNKNOWN_PROTOCOLS||!1,Ne=e.SAFE_FOR_TEMPLATES||!1,De=e.WHOLE_DOCUMENT||!1,Me=e.RETURN_DOM||!1,je=e.RETURN_DOM_FRAGMENT||!1,Ue=!1!==e.RETURN_DOM_IMPORT,Fe=e.RETURN_TRUSTED_TYPE||!1,_e=e.FORCE_BODY||!1,Ie=!1!==e.SANITIZE_DOM,Pe=!1!==e.KEEP_CONTENT,He=e.IN_PLACE||!1,Te=e.ALLOWED_URI_REGEXP||Te,Ne&&(Le=!1),je&&(Me=!0),Be&&(we=A({},[].concat(G(C))),Ae=[],!0===Be.html&&(A(we,R),A(Ae,_)),!0===Be.svg&&(A(we,k),A(Ae,M),A(Ae,U)),!0===Be.svgFilters&&(A(we,L),A(Ae,M),A(Ae,U)),!0===Be.mathMl&&(A(we,N),A(Ae,j),A(Ae,U))),e.ADD_TAGS&&(we===xe&&(we=S(we)),A(we,e.ADD_TAGS)),e.ADD_ATTR&&(Ae===Se&&(Ae=S(Ae)),A(Ae,e.ADD_ATTR)),e.ADD_URI_SAFE_ATTR&&A(Ge,e.ADD_URI_SAFE_ATTR),Pe&&(we["#text"]=!0),De&&A(we,["html","head","body"]),we.table&&(A(we,["tbody"]),delete Ee.tbody),i&&i(e),Xe=e)},Je=A({},["mi","mo","mn","ms","mtext"]),Ye=A({},["foreignobject","desc","title","annotation-xml"]),Ze=A({},k);A(Ze,L),A(Ze,O);var Qe=A({},N);A(Qe,D);var et="http://www.w3.org/1998/Math/MathML",tt="http://www.w3.org/2000/svg",nt="http://www.w3.org/1999/xhtml",rt=function(e){var t=ne(e);t&&t.tagName||(t={namespaceURI:nt,tagName:"template"});var n=h(e.tagName),r=h(t.tagName);if(e.namespaceURI===tt)return t.namespaceURI===nt?"svg"===n:t.namespaceURI===et?"svg"===n&&("annotation-xml"===r||Je[r]):Boolean(Ze[n]);if(e.namespaceURI===et)return t.namespaceURI===nt?"math"===n:t.namespaceURI===tt?"math"===n&&Ye[r]:Boolean(Qe[n]);if(e.namespaceURI===nt){if(t.namespaceURI===tt&&!Ye[r])return!1;if(t.namespaceURI===et&&!Je[r])return!1;var o=A({},["title","style","font","a","script"]);return!Qe[n]&&(o[n]||!Ze[n])}return!1},ot=function(e){m(n.removed,{element:e});try{e.parentNode.removeChild(e)}catch(t){try{e.outerHTML=ie}catch(t){e.remove()}}},it=function(e,t){try{m(n.removed,{attribute:t.getAttributeNode(e),from:t})}catch(e){m(n.removed,{attribute:null,from:t})}if(t.removeAttribute(e),"is"===e&&!Ae[e])if(Me||je)try{ot(t)}catch(e){}else try{t.setAttribute(e,"")}catch(e){}},at=function(e){var t=void 0,n=void 0;if(_e)e="<remove></remove>"+e;else{var r=v(e,/^[\r\n\t ]+/);n=r&&r[0]}var i=oe?oe.createHTML(e):e;try{t=(new J).parseFromString(i,"text/html")}catch(e){}if(!t||!t.documentElement){var a=(t=se.createHTMLDocument("")).body;a.parentNode.removeChild(a.parentNode.firstElementChild),a.outerHTML=i}return e&&n&&t.body.insertBefore(o.createTextNode(n),t.body.childNodes[0]||null),ue.call(t,De?"html":"body")[0]},st=function(e){return ce.call(e.ownerDocument||e,e,l.SHOW_ELEMENT|l.SHOW_COMMENT|l.SHOW_TEXT,(function(){return l.FILTER_ACCEPT}),!1)},ct=function(e){return!(e instanceof K||e instanceof $||"string"==typeof e.nodeName&&"string"==typeof e.textContent&&"function"==typeof e.removeChild&&e.attributes instanceof x&&"function"==typeof e.removeAttribute&&"function"==typeof e.setAttribute&&"string"==typeof e.namespaceURI&&"function"==typeof e.insertBefore)},ut=function(e){return"object"===(void 0===c?"undefined":W(c))?e instanceof c:e&&"object"===(void 0===e?"undefined":W(e))&&"number"==typeof e.nodeType&&"string"==typeof e.nodeName},lt=function(e,t,r){pe[e]&&d(pe[e],(function(e){e.call(n,t,r,Xe)}))},ft=function(e){var t=void 0;if(lt("beforeSanitizeElements",e,null),ct(e))return ot(e),!0;if(v(e.nodeName,/[\u0080-\uFFFF]/))return ot(e),!0;var r=h(e.nodeName);if(lt("uponSanitizeElement",e,{tagName:r,allowedTags:we}),!ut(e.firstElementChild)&&(!ut(e.content)||!ut(e.content.firstElementChild))&&T(/<[/\w]/g,e.innerHTML)&&T(/<[/\w]/g,e.textContent))return ot(e),!0;if(!we[r]||Ee[r]){if(Pe&&!qe[r]){var o=ne(e),i=te(e);if(i&&o)for(var a=i.length-1;a>=0;--a)o.insertBefore(Q(i[a],!0),ee(e))}return ot(e),!0}return e instanceof u&&!rt(e)?(ot(e),!0):"noscript"!==r&&"noembed"!==r||!T(/<\/no(script|embed)/i,e.innerHTML)?(Ne&&3===e.nodeType&&(t=e.textContent,t=y(t,me," "),t=y(t,he," "),e.textContent!==t&&(m(n.removed,{element:e.cloneNode()}),e.textContent=t)),lt("afterSanitizeElements",e,null),!1):(ot(e),!0)},dt=function(e,t,n){if(Ie&&("id"===t||"name"===t)&&(n in o||n in Ke))return!1;if(Le&&T(ve,t));else if(ke&&T(ye,t));else{if(!Ae[t]||Re[t])return!1;if(Ge[t]);else if(T(Te,y(n,be,"")));else if("src"!==t&&"xlink:href"!==t&&"href"!==t||"script"===e||0!==g(n,"data:")||!ze[e])if(Oe&&!T(ge,y(n,be,"")));else if(n)return!1}return!0},pt=function(e){var t=void 0,r=void 0,o=void 0,i=void 0;lt("beforeSanitizeAttributes",e,null);var a=e.attributes;if(a){var s={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Ae};for(i=a.length;i--;){var c=t=a[i],u=c.name,l=c.namespaceURI;if(r=b(t.value),o=h(u),s.attrName=o,s.attrValue=r,s.keepAttr=!0,s.forceKeepAttr=void 0,lt("uponSanitizeAttribute",e,s),r=s.attrValue,!s.forceKeepAttr&&(it(u,e),s.keepAttr))if(T(/\/>/i,r))it(u,e);else{Ne&&(r=y(r,me," "),r=y(r,he," "));var f=e.nodeName.toLowerCase();if(dt(f,o,r))try{l?e.setAttributeNS(l,u,r):e.setAttribute(u,r),p(n.removed)}catch(e){}}}lt("afterSanitizeAttributes",e,null)}},mt=function e(t){var n=void 0,r=st(t);for(lt("beforeSanitizeShadowDOM",t,null);n=r.nextNode();)lt("uponSanitizeShadowNode",n,null),ft(n)||(n.content instanceof a&&e(n.content),pt(n));lt("afterSanitizeShadowDOM",t,null)};return n.sanitize=function(e,o){var i=void 0,s=void 0,u=void 0,l=void 0,f=void 0;if(e||(e="\x3c!--\x3e"),"string"!=typeof e&&!ut(e)){if("function"!=typeof e.toString)throw w("toString is not a function");if("string"!=typeof(e=e.toString()))throw w("dirty is not a string, aborting")}if(!n.isSupported){if("object"===W(t.toStaticHTML)||"function"==typeof t.toStaticHTML){if("string"==typeof e)return t.toStaticHTML(e);if(ut(e))return t.toStaticHTML(e.outerHTML)}return e}if(Ce||$e(o),n.removed=[],"string"==typeof e&&(He=!1),He);else if(e instanceof c)1===(s=(i=at("\x3c!----\x3e")).ownerDocument.importNode(e,!0)).nodeType&&"BODY"===s.nodeName||"HTML"===s.nodeName?i=s:i.appendChild(s);else{if(!Me&&!Ne&&!De&&-1===e.indexOf("<"))return oe&&Fe?oe.createHTML(e):e;if(!(i=at(e)))return Me?null:ie}i&&_e&&ot(i.firstChild);for(var d=st(He?e:i);u=d.nextNode();)3===u.nodeType&&u===l||ft(u)||(u.content instanceof a&&mt(u.content),pt(u),l=u);if(l=null,He)return e;if(Me){if(je)for(f=le.call(i.ownerDocument);i.firstChild;)f.appendChild(i.firstChild);else f=i;return Ue&&(f=fe.call(r,f,!0)),f}var p=De?i.outerHTML:i.innerHTML;return Ne&&(p=y(p,me," "),p=y(p,he," ")),oe&&Fe?oe.createHTML(p):p},n.setConfig=function(e){$e(e),Ce=!0},n.clearConfig=function(){Xe=null,Ce=!1},n.isValidAttribute=function(e,t,n){Xe||$e({});var r=h(e),o=h(t);return dt(r,o,n)},n.addHook=function(e,t){"function"==typeof t&&(pe[e]=pe[e]||[],m(pe[e],t))},n.removeHook=function(e){pe[e]&&p(pe[e])},n.removeHooks=function(e){pe[e]&&(pe[e]=[])},n.removeAllHooks=function(){pe={}},n}()}()},function(e,t,n){"use strict";var r=n(0),o=n(1),i=n(12),a=n(7);function s(e){var t=new i(e),n=o(i.prototype.request,t);return r.extend(n,i.prototype,t),r.extend(n,t),n}var c=s(n(4));c.Axios=i,c.create=function(e){return s(a(c.defaults,e))},c.Cancel=n(8),c.CancelToken=n(26),c.isCancel=n(3),c.all=function(e){return Promise.all(e)},c.spread=n(27),c.isAxiosError=n(28),e.exports=c,e.exports.default=c},function(e,t,n){"use strict";var r=n(0),o=n(2),i=n(13),a=n(14),s=n(7);function c(e){this.defaults=e,this.interceptors={request:new i,response:new i}}c.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=s(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[a,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)n=n.then(t.shift(),t.shift());return n},c.prototype.getUri=function(e){return e=s(this.defaults,e),o(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},r.forEach(["delete","get","head","options"],(function(e){c.prototype[e]=function(t,n){return this.request(s(n||{},{method:e,url:t,data:(n||{}).data}))}})),r.forEach(["post","put","patch"],(function(e){c.prototype[e]=function(t,n,r){return this.request(s(r||{},{method:e,url:t,data:n}))}})),e.exports=c},function(e,t,n){"use strict";var r=n(0);function o(){this.handlers=[]}o.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){r.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=o},function(e,t,n){"use strict";var r=n(0),o=n(15),i=n(3),a=n(4);function s(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return s(e),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),r.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||a.adapter)(e).then((function(t){return s(e),t.data=o(t.data,t.headers,e.transformResponse),t}),(function(t){return i(t)||(s(e),t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t,n){return r.forEach(n,(function(n){e=n(e,t)})),e}},function(e,t){var n,r,o=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function s(e){if(n===setTimeout)return setTimeout(e,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(e){n=i}try{r="function"==typeof clearTimeout?clearTimeout:a}catch(e){r=a}}();var c,u=[],l=!1,f=-1;function d(){l&&c&&(l=!1,c.length?u=c.concat(u):f=-1,u.length&&p())}function p(){if(!l){var e=s(d);l=!0;for(var t=u.length;t;){for(c=u,u=[];++f<t;)c&&c[f].run();f=-1,t=u.length}c=null,l=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===a||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function m(e,t){this.fun=e,this.array=t}function h(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new m(e,t)),1!==u.length||l||s(p)},m.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=h,o.addListener=h,o.once=h,o.off=h,o.removeListener=h,o.removeAllListeners=h,o.emit=h,o.prependListener=h,o.prependOnceListener=h,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t){r.forEach(e,(function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])}))}},function(e,t,n){"use strict";var r=n(6);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},function(e,t,n){"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},function(e,t,n){"use strict";var r=n(0);e.exports=r.isStandardBrowserEnv()?{write:function(e,t,n,o,i,a){var s=[];s.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),r.isString(o)&&s.push("path="+o),r.isString(i)&&s.push("domain="+i),!0===a&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},function(e,t,n){"use strict";var r=n(22),o=n(23);e.exports=function(e,t){return e&&!r(t)?o(e,t):t}},function(e,t,n){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t,n){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t,n){"use strict";var r=n(0),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,i,a={};return e?(r.forEach(e.split("\n"),(function(e){if(i=e.indexOf(":"),t=r.trim(e.substr(0,i)).toLowerCase(),n=r.trim(e.substr(i+1)),t){if(a[t]&&o.indexOf(t)>=0)return;a[t]="set-cookie"===t?(a[t]?a[t]:[]).concat([n]):a[t]?a[t]+", "+n:n}})),a):a}},function(e,t,n){"use strict";var r=n(0);e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function o(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=o(window.location.href),function(t){var n=r.isString(t)?o(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}},function(e,t,n){"use strict";var r=n(8);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var n=this;e((function(e){n.reason||(n.reason=new r(e),t(n.reason))}))}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var e;return{token:new o((function(t){e=t})),cancel:e}},e.exports=o},function(e,t,n){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},function(e,t,n){"use strict";e.exports=function(e){return"object"==typeof e&&!0===e.isAxiosError}},function(e,t,n){"use strict";n.r(t);var r=n(9),o=n.n(r),i=n(10),a=n.n(i);function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var c=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.injectHTML(),this.headerSearchIcon=document.querySelector(".header-search-icon"),this.overlay=document.querySelector(".search-overlay"),this.closeIcon=document.querySelector(".close-live-search"),this.inputField=document.querySelector("#live-search-field"),this.resultsArea=document.querySelector(".live-search-results"),this.loaderIcon=document.querySelector(".circle-loader"),this.typingWaitTimer,this.previousValue="",this.events()}var t,n,r;return t=e,(n=[{key:"events",value:function(){var e=this;this.inputField.addEventListener("keyup",(function(){return e.keyPressHandler()})),this.closeIcon.addEventListener("click",(function(){return e.closeOverlay()})),this.headerSearchIcon.addEventListener("click",(function(t){t.preventDefault(),e.openOverlay()}))}},{key:"keyPressHandler",value:function(){var e=this,t=this.inputField.value;""==t&&(clearTimeout(this.typingWaitTimer),this.hideLoaderIcon(),this.hideResultsArea()),""!=t&&t!=this.previousValue&&(clearTimeout(this.typingWaitTimer),this.showLoaderIcon(),this.hideResultsArea(),this.typingWaitTimer=setTimeout((function(){return e.sendRequest()}),750)),this.previousValue=t}},{key:"sendRequest",value:function(){var e=this;o.a.post("/search",{searchTerm:this.inputField.value}).then((function(t){console.log(t.data),e.renderResultsHTML(t.data)})).catch((function(){alert("request failed")}))}},{key:"renderResultsHTML",value:function(e){e.length?this.resultsArea.innerHTML=a.a.sanitize('<div class="list-group shadow-sm">\n        <div class="list-group-item active"><strong>Search Results</strong> ('.concat(e.length>1?"".concat(e.length," items found"):"1 item found"," )</div>\n\n        ").concat(e.map((function(e){var t=new Date(e.createdDate);return'<a href="/post/'.concat(e._id,'" class="list-group-item list-group-item-action">\n          <img class="avatar-tiny" src="').concat(e.author.avatar,'"> <strong>').concat(e.title,'</strong>\n          <span class="text-muted small">by ').concat(e.author.username," on ").concat(t.getMonth()+1,"/").concat(t.getDate(),"/").concat(t.getFullYear(),"</span>\n        </a>")})).join(""),"\n      </div>")):this.resultsArea.innerHTML='<p class="alert alert-danger text-center shadow-sm">No results found</p>',this.hideLoaderIcon(),this.showResultsArea()}},{key:"showLoaderIcon",value:function(){this.loaderIcon.classList.add("circle-loader--visible")}},{key:"hideLoaderIcon",value:function(){this.loaderIcon.classList.remove("circle-loader--visible")}},{key:"showResultsArea",value:function(){this.resultsArea.classList.add("live-search-results--visible")}},{key:"hideResultsArea",value:function(){this.resultsArea.classList.remove("live-search-results--visible")}},{key:"openOverlay",value:function(){var e=this;this.overlay.classList.add("search-overlay--visible"),setTimeout((function(){return e.inputField.focus()}),50)}},{key:"closeOverlay",value:function(){this.overlay.classList.remove("search-overlay--visible")}},{key:"injectHTML",value:function(){document.body.insertAdjacentHTML("beforeend",'\n    <div class="search-overlay">\n    <div class="search-overlay-top shadow-sm">\n      <div class="container container--narrow">\n        <label for="live-search-field" class="search-overlay-icon"><i class="fas fa-search"></i></label>\n        <input type="text" id="live-search-field" class="live-search-field" placeholder="What are you interested in?">\n        <span class="close-live-search"><i class="fas fa-times-circle"></i></span>\n      </div>\n    </div>\n\n    <div class="search-overlay-bottom">\n      <div class="container container--narrow py-3">\n        <div class="circle-loader"></div>\n        <div class="live-search-results"></div>\n      </div>\n    </div>\n  </div>')}}])&&s(t.prototype,n),r&&s(t,r),e}();document.querySelector(".header-search-icon")&&new c}]);