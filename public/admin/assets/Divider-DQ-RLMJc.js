import{Dr as e,Kr as t,Or as n,St as r,Tr as i,Xr as a,ai as o,h as s,kr as c,nn as l,rn as u,si as d}from"./index-CstmdvSQ.js";var f=i(`divider`,`
 position: relative;
 display: flex;
 width: 100%;
 box-sizing: border-box;
 font-size: 16px;
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
`,[c(`vertical`,`
 margin-top: 24px;
 margin-bottom: 24px;
 `,[c(`no-title`,`
 display: flex;
 align-items: center;
 `)]),e(`title`,`
 display: flex;
 align-items: center;
 margin-left: 12px;
 margin-right: 12px;
 white-space: nowrap;
 font-weight: var(--n-font-weight);
 `),n(`title-position-left`,[e(`line`,[n(`left`,{width:`28px`})])]),n(`title-position-right`,[e(`line`,[n(`right`,{width:`28px`})])]),n(`dashed`,[e(`line`,`
 background-color: #0000;
 height: 0px;
 width: 100%;
 border-style: dashed;
 border-width: 1px 0 0;
 `)]),n(`vertical`,`
 display: inline-block;
 height: 1em;
 margin: 0 8px;
 vertical-align: middle;
 width: 1px;
 `),e(`line`,`
 border: none;
 transition: background-color .3s var(--n-bezier), border-color .3s var(--n-bezier);
 height: 1px;
 width: 100%;
 margin: 0;
 `),c(`dashed`,[e(`line`,{backgroundColor:`var(--n-color)`})]),n(`dashed`,[e(`line`,{borderColor:`var(--n-color)`})]),n(`vertical`,{backgroundColor:`var(--n-color)`})]),p=o({name:`Divider`,props:Object.assign(Object.assign({},r.props),{titlePlacement:{type:String,default:`center`},dashed:Boolean,vertical:Boolean}),setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=u(e),i=r(`Divider`,`-divider`,f,s,e,t),o=a(()=>{let{common:{cubicBezierEaseInOut:e},self:{color:t,textColor:n,fontWeight:r}}=i.value;return{"--n-bezier":e,"--n-color":t,"--n-text-color":n,"--n-font-weight":r}}),c=n?l(`divider`,void 0,o,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:o,themeClass:c?.themeClass,onRender:c?.onRender}},render(){var e;let{$slots:n,titlePlacement:r,vertical:i,dashed:a,cssVars:o,mergedClsPrefix:s}=this;return(e=this.onRender)==null||e.call(this),d(`div`,{role:`separator`,class:[`${s}-divider`,this.themeClass,{[`${s}-divider--vertical`]:i,[`${s}-divider--no-title`]:!n.default,[`${s}-divider--dashed`]:a,[`${s}-divider--title-position-${r}`]:n.default&&r}],style:o},i?null:d(`div`,{class:`${s}-divider__line ${s}-divider__line--left`}),!i&&n.default?d(t,null,d(`div`,{class:`${s}-divider__title`},this.$slots),d(`div`,{class:`${s}-divider__line ${s}-divider__line--right`})):null)}});export{p as t};