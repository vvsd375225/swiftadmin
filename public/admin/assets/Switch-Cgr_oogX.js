import{d as e}from"./Input-Dvq5rpDK.js";import{$n as t,Ar as n,Dr as r,Mi as i,Or as a,Pi as o,St as s,Tr as c,Xr as l,ai as u,kr as d,lt as f,nn as p,o as m,pt as h,rn as g,si as _,sn as v,st as y,tn as b,un as x,vn as S,vr as C,wr as w,xr as T,yt as E}from"./index-CstmdvSQ.js";function D(e){let{primaryColor:n,opacityDisabled:r,borderRadius:i,textColor3:a}=e;return Object.assign(Object.assign({},m),{iconColor:a,textColor:`white`,loadingColor:n,opacityDisabled:r,railColor:`rgba(0, 0, 0, .14)`,railColorActive:n,buttonBoxShadow:`0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)`,buttonColor:`#FFF`,railBorderRadiusSmall:i,railBorderRadiusMedium:i,railBorderRadiusLarge:i,buttonBorderRadiusSmall:i,buttonBorderRadiusMedium:i,buttonBorderRadiusLarge:i,boxShadowFocus:`0 0 0 2px ${t(n,{alpha:.2})}`})}var O={name:`Switch`,common:y,self:D},k=c(`switch`,`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[r(`children-placeholder`,`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),r(`rail-placeholder`,`
 display: flex;
 flex-wrap: none;
 `),r(`button-placeholder`,`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),c(`base-loading`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[h({left:`50%`,top:`50%`,originalTransform:`translateX(-50%) translateY(-50%)`})]),r(`checked, unchecked`,`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 box-sizing: border-box;
 position: absolute;
 white-space: nowrap;
 top: 0;
 bottom: 0;
 display: flex;
 align-items: center;
 line-height: 1;
 `),r(`checked`,`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),r(`unchecked`,`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),w(`&:focus`,[r(`rail`,`
 box-shadow: var(--n-box-shadow-focus);
 `)]),a(`round`,[r(`rail`,`border-radius: calc(var(--n-rail-height) / 2);`,[r(`button`,`border-radius: calc(var(--n-button-height) / 2);`)])]),d(`disabled`,[d(`icon`,[a(`rubber-band`,[a(`pressed`,[r(`rail`,[r(`button`,`max-width: var(--n-button-width-pressed);`)])]),r(`rail`,[w(`&:active`,[r(`button`,`max-width: var(--n-button-width-pressed);`)])]),a(`active`,[a(`pressed`,[r(`rail`,[r(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])]),r(`rail`,[w(`&:active`,[r(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])])])])])]),a(`active`,[r(`rail`,[r(`button`,`left: calc(100% - var(--n-button-width) - var(--n-offset))`)])]),r(`rail`,`
 overflow: hidden;
 height: var(--n-rail-height);
 min-width: var(--n-rail-width);
 border-radius: var(--n-rail-border-radius);
 cursor: pointer;
 position: relative;
 transition:
 opacity .3s var(--n-bezier),
 background .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-rail-color);
 `,[r(`button-icon`,`
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 font-size: calc(var(--n-button-height) - 4px);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 justify-content: center;
 align-items: center;
 line-height: 1;
 `,[h()]),r(`button`,`
 align-items: center; 
 top: var(--n-offset);
 left: var(--n-offset);
 height: var(--n-button-height);
 width: var(--n-button-width-pressed);
 max-width: var(--n-button-width);
 border-radius: var(--n-button-border-radius);
 background-color: var(--n-button-color);
 box-shadow: var(--n-button-box-shadow);
 box-sizing: border-box;
 cursor: inherit;
 content: "";
 position: absolute;
 transition:
 background-color .3s var(--n-bezier),
 left .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `)]),a(`active`,[r(`rail`,`background-color: var(--n-rail-color-active);`)]),a(`loading`,[r(`rail`,`
 cursor: wait;
 `)]),a(`disabled`,[r(`rail`,`
 cursor: not-allowed;
 opacity: .5;
 `)])]),A=Object.assign(Object.assign({},s.props),{size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]}),j,M=u({name:`Switch`,props:A,slots:Object,setup(t){j===void 0&&(j=typeof CSS<`u`?CSS.supports===void 0?!1:CSS.supports(`width`,`max(1px)`):!0);let{mergedClsPrefixRef:r,inlineThemeDisabled:a,mergedComponentPropsRef:c}=g(t),u=s(`Switch`,`-switch`,k,O,t,r),d=b(t,{mergedSize(e){return t.size===void 0?e?e.mergedSize.value:c?.value?.Switch?.size||`medium`:t.size}}),{mergedSizeRef:f,mergedDisabledRef:m}=d,h=i(t.defaultValue),_=e(o(t,`value`),h),v=l(()=>_.value===t.checkedValue),y=i(!1),x=i(!1),w=l(()=>{let{railStyle:e}=t;if(e)return e({focused:x.value,checked:v.value})});function E(e){let{"onUpdate:value":n,onChange:r,onUpdateValue:i}=t,{nTriggerFormInput:a,nTriggerFormChange:o}=d;n&&S(n,e),i&&S(i,e),r&&S(r,e),h.value=e,a(),o()}function D(){let{nTriggerFormFocus:e}=d;e()}function A(){let{nTriggerFormBlur:e}=d;e()}function M(){t.loading||m.value||(_.value===t.checkedValue?E(t.uncheckedValue):E(t.checkedValue))}function N(){x.value=!0,D()}function P(){x.value=!1,A(),y.value=!1}function F(e){t.loading||m.value||e.key===` `&&(_.value===t.checkedValue?E(t.uncheckedValue):E(t.checkedValue),y.value=!1)}function I(e){t.loading||m.value||e.key===` `&&(e.preventDefault(),y.value=!0)}let L=l(()=>{let{value:e}=f,{self:{opacityDisabled:t,railColor:r,railColorActive:i,buttonBoxShadow:a,buttonColor:o,boxShadowFocus:s,loadingColor:c,textColor:l,iconColor:d,[n(`buttonHeight`,e)]:p,[n(`buttonWidth`,e)]:m,[n(`buttonWidthPressed`,e)]:h,[n(`railHeight`,e)]:g,[n(`railWidth`,e)]:_,[n(`railBorderRadius`,e)]:v,[n(`buttonBorderRadius`,e)]:y},common:{cubicBezierEaseInOut:b}}=u.value,x,S,w;return j?(x=`calc((${g} - ${p}) / 2)`,S=`max(${g}, ${p})`,w=`max(${_}, calc(${_} + ${p} - ${g}))`):(x=T((C(g)-C(p))/2),S=T(Math.max(C(g),C(p))),w=C(g)>C(p)?_:T(C(_)+C(p)-C(g))),{"--n-bezier":b,"--n-button-border-radius":y,"--n-button-box-shadow":a,"--n-button-color":o,"--n-button-width":m,"--n-button-width-pressed":h,"--n-button-height":p,"--n-height":S,"--n-offset":x,"--n-opacity-disabled":t,"--n-rail-border-radius":v,"--n-rail-color":r,"--n-rail-color-active":i,"--n-rail-height":g,"--n-rail-width":_,"--n-width":w,"--n-box-shadow-focus":s,"--n-loading-color":c,"--n-text-color":l,"--n-icon-color":d}}),R=a?p(`switch`,l(()=>f.value[0]),L,t):void 0;return{handleClick:M,handleBlur:P,handleFocus:N,handleKeyup:F,handleKeydown:I,mergedRailStyle:w,pressed:y,mergedClsPrefix:r,mergedValue:_,checked:v,mergedDisabled:m,cssVars:a?void 0:L,themeClass:R?.themeClass,onRender:R?.onRender}},render(){let{mergedClsPrefix:e,mergedDisabled:t,checked:n,mergedRailStyle:r,onRender:i,$slots:a}=this;i?.();let{checked:o,unchecked:s,icon:c,"checked-icon":l,"unchecked-icon":u}=a,d=!(v(c)&&v(l)&&v(u));return _(`div`,{role:`switch`,"aria-checked":n,class:[`${e}-switch`,this.themeClass,d&&`${e}-switch--icon`,n&&`${e}-switch--active`,t&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`],tabindex:this.mergedDisabled?void 0:0,style:this.cssVars,onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},_(`div`,{class:`${e}-switch__rail`,"aria-hidden":`true`,style:r},x(o,t=>x(s,n=>t||n?_(`div`,{"aria-hidden":!0,class:`${e}-switch__children-placeholder`},_(`div`,{class:`${e}-switch__rail-placeholder`},_(`div`,{class:`${e}-switch__button-placeholder`}),t),_(`div`,{class:`${e}-switch__rail-placeholder`},_(`div`,{class:`${e}-switch__button-placeholder`}),n)):null)),_(`div`,{class:`${e}-switch__button`},x(c,t=>x(l,n=>x(u,r=>_(E,null,{default:()=>this.loading?_(f,Object.assign({key:`loading`,clsPrefix:e,strokeWidth:20},this.spinProps)):this.checked&&(n||t)?_(`div`,{class:`${e}-switch__button-icon`,key:n?`checked-icon`:`icon`},n||t):!this.checked&&(r||t)?_(`div`,{class:`${e}-switch__button-icon`,key:r?`unchecked-icon`:`icon`},r||t):null})))),x(o,t=>t&&_(`div`,{key:`checked`,class:`${e}-switch__checked`},t)),x(s,t=>t&&_(`div`,{key:`unchecked`,class:`${e}-switch__unchecked`},t)))))}});export{M as t};