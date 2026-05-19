import{$n as e,Ar as t,Dr as n,J as r,Mi as i,Or as a,St as o,Tr as s,Tt as c,Xr as l,Y as u,Zr as d,_t as f,ai as p,br as m,bt as h,cn as g,dt as _,ei as v,er as y,ft as b,gt as x,ht as S,li as C,mt as w,nn as T,rn as E,si as D,st as O,un as k,vi as A,wr as j}from"./index-CstmdvSQ.js";function M(t){let{lineHeight:n,borderRadius:r,fontWeightStrong:i,baseColor:a,dividerColor:o,actionColor:s,textColor1:c,textColor2:l,closeColorHover:d,closeColorPressed:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,infoColor:g,successColor:_,warningColor:v,errorColor:b,fontSize:x}=t;return Object.assign(Object.assign({},u),{fontSize:x,lineHeight:n,titleFontWeight:i,borderRadius:r,border:`1px solid ${o}`,color:s,titleTextColor:c,iconColor:l,contentTextColor:l,closeBorderRadius:r,closeColorHover:d,closeColorPressed:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,borderInfo:`1px solid ${y(a,e(g,{alpha:.25}))}`,colorInfo:y(a,e(g,{alpha:.08})),titleTextColorInfo:c,iconColorInfo:g,contentTextColorInfo:l,closeColorHoverInfo:d,closeColorPressedInfo:f,closeIconColorInfo:p,closeIconColorHoverInfo:m,closeIconColorPressedInfo:h,borderSuccess:`1px solid ${y(a,e(_,{alpha:.25}))}`,colorSuccess:y(a,e(_,{alpha:.08})),titleTextColorSuccess:c,iconColorSuccess:_,contentTextColorSuccess:l,closeColorHoverSuccess:d,closeColorPressedSuccess:f,closeIconColorSuccess:p,closeIconColorHoverSuccess:m,closeIconColorPressedSuccess:h,borderWarning:`1px solid ${y(a,e(v,{alpha:.33}))}`,colorWarning:y(a,e(v,{alpha:.08})),titleTextColorWarning:c,iconColorWarning:v,contentTextColorWarning:l,closeColorHoverWarning:d,closeColorPressedWarning:f,closeIconColorWarning:p,closeIconColorHoverWarning:m,closeIconColorPressedWarning:h,borderError:`1px solid ${y(a,e(b,{alpha:.25}))}`,colorError:y(a,e(b,{alpha:.08})),titleTextColorError:c,iconColorError:b,contentTextColorError:l,closeColorHoverError:d,closeColorPressedError:f,closeIconColorError:p,closeIconColorHoverError:m,closeIconColorPressedError:h})}var N={name:`Alert`,common:O,self:M},P=s(`alert`,`
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
 word-break: break-word;
`,[n(`border`,`
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 transition: border-color .3s var(--n-bezier);
 border: var(--n-border);
 pointer-events: none;
 `),a(`closable`,[s(`alert-body`,[n(`title`,`
 padding-right: 24px;
 `)])]),n(`icon`,{color:`var(--n-icon-color)`}),s(`alert-body`,{padding:`var(--n-padding)`},[n(`title`,{color:`var(--n-title-text-color)`}),n(`content`,{color:`var(--n-content-text-color)`})]),r({originalTransition:`transform .3s var(--n-bezier)`,enterToProps:{transform:`scale(1)`},leaveToProps:{transform:`scale(0.9)`}}),n(`icon`,`
 position: absolute;
 left: 0;
 top: 0;
 align-items: center;
 justify-content: center;
 display: flex;
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 margin: var(--n-icon-margin);
 `),n(`close`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 `),a(`show-icon`,[s(`alert-body`,{paddingLeft:`calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))`})]),a(`right-adjust`,[s(`alert-body`,{paddingRight:`calc(var(--n-close-size) + var(--n-padding) + 2px)`})]),s(`alert-body`,`
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[n(`title`,`
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `,[j(`& +`,[n(`content`,{marginTop:`9px`})])]),n(`content`,{transition:`color .3s var(--n-bezier)`,fontSize:`var(--n-font-size)`})]),n(`icon`,{transition:`color .3s var(--n-bezier)`})]),F=p({name:`Alert`,inheritAttrs:!1,props:Object.assign(Object.assign({},o.props),{title:String,showIcon:{type:Boolean,default:!0},type:{type:String,default:`default`},bordered:{type:Boolean,default:!0},closable:Boolean,onClose:Function,onAfterLeave:Function,onAfterHide:Function}),slots:Object,setup(e){let{mergedClsPrefixRef:n,mergedBorderedRef:r,inlineThemeDisabled:a,mergedRtlRef:s}=E(e),u=o(`Alert`,`-alert`,P,N,e,n),d=c(`Alert`,s,n),f=l(()=>{let{common:{cubicBezierEaseInOut:n},self:r}=u.value,{fontSize:i,borderRadius:a,titleFontWeight:o,lineHeight:s,iconSize:c,iconMargin:l,iconMarginRtl:d,closeIconSize:f,closeBorderRadius:p,closeSize:h,closeMargin:g,closeMarginRtl:_,padding:v}=r,{type:y}=e,{left:b,right:x}=m(l);return{"--n-bezier":n,"--n-color":r[t(`color`,y)],"--n-close-icon-size":f,"--n-close-border-radius":p,"--n-close-color-hover":r[t(`closeColorHover`,y)],"--n-close-color-pressed":r[t(`closeColorPressed`,y)],"--n-close-icon-color":r[t(`closeIconColor`,y)],"--n-close-icon-color-hover":r[t(`closeIconColorHover`,y)],"--n-close-icon-color-pressed":r[t(`closeIconColorPressed`,y)],"--n-icon-color":r[t(`iconColor`,y)],"--n-border":r[t(`border`,y)],"--n-title-text-color":r[t(`titleTextColor`,y)],"--n-content-text-color":r[t(`contentTextColor`,y)],"--n-line-height":s,"--n-border-radius":a,"--n-font-size":i,"--n-title-font-weight":o,"--n-icon-size":c,"--n-icon-margin":l,"--n-icon-margin-rtl":d,"--n-close-size":h,"--n-close-margin":g,"--n-close-margin-rtl":_,"--n-padding":v,"--n-icon-margin-left":b,"--n-icon-margin-right":x}}),p=a?T(`alert`,l(()=>e.type[0]),f,e):void 0,h=i(!0),g=()=>{let{onAfterLeave:t,onAfterHide:n}=e;t&&t(),n&&n()};return{rtlEnabled:d,mergedClsPrefix:n,mergedBordered:r,visible:h,handleCloseClick:()=>{Promise.resolve(e.onClose?.call(e)).then(e=>{e!==!1&&(h.value=!1)})},handleAfterLeave:()=>{g()},mergedTheme:u,cssVars:a?void 0:f,themeClass:p?.themeClass,onRender:p?.onRender}},render(){var e;return(e=this.onRender)==null||e.call(this),D(_,{onAfterLeave:this.handleAfterLeave},{default:()=>{let{mergedClsPrefix:e,$slots:t}=this,n={class:[`${e}-alert`,this.themeClass,this.closable&&`${e}-alert--closable`,this.showIcon&&`${e}-alert--show-icon`,!this.title&&this.closable&&`${e}-alert--right-adjust`,this.rtlEnabled&&`${e}-alert--rtl`],style:this.cssVars,role:`alert`};return this.visible?D(`div`,Object.assign({},C(this.$attrs,n)),this.closable&&D(b,{clsPrefix:e,class:`${e}-alert__close`,onClick:this.handleCloseClick}),this.bordered&&D(`div`,{class:`${e}-alert__border`}),this.showIcon&&D(`div`,{class:`${e}-alert__icon`,"aria-hidden":`true`},g(t.icon,()=>[D(h,{clsPrefix:e},{default:()=>{switch(this.type){case`success`:return D(S,null);case`info`:return D(x,null);case`warning`:return D(w,null);case`error`:return D(f,null);default:return null}}})])),D(`div`,{class:[`${e}-alert-body`,this.mergedBordered&&`${e}-alert-body--bordered`]},k(t.header,t=>{let n=t||this.title;return n?D(`div`,{class:`${e}-alert-body__title`},n):null}),t.default&&D(`div`,{class:`${e}-alert-body__content`},t))):null}})}}),I={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},L=p({name:`AddOutline`,render:function(e,t){return A(),v(`svg`,I,t[0]||=[d(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M256 112v288`},null,-1),d(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M400 256H112`},null,-1)])}}),R={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},z=p({name:`CreateOutline`,render:function(e,t){return A(),v(`svg`,R,t[0]||=[d(`path`,{d:`M384 224v184a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V168a40 40 0 0 1 40-40h167.48`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),d(`path`,{d:`M459.94 53.25a16.06 16.06 0 0 0-23.22-.56L424.35 65a8 8 0 0 0 0 11.31l11.34 11.32a8 8 0 0 0 11.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38z`,fill:`currentColor`},null,-1),d(`path`,{d:`M399.34 90L218.82 270.2a9 9 0 0 0-2.31 3.93L208.16 299a3.91 3.91 0 0 0 4.86 4.86l24.85-8.35a9 9 0 0 0 3.93-2.31L422 112.66a9 9 0 0 0 0-12.66l-9.95-10a9 9 0 0 0-12.71 0z`,fill:`currentColor`},null,-1)])}});export{L as n,F as r,z as t};