import{C as e,E as t,S as n,c as r,o as i,s as a,t as o,u as s,y as c}from"./Icon-CWBooZtB.js";import{d as l}from"./Input-Dvq5rpDK.js";import{t as u}from"./create-ref-setter-D2xoeg9y.js";import{Ai as d,Ar as f,Bn as p,Dr as m,Hn as h,Jn as g,Kn as _,Kr as v,Mi as y,N as b,Or as x,Pi as S,Rn as C,Rr as w,St as T,Tr as E,Xn as D,Xr as O,Yn as k,ai as A,at as j,ci as M,fi as N,fn as P,hn as F,ji as I,kr as L,li as R,nn as ee,pi as te,rn as ne,si as z,tt as B,vn as V,wi as H,wr as U,xn as re,yi as W,zn as ie}from"./index-CstmdvSQ.js";function ae(e={},t){let n=d({ctrl:!1,command:!1,win:!1,shift:!1,tab:!1}),{keydown:r,keyup:i}=e,a=e=>{switch(e.key){case`Control`:n.ctrl=!0;break;case`Meta`:n.command=!0,n.win=!0;break;case`Shift`:n.shift=!0;break;case`Tab`:n.tab=!0;break}r!==void 0&&Object.keys(r).forEach(t=>{if(t!==e.key)return;let n=r[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},o=e=>{switch(e.key){case`Control`:n.ctrl=!1;break;case`Meta`:n.command=!1,n.win=!1;break;case`Shift`:n.shift=!1;break;case`Tab`:n.tab=!1;break}i!==void 0&&Object.keys(i).forEach(t=>{if(t!==e.key)return;let n=i[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},s=()=>{(t===void 0||t.value)&&(D(`keydown`,document,a),D(`keyup`,document,o)),t!==void 0&&H(t,e=>{e?(D(`keydown`,document,a),D(`keyup`,document,o)):(k(`keydown`,document,a),k(`keyup`,document,o))})};return _()?(N(s),te(()=>{(t===void 0||t.value)&&(k(`keydown`,document,a),k(`keyup`,document,o))})):s(),I(n)}function oe(e,t,n){if(!t)return e;let r=y(e.value),i=null;return H(e,e=>{i!==null&&window.clearTimeout(i),e===!0?n&&!n.value?r.value=!0:i=window.setTimeout(()=>{r.value=!0},t):r.value=!1}),r}var G=A({name:`ChevronRight`,render(){return z(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},z(`path`,{d:`M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z`,fill:`currentColor`}))}}),K=h(`n-dropdown-menu`),q=h(`n-dropdown`),J=h(`n-dropdown-option`),Y=A({name:`DropdownDivider`,props:{clsPrefix:{type:String,required:!0}},render(){return z(`div`,{class:`${this.clsPrefix}-dropdown-divider`})}}),se=A({name:`DropdownGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{showIconRef:e,hasSubmenuRef:t}=M(K),{renderLabelRef:n,labelFieldRef:r,nodePropsRef:i,renderOptionRef:a}=M(q);return{labelField:r,showIcon:e,hasSubmenu:t,renderLabel:n,nodeProps:i,renderOption:a}},render(){let{clsPrefix:e,hasSubmenu:t,showIcon:n,nodeProps:r,renderLabel:i,renderOption:a}=this,{rawNode:o}=this.tmNode,s=z(`div`,Object.assign({class:`${e}-dropdown-option`},r?.(o)),z(`div`,{class:`${e}-dropdown-option-body ${e}-dropdown-option-body--group`},z(`div`,{"data-dropdown-option":!0,class:[`${e}-dropdown-option-body__prefix`,n&&`${e}-dropdown-option-body__prefix--show-icon`]},P(o.icon)),z(`div`,{class:`${e}-dropdown-option-body__label`,"data-dropdown-option":!0},i?i(o):P(o.title??o[this.labelField])),z(`div`,{class:[`${e}-dropdown-option-body__suffix`,t&&`${e}-dropdown-option-body__suffix--has-submenu`],"data-dropdown-option":!0})));return a?a({node:s,option:o}):s}});function X(e,t){return e.type===`submenu`||e.type===void 0&&e[t]!==void 0}function ce(e){return e.type===`group`}function Z(e){return e.type===`divider`}function le(e){return e.type===`render`}var Q=A({name:`DropdownOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:`right-start`},props:Object,scrollable:Boolean},setup(e){let n=M(q),{hoverKeyRef:r,keyboardKeyRef:i,lastToggledSubmenuKeyRef:a,pendingKeyPathRef:o,activeKeyPathRef:s,animatedRef:c,mergedShowRef:l,renderLabelRef:u,renderIconRef:d,labelFieldRef:f,childrenFieldRef:p,renderOptionRef:m,nodePropsRef:h,menuPropsRef:_}=n,v=M(J,null),b=M(K),x=M(C),S=O(()=>e.tmNode.rawNode),w=O(()=>{let{value:t}=p;return X(e.tmNode.rawNode,t)}),T=O(()=>{let{disabled:t}=e.tmNode;return t}),E=oe(O(()=>{if(!w.value)return!1;let{key:t,disabled:n}=e.tmNode;if(n)return!1;let{value:s}=r,{value:c}=i,{value:l}=a,{value:u}=o;return s===null?c===null?l===null?!1:u.includes(t):u.includes(t)&&u[u.length-1]!==t:u.includes(t)}),300,O(()=>i.value===null&&!c.value)),D=O(()=>!!v?.enteringSubmenuRef.value),k=y(!1);W(J,{enteringSubmenuRef:k});function A(){k.value=!0}function j(){k.value=!1}function N(){let{parentKey:t,tmNode:n}=e;n.disabled||l.value&&(a.value=t,i.value=null,r.value=n.key)}function P(){let{tmNode:t}=e;t.disabled||l.value&&r.value!==t.key&&N()}function F(n){if(e.tmNode.disabled||!l.value)return;let{relatedTarget:i}=n;i&&!t({target:i},`dropdownOption`)&&!t({target:i},`scrollbarRail`)&&(r.value=null)}function I(){let{value:t}=w,{tmNode:r}=e;l.value&&!t&&!r.disabled&&(n.doSelect(r.key,r.rawNode),n.doUpdateShow(!1))}return{labelField:f,renderLabel:u,renderIcon:d,siblingHasIcon:b.showIconRef,siblingHasSubmenu:b.hasSubmenuRef,menuProps:_,popoverBody:x,animated:c,mergedShowSubmenu:O(()=>E.value&&!D.value),rawNode:S,hasSubmenu:w,pending:g(()=>{let{value:t}=o,{key:n}=e.tmNode;return t.includes(n)}),childActive:g(()=>{let{value:t}=s,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r===-1?!1:r<t.length-1}),active:g(()=>{let{value:t}=s,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r===-1?!1:r===t.length-1}),mergedDisabled:T,renderOption:m,nodeProps:h,handleClick:I,handleMouseMove:P,handleMouseEnter:N,handleMouseLeave:F,handleSubmenuBeforeEnter:A,handleSubmenuAfterEnter:j}},render(){let{animated:t,rawNode:r,mergedShowSubmenu:i,clsPrefix:a,siblingHasIcon:s,siblingHasSubmenu:l,renderLabel:u,renderIcon:d,renderOption:f,nodeProps:p,props:m,scrollable:h}=this,g=null;if(i){let e=this.menuProps?.call(this,r,r.children);g=z($,Object.assign({},e,{clsPrefix:a,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}))}let _={class:[`${a}-dropdown-option-body`,this.pending&&`${a}-dropdown-option-body--pending`,this.active&&`${a}-dropdown-option-body--active`,this.childActive&&`${a}-dropdown-option-body--child-active`,this.mergedDisabled&&`${a}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},v=p?.(r),y=z(`div`,Object.assign({class:[`${a}-dropdown-option`,v?.class],"data-dropdown-option":!0},v),z(`div`,R(_,m),[z(`div`,{class:[`${a}-dropdown-option-body__prefix`,s&&`${a}-dropdown-option-body__prefix--show-icon`]},[d?d(r):P(r.icon)]),z(`div`,{"data-dropdown-option":!0,class:`${a}-dropdown-option-body__label`},u?u(r):P(r[this.labelField]??r.title)),z(`div`,{"data-dropdown-option":!0,class:[`${a}-dropdown-option-body__suffix`,l&&`${a}-dropdown-option-body__suffix--has-submenu`]},this.hasSubmenu?z(o,null,{default:()=>z(G,null)}):null)]),this.hasSubmenu?z(e,null,{default:()=>[z(n,null,{default:()=>z(`div`,{class:`${a}-dropdown-offset-container`},z(c,{show:this.mergedShowSubmenu,placement:this.placement,to:h&&this.popoverBody||void 0,teleportDisabled:!h},{default:()=>z(`div`,{class:`${a}-dropdown-menu-wrapper`},t?z(w,{onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:`fade-in-scale-up-transition`,appear:!0},{default:()=>g}):g)}))})]}):null);return f?f({node:y,option:r}):y}}),ue=A({name:`NDropdownGroup`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){let{tmNode:e,parentKey:t,clsPrefix:n}=this,{children:r}=e;return z(v,null,z(se,{clsPrefix:n,tmNode:e,key:e.key}),r?.map(e=>{let{rawNode:r}=e;return r.show===!1?null:Z(r)?z(Y,{clsPrefix:n,key:e.key}):e.isGroup?(re(`dropdown`,"`group` node is not allowed to be put in `group` node."),null):z(Q,{clsPrefix:n,tmNode:e,parentKey:t,key:e.key})}))}}),de=A({name:`DropdownRenderOption`,props:{tmNode:{type:Object,required:!0}},render(){let{rawNode:{render:e,props:t}}=this.tmNode;return z(`div`,t,[e?.()])}}),$=A({name:`DropdownMenu`,props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){let{renderIconRef:t,childrenFieldRef:n}=M(q);W(K,{showIconRef:O(()=>{let n=t.value;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>n?n(e):e.icon);let{rawNode:t}=e;return n?n(t):t.icon})}),hasSubmenuRef:O(()=>{let{value:t}=n;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>X(e,t));let{rawNode:n}=e;return X(n,t)})})});let r=y(null);return W(ie,null),W(p,null),W(C,r),{bodyRef:r}},render(){let{parentKey:e,clsPrefix:t,scrollable:n}=this,i=this.tmNodes.map(r=>{let{rawNode:i}=r;return i.show===!1?null:le(i)?z(de,{tmNode:r,key:r.key}):Z(i)?z(Y,{clsPrefix:t,key:r.key}):ce(i)?z(ue,{clsPrefix:t,tmNode:r,parentKey:e,key:r.key}):z(Q,{clsPrefix:t,tmNode:r,parentKey:e,key:r.key,props:i.props,scrollable:n})});return z(`div`,{class:[`${t}-dropdown-menu`,n&&`${t}-dropdown-menu--scrollable`],ref:`bodyRef`},n?z(j,{contentClass:`${t}-dropdown-menu__content`},{default:()=>i}):i,this.showArrow?r({clsPrefix:t,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}):null)}}),fe=E(`dropdown-menu`,`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[B(),E(`dropdown-option`,`
 position: relative;
 `,[U(`a`,`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[U(`&::before`,`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),E(`dropdown-option-body`,`
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `,[U(`&::before`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `),L(`disabled`,[x(`pending`,`
 color: var(--n-option-text-color-hover);
 `,[m(`prefix, suffix`,`
 color: var(--n-option-text-color-hover);
 `),U(`&::before`,`background-color: var(--n-option-color-hover);`)]),x(`active`,`
 color: var(--n-option-text-color-active);
 `,[m(`prefix, suffix`,`
 color: var(--n-option-text-color-active);
 `),U(`&::before`,`background-color: var(--n-option-color-active);`)]),x(`child-active`,`
 color: var(--n-option-text-color-child-active);
 `,[m(`prefix, suffix`,`
 color: var(--n-option-text-color-child-active);
 `)])]),x(`disabled`,`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),x(`group`,`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[m(`prefix`,`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[x(`show-icon`,`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),m(`prefix`,`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[x(`show-icon`,`
 width: var(--n-option-icon-prefix-width);
 `),E(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),m(`label`,`
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `),m(`suffix`,`
 box-sizing: border-box;
 flex-grow: 0;
 flex-shrink: 0;
 display: flex;
 justify-content: flex-end;
 align-items: center;
 min-width: var(--n-option-suffix-width);
 padding: 0 8px;
 transition: color .3s var(--n-bezier);
 color: var(--n-suffix-color);
 z-index: 1;
 `,[x(`has-submenu`,`
 width: var(--n-option-icon-suffix-width);
 `),E(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),E(`dropdown-menu`,`pointer-events: all;`)]),E(`dropdown-offset-container`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]),E(`dropdown-divider`,`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `),E(`dropdown-menu-wrapper`,`
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `),U(`>`,[E(`scrollbar`,`
 height: inherit;
 max-height: inherit;
 `)]),L(`scrollable`,`
 padding: var(--n-padding);
 `),x(`scrollable`,[m(`content`,`
 padding: var(--n-padding);
 `)])]),pe={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:`bottom`},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},value:[String,Number]},me=Object.keys(a),he=A({name:`Dropdown`,inheritAttrs:!1,props:Object.assign(Object.assign(Object.assign({},a),pe),T.props),setup(e){let t=y(!1),n=l(S(e,`show`),t),r=O(()=>{let{keyField:t,childrenField:n}=e;return s(e.options,{getKey(e){return e[t]},getDisabled(e){return e.disabled===!0},getIgnored(e){return e.type===`divider`||e.type===`render`},getChildren(e){return e[n]}})}),i=O(()=>r.value.treeNodes),a=y(null),o=y(null),c=y(null),u=O(()=>a.value??o.value??c.value??null),d=O(()=>r.value.getPath(u.value).keyPath),p=O(()=>r.value.getPath(e.value).keyPath),m=g(()=>e.keyboard&&n.value);ae({keydown:{ArrowUp:{prevent:!0,handler:M},ArrowRight:{prevent:!0,handler:j},ArrowDown:{prevent:!0,handler:N},ArrowLeft:{prevent:!0,handler:A},Enter:{prevent:!0,handler:P},Escape:k}},m);let{mergedClsPrefixRef:h,inlineThemeDisabled:_,mergedComponentPropsRef:v}=ne(e),x=O(()=>e.size||v?.value?.Dropdown?.size||`medium`),C=T(`Dropdown`,`-dropdown`,fe,b,e,h);W(q,{labelFieldRef:S(e,`labelField`),childrenFieldRef:S(e,`childrenField`),renderLabelRef:S(e,`renderLabel`),renderIconRef:S(e,`renderIcon`),hoverKeyRef:a,keyboardKeyRef:o,lastToggledSubmenuKeyRef:c,pendingKeyPathRef:d,activeKeyPathRef:p,animatedRef:S(e,`animated`),mergedShowRef:n,nodePropsRef:S(e,`nodeProps`),renderOptionRef:S(e,`renderOption`),menuPropsRef:S(e,`menuProps`),doSelect:w,doUpdateShow:E}),H(n,t=>{!e.animated&&!t&&D()});function w(t,n){let{onSelect:r}=e;r&&V(r,t,n)}function E(n){let{"onUpdate:show":r,onUpdateShow:i}=e;r&&V(r,n),i&&V(i,n),t.value=n}function D(){a.value=null,o.value=null,c.value=null}function k(){E(!1)}function A(){I(`left`)}function j(){I(`right`)}function M(){I(`up`)}function N(){I(`down`)}function P(){let e=F();e?.isLeaf&&n.value&&(w(e.key,e.rawNode),E(!1))}function F(){let{value:e}=r,{value:t}=u;return!e||t===null?null:e.getNode(t)??null}function I(e){let{value:t}=u,{value:{getFirstAvailableNode:n}}=r,i=null;if(t===null){let e=n();e!==null&&(i=e.key)}else{let t=F();if(t){let n;switch(e){case`down`:n=t.getNext();break;case`up`:n=t.getPrev();break;case`right`:n=t.getChild();break;case`left`:n=t.getParent();break}n&&(i=n.key)}}i!==null&&(a.value=null,o.value=i)}let L=O(()=>{let{inverted:t}=e,n=x.value,{common:{cubicBezierEaseInOut:r},self:i}=C.value,{padding:a,dividerColor:o,borderRadius:s,optionOpacityDisabled:c,[f(`optionIconSuffixWidth`,n)]:l,[f(`optionSuffixWidth`,n)]:u,[f(`optionIconPrefixWidth`,n)]:d,[f(`optionPrefixWidth`,n)]:p,[f(`fontSize`,n)]:m,[f(`optionHeight`,n)]:h,[f(`optionIconSize`,n)]:g}=i,_={"--n-bezier":r,"--n-font-size":m,"--n-padding":a,"--n-border-radius":s,"--n-option-height":h,"--n-option-prefix-width":p,"--n-option-icon-prefix-width":d,"--n-option-suffix-width":u,"--n-option-icon-suffix-width":l,"--n-option-icon-size":g,"--n-divider-color":o,"--n-option-opacity-disabled":c};return t?(_[`--n-color`]=i.colorInverted,_[`--n-option-color-hover`]=i.optionColorHoverInverted,_[`--n-option-color-active`]=i.optionColorActiveInverted,_[`--n-option-text-color`]=i.optionTextColorInverted,_[`--n-option-text-color-hover`]=i.optionTextColorHoverInverted,_[`--n-option-text-color-active`]=i.optionTextColorActiveInverted,_[`--n-option-text-color-child-active`]=i.optionTextColorChildActiveInverted,_[`--n-prefix-color`]=i.prefixColorInverted,_[`--n-suffix-color`]=i.suffixColorInverted,_[`--n-group-header-text-color`]=i.groupHeaderTextColorInverted):(_[`--n-color`]=i.color,_[`--n-option-color-hover`]=i.optionColorHover,_[`--n-option-color-active`]=i.optionColorActive,_[`--n-option-text-color`]=i.optionTextColor,_[`--n-option-text-color-hover`]=i.optionTextColorHover,_[`--n-option-text-color-active`]=i.optionTextColorActive,_[`--n-option-text-color-child-active`]=i.optionTextColorChildActive,_[`--n-prefix-color`]=i.prefixColor,_[`--n-suffix-color`]=i.suffixColor,_[`--n-group-header-text-color`]=i.groupHeaderTextColor),_}),R=_?ee(`dropdown`,O(()=>`${x.value[0]}${e.inverted?`i`:``}`),L,e):void 0;return{mergedClsPrefix:h,mergedTheme:C,mergedSize:x,tmNodes:i,mergedShow:n,handleAfterLeave:()=>{e.animated&&D()},doUpdateShow:E,cssVars:_?void 0:L,themeClass:R?.themeClass,onRender:R?.onRender}},render(){let e=(e,t,n,r,i)=>{var a;let{mergedClsPrefix:o,menuProps:s}=this;(a=this.onRender)==null||a.call(this);let c=s?.(void 0,this.tmNodes.map(e=>e.rawNode))||{},l={ref:u(t),class:[e,`${o}-dropdown`,`${o}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:o,tmNodes:this.tmNodes,style:[...n,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:r,onMouseleave:i};return z($,R(this.$attrs,l,c))},{mergedTheme:t}=this,n={show:this.mergedShow,theme:t.peers.Popover,themeOverrides:t.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return z(i,Object.assign({},F(this.$props,me),n),{trigger:()=>{var e;return(e=this.$slots).default?.call(e)}})}});export{G as n,he as t};