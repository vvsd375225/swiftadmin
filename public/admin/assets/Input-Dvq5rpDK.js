import{t as e}from"./use-locale-BLIMGIAh.js";import{Ar as t,At as n,Ct as r,Dr as i,En as a,Hn as o,Jn as s,K as c,Kr as l,Mi as u,Or as d,Pi as f,St as p,Ti as m,Tr as h,Tt as ee,Xn as te,Xr as g,Yn as _,Yt as v,ai as y,br as ne,bt as b,ci as x,cn as S,gi as re,it as C,jt as w,kr as T,ln as E,lt as ie,nn as ae,oi as oe,pt as D,q as se,qt as O,rn as ce,si as k,tn as le,ui as A,un as j,vn as M,vt as N,wi as P,wr as F,yi as ue,yt as I}from"./index-CstmdvSQ.js";function de(e,t){return P(e,e=>{e!==void 0&&(t.value=e)}),g(()=>e.value===void 0?t.value:e.value)}var L=/^(\d|\.)+$/,R=/(\d|\.)+/;function z(e,{c:t=1,offset:n=0,attachPx:r=!0}={}){if(typeof e==`number`){let r=(e+n)*t;return r===0?`0`:`${r}px`}else if(typeof e==`string`)if(L.test(e)){let i=(Number(e)+n)*t;return r?i===0?`0`:`${i}px`:`${i}`}else{let r=R.exec(e);return r?e.replace(R,String((Number(r[0])+n)*t)):e}return e}var B=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,V=/^\w*$/;function H(e,t){if(O(e))return!1;var n=typeof e;return n==`number`||n==`symbol`||n==`boolean`||e==null||v(e)?!0:V.test(e)||!B.test(e)||t!=null&&e in Object(t)}var fe=`Expected a function`;function U(e,t){if(typeof e!=`function`||t!=null&&typeof t!=`function`)throw TypeError(fe);var n=function(){var r=arguments,i=t?t.apply(this,r):r[0],a=n.cache;if(a.has(i))return a.get(i);var o=e.apply(this,r);return n.cache=a.set(i,o)||a,o};return n.cache=new(U.Cache||w),n}U.Cache=w;var pe=500;function W(e){var t=U(e,function(e){return n.size===pe&&n.clear(),e}),n=t.cache;return t}var G=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,me=/\\(\\)?/g,K=W(function(e){var t=[];return e.charCodeAt(0)===46&&t.push(``),e.replace(G,function(e,n,r,i){t.push(r?i.replace(me,`$1`):n||e)}),t});function he(e,t){return O(e)?e:H(e,t)?[e]:K(n(e))}var ge=1/0;function q(e){if(typeof e==`string`||v(e))return e;var t=e+``;return t==`0`&&1/e==-ge?`-0`:t}function J(e,t){t=he(t,e);for(var n=0,r=t.length;e!=null&&n<r;)e=e[q(t[n++])];return n&&n==r?e:void 0}function Y(e,t,n){var r=e==null?void 0:J(e,t);return r===void 0?n:r}var _e=y({name:`ChevronDown`,render(){return k(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},k(`path`,{d:`M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8 9.79289L12.1464 5.64645C12.3417 5.45118 12.6583 5.45118 12.8536 5.64645C13.0488 5.84171 13.0488 6.15829 12.8536 6.35355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z`,fill:`currentColor`}))}}),ve=N(`clear`,()=>k(`svg`,{viewBox:`0 0 16 16`,version:`1.1`,xmlns:`http://www.w3.org/2000/svg`},k(`g`,{stroke:`none`,"stroke-width":`1`,fill:`none`,"fill-rule":`evenodd`},k(`g`,{fill:`currentColor`,"fill-rule":`nonzero`},k(`path`,{d:`M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M6.5343055,5.83859116 C6.33943736,5.70359511 6.07001296,5.72288026 5.89644661,5.89644661 L5.89644661,5.89644661 L5.83859116,5.9656945 C5.70359511,6.16056264 5.72288026,6.42998704 5.89644661,6.60355339 L5.89644661,6.60355339 L7.293,8 L5.89644661,9.39644661 L5.83859116,9.4656945 C5.70359511,9.66056264 5.72288026,9.92998704 5.89644661,10.1035534 L5.89644661,10.1035534 L5.9656945,10.1614088 C6.16056264,10.2964049 6.42998704,10.2771197 6.60355339,10.1035534 L6.60355339,10.1035534 L8,8.707 L9.39644661,10.1035534 L9.4656945,10.1614088 C9.66056264,10.2964049 9.92998704,10.2771197 10.1035534,10.1035534 L10.1035534,10.1035534 L10.1614088,10.0343055 C10.2964049,9.83943736 10.2771197,9.57001296 10.1035534,9.39644661 L10.1035534,9.39644661 L8.707,8 L10.1035534,6.60355339 L10.1614088,6.5343055 C10.2964049,6.33943736 10.2771197,6.07001296 10.1035534,5.89644661 L10.1035534,5.89644661 L10.0343055,5.83859116 C9.83943736,5.70359511 9.57001296,5.72288026 9.39644661,5.89644661 L9.39644661,5.89644661 L8,7.293 L6.60355339,5.89644661 Z`}))))),ye=y({name:`Eye`,render(){return k(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 512 512`},k(`path`,{d:`M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`}),k(`circle`,{cx:`256`,cy:`256`,r:`80`,fill:`none`,stroke:`currentColor`,"stroke-miterlimit":`10`,"stroke-width":`32`}))}}),be=y({name:`EyeOff`,render(){return k(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 512 512`},k(`path`,{d:`M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448z`,fill:`currentColor`}),k(`path`,{d:`M255.66 384c-41.49 0-81.5-12.28-118.92-36.5c-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 0 0 .14-2.94L93.5 161.38a2 2 0 0 0-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0 0 75.8-12.58a2 2 0 0 0 .77-3.31l-21.58-21.58a4 4 0 0 0-3.83-1a204.8 204.8 0 0 1-51.16 6.47z`,fill:`currentColor`}),k(`path`,{d:`M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 0 0-74.89 12.83a2 2 0 0 0-.75 3.31l21.55 21.55a4 4 0 0 0 3.88 1a192.82 192.82 0 0 1 50.21-6.69c40.69 0 80.58 12.43 118.55 37c34.71 22.4 65.74 53.88 89.76 91a.13.13 0 0 1 0 .16a310.72 310.72 0 0 1-64.12 72.73a2 2 0 0 0-.15 2.95l19.9 19.89a2 2 0 0 0 2.7.13a343.49 343.49 0 0 0 68.64-78.48a32.2 32.2 0 0 0-.1-34.78z`,fill:`currentColor`}),k(`path`,{d:`M256 160a95.88 95.88 0 0 0-21.37 2.4a2 2 0 0 0-1 3.38l112.59 112.56a2 2 0 0 0 3.38-1A96 96 0 0 0 256 160z`,fill:`currentColor`}),k(`path`,{d:`M165.78 233.66a2 2 0 0 0-3.38 1a96 96 0 0 0 115 115a2 2 0 0 0 1-3.38z`,fill:`currentColor`}))}}),xe=h(`base-clear`,`
 flex-shrink: 0;
 height: 1em;
 width: 1em;
 position: relative;
`,[F(`>`,[i(`clear`,`
 font-size: var(--n-clear-size);
 height: 1em;
 width: 1em;
 cursor: pointer;
 color: var(--n-clear-color);
 transition: color .3s var(--n-bezier);
 display: flex;
 `,[F(`&:hover`,`
 color: var(--n-clear-color-hover)!important;
 `),F(`&:active`,`
 color: var(--n-clear-color-pressed)!important;
 `)]),i(`placeholder`,`
 display: flex;
 `),i(`clear, placeholder`,`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[D({originalTransform:`translateX(-50%) translateY(-50%)`,left:`50%`,top:`50%`})])])]),X=y({name:`BaseClear`,props:{clsPrefix:{type:String,required:!0},show:Boolean,onClear:Function},setup(e){return r(`-base-clear`,xe,f(e,`clsPrefix`)),{handleMouseDown(e){e.preventDefault()}}},render(){let{clsPrefix:e}=this;return k(`div`,{class:`${e}-base-clear`},k(I,null,{default:()=>{var t;return this.show?k(`div`,{key:`dismiss`,class:`${e}-base-clear__clear`,onClick:this.onClear,onMousedown:this.handleMouseDown,"data-clear":!0},S(this.$slots.icon,()=>[k(b,{clsPrefix:e},{default:()=>k(ve,null)})])):k(`div`,{key:`icon`,class:`${e}-base-clear__placeholder`},(t=this.$slots).placeholder?.call(t))}}))}}),Se=y({name:`InternalSelectionSuffix`,props:{clsPrefix:{type:String,required:!0},showArrow:{type:Boolean,default:void 0},showClear:{type:Boolean,default:void 0},loading:{type:Boolean,default:!1},onClear:Function},setup(e,{slots:t}){return()=>{let{clsPrefix:n}=e;return k(ie,{clsPrefix:n,class:`${n}-base-suffix`,strokeWidth:24,scale:.85,show:e.loading},{default:()=>e.showArrow?k(X,{clsPrefix:n,show:e.showClear,onClear:e.onClear},{placeholder:()=>k(b,{clsPrefix:n,class:`${n}-base-suffix__arrow`},{default:()=>S(t.default,()=>[k(_e,null)])})}):null})}}}),Ce=o(`n-input`),we=h(`input`,`
 max-width: 100%;
 cursor: text;
 line-height: 1.5;
 z-index: auto;
 outline: none;
 box-sizing: border-box;
 position: relative;
 display: inline-flex;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 transition: background-color .3s var(--n-bezier);
 font-size: var(--n-font-size);
 font-weight: var(--n-font-weight);
 --n-padding-vertical: calc((var(--n-height) - 1.5 * var(--n-font-size)) / 2);
`,[i(`input, textarea`,`
 overflow: hidden;
 flex-grow: 1;
 position: relative;
 `),i(`input-el, textarea-el, input-mirror, textarea-mirror, separator, placeholder`,`
 box-sizing: border-box;
 font-size: inherit;
 line-height: 1.5;
 font-family: inherit;
 border: none;
 outline: none;
 background-color: #0000;
 text-align: inherit;
 transition:
 -webkit-text-fill-color .3s var(--n-bezier),
 caret-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 text-decoration-color .3s var(--n-bezier);
 `),i(`input-el, textarea-el`,`
 -webkit-appearance: none;
 scrollbar-width: none;
 width: 100%;
 min-width: 0;
 text-decoration-color: var(--n-text-decoration-color);
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 background-color: transparent;
 `,[F(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,`
 width: 0;
 height: 0;
 display: none;
 `),F(`&::placeholder`,`
 color: #0000;
 -webkit-text-fill-color: transparent !important;
 `),F(`&:-webkit-autofill ~`,[i(`placeholder`,`display: none;`)])]),d(`round`,[T(`textarea`,`border-radius: calc(var(--n-height) / 2);`)]),i(`placeholder`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 overflow: hidden;
 color: var(--n-placeholder-color);
 `,[F(`span`,`
 width: 100%;
 display: inline-block;
 `)]),d(`textarea`,[i(`placeholder`,`overflow: visible;`)]),T(`autosize`,`width: 100%;`),d(`autosize`,[i(`textarea-el, input-el`,`
 position: absolute;
 top: 0;
 left: 0;
 height: 100%;
 `)]),h(`input-wrapper`,`
 overflow: hidden;
 display: inline-flex;
 flex-grow: 1;
 position: relative;
 padding-left: var(--n-padding-left);
 padding-right: var(--n-padding-right);
 `),i(`input-mirror`,`
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre;
 pointer-events: none;
 `),i(`input-el`,`
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 `,[F(`&[type=password]::-ms-reveal`,`display: none;`),F(`+`,[i(`placeholder`,`
 display: flex;
 align-items: center; 
 `)])]),T(`textarea`,[i(`placeholder`,`white-space: nowrap;`)]),i(`eye`,`
 display: flex;
 align-items: center;
 justify-content: center;
 transition: color .3s var(--n-bezier);
 `),d(`textarea`,`width: 100%;`,[h(`input-word-count`,`
 position: absolute;
 right: var(--n-padding-right);
 bottom: var(--n-padding-vertical);
 `),d(`resizable`,[h(`input-wrapper`,`
 resize: vertical;
 min-height: var(--n-height);
 `)]),i(`textarea-el, textarea-mirror, placeholder`,`
 height: 100%;
 padding-left: 0;
 padding-right: 0;
 padding-top: var(--n-padding-vertical);
 padding-bottom: var(--n-padding-vertical);
 word-break: break-word;
 display: inline-block;
 vertical-align: bottom;
 box-sizing: border-box;
 line-height: var(--n-line-height-textarea);
 margin: 0;
 resize: none;
 white-space: pre-wrap;
 scroll-padding-block-end: var(--n-padding-vertical);
 `),i(`textarea-mirror`,`
 width: 100%;
 pointer-events: none;
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre-wrap;
 overflow-wrap: break-word;
 `)]),d(`pair`,[i(`input-el, placeholder`,`text-align: center;`),i(`separator`,`
 display: flex;
 align-items: center;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 white-space: nowrap;
 `,[h(`icon`,`
 color: var(--n-icon-color);
 `),h(`base-icon`,`
 color: var(--n-icon-color);
 `)])]),d(`disabled`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[i(`border`,`border: var(--n-border-disabled);`),i(`input-el, textarea-el`,`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 text-decoration-color: var(--n-text-color-disabled);
 `),i(`placeholder`,`color: var(--n-placeholder-color-disabled);`),i(`separator`,`color: var(--n-text-color-disabled);`,[h(`icon`,`
 color: var(--n-icon-color-disabled);
 `),h(`base-icon`,`
 color: var(--n-icon-color-disabled);
 `)]),h(`input-word-count`,`
 color: var(--n-count-text-color-disabled);
 `),i(`suffix, prefix`,`color: var(--n-text-color-disabled);`,[h(`icon`,`
 color: var(--n-icon-color-disabled);
 `),h(`internal-icon`,`
 color: var(--n-icon-color-disabled);
 `)])]),T(`disabled`,[i(`eye`,`
 color: var(--n-icon-color);
 cursor: pointer;
 `,[F(`&:hover`,`
 color: var(--n-icon-color-hover);
 `),F(`&:active`,`
 color: var(--n-icon-color-pressed);
 `)]),F(`&:hover`,[i(`state-border`,`border: var(--n-border-hover);`)]),d(`focus`,`background-color: var(--n-color-focus);`,[i(`state-border`,`
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),i(`border, state-border`,`
 box-sizing: border-box;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border-radius: inherit;
 border: var(--n-border);
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),i(`state-border`,`
 border-color: #0000;
 z-index: 1;
 `),i(`prefix`,`margin-right: 4px;`),i(`suffix`,`
 margin-left: 4px;
 `),i(`suffix, prefix`,`
 transition: color .3s var(--n-bezier);
 flex-wrap: nowrap;
 flex-shrink: 0;
 line-height: var(--n-height);
 white-space: nowrap;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 color: var(--n-suffix-text-color);
 `,[h(`base-loading`,`
 font-size: var(--n-icon-size);
 margin: 0 2px;
 color: var(--n-loading-color);
 `),h(`base-clear`,`
 font-size: var(--n-icon-size);
 `,[i(`placeholder`,[h(`base-icon`,`
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)])]),F(`>`,[h(`icon`,`
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)]),h(`base-icon`,`
 font-size: var(--n-icon-size);
 `)]),h(`input-word-count`,`
 pointer-events: none;
 line-height: 1.5;
 font-size: .85em;
 color: var(--n-count-text-color);
 transition: color .3s var(--n-bezier);
 margin-left: 4px;
 font-variant: tabular-nums;
 `),[`warning`,`error`].map(e=>d(`${e}-status`,[T(`disabled`,[h(`base-loading`,`
 color: var(--n-loading-color-${e})
 `),i(`input-el, textarea-el`,`
 caret-color: var(--n-caret-color-${e});
 `),i(`state-border`,`
 border: var(--n-border-${e});
 `),F(`&:hover`,[i(`state-border`,`
 border: var(--n-border-hover-${e});
 `)]),F(`&:focus`,`
 background-color: var(--n-color-focus-${e});
 `,[i(`state-border`,`
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)]),d(`focus`,`
 background-color: var(--n-color-focus-${e});
 `,[i(`state-border`,`
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]),Te=h(`input`,[d(`disabled`,[i(`input-el, textarea-el`,`
 -webkit-text-fill-color: var(--n-text-color-disabled);
 `)])]);function Ee(e){let t=0;for(let n of e)t++;return t}function Z(e){return e===``||e==null}function De(e){let t=u(null);function n(){let{value:n}=e;if(!n?.focus){i();return}let{selectionStart:r,selectionEnd:a,value:o}=n;if(r==null||a==null){i();return}t.value={start:r,end:a,beforeText:o.slice(0,r),afterText:o.slice(a)}}function r(){var n;let{value:r}=t,{value:i}=e;if(!r||!i)return;let{value:a}=i,{start:o,beforeText:s,afterText:c}=r,l=a.length;if(a.endsWith(c))l=a.length-c.length;else if(a.startsWith(s))l=s.length;else{let e=s[o-1],t=a.indexOf(e,o-1);t!==-1&&(l=t+1)}(n=i.setSelectionRange)==null||n.call(i,l,l)}function i(){t.value=null}return P(e,i),{recordCursor:n,restoreCursor:r}}var Oe=y({name:`InputWordCount`,setup(e,{slots:t}){let{mergedValueRef:n,maxlengthRef:r,mergedClsPrefixRef:i,countGraphemesRef:a}=x(Ce),o=g(()=>{let{value:e}=n;return e===null||Array.isArray(e)?0:(a.value||Ee)(e)});return()=>{let{value:e}=r,{value:a}=n;return k(`span`,{class:`${i.value}-input-word-count`},E(t.default,{value:a===null||Array.isArray(a)?``:a},()=>[e===void 0?o.value:`${o.value} / ${e}`]))}}}),ke=y({name:`Input`,props:Object.assign(Object.assign({},p.props),{bordered:{type:Boolean,default:void 0},type:{type:String,default:`text`},placeholder:[Array,String],defaultValue:{type:[String,Array],default:null},value:[String,Array],disabled:{type:Boolean,default:void 0},size:String,rows:{type:[Number,String],default:3},round:Boolean,minlength:[String,Number],maxlength:[String,Number],clearable:Boolean,autosize:{type:[Boolean,Object],default:!1},pair:Boolean,separator:String,readonly:{type:[String,Boolean],default:!1},passivelyActivated:Boolean,showPasswordOn:String,stateful:{type:Boolean,default:!0},autofocus:Boolean,inputProps:Object,resizable:{type:Boolean,default:!0},showCount:Boolean,loading:{type:Boolean,default:void 0},allowInput:Function,renderCount:Function,onMousedown:Function,onKeydown:Function,onKeyup:[Function,Array],onInput:[Function,Array],onFocus:[Function,Array],onBlur:[Function,Array],onClick:[Function,Array],onChange:[Function,Array],onClear:[Function,Array],countGraphemes:Function,status:String,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],textDecoration:[String,Array],attrSize:{type:Number,default:20},onInputBlur:[Function,Array],onInputFocus:[Function,Array],onDeactivate:[Function,Array],onActivate:[Function,Array],onWrapperFocus:[Function,Array],onWrapperBlur:[Function,Array],internalDeactivateOnEnter:Boolean,internalForceFocus:Boolean,internalLoadingBeforeSuffix:{type:Boolean,default:!0},showPasswordToggle:Boolean}),slots:Object,setup(n){let{mergedClsPrefixRef:i,mergedBorderedRef:a,inlineThemeDisabled:o,mergedRtlRef:l,mergedComponentPropsRef:d}=ce(n),h=p(`Input`,`-input`,we,c,n,i);se&&r(`-input-safari`,Te,i);let v=u(null),y=u(null),b=u(null),x=u(null),S=u(null),C=u(null),w=u(null),T=De(w),E=u(null),{localeRef:ie}=e(`Input`),D=u(n.defaultValue),O=de(f(n,`value`),D),k=le(n,{mergedSize:e=>{let{size:t}=n;if(t)return t;let{mergedSize:r}=e||{};return r?.value?r.value:d?.value?.Input?.size||`medium`}}),{mergedSizeRef:j,mergedDisabledRef:N,mergedStatusRef:F}=k,I=u(!1),L=u(!1),R=u(!1),z=u(!1),B=null,V=g(()=>{let{placeholder:e,pair:t}=n;return t?Array.isArray(e)?e:e===void 0?[``,``]:[e,e]:e===void 0?[ie.value.placeholder]:[e]}),H=g(()=>{let{value:e}=R,{value:t}=O,{value:n}=V;return!e&&(Z(t)||Array.isArray(t)&&Z(t[0]))&&n[0]}),fe=g(()=>{let{value:e}=R,{value:t}=O,{value:n}=V;return!e&&n[1]&&(Z(t)||Array.isArray(t)&&Z(t[1]))}),U=s(()=>n.internalForceFocus||I.value),pe=s(()=>{if(N.value||n.readonly||!n.clearable||!U.value&&!L.value)return!1;let{value:e}=O,{value:t}=U;return n.pair?!!(Array.isArray(e)&&(e[0]||e[1]))&&(L.value||t):!!e&&(L.value||t)}),W=g(()=>{let{showPasswordOn:e}=n;if(e)return e;if(n.showPasswordToggle)return`click`}),G=u(!1),me=g(()=>{let{textDecoration:e}=n;return e?Array.isArray(e)?e.map(e=>({textDecoration:e})):[{textDecoration:e}]:[``,``]}),K=u(void 0),he=()=>{if(n.type===`textarea`){let{autosize:e}=n;if(e&&(K.value=E.value?.$el?.offsetWidth),!y.value||typeof e==`boolean`)return;let{paddingTop:t,paddingBottom:r,lineHeight:i}=window.getComputedStyle(y.value),a=Number(t.slice(0,-2)),o=Number(r.slice(0,-2)),s=Number(i.slice(0,-2)),{value:c}=b;if(!c)return;if(e.minRows){let t=Math.max(e.minRows,1),n=`${a+o+s*t}px`;c.style.minHeight=n}if(e.maxRows){let t=`${a+o+s*e.maxRows}px`;c.style.maxHeight=t}}},ge=g(()=>{let{maxlength:e}=n;return e===void 0?void 0:Number(e)});re(()=>{let{value:e}=O;Array.isArray(e)||nt(e)});let q=oe().proxy;function J(e,t){let{onUpdateValue:r,"onUpdate:value":i,onInput:a}=n,{nTriggerFormInput:o}=k;r&&M(r,e,t),i&&M(i,e,t),a&&M(a,e,t),D.value=e,o()}function Y(e,t){let{onChange:r}=n,{nTriggerFormChange:i}=k;r&&M(r,e,t),D.value=e,i()}function _e(e){let{onBlur:t}=n,{nTriggerFormBlur:r}=k;t&&M(t,e),r()}function ve(e){let{onFocus:t}=n,{nTriggerFormFocus:r}=k;t&&M(t,e),r()}function ye(e){let{onClear:t}=n;t&&M(t,e)}function be(e){let{onInputBlur:t}=n;t&&M(t,e)}function xe(e){let{onInputFocus:t}=n;t&&M(t,e)}function X(){let{onDeactivate:e}=n;e&&M(e)}function Se(){let{onActivate:e}=n;e&&M(e)}function Ee(e){let{onClick:t}=n;t&&M(t,e)}function Oe(e){let{onWrapperFocus:t}=n;t&&M(t,e)}function ke(e){let{onWrapperBlur:t}=n;t&&M(t,e)}function Ae(){R.value=!0}function je(e){R.value=!1,e.target===C.value?Q(e,1):Q(e,0)}function Q(e,t=0,r=`input`){let i=e.target.value;if(nt(i),e instanceof InputEvent&&!e.isComposing&&(R.value=!1),n.type===`textarea`){let{value:e}=E;e&&e.syncUnifiedContainer()}if(B=i,R.value)return;T.recordCursor();let a=Me(i);if(a)if(!n.pair)r===`input`?J(i,{source:t}):Y(i,{source:t});else{let{value:e}=O;e=Array.isArray(e)?[e[0],e[1]]:[``,``],e[t]=i,r===`input`?J(e,{source:t}):Y(e,{source:t})}q.$forceUpdate(),a||A(T.restoreCursor)}function Me(e){let{countGraphemes:t,maxlength:r,minlength:i}=n;if(t){let n;if(r!==void 0&&(n===void 0&&(n=t(e)),n>Number(r))||i!==void 0&&(n===void 0&&(n=t(e)),n<Number(r)))return!1}let{allowInput:a}=n;return typeof a==`function`?a(e):!0}function Ne(e){be(e),e.relatedTarget===v.value&&X(),e.relatedTarget!==null&&(e.relatedTarget===S.value||e.relatedTarget===C.value||e.relatedTarget===y.value)||(z.value=!1),$(e,`blur`),w.value=null}function Pe(e,t){xe(e),I.value=!0,z.value=!0,Se(),$(e,`focus`),t===0?w.value=S.value:t===1?w.value=C.value:t===2&&(w.value=y.value)}function Fe(e){n.passivelyActivated&&(ke(e),$(e,`blur`))}function Ie(e){n.passivelyActivated&&(I.value=!0,Oe(e),$(e,`focus`))}function $(e,t){e.relatedTarget!==null&&(e.relatedTarget===S.value||e.relatedTarget===C.value||e.relatedTarget===y.value||e.relatedTarget===v.value)||(t===`focus`?(ve(e),I.value=!0):t===`blur`&&(_e(e),I.value=!1))}function Le(e,t){Q(e,t,`change`)}function Re(e){Ee(e)}function ze(e){ye(e),Be()}function Be(){n.pair?(J([``,``],{source:`clear`}),Y([``,``],{source:`clear`})):(J(``,{source:`clear`}),Y(``,{source:`clear`}))}function Ve(e){let{onMousedown:t}=n;t&&t(e);let{tagName:r}=e.target;if(r!==`INPUT`&&r!==`TEXTAREA`){if(n.resizable){let{value:t}=v;if(t){let{left:n,top:r,width:i,height:a}=t.getBoundingClientRect();if(n+i-14<e.clientX&&e.clientX<n+i&&r+a-14<e.clientY&&e.clientY<r+a)return}}e.preventDefault(),I.value||Xe()}}function He(){var e;L.value=!0,n.type===`textarea`&&((e=E.value)==null||e.handleMouseEnterWrapper())}function Ue(){var e;L.value=!1,n.type===`textarea`&&((e=E.value)==null||e.handleMouseLeaveWrapper())}function We(){N.value||W.value===`click`&&(G.value=!G.value)}function Ge(e){if(N.value)return;e.preventDefault();let t=e=>{e.preventDefault(),_(`mouseup`,document,t)};if(te(`mouseup`,document,t),W.value!==`mousedown`)return;G.value=!0;let n=()=>{G.value=!1,_(`mouseup`,document,n)};te(`mouseup`,document,n)}function Ke(e){n.onKeyup&&M(n.onKeyup,e)}function qe(e){switch(n.onKeydown&&M(n.onKeydown,e),e.key){case`Escape`:Ye();break;case`Enter`:Je(e);break}}function Je(e){var t,r;if(n.passivelyActivated){let{value:i}=z;if(i){n.internalDeactivateOnEnter&&Ye();return}e.preventDefault(),n.type===`textarea`?(t=y.value)==null||t.focus():(r=S.value)==null||r.focus()}}function Ye(){n.passivelyActivated&&(z.value=!1,A(()=>{var e;(e=v.value)==null||e.focus()}))}function Xe(){var e,t,r;N.value||(n.passivelyActivated?(e=v.value)==null||e.focus():((t=y.value)==null||t.focus(),(r=S.value)==null||r.focus()))}function Ze(){v.value?.contains(document.activeElement)&&document.activeElement.blur()}function Qe(){var e,t;(e=y.value)==null||e.select(),(t=S.value)==null||t.select()}function $e(){N.value||(y.value?y.value.focus():S.value&&S.value.focus())}function et(){let{value:e}=v;e?.contains(document.activeElement)&&e!==document.activeElement&&Ye()}function tt(e){if(n.type===`textarea`){let{value:t}=y;t?.scrollTo(e)}else{let{value:t}=S;t?.scrollTo(e)}}function nt(e){let{type:t,pair:r,autosize:i}=n;if(!r&&i)if(t===`textarea`){let{value:t}=b;t&&(t.textContent=`${e??``}\r\n`)}else{let{value:t}=x;t&&(e?t.textContent=e:t.innerHTML=`&nbsp;`)}}function rt(){he()}let it=u({top:`0`});function at(e){var t;let{scrollTop:n}=e.target;it.value.top=`${-n}px`,(t=E.value)==null||t.syncUnifiedContainer()}let ot=null;m(()=>{let{autosize:e,type:t}=n;e&&t===`textarea`?ot=P(O,e=>{!Array.isArray(e)&&e!==B&&nt(e)}):ot?.()});let st=null;m(()=>{n.type===`textarea`?st=P(O,e=>{var t;!Array.isArray(e)&&e!==B&&((t=E.value)==null||t.syncUnifiedContainer())}):st?.()}),ue(Ce,{mergedValueRef:O,maxlengthRef:ge,mergedClsPrefixRef:i,countGraphemesRef:f(n,`countGraphemes`)});let ct={wrapperElRef:v,inputElRef:S,textareaElRef:y,isCompositing:R,clear:Be,focus:Xe,blur:Ze,select:Qe,deactivate:et,activate:$e,scrollTo:tt},lt=ee(`Input`,l,i),ut=g(()=>{let{value:e}=j,{common:{cubicBezierEaseInOut:n},self:{color:r,borderRadius:i,textColor:a,caretColor:o,caretColorError:s,caretColorWarning:c,textDecorationColor:l,border:u,borderDisabled:d,borderHover:f,borderFocus:p,placeholderColor:m,placeholderColorDisabled:ee,lineHeightTextarea:te,colorDisabled:g,colorFocus:_,textColorDisabled:v,boxShadowFocus:y,iconSize:b,colorFocusWarning:x,boxShadowFocusWarning:S,borderWarning:re,borderFocusWarning:C,borderHoverWarning:w,colorFocusError:T,boxShadowFocusError:E,borderError:ie,borderFocusError:ae,borderHoverError:oe,clearSize:D,clearColor:se,clearColorHover:O,clearColorPressed:ce,iconColor:k,iconColorDisabled:le,suffixTextColor:A,countTextColor:M,countTextColorDisabled:N,iconColorHover:P,iconColorPressed:F,loadingColor:ue,loadingColorError:I,loadingColorWarning:de,fontWeight:L,[t(`padding`,e)]:R,[t(`fontSize`,e)]:z,[t(`height`,e)]:B}}=h.value,{left:V,right:H}=ne(R);return{"--n-bezier":n,"--n-count-text-color":M,"--n-count-text-color-disabled":N,"--n-color":r,"--n-font-size":z,"--n-font-weight":L,"--n-border-radius":i,"--n-height":B,"--n-padding-left":V,"--n-padding-right":H,"--n-text-color":a,"--n-caret-color":o,"--n-text-decoration-color":l,"--n-border":u,"--n-border-disabled":d,"--n-border-hover":f,"--n-border-focus":p,"--n-placeholder-color":m,"--n-placeholder-color-disabled":ee,"--n-icon-size":b,"--n-line-height-textarea":te,"--n-color-disabled":g,"--n-color-focus":_,"--n-text-color-disabled":v,"--n-box-shadow-focus":y,"--n-loading-color":ue,"--n-caret-color-warning":c,"--n-color-focus-warning":x,"--n-box-shadow-focus-warning":S,"--n-border-warning":re,"--n-border-focus-warning":C,"--n-border-hover-warning":w,"--n-loading-color-warning":de,"--n-caret-color-error":s,"--n-color-focus-error":T,"--n-box-shadow-focus-error":E,"--n-border-error":ie,"--n-border-focus-error":ae,"--n-border-hover-error":oe,"--n-loading-color-error":I,"--n-clear-color":se,"--n-clear-size":D,"--n-clear-color-hover":O,"--n-clear-color-pressed":ce,"--n-icon-color":k,"--n-icon-color-hover":P,"--n-icon-color-pressed":F,"--n-icon-color-disabled":le,"--n-suffix-text-color":A}}),dt=o?ae(`input`,g(()=>{let{value:e}=j;return e[0]}),ut,n):void 0;return Object.assign(Object.assign({},ct),{wrapperElRef:v,inputElRef:S,inputMirrorElRef:x,inputEl2Ref:C,textareaElRef:y,textareaMirrorElRef:b,textareaScrollbarInstRef:E,rtlEnabled:lt,uncontrolledValue:D,mergedValue:O,passwordVisible:G,mergedPlaceholder:V,showPlaceholder1:H,showPlaceholder2:fe,mergedFocus:U,isComposing:R,activated:z,showClearButton:pe,mergedSize:j,mergedDisabled:N,textDecorationStyle:me,mergedClsPrefix:i,mergedBordered:a,mergedShowPasswordOn:W,placeholderStyle:it,mergedStatus:F,textAreaScrollContainerWidth:K,handleTextAreaScroll:at,handleCompositionStart:Ae,handleCompositionEnd:je,handleInput:Q,handleInputBlur:Ne,handleInputFocus:Pe,handleWrapperBlur:Fe,handleWrapperFocus:Ie,handleMouseEnter:He,handleMouseLeave:Ue,handleMouseDown:Ve,handleChange:Le,handleClick:Re,handleClear:ze,handlePasswordToggleClick:We,handlePasswordToggleMousedown:Ge,handleWrapperKeydown:qe,handleWrapperKeyup:Ke,handleTextAreaMirrorResize:rt,getTextareaScrollContainer:()=>y.value,mergedTheme:h,cssVars:o?void 0:ut,themeClass:dt?.themeClass,onRender:dt?.onRender})},render(){let{mergedClsPrefix:e,mergedStatus:t,themeClass:n,type:r,countGraphemes:i,onRender:o}=this,s=this.$slots;return o?.(),k(`div`,{ref:`wrapperElRef`,class:[`${e}-input`,`${e}-input--${this.mergedSize}-size`,n,t&&`${e}-input--${t}-status`,{[`${e}-input--rtl`]:this.rtlEnabled,[`${e}-input--disabled`]:this.mergedDisabled,[`${e}-input--textarea`]:r===`textarea`,[`${e}-input--resizable`]:this.resizable&&!this.autosize,[`${e}-input--autosize`]:this.autosize,[`${e}-input--round`]:this.round&&r!==`textarea`,[`${e}-input--pair`]:this.pair,[`${e}-input--focus`]:this.mergedFocus,[`${e}-input--stateful`]:this.stateful}],style:this.cssVars,tabindex:!this.mergedDisabled&&this.passivelyActivated&&!this.activated?0:void 0,onFocus:this.handleWrapperFocus,onBlur:this.handleWrapperBlur,onClick:this.handleClick,onMousedown:this.handleMouseDown,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd,onKeyup:this.handleWrapperKeyup,onKeydown:this.handleWrapperKeydown},k(`div`,{class:`${e}-input-wrapper`},j(s.prefix,t=>t&&k(`div`,{class:`${e}-input__prefix`},t)),r===`textarea`?k(C,{ref:`textareaScrollbarInstRef`,class:`${e}-input__textarea`,container:this.getTextareaScrollContainer,theme:this.theme?.peers?.Scrollbar,themeOverrides:this.themeOverrides?.peers?.Scrollbar,triggerDisplayManually:!0,useUnifiedContainer:!0,internalHoistYRail:!0},{default:()=>{let{textAreaScrollContainerWidth:t}=this,n={width:this.autosize&&t&&`${t}px`};return k(l,null,k(`textarea`,Object.assign({},this.inputProps,{ref:`textareaElRef`,class:[`${e}-input__textarea-el`,this.inputProps?.class],autofocus:this.autofocus,rows:Number(this.rows),placeholder:this.placeholder,value:this.mergedValue,disabled:this.mergedDisabled,maxlength:i?void 0:this.maxlength,minlength:i?void 0:this.minlength,readonly:this.readonly,tabindex:this.passivelyActivated&&!this.activated?-1:void 0,style:[this.textDecorationStyle[0],this.inputProps?.style,n],onBlur:this.handleInputBlur,onFocus:e=>{this.handleInputFocus(e,2)},onInput:this.handleInput,onChange:this.handleChange,onScroll:this.handleTextAreaScroll})),this.showPlaceholder1?k(`div`,{class:`${e}-input__placeholder`,style:[this.placeholderStyle,n],key:`placeholder`},this.mergedPlaceholder[0]):null,this.autosize?k(a,{onResize:this.handleTextAreaMirrorResize},{default:()=>k(`div`,{ref:`textareaMirrorElRef`,class:`${e}-input__textarea-mirror`,key:`mirror`})}):null)}}):k(`div`,{class:`${e}-input__input`},k(`input`,Object.assign({type:r===`password`&&this.mergedShowPasswordOn&&this.passwordVisible?`text`:r},this.inputProps,{ref:`inputElRef`,class:[`${e}-input__input-el`,this.inputProps?.class],style:[this.textDecorationStyle[0],this.inputProps?.style],tabindex:this.passivelyActivated&&!this.activated?-1:this.inputProps?.tabindex,placeholder:this.mergedPlaceholder[0],disabled:this.mergedDisabled,maxlength:i?void 0:this.maxlength,minlength:i?void 0:this.minlength,value:Array.isArray(this.mergedValue)?this.mergedValue[0]:this.mergedValue,readonly:this.readonly,autofocus:this.autofocus,size:this.attrSize,onBlur:this.handleInputBlur,onFocus:e=>{this.handleInputFocus(e,0)},onInput:e=>{this.handleInput(e,0)},onChange:e=>{this.handleChange(e,0)}})),this.showPlaceholder1?k(`div`,{class:`${e}-input__placeholder`},k(`span`,null,this.mergedPlaceholder[0])):null,this.autosize?k(`div`,{class:`${e}-input__input-mirror`,key:`mirror`,ref:`inputMirrorElRef`},`\xA0`):null),!this.pair&&j(s.suffix,t=>t||this.clearable||this.showCount||this.mergedShowPasswordOn||this.loading!==void 0?k(`div`,{class:`${e}-input__suffix`},[j(s[`clear-icon-placeholder`],t=>(this.clearable||t)&&k(X,{clsPrefix:e,show:this.showClearButton,onClear:this.handleClear},{placeholder:()=>t,icon:()=>{var e;return(e=this.$slots)[`clear-icon`]?.call(e)}})),this.internalLoadingBeforeSuffix?null:t,this.loading===void 0?null:k(Se,{clsPrefix:e,loading:this.loading,showArrow:!1,showClear:!1,style:this.cssVars}),this.internalLoadingBeforeSuffix?t:null,this.showCount&&this.type!==`textarea`?k(Oe,null,{default:e=>{let{renderCount:t}=this;return t?t(e):s.count?.call(s,e)}}):null,this.mergedShowPasswordOn&&this.type===`password`?k(`div`,{class:`${e}-input__eye`,onMousedown:this.handlePasswordToggleMousedown,onClick:this.handlePasswordToggleClick},this.passwordVisible?S(s[`password-visible-icon`],()=>[k(b,{clsPrefix:e},{default:()=>k(ye,null)})]):S(s[`password-invisible-icon`],()=>[k(b,{clsPrefix:e},{default:()=>k(be,null)})])):null]):null)),this.pair?k(`span`,{class:`${e}-input__separator`},S(s.separator,()=>[this.separator])):null,this.pair?k(`div`,{class:`${e}-input-wrapper`},k(`div`,{class:`${e}-input__input`},k(`input`,{ref:`inputEl2Ref`,type:this.type,class:`${e}-input__input-el`,tabindex:this.passivelyActivated&&!this.activated?-1:void 0,placeholder:this.mergedPlaceholder[1],disabled:this.mergedDisabled,maxlength:i?void 0:this.maxlength,minlength:i?void 0:this.minlength,value:Array.isArray(this.mergedValue)?this.mergedValue[1]:void 0,readonly:this.readonly,style:this.textDecorationStyle[1],onBlur:this.handleInputBlur,onFocus:e=>{this.handleInputFocus(e,1)},onInput:e=>{this.handleInput(e,1)},onChange:e=>{this.handleChange(e,1)}}),this.showPlaceholder2?k(`div`,{class:`${e}-input__placeholder`},k(`span`,null,this.mergedPlaceholder[1])):null),j(s.suffix,t=>(this.clearable||t)&&k(`div`,{class:`${e}-input__suffix`},[this.clearable&&k(X,{clsPrefix:e,show:this.showClearButton,onClear:this.handleClear},{icon:()=>s[`clear-icon`]?.call(s),placeholder:()=>s[`clear-icon-placeholder`]?.call(s)}),t]))):null,this.mergedBordered?k(`div`,{class:`${e}-input__border`}):null,this.mergedBordered?k(`div`,{class:`${e}-input__state-border`}):null,this.showCount&&r===`textarea`?k(Oe,null,{default:e=>{let{renderCount:t}=this;return t?t(e):s.count?.call(s,e)}}):null)}});export{Y as a,he as c,de as d,_e as i,H as l,Se as n,J as o,ye as r,q as s,ke as t,z as u};