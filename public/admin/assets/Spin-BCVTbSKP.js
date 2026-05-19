import{o as e}from"./Tag-D4bZfoIR.js";import{Ar as t,Mi as n,Or as r,Rr as i,St as a,Ti as o,Tr as s,Xr as c,ai as l,ct as u,lt as d,nn as f,rn as p,s as m,si as h,ut as g,wr as _,xr as v}from"./index-CstmdvSQ.js";var y=_([_(`@keyframes spin-rotate`,`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),s(`spin-container`,`
 position: relative;
 `,[s(`spin-body`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[u()])]),s(`spin-body`,`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),s(`spin`,`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[r(`rotate`,`
 animation: spin-rotate 2s linear infinite;
 `)]),s(`spin-description`,`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),s(`spin-content`,`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[r(`spinning`,`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),b={small:20,medium:18,large:16},x=l({name:`Spin`,props:Object.assign(Object.assign(Object.assign({},a.props),{contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number}),g),slots:Object,setup(r){let{mergedClsPrefixRef:i,inlineThemeDisabled:s}=p(r),l=a(`Spin`,`-spin`,y,m,r,i),u=c(()=>{let{size:e}=r,{common:{cubicBezierEaseInOut:n},self:i}=l.value,{opacitySpinning:a,color:o,textColor:s}=i;return{"--n-bezier":n,"--n-opacity-spinning":a,"--n-size":typeof e==`number`?v(e):i[t(`size`,e)],"--n-color":o,"--n-text-color":s}}),d=s?f(`spin`,c(()=>{let{size:e}=r;return typeof e==`number`?String(e):e[0]}),u,r):void 0,h=e(r,[`spinning`,`show`]),g=n(!1);return o(e=>{let t;if(h.value){let{delay:n}=r;if(n){t=window.setTimeout(()=>{g.value=!0},n),e(()=>{clearTimeout(t)});return}}g.value=h.value}),{mergedClsPrefix:i,active:g,mergedStrokeWidth:c(()=>{let{strokeWidth:e}=r;if(e!==void 0)return e;let{size:t}=r;return b[typeof t==`number`?`medium`:t]}),cssVars:s?void 0:u,themeClass:d?.themeClass,onRender:d?.onRender}},render(){var e;let{$slots:t,mergedClsPrefix:n,description:r}=this,a=t.icon&&this.rotate,o=(r||t.description)&&h(`div`,{class:`${n}-spin-description`},r||t.description?.call(t)),s=t.icon?h(`div`,{class:[`${n}-spin-body`,this.themeClass]},h(`div`,{class:[`${n}-spin`,a&&`${n}-spin--rotate`],style:t.default?``:this.cssVars},t.icon()),o):h(`div`,{class:[`${n}-spin-body`,this.themeClass]},h(d,{clsPrefix:n,style:t.default?``:this.cssVars,stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:`${n}-spin`}),o);return(e=this.onRender)==null||e.call(this),t.default?h(`div`,{class:[`${n}-spin-container`,this.themeClass],style:this.cssVars},h(`div`,{class:[`${n}-spin-content`,this.active&&`${n}-spin-content--spinning`,this.contentClass],style:this.contentStyle},t),h(i,{name:`fade-in-transition`},{default:()=>this.active?s:null})):s}});export{x as t};