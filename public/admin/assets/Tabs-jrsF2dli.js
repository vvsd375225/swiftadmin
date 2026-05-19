import{o as e}from"./Tag-D4bZfoIR.js";import{T as t,b as n,x as r}from"./Icon-CWBooZtB.js";import{d as i}from"./Input-Dvq5rpDK.js";import{t as a}from"./Add-DdRvWQlC.js";import{$t as o,Ar as s,Di as c,Dr as l,En as u,Hn as d,Hr as f,Kr as p,Kt as m,Mi as h,Or as g,Pi as _,St as v,Ti as y,Tr as b,Xr as x,Yr as S,Yt as C,_n as w,a as ee,ai as T,bn as E,br as D,bt as O,ci as k,fn as A,ft as te,gi as ne,kn as j,kr as re,li as M,nn as ie,pn as ae,rn as oe,si as N,ui as P,un as F,vn as I,vr as se,wi as L,wr as R,yi as ce,zr as z}from"./index-CstmdvSQ.js";var B=n(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[n(`&::-webkit-scrollbar`,{width:0,height:0})]),le=T({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=h(null);function t(e){!(e.currentTarget.offsetWidth<e.currentTarget.scrollWidth)||e.deltaY===0||(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=j();return B.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:r,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return N(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}}),ue=/\s/;function de(e){for(var t=e.length;t--&&ue.test(e.charAt(t)););return t}var V=/^\s+/;function H(e){return e&&e.slice(0,de(e)+1).replace(V,``)}var U=NaN,fe=/^[-+]0x[0-9a-f]+$/i,pe=/^0b[01]+$/i,W=/^0o[0-7]+$/i,G=parseInt;function K(e){if(typeof e==`number`)return e;if(C(e))return U;if(m(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=m(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=H(e);var n=pe.test(e);return n||W.test(e)?G(e.slice(2),n?2:8):fe.test(e)?U:+e}var q=function(){return o.Date.now()},me=`Expected a function`,he=Math.max,ge=Math.min;function J(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,f=!0;if(typeof e!=`function`)throw TypeError(me);t=K(t)||0,m(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?he(K(n.maxWait)||0,t):a,f=`trailing`in n?!!n.trailing:f);function p(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function h(e){return l=e,s=setTimeout(v,t),u?p(e):o}function g(e){var n=e-c,r=e-l,i=t-n;return d?ge(i,a-r):i}function _(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function v(){var e=q();if(_(e))return y(e);s=setTimeout(v,g(e))}function y(e){return s=void 0,f&&r?p(e):(r=i=void 0,o)}function b(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function x(){return s===void 0?o:y(q())}function S(){var e=q(),n=_(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return h(c);if(d)return clearTimeout(s),s=setTimeout(v,t),p(c)}return s===void 0&&(s=setTimeout(v,t)),o}return S.cancel=b,S.flush=x,S}var _e=`Expected a function`;function ve(e,t,n){var r=!0,i=!0;if(typeof e!=`function`)throw TypeError(_e);return m(n)&&(r=`leading`in n?!!n.leading:r,i=`trailing`in n?!!n.trailing:i),J(e,t,{leading:r,maxWait:t,trailing:i})}var ye=d(`n-tabs`),Y={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},X=T({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:Y,slots:Object,setup(e){let t=k(ye,null);return t||E(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return N(`div`,{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),Z=T({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},ae(Y,[`displayDirective`])),setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:r,closableRef:i,tabStyleRef:a,addTabStyleRef:o,tabClassRef:s,addTabClassRef:c,tabChangeIdRef:l,onBeforeLeaveRef:u,triggerRef:d,handleAdd:f,activateTab:p,handleClose:m}=k(ye);return{trigger:d,mergedClosable:x(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?i.value:t}),style:a,addStyle:o,tabClass:s,addTabClass:c,clsPrefix:t,value:n,type:r,handleClose(t){t.stopPropagation(),!e.disabled&&m(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){f();return}let{name:t}=e,r=++l.id;if(t!==n.value){let{value:i}=u;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&l.id===r&&p(t)}):p(t)}}}},render(){let{internalAddable:e,clsPrefix:t,name:n,disabled:r,label:i,tab:o,value:s,mergedClosable:c,trigger:l,$slots:{default:u}}=this,d=i??o;return N(`div`,{class:`${t}-tabs-tab-wrapper`},this.internalLeftPadded?N(`div`,{class:`${t}-tabs-tab-pad`}):null,N(`div`,Object.assign({key:n,"data-name":n,"data-disabled":r?!0:void 0},M({class:[`${t}-tabs-tab`,s===n&&`${t}-tabs-tab--active`,r&&`${t}-tabs-tab--disabled`,c&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:l===`click`?this.activateTab:void 0,onMouseenter:l===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),N(`span`,{class:`${t}-tabs-tab__label`},e?N(p,null,N(`div`,{class:`${t}-tabs-tab__height-placeholder`},`\xA0`),N(O,{clsPrefix:t},{default:()=>N(a,null)})):u?u():typeof d==`object`?d:A(d??n)),c&&this.type===`card`?N(te,{clsPrefix:t,class:`${t}-tabs-tab__close`,onClick:this.handleClose,disabled:r}):null))}}),be=b(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[g(`segment-type`,[b(`tabs-rail`,[R(`&.transition-disabled`,[b(`tabs-capsule`,`
 transition: none;
 `)])])]),g(`top`,[b(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),g(`left`,[b(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),g(`left, right`,`
 flex-direction: row;
 `,[b(`tabs-bar`,`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),b(`tabs-tab`,`
 padding: var(--n-tab-padding-vertical); 
 `)]),g(`right`,`
 flex-direction: row-reverse;
 `,[b(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),b(`tabs-bar`,`
 left: 0;
 `)]),g(`bottom`,`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[b(`tab-pane`,`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),b(`tabs-bar`,`
 top: 0;
 `)]),b(`tabs-rail`,`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[b(`tabs-capsule`,`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),b(`tabs-tab-wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[b(`tabs-tab`,`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[g(`active`,`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),R(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])])]),g(`flex`,[b(`tabs-nav`,`
 width: 100%;
 position: relative;
 `,[b(`tabs-wrapper`,`
 width: 100%;
 `,[b(`tabs-tab`,`
 margin-right: 0;
 `)])])]),b(`tabs-nav`,`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[l(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),l(`prefix`,`padding-right: 16px;`),l(`suffix`,`padding-left: 16px;`)]),g(`top, bottom`,[R(`>`,[b(`tabs-nav`,[b(`tabs-nav-scroll-wrapper`,[R(`&::before`,`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),R(`&::after`,`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),g(`shadow-start`,[R(`&::before`,`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),g(`shadow-end`,[R(`&::after`,`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),g(`left, right`,[b(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),R(`>`,[b(`tabs-nav`,[b(`tabs-nav-scroll-wrapper`,[R(`&::before`,`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),R(`&::after`,`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),g(`shadow-start`,[R(`&::before`,`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),g(`shadow-end`,[R(`&::after`,`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),b(`tabs-nav-scroll-wrapper`,`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[b(`tabs-nav-y-scroll`,`
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `,[R(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,`
 width: 0;
 height: 0;
 display: none;
 `)]),R(`&::before, &::after`,`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `)]),b(`tabs-nav-scroll-content`,`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),b(`tabs-wrapper`,`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),b(`tabs-tab-wrapper`,`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),b(`tabs-tab`,`
 cursor: pointer;
 white-space: nowrap;
 flex-wrap: nowrap;
 display: inline-flex;
 align-items: center;
 color: var(--n-tab-text-color);
 font-size: var(--n-tab-font-size);
 background-clip: padding-box;
 padding: var(--n-tab-padding);
 transition:
 box-shadow .3s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[g(`disabled`,{cursor:`not-allowed`}),l(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),l(`label`,`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),b(`tabs-bar`,`
 position: absolute;
 bottom: 0;
 height: 2px;
 border-radius: 1px;
 background-color: var(--n-bar-color);
 transition:
 left .2s var(--n-bezier),
 max-width .2s var(--n-bezier),
 opacity .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `,[R(`&.transition-disabled`,`
 transition: none;
 `),g(`disabled`,`
 background-color: var(--n-tab-text-color-disabled)
 `)]),b(`tabs-pane-wrapper`,`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),b(`tab-pane`,`
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[R(`&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),R(`&.next-transition-leave-active, &.prev-transition-leave-active`,`
 position: absolute;
 `),R(`&.next-transition-enter-from, &.prev-transition-leave-to`,`
 transform: translateX(32px);
 opacity: 0;
 `),R(`&.next-transition-leave-to, &.prev-transition-enter-from`,`
 transform: translateX(-32px);
 opacity: 0;
 `),R(`&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to`,`
 transform: translateX(0);
 opacity: 1;
 `)]),b(`tabs-tab-pad`,`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),g(`line-type, bar-type`,[b(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[R(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),g(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),g(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),b(`tabs-nav`,[g(`line-type`,[g(`top`,[l(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),b(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),b(`tabs-bar`,`
 bottom: -1px;
 `)]),g(`left`,[l(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),b(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),b(`tabs-bar`,`
 right: -1px;
 `)]),g(`right`,[l(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),b(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),b(`tabs-bar`,`
 left: -1px;
 `)]),g(`bottom`,[l(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),b(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),b(`tabs-bar`,`
 top: -1px;
 `)]),l(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),b(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),b(`tabs-bar`,`
 border-radius: 0;
 `)]),g(`card-type`,[l(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),b(`tabs-pad`,`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),b(`tabs-tab-pad`,`
 transition: border-color .3s var(--n-bezier);
 `),b(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 border: 1px solid var(--n-tab-border-color);
 background-color: var(--n-tab-color);
 box-sizing: border-box;
 position: relative;
 vertical-align: bottom;
 display: flex;
 justify-content: space-between;
 font-size: var(--n-tab-font-size);
 color: var(--n-tab-text-color);
 `,[g(`addable`,`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[l(`height-placeholder`,`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),re(`disabled`,[R(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),g(`closable`,`padding-right: 8px;`),g(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),g(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),g(`left, right`,`
 flex-direction: column; 
 `,[l(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),b(`tabs-wrapper`,`
 flex-direction: column;
 `),b(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[b(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),g(`top`,[g(`card-type`,[b(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),l(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),b(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[g(`active`,`
 border-bottom: 1px solid #0000;
 `)]),b(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),b(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),g(`left`,[g(`card-type`,[b(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),l(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),b(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[g(`active`,`
 border-right: 1px solid #0000;
 `)]),b(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),b(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),g(`right`,[g(`card-type`,[b(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),l(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),b(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[g(`active`,`
 border-left: 1px solid #0000;
 `)]),b(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),b(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),g(`bottom`,[g(`card-type`,[b(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),l(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),b(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[g(`active`,`
 border-top: 1px solid #0000;
 `)]),b(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),b(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),xe=ve,Se=T({name:`Tabs`,props:Object.assign(Object.assign({},v.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),slots:Object,setup(n,{slots:r}){let{mergedClsPrefixRef:a,inlineThemeDisabled:o,mergedComponentPropsRef:c}=oe(n),l=v(`Tabs`,`-tabs`,be,ee,n,a),u=h(null),d=h(null),f=h(null),p=h(null),m=h(null),g=h(null),b=h(!0),S=h(!0),C=e(n,[`labelSize`,`size`]),T=x(()=>C.value?C.value:c?.value?.Tabs?.size||`medium`),E=e(n,[`activeName`,`value`]),O=h(E.value??n.defaultValue??(r.default?w(r.default())[0]?.props?.name:null)),k=i(E,O),A={id:0},te=x(()=>{if(!(!n.justifyContent||n.type===`card`))return{display:`flex`,justifyContent:n.justifyContent}});L(k,()=>{A.id=0,N(),F()});function j(){let{value:e}=k;return e===null?null:u.value?.querySelector(`[data-name="${e}"]`)}function re(e){if(n.type===`card`)return;let{value:t}=d;if(!t)return;let r=t.style.opacity===`0`;if(e){let i=`${a.value}-tabs-bar--disabled`,{barWidth:o,placement:s}=n;if(e.dataset.disabled===`true`?t.classList.add(i):t.classList.remove(i),[`top`,`bottom`].includes(s)){if(ae([`top`,`maxHeight`,`height`]),typeof o==`number`&&e.offsetWidth>=o){let n=Math.floor((e.offsetWidth-o)/2)+e.offsetLeft;t.style.left=`${n}px`,t.style.maxWidth=`${o}px`}else t.style.left=`${e.offsetLeft}px`,t.style.maxWidth=`${e.offsetWidth}px`;t.style.width=`8192px`,r&&(t.style.transition=`none`),t.offsetWidth,r&&(t.style.transition=``,t.style.opacity=`1`)}else{if(ae([`left`,`maxWidth`,`width`]),typeof o==`number`&&e.offsetHeight>=o){let n=Math.floor((e.offsetHeight-o)/2)+e.offsetTop;t.style.top=`${n}px`,t.style.maxHeight=`${o}px`}else t.style.top=`${e.offsetTop}px`,t.style.maxHeight=`${e.offsetHeight}px`;t.style.height=`8192px`,r&&(t.style.transition=`none`),t.offsetHeight,r&&(t.style.transition=``,t.style.opacity=`1`)}}}function M(){if(n.type===`card`)return;let{value:e}=d;e&&(e.style.opacity=`0`)}function ae(e){let{value:t}=d;if(t)for(let n of e)t.style[n]=``}function N(){if(n.type===`card`)return;let e=j();e?re(e):M()}function F(){let e=m.value?.$el;if(!e)return;let t=j();if(!t)return;let{scrollLeft:n,offsetWidth:r}=e,{offsetLeft:i,offsetWidth:a}=t;n>i?e.scrollTo({top:0,left:i,behavior:`smooth`}):i+a>n+r&&e.scrollTo({top:0,left:i+a-r,behavior:`smooth`})}let R=h(null),z=0,B=null;function le(e){let t=R.value;if(t){z=e.getBoundingClientRect().height;let n=`${z}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};B?(r(),B(),B=null):B=r}}function ue(e){let t=R.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(z,n)}px`};B?(B(),B=null,r()):B=r}}function de(){let e=R.value;if(e){e.style.maxHeight=``,e.style.height=``;let{paneWrapperStyle:t}=n;if(typeof t==`string`)e.style.cssText=t;else if(t){let{maxHeight:n,height:r}=t;n!==void 0&&(e.style.maxHeight=n),r!==void 0&&(e.style.height=r)}}}let V={value:[]},H=h(`next`);function U(e){let t=k.value,n=`next`;for(let r of V.value){if(r===t)break;if(r===e){n=`prev`;break}}H.value=n,fe(e)}function fe(e){let{onActiveNameChange:t,onUpdateValue:r,"onUpdate:value":i}=n;t&&I(t,e),r&&I(r,e),i&&I(i,e),O.value=e}function pe(e){let{onClose:t}=n;t&&I(t,e)}let W=!0;function G(){let{value:e}=d;if(!e)return;W||=!1;let t=`transition-disabled`;e.classList.add(t),N(),e.classList.remove(t)}let K=h(null);function q({transitionDisabled:e}){let t=u.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=j();n&&K.value&&(K.value.style.width=`${n.offsetWidth}px`,K.value.style.height=`${n.offsetHeight}px`,K.value.style.transform=`translateX(${n.offsetLeft-se(getComputedStyle(t).paddingLeft)}px)`,e&&K.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}L([k],()=>{n.type===`segment`&&P(()=>{q({transitionDisabled:!1})})}),ne(()=>{n.type===`segment`&&q({transitionDisabled:!0})});let me=0;function he(e){if(e.contentRect.width===0&&e.contentRect.height===0||me===e.contentRect.width)return;me=e.contentRect.width;let{type:t}=n;if((t===`line`||t===`bar`)&&(W||n.justifyContent?.startsWith(`space`))&&G(),t!==`segment`){let{placement:e}=n;X((e===`top`||e===`bottom`?m.value?.$el:g.value)||null)}}let ge=xe(he,64);L([()=>n.justifyContent,()=>n.size],()=>{P(()=>{let{type:e}=n;(e===`line`||e===`bar`)&&G()})});let J=h(!1);function _e(e){let{target:t,contentRect:{width:r,height:i}}=e,a=t.parentElement.parentElement.offsetWidth,o=t.parentElement.parentElement.offsetHeight,{placement:s}=n;if(!J.value)s===`top`||s===`bottom`?a<r&&(J.value=!0):o<i&&(J.value=!0);else{let{value:e}=p;if(!e)return;s===`top`||s===`bottom`?a-r>e.$el.offsetWidth&&(J.value=!1):o-i>e.$el.offsetHeight&&(J.value=!1)}X(m.value?.$el||null)}let ve=xe(_e,64);function Y(){let{onAdd:e}=n;e&&e(),P(()=>{let e=j(),{value:t}=m;!e||!t||t.scrollTo({left:e.offsetLeft,top:0,behavior:`smooth`})})}function X(e){if(!e)return;let{placement:t}=n;if(t===`top`||t===`bottom`){let{scrollLeft:t,scrollWidth:n,offsetWidth:r}=e;b.value=t<=0,S.value=t+r>=n}else{let{scrollTop:t,scrollHeight:n,offsetHeight:r}=e;b.value=t<=0,S.value=t+r>=n}}let Z=xe(e=>{X(e.target)},64);ce(ye,{triggerRef:_(n,`trigger`),tabStyleRef:_(n,`tabStyle`),tabClassRef:_(n,`tabClass`),addTabStyleRef:_(n,`addTabStyle`),addTabClassRef:_(n,`addTabClass`),paneClassRef:_(n,`paneClass`),paneStyleRef:_(n,`paneStyle`),mergedClsPrefixRef:a,typeRef:_(n,`type`),closableRef:_(n,`closable`),valueRef:k,tabChangeIdRef:A,onBeforeLeaveRef:_(n,`onBeforeLeave`),activateTab:U,handleClose:pe,handleAdd:Y}),t(()=>{N(),F()}),y(()=>{let{value:e}=f;if(!e)return;let{value:t}=a,n=`${t}-tabs-nav-scroll-wrapper--shadow-start`,r=`${t}-tabs-nav-scroll-wrapper--shadow-end`;b.value?e.classList.remove(n):e.classList.add(n),S.value?e.classList.remove(r):e.classList.add(r)});let Se={syncBarPosition:()=>{N()}},Ce=()=>{q({transitionDisabled:!0})},Q=x(()=>{let{value:e}=T,{type:t}=n,r=`${e}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[t]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:o,closeIconColorPressed:c,tabColor:u,tabBorderColor:d,paneTextColor:f,tabFontWeight:p,tabBorderRadius:m,tabFontWeightActive:h,colorSegment:g,fontWeightStrong:_,tabColorSegment:v,closeSize:y,closeIconSize:b,closeColorHover:x,closeColorPressed:S,closeBorderRadius:C,[s(`panePadding`,e)]:w,[s(`tabPadding`,r)]:ee,[s(`tabPaddingVertical`,r)]:E,[s(`tabGap`,r)]:O,[s(`tabGap`,`${r}Vertical`)]:k,[s(`tabTextColor`,t)]:A,[s(`tabTextColorActive`,t)]:te,[s(`tabTextColorHover`,t)]:ne,[s(`tabTextColorDisabled`,t)]:j,[s(`tabFontSize`,e)]:re},common:{cubicBezierEaseInOut:M}}=l.value;return{"--n-bezier":M,"--n-color-segment":g,"--n-bar-color":i,"--n-tab-font-size":re,"--n-tab-text-color":A,"--n-tab-text-color-active":te,"--n-tab-text-color-disabled":j,"--n-tab-text-color-hover":ne,"--n-pane-text-color":f,"--n-tab-border-color":d,"--n-tab-border-radius":m,"--n-close-size":y,"--n-close-icon-size":b,"--n-close-color-hover":x,"--n-close-color-pressed":S,"--n-close-border-radius":C,"--n-close-icon-color":a,"--n-close-icon-color-hover":o,"--n-close-icon-color-pressed":c,"--n-tab-color":u,"--n-tab-font-weight":p,"--n-tab-font-weight-active":h,"--n-tab-padding":ee,"--n-tab-padding-vertical":E,"--n-tab-gap":O,"--n-tab-gap-vertical":k,"--n-pane-padding-left":D(w,`left`),"--n-pane-padding-right":D(w,`right`),"--n-pane-padding-top":D(w,`top`),"--n-pane-padding-bottom":D(w,`bottom`),"--n-font-weight-strong":_,"--n-tab-color-segment":v}}),$=o?ie(`tabs`,x(()=>`${T.value[0]}${n.type[0]}`),Q,n):void 0;return Object.assign({mergedClsPrefix:a,mergedValue:k,renderedNames:new Set,segmentCapsuleElRef:K,tabsPaneWrapperRef:R,tabsElRef:u,barElRef:d,addTabInstRef:p,xScrollInstRef:m,scrollWrapperElRef:f,addTabFixed:J,tabWrapperStyle:te,handleNavResize:ge,mergedSize:T,handleScroll:Z,handleTabsResize:ve,cssVars:o?void 0:Q,themeClass:$?.themeClass,animationDirection:H,renderNameListRef:V,yScrollElRef:g,handleSegmentResize:Ce,onAnimationBeforeLeave:le,onAnimationEnter:ue,onAnimationAfterEnter:de,onRender:$?.onRender},Se)},render(){let{mergedClsPrefix:e,type:t,placement:n,addTabFixed:r,addable:i,mergedSize:a,renderNameListRef:o,onRender:s,paneWrapperClass:c,paneWrapperStyle:l,$slots:{default:d,prefix:f,suffix:p}}=this;s?.();let m=d?w(d()).filter(e=>e.type.__TAB_PANE__===!0):[],h=d?w(d()).filter(e=>e.type.__TAB__===!0):[],g=!h.length,_=t===`card`,v=t===`segment`,y=!_&&!v&&this.justifyContent;o.value=[];let b=()=>{let t=N(`div`,{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},y?null:N(`div`,{class:`${e}-tabs-scroll-padding`,style:n===`top`||n===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),g?m.map((e,t)=>(o.value.push(e.props.name),we(N(Z,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!y||y===`center`||y===`start`||y===`end`)}),e.children?{default:e.children.tab}:void 0)))):h.map((e,t)=>(o.value.push(e.props.name),we(t!==0&&!y?$(e):e))),!r&&i&&_?Q(i,(g?m.length:h.length)!==0):null,y?null:N(`div`,{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return N(`div`,{ref:`tabsElRef`,class:`${e}-tabs-nav-scroll-content`},_&&i?N(u,{onResize:this.handleTabsResize},{default:()=>t}):t,_?N(`div`,{class:`${e}-tabs-pad`}):null,_?null:N(`div`,{ref:`barElRef`,class:`${e}-tabs-bar`}))},x=v?`top`:n;return N(`div`,{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${a}-size`,y&&`${e}-tabs--flex`,`${e}-tabs--${x}`],style:this.cssVars},N(`div`,{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${x}`,`${e}-tabs-nav`]},F(f,t=>t&&N(`div`,{class:`${e}-tabs-nav__prefix`},t)),v?N(u,{onResize:this.handleSegmentResize},{default:()=>N(`div`,{class:`${e}-tabs-rail`,ref:`tabsElRef`},N(`div`,{class:`${e}-tabs-capsule`,ref:`segmentCapsuleElRef`},N(`div`,{class:`${e}-tabs-wrapper`},N(`div`,{class:`${e}-tabs-tab`}))),g?m.map((e,t)=>(o.value.push(e.props.name),N(Z,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),e.children?{default:e.children.tab}:void 0))):h.map((e,t)=>(o.value.push(e.props.name),t===0?e:$(e))))}):N(u,{onResize:this.handleNavResize},{default:()=>N(`div`,{class:`${e}-tabs-nav-scroll-wrapper`,ref:`scrollWrapperElRef`},[`top`,`bottom`].includes(x)?N(le,{ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:b}):N(`div`,{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:`yScrollElRef`},b()))}),r&&i&&_?Q(i,!0):null,F(p,t=>t&&N(`div`,{class:`${e}-tabs-nav__suffix`},t))),g&&(this.animated&&(x===`top`||x===`bottom`)?N(`div`,{ref:`tabsPaneWrapperRef`,style:l,class:[`${e}-tabs-pane-wrapper`,c]},Ce(m,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):Ce(m,this.mergedValue,this.renderedNames)))}});function Ce(e,t,n,r,i,a,o){let s=[];return e.forEach(e=>{let{name:r,displayDirective:i,"display-directive":a}=e.props,o=e=>i===e||a===e,l=t===r;if(e.key!==void 0&&(e.key=r),l||o(`show`)||o(`show:lazy`)&&n.has(r)){n.has(r)||n.add(r);let t=!o(`if`);s.push(t?c(e,[[f,l]]):e)}}),o?N(z,{name:`${o}-transition`,onBeforeLeave:r,onEnter:i,onAfterEnter:a},{default:()=>s}):s}function Q(e,t){return N(Z,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled})}function $(e){let t=S(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function we(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}export{X as n,Se as t};