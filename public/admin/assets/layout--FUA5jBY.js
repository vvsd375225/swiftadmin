import{n as e,o as t}from"./Tag-D4bZfoIR.js";import{C as n,S as r,_ as i,h as a,n as o,r as s,t as c,u as l,w as u,y as d}from"./Icon-CWBooZtB.js";import{d as f,t as p,u as m}from"./Input-Dvq5rpDK.js";import{n as h,t as g}from"./Dropdown-CgRxYSDs.js";import{n as _,t as v}from"./Tabs-jrsF2dli.js";import{t as y}from"./use-locale-BLIMGIAh.js";import{n as b,t as x}from"./utils-BBn8sU5-.js";import{t as S}from"./Divider-DQ-RLMJc.js";import{t as C}from"./Switch-Cgr_oogX.js";import{$r as w,An as T,Ar as E,Bn as ee,Ci as D,Cr as te,Ct as ne,Di as O,Dr as k,Ei as A,En as re,Fn as j,Fr as M,G as N,Hn as P,Hr as F,Ii as I,In as ie,Ir as ae,J as oe,Jn as se,Kr as ce,Li as le,Ln as ue,Mi as L,Mr as de,On as R,Or as z,Pi as B,Pn as fe,Qr as pe,R as me,Rn as he,Rr as ge,Si as _e,Sn as ve,St as V,Ti as ye,Tn as be,Tr as H,Tt as xe,Un as Se,V as Ce,Vn as we,W as Te,Wr as Ee,X as De,Xn as Oe,Xr as U,Yn as ke,Z as Ae,Zn as je,Zr as W,_i as Me,_r as Ne,ai as G,ar as Pe,bi as Fe,bn as Ie,bt as Le,c as Re,ci as K,cn as ze,cr as Be,ct as Ve,d as He,dn as Ue,dr as We,dt as Ge,ei as q,er as Ke,fn as qe,fr as Je,ft as Ye,gi as Xe,gr as Ze,hn as Qe,hr as $e,ii as J,ir as et,it as tt,jn as nt,jr as rt,kr as it,li as at,lr as ot,m as st,mi as ct,mn as lt,mr as ut,n as dt,ni as ft,nn as pt,nr as mt,or as ht,ot as gt,pi as _t,pr as vt,ri as yt,rn as bt,rr as xt,si as Y,sn as St,sr as Ct,st as wt,t as Tt,tn as Et,tr as Dt,tt as Ot,ui as kt,un as At,ur as jt,vi as X,vn as Z,wi as Mt,wn as Nt,wr as Q,wt as Pt,xn as Ft,xt as It,yi as Lt,zi as Rt,zn as zt,zr as Bt}from"./index-CstmdvSQ.js";import{t as Vt}from"./user-SZWTwfGC.js";import{n as Ht,t as Ut}from"./FlashOutline-BAxzsPHD.js";import{n as Wt}from"./notification-_KaD5iD9.js";import{t as Gt}from"./_plugin-vue_export-helper-BtlEGitU.js";var Kt=G({name:`ChevronDownFilled`,render(){return Y(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},Y(`path`,{d:`M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z`,fill:`currentColor`}))}}),qt=G({name:`SlotMachineNumber`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],required:!0},oldOriginalNumber:{type:Number,default:void 0},newOriginalNumber:{type:Number,default:void 0}},setup(e){let t=L(null),n=L(e.value),r=L(e.value),i=L(`up`),a=L(!1),o=U(()=>a.value?`${e.clsPrefix}-base-slot-machine-current-number--${i.value}-scroll`:null),s=U(()=>a.value?`${e.clsPrefix}-base-slot-machine-old-number--${i.value}-scroll`:null);Mt(B(e,`value`),(e,t)=>{n.value=t,r.value=e,kt(c)});function c(){let t=e.newOriginalNumber,n=e.oldOriginalNumber;n===void 0||t===void 0||(t>n?l(`up`):n>t&&l(`down`))}function l(e){i.value=e,a.value=!1,kt(()=>{var e;(e=t.value)==null||e.offsetWidth,a.value=!0})}return()=>{let{clsPrefix:i}=e;return Y(`span`,{ref:t,class:`${i}-base-slot-machine-number`},n.value===null?null:Y(`span`,{class:[`${i}-base-slot-machine-old-number ${i}-base-slot-machine-old-number--top`,s.value]},n.value),Y(`span`,{class:[`${i}-base-slot-machine-current-number`,o.value]},Y(`span`,{ref:`numberWrapper`,class:[`${i}-base-slot-machine-current-number__inner`,typeof e.value!=`number`&&`${i}-base-slot-machine-current-number__inner--not-number`]},r.value)),n.value===null?null:Y(`span`,{class:[`${i}-base-slot-machine-old-number ${i}-base-slot-machine-old-number--bottom`,s.value]},n.value))}}}),{cubicBezierEaseOut:Jt}=Pt;function Yt({duration:e=`.2s`}={}){return[Q(`&.fade-up-width-expand-transition-leave-active`,{transition:`
 opacity ${e} ${Jt},
 max-width ${e} ${Jt},
 transform ${e} ${Jt}
 `}),Q(`&.fade-up-width-expand-transition-enter-active`,{transition:`
 opacity ${e} ${Jt},
 max-width ${e} ${Jt},
 transform ${e} ${Jt}
 `}),Q(`&.fade-up-width-expand-transition-enter-to`,{opacity:1,transform:`translateX(0) translateY(0)`}),Q(`&.fade-up-width-expand-transition-enter-from`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`}),Q(`&.fade-up-width-expand-transition-leave-from`,{opacity:1,transform:`translateY(0)`}),Q(`&.fade-up-width-expand-transition-leave-to`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`})]}var Xt=Q([Q(`@keyframes n-base-slot-machine-fade-up-in`,`
 from {
 transform: translateY(60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),Q(`@keyframes n-base-slot-machine-fade-down-in`,`
 from {
 transform: translateY(-60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),Q(`@keyframes n-base-slot-machine-fade-up-out`,`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(-60%);
 opacity: 0;
 }
 `),Q(`@keyframes n-base-slot-machine-fade-down-out`,`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(60%);
 opacity: 0;
 }
 `),H(`base-slot-machine`,`
 overflow: hidden;
 white-space: nowrap;
 display: inline-block;
 height: 18px;
 line-height: 18px;
 `,[H(`base-slot-machine-number`,`
 display: inline-block;
 position: relative;
 height: 18px;
 width: .6em;
 max-width: .6em;
 `,[Yt({duration:`.2s`}),Ae({duration:`.2s`,delay:`0s`}),H(`base-slot-machine-old-number`,`
 display: inline-block;
 opacity: 0;
 position: absolute;
 left: 0;
 right: 0;
 `,[z(`top`,{transform:`translateY(-100%)`}),z(`bottom`,{transform:`translateY(100%)`}),z(`down-scroll`,{animation:`n-base-slot-machine-fade-down-out .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),z(`up-scroll`,{animation:`n-base-slot-machine-fade-up-out .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1})]),H(`base-slot-machine-current-number`,`
 display: inline-block;
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 1;
 transform: translateY(0);
 width: .6em;
 `,[z(`down-scroll`,{animation:`n-base-slot-machine-fade-down-in .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),z(`up-scroll`,{animation:`n-base-slot-machine-fade-up-in .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),k(`inner`,`
 display: inline-block;
 position: absolute;
 right: 0;
 top: 0;
 width: .6em;
 `,[z(`not-number`,`
 right: unset;
 left: 0;
 `)])])])])]),Zt=G({name:`BaseSlotMachine`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],default:0},max:{type:Number,default:void 0},appeared:{type:Boolean,required:!0}},setup(e){ne(`-base-slot-machine`,Xt,B(e,`clsPrefix`));let t=L(),n=L(),r=U(()=>{if(typeof e.value==`string`)return[];if(e.value<1)return[0];let t=[],n=e.value;for(e.max!==void 0&&(n=Math.min(e.max,n));n>=1;)t.push(n%10),n/=10,n=Math.floor(n);return t.reverse(),t});return Mt(B(e,`value`),(e,r)=>{typeof e==`string`?(n.value=void 0,t.value=void 0):typeof r==`string`?(n.value=e,t.value=void 0):(n.value=e,t.value=r)}),()=>{let{value:i,clsPrefix:a}=e;return typeof i==`number`?Y(`span`,{class:`${a}-base-slot-machine`},Y(Bt,{name:`fade-up-width-expand-transition`,tag:`span`},{default:()=>r.value.map((e,i)=>Y(qt,{clsPrefix:a,key:r.value.length-i-1,oldOriginalNumber:t.value,newOriginalNumber:n.value,value:e}))}),Y(Ge,{key:`+`,width:!0},{default:()=>e.max!==void 0&&e.max<i?Y(qt,{clsPrefix:a,value:`+`}):null})):Y(`span`,{class:`${a}-base-slot-machine`},i)}}}),Qt=H(`input-group`,`
 display: inline-flex;
 width: 100%;
 flex-wrap: nowrap;
 vertical-align: bottom;
`,[Q(`>`,[H(`input`,[Q(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),Q(`&:not(:first-child)`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 margin-left: -1px!important;
 `)]),H(`button`,[Q(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[k(`state-border, border`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)]),Q(`&:not(:first-child)`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[k(`state-border, border`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])]),Q(`*`,[Q(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[Q(`>`,[H(`input`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),H(`base-selection`,[H(`base-selection-label`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),H(`base-selection-tags`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),k(`box-shadow, border, state-border`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)])])]),Q(`&:not(:first-child)`,`
 margin-left: -1px!important;
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[Q(`>`,[H(`input`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),H(`base-selection`,[H(`base-selection-label`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),H(`base-selection-tags`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),k(`box-shadow, border, state-border`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])])])])])]),$t=G({name:`InputGroup`,props:{},setup(e){let{mergedClsPrefixRef:t}=bt(e);return ne(`-input-group`,Qt,t),{mergedClsPrefix:t}},render(){let{mergedClsPrefix:e}=this;return Y(`div`,{class:`${e}-input-group`},this.$slots)}}),en=P(`n-avatar-group`),tn=H(`avatar`,`
 width: var(--n-merged-size);
 height: var(--n-merged-size);
 color: #FFF;
 font-size: var(--n-font-size);
 display: inline-flex;
 position: relative;
 overflow: hidden;
 text-align: center;
 border: var(--n-border);
 border-radius: var(--n-border-radius);
 --n-merged-color: var(--n-color);
 background-color: var(--n-merged-color);
 transition:
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
`,[rt(Q(`&`,`--n-merged-color: var(--n-color-modal);`)),de(Q(`&`,`--n-merged-color: var(--n-color-popover);`)),Q(`img`,`
 width: 100%;
 height: 100%;
 `),k(`text`,`
 white-space: nowrap;
 display: inline-block;
 position: absolute;
 left: 50%;
 top: 50%;
 `),H(`icon`,`
 vertical-align: bottom;
 font-size: calc(var(--n-merged-size) - 6px);
 `),k(`text`,`line-height: 1.25`)]),nn=G({name:`Avatar`,props:Object.assign(Object.assign({},V.props),{size:[String,Number],src:String,circle:{type:Boolean,default:void 0},objectFit:String,round:{type:Boolean,default:void 0},bordered:{type:Boolean,default:void 0},onError:Function,fallbackSrc:String,intersectionObserverOptions:Object,lazy:Boolean,onLoad:Function,renderPlaceholder:Function,renderFallback:Function,imgProps:Object,color:String}),slots:Object,setup(t){let{mergedClsPrefixRef:n,inlineThemeDisabled:r}=bt(t),i=L(!1),a=null,o=L(null),s=L(null),c=()=>{let{value:e}=o;if(e&&(a===null||a!==e.innerHTML)){a=e.innerHTML;let{value:t}=s;if(t){let{offsetWidth:n,offsetHeight:r}=t,{offsetWidth:i,offsetHeight:a}=e,o=.9,s=Math.min(n/i*o,r/a*o,1);e.style.transform=`translateX(-50%) translateY(-50%) scale(${s})`}}},l=K(en,null),u=U(()=>{let{size:e}=t;if(e)return e;let{size:n}=l||{};return n||`medium`}),d=V(`Avatar`,`-avatar`,tn,N,t,n),f=K(e,null),p=U(()=>{if(l)return!0;let{round:e,circle:n}=t;return e!==void 0||n!==void 0?e||n:f?f.roundRef.value:!1}),m=U(()=>l?!0:t.bordered||!1),h=U(()=>{let e=u.value,n=p.value,r=m.value,{color:i}=t,{self:{borderRadius:a,fontSize:o,color:s,border:c,colorModal:l,colorPopover:f},common:{cubicBezierEaseInOut:h}}=d.value,g;return g=typeof e==`number`?`${e}px`:d.value.self[E(`height`,e)],{"--n-font-size":o,"--n-border":r?c:`none`,"--n-border-radius":n?`50%`:a,"--n-color":i||s,"--n-color-modal":i||l,"--n-color-popover":i||f,"--n-bezier":h,"--n-merged-size":`var(--n-avatar-size-override, ${g})`}}),g=r?pt(`avatar`,U(()=>{let e=u.value,n=p.value,r=m.value,{color:i}=t,a=``;return e&&(typeof e==`number`?a+=`a${e}`:a+=e[0]),n&&(a+=`b`),r&&(a+=`c`),i&&(a+=Nt(i)),a}),h,t):void 0,_=L(!t.lazy);Xe(()=>{if(t.lazy&&t.intersectionObserverOptions){let e,n=ye(()=>{e?.(),e=void 0,t.lazy&&(e=x(s.value,t.intersectionObserverOptions,_))});_t(()=>{n(),e?.()})}}),Mt(()=>t.src||t.imgProps?.src,()=>{i.value=!1});let v=L(!t.lazy);return{textRef:o,selfRef:s,mergedRoundRef:p,mergedClsPrefix:n,fitTextTransform:c,cssVars:r?void 0:h,themeClass:g?.themeClass,onRender:g?.onRender,hasLoadError:i,shouldStartLoading:_,loaded:v,mergedOnError:e=>{if(!_.value)return;i.value=!0;let{onError:n,imgProps:{onError:r}={}}=t;n?.(e),r?.(e)},mergedOnLoad:e=>{let{onLoad:n,imgProps:{onLoad:r}={}}=t;n?.(e),r?.(e),v.value=!0}}},render(){var e;let{$slots:t,src:n,mergedClsPrefix:r,lazy:i,onRender:a,loaded:o,hasLoadError:s,imgProps:c={}}=this;a?.();let l,u=!o&&!s&&(this.renderPlaceholder?this.renderPlaceholder():(e=this.$slots).placeholder?.call(e));return l=this.hasLoadError?this.renderFallback?this.renderFallback():ze(t.fallback,()=>[Y(`img`,{src:this.fallbackSrc,style:{objectFit:this.objectFit}})]):At(t.default,e=>{if(e)return Y(re,{onResize:this.fitTextTransform},{default:()=>Y(`span`,{ref:`textRef`,class:`${r}-avatar__text`},e)});if(n||c.src){let e=this.src||c.src;return Y(`img`,Object.assign(Object.assign({},c),{loading:b&&!this.intersectionObserverOptions&&i?`lazy`:`eager`,src:i&&this.intersectionObserverOptions?this.shouldStartLoading?e:void 0:e,"data-image-src":e,onLoad:this.mergedOnLoad,onError:this.mergedOnError,style:[c.style||``,{objectFit:this.objectFit},u?{height:`0`,width:`0`,visibility:`hidden`,position:`absolute`}:``]}))}}),Y(`span`,{ref:`selfRef`,class:[`${r}-avatar`,this.themeClass],style:this.cssVars},l,i&&u)}});function rn(e){let{errorColor:t,infoColor:n,successColor:r,warningColor:i,fontFamily:a}=e;return{color:t,colorInfo:n,colorSuccess:r,colorError:t,colorWarning:i,fontSize:`12px`,fontFamily:a}}var an={name:`Badge`,common:wt,self:rn},on=Q([Q(`@keyframes badge-wave-spread`,{from:{boxShadow:`0 0 0.5px 0px var(--n-ripple-color)`,opacity:.6},to:{boxShadow:`0 0 0.5px 4.5px var(--n-ripple-color)`,opacity:0}}),H(`badge`,`
 display: inline-flex;
 position: relative;
 vertical-align: middle;
 font-family: var(--n-font-family);
 `,[z(`as-is`,[H(`badge-sup`,{position:`static`,transform:`translateX(0)`},[Ot({transformOrigin:`left bottom`,originalTransform:`translateX(0)`})])]),z(`dot`,[H(`badge-sup`,`
 height: 8px;
 width: 8px;
 padding: 0;
 min-width: 8px;
 left: 100%;
 bottom: calc(100% - 4px);
 `,[Q(`::before`,`border-radius: 4px;`)])]),H(`badge-sup`,`
 background: var(--n-color);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 color: #FFF;
 position: absolute;
 height: 18px;
 line-height: 18px;
 border-radius: 9px;
 padding: 0 6px;
 text-align: center;
 font-size: var(--n-font-size);
 transform: translateX(-50%);
 left: 100%;
 bottom: calc(100% - 9px);
 font-variant-numeric: tabular-nums;
 z-index: 2;
 display: flex;
 align-items: center;
 `,[Ot({transformOrigin:`left bottom`,originalTransform:`translateX(-50%)`}),H(`base-wave`,{zIndex:1,animationDuration:`2s`,animationIterationCount:`infinite`,animationDelay:`1s`,animationTimingFunction:`var(--n-ripple-bezier)`,animationName:`badge-wave-spread`}),Q(`&::before`,`
 opacity: 0;
 transform: scale(1);
 border-radius: 9px;
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)])])]),sn=G({name:`Badge`,props:Object.assign(Object.assign({},V.props),{value:[String,Number],max:Number,dot:Boolean,type:{type:String,default:`default`},show:{type:Boolean,default:!0},showZero:Boolean,processing:Boolean,color:String,offset:Array}),setup(e,{slots:t}){let{mergedClsPrefixRef:n,inlineThemeDisabled:r,mergedRtlRef:i}=bt(e),a=V(`Badge`,`-badge`,on,an,e,n),o=L(!1),s=()=>{o.value=!0},c=()=>{o.value=!1},l=U(()=>e.show&&(e.dot||e.value!==void 0&&!(!e.showZero&&Number(e.value)<=0)||!St(t.value)));Xe(()=>{l.value&&(o.value=!0)});let u=xe(`Badge`,i,n),d=U(()=>{let{type:t,color:n}=e,{common:{cubicBezierEaseInOut:r,cubicBezierEaseOut:i},self:{[E(`color`,t)]:o,fontFamily:s,fontSize:c}}=a.value;return{"--n-font-size":c,"--n-font-family":s,"--n-color":n||o,"--n-ripple-color":n||o,"--n-bezier":r,"--n-ripple-bezier":i}}),f=r?pt(`badge`,U(()=>{let t=``,{type:n,color:r}=e;return n&&(t+=n[0]),r&&(t+=Nt(r)),t}),d,e):void 0,p=U(()=>{let{offset:t}=e;if(!t)return;let[n,r]=t,i=typeof n==`number`?`${n}px`:n,a=typeof r==`number`?`${r}px`:r;return{transform:`translate(calc(${u?.value?`50%`:`-50%`} + ${i}), ${a})`}});return{rtlEnabled:u,mergedClsPrefix:n,appeared:o,showBadge:l,handleAfterEnter:s,handleAfterLeave:c,cssVars:r?void 0:d,themeClass:f?.themeClass,onRender:f?.onRender,offsetStyle:p}},render(){let{mergedClsPrefix:e,onRender:t,themeClass:n,$slots:r}=this;t?.();let i=r.default?.call(r);return Y(`div`,{class:[`${e}-badge`,this.rtlEnabled&&`${e}-badge--rtl`,n,{[`${e}-badge--dot`]:this.dot,[`${e}-badge--as-is`]:!i}],style:this.cssVars},i,Y(ge,{name:`fade-in-scale-up-transition`,onAfterEnter:this.handleAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>this.showBadge?Y(`sup`,{class:`${e}-badge-sup`,title:a(this.value),style:this.offsetStyle},ze(r.value,()=>[this.dot?null:Y(Zt,{clsPrefix:e,appeared:this.appeared,max:this.max,value:this.value})]),this.processing?Y(De,{clsPrefix:e}):null):null}))}}),cn=H(`breadcrumb`,`
 white-space: nowrap;
 cursor: default;
 line-height: var(--n-item-line-height);
`,[Q(`ul`,`
 list-style: none;
 padding: 0;
 margin: 0;
 `),Q(`a`,`
 color: inherit;
 text-decoration: inherit;
 `),H(`breadcrumb-item`,`
 font-size: var(--n-font-size);
 transition: color .3s var(--n-bezier);
 display: inline-flex;
 align-items: center;
 `,[H(`icon`,`
 font-size: 18px;
 vertical-align: -.2em;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `),Q(`&:not(:last-child)`,[z(`clickable`,[k(`link`,`
 cursor: pointer;
 `,[Q(`&:hover`,`
 background-color: var(--n-item-color-hover);
 `),Q(`&:active`,`
 background-color: var(--n-item-color-pressed); 
 `)])])]),k(`link`,`
 padding: 4px;
 border-radius: var(--n-item-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 position: relative;
 `,[Q(`&:hover`,`
 color: var(--n-item-text-color-hover);
 `,[H(`icon`,`
 color: var(--n-item-text-color-hover);
 `)]),Q(`&:active`,`
 color: var(--n-item-text-color-pressed);
 `,[H(`icon`,`
 color: var(--n-item-text-color-pressed);
 `)])]),k(`separator`,`
 margin: 0 8px;
 color: var(--n-separator-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 `),Q(`&:last-child`,[k(`link`,`
 font-weight: var(--n-font-weight-active);
 cursor: unset;
 color: var(--n-item-text-color-active);
 `,[H(`icon`,`
 color: var(--n-item-text-color-active);
 `)]),k(`separator`,`
 display: none;
 `)])])]),ln=P(`n-breadcrumb`),un=G({name:`Breadcrumb`,props:Object.assign(Object.assign({},V.props),{separator:{type:String,default:`/`}}),setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=bt(e),r=V(`Breadcrumb`,`-breadcrumb`,cn,Te,e,t);Lt(ln,{separatorRef:B(e,`separator`),mergedClsPrefixRef:t});let i=U(()=>{let{common:{cubicBezierEaseInOut:e},self:{separatorColor:t,itemTextColor:n,itemTextColorHover:i,itemTextColorPressed:a,itemTextColorActive:o,fontSize:s,fontWeightActive:c,itemBorderRadius:l,itemColorHover:u,itemColorPressed:d,itemLineHeight:f}}=r.value;return{"--n-font-size":s,"--n-bezier":e,"--n-item-text-color":n,"--n-item-text-color-hover":i,"--n-item-text-color-pressed":a,"--n-item-text-color-active":o,"--n-separator-color":t,"--n-item-color-hover":u,"--n-item-color-pressed":d,"--n-item-border-radius":l,"--n-font-weight-active":c,"--n-item-line-height":f}}),a=n?pt(`breadcrumb`,void 0,i,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){var e;return(e=this.onRender)==null||e.call(this),Y(`nav`,{class:[`${this.mergedClsPrefix}-breadcrumb`,this.themeClass],style:this.cssVars,"aria-label":`Breadcrumb`},Y(`ul`,null,this.$slots))}});function dn(e=ue?window:null){let t=()=>{let{hash:t,host:n,hostname:r,href:i,origin:a,pathname:o,port:s,protocol:c,search:l}=e?.location||{};return{hash:t,host:n,hostname:r,href:i,origin:a,pathname:o,port:s,protocol:c,search:l}},n=L(t()),r=()=>{n.value=t()};return Xe(()=>{e&&(e.addEventListener(`popstate`,r),e.addEventListener(`hashchange`,r))}),Me(()=>{e&&(e.removeEventListener(`popstate`,r),e.removeEventListener(`hashchange`,r))}),n}var fn=G({name:`BreadcrumbItem`,props:{separator:String,href:String,clickable:{type:Boolean,default:!0},showSeparator:{type:Boolean,default:!0},onClick:Function},slots:Object,setup(e,{slots:t}){let n=K(ln,null);if(!n)return()=>null;let{separatorRef:r,mergedClsPrefixRef:i}=n,a=dn(),o=U(()=>e.href?`a`:`span`),s=U(()=>a.value.href===e.href?`location`:null);return()=>{let{value:n}=i;return Y(`li`,{class:[`${n}-breadcrumb-item`,e.clickable&&`${n}-breadcrumb-item--clickable`]},Y(o.value,{class:`${n}-breadcrumb-item__link`,"aria-current":s.value,href:e.href,onClick:e.onClick},t),e.showSeparator&&Y(`span`,{class:`${n}-breadcrumb-item__separator`,"aria-hidden":`true`},ze(t.separator,()=>[e.separator??r.value])))}}});function pn(e,t){switch(e[0]){case`hex`:return t?`#000000FF`:`#000000`;case`rgb`:return t?`rgba(0, 0, 0, 1)`:`rgb(0, 0, 0)`;case`hsl`:return t?`hsla(0, 0%, 0%, 1)`:`hsl(0, 0%, 0%)`;case`hsv`:return t?`hsva(0, 0%, 0%, 1)`:`hsv(0, 0%, 0%)`}return`#000000`}function mn(e){return e===null?null:/^ *#/.test(e)?`hex`:e.includes(`rgb`)?`rgb`:e.includes(`hsl`)?`hsl`:e.includes(`hsv`)?`hsv`:null}function hn(e,t=[255,255,255],n=`AA`){let[r,i,a,o]=xt(Ct(e));if(o===1){let e=gn([r,i,a]),o=gn(t);return(Math.max(e,o)+.05)/(Math.min(e,o)+.05)>=(n===`AA`?4.5:7)}let s=gn([Math.round(r*o+t[0]*(1-o)),Math.round(i*o+t[1]*(1-o)),Math.round(a*o+t[2]*(1-o))]),c=gn(t);return(Math.max(s,c)+.05)/(Math.min(s,c)+.05)>=(n===`AA`?4.5:7)}function gn(e){let[t,n,r]=e.map(e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4));return .2126*t+.7152*n+.0722*r}function _n(e){return e=Math.round(e),e>=360?359:e<0?0:e}function vn(e){return e=Math.round(e*100)/100,e>1?1:e<0?0:e}var yn={rgb:{hex(e){return Pe(xt(e))},hsl(e){let[t,n,r,i]=xt(e);return Ct([...Ze(t,n,r),i])},hsv(e){let[t,n,r,i]=xt(e);return ot([...Ne(t,n,r),i])}},hex:{rgb(e){return We(xt(e))},hsl(e){let[t,n,r,i]=xt(e);return Ct([...Ze(t,n,r),i])},hsv(e){let[t,n,r,i]=xt(e);return ot([...Ne(t,n,r),i])}},hsl:{hex(e){let[t,n,r,i]=Dt(e);return Pe([...vt(t,n,r),i])},rgb(e){let[t,n,r,i]=Dt(e);return We([...vt(t,n,r),i])},hsv(e){let[t,n,r,i]=Dt(e);return ot([...Je(t,n,r),i])}},hsv:{hex(e){let[t,n,r,i]=mt(e);return Pe([...$e(t,n,r),i])},rgb(e){let[t,n,r,i]=mt(e);return We([...$e(t,n,r),i])},hsl(e){let[t,n,r,i]=mt(e);return Ct([...ut(t,n,r),i])}}};function bn(e,t,n){return n||=mn(e),n?n===t?e:yn[n][t](e):null}var xn=`12px`,Sn=12,Cn=`6px`,wn=G({name:`AlphaSlider`,props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},alpha:{type:Number,default:0},onUpdateAlpha:{type:Function,required:!0},onComplete:Function},setup(e){let t=L(null);function n(n){!t.value||!e.rgba||(Oe(`mousemove`,document,r),Oe(`mouseup`,document,i),r(n))}function r(n){let{value:r}=t;if(!r)return;let{width:i,left:a}=r.getBoundingClientRect(),o=(n.clientX-a)/(i-Sn);e.onUpdateAlpha(vn(o))}function i(){var t;ke(`mousemove`,document,r),ke(`mouseup`,document,i),(t=e.onComplete)==null||t.call(e)}return{railRef:t,railBackgroundImage:U(()=>{let{rgba:t}=e;return t?`linear-gradient(to right, rgba(${t[0]}, ${t[1]}, ${t[2]}, 0) 0%, rgba(${t[0]}, ${t[1]}, ${t[2]}, 1) 100%)`:``}),handleMouseDown:n}},render(){let{clsPrefix:e}=this;return Y(`div`,{class:`${e}-color-picker-slider`,ref:`railRef`,style:{height:xn,borderRadius:Cn},onMousedown:this.handleMouseDown},Y(`div`,{style:{borderRadius:Cn,position:`absolute`,left:0,right:0,top:0,bottom:0,overflow:`hidden`}},Y(`div`,{class:`${e}-color-picker-checkboard`}),Y(`div`,{class:`${e}-color-picker-slider__image`,style:{backgroundImage:this.railBackgroundImage}})),this.rgba&&Y(`div`,{style:{position:`absolute`,left:Cn,right:Cn,top:0,bottom:0}},Y(`div`,{class:`${e}-color-picker-handle`,style:{left:`calc(${this.alpha*100}% - ${Cn})`,borderRadius:Cn,width:xn,height:xn}},Y(`div`,{class:`${e}-color-picker-handle__fill`,style:{backgroundColor:We(this.rgba),borderRadius:Cn,width:xn,height:xn}}))))}}),Tn=P(`n-color-picker`);function En(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),255)):!1}function Dn(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),360)):!1}function On(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),100)):!1}function kn(e){let t=e.trim();return/^#[0-9a-fA-F]+$/.test(t)?[4,5,7,9].includes(t.length):!1}function An(e){return/^\d{1,3}\.?\d*%$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e)/100,100)):!1}var jn={paddingSmall:`0 4px`},Mn=G({name:`ColorInputUnit`,props:{label:{type:String,required:!0},value:{type:[Number,String],default:null},showAlpha:Boolean,onUpdateValue:{type:Function,required:!0}},setup(e){let t=L(``),{themeRef:n}=K(Tn,null);ye(()=>{t.value=r()});function r(){let{value:t}=e;if(t===null)return``;let{label:n}=e;return n===`HEX`?t:n===`A`?`${Math.floor(t*100)}%`:String(Math.floor(t))}function i(e){t.value=e}function a(n){let i,a;switch(e.label){case`HEX`:a=kn(n),a&&e.onUpdateValue(n),t.value=r();break;case`H`:i=Dn(n),i===!1?t.value=r():e.onUpdateValue(i);break;case`S`:case`L`:case`V`:i=On(n),i===!1?t.value=r():e.onUpdateValue(i);break;case`A`:i=An(n),i===!1?t.value=r():e.onUpdateValue(i);break;case`R`:case`G`:case`B`:i=En(n),i===!1?t.value=r():e.onUpdateValue(i);break}}return{mergedTheme:n,inputValue:t,handleInputChange:a,handleInputUpdateValue:i}},render(){let{mergedTheme:e}=this;return Y(p,{size:`small`,placeholder:this.label,theme:e.peers.Input,themeOverrides:e.peerOverrides.Input,builtinThemeOverrides:jn,value:this.inputValue,onUpdateValue:this.handleInputUpdateValue,onChange:this.handleInputChange,style:this.label===`A`?`flex-grow: 1.25;`:``})}}),Nn=G({name:`ColorInput`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},modes:{type:Array,required:!0},showAlpha:{type:Boolean,required:!0},value:{type:String,default:null},valueArr:{type:Array,default:null},onUpdateValue:{type:Function,required:!0},onUpdateMode:{type:Function,required:!0}},setup(e){return{handleUnitUpdateValue(t,n){let{showAlpha:r}=e;if(e.mode===`hex`){e.onUpdateValue((r?Pe:et)(n));return}let i;switch(i=e.valueArr===null?[0,0,0,0]:Array.from(e.valueArr),e.mode){case`hsv`:i[t]=n,e.onUpdateValue((r?ot:Be)(i));break;case`rgb`:i[t]=n,e.onUpdateValue((r?We:jt)(i));break;case`hsl`:i[t]=n,e.onUpdateValue((r?Ct:ht)(i));break}}}},render(){let{clsPrefix:e,modes:t}=this;return Y(`div`,{class:`${e}-color-picker-input`},Y(`div`,{class:`${e}-color-picker-input__mode`,onClick:this.onUpdateMode,style:{cursor:t.length===1?``:`pointer`}},this.mode.toUpperCase()+(this.showAlpha?`A`:``)),Y($t,null,{default:()=>{let{mode:e,valueArr:t,showAlpha:n}=this;if(e===`hex`){let e=null;try{e=t===null?null:(n?Pe:et)(t)}catch{}return Y(Mn,{label:`HEX`,showAlpha:n,value:e,onUpdateValue:e=>{this.handleUnitUpdateValue(0,e)}})}return(e+(n?`a`:``)).split(``).map((e,n)=>Y(Mn,{label:e.toUpperCase(),value:t===null?null:t[n],onUpdateValue:e=>{this.handleUnitUpdateValue(n,e)}}))}}))}});function Pn(e,t){if(t===`hsv`){let[t,n,r,i]=mt(e);return We([...$e(t,n,r),i])}return e}function Fn(e){let t=document.createElement(`canvas`).getContext(`2d`);return t?(t.fillStyle=e,t.fillStyle):`#000000`}var In=G({name:`ColorPickerSwatches`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},swatches:{type:Array,required:!0},onUpdateColor:{type:Function,required:!0}},setup(e){let t=U(()=>e.swatches.map(e=>{let t=mn(e);return{value:e,mode:t,legalValue:Pn(e,t)}}));function n(t){let{mode:n}=e,{value:r,mode:i}=t;return i||(i=`hex`,/^[a-zA-Z]+$/.test(r)?r=Fn(r):(Ft(`color-picker`,`color ${r} in swatches is invalid.`),r=`#000000`)),i===n?r:bn(r,n,i)}function r(t){e.onUpdateColor(n(t))}function i(e,t){e.key===`Enter`&&r(t)}return{parsedSwatchesRef:t,handleSwatchSelect:r,handleSwatchKeyDown:i}},render(){let{clsPrefix:e}=this;return Y(`div`,{class:`${e}-color-picker-swatches`},this.parsedSwatchesRef.map(t=>Y(`div`,{class:`${e}-color-picker-swatch`,tabindex:0,onClick:()=>{this.handleSwatchSelect(t)},onKeydown:e=>{this.handleSwatchKeyDown(e,t)}},Y(`div`,{class:`${e}-color-picker-swatch__fill`,style:{background:t.legalValue}}))))}}),Ln=G({name:`ColorPickerTrigger`,slots:Object,props:{clsPrefix:{type:String,required:!0},value:{type:String,default:null},hsla:{type:Array,default:null},disabled:Boolean,onClick:Function},setup(e){let{colorPickerSlots:t,renderLabelRef:n}=K(Tn,null);return()=>{let{hsla:r,value:i,clsPrefix:a,onClick:o,disabled:s}=e,c=t.label||n.value;return Y(`div`,{class:[`${a}-color-picker`,s&&`${a}-color-picker--disabled`],onClick:s?void 0:o},Y(`div`,{class:`${a}-color-picker__fill`},Y(`div`,{class:`${a}-color-picker-checkboard`}),Y(`div`,{style:{position:`absolute`,left:0,right:0,top:0,bottom:0,backgroundColor:r?Ct(r):``}}),i&&r?Y(`div`,{class:`${a}-color-picker__value`,style:{color:hn(r)?`white`:`black`}},c?c(i):i):null))}}}),Rn=G({name:`ColorPreview`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},color:{type:String,default:null,validator:e=>{let t=mn(e);return!!(!e||t&&t!==`hsv`)}},onUpdateColor:{type:Function,required:!0}},setup(e){function t(t){var n;let r=t.target.value;(n=e.onUpdateColor)==null||n.call(e,bn(r.toUpperCase(),e.mode,`hex`)),t.stopPropagation()}return{handleChange:t}},render(){let{clsPrefix:e}=this;return Y(`div`,{class:`${e}-color-picker-preview__preview`},Y(`span`,{class:`${e}-color-picker-preview__fill`,style:{background:this.color||`#000000`}}),Y(`input`,{class:`${e}-color-picker-preview__input`,type:`color`,value:this.color,onChange:this.handleChange}))}}),zn=`12px`,Bn=12,Vn=`6px`,Hn=6,Un=`linear-gradient(90deg,red,#ff0 16.66%,#0f0 33.33%,#0ff 50%,#00f 66.66%,#f0f 83.33%,red)`,Wn=G({name:`HueSlider`,props:{clsPrefix:{type:String,required:!0},hue:{type:Number,required:!0},onUpdateHue:{type:Function,required:!0},onComplete:Function},setup(e){let t=L(null);function n(e){t.value&&(Oe(`mousemove`,document,r),Oe(`mouseup`,document,i),r(e))}function r(n){let{value:r}=t;if(!r)return;let{width:i,left:a}=r.getBoundingClientRect(),o=_n((n.clientX-a-Hn)/(i-Bn)*360);e.onUpdateHue(o)}function i(){var t;ke(`mousemove`,document,r),ke(`mouseup`,document,i),(t=e.onComplete)==null||t.call(e)}return{railRef:t,handleMouseDown:n}},render(){let{clsPrefix:e}=this;return Y(`div`,{class:`${e}-color-picker-slider`,style:{height:zn,borderRadius:Vn}},Y(`div`,{ref:`railRef`,style:{boxShadow:`inset 0 0 2px 0 rgba(0, 0, 0, .24)`,boxSizing:`border-box`,backgroundImage:Un,height:zn,borderRadius:Vn,position:`relative`},onMousedown:this.handleMouseDown},Y(`div`,{style:{position:`absolute`,left:Vn,right:Vn,top:0,bottom:0}},Y(`div`,{class:`${e}-color-picker-handle`,style:{left:`calc((${this.hue}%) / 359 * 100 - ${Vn})`,borderRadius:Vn,width:zn,height:zn}},Y(`div`,{class:`${e}-color-picker-handle__fill`,style:{backgroundColor:`hsl(${this.hue}, 100%, 50%)`,borderRadius:Vn,width:zn,height:zn}})))))}}),Gn=`12px`,Kn=`6px`,qn=G({name:`Pallete`,props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},displayedHue:{type:Number,required:!0},displayedSv:{type:Array,required:!0},onUpdateSV:{type:Function,required:!0},onComplete:Function},setup(e){let t=L(null);function n(e){t.value&&(Oe(`mousemove`,document,r),Oe(`mouseup`,document,i),r(e))}function r(n){let{value:r}=t;if(!r)return;let{width:i,height:a,left:o,bottom:s}=r.getBoundingClientRect(),c=(s-n.clientY)/a,l=(n.clientX-o)/i,u=100*(l>1?1:l<0?0:l),d=100*(c>1?1:c<0?0:c);e.onUpdateSV(u,d)}function i(){var t;ke(`mousemove`,document,r),ke(`mouseup`,document,i),(t=e.onComplete)==null||t.call(e)}return{palleteRef:t,handleColor:U(()=>{let{rgba:t}=e;return t?`rgb(${t[0]}, ${t[1]}, ${t[2]})`:``}),handleMouseDown:n}},render(){let{clsPrefix:e}=this;return Y(`div`,{class:`${e}-color-picker-pallete`,onMousedown:this.handleMouseDown,ref:`palleteRef`},Y(`div`,{class:`${e}-color-picker-pallete__layer`,style:{backgroundImage:`linear-gradient(90deg, white, hsl(${this.displayedHue}, 100%, 50%))`}}),Y(`div`,{class:`${e}-color-picker-pallete__layer ${e}-color-picker-pallete__layer--shadowed`,style:{backgroundImage:`linear-gradient(180deg, rgba(0, 0, 0, 0%), rgba(0, 0, 0, 100%))`}}),this.rgba&&Y(`div`,{class:`${e}-color-picker-handle`,style:{width:Gn,height:Gn,borderRadius:Kn,left:`calc(${this.displayedSv[0]}% - ${Kn})`,bottom:`calc(${this.displayedSv[1]}% - ${Kn})`}},Y(`div`,{class:`${e}-color-picker-handle__fill`,style:{backgroundColor:this.handleColor,borderRadius:Kn,width:Gn,height:Gn}})))}}),Jn=Q([H(`color-picker-panel`,`
 margin: 4px 0;
 width: 240px;
 font-size: var(--n-panel-font-size);
 color: var(--n-text-color);
 background-color: var(--n-color);
 transition:
 box-shadow .3s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 `,[Ot(),H(`input`,`
 text-align: center;
 `)]),H(`color-picker-checkboard`,`
 background: white; 
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[Q(`&::after`,`
 background-image: linear-gradient(45deg, #DDD 25%, #0000 25%), linear-gradient(-45deg, #DDD 25%, #0000 25%), linear-gradient(45deg, #0000 75%, #DDD 75%), linear-gradient(-45deg, #0000 75%, #DDD 75%);
 background-size: 12px 12px;
 background-position: 0 0, 0 6px, 6px -6px, -6px 0px;
 background-repeat: repeat;
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),H(`color-picker-slider`,`
 margin-bottom: 8px;
 position: relative;
 box-sizing: border-box;
 `,[k(`image`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `),Q(`&::after`,`
 content: "";
 position: absolute;
 border-radius: inherit;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
 pointer-events: none;
 `)]),H(`color-picker-handle`,`
 z-index: 1;
 box-shadow: 0 0 2px 0 rgba(0, 0, 0, .45);
 position: absolute;
 background-color: white;
 overflow: hidden;
 `,[k(`fill`,`
 box-sizing: border-box;
 border: 2px solid white;
 `)]),H(`color-picker-pallete`,`
 height: 180px;
 position: relative;
 margin-bottom: 8px;
 cursor: crosshair;
 `,[k(`layer`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[z(`shadowed`,`
 box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
 `)])]),H(`color-picker-preview`,`
 display: flex;
 `,[k(`sliders`,`
 flex: 1 0 auto;
 `),k(`preview`,`
 position: relative;
 height: 30px;
 width: 30px;
 margin: 0 0 8px 6px;
 border-radius: 50%;
 box-shadow: rgba(0, 0, 0, .15) 0px 0px 0px 1px inset;
 overflow: hidden;
 `),k(`fill`,`
 display: block;
 width: 30px;
 height: 30px;
 `),k(`input`,`
 position: absolute;
 top: 0;
 left: 0;
 width: 30px;
 height: 30px;
 opacity: 0;
 z-index: 1;
 `)]),H(`color-picker-input`,`
 display: flex;
 align-items: center;
 `,[H(`input`,`
 flex-grow: 1;
 flex-basis: 0;
 `),k(`mode`,`
 width: 72px;
 text-align: center;
 `)]),H(`color-picker-control`,`
 padding: 12px;
 `),H(`color-picker-action`,`
 display: flex;
 margin-top: -4px;
 border-top: 1px solid var(--n-divider-color);
 padding: 8px 12px;
 justify-content: flex-end;
 `,[H(`button`,`margin-left: 8px;`)]),H(`color-picker`,`
 display: inline-block;
 box-sizing: border-box;
 height: var(--n-height);
 font-size: var(--n-font-size);
 width: 100%;
 position: relative;
 cursor: pointer;
 border: var(--n-border);
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[z(`disabled`,`cursor: not-allowed`),k(`value`,`
 white-space: nowrap;
 position: relative;
 `),k(`fill`,`
 border-radius: var(--n-border-radius);
 position: absolute;
 display: flex;
 align-items: center;
 justify-content: center;
 left: 4px;
 right: 4px;
 top: 4px;
 bottom: 4px;
 `),H(`color-picker-checkboard`,`
 border-radius: var(--n-border-radius);
 `,[Q(`&::after`,`
 --n-block-size: calc((var(--n-height) - 8px) / 3);
 background-size: calc(var(--n-block-size) * 2) calc(var(--n-block-size) * 2);
 background-position: 0 0, 0 var(--n-block-size), var(--n-block-size) calc(-1 * var(--n-block-size)), calc(-1 * var(--n-block-size)) 0px; 
 `)])]),H(`color-picker-swatches`,`
 display: grid;
 grid-gap: 8px;
 flex-wrap: wrap;
 position: relative;
 grid-template-columns: repeat(auto-fill, 18px);
 margin-top: 10px;
 `,[H(`color-picker-swatch`,`
 width: 18px;
 height: 18px;
 background-image: linear-gradient(45deg, #DDD 25%, #0000 25%), linear-gradient(-45deg, #DDD 25%, #0000 25%), linear-gradient(45deg, #0000 75%, #DDD 75%), linear-gradient(-45deg, #0000 75%, #DDD 75%);
 background-size: 8px 8px;
 background-position: 0px 0, 0px 4px, 4px -4px, -4px 0px;
 background-repeat: repeat;
 `,[k(`fill`,`
 position: relative;
 width: 100%;
 height: 100%;
 border-radius: 3px;
 box-shadow: rgba(0, 0, 0, .15) 0px 0px 0px 1px inset;
 cursor: pointer;
 `),Q(`&:focus`,`
 outline: none;
 `,[k(`fill`,[Q(`&::after`,`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 background: inherit;
 filter: blur(2px);
 content: "";
 `)])])])])]),$=G({name:`ColorPicker`,props:Object.assign(Object.assign({},V.props),{value:String,show:{type:Boolean,default:void 0},defaultShow:Boolean,defaultValue:String,modes:{type:Array,default:()=>[`rgb`,`hex`,`hsl`]},placement:{type:String,default:`bottom-start`},to:u.propTo,showAlpha:{type:Boolean,default:!0},showPreview:Boolean,swatches:Array,disabled:{type:Boolean,default:void 0},actions:{type:Array,default:null},internalActions:Array,size:String,renderLabel:Function,onComplete:Function,onConfirm:Function,onClear:Function,"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]}),slots:Object,setup(e,{slots:t}){let n=null;function r(e){n=e}let i=null,{mergedClsPrefixRef:a,namespaceRef:o,inlineThemeDisabled:s,mergedComponentPropsRef:c}=bt(e),l=Et(e,{mergedSize:t=>{let{size:n}=e;if(n)return n;let{mergedSize:r}=t||{};return r?.value?r.value:c?.value?.ColorPicker?.size||`medium`}}),{mergedSizeRef:d,mergedDisabledRef:p}=l,{localeRef:m}=y(`global`),h=V(`ColorPicker`,`-color-picker`,Jn,me,e,a);Lt(Tn,{themeRef:h,renderLabelRef:B(e,`renderLabel`),colorPickerSlots:t});let g=L(e.defaultShow),_=f(B(e,`show`),g);function v(t){let{onUpdateShow:n,"onUpdate:show":r}=e;n&&Z(n,t),r&&Z(r,t),g.value=t}let{defaultValue:b}=e,x=L(b===void 0?pn(e.modes,e.showAlpha):b),S=f(B(e,`value`),x),C=L([S.value]),w=L(0),T=U(()=>mn(S.value)),{modes:ee}=e,D=L(mn(S.value)||ee[0]||`rgb`);function ne(){let{modes:t}=e,{value:n}=D,r=t.findIndex(e=>e===n);~r?D.value=t[(r+1)%t.length]:D.value=`rgb`}let O,k,A,re,j,M,N,P,F=U(()=>{let{value:e}=S;if(!e)return null;switch(T.value){case`hsv`:return mt(e);case`hsl`:return[O,k,A,P]=Dt(e),[...Je(O,k,A),P];case`rgb`:case`hex`:return[j,M,N,P]=xt(e),[...Ne(j,M,N),P]}}),I=U(()=>{let{value:e}=S;if(!e)return null;switch(T.value){case`rgb`:case`hex`:return xt(e);case`hsv`:return[O,k,re,P]=mt(e),[...$e(O,k,re),P];case`hsl`:return[O,k,A,P]=Dt(e),[...vt(O,k,A),P]}}),ie=U(()=>{let{value:e}=S;if(!e)return null;switch(T.value){case`hsl`:return Dt(e);case`hsv`:return[O,k,re,P]=mt(e),[...ut(O,k,re),P];case`rgb`:case`hex`:return[j,M,N,P]=xt(e),[...Ze(j,M,N),P]}}),ae=U(()=>{switch(D.value){case`rgb`:case`hex`:return I.value;case`hsv`:return F.value;case`hsl`:return ie.value}}),oe=L(0),se=L(1),ce=L([0,0]);function le(t,n){let{value:r}=F,i=oe.value,a=r?r[3]:1;ce.value=[t,n];let{showAlpha:o}=e;switch(D.value){case`hsv`:R((o?ot:Be)([i,t,n,a]),`cursor`);break;case`hsl`:R((o?Ct:ht)([...ut(i,t,n),a]),`cursor`);break;case`rgb`:R((o?We:jt)([...$e(i,t,n),a]),`cursor`);break;case`hex`:R((o?Pe:et)([...$e(i,t,n),a]),`cursor`);break}}function ue(t){oe.value=t;let{value:n}=F;if(!n)return;let[,r,i,a]=n,{showAlpha:o}=e;switch(D.value){case`hsv`:R((o?ot:Be)([t,r,i,a]),`cursor`);break;case`rgb`:R((o?We:jt)([...$e(t,r,i),a]),`cursor`);break;case`hex`:R((o?Pe:et)([...$e(t,r,i),a]),`cursor`);break;case`hsl`:R((o?Ct:ht)([...ut(t,r,i),a]),`cursor`);break}}function de(e){switch(D.value){case`hsv`:[O,k,re]=F.value,R(ot([O,k,re,e]),`cursor`);break;case`rgb`:[j,M,N]=I.value,R(We([j,M,N,e]),`cursor`);break;case`hex`:[j,M,N]=I.value,R(Pe([j,M,N,e]),`cursor`);break;case`hsl`:[O,k,A]=ie.value,R(Ct([O,k,A,e]),`cursor`);break}se.value=e}function R(t,n){i=n===`cursor`?t:null;let{nTriggerFormChange:r,nTriggerFormInput:a}=l,{onUpdateValue:o,"onUpdate:value":s}=e;o&&Z(o,t),s&&Z(s,t),r(),a(),x.value=t}function z(e){R(e,`input`),kt(fe)}function fe(t=!0){let{value:n}=S;if(n){let{nTriggerFormChange:r,nTriggerFormInput:i}=l,{onComplete:a}=e;a&&a(n);let{value:o}=C,{value:s}=w;t&&(o.splice(s+1,o.length,n),w.value=s+1),r(),i()}}function pe(){let{value:e}=w;e-1<0||(R(C.value[e-1],`input`),fe(!1),w.value=e-1)}function he(){let{value:e}=w;e<0||e+1>=C.value.length||(R(C.value[e+1],`input`),fe(!1),w.value=e+1)}function ge(){R(null,`input`);let{onClear:t}=e;t&&t(),v(!1)}function _e(){let{value:t}=S,{onConfirm:n}=e;n&&n(t),v(!1)}let ve=U(()=>w.value>=1),be=U(()=>{let{value:e}=C;return e.length>1&&w.value<e.length-1});Mt(_,e=>{e||(C.value=[S.value],w.value=0)}),ye(()=>{if(!(i&&i===S.value)){let{value:e}=F;e&&(oe.value=e[0],se.value=e[3],ce.value=[e[1],e[2]])}i=null});let H=U(()=>{let{value:e}=d,{common:{cubicBezierEaseInOut:t},self:{textColor:n,color:r,panelFontSize:i,boxShadow:a,border:o,borderRadius:s,dividerColor:c,[E(`height`,e)]:l,[E(`fontSize`,e)]:u}}=h.value;return{"--n-bezier":t,"--n-text-color":n,"--n-color":r,"--n-panel-font-size":i,"--n-font-size":u,"--n-box-shadow":a,"--n-border":o,"--n-border-radius":s,"--n-height":l,"--n-divider-color":c}}),xe=s?pt(`color-picker`,U(()=>d.value[0]),H,e):void 0;function we(){let{value:n}=I,{value:r}=oe,{internalActions:i,modes:o,actions:c}=e,{value:l}=h,{value:u}=a;return Y(`div`,{class:[`${u}-color-picker-panel`,xe?.themeClass.value],onDragstart:e=>{e.preventDefault()},style:s?void 0:H.value},Y(`div`,{class:`${u}-color-picker-control`},Y(qn,{clsPrefix:u,rgba:n,displayedHue:r,displayedSv:ce.value,onUpdateSV:le,onComplete:fe}),Y(`div`,{class:`${u}-color-picker-preview`},Y(`div`,{class:`${u}-color-picker-preview__sliders`},Y(Wn,{clsPrefix:u,hue:r,onUpdateHue:ue,onComplete:fe}),e.showAlpha?Y(wn,{clsPrefix:u,rgba:n,alpha:se.value,onUpdateAlpha:de,onComplete:fe}):null),e.showPreview?Y(Rn,{clsPrefix:u,mode:D.value,color:I.value&&et(I.value),onUpdateColor:e=>{R(e,`input`)}}):null),Y(Nn,{clsPrefix:u,showAlpha:e.showAlpha,mode:D.value,modes:o,onUpdateMode:ne,value:S.value,valueArr:ae.value,onUpdateValue:z}),e.swatches?.length&&Y(In,{clsPrefix:u,mode:D.value,swatches:e.swatches,onUpdateColor:e=>{R(e,`input`)}})),c?.length?Y(`div`,{class:`${u}-color-picker-action`},c.includes(`confirm`)&&Y(Ce,{size:`small`,onClick:_e,theme:l.peers.Button,themeOverrides:l.peerOverrides.Button},{default:()=>m.value.confirm}),c.includes(`clear`)&&Y(Ce,{size:`small`,onClick:ge,disabled:!S.value,theme:l.peers.Button,themeOverrides:l.peerOverrides.Button},{default:()=>m.value.clear})):null,t.action?Y(`div`,{class:`${u}-color-picker-action`},{default:t.action}):i?Y(`div`,{class:`${u}-color-picker-action`},i.includes(`undo`)&&Y(Ce,{size:`small`,onClick:pe,disabled:!ve.value,theme:l.peers.Button,themeOverrides:l.peerOverrides.Button},{default:()=>m.value.undo}),i.includes(`redo`)&&Y(Ce,{size:`small`,onClick:he,disabled:!be.value,theme:l.peers.Button,themeOverrides:l.peerOverrides.Button},{default:()=>m.value.redo})):null)}return{mergedClsPrefix:a,namespace:o,hsla:ie,rgba:I,mergedShow:_,mergedDisabled:p,isMounted:Se(),adjustedTo:u(e),mergedValue:S,handleTriggerClick(){p.value||v(!0)},setTriggerRef:r,handleClickOutside(e){if(n instanceof Element){if(n.contains(te(e)))return}else if(n&&n.$el.contains(te(e)))return;v(!1)},renderPanel:we,cssVars:s?void 0:H,themeClass:xe?.themeClass,onRender:xe?.onRender}},render(){let{mergedClsPrefix:e,onRender:t}=this;return t?.(),Y(n,null,{default:()=>[Y(r,null,{default:()=>Ue(this.$slots.trigger,{value:this.mergedValue,onClick:this.handleTriggerClick,ref:this.setTriggerRef},t=>t||Y(Ln,{clsPrefix:e,value:this.mergedValue,hsla:this.hsla,style:this.cssVars,ref:this.setTriggerRef,disabled:this.mergedDisabled,class:this.themeClass,onClick:this.mergedDisabled?void 0:this.handleTriggerClick}))}),Y(d,{placement:this.placement,show:this.mergedShow,containerClass:this.namespace,teleportDisabled:this.adjustedTo===u.tdkey,to:this.adjustedTo},{default:()=>Y(ge,{name:`fade-in-scale-up-transition`,appear:this.isMounted},{default:()=>this.mergedShow?O(this.renderPanel(),[[nt,this.handleClickOutside,void 0,{capture:!0}]]):null})})]})}}),Yn=G({name:`NDrawerContent`,inheritAttrs:!1,props:{blockScroll:Boolean,show:{type:Boolean,default:void 0},displayDirective:{type:String,required:!0},placement:{type:String,required:!0},contentClass:String,contentStyle:[Object,String],nativeScrollbar:{type:Boolean,required:!0},scrollbarProps:Object,trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},showMask:{type:[Boolean,String],required:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,onClickoutside:Function,onAfterLeave:Function,onAfterEnter:Function,onEsc:Function},setup(e){let t=L(!!e.show),n=L(null),r=K(we),i=0,a=``,o=null,s=L(!1),c=L(!1),l=U(()=>e.placement===`top`||e.placement===`bottom`),{mergedClsPrefixRef:u,mergedRtlRef:d}=bt(e),f=xe(`Drawer`,d,u),p=S,m=e=>{c.value=!0,i=l.value?e.clientY:e.clientX,a=document.body.style.cursor,document.body.style.cursor=l.value?`ns-resize`:`ew-resize`,document.body.addEventListener(`mousemove`,x),document.body.addEventListener(`mouseleave`,p),document.body.addEventListener(`mouseup`,S)},h=()=>{o!==null&&(window.clearTimeout(o),o=null),c.value?s.value=!0:o=window.setTimeout(()=>{s.value=!0},300)},g=()=>{o!==null&&(window.clearTimeout(o),o=null),s.value=!1},{doUpdateHeight:_,doUpdateWidth:v}=r,y=t=>{let{maxWidth:n}=e;if(n&&t>n)return n;let{minWidth:r}=e;return r&&t<r?r:t},b=t=>{let{maxHeight:n}=e;if(n&&t>n)return n;let{minHeight:r}=e;return r&&t<r?r:t};function x(t){if(c.value)if(l.value){let r=n.value?.offsetHeight||0,a=i-t.clientY;r+=e.placement===`bottom`?a:-a,r=b(r),_(r),i=t.clientY}else{let r=n.value?.offsetWidth||0,a=i-t.clientX;r+=e.placement===`right`?a:-a,r=y(r),v(r),i=t.clientX}}function S(){c.value&&(i=0,c.value=!1,document.body.style.cursor=a,document.body.removeEventListener(`mousemove`,x),document.body.removeEventListener(`mouseup`,S),document.body.removeEventListener(`mouseleave`,p))}ye(()=>{e.show&&(t.value=!0)}),Mt(()=>e.show,e=>{e||S()}),_t(()=>{S()});let C=U(()=>{let{show:t}=e,n=[[F,t]];return e.showMask||n.push([nt,e.onClickoutside,void 0,{capture:!0}]),n});function w(){var n;t.value=!1,(n=e.onAfterLeave)==null||n.call(e)}return j(U(()=>e.blockScroll&&t.value)),Lt(ee,n),Lt(he,null),Lt(zt,null),{bodyRef:n,rtlEnabled:f,mergedClsPrefix:r.mergedClsPrefixRef,isMounted:r.isMountedRef,mergedTheme:r.mergedThemeRef,displayed:t,transitionName:U(()=>({right:`slide-in-from-right-transition`,left:`slide-in-from-left-transition`,top:`slide-in-from-top-transition`,bottom:`slide-in-from-bottom-transition`})[e.placement]),handleAfterLeave:w,bodyDirectives:C,handleMousedownResizeTrigger:m,handleMouseenterResizeTrigger:h,handleMouseleaveResizeTrigger:g,isDragging:c,isHoverOnResizeTrigger:s}},render(){let{$slots:e,mergedClsPrefix:t}=this;return this.displayDirective===`show`||this.displayed||this.show?O(Y(`div`,{role:`none`},Y(be,{disabled:!this.showMask||!this.trapFocus,active:this.show,autoFocus:this.autoFocus,onEsc:this.onEsc},{default:()=>Y(ge,{name:this.transitionName,appear:this.isMounted,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>O(Y(`div`,at(this.$attrs,{role:`dialog`,ref:`bodyRef`,"aria-modal":`true`,class:[`${t}-drawer`,this.rtlEnabled&&`${t}-drawer--rtl`,`${t}-drawer--${this.placement}-placement`,this.isDragging&&`${t}-drawer--unselectable`,this.nativeScrollbar&&`${t}-drawer--native-scrollbar`]}),[this.resizable?Y(`div`,{class:[`${t}-drawer__resize-trigger`,(this.isDragging||this.isHoverOnResizeTrigger)&&`${t}-drawer__resize-trigger--hover`],onMouseenter:this.handleMouseenterResizeTrigger,onMouseleave:this.handleMouseleaveResizeTrigger,onMousedown:this.handleMousedownResizeTrigger}):null,this.nativeScrollbar?Y(`div`,{class:[`${t}-drawer-content-wrapper`,this.contentClass],style:this.contentStyle,role:`none`},e):Y(tt,Object.assign({},this.scrollbarProps,{contentStyle:this.contentStyle,contentClass:[`${t}-drawer-content-wrapper`,this.contentClass],theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar}),e)]),this.bodyDirectives)})})),[[F,this.displayDirective===`if`||this.displayed||this.show]]):null}}),{cubicBezierEaseIn:Xn,cubicBezierEaseOut:Zn}=Pt;function Qn({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-bottom`}={}){return[Q(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${Xn}`}),Q(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${Zn}`}),Q(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),Q(`&.${n}-transition-enter-from`,{transform:`translateY(100%)`}),Q(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),Q(`&.${n}-transition-leave-to`,{transform:`translateY(100%)`})]}var{cubicBezierEaseIn:$n,cubicBezierEaseOut:er}=Pt;function tr({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-left`}={}){return[Q(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${$n}`}),Q(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${er}`}),Q(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),Q(`&.${n}-transition-enter-from`,{transform:`translateX(-100%)`}),Q(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),Q(`&.${n}-transition-leave-to`,{transform:`translateX(-100%)`})]}var{cubicBezierEaseIn:nr,cubicBezierEaseOut:rr}=Pt;function ir({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-right`}={}){return[Q(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${nr}`}),Q(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${rr}`}),Q(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),Q(`&.${n}-transition-enter-from`,{transform:`translateX(100%)`}),Q(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),Q(`&.${n}-transition-leave-to`,{transform:`translateX(100%)`})]}var{cubicBezierEaseIn:ar,cubicBezierEaseOut:or}=Pt;function sr({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-top`}={}){return[Q(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ar}`}),Q(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${or}`}),Q(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),Q(`&.${n}-transition-enter-from`,{transform:`translateY(-100%)`}),Q(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),Q(`&.${n}-transition-leave-to`,{transform:`translateY(-100%)`})]}var cr=Q([H(`drawer`,`
 word-break: break-word;
 line-height: var(--n-line-height);
 position: absolute;
 pointer-events: all;
 box-shadow: var(--n-box-shadow);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 background-color: var(--n-color);
 color: var(--n-text-color);
 box-sizing: border-box;
 `,[ir(),tr(),sr(),Qn(),z(`unselectable`,`
 user-select: none; 
 -webkit-user-select: none;
 `),z(`native-scrollbar`,[H(`drawer-content-wrapper`,`
 overflow: auto;
 height: 100%;
 `)]),k(`resize-trigger`,`
 position: absolute;
 background-color: #0000;
 transition: background-color .3s var(--n-bezier);
 `,[z(`hover`,`
 background-color: var(--n-resize-trigger-color-hover);
 `)]),H(`drawer-content-wrapper`,`
 box-sizing: border-box;
 `),H(`drawer-content`,`
 height: 100%;
 display: flex;
 flex-direction: column;
 `,[z(`native-scrollbar`,[H(`drawer-body-content-wrapper`,`
 height: 100%;
 overflow: auto;
 `)]),H(`drawer-body`,`
 flex: 1 0 0;
 overflow: hidden;
 `),H(`drawer-body-content-wrapper`,`
 box-sizing: border-box;
 padding: var(--n-body-padding);
 `),H(`drawer-header`,`
 font-weight: var(--n-title-font-weight);
 line-height: 1;
 font-size: var(--n-title-font-size);
 color: var(--n-title-text-color);
 padding: var(--n-header-padding);
 transition: border .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-divider-color);
 border-bottom: var(--n-header-border-bottom);
 display: flex;
 justify-content: space-between;
 align-items: center;
 `,[k(`main`,`
 flex: 1;
 `),k(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),H(`drawer-footer`,`
 display: flex;
 justify-content: flex-end;
 border-top: var(--n-footer-border-top);
 transition: border .3s var(--n-bezier);
 padding: var(--n-footer-padding);
 `)]),z(`right-placement`,`
 top: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-bottom-left-radius: var(--n-border-radius);
 `,[k(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 left: 0;
 transform: translateX(-1.5px);
 cursor: ew-resize;
 `)]),z(`left-placement`,`
 top: 0;
 bottom: 0;
 left: 0;
 border-top-right-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[k(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 right: 0;
 transform: translateX(1.5px);
 cursor: ew-resize;
 `)]),z(`top-placement`,`
 top: 0;
 left: 0;
 right: 0;
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[k(`resize-trigger`,`
 width: 100%;
 height: 3px;
 bottom: 0;
 left: 0;
 transform: translateY(1.5px);
 cursor: ns-resize;
 `)]),z(`bottom-placement`,`
 left: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 `,[k(`resize-trigger`,`
 width: 100%;
 height: 3px;
 top: 0;
 left: 0;
 transform: translateY(-1.5px);
 cursor: ns-resize;
 `)])]),Q(`body`,[Q(`>`,[H(`drawer-container`,`
 position: fixed;
 `)])]),H(`drawer-container`,`
 position: relative;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 `,[Q(`> *`,`
 pointer-events: all;
 `)]),H(`drawer-mask`,`
 background-color: rgba(0, 0, 0, .3);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[z(`invisible`,`
 background-color: rgba(0, 0, 0, 0)
 `),Ve({enterDuration:`0.2s`,leaveDuration:`0.2s`,enterCubicBezier:`var(--n-bezier-in)`,leaveCubicBezier:`var(--n-bezier-out)`})])]),lr=G({name:`Drawer`,inheritAttrs:!1,props:Object.assign(Object.assign({},V.props),{show:Boolean,width:[Number,String],height:[Number,String],placement:{type:String,default:`right`},maskClosable:{type:Boolean,default:!0},showMask:{type:[Boolean,String],default:!0},to:[String,Object],displayDirective:{type:String,default:`if`},nativeScrollbar:{type:Boolean,default:!0},zIndex:Number,onMaskClick:Function,scrollbarProps:Object,contentClass:String,contentStyle:[Object,String],trapFocus:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,defaultWidth:{type:[Number,String],default:251},defaultHeight:{type:[Number,String],default:251},onUpdateWidth:[Function,Array],onUpdateHeight:[Function,Array],"onUpdate:width":[Function,Array],"onUpdate:height":[Function,Array],"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,drawerStyle:[String,Object],drawerClass:String,target:null,onShow:Function,onHide:Function}),setup(e){let{mergedClsPrefixRef:t,namespaceRef:n,inlineThemeDisabled:r}=bt(e),i=Se(),a=V(`Drawer`,`-drawer`,cr,st,e,t),o=L(e.defaultWidth),s=L(e.defaultHeight),c=f(B(e,`width`),o),l=f(B(e,`height`),s),u=U(()=>{let{placement:t}=e;return t===`top`||t===`bottom`?``:m(c.value)}),d=U(()=>{let{placement:t}=e;return t===`left`||t===`right`?``:m(l.value)}),p=t=>{let{onUpdateWidth:n,"onUpdate:width":r}=e;n&&Z(n,t),r&&Z(r,t),o.value=t},h=t=>{let{onUpdateHeight:n,"onUpdate:width":r}=e;n&&Z(n,t),r&&Z(r,t),s.value=t},g=U(()=>[{width:u.value,height:d.value},e.drawerStyle||``]);function _(t){let{onMaskClick:n,maskClosable:r}=e;r&&x(!1),n&&n(t)}function v(e){_(e)}let y=ie();function b(t){var n;(n=e.onEsc)==null||n.call(e),e.show&&e.closeOnEsc&&ve(t)&&(y.value||x(!1))}function x(t){let{onHide:n,onUpdateShow:r,"onUpdate:show":i}=e;r&&Z(r,t),i&&Z(i,t),n&&!t&&Z(n,t)}Lt(we,{isMountedRef:i,mergedThemeRef:a,mergedClsPrefixRef:t,doUpdateShow:x,doUpdateHeight:h,doUpdateWidth:p});let S=U(()=>{let{common:{cubicBezierEaseInOut:e,cubicBezierEaseIn:t,cubicBezierEaseOut:n},self:{color:r,textColor:i,boxShadow:o,lineHeight:s,headerPadding:c,footerPadding:l,borderRadius:u,bodyPadding:d,titleFontSize:f,titleTextColor:p,titleFontWeight:m,headerBorderBottom:h,footerBorderTop:g,closeIconColor:_,closeIconColorHover:v,closeIconColorPressed:y,closeColorHover:b,closeColorPressed:x,closeIconSize:S,closeSize:C,closeBorderRadius:w,resizableTriggerColorHover:T}}=a.value;return{"--n-line-height":s,"--n-color":r,"--n-border-radius":u,"--n-text-color":i,"--n-box-shadow":o,"--n-bezier":e,"--n-bezier-out":n,"--n-bezier-in":t,"--n-header-padding":c,"--n-body-padding":d,"--n-footer-padding":l,"--n-title-text-color":p,"--n-title-font-size":f,"--n-title-font-weight":m,"--n-header-border-bottom":h,"--n-footer-border-top":g,"--n-close-icon-color":_,"--n-close-icon-color-hover":v,"--n-close-icon-color-pressed":y,"--n-close-size":C,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-icon-size":S,"--n-close-border-radius":w,"--n-resize-trigger-color-hover":T}}),C=r?pt(`drawer`,void 0,S,e):void 0;return{mergedClsPrefix:t,namespace:n,mergedBodyStyle:g,handleOutsideClick:v,handleMaskClick:_,handleEsc:b,mergedTheme:a,cssVars:r?void 0:S,themeClass:C?.themeClass,onRender:C?.onRender,isMounted:i}},render(){let{mergedClsPrefix:e}=this;return Y(R,{to:this.to,show:this.show},{default:()=>{var t;return(t=this.onRender)==null||t.call(this),O(Y(`div`,{class:[`${e}-drawer-container`,this.namespace,this.themeClass],style:this.cssVars,role:`none`},this.showMask?Y(ge,{name:`fade-in-transition`,appear:this.isMounted},{default:()=>this.show?Y(`div`,{"aria-hidden":!0,class:[`${e}-drawer-mask`,this.showMask===`transparent`&&`${e}-drawer-mask--invisible`],onClick:this.handleMaskClick}):null}):null,Y(Yn,Object.assign({},this.$attrs,{class:[this.drawerClass,this.$attrs.class],style:[this.mergedBodyStyle,this.$attrs.style],blockScroll:this.blockScroll,contentStyle:this.contentStyle,contentClass:this.contentClass,placement:this.placement,scrollbarProps:this.scrollbarProps,show:this.show,displayDirective:this.displayDirective,nativeScrollbar:this.nativeScrollbar,onAfterEnter:this.onAfterEnter,onAfterLeave:this.onAfterLeave,trapFocus:this.trapFocus,autoFocus:this.autoFocus,resizable:this.resizable,maxHeight:this.maxHeight,minHeight:this.minHeight,maxWidth:this.maxWidth,minWidth:this.minWidth,showMask:this.showMask,onEsc:this.handleEsc,onClickoutside:this.handleOutsideClick}),this.$slots)),[[T,{zIndex:this.zIndex,enabled:this.show}]])}})}}),ur=G({name:`DrawerContent`,props:{title:String,headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],bodyClass:String,bodyStyle:[Object,String],bodyContentClass:String,bodyContentStyle:[Object,String],nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,closable:Boolean},slots:Object,setup(){let e=K(we,null);e||Ie(`drawer-content`,"`n-drawer-content` must be placed inside `n-drawer`.");let{doUpdateShow:t}=e;function n(){t(!1)}return{handleCloseClick:n,mergedTheme:e.mergedThemeRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){let{title:e,mergedClsPrefix:t,nativeScrollbar:n,mergedTheme:r,bodyClass:i,bodyStyle:a,bodyContentClass:o,bodyContentStyle:s,headerClass:c,headerStyle:l,footerClass:u,footerStyle:d,scrollbarProps:f,closable:p,$slots:m}=this;return Y(`div`,{role:`none`,class:[`${t}-drawer-content`,n&&`${t}-drawer-content--native-scrollbar`]},m.header||e||p?Y(`div`,{class:[`${t}-drawer-header`,c],style:l,role:`none`},Y(`div`,{class:`${t}-drawer-header__main`,role:`heading`,"aria-level":`1`},m.header===void 0?e:m.header()),p&&Y(Ye,{onClick:this.handleCloseClick,clsPrefix:t,class:`${t}-drawer-header__close`,absolute:!0})):null,n?Y(`div`,{class:[`${t}-drawer-body`,i],style:a,role:`none`},Y(`div`,{class:[`${t}-drawer-body-content-wrapper`,o],style:s,role:`none`},m)):Y(tt,Object.assign({themeOverrides:r.peerOverrides.Scrollbar,theme:r.peers.Scrollbar},f,{class:`${t}-drawer-body`,contentClass:[`${t}-drawer-body-content-wrapper`,o],contentStyle:s}),m),m.footer?Y(`div`,{class:[`${t}-drawer-footer`,u],style:d,role:`none`},m.footer()):null)}});function dr(e){let{baseColor:t,textColor2:n,bodyColor:r,cardColor:i,dividerColor:a,actionColor:o,scrollbarColor:s,scrollbarColorHover:c,invertedColor:l}=e;return{textColor:n,textColorInverted:`#FFF`,color:r,colorEmbedded:o,headerColor:i,headerColorInverted:l,footerColor:o,footerColorInverted:l,headerBorderColor:a,headerBorderColorInverted:l,footerBorderColor:a,footerBorderColorInverted:l,siderBorderColor:a,siderBorderColorInverted:l,siderColor:i,siderColorInverted:l,siderToggleButtonBorder:`1px solid ${a}`,siderToggleButtonColor:t,siderToggleButtonIconColor:n,siderToggleButtonIconColorInverted:n,siderToggleBarColor:Ke(r,s),siderToggleBarColorHover:Ke(r,c),__invertScrollbar:`true`}}var fr=It({name:`Layout`,common:wt,peers:{Scrollbar:gt},self:dr});function pr(e){let{railColor:t,primaryColor:n,baseColor:r,cardColor:i,modalColor:a,popoverColor:o,borderRadius:s,fontSize:c,opacityDisabled:l}=e;return Object.assign(Object.assign({},Re),{fontSize:c,markFontSize:c,railColor:t,railColorHover:t,fillColor:n,fillColorHover:n,opacityDisabled:l,handleColor:`#FFF`,dotColor:i,dotColorModal:a,dotColorPopover:o,handleBoxShadow:`0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)`,handleBoxShadowHover:`0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)`,handleBoxShadowActive:`0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)`,handleBoxShadowFocus:`0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)`,indicatorColor:`rgba(0, 0, 0, .85)`,indicatorBoxShadow:`0 2px 8px 0 rgba(0, 0, 0, 0.12)`,indicatorTextColor:r,indicatorBorderRadius:s,dotBorder:`2px solid ${t}`,dotBorderActive:`2px solid ${n}`,dotBoxShadow:``})}var mr={name:`Slider`,common:wt,self:pr},hr=P(`n-layout-sider`),gr={type:String,default:`static`},_r=H(`layout`,`
 color: var(--n-text-color);
 background-color: var(--n-color);
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 flex: auto;
 overflow: hidden;
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
`,[H(`layout-scroll-container`,`
 overflow-x: hidden;
 box-sizing: border-box;
 height: 100%;
 `),z(`absolute-positioned`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),vr={embedded:Boolean,position:gr,nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,onScroll:Function,contentClass:String,contentStyle:{type:[String,Object],default:``},hasSider:Boolean,siderPlacement:{type:String,default:`left`}},yr=P(`n-layout`);function br(e){return G({name:e?`LayoutContent`:`Layout`,props:Object.assign(Object.assign({},V.props),vr),setup(e){let t=L(null),n=L(null),{mergedClsPrefixRef:r,inlineThemeDisabled:i}=bt(e),a=V(`Layout`,`-layout`,_r,fr,e,r);function o(r,i){if(e.nativeScrollbar){let{value:e}=t;e&&(i===void 0?e.scrollTo(r):e.scrollTo(r,i))}else{let{value:e}=n;e&&e.scrollTo(r,i)}}Lt(yr,e);let s=0,c=0,l=t=>{var n;let r=t.target;s=r.scrollLeft,c=r.scrollTop,(n=e.onScroll)==null||n.call(e,t)};fe(()=>{if(e.nativeScrollbar){let e=t.value;e&&(e.scrollTop=c,e.scrollLeft=s)}});let u={display:`flex`,flexWrap:`nowrap`,width:`100%`,flexDirection:`row`},d={scrollTo:o},f=U(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=a.value;return{"--n-bezier":t,"--n-color":e.embedded?n.colorEmbedded:n.color,"--n-text-color":n.textColor}}),p=i?pt(`layout`,U(()=>e.embedded?`e`:``),f,e):void 0;return Object.assign({mergedClsPrefix:r,scrollableElRef:t,scrollbarInstRef:n,hasSiderStyle:u,mergedTheme:a,handleNativeElScroll:l,cssVars:i?void 0:f,themeClass:p?.themeClass,onRender:p?.onRender},d)},render(){var t;let{mergedClsPrefix:n,hasSider:r}=this;(t=this.onRender)==null||t.call(this);let i=r?this.hasSiderStyle:void 0;return Y(`div`,{class:[this.themeClass,e&&`${n}-layout-content`,`${n}-layout`,`${n}-layout--${this.position}-positioned`],style:this.cssVars},this.nativeScrollbar?Y(`div`,{ref:`scrollableElRef`,class:[`${n}-layout-scroll-container`,this.contentClass],style:[this.contentStyle,i],onScroll:this.handleNativeElScroll},this.$slots):Y(tt,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:`scrollbarInstRef`,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:this.contentClass,contentStyle:[this.contentStyle,i]}),this.$slots))}})}var xr=br(!1),Sr=br(!0),Cr=H(`layout-header`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 box-sizing: border-box;
 width: 100%;
 background-color: var(--n-color);
 color: var(--n-text-color);
`,[z(`absolute-positioned`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 `),z(`bordered`,`
 border-bottom: solid 1px var(--n-border-color);
 `)]),wr={position:gr,inverted:Boolean,bordered:{type:Boolean,default:!1}},Tr=G({name:`LayoutHeader`,props:Object.assign(Object.assign({},V.props),wr),setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=bt(e),r=V(`Layout`,`-layout-header`,Cr,fr,e,t),i=U(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=r.value,i={"--n-bezier":t};return e.inverted?(i[`--n-color`]=n.headerColorInverted,i[`--n-text-color`]=n.textColorInverted,i[`--n-border-color`]=n.headerBorderColorInverted):(i[`--n-color`]=n.headerColor,i[`--n-text-color`]=n.textColor,i[`--n-border-color`]=n.headerBorderColor),i}),a=n?pt(`layout-header`,U(()=>e.inverted?`a`:`b`),i,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){var e;let{mergedClsPrefix:t}=this;return(e=this.onRender)==null||e.call(this),Y(`div`,{class:[`${t}-layout-header`,this.themeClass,this.position&&`${t}-layout-header--${this.position}-positioned`,this.bordered&&`${t}-layout-header--bordered`],style:this.cssVars},this.$slots)}}),Er=H(`layout-sider`,`
 flex-shrink: 0;
 box-sizing: border-box;
 position: relative;
 z-index: 1;
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 min-width .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 transform .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 display: flex;
 justify-content: flex-end;
`,[z(`bordered`,[k(`border`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 1px;
 background-color: var(--n-border-color);
 transition: background-color .3s var(--n-bezier);
 `)]),k(`left-placement`,[z(`bordered`,[k(`border`,`
 right: 0;
 `)])]),z(`right-placement`,`
 justify-content: flex-start;
 `,[z(`bordered`,[k(`border`,`
 left: 0;
 `)]),z(`collapsed`,[H(`layout-toggle-button`,[H(`base-icon`,`
 transform: rotate(180deg);
 `)]),H(`layout-toggle-bar`,[Q(`&:hover`,[k(`top`,{transform:`rotate(-12deg) scale(1.15) translateY(-2px)`}),k(`bottom`,{transform:`rotate(12deg) scale(1.15) translateY(2px)`})])])]),H(`layout-toggle-button`,`
 left: 0;
 transform: translateX(-50%) translateY(-50%);
 `,[H(`base-icon`,`
 transform: rotate(0);
 `)]),H(`layout-toggle-bar`,`
 left: -28px;
 transform: rotate(180deg);
 `,[Q(`&:hover`,[k(`top`,{transform:`rotate(12deg) scale(1.15) translateY(-2px)`}),k(`bottom`,{transform:`rotate(-12deg) scale(1.15) translateY(2px)`})])])]),z(`collapsed`,[H(`layout-toggle-bar`,[Q(`&:hover`,[k(`top`,{transform:`rotate(-12deg) scale(1.15) translateY(-2px)`}),k(`bottom`,{transform:`rotate(12deg) scale(1.15) translateY(2px)`})])]),H(`layout-toggle-button`,[H(`base-icon`,`
 transform: rotate(0);
 `)])]),H(`layout-toggle-button`,`
 transition:
 color .3s var(--n-bezier),
 right .3s var(--n-bezier),
 left .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 cursor: pointer;
 width: 24px;
 height: 24px;
 position: absolute;
 top: 50%;
 right: 0;
 border-radius: 50%;
 display: flex;
 align-items: center;
 justify-content: center;
 font-size: 18px;
 color: var(--n-toggle-button-icon-color);
 border: var(--n-toggle-button-border);
 background-color: var(--n-toggle-button-color);
 box-shadow: 0 2px 4px 0px rgba(0, 0, 0, .06);
 transform: translateX(50%) translateY(-50%);
 z-index: 1;
 `,[H(`base-icon`,`
 transition: transform .3s var(--n-bezier);
 transform: rotate(180deg);
 `)]),H(`layout-toggle-bar`,`
 cursor: pointer;
 height: 72px;
 width: 32px;
 position: absolute;
 top: calc(50% - 36px);
 right: -28px;
 `,[k(`top, bottom`,`
 position: absolute;
 width: 4px;
 border-radius: 2px;
 height: 38px;
 left: 14px;
 transition: 
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),k(`bottom`,`
 position: absolute;
 top: 34px;
 `),Q(`&:hover`,[k(`top`,{transform:`rotate(12deg) scale(1.15) translateY(-2px)`}),k(`bottom`,{transform:`rotate(-12deg) scale(1.15) translateY(2px)`})]),k(`top, bottom`,{backgroundColor:`var(--n-toggle-bar-color)`}),Q(`&:hover`,[k(`top, bottom`,{backgroundColor:`var(--n-toggle-bar-color-hover)`})])]),k(`border`,`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 width: 1px;
 transition: background-color .3s var(--n-bezier);
 `),H(`layout-sider-scroll-container`,`
 flex-grow: 1;
 flex-shrink: 0;
 box-sizing: border-box;
 height: 100%;
 opacity: 0;
 transition: opacity .3s var(--n-bezier);
 max-width: 100%;
 `),z(`show-content`,[H(`layout-sider-scroll-container`,{opacity:1})]),z(`absolute-positioned`,`
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 `)]),Dr=G({props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){let{clsPrefix:e}=this;return Y(`div`,{onClick:this.onClick,class:`${e}-layout-toggle-bar`},Y(`div`,{class:`${e}-layout-toggle-bar__top`}),Y(`div`,{class:`${e}-layout-toggle-bar__bottom`}))}}),Or=G({name:`LayoutToggleButton`,props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){let{clsPrefix:e}=this;return Y(`div`,{class:`${e}-layout-toggle-button`,onClick:this.onClick},Y(Le,{clsPrefix:e},{default:()=>Y(h,null)}))}}),kr={position:gr,bordered:Boolean,collapsedWidth:{type:Number,default:48},width:{type:[Number,String],default:272},contentClass:String,contentStyle:{type:[String,Object],default:``},collapseMode:{type:String,default:`transform`},collapsed:{type:Boolean,default:void 0},defaultCollapsed:Boolean,showCollapsedContent:{type:Boolean,default:!0},showTrigger:{type:[Boolean,String],default:!1},nativeScrollbar:{type:Boolean,default:!0},inverted:Boolean,scrollbarProps:Object,triggerClass:String,triggerStyle:[String,Object],collapsedTriggerClass:String,collapsedTriggerStyle:[String,Object],"onUpdate:collapsed":[Function,Array],onUpdateCollapsed:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,onExpand:[Function,Array],onCollapse:[Function,Array],onScroll:Function},Ar=G({name:`LayoutSider`,props:Object.assign(Object.assign({},V.props),kr),setup(e){let t=K(yr),n=L(null),r=L(null),i=L(e.defaultCollapsed),a=f(B(e,`collapsed`),i),o=U(()=>m(a.value?e.collapsedWidth:e.width)),s=U(()=>e.collapseMode===`transform`?{minWidth:m(e.width)}:{}),c=U(()=>t?t.siderPlacement:`left`);function l(t,i){if(e.nativeScrollbar){let{value:e}=n;e&&(i===void 0?e.scrollTo(t):e.scrollTo(t,i))}else{let{value:e}=r;e&&e.scrollTo(t,i)}}function u(){let{"onUpdate:collapsed":t,onUpdateCollapsed:n,onExpand:r,onCollapse:o}=e,{value:s}=a;n&&Z(n,!s),t&&Z(t,!s),i.value=!s,s?r&&Z(r):o&&Z(o)}let d=0,p=0,h=t=>{var n;let r=t.target;d=r.scrollLeft,p=r.scrollTop,(n=e.onScroll)==null||n.call(e,t)};fe(()=>{if(e.nativeScrollbar){let e=n.value;e&&(e.scrollTop=p,e.scrollLeft=d)}}),Lt(hr,{collapsedRef:a,collapseModeRef:B(e,`collapseMode`)});let{mergedClsPrefixRef:g,inlineThemeDisabled:_}=bt(e),v=V(`Layout`,`-layout-sider`,Er,fr,e,g);function y(t){var n,r;t.propertyName===`max-width`&&(a.value?(n=e.onAfterLeave)==null||n.call(e):(r=e.onAfterEnter)==null||r.call(e))}let b={scrollTo:l},x=U(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=v.value,{siderToggleButtonColor:r,siderToggleButtonBorder:i,siderToggleBarColor:a,siderToggleBarColorHover:o}=n,s={"--n-bezier":t,"--n-toggle-button-color":r,"--n-toggle-button-border":i,"--n-toggle-bar-color":a,"--n-toggle-bar-color-hover":o};return e.inverted?(s[`--n-color`]=n.siderColorInverted,s[`--n-text-color`]=n.textColorInverted,s[`--n-border-color`]=n.siderBorderColorInverted,s[`--n-toggle-button-icon-color`]=n.siderToggleButtonIconColorInverted,s.__invertScrollbar=n.__invertScrollbar):(s[`--n-color`]=n.siderColor,s[`--n-text-color`]=n.textColor,s[`--n-border-color`]=n.siderBorderColor,s[`--n-toggle-button-icon-color`]=n.siderToggleButtonIconColor),s}),S=_?pt(`layout-sider`,U(()=>e.inverted?`a`:`b`),x,e):void 0;return Object.assign({scrollableElRef:n,scrollbarInstRef:r,mergedClsPrefix:g,mergedTheme:v,styleMaxWidth:o,mergedCollapsed:a,scrollContainerStyle:s,siderPlacement:c,handleNativeElScroll:h,handleTransitionend:y,handleTriggerClick:u,inlineThemeDisabled:_,cssVars:x,themeClass:S?.themeClass,onRender:S?.onRender},b)},render(){var e;let{mergedClsPrefix:t,mergedCollapsed:n,showTrigger:r}=this;return(e=this.onRender)==null||e.call(this),Y(`aside`,{class:[`${t}-layout-sider`,this.themeClass,`${t}-layout-sider--${this.position}-positioned`,`${t}-layout-sider--${this.siderPlacement}-placement`,this.bordered&&`${t}-layout-sider--bordered`,n&&`${t}-layout-sider--collapsed`,(!n||this.showCollapsedContent)&&`${t}-layout-sider--show-content`],onTransitionend:this.handleTransitionend,style:[this.inlineThemeDisabled?void 0:this.cssVars,{maxWidth:this.styleMaxWidth,width:m(this.width)}]},this.nativeScrollbar?Y(`div`,{class:[`${t}-layout-sider-scroll-container`,this.contentClass],onScroll:this.handleNativeElScroll,style:[this.scrollContainerStyle,{overflow:`auto`},this.contentStyle],ref:`scrollableElRef`},this.$slots):Y(tt,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:`scrollbarInstRef`,style:this.scrollContainerStyle,contentStyle:this.contentStyle,contentClass:this.contentClass,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,builtinThemeOverrides:this.inverted&&this.cssVars.__invertScrollbar===`true`?{colorHover:`rgba(255, 255, 255, .4)`,color:`rgba(255, 255, 255, .3)`}:void 0}),this.$slots),r?Y(r===`bar`?Dr:Or,{clsPrefix:t,class:n?this.collapsedTriggerClass:this.triggerClass,style:n?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):null,this.bordered?Y(`div`,{class:`${t}-layout-sider__border`}):null)}}),jr=P(`n-menu`),Mr=P(`n-submenu`),Nr=P(`n-menu-item-group`),Pr=[Q(`&::before`,`background-color: var(--n-item-color-hover);`),k(`arrow`,`
 color: var(--n-arrow-color-hover);
 `),k(`icon`,`
 color: var(--n-item-icon-color-hover);
 `),H(`menu-item-content-header`,`
 color: var(--n-item-text-color-hover);
 `,[Q(`a`,`
 color: var(--n-item-text-color-hover);
 `),k(`extra`,`
 color: var(--n-item-text-color-hover);
 `)])],Fr=[k(`icon`,`
 color: var(--n-item-icon-color-hover-horizontal);
 `),H(`menu-item-content-header`,`
 color: var(--n-item-text-color-hover-horizontal);
 `,[Q(`a`,`
 color: var(--n-item-text-color-hover-horizontal);
 `),k(`extra`,`
 color: var(--n-item-text-color-hover-horizontal);
 `)])],Ir=Q([H(`menu`,`
 background-color: var(--n-color);
 color: var(--n-item-text-color);
 overflow: hidden;
 transition: background-color .3s var(--n-bezier);
 box-sizing: border-box;
 font-size: var(--n-font-size);
 padding-bottom: 6px;
 `,[z(`horizontal`,`
 max-width: 100%;
 width: 100%;
 display: flex;
 overflow: hidden;
 padding-bottom: 0;
 `,[H(`submenu`,`margin: 0;`),H(`menu-item`,`margin: 0;`),H(`menu-item-content`,`
 padding: 0 20px;
 border-bottom: 2px solid #0000;
 `,[Q(`&::before`,`display: none;`),z(`selected`,`border-bottom: 2px solid var(--n-border-color-horizontal)`)]),H(`menu-item-content`,[z(`selected`,[k(`icon`,`color: var(--n-item-icon-color-active-horizontal);`),H(`menu-item-content-header`,`
 color: var(--n-item-text-color-active-horizontal);
 `,[Q(`a`,`color: var(--n-item-text-color-active-horizontal);`),k(`extra`,`color: var(--n-item-text-color-active-horizontal);`)])]),z(`child-active`,`
 border-bottom: 2px solid var(--n-border-color-horizontal);
 `,[H(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active-horizontal);
 `,[Q(`a`,`
 color: var(--n-item-text-color-child-active-horizontal);
 `),k(`extra`,`
 color: var(--n-item-text-color-child-active-horizontal);
 `)]),k(`icon`,`
 color: var(--n-item-icon-color-child-active-horizontal);
 `)]),it(`disabled`,[it(`selected, child-active`,[Q(`&:focus-within`,Fr)]),z(`selected`,[Lr(null,[k(`icon`,`color: var(--n-item-icon-color-active-hover-horizontal);`),H(`menu-item-content-header`,`
 color: var(--n-item-text-color-active-hover-horizontal);
 `,[Q(`a`,`color: var(--n-item-text-color-active-hover-horizontal);`),k(`extra`,`color: var(--n-item-text-color-active-hover-horizontal);`)])])]),z(`child-active`,[Lr(null,[k(`icon`,`color: var(--n-item-icon-color-child-active-hover-horizontal);`),H(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active-hover-horizontal);
 `,[Q(`a`,`color: var(--n-item-text-color-child-active-hover-horizontal);`),k(`extra`,`color: var(--n-item-text-color-child-active-hover-horizontal);`)])])]),Lr(`border-bottom: 2px solid var(--n-border-color-horizontal);`,Fr)]),H(`menu-item-content-header`,[Q(`a`,`color: var(--n-item-text-color-horizontal);`)])])]),it(`responsive`,[H(`menu-item-content-header`,`
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),z(`collapsed`,[H(`menu-item-content`,[z(`selected`,[Q(`&::before`,`
 background-color: var(--n-item-color-active-collapsed) !important;
 `)]),H(`menu-item-content-header`,`opacity: 0;`),k(`arrow`,`opacity: 0;`),k(`icon`,`color: var(--n-item-icon-color-collapsed);`)])]),H(`menu-item`,`
 height: var(--n-item-height);
 margin-top: 6px;
 position: relative;
 `),H(`menu-item-content`,`
 box-sizing: border-box;
 line-height: 1.75;
 height: 100%;
 display: grid;
 grid-template-areas: "icon content arrow";
 grid-template-columns: auto 1fr auto;
 align-items: center;
 cursor: pointer;
 position: relative;
 padding-right: 18px;
 transition:
 background-color .3s var(--n-bezier),
 padding-left .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[Q(`> *`,`z-index: 1;`),Q(`&::before`,`
 z-index: auto;
 content: "";
 background-color: #0000;
 position: absolute;
 left: 8px;
 right: 8px;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),z(`disabled`,`
 opacity: .45;
 cursor: not-allowed;
 `),z(`collapsed`,[k(`arrow`,`transform: rotate(0);`)]),z(`selected`,[Q(`&::before`,`background-color: var(--n-item-color-active);`),k(`arrow`,`color: var(--n-arrow-color-active);`),k(`icon`,`color: var(--n-item-icon-color-active);`),H(`menu-item-content-header`,`
 color: var(--n-item-text-color-active);
 `,[Q(`a`,`color: var(--n-item-text-color-active);`),k(`extra`,`color: var(--n-item-text-color-active);`)])]),z(`child-active`,[H(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active);
 `,[Q(`a`,`
 color: var(--n-item-text-color-child-active);
 `),k(`extra`,`
 color: var(--n-item-text-color-child-active);
 `)]),k(`arrow`,`
 color: var(--n-arrow-color-child-active);
 `),k(`icon`,`
 color: var(--n-item-icon-color-child-active);
 `)]),it(`disabled`,[it(`selected, child-active`,[Q(`&:focus-within`,Pr)]),z(`selected`,[Lr(null,[k(`arrow`,`color: var(--n-arrow-color-active-hover);`),k(`icon`,`color: var(--n-item-icon-color-active-hover);`),H(`menu-item-content-header`,`
 color: var(--n-item-text-color-active-hover);
 `,[Q(`a`,`color: var(--n-item-text-color-active-hover);`),k(`extra`,`color: var(--n-item-text-color-active-hover);`)])])]),z(`child-active`,[Lr(null,[k(`arrow`,`color: var(--n-arrow-color-child-active-hover);`),k(`icon`,`color: var(--n-item-icon-color-child-active-hover);`),H(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active-hover);
 `,[Q(`a`,`color: var(--n-item-text-color-child-active-hover);`),k(`extra`,`color: var(--n-item-text-color-child-active-hover);`)])])]),z(`selected`,[Lr(null,[Q(`&::before`,`background-color: var(--n-item-color-active-hover);`)])]),Lr(null,Pr)]),k(`icon`,`
 grid-area: icon;
 color: var(--n-item-icon-color);
 transition:
 color .3s var(--n-bezier),
 font-size .3s var(--n-bezier),
 margin-right .3s var(--n-bezier);
 box-sizing: content-box;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 `),k(`arrow`,`
 grid-area: arrow;
 font-size: 16px;
 color: var(--n-arrow-color);
 transform: rotate(180deg);
 opacity: 1;
 transition:
 color .3s var(--n-bezier),
 transform 0.2s var(--n-bezier),
 opacity 0.2s var(--n-bezier);
 `),H(`menu-item-content-header`,`
 grid-area: content;
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 opacity: 1;
 white-space: nowrap;
 color: var(--n-item-text-color);
 `,[Q(`a`,`
 outline: none;
 text-decoration: none;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `,[Q(`&::before`,`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),k(`extra`,`
 font-size: .93em;
 color: var(--n-group-text-color);
 transition: color .3s var(--n-bezier);
 `)])]),H(`submenu`,`
 cursor: pointer;
 position: relative;
 margin-top: 6px;
 `,[H(`menu-item-content`,`
 height: var(--n-item-height);
 `),H(`submenu-children`,`
 overflow: hidden;
 padding: 0;
 `,[oe({duration:`.2s`})])]),H(`menu-item-group`,[H(`menu-item-group-title`,`
 margin-top: 6px;
 color: var(--n-group-text-color);
 cursor: default;
 font-size: .93em;
 height: 36px;
 display: flex;
 align-items: center;
 transition:
 padding-left .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)])]),H(`menu-tooltip`,[Q(`a`,`
 color: inherit;
 text-decoration: none;
 `)]),H(`menu-divider`,`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 6px 18px;
 `)]);function Lr(e,t){return[z(`hover`,e,t),Q(`&:hover`,e,t)]}var Rr=G({name:`MenuOptionContent`,props:{collapsed:Boolean,disabled:Boolean,title:[String,Function],icon:Function,extra:[String,Function],showArrow:Boolean,childActive:Boolean,hover:Boolean,paddingLeft:Number,selected:Boolean,maxIconSize:{type:Number,required:!0},activeIconSize:{type:Number,required:!0},iconMarginRight:{type:Number,required:!0},clsPrefix:{type:String,required:!0},onClick:Function,tmNode:{type:Object,required:!0},isEllipsisPlaceholder:Boolean},setup(e){let{props:t}=K(jr);return{menuProps:t,style:U(()=>{let{paddingLeft:t}=e;return{paddingLeft:t&&`${t}px`}}),iconStyle:U(()=>{let{maxIconSize:t,activeIconSize:n,iconMarginRight:r}=e;return{width:`${t}px`,height:`${t}px`,fontSize:`${n}px`,marginRight:`${r}px`}})}},render(){let{clsPrefix:e,tmNode:t,menuProps:{renderIcon:n,renderLabel:r,renderExtra:i,expandIcon:a}}=this,o=n?n(t.rawNode):qe(this.icon);return Y(`div`,{onClick:e=>{var t;(t=this.onClick)==null||t.call(this,e)},role:`none`,class:[`${e}-menu-item-content`,{[`${e}-menu-item-content--selected`]:this.selected,[`${e}-menu-item-content--collapsed`]:this.collapsed,[`${e}-menu-item-content--child-active`]:this.childActive,[`${e}-menu-item-content--disabled`]:this.disabled,[`${e}-menu-item-content--hover`]:this.hover}],style:this.style},o&&Y(`div`,{class:`${e}-menu-item-content__icon`,style:this.iconStyle,role:`none`},[o]),Y(`div`,{class:`${e}-menu-item-content-header`,role:`none`},this.isEllipsisPlaceholder?this.title:r?r(t.rawNode):qe(this.title),this.extra||i?Y(`span`,{class:`${e}-menu-item-content-header__extra`},` `,i?i(t.rawNode):qe(this.extra)):null),this.showArrow?Y(Le,{ariaHidden:!0,class:`${e}-menu-item-content__arrow`,clsPrefix:e},{default:()=>a?a(t.rawNode):Y(Kt,null)}):null)}}),zr=8;function Br(e){let t=K(jr),{props:n,mergedCollapsedRef:r}=t,i=K(Mr,null),a=K(Nr,null),o=U(()=>n.mode===`horizontal`),s=U(()=>o.value?n.dropdownPlacement:`tmNodes`in e?`right-start`:`right`),c=U(()=>Math.max(n.collapsedIconSize??n.iconSize,n.iconSize));return{dropdownPlacement:s,activeIconSize:U(()=>!o.value&&e.root&&r.value?n.collapsedIconSize??n.iconSize:n.iconSize),maxIconSize:c,paddingLeft:U(()=>{if(o.value)return;let{collapsedWidth:t,indent:s,rootIndent:l}=n,{root:u,isGroup:d}=e,f=l===void 0?s:l;return u?r.value?t/2-c.value/2:f:a&&typeof a.paddingLeftRef.value==`number`?s/2+a.paddingLeftRef.value:i&&typeof i.paddingLeftRef.value==`number`?(d?s/2:s)+i.paddingLeftRef.value:0}),iconMarginRight:U(()=>{let{collapsedWidth:t,indent:i,rootIndent:a}=n,{value:s}=c,{root:l}=e;return o.value||!l||!r.value?zr:(a===void 0?i:a)+s+zr-(t+s)/2}),NMenu:t,NSubmenu:i,NMenuOptionGroup:a}}var Vr={internalKey:{type:[String,Number],required:!0},root:Boolean,isGroup:Boolean,level:{type:Number,required:!0},title:[String,Function],extra:[String,Function]},Hr=G({name:`MenuDivider`,setup(){let{mergedClsPrefixRef:e,isHorizontalRef:t}=K(jr);return()=>t.value?null:Y(`div`,{class:`${e.value}-menu-divider`})}}),Ur=Object.assign(Object.assign({},Vr),{tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function}),Wr=lt(Ur),Gr=G({name:`MenuOption`,props:Ur,setup(e){let t=Br(e),{NSubmenu:n,NMenu:r,NMenuOptionGroup:i}=t,{props:a,mergedClsPrefixRef:o,mergedCollapsedRef:s}=r,c=n?n.mergedDisabledRef:i?i.mergedDisabledRef:{value:!1},l=U(()=>c.value||e.disabled);function u(t){let{onClick:n}=e;n&&n(t)}function d(t){l.value||(r.doSelect(e.internalKey,e.tmNode.rawNode),u(t))}return{mergedClsPrefix:o,dropdownPlacement:t.dropdownPlacement,paddingLeft:t.paddingLeft,iconMarginRight:t.iconMarginRight,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,mergedTheme:r.mergedThemeRef,menuProps:a,dropdownEnabled:se(()=>e.root&&s.value&&a.mode!==`horizontal`&&!l.value),selected:se(()=>r.mergedValueRef.value===e.internalKey),mergedDisabled:l,handleClick:d}},render(){let{mergedClsPrefix:e,mergedTheme:t,tmNode:n,menuProps:{renderLabel:r,nodeProps:i}}=this,a=i?.(n.rawNode);return Y(`div`,Object.assign({},a,{role:`menuitem`,class:[`${e}-menu-item`,a?.class]}),Y(o,{theme:t.peers.Tooltip,themeOverrides:t.peerOverrides.Tooltip,trigger:`hover`,placement:this.dropdownPlacement,disabled:!this.dropdownEnabled||this.title===void 0,internalExtraClass:[`menu-tooltip`]},{default:()=>r?r(n.rawNode):qe(this.title),trigger:()=>Y(Rr,{tmNode:n,clsPrefix:e,paddingLeft:this.paddingLeft,iconMarginRight:this.iconMarginRight,maxIconSize:this.maxIconSize,activeIconSize:this.activeIconSize,selected:this.selected,title:this.title,extra:this.extra,disabled:this.mergedDisabled,icon:this.icon,onClick:this.handleClick})}))}}),Kr=Object.assign(Object.assign({},Vr),{tmNode:{type:Object,required:!0},tmNodes:{type:Array,required:!0}}),qr=lt(Kr),Jr=G({name:`MenuOptionGroup`,props:Kr,setup(e){let t=Br(e),{NSubmenu:n}=t,r=U(()=>n?.mergedDisabledRef.value?!0:e.tmNode.disabled);Lt(Nr,{paddingLeftRef:t.paddingLeft,mergedDisabledRef:r});let{mergedClsPrefixRef:i,props:a}=K(jr);return function(){let{value:n}=i,r=t.paddingLeft.value,{nodeProps:o}=a,s=o?.(e.tmNode.rawNode);return Y(`div`,{class:`${n}-menu-item-group`,role:`group`},Y(`div`,Object.assign({},s,{class:[`${n}-menu-item-group-title`,s?.class],style:[s?.style||``,r===void 0?``:`padding-left: ${r}px;`]}),qe(e.title),e.extra?Y(ce,null,` `,qe(e.extra)):null),Y(`div`,null,e.tmNodes.map(e=>Zr(e,a))))}}});function Yr(e){return e.type===`divider`||e.type===`render`}function Xr(e){return e.type===`divider`}function Zr(e,t){let{rawNode:n}=e,{show:r}=n;if(r===!1)return null;if(Yr(n))return Xr(n)?Y(Hr,Object.assign({key:e.key},n.props)):null;let{labelField:i}=t,{key:a,level:o,isGroup:s}=e,c=Object.assign(Object.assign({},n),{title:n.title||n[i],extra:n.titleExtra||n.extra,key:a,internalKey:a,level:o,root:o===0,isGroup:s});return e.children?e.isGroup?Y(Jr,Qe(c,qr,{tmNode:e,tmNodes:e.children,key:a})):Y(ei,Qe(c,$r,{key:a,rawNodes:n[t.childrenField],tmNodes:e.children,tmNode:e})):Y(Gr,Qe(c,Wr,{key:a,tmNode:e}))}var Qr=Object.assign(Object.assign({},Vr),{rawNodes:{type:Array,default:()=>[]},tmNodes:{type:Array,default:()=>[]},tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function,domId:String,virtualChildActive:{type:Boolean,default:void 0},isEllipsisPlaceholder:Boolean}),$r=lt(Qr),ei=G({name:`Submenu`,props:Qr,setup(e){let t=Br(e),{NMenu:n,NSubmenu:r}=t,{props:i,mergedCollapsedRef:a,mergedThemeRef:o}=n,s=U(()=>{let{disabled:t}=e;return r?.mergedDisabledRef.value||i.disabled?!0:t}),c=L(!1);Lt(Mr,{paddingLeftRef:t.paddingLeft,mergedDisabledRef:s}),Lt(Nr,null);function l(){let{onClick:t}=e;t&&t()}function u(){s.value||(a.value||n.toggleExpand(e.internalKey),l())}function d(e){c.value=e}return{menuProps:i,mergedTheme:o,doSelect:n.doSelect,inverted:n.invertedRef,isHorizontal:n.isHorizontalRef,mergedClsPrefix:n.mergedClsPrefixRef,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,iconMarginRight:t.iconMarginRight,dropdownPlacement:t.dropdownPlacement,dropdownShow:c,paddingLeft:t.paddingLeft,mergedDisabled:s,mergedValue:n.mergedValueRef,childActive:se(()=>e.virtualChildActive??n.activePathRef.value.includes(e.internalKey)),collapsed:U(()=>i.mode===`horizontal`?!1:a.value?!0:!n.mergedExpandedKeysRef.value.includes(e.internalKey)),dropdownEnabled:U(()=>!s.value&&(i.mode===`horizontal`||a.value)),handlePopoverShowChange:d,handleClick:u}},render(){let{mergedClsPrefix:e,menuProps:{renderIcon:t,renderLabel:n}}=this,r=()=>{let{isHorizontal:e,paddingLeft:t,collapsed:n,mergedDisabled:r,maxIconSize:i,activeIconSize:a,title:o,childActive:s,icon:c,handleClick:l,menuProps:{nodeProps:u},dropdownShow:d,iconMarginRight:f,tmNode:p,mergedClsPrefix:m,isEllipsisPlaceholder:h,extra:g}=this,_=u?.(p.rawNode);return Y(`div`,Object.assign({},_,{class:[`${m}-menu-item`,_?.class],role:`menuitem`}),Y(Rr,{tmNode:p,paddingLeft:t,collapsed:n,disabled:r,iconMarginRight:f,maxIconSize:i,activeIconSize:a,title:o,extra:g,showArrow:!e,childActive:s,clsPrefix:m,icon:c,hover:d,onClick:l,isEllipsisPlaceholder:h}))},i=()=>Y(Ge,null,{default:()=>{let{tmNodes:t,collapsed:n}=this;return n?null:Y(`div`,{class:`${e}-submenu-children`,role:`menu`},t.map(e=>Zr(e,this.menuProps)))}});return this.root?Y(g,Object.assign({size:`large`,trigger:`hover`},this.menuProps?.dropdownProps,{themeOverrides:this.mergedTheme.peerOverrides.Dropdown,theme:this.mergedTheme.peers.Dropdown,builtinThemeOverrides:{fontSizeLarge:`14px`,optionIconSizeLarge:`18px`},value:this.mergedValue,disabled:!this.dropdownEnabled,placement:this.dropdownPlacement,keyField:this.menuProps.keyField,labelField:this.menuProps.labelField,childrenField:this.menuProps.childrenField,onUpdateShow:this.handlePopoverShowChange,options:this.rawNodes,onSelect:this.doSelect,inverted:this.inverted,renderIcon:t,renderLabel:n}),{default:()=>Y(`div`,{class:`${e}-submenu`,role:`menu`,"aria-expanded":!this.collapsed,id:this.domId},r(),this.isHorizontal?null:i())}):Y(`div`,{class:`${e}-submenu`,role:`menu`,"aria-expanded":!this.collapsed,id:this.domId},r(),i())}}),ti=G({name:`Menu`,inheritAttrs:!1,props:Object.assign(Object.assign({},V.props),{options:{type:Array,default:()=>[]},collapsed:{type:Boolean,default:void 0},collapsedWidth:{type:Number,default:48},iconSize:{type:Number,default:20},collapsedIconSize:{type:Number,default:24},rootIndent:Number,indent:{type:Number,default:32},labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},disabledField:{type:String,default:`disabled`},defaultExpandAll:Boolean,defaultExpandedKeys:Array,expandedKeys:Array,value:[String,Number],defaultValue:{type:[String,Number],default:null},mode:{type:String,default:`vertical`},watchProps:{type:Array,default:void 0},disabled:Boolean,show:{type:Boolean,default:!0},inverted:Boolean,"onUpdate:expandedKeys":[Function,Array],onUpdateExpandedKeys:[Function,Array],onUpdateValue:[Function,Array],"onUpdate:value":[Function,Array],expandIcon:Function,renderIcon:Function,renderLabel:Function,renderExtra:Function,dropdownProps:Object,accordion:Boolean,nodeProps:Function,dropdownPlacement:{type:String,default:`bottom`},responsive:Boolean,items:Array,onOpenNamesChange:[Function,Array],onSelect:[Function,Array],onExpandedNamesChange:[Function,Array],expandedNames:Array,defaultExpandedNames:Array}),setup(e){let{mergedClsPrefixRef:n,inlineThemeDisabled:r}=bt(e),i=V(`Menu`,`-menu`,Ir,He,e,n),a=K(hr,null),o=U(()=>{let{collapsed:t}=e;if(t!==void 0)return t;if(a){let{collapseModeRef:e,collapsedRef:t}=a;if(e.value===`width`)return t.value??!1}return!1}),s=U(()=>{let{keyField:t,childrenField:n,disabledField:r}=e;return l(e.items||e.options,{getIgnored(e){return Yr(e)},getChildren(e){return e[n]},getDisabled(e){return e[r]},getKey(e){return e[t]??e.name}})}),c=U(()=>new Set(s.value.treeNodes.map(e=>e.key))),{watchProps:u}=e,d=L(null);u?.includes(`defaultValue`)?ye(()=>{d.value=e.defaultValue}):d.value=e.defaultValue;let p=f(B(e,`value`),d),m=L([]),h=()=>{m.value=e.defaultExpandAll?s.value.getNonLeafKeys():e.defaultExpandedNames||e.defaultExpandedKeys||s.value.getPath(p.value,{includeSelf:!1}).keyPath};u?.includes(`defaultExpandedKeys`)?ye(h):h();let g=t(e,[`expandedNames`,`expandedKeys`]),_=f(g,m),v=U(()=>s.value.treeNodes),y=U(()=>s.value.getPath(p.value).keyPath);Lt(jr,{props:e,mergedCollapsedRef:o,mergedThemeRef:i,mergedValueRef:p,mergedExpandedKeysRef:_,activePathRef:y,mergedClsPrefixRef:n,isHorizontalRef:U(()=>e.mode===`horizontal`),invertedRef:B(e,`inverted`),doSelect:b,toggleExpand:S});function b(t,n){let{"onUpdate:value":r,onUpdateValue:i,onSelect:a}=e;i&&Z(i,t,n),r&&Z(r,t,n),a&&Z(a,t,n),d.value=t}function x(t){let{"onUpdate:expandedKeys":n,onUpdateExpandedKeys:r,onExpandedNamesChange:i,onOpenNamesChange:a}=e;n&&Z(n,t),r&&Z(r,t),i&&Z(i,t),a&&Z(a,t),m.value=t}function S(t){let n=Array.from(_.value),r=n.findIndex(e=>e===t);if(~r)n.splice(r,1);else{if(e.accordion&&c.value.has(t)){let e=n.findIndex(e=>c.value.has(e));e>-1&&n.splice(e,1)}n.push(t)}x(n)}let C=t=>{let n=s.value.getPath(t??p.value,{includeSelf:!1}).keyPath;if(!n.length)return;let r=Array.from(_.value),i=new Set([...r,...n]);e.accordion&&c.value.forEach(e=>{i.has(e)&&!n.includes(e)&&i.delete(e)}),x(Array.from(i))},w=U(()=>{let{inverted:t}=e,{common:{cubicBezierEaseInOut:n},self:r}=i.value,{borderRadius:a,borderColorHorizontal:o,fontSize:s,itemHeight:c,dividerColor:l}=r,u={"--n-divider-color":l,"--n-bezier":n,"--n-font-size":s,"--n-border-color-horizontal":o,"--n-border-radius":a,"--n-item-height":c};return t?(u[`--n-group-text-color`]=r.groupTextColorInverted,u[`--n-color`]=r.colorInverted,u[`--n-item-text-color`]=r.itemTextColorInverted,u[`--n-item-text-color-hover`]=r.itemTextColorHoverInverted,u[`--n-item-text-color-active`]=r.itemTextColorActiveInverted,u[`--n-item-text-color-child-active`]=r.itemTextColorChildActiveInverted,u[`--n-item-text-color-child-active-hover`]=r.itemTextColorChildActiveInverted,u[`--n-item-text-color-active-hover`]=r.itemTextColorActiveHoverInverted,u[`--n-item-icon-color`]=r.itemIconColorInverted,u[`--n-item-icon-color-hover`]=r.itemIconColorHoverInverted,u[`--n-item-icon-color-active`]=r.itemIconColorActiveInverted,u[`--n-item-icon-color-active-hover`]=r.itemIconColorActiveHoverInverted,u[`--n-item-icon-color-child-active`]=r.itemIconColorChildActiveInverted,u[`--n-item-icon-color-child-active-hover`]=r.itemIconColorChildActiveHoverInverted,u[`--n-item-icon-color-collapsed`]=r.itemIconColorCollapsedInverted,u[`--n-item-text-color-horizontal`]=r.itemTextColorHorizontalInverted,u[`--n-item-text-color-hover-horizontal`]=r.itemTextColorHoverHorizontalInverted,u[`--n-item-text-color-active-horizontal`]=r.itemTextColorActiveHorizontalInverted,u[`--n-item-text-color-child-active-horizontal`]=r.itemTextColorChildActiveHorizontalInverted,u[`--n-item-text-color-child-active-hover-horizontal`]=r.itemTextColorChildActiveHoverHorizontalInverted,u[`--n-item-text-color-active-hover-horizontal`]=r.itemTextColorActiveHoverHorizontalInverted,u[`--n-item-icon-color-horizontal`]=r.itemIconColorHorizontalInverted,u[`--n-item-icon-color-hover-horizontal`]=r.itemIconColorHoverHorizontalInverted,u[`--n-item-icon-color-active-horizontal`]=r.itemIconColorActiveHorizontalInverted,u[`--n-item-icon-color-active-hover-horizontal`]=r.itemIconColorActiveHoverHorizontalInverted,u[`--n-item-icon-color-child-active-horizontal`]=r.itemIconColorChildActiveHorizontalInverted,u[`--n-item-icon-color-child-active-hover-horizontal`]=r.itemIconColorChildActiveHoverHorizontalInverted,u[`--n-arrow-color`]=r.arrowColorInverted,u[`--n-arrow-color-hover`]=r.arrowColorHoverInverted,u[`--n-arrow-color-active`]=r.arrowColorActiveInverted,u[`--n-arrow-color-active-hover`]=r.arrowColorActiveHoverInverted,u[`--n-arrow-color-child-active`]=r.arrowColorChildActiveInverted,u[`--n-arrow-color-child-active-hover`]=r.arrowColorChildActiveHoverInverted,u[`--n-item-color-hover`]=r.itemColorHoverInverted,u[`--n-item-color-active`]=r.itemColorActiveInverted,u[`--n-item-color-active-hover`]=r.itemColorActiveHoverInverted,u[`--n-item-color-active-collapsed`]=r.itemColorActiveCollapsedInverted):(u[`--n-group-text-color`]=r.groupTextColor,u[`--n-color`]=r.color,u[`--n-item-text-color`]=r.itemTextColor,u[`--n-item-text-color-hover`]=r.itemTextColorHover,u[`--n-item-text-color-active`]=r.itemTextColorActive,u[`--n-item-text-color-child-active`]=r.itemTextColorChildActive,u[`--n-item-text-color-child-active-hover`]=r.itemTextColorChildActiveHover,u[`--n-item-text-color-active-hover`]=r.itemTextColorActiveHover,u[`--n-item-icon-color`]=r.itemIconColor,u[`--n-item-icon-color-hover`]=r.itemIconColorHover,u[`--n-item-icon-color-active`]=r.itemIconColorActive,u[`--n-item-icon-color-active-hover`]=r.itemIconColorActiveHover,u[`--n-item-icon-color-child-active`]=r.itemIconColorChildActive,u[`--n-item-icon-color-child-active-hover`]=r.itemIconColorChildActiveHover,u[`--n-item-icon-color-collapsed`]=r.itemIconColorCollapsed,u[`--n-item-text-color-horizontal`]=r.itemTextColorHorizontal,u[`--n-item-text-color-hover-horizontal`]=r.itemTextColorHoverHorizontal,u[`--n-item-text-color-active-horizontal`]=r.itemTextColorActiveHorizontal,u[`--n-item-text-color-child-active-horizontal`]=r.itemTextColorChildActiveHorizontal,u[`--n-item-text-color-child-active-hover-horizontal`]=r.itemTextColorChildActiveHoverHorizontal,u[`--n-item-text-color-active-hover-horizontal`]=r.itemTextColorActiveHoverHorizontal,u[`--n-item-icon-color-horizontal`]=r.itemIconColorHorizontal,u[`--n-item-icon-color-hover-horizontal`]=r.itemIconColorHoverHorizontal,u[`--n-item-icon-color-active-horizontal`]=r.itemIconColorActiveHorizontal,u[`--n-item-icon-color-active-hover-horizontal`]=r.itemIconColorActiveHoverHorizontal,u[`--n-item-icon-color-child-active-horizontal`]=r.itemIconColorChildActiveHorizontal,u[`--n-item-icon-color-child-active-hover-horizontal`]=r.itemIconColorChildActiveHoverHorizontal,u[`--n-arrow-color`]=r.arrowColor,u[`--n-arrow-color-hover`]=r.arrowColorHover,u[`--n-arrow-color-active`]=r.arrowColorActive,u[`--n-arrow-color-active-hover`]=r.arrowColorActiveHover,u[`--n-arrow-color-child-active`]=r.arrowColorChildActive,u[`--n-arrow-color-child-active-hover`]=r.arrowColorChildActiveHover,u[`--n-item-color-hover`]=r.itemColorHover,u[`--n-item-color-active`]=r.itemColorActive,u[`--n-item-color-active-hover`]=r.itemColorActiveHover,u[`--n-item-color-active-collapsed`]=r.itemColorActiveCollapsed),u}),T=r?pt(`menu`,U(()=>e.inverted?`a`:`b`),w,e):void 0,E=je(),ee=L(null),D=L(null),te=!0,ne=()=>{var e;te?te=!1:(e=ee.value)==null||e.sync({showAllItemsBeforeCalculate:!0})};function O(){return document.getElementById(E)}let k=L(-1);function A(t){k.value=e.options.length-t}function re(e){e||(k.value=-1)}let j=U(()=>{let t=k.value;return{children:t===-1?[]:e.options.slice(t)}}),M=U(()=>{let{childrenField:t,disabledField:n,keyField:r}=e;return l([j.value],{getIgnored(e){return Yr(e)},getChildren(e){return e[t]},getDisabled(e){return e[n]},getKey(e){return e[r]??e.name}})}),N=U(()=>l([{}]).treeNodes[0]);function P(){if(k.value===-1)return Y(ei,{root:!0,level:0,key:`__ellpisisGroupPlaceholder__`,internalKey:`__ellpisisGroupPlaceholder__`,title:`···`,tmNode:N.value,domId:E,isEllipsisPlaceholder:!0});let e=M.value.treeNodes[0],t=y.value;return Y(ei,{level:0,root:!0,key:`__ellpisisGroup__`,internalKey:`__ellpisisGroup__`,title:`···`,virtualChildActive:!!e.children?.some(e=>t.includes(e.key)),tmNode:e,domId:E,rawNodes:e.rawNode.children||[],tmNodes:e.children||[],isEllipsisPlaceholder:!0})}return{mergedClsPrefix:n,controlledExpandedKeys:g,uncontrolledExpanededKeys:m,mergedExpandedKeys:_,uncontrolledValue:d,mergedValue:p,activePath:y,tmNodes:v,mergedTheme:i,mergedCollapsed:o,cssVars:r?void 0:w,themeClass:T?.themeClass,overflowRef:ee,counterRef:D,updateCounter:()=>{},onResize:ne,onUpdateOverflow:re,onUpdateCount:A,renderCounter:P,getCounter:O,onRender:T?.onRender,showOption:C,deriveResponsiveState:ne}},render(){let{mergedClsPrefix:e,mode:t,themeClass:n,onRender:r}=this;r?.();let a=()=>this.tmNodes.map(e=>Zr(e,this.$props)),o=t===`horizontal`&&this.responsive,s=()=>Y(`div`,at(this.$attrs,{role:t===`horizontal`?`menubar`:`menu`,class:[`${e}-menu`,n,`${e}-menu--${t}`,o&&`${e}-menu--responsive`,this.mergedCollapsed&&`${e}-menu--collapsed`],style:this.cssVars}),o?Y(i,{ref:`overflowRef`,onUpdateOverflow:this.onUpdateOverflow,getCounter:this.getCounter,onUpdateCount:this.onUpdateCount,updateCounter:this.updateCounter,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:a,counter:this.renderCounter}):a());return o?Y(re,{onResize:this.onResize},{default:s}):s()}}),ni=Q([H(`slider`,`
 display: block;
 padding: calc((var(--n-handle-size) - var(--n-rail-height)) / 2) 0;
 position: relative;
 z-index: 0;
 width: 100%;
 cursor: pointer;
 user-select: none;
 -webkit-user-select: none;
 `,[z(`reverse`,[H(`slider-handles`,[H(`slider-handle-wrapper`,`
 transform: translate(50%, -50%);
 `)]),H(`slider-dots`,[H(`slider-dot`,`
 transform: translateX(50%, -50%);
 `)]),z(`vertical`,[H(`slider-handles`,[H(`slider-handle-wrapper`,`
 transform: translate(-50%, -50%);
 `)]),H(`slider-marks`,[H(`slider-mark`,`
 transform: translateY(calc(-50% + var(--n-dot-height) / 2));
 `)]),H(`slider-dots`,[H(`slider-dot`,`
 transform: translateX(-50%) translateY(0);
 `)])])]),z(`vertical`,`
 box-sizing: content-box;
 padding: 0 calc((var(--n-handle-size) - var(--n-rail-height)) / 2);
 width: var(--n-rail-width-vertical);
 height: 100%;
 `,[H(`slider-handles`,`
 top: calc(var(--n-handle-size) / 2);
 right: 0;
 bottom: calc(var(--n-handle-size) / 2);
 left: 0;
 `,[H(`slider-handle-wrapper`,`
 top: unset;
 left: 50%;
 transform: translate(-50%, 50%);
 `)]),H(`slider-rail`,`
 height: 100%;
 `,[k(`fill`,`
 top: unset;
 right: 0;
 bottom: unset;
 left: 0;
 `)]),z(`with-mark`,`
 width: var(--n-rail-width-vertical);
 margin: 0 32px 0 8px;
 `),H(`slider-marks`,`
 top: calc(var(--n-handle-size) / 2);
 right: unset;
 bottom: calc(var(--n-handle-size) / 2);
 left: 22px;
 font-size: var(--n-mark-font-size);
 `,[H(`slider-mark`,`
 transform: translateY(50%);
 white-space: nowrap;
 `)]),H(`slider-dots`,`
 top: calc(var(--n-handle-size) / 2);
 right: unset;
 bottom: calc(var(--n-handle-size) / 2);
 left: 50%;
 `,[H(`slider-dot`,`
 transform: translateX(-50%) translateY(50%);
 `)])]),z(`disabled`,`
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `,[H(`slider-handle`,`
 cursor: not-allowed;
 `)]),z(`with-mark`,`
 width: 100%;
 margin: 8px 0 32px 0;
 `),Q(`&:hover`,[H(`slider-rail`,{backgroundColor:`var(--n-rail-color-hover)`},[k(`fill`,{backgroundColor:`var(--n-fill-color-hover)`})]),H(`slider-handle`,{boxShadow:`var(--n-handle-box-shadow-hover)`})]),z(`active`,[H(`slider-rail`,{backgroundColor:`var(--n-rail-color-hover)`},[k(`fill`,{backgroundColor:`var(--n-fill-color-hover)`})]),H(`slider-handle`,{boxShadow:`var(--n-handle-box-shadow-hover)`})]),H(`slider-marks`,`
 position: absolute;
 top: 18px;
 left: calc(var(--n-handle-size) / 2);
 right: calc(var(--n-handle-size) / 2);
 `,[H(`slider-mark`,`
 position: absolute;
 transform: translateX(-50%);
 white-space: nowrap;
 `)]),H(`slider-rail`,`
 width: 100%;
 position: relative;
 height: var(--n-rail-height);
 background-color: var(--n-rail-color);
 transition: background-color .3s var(--n-bezier);
 border-radius: calc(var(--n-rail-height) / 2);
 `,[k(`fill`,`
 position: absolute;
 top: 0;
 bottom: 0;
 border-radius: calc(var(--n-rail-height) / 2);
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-fill-color);
 `)]),H(`slider-handles`,`
 position: absolute;
 top: 0;
 right: calc(var(--n-handle-size) / 2);
 bottom: 0;
 left: calc(var(--n-handle-size) / 2);
 `,[H(`slider-handle-wrapper`,`
 outline: none;
 position: absolute;
 top: 50%;
 transform: translate(-50%, -50%);
 cursor: pointer;
 display: flex;
 `,[H(`slider-handle`,`
 height: var(--n-handle-size);
 width: var(--n-handle-size);
 border-radius: 50%;
 overflow: hidden;
 transition: box-shadow .2s var(--n-bezier), background-color .3s var(--n-bezier);
 background-color: var(--n-handle-color);
 box-shadow: var(--n-handle-box-shadow);
 `,[Q(`&:hover`,`
 box-shadow: var(--n-handle-box-shadow-hover);
 `)]),Q(`&:focus`,[H(`slider-handle`,`
 box-shadow: var(--n-handle-box-shadow-focus);
 `,[Q(`&:hover`,`
 box-shadow: var(--n-handle-box-shadow-active);
 `)])])])]),H(`slider-dots`,`
 position: absolute;
 top: 50%;
 left: calc(var(--n-handle-size) / 2);
 right: calc(var(--n-handle-size) / 2);
 `,[z(`transition-disabled`,[H(`slider-dot`,`transition: none;`)]),H(`slider-dot`,`
 transition:
 border-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 transform: translate(-50%, -50%);
 height: var(--n-dot-height);
 width: var(--n-dot-width);
 border-radius: var(--n-dot-border-radius);
 overflow: hidden;
 box-sizing: border-box;
 border: var(--n-dot-border);
 background-color: var(--n-dot-color);
 `,[z(`active`,`border: var(--n-dot-border-active);`)])])]),H(`slider-handle-indicator`,`
 font-size: var(--n-font-size);
 padding: 6px 10px;
 border-radius: var(--n-indicator-border-radius);
 color: var(--n-indicator-text-color);
 background-color: var(--n-indicator-color);
 box-shadow: var(--n-indicator-box-shadow);
 `,[Ot()]),H(`slider-handle-indicator`,`
 font-size: var(--n-font-size);
 padding: 6px 10px;
 border-radius: var(--n-indicator-border-radius);
 color: var(--n-indicator-text-color);
 background-color: var(--n-indicator-color);
 box-shadow: var(--n-indicator-box-shadow);
 `,[z(`top`,`
 margin-bottom: 12px;
 `),z(`right`,`
 margin-left: 12px;
 `),z(`bottom`,`
 margin-top: 12px;
 `),z(`left`,`
 margin-right: 12px;
 `),Ot()]),rt(H(`slider`,[H(`slider-dot`,`background-color: var(--n-dot-color-modal);`)])),de(H(`slider`,[H(`slider-dot`,`background-color: var(--n-dot-color-popover);`)]))]);function ri(e){return window.TouchEvent&&e instanceof window.TouchEvent}function ii(){let e=new Map;return ct(()=>{e.clear()}),[e,t=>n=>{e.set(t,n)}]}var ai=0,oi=G({name:`Slider`,props:Object.assign(Object.assign({},V.props),{to:u.propTo,defaultValue:{type:[Number,Array],default:0},marks:Object,disabled:{type:Boolean,default:void 0},formatTooltip:Function,keyboard:{type:Boolean,default:!0},min:{type:Number,default:0},max:{type:Number,default:100},step:{type:[Number,String],default:1},range:Boolean,value:[Number,Array],placement:String,showTooltip:{type:Boolean,default:void 0},tooltip:{type:Boolean,default:!0},vertical:Boolean,reverse:Boolean,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onDragstart:[Function],onDragend:[Function]}),slots:Object,setup(e){let{mergedClsPrefixRef:t,namespaceRef:n,inlineThemeDisabled:r}=bt(e),i=V(`Slider`,`-slider`,ni,mr,e,t),a=L(null),[o,s]=ii(),[c,l]=ii(),d=L(new Set),p=Et(e),{mergedDisabledRef:m}=p,h=U(()=>{let{step:t}=e;if(Number(t)<=0||t===`mark`)return 0;let n=t.toString(),r=0;return n.includes(`.`)&&(r=n.length-n.indexOf(`.`)-1),r}),g=L(e.defaultValue),_=f(B(e,`value`),g),v=U(()=>{let{value:t}=_;return(e.range?t:[t]).map(F)}),y=U(()=>v.value.length>2),b=U(()=>e.placement===void 0?e.vertical?`right`:`top`:e.placement),x=U(()=>{let{marks:t}=e;return t?Object.keys(t).map(Number.parseFloat):null}),S=L(-1),C=L(-1),w=L(-1),T=L(!1),E=L(!1),ee=U(()=>{let{vertical:t,reverse:n}=e;return t?n?`top`:`bottom`:n?`right`:`left`}),D=U(()=>{if(y.value)return;let t=v.value,n=I(e.range?Math.min(...t):e.min),r=I(e.range?Math.max(...t):t[0]),{value:i}=ee;return e.vertical?{[i]:`${n}%`,height:`${r-n}%`}:{[i]:`${n}%`,width:`${r-n}%`}}),te=U(()=>{let t=[],{marks:n}=e;if(n){let r=v.value.slice();r.sort((e,t)=>e-t);let{value:i}=ee,{value:a}=y,{range:o}=e,s=a?()=>!1:e=>o?e>=r[0]&&e<=r[r.length-1]:e<=r[0];for(let e of Object.keys(n)){let r=Number(e);t.push({active:s(r),key:r,label:n[e],style:{[i]:`${I(r)}%`}})}}return t});function ne(e,t){let n=I(e),{value:r}=ee;return{[r]:`${n}%`,zIndex:+(t===S.value)}}function O(t){return e.showTooltip||w.value===t||S.value===t&&T.value}function k(e){return T.value?!(S.value===e&&C.value===e):!0}function A(e){var t;~e&&(S.value=e,(t=o.get(e))==null||t.focus())}function re(){c.forEach((e,t)=>{O(t)&&e.syncPosition()})}function j(t){let{"onUpdate:value":n,onUpdateValue:r}=e,{nTriggerFormInput:i,nTriggerFormChange:a}=p;r&&Z(r,t),n&&Z(n,t),g.value=t,i(),a()}function M(t){let{range:n}=e;if(n){if(Array.isArray(t)){let{value:e}=v;t.join()!==e.join()&&j(t)}}else Array.isArray(t)||v.value[0]!==t&&j(t)}function N(t,n){if(e.range){let e=v.value.slice();e.splice(n,1,t),M(e)}else M(t)}function P(t,n,r){let i=r!==void 0;r||=t-n>0?1:-1;let a=x.value||[],{step:o}=e;if(o===`mark`){let e=oe(t,a.concat(n),i?r:void 0);return e?e.value:n}if(o<=0)return n;let{value:s}=h,c;if(i){let e=Number((n/o).toFixed(s)),t=Math.floor(e),i=e>t?t:t-1,l=e<t?t:t+1;c=oe(n,[Number((i*o).toFixed(s)),Number((l*o).toFixed(s)),...a],r)}else{let e=ae(t);c=oe(t,[...a,e])}return c?F(c.value):n}function F(t){return Math.min(e.max,Math.max(e.min,t))}function I(t){let{max:n,min:r}=e;return(t-r)/(n-r)*100}function ie(t){let{max:n,min:r}=e;return r+(n-r)*t}function ae(t){let{step:n,min:r}=e;if(Number(n)<=0||n===`mark`)return t;let i=Math.round((t-r)/n)*n+r;return Number(i.toFixed(h.value))}function oe(e,t=x.value,n){if(!t?.length)return null;let r=null,i=-1;for(;++i<t.length;){let a=t[i]-e,o=Math.abs(a);(n===void 0||a*n>0)&&(r===null||o<r.distance)&&(r={index:i,distance:o,value:t[i]})}return r}function se(t){let n=a.value;if(!n)return;let r=ri(t)?t.touches[0]:t,i=n.getBoundingClientRect(),o;return o=e.vertical?(i.bottom-r.clientY)/i.height:(r.clientX-i.left)/i.width,e.reverse&&(o=1-o),ie(o)}function ce(t){if(m.value||!e.keyboard)return;let{vertical:n,reverse:r}=e;switch(t.key){case`ArrowUp`:t.preventDefault(),le(n&&r?-1:1);break;case`ArrowRight`:t.preventDefault(),le(!n&&r?-1:1);break;case`ArrowDown`:t.preventDefault(),le(n&&r?1:-1);break;case`ArrowLeft`:t.preventDefault(),le(!n&&r?1:-1);break}}function le(t){let n=S.value;if(n===-1)return;let{step:r}=e,i=v.value[n];N(P(Number(r)<=0||r===`mark`?i:i+r*t,i,t>0?1:-1),n)}function ue(t){if(m.value||!ri(t)&&t.button!==ai)return;let n=se(t);if(n===void 0)return;let r=v.value.slice(),i=e.range?oe(n,r)?.index??-1:0;i!==-1&&(t.preventDefault(),A(i),de(),N(P(n,v.value[i]),i))}function de(){T.value||(T.value=!0,e.onDragstart&&Z(e.onDragstart),Oe(`touchend`,document,fe),Oe(`mouseup`,document,fe),Oe(`touchmove`,document,z),Oe(`mousemove`,document,z))}function R(){T.value&&(T.value=!1,e.onDragend&&Z(e.onDragend),ke(`touchend`,document,fe),ke(`mouseup`,document,fe),ke(`touchmove`,document,z),ke(`mousemove`,document,z))}function z(e){let{value:t}=S;if(!T.value||t===-1){R();return}let n=se(e);n!==void 0&&N(P(n,v.value[t]),t)}function fe(){R()}function pe(e){S.value=e,m.value||(w.value=e)}function me(e){S.value===e&&(S.value=-1,R()),w.value===e&&(w.value=-1)}function he(e){w.value=e}function ge(e){w.value===e&&(w.value=-1)}Mt(S,(e,t)=>void kt(()=>C.value=t)),Mt(_,()=>{if(e.marks){if(E.value)return;E.value=!0,kt(()=>{E.value=!1})}kt(re)}),_t(()=>{R()});let _e=U(()=>{let{self:{markFontSize:e,railColor:t,railColorHover:n,fillColor:r,fillColorHover:a,handleColor:o,opacityDisabled:s,dotColor:c,dotColorModal:l,handleBoxShadow:u,handleBoxShadowHover:d,handleBoxShadowActive:f,handleBoxShadowFocus:p,dotBorder:m,dotBoxShadow:h,railHeight:g,railWidthVertical:_,handleSize:v,dotHeight:y,dotWidth:b,dotBorderRadius:x,fontSize:S,dotBorderActive:C,dotColorPopover:w},common:{cubicBezierEaseInOut:T}}=i.value;return{"--n-bezier":T,"--n-dot-border":m,"--n-dot-border-active":C,"--n-dot-border-radius":x,"--n-dot-box-shadow":h,"--n-dot-color":c,"--n-dot-color-modal":l,"--n-dot-color-popover":w,"--n-dot-height":y,"--n-dot-width":b,"--n-fill-color":r,"--n-fill-color-hover":a,"--n-font-size":S,"--n-handle-box-shadow":u,"--n-handle-box-shadow-active":f,"--n-handle-box-shadow-focus":p,"--n-handle-box-shadow-hover":d,"--n-handle-color":o,"--n-handle-size":v,"--n-opacity-disabled":s,"--n-rail-color":t,"--n-rail-color-hover":n,"--n-rail-height":g,"--n-rail-width-vertical":_,"--n-mark-font-size":e}}),ve=r?pt(`slider`,void 0,_e,e):void 0,ye=U(()=>{let{self:{fontSize:e,indicatorColor:t,indicatorBoxShadow:n,indicatorTextColor:r,indicatorBorderRadius:a}}=i.value;return{"--n-font-size":e,"--n-indicator-border-radius":a,"--n-indicator-box-shadow":n,"--n-indicator-color":t,"--n-indicator-text-color":r}}),be=r?pt(`slider-indicator`,void 0,ye,e):void 0;return{mergedClsPrefix:t,namespace:n,uncontrolledValue:g,mergedValue:_,mergedDisabled:m,mergedPlacement:b,isMounted:Se(),adjustedTo:u(e),dotTransitionDisabled:E,markInfos:te,isShowTooltip:O,shouldKeepTooltipTransition:k,handleRailRef:a,setHandleRefs:s,setFollowerRefs:l,fillStyle:D,getHandleStyle:ne,activeIndex:S,arrifiedValues:v,followerEnabledIndexSet:d,handleRailMouseDown:ue,handleHandleFocus:pe,handleHandleBlur:me,handleHandleMouseEnter:he,handleHandleMouseLeave:ge,handleRailKeyDown:ce,indicatorCssVars:r?void 0:ye,indicatorThemeClass:be?.themeClass,indicatorOnRender:be?.onRender,cssVars:r?void 0:_e,themeClass:ve?.themeClass,onRender:ve?.onRender}},render(){var e;let{mergedClsPrefix:t,themeClass:i,formatTooltip:a}=this;return(e=this.onRender)==null||e.call(this),Y(`div`,{class:[`${t}-slider`,i,{[`${t}-slider--disabled`]:this.mergedDisabled,[`${t}-slider--active`]:this.activeIndex!==-1,[`${t}-slider--with-mark`]:this.marks,[`${t}-slider--vertical`]:this.vertical,[`${t}-slider--reverse`]:this.reverse}],style:this.cssVars,onKeydown:this.handleRailKeyDown,onMousedown:this.handleRailMouseDown,onTouchstart:this.handleRailMouseDown},Y(`div`,{class:`${t}-slider-rail`},Y(`div`,{class:`${t}-slider-rail__fill`,style:this.fillStyle}),this.marks?Y(`div`,{class:[`${t}-slider-dots`,this.dotTransitionDisabled&&`${t}-slider-dots--transition-disabled`]},this.markInfos.map(e=>Y(`div`,{key:e.key,class:[`${t}-slider-dot`,{[`${t}-slider-dot--active`]:e.active}],style:e.style}))):null,Y(`div`,{ref:`handleRailRef`,class:`${t}-slider-handles`},this.arrifiedValues.map((e,i)=>{let o=this.isShowTooltip(i);return Y(n,null,{default:()=>[Y(r,null,{default:()=>Y(`div`,{ref:this.setHandleRefs(i),class:`${t}-slider-handle-wrapper`,tabindex:this.mergedDisabled?-1:0,role:`slider`,"aria-valuenow":e,"aria-valuemin":this.min,"aria-valuemax":this.max,"aria-orientation":this.vertical?`vertical`:`horizontal`,"aria-disabled":this.disabled,style:this.getHandleStyle(e,i),onFocus:()=>{this.handleHandleFocus(i)},onBlur:()=>{this.handleHandleBlur(i)},onMouseenter:()=>{this.handleHandleMouseEnter(i)},onMouseleave:()=>{this.handleHandleMouseLeave(i)}},ze(this.$slots.thumb,()=>[Y(`div`,{class:`${t}-slider-handle`})]))}),this.tooltip&&Y(d,{ref:this.setFollowerRefs(i),show:o,to:this.adjustedTo,enabled:this.showTooltip&&!this.range||this.followerEnabledIndexSet.has(i),teleportDisabled:this.adjustedTo===u.tdkey,placement:this.mergedPlacement,containerClass:this.namespace},{default:()=>Y(ge,{name:`fade-in-scale-up-transition`,appear:this.isMounted,css:this.shouldKeepTooltipTransition(i),onEnter:()=>{this.followerEnabledIndexSet.add(i)},onAfterLeave:()=>{this.followerEnabledIndexSet.delete(i)}},{default:()=>{var n;return o?((n=this.indicatorOnRender)==null||n.call(this),Y(`div`,{class:[`${t}-slider-handle-indicator`,this.indicatorThemeClass,`${t}-slider-handle-indicator--${this.mergedPlacement}`],style:this.indicatorCssVars},typeof a==`function`?a(e):e)):null}})})]})})),this.marks?Y(`div`,{class:`${t}-slider-marks`},this.markInfos.map(e=>Y(`div`,{key:e.key,class:`${t}-slider-mark`,style:e.style},typeof e.label==`function`?e.label():e.label))):null))}}),si={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},ci=G({name:`BarChartOutline`,render:function(e,t){return X(),q(`svg`,si,t[0]||=[W(`path`,{d:`M32 32v432a16 16 0 0 0 16 16h432`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),W(`rect`,{x:`96`,y:`224`,width:`80`,height:`192`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),W(`rect`,{x:`240`,y:`176`,width:`80`,height:`240`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),W(`rect`,{x:`383.64`,y:`112`,width:`80`,height:`304`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1)])}}),li={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},ui=G({name:`CardOutline`,render:function(e,t){return X(),q(`svg`,li,t[0]||=[W(`rect`,{x:`48`,y:`96`,width:`416`,height:`320`,rx:`56`,ry:`56`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),W(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linejoin":`round`,"stroke-width":`60`,d:`M48 192h416`},null,-1),W(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linejoin":`round`,"stroke-width":`60`,d:`M128 300h48v20h-48z`},null,-1)])}}),di={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},fi=G({name:`ChevronBackOutline`,render:function(e,t){return X(),q(`svg`,di,t[0]||=[W(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`48`,d:`M328 112L184 256l144 144`},null,-1)])}}),pi={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},mi=G({name:`ChevronForwardOutline`,render:function(e,t){return X(),q(`svg`,pi,t[0]||=[W(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`48`,d:`M184 112l144 144l-144 144`},null,-1)])}}),hi={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},gi=G({name:`CloseOutline`,render:function(e,t){return X(),q(`svg`,hi,t[0]||=[W(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M368 368L144 144`},null,-1),W(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M368 144L144 368`},null,-1)])}}),_i={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},vi=G({name:`CodeOutline`,render:function(e,t){return X(),q(`svg`,_i,t[0]||=[W(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M160 368L32 256l128-112`},null,-1),W(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M352 368l128-112l-128-112`},null,-1)])}}),yi={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},bi=G({name:`CubeOutline`,render:function(e,t){return X(),q(`svg`,yi,t[0]||=[W(`path`,{d:`M448 341.37V170.61A32 32 0 0 0 432.11 143l-152-88.46a47.94 47.94 0 0 0-48.24 0L79.89 143A32 32 0 0 0 64 170.61v170.76A32 32 0 0 0 79.89 369l152 88.46a48 48 0 0 0 48.24 0l152-88.46A32 32 0 0 0 448 341.37z`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),W(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M69 153.99l187 110l187-110`},null,-1),W(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M256 463.99v-200`},null,-1)])}}),xi={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Si=G({name:`DocumentTextOutline`,render:function(e,t){return X(),q(`svg`,xi,t[0]||=[W(`path`,{d:`M416 221.25V416a48 48 0 0 1-48 48H144a48 48 0 0 1-48-48V96a48 48 0 0 1 48-48h98.75a32 32 0 0 1 22.62 9.37l141.26 141.26a32 32 0 0 1 9.37 22.62z`,fill:`none`,stroke:`currentColor`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),W(`path`,{d:`M256 56v120a32 32 0 0 0 32 32h120`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),W(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 288h160`},null,-1),W(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 368h160`},null,-1)])}}),Ci={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},wi=G({name:`HomeOutline`,render:function(e,t){return X(),q(`svg`,Ci,t[0]||=[W(`path`,{d:`M80 212v236a16 16 0 0 0 16 16h96V328a24 24 0 0 1 24-24h80a24 24 0 0 1 24 24v136h96a16 16 0 0 0 16-16V212`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),W(`path`,{d:`M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),W(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M400 179V64h-48v69`},null,-1)])}}),Ti={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Ei=G({name:`LayersOutline`,render:function(e,t){return X(),q(`svg`,Ti,t[0]||=[W(`path`,{d:`M434.8 137.65l-149.36-68.1c-16.19-7.4-42.69-7.4-58.88 0L77.3 137.65c-17.6 8-17.6 21.09 0 29.09l148 67.5c16.89 7.7 44.69 7.7 61.58 0l148-67.5c17.52-8 17.52-21.1-.08-29.09z`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),W(`path`,{d:`M160 308.52l-82.7 37.11c-17.6 8-17.6 21.1 0 29.1l148 67.5c16.89 7.69 44.69 7.69 61.58 0l148-67.5c17.6-8 17.6-21.1 0-29.1l-79.94-38.47`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),W(`path`,{d:`M160 204.48l-82.8 37.16c-17.6 8-17.6 21.1 0 29.1l148 67.49c16.89 7.7 44.69 7.7 61.58 0l148-67.49c17.7-8 17.7-21.1.1-29.1L352 204.48`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1)])}}),Di={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Oi=G({name:`MoonOutline`,render:function(e,t){return X(),q(`svg`,Di,t[0]||=[W(`path`,{d:`M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216c88.68 0 166.73-51.57 200-128c-26.39 11.49-57.38 16-88 16c-119.29 0-216-96.71-216-216z`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1)])}}),ki={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Ai=G({name:`NewspaperOutline`,render:function(e,t){return X(),q(`svg`,ki,t[0]||=[ft(`<path d="M368 415.86V72a24.07 24.07 0 0 0-24-24H72a24.07 24.07 0 0 0-24 24v352a40.12 40.12 0 0 0 40 40h328" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"></path><path d="M416 464h0a48 48 0 0 1-48-48V128h72a24 24 0 0 1 24 24v264a48 48 0 0 1-48 48z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M240 128h64"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M240 192h64"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M112 256h192"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M112 320h192"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M112 384h192"></path><path d="M176 208h-64a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v64a16 16 0 0 1-16 16z" fill="currentColor"></path>`,8)])}}),ji={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Mi=G({name:`NotificationsOutline`,render:function(e,t){return X(),q(`svg`,ji,t[0]||=[W(`path`,{d:`M427.68 351.43C402 320 383.87 304 383.87 217.35C383.87 138 343.35 109.73 310 96c-4.43-1.82-8.6-6-9.95-10.55C294.2 65.54 277.8 48 256 48s-38.21 17.55-44 37.47c-1.35 4.6-5.52 8.71-9.95 10.53c-33.39 13.75-73.87 41.92-73.87 121.35C128.13 304 110 320 84.32 351.43C73.68 364.45 83 384 101.61 384h308.88c18.51 0 27.77-19.61 17.19-32.57z`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),W(`path`,{d:`M320 384v16a64 64 0 0 1-128 0v-16`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1)])}}),Ni={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Pi=G({name:`PeopleOutline`,render:function(e,t){return X(),q(`svg`,Ni,t[0]||=[W(`path`,{d:`M402 168c-2.93 40.67-33.1 72-66 72s-63.12-31.32-66-72c-3-42.31 26.37-72 66-72s69 30.46 66 72z`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),W(`path`,{d:`M336 304c-65.17 0-127.84 32.37-143.54 95.41c-2.08 8.34 3.15 16.59 11.72 16.59h263.65c8.57 0 13.77-8.25 11.72-16.59C463.85 335.36 401.18 304 336 304z`,fill:`none`,stroke:`currentColor`,"stroke-miterlimit":`10`,"stroke-width":`32`},null,-1),W(`path`,{d:`M200 185.94c-2.34 32.48-26.72 58.06-53 58.06s-50.7-25.57-53-58.06C91.61 152.15 115.34 128 147 128s55.39 24.77 53 57.94z`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),W(`path`,{d:`M206 306c-18.05-8.27-37.93-11.45-59-11.45c-52 0-102.1 25.85-114.65 76.2c-1.65 6.66 2.53 13.25 9.37 13.25H154`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-miterlimit":`10`,"stroke-width":`32`},null,-1)])}}),Fi={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Ii=G({name:`PersonOutline`,render:function(e,t){return X(),q(`svg`,Fi,t[0]||=[W(`path`,{d:`M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),W(`path`,{d:`M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z`,fill:`none`,stroke:`currentColor`,"stroke-miterlimit":`10`,"stroke-width":`32`},null,-1)])}}),Li={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Ri=G({name:`ServerOutline`,render:function(e,t){return X(),q(`svg`,Li,t[0]||=[W(`ellipse`,{cx:`256`,cy:`128`,rx:`192`,ry:`80`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-miterlimit":`10`,"stroke-width":`32`},null,-1),W(`path`,{d:`M448 214c0 44.18-86 80-192 80S64 258.18 64 214`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-miterlimit":`10`,"stroke-width":`32`},null,-1),W(`path`,{d:`M448 300c0 44.18-86 80-192 80S64 344.18 64 300`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-miterlimit":`10`,"stroke-width":`32`},null,-1),W(`path`,{d:`M64 127.24v257.52C64 428.52 150 464 256 464s192-35.48 192-79.24V127.24`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-miterlimit":`10`,"stroke-width":`32`},null,-1)])}}),zi={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Bi=G({name:`SettingsOutline`,render:function(e,t){return X(),q(`svg`,zi,t[0]||=[W(`path`,{d:`M262.29 192.31a64 64 0 1 0 57.4 57.4a64.13 64.13 0 0 0-57.4-57.4zM416.39 256a154.34 154.34 0 0 1-1.53 20.79l45.21 35.46a10.81 10.81 0 0 1 2.45 13.75l-42.77 74a10.81 10.81 0 0 1-13.14 4.59l-44.9-18.08a16.11 16.11 0 0 0-15.17 1.75A164.48 164.48 0 0 1 325 400.8a15.94 15.94 0 0 0-8.82 12.14l-6.73 47.89a11.08 11.08 0 0 1-10.68 9.17h-85.54a11.11 11.11 0 0 1-10.69-8.87l-6.72-47.82a16.07 16.07 0 0 0-9-12.22a155.3 155.3 0 0 1-21.46-12.57a16 16 0 0 0-15.11-1.71l-44.89 18.07a10.81 10.81 0 0 1-13.14-4.58l-42.77-74a10.8 10.8 0 0 1 2.45-13.75l38.21-30a16.05 16.05 0 0 0 6-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 0 0-6.07-13.94l-38.19-30A10.81 10.81 0 0 1 49.48 186l42.77-74a10.81 10.81 0 0 1 13.14-4.59l44.9 18.08a16.11 16.11 0 0 0 15.17-1.75A164.48 164.48 0 0 1 187 111.2a15.94 15.94 0 0 0 8.82-12.14l6.73-47.89A11.08 11.08 0 0 1 213.23 42h85.54a11.11 11.11 0 0 1 10.69 8.87l6.72 47.82a16.07 16.07 0 0 0 9 12.22a155.3 155.3 0 0 1 21.46 12.57a16 16 0 0 0 15.11 1.71l44.89-18.07a10.81 10.81 0 0 1 13.14 4.58l42.77 74a10.8 10.8 0 0 1-2.45 13.75l-38.21 30a16.05 16.05 0 0 0-6.05 14.08c.33 4.14.55 8.3.55 12.47z`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1)])}}),Vi={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Hi=G({name:`ShieldOutline`,render:function(e,t){return X(),q(`svg`,Vi,t[0]||=[W(`path`,{d:`M463.1 112.37C373.68 96.33 336.71 84.45 256 48c-80.71 36.45-117.68 48.33-207.1 64.37C32.7 369.13 240.58 457.79 256 464c15.42-6.21 223.3-94.87 207.1-351.63z`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1)])}}),Ui={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Wi=G({name:`SunnyOutline`,render:function(e,t){return X(),q(`svg`,Ui,t[0]||=[ft(`<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M256 48v48"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M256 416v48"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M403.08 108.92l-33.94 33.94"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M142.86 369.14l-33.94 33.94"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M464 256h-48"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M96 256H48"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M403.08 403.08l-33.94-33.94"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M142.86 142.86l-33.94-33.94"></path><circle cx="256" cy="256" r="80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"></circle>`,9)])}}),Gi={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Ki=G({name:`TerminalOutline`,render:function(e,t){return X(),q(`svg`,Gi,t[0]||=[W(`rect`,{x:`32`,y:`48`,width:`448`,height:`416`,rx:`48`,ry:`48`,fill:`none`,stroke:`currentColor`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),W(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M96 112l80 64l-80 64`},null,-1),W(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M192 240h64`},null,-1)])}}),qi={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Ji=G({name:`TimeOutline`,render:function(e,t){return X(),q(`svg`,qi,t[0]||=[W(`path`,{d:`M256 64C150 64 64 150 64 256s86 192 192 192s192-86 192-192S362 64 256 64z`,fill:`none`,stroke:`currentColor`,"stroke-miterlimit":`10`,"stroke-width":`32`},null,-1),W(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M256 128v144h96`},null,-1)])}}),Yi={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Xi=G({name:`TvOutline`,render:function(e,t){return X(),q(`svg`,Yi,t[0]||=[W(`rect`,{x:`32`,y:`96`,width:`448`,height:`272`,rx:`32.14`,ry:`32.14`,fill:`none`,stroke:`currentColor`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),W(`path`,{stroke:`currentColor`,"stroke-linecap":`round`,"stroke-miterlimit":`10`,"stroke-width":`32`,d:`M128 416h256`,fill:`currentColor`},null,-1)])}}),Zi={class:`setting-group`},Qi={class:`setting-group`},$i={class:`setting-label`},ea={class:`setting-group`},ta={class:`setting-group`},na={class:`setting-group`},ra={class:`setting-group`},ia={class:`setting-group`},aa={class:`setting-group`},oa={class:`setting-group`},sa={class:`setting-group`},ca={class:`setting-group`},la={class:`setting-group`},ua={class:`setting-group`},da={class:`setting-group`},fa={class:`setting-group`},pa={class:`setting-group`},ma={class:`setting-group`},ha={class:`setting-group`},ga={class:`setting-group`},_a={class:`setting-group`},va={class:`setting-group`},ya={class:`setting-group`},ba={class:`setting-group`},xa={class:`setting-group`},Sa={class:`setting-group`},Ca={class:`setting-group`},wa={class:`drawer-footer`},Ta=Gt(G({__name:`layout`,setup(e,{expose:t}){let n=Tt(),r=L(!1),i=L(`layout`),a=[{label:`默认`,value:`default`},{label:`经典`,value:`classic`},{label:`单栏`,value:`single`}];function o(){n.reset()}function c(){r.value=!0}function l(){r.value=!1}return t({open:c,close:l}),(e,t)=>(X(),pe(I(lr),{show:r.value,"onUpdate:show":t[28]||=e=>r.value=e,width:380,placement:`right`},{default:A(()=>[J(I(ur),{title:`布局配置`,closable:``},{footer:A(()=>[W(`div`,wa,[J(I(Ce),{onClick:o,type:`warning`,ghost:``},{default:A(()=>[...t[56]||=[yt(`恢复默认`,-1)]]),_:1}),J(I(Ce),{onClick:t[27]||=e=>r.value=!1},{default:A(()=>[...t[57]||=[yt(`关闭`,-1)]]),_:1})])]),default:A(()=>[J(I(v),{value:i.value,"onUpdate:value":t[26]||=e=>i.value=e,type:`line`,"justify-content":`space-around`},{default:A(()=>[J(I(_),{name:`layout`,tab:`布局`},{default:A(()=>[W(`div`,Zi,[t[29]||=W(`div`,{class:`setting-label`},`布局方式`,-1),J(I(s),{value:I(n).settings.layoutMode,"onUpdate:value":t[0]||=e=>I(n).settings.layoutMode=e,options:a},null,8,[`value`])]),W(`div`,Qi,[W(`div`,$i,`侧边菜单宽度 (`+Rt(I(n).settings.sidebarWidth)+`px)`,1),J(I(oi),{value:I(n).settings.sidebarWidth,"onUpdate:value":t[1]||=e=>I(n).settings.sidebarWidth=e,min:180,max:320,step:10},null,8,[`value`])]),W(`div`,ea,[t[30]||=W(`div`,{class:`setting-label`},`侧边菜单水平折叠`,-1),J(I(C),{value:I(n).settings.sidebarCollapsed,"onUpdate:value":t[2]||=e=>I(n).settings.sidebarCollapsed=e},null,8,[`value`])]),W(`div`,ta,[t[31]||=W(`div`,{class:`setting-label`},`侧边菜单手风琴模式`,-1),J(I(C),{value:I(n).settings.sidebarAccordion,"onUpdate:value":t[3]||=e=>I(n).settings.sidebarAccordion=e},null,8,[`value`])]),W(`div`,na,[t[32]||=W(`div`,{class:`setting-label`},`后台页面切换动画`,-1),J(I(C),{value:I(n).settings.pageTransition,"onUpdate:value":t[4]||=e=>I(n).settings.pageTransition=e},null,8,[`value`])])]),_:1}),J(I(_),{name:`global`,tab:`全局`},{default:A(()=>[W(`div`,ra,[t[33]||=W(`div`,{class:`setting-label`},`暗黑模式`,-1),J(I(C),{value:I(n).settings.darkMode,"onUpdate:value":t[5]||=e=>I(n).settings.darkMode=e},null,8,[`value`])]),W(`div`,ia,[t[34]||=W(`div`,{class:`setting-label`},`后台页面切换动画`,-1),J(I(C),{value:I(n).settings.pageTransition,"onUpdate:value":t[6]||=e=>I(n).settings.pageTransition=e},null,8,[`value`])])]),_:1}),J(I(_),{name:`sidebar`,tab:`侧边栏`},{default:A(()=>[W(`div`,aa,[t[35]||=W(`div`,{class:`setting-label`},`侧边菜单栏背景色`,-1),J(I($),{value:I(n).settings.sidebarBgColor,"onUpdate:value":t[7]||=e=>I(n).settings.sidebarBgColor=e,modes:[`hex`]},null,8,[`value`])]),W(`div`,oa,[t[36]||=W(`div`,{class:`setting-label`},`侧边菜单激活项背景色`,-1),J(I($),{value:I(n).settings.sidebarActiveBg,"onUpdate:value":t[8]||=e=>I(n).settings.sidebarActiveBg=e,modes:[`rgb`]},null,8,[`value`])]),W(`div`,sa,[t[37]||=W(`div`,{class:`setting-label`},`侧边菜单激活项文字色`,-1),J(I($),{value:I(n).settings.sidebarActiveText,"onUpdate:value":t[9]||=e=>I(n).settings.sidebarActiveText=e,modes:[`hex`]},null,8,[`value`])]),W(`div`,ca,[t[38]||=W(`div`,{class:`setting-label`},`侧边菜单文字颜色`,-1),J(I($),{value:I(n).settings.sidebarTextColor,"onUpdate:value":t[10]||=e=>I(n).settings.sidebarTextColor=e,modes:[`hex`]},null,8,[`value`])]),W(`div`,la,[t[39]||=W(`div`,{class:`setting-label`},`侧边菜单悬停时背景色`,-1),J(I($),{value:I(n).settings.sidebarHoverBg,"onUpdate:value":t[11]||=e=>I(n).settings.sidebarHoverBg=e,modes:[`rgb`]},null,8,[`value`])]),J(I(S),null,{default:A(()=>[...t[40]||=[yt(`顶栏设置`,-1)]]),_:1}),W(`div`,ua,[t[41]||=W(`div`,{class:`setting-label`},`显示侧边菜单顶栏`,-1),J(I(C),{value:I(n).settings.showSidebarTop,"onUpdate:value":t[12]||=e=>I(n).settings.showSidebarTop=e},null,8,[`value`])]),W(`div`,da,[t[42]||=W(`div`,{class:`setting-label`},`侧边菜单顶栏背景色`,-1),J(I($),{value:I(n).settings.sidebarTopBg,"onUpdate:value":t[13]||=e=>I(n).settings.sidebarTopBg=e,modes:[`hex`]},null,8,[`value`])]),W(`div`,fa,[t[43]||=W(`div`,{class:`setting-label`},`侧边菜单顶栏文字色`,-1),J(I($),{value:I(n).settings.sidebarTopText,"onUpdate:value":t[14]||=e=>I(n).settings.sidebarTopText=e,modes:[`hex`]},null,8,[`value`])]),W(`div`,pa,[t[44]||=W(`div`,{class:`setting-label`},`侧边菜单顶栏内容居中`,-1),J(I(C),{value:I(n).settings.sidebarTopCentered,"onUpdate:value":t[15]||=e=>I(n).settings.sidebarTopCentered=e},null,8,[`value`])]),W(`div`,ma,[t[45]||=W(`div`,{class:`setting-label`},`侧边菜单顶栏显示LOGO`,-1),J(I(C),{value:I(n).settings.sidebarTopLogo,"onUpdate:value":t[16]||=e=>I(n).settings.sidebarTopLogo=e},null,8,[`value`])]),J(I(S),null,{default:A(()=>[...t[46]||=[yt(`底部工具栏`,-1)]]),_:1}),W(`div`,ha,[t[47]||=W(`div`,{class:`setting-label`},`底部工具栏自动隐藏`,-1),J(I(C),{value:I(n).settings.sidebarFooterAutoHide,"onUpdate:value":t[17]||=e=>I(n).settings.sidebarFooterAutoHide=e},null,8,[`value`])]),W(`div`,ga,[t[48]||=W(`div`,{class:`setting-label`},`底部工具栏图标颜色`,-1),J(I($),{value:I(n).settings.sidebarFooterIconColor,"onUpdate:value":t[18]||=e=>I(n).settings.sidebarFooterIconColor=e,modes:[`hex`]},null,8,[`value`])]),W(`div`,_a,[t[49]||=W(`div`,{class:`setting-label`},`底部工具栏悬停图标色`,-1),J(I($),{value:I(n).settings.sidebarFooterHoverIconColor,"onUpdate:value":t[19]||=e=>I(n).settings.sidebarFooterHoverIconColor=e,modes:[`hex`]},null,8,[`value`])]),W(`div`,va,[t[50]||=W(`div`,{class:`setting-label`},`底部工具栏悬停背景色`,-1),J(I($),{value:I(n).settings.sidebarFooterHoverBg,"onUpdate:value":t[20]||=e=>I(n).settings.sidebarFooterHoverBg=e,modes:[`rgb`]},null,8,[`value`])])]),_:1}),J(I(_),{name:`header`,tab:`顶栏`},{default:A(()=>[W(`div`,ya,[t[51]||=W(`div`,{class:`setting-label`},`顶栏背景色`,-1),J(I($),{value:I(n).settings.headerBgColor,"onUpdate:value":t[21]||=e=>I(n).settings.headerBgColor=e,modes:[`hex`]},null,8,[`value`])]),W(`div`,ba,[t[52]||=W(`div`,{class:`setting-label`},`顶栏文字色`,-1),J(I($),{value:I(n).settings.headerTextColor,"onUpdate:value":t[22]||=e=>I(n).settings.headerTextColor=e,modes:[`hex`]},null,8,[`value`])]),W(`div`,xa,[t[53]||=W(`div`,{class:`setting-label`},`顶栏悬停时背景色`,-1),J(I($),{value:I(n).settings.headerHoverBg,"onUpdate:value":t[23]||=e=>I(n).settings.headerHoverBg=e,modes:[`rgb`]},null,8,[`value`])]),W(`div`,Sa,[t[54]||=W(`div`,{class:`setting-label`},`顶栏激活项背景色`,-1),J(I($),{value:I(n).settings.headerActiveBg,"onUpdate:value":t[24]||=e=>I(n).settings.headerActiveBg=e,modes:[`rgb`]},null,8,[`value`])]),W(`div`,Ca,[t[55]||=W(`div`,{class:`setting-label`},`顶栏激活项文字色`,-1),J(I($),{value:I(n).settings.headerActiveText,"onUpdate:value":t[25]||=e=>I(n).settings.headerActiveText=e,modes:[`hex`]},null,8,[`value`])])]),_:1})]),_:1},8,[`value`])]),_:1})]),_:1},8,[`show`]))}}),[[`__scopeId`,`data-v-6eca0f25`]]),Ea={key:0,class:`logo-icon`},Da={key:0,class:`logo-text`},Oa={class:`sider-footer`},ka={class:`header-left`},Aa={class:`header-right`},ja={class:`user-trigger`},Ma={class:`user-name`},Na={key:0,class:`tabs-bar`},Pa={class:`tabs-inner`},Fa=[`onClick`],Ia={key:0,class:`tab-dot`},La={class:`tab-title`},Ra=Gt(G({__name:`index`,setup(e){let t=ae(),n=M(),r=Vt(),i=Tt(),a=dt();function s(){i.settings.darkMode=!i.settings.darkMode}let l=L(null),u=U(()=>i.settings.sidebarCollapsed),d=L(n.path),f=L([]),p=L([{path:`/dashboard`,title:`控制台`}]),m=L(`/dashboard`),h={HomeOutline:wi,ShieldOutline:Hi,PeopleOutline:Pi,SettingsOutline:Bi,ServerOutline:Ri,CodeOutline:vi,PersonOutline:Ii,CubeOutline:bi,NotificationsOutline:Mi,FlashOutline:Ut,BarChartOutline:ci,TimeOutline:Ji,CardOutline:ui,TerminalOutline:Ki,DocumentTextOutline:Si,LayersOutline:Ei,NewspaperOutline:Ai,TvOutline:Xi},_={"time-outline":`TimeOutline`,"card-outline":`CardOutline`,"code-outline":`CodeOutline`,"monitor-outline":`TvOutline`,"people-outline":`PeopleOutline`},v={CMS:Ai,消息通知:Mi,数据管理:Ri,权限管理:Hi,会员管理:Pi,系统管理:Bi,代码生成:vi,个人资料:Ii,数据大屏:ci,AI智能开发:Ut,模块市场:bi,定时任务:Ji,支付管理:ui,CRUD生成器:vi,租户管理:Pi,WEB终端:Ki,控制台:wi},y={管理员管理:Hi,角色管理:Pi,菜单规则:Ei,管理员日志:Si,会员列表:Pi,会员分组:Ei,系统配置:Bi,附件管理:Si,系统监控:Xi,回收站:Ri,栏目管理:Ei,文章管理:Ai};function b(e,t,n){if(e&&h[e])return h[e];if(e&&_[e])return h[_[e]];if(!n&&v[t])return v[t];if(n&&y[t])return y[t]}function x(e,t=!1){return e.map(e=>{let n=b(e.icon,e.title,t);return{label:e.title||e.name,key:e.path||e.name||``,icon:n?()=>Y(c,null,{default:()=>Y(n)}):void 0,children:e.children?.length?x(e.children,!0):void 0}})}let S=U(()=>x(r.menus)),C=U(()=>{let e=[{path:`/`,title:`首页`}];return n.matched.filter(e=>e.path!==`/`).forEach(t=>e.push({path:t.path,title:t.meta?.title||t.name||``})),e});function T(e,t){for(let n of e){if(n.path===t)return n;if(n.children){let e=T(n.children,t);if(e)return e}}return null}function E(e,t){for(let n of e){if(n.path===t)return n.title;if(n.children){let e=E(n.children,t);if(e)return e}}return null}function ee(e,t){for(let n of e)if(n.path===t||n.children?.length&&ee(n.children,t))return!0;return!1}function te(e,t){for(let n of e){if(n.path===t&&n.children?.length)return[n.path];if(n.children?.length){if(ee(n.children,t))return[n.path];let e=te(n.children,t);if(e.length)return[n.path,...e]}}return[]}function ne(e){f.value=e}function O(){f.value=te(r.menus,n.path)}function k(e){if(T(r.menus,e)?.children?.length){d.value=e;return}if(!p.value.find(t=>t.path===e)){let t=E(r.menus,e)||e.split(`/`).pop()||e;p.value.push({path:e,title:t})}d.value=e,m.value=e,t.push(e)}function re(e){let n=p.value.findIndex(t=>t.path===e);if(n!==-1&&(p.value.splice(n,1),m.value===e)){let e=p.value[Math.min(n,p.value.length-1)];e&&(m.value=e.path,d.value=e.path,t.push(e.path))}}let j=[{label:`个人资料`,key:`profile`},{type:`divider`},{label:`退出登录`,key:`logout`}];function N(e){e===`logout`?(r.logout(),t.push(`/login`)):e===`profile`&&t.push(`/profile`)}let P=L(0),F=null;function ie(){t.push(`/notification`)}async function oe(){try{P.value=(await Wt()).data.count||0}catch{}}return Xe(async()=>{await r.getPermissions(),O(),oe(),F=setInterval(oe,3e4)}),_t(()=>{F&&clearInterval(F)}),Mt(()=>r.menus,()=>O()),Mt(()=>n.path,e=>{if(d.value=e,m.value=e,O(),!p.value.find(t=>t.path===e)){let t=n.meta?.title||e.split(`/`).pop()||e;p.value.push({path:e,title:t})}}),(e,n)=>{let h=ti,_=Ce,v=Ar,y=fn,b=un,x=o,T=sn,E=nn,ee=g,te=Tr,O=_e(`router-view`),M=Sr,F=xr;return X(),q(ce,null,[J(F,{class:`layout`,"has-sider":``},{default:A(()=>[J(v,{width:u.value?72:I(i).settings.sidebarWidth,"native-scrollbar":!1,class:`sider`},{default:A(()=>[I(i).settings.showSidebarTop?(X(),q(`div`,{key:0,class:le([`logo`,{"logo-centered":I(i).settings.sidebarTopCentered}]),onClick:n[0]||=e=>I(t).push(`/dashboard`)},[I(i).settings.sidebarTopLogo?(X(),q(`div`,Ea,[J(I(c),{size:`24`,color:`#fff`},{default:A(()=>[J(I(bi))]),_:1})])):w(``,!0),J(ge,{name:`logo-fade`},{default:A(()=>[u.value?w(``,!0):(X(),q(`span`,Da,`SwiftAdmin`))]),_:1})],2)):w(``,!0),J(h,{value:d.value,"expanded-keys":f.value,options:S.value,collapsed:u.value,"collapsed-width":72,indent:20,"root-indent":14,accordion:I(i).settings.sidebarAccordion,class:`sidebar-menu`,"onUpdate:value":k,"onUpdate:expandedKeys":ne},null,8,[`value`,`expanded-keys`,`options`,`collapsed`,`accordion`]),W(`div`,Oa,[J(_,{quaternary:``,class:`collapse-btn`,onClick:n[1]||=e=>I(i).settings.sidebarCollapsed=!I(i).settings.sidebarCollapsed},{icon:A(()=>[J(I(c),{size:`18`},{default:A(()=>[u.value?(X(),pe(I(mi),{key:1})):(X(),pe(I(fi),{key:0}))]),_:1})]),_:1})])]),_:1},8,[`width`]),J(F,{class:`main-area`},{default:A(()=>[J(te,{class:`header`},{default:A(()=>[W(`div`,ka,[J(b,{class:`breadcrumb`},{separator:A(()=>[J(I(c),{size:`14`,color:`#c0c4cc`},{default:A(()=>[J(I(mi))]),_:1})]),default:A(()=>[(X(!0),q(ce,null,Fe(C.value,e=>(X(),pe(y,{key:e.path},{default:A(()=>[yt(Rt(e.title),1)]),_:2},1024))),128))]),_:1})]),W(`div`,Aa,[J(x,null,{trigger:A(()=>[J(_,{quaternary:``,circle:``,size:`small`,onClick:n[2]||=e=>l.value?.open()},{icon:A(()=>[J(I(c),{size:`18`},{default:A(()=>[J(I(Bi))]),_:1})]),_:1})]),default:A(()=>[n[4]||=yt(` 布局配置 `,-1)]),_:1}),J(x,null,{trigger:A(()=>[J(_,{quaternary:``,circle:``,size:`small`,onClick:n[3]||=e=>s()},{icon:A(()=>[J(I(c),{size:`18`},{default:A(()=>[I(a)?(X(),pe(I(Wi),{key:1})):(X(),pe(I(Oi),{key:0}))]),_:1})]),_:1})]),default:A(()=>[yt(` `+Rt(I(a)?`切换亮色模式`:`切换暗黑模式`),1)]),_:1}),J(x,null,{trigger:A(()=>[J(T,{value:P.value,max:99,show:P.value>0,dot:``},{default:A(()=>[J(_,{quaternary:``,circle:``,size:`small`,onClick:ie},{icon:A(()=>[J(I(c),{size:`18`},{default:A(()=>[J(I(Mi))]),_:1})]),_:1})]),_:1},8,[`value`,`show`])]),default:A(()=>[n[5]||=yt(` 消息通知 `,-1)]),_:1}),J(ee,{options:j,onSelect:N,placement:`bottom-end`},{default:A(()=>[W(`div`,ja,[J(E,{size:32,round:``,style:{background:`linear-gradient(135deg, #667eea 0%, #764ba2 100%)`}},{default:A(()=>[yt(Rt(I(r).info.nickname?.charAt(0)||`A`),1)]),_:1}),W(`span`,Ma,Rt(I(r).info.nickname||`Admin`),1),J(I(c),{size:`14`,color:`#999`},{default:A(()=>[J(I(Ht))]),_:1})])]),_:1})])]),_:1}),p.value.length>0?(X(),q(`div`,Na,[W(`div`,Pa,[(X(!0),q(ce,null,Fe(p.value,e=>(X(),q(`div`,{key:e.path,class:le([`tab-item`,{active:m.value===e.path}]),onClick:n=>{m.value=e.path,I(t).push(e.path)}},[m.value===e.path?(X(),q(`span`,Ia)):w(``,!0),W(`span`,La,Rt(e.title),1),p.value.length>1?(X(),pe(I(c),{key:1,size:`14`,class:`tab-close`,onClick:Ee(t=>re(e.path),[`stop`])},{default:A(()=>[J(I(gi))]),_:1},8,[`onClick`])):w(``,!0)],10,Fa))),128))])])):w(``,!0),J(M,{class:`content`},{default:A(()=>[J(O,null,{default:A(({Component:e})=>[J(ge,{name:`fade-slide`,mode:`out-in`},{default:A(()=>[(X(),pe(D(e)))]),_:2},1024)]),_:1})]),_:1})]),_:1})]),_:1}),J(Ta,{ref_key:`settingsDrawer`,ref:l},null,512)],64)}}}),[[`__scopeId`,`data-v-7d3883d0`]]);export{Ra as default};