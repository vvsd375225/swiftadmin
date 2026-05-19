import{u as e}from"./Input-Dvq5rpDK.js";import{Ar as t,Or as n,Pr as r,St as i,Tr as a,Xr as o,_t as s,ai as c,bt as l,gt as u,ht as d,l as f,mt as p,nn as m,rn as h,si as g,wr as _}from"./index-CstmdvSQ.js";var v={success:g(d,null),error:g(s,null),warning:g(p,null),info:g(u,null)},y=c({name:`ProgressCircle`,props:{clsPrefix:{type:String,required:!0},status:{type:String,required:!0},strokeWidth:{type:Number,required:!0},fillColor:[String,Object],railColor:String,railStyle:[String,Object],percentage:{type:Number,default:0},offsetDegree:{type:Number,default:0},showIndicator:{type:Boolean,required:!0},indicatorTextColor:String,unit:String,viewBoxWidth:{type:Number,required:!0},gapDegree:{type:Number,required:!0},gapOffsetDegree:{type:Number,default:0}},setup(e,{slots:t}){let n=o(()=>{let t=`gradient`,{fillColor:n}=e;return typeof n==`object`?`${t}-${r(JSON.stringify(n))}`:t});function i(t,r,i,a){let{gapDegree:o,viewBoxWidth:s,strokeWidth:c}=e,l=50+c/2,u=`M ${l},${l} m 0,50
      a 50,50 0 1 1 0,-100
      a 50,50 0 1 1 0,100`,d=Math.PI*2*50;return{pathString:u,pathStyle:{stroke:a===`rail`?i:typeof e.fillColor==`object`?`url(#${n.value})`:i,strokeDasharray:`${Math.min(t,100)/100*(d-o)}px ${s*8}px`,strokeDashoffset:`-${o/2}px`,transformOrigin:r?`center`:void 0,transform:r?`rotate(${r}deg)`:void 0}}}let a=()=>{let t=typeof e.fillColor==`object`,r=t?e.fillColor.stops[0]:``,i=t?e.fillColor.stops[1]:``;return t&&g(`defs`,null,g(`linearGradient`,{id:n.value,x1:`0%`,y1:`100%`,x2:`100%`,y2:`0%`},g(`stop`,{offset:`0%`,"stop-color":r}),g(`stop`,{offset:`100%`,"stop-color":i})))};return()=>{let{fillColor:n,railColor:r,strokeWidth:o,offsetDegree:s,status:c,percentage:u,showIndicator:d,indicatorTextColor:f,unit:p,gapOffsetDegree:m,clsPrefix:h}=e,{pathString:_,pathStyle:y}=i(100,0,r,`rail`),{pathString:b,pathStyle:x}=i(u,s,n,`fill`),S=100+o;return g(`div`,{class:`${h}-progress-content`,role:`none`},g(`div`,{class:`${h}-progress-graph`,"aria-hidden":!0},g(`div`,{class:`${h}-progress-graph-circle`,style:{transform:m?`rotate(${m}deg)`:void 0}},g(`svg`,{viewBox:`0 0 ${S} ${S}`},a(),g(`g`,null,g(`path`,{class:`${h}-progress-graph-circle-rail`,d:_,"stroke-width":o,"stroke-linecap":`round`,fill:`none`,style:y})),g(`g`,null,g(`path`,{class:[`${h}-progress-graph-circle-fill`,u===0&&`${h}-progress-graph-circle-fill--empty`],d:b,"stroke-width":o,"stroke-linecap":`round`,fill:`none`,style:x}))))),d?g(`div`,null,t.default?g(`div`,{class:`${h}-progress-custom-content`,role:`none`},t.default()):c===`default`?g(`div`,{class:`${h}-progress-text`,style:{color:f},role:`none`},g(`span`,{class:`${h}-progress-text__percentage`},u),g(`span`,{class:`${h}-progress-text__unit`},p)):g(`div`,{class:`${h}-progress-icon`,"aria-hidden":!0},g(l,{clsPrefix:h},{default:()=>v[c]}))):null)}}}),b={success:g(d,null),error:g(s,null),warning:g(p,null),info:g(u,null)},x=c({name:`ProgressLine`,props:{clsPrefix:{type:String,required:!0},percentage:{type:Number,default:0},railColor:String,railStyle:[String,Object],fillColor:[String,Object],status:{type:String,required:!0},indicatorPlacement:{type:String,required:!0},indicatorTextColor:String,unit:{type:String,default:`%`},processing:{type:Boolean,required:!0},showIndicator:{type:Boolean,required:!0},height:[String,Number],railBorderRadius:[String,Number],fillBorderRadius:[String,Number]},setup(t,{slots:n}){let r=o(()=>e(t.height)),i=o(()=>typeof t.fillColor==`object`?`linear-gradient(to right, ${t.fillColor?.stops[0]} , ${t.fillColor?.stops[1]})`:t.fillColor),a=o(()=>t.railBorderRadius===void 0?t.height===void 0?``:e(t.height,{c:.5}):e(t.railBorderRadius)),s=o(()=>t.fillBorderRadius===void 0?t.railBorderRadius===void 0?t.height===void 0?``:e(t.height,{c:.5}):e(t.railBorderRadius):e(t.fillBorderRadius));return()=>{let{indicatorPlacement:e,railColor:o,railStyle:c,percentage:u,unit:d,indicatorTextColor:f,status:p,showIndicator:m,processing:h,clsPrefix:_}=t;return g(`div`,{class:`${_}-progress-content`,role:`none`},g(`div`,{class:`${_}-progress-graph`,"aria-hidden":!0},g(`div`,{class:[`${_}-progress-graph-line`,{[`${_}-progress-graph-line--indicator-${e}`]:!0}]},g(`div`,{class:`${_}-progress-graph-line-rail`,style:[{backgroundColor:o,height:r.value,borderRadius:a.value},c]},g(`div`,{class:[`${_}-progress-graph-line-fill`,h&&`${_}-progress-graph-line-fill--processing`],style:{maxWidth:`${t.percentage}%`,background:i.value,height:r.value,lineHeight:r.value,borderRadius:s.value}},e===`inside`?g(`div`,{class:`${_}-progress-graph-line-indicator`,style:{color:f}},n.default?n.default():`${u}${d}`):null)))),m&&e===`outside`?g(`div`,null,n.default?g(`div`,{class:`${_}-progress-custom-content`,style:{color:f},role:`none`},n.default()):p===`default`?g(`div`,{role:`none`,class:`${_}-progress-icon ${_}-progress-icon--as-text`,style:{color:f}},u,d):g(`div`,{class:`${_}-progress-icon`,"aria-hidden":!0},g(l,{clsPrefix:_},{default:()=>b[p]}))):null)}}});function S(e,t,n=100){return`m ${n/2} ${n/2-e} a ${e} ${e} 0 1 1 0 ${2*e} a ${e} ${e} 0 1 1 0 -${2*e}`}var C=c({name:`ProgressMultipleCircle`,props:{clsPrefix:{type:String,required:!0},viewBoxWidth:{type:Number,required:!0},percentage:{type:Array,default:[0]},strokeWidth:{type:Number,required:!0},circleGap:{type:Number,required:!0},showIndicator:{type:Boolean,required:!0},fillColor:{type:Array,default:()=>[]},railColor:{type:Array,default:()=>[]},railStyle:{type:Array,default:()=>[]}},setup(e,{slots:t}){let n=o(()=>e.percentage.map((t,n)=>`${Math.PI*t/100*(e.viewBoxWidth/2-e.strokeWidth/2*(1+2*n)-e.circleGap*n)*2}, ${e.viewBoxWidth*8}`)),r=(t,n)=>{let r=e.fillColor[n],i=typeof r==`object`?r.stops[0]:``,a=typeof r==`object`?r.stops[1]:``;return typeof e.fillColor[n]==`object`&&g(`linearGradient`,{id:`gradient-${n}`,x1:`100%`,y1:`0%`,x2:`0%`,y2:`100%`},g(`stop`,{offset:`0%`,"stop-color":i}),g(`stop`,{offset:`100%`,"stop-color":a}))};return()=>{let{viewBoxWidth:i,strokeWidth:a,circleGap:o,showIndicator:s,fillColor:c,railColor:l,railStyle:u,percentage:d,clsPrefix:f}=e;return g(`div`,{class:`${f}-progress-content`,role:`none`},g(`div`,{class:`${f}-progress-graph`,"aria-hidden":!0},g(`div`,{class:`${f}-progress-graph-circle`},g(`svg`,{viewBox:`0 0 ${i} ${i}`},g(`defs`,null,d.map((e,t)=>r(e,t))),d.map((e,t)=>g(`g`,{key:t},g(`path`,{class:`${f}-progress-graph-circle-rail`,d:S(i/2-a/2*(1+2*t)-o*t,a,i),"stroke-width":a,"stroke-linecap":`round`,fill:`none`,style:[{strokeDashoffset:0,stroke:l[t]},u[t]]}),g(`path`,{class:[`${f}-progress-graph-circle-fill`,e===0&&`${f}-progress-graph-circle-fill--empty`],d:S(i/2-a/2*(1+2*t)-o*t,a,i),"stroke-width":a,"stroke-linecap":`round`,fill:`none`,style:{strokeDasharray:n.value[t],strokeDashoffset:0,stroke:typeof c[t]==`object`?`url(#gradient-${t})`:c[t]}})))))),s&&t.default?g(`div`,null,g(`div`,{class:`${f}-progress-text`},t.default())):null)}}}),w=_([a(`progress`,{display:`inline-block`},[a(`progress-icon`,`
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 `),n(`line`,`
 width: 100%;
 display: block;
 `,[a(`progress-content`,`
 display: flex;
 align-items: center;
 `,[a(`progress-graph`,{flex:1})]),a(`progress-custom-content`,{marginLeft:`14px`}),a(`progress-icon`,`
 width: 30px;
 padding-left: 14px;
 height: var(--n-icon-size-line);
 line-height: var(--n-icon-size-line);
 font-size: var(--n-icon-size-line);
 `,[n(`as-text`,`
 color: var(--n-text-color-line-outer);
 text-align: center;
 width: 40px;
 font-size: var(--n-font-size);
 padding-left: 4px;
 transition: color .3s var(--n-bezier);
 `)])]),n(`circle, dashboard`,{width:`120px`},[a(`progress-custom-content`,`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `),a(`progress-text`,`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 color: inherit;
 font-size: var(--n-font-size-circle);
 color: var(--n-text-color-circle);
 font-weight: var(--n-font-weight-circle);
 transition: color .3s var(--n-bezier);
 white-space: nowrap;
 `),a(`progress-icon`,`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 color: var(--n-icon-color);
 font-size: var(--n-icon-size-circle);
 `)]),n(`multiple-circle`,`
 width: 200px;
 color: inherit;
 `,[a(`progress-text`,`
 font-weight: var(--n-font-weight-circle);
 color: var(--n-text-color-circle);
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 transition: color .3s var(--n-bezier);
 `)]),a(`progress-content`,{position:`relative`}),a(`progress-graph`,{position:`relative`},[a(`progress-graph-circle`,[_(`svg`,{verticalAlign:`bottom`}),a(`progress-graph-circle-fill`,`
 stroke: var(--n-fill-color);
 transition:
 opacity .3s var(--n-bezier),
 stroke .3s var(--n-bezier),
 stroke-dasharray .3s var(--n-bezier);
 `,[n(`empty`,{opacity:0})]),a(`progress-graph-circle-rail`,`
 transition: stroke .3s var(--n-bezier);
 overflow: hidden;
 stroke: var(--n-rail-color);
 `)]),a(`progress-graph-line`,[n(`indicator-inside`,[a(`progress-graph-line-rail`,`
 height: 16px;
 line-height: 16px;
 border-radius: 10px;
 `,[a(`progress-graph-line-fill`,`
 height: inherit;
 border-radius: 10px;
 `),a(`progress-graph-line-indicator`,`
 background: #0000;
 white-space: nowrap;
 text-align: right;
 margin-left: 14px;
 margin-right: 14px;
 height: inherit;
 font-size: 12px;
 color: var(--n-text-color-line-inner);
 transition: color .3s var(--n-bezier);
 `)])]),n(`indicator-inside-label`,`
 height: 16px;
 display: flex;
 align-items: center;
 `,[a(`progress-graph-line-rail`,`
 flex: 1;
 transition: background-color .3s var(--n-bezier);
 `),a(`progress-graph-line-indicator`,`
 background: var(--n-fill-color);
 font-size: 12px;
 transform: translateZ(0);
 display: flex;
 vertical-align: middle;
 height: 16px;
 line-height: 16px;
 padding: 0 10px;
 border-radius: 10px;
 position: absolute;
 white-space: nowrap;
 color: var(--n-text-color-line-inner);
 transition:
 right .2s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `)]),a(`progress-graph-line-rail`,`
 position: relative;
 overflow: hidden;
 height: var(--n-rail-height);
 border-radius: 5px;
 background-color: var(--n-rail-color);
 transition: background-color .3s var(--n-bezier);
 `,[a(`progress-graph-line-fill`,`
 background: var(--n-fill-color);
 position: relative;
 border-radius: 5px;
 height: inherit;
 width: 100%;
 max-width: 0%;
 transition:
 background-color .3s var(--n-bezier),
 max-width .2s var(--n-bezier);
 `,[n(`processing`,[_(`&::after`,`
 content: "";
 background-image: var(--n-line-bg-processing);
 animation: progress-processing-animation 2s var(--n-bezier) infinite;
 `)])])])])])]),_(`@keyframes progress-processing-animation`,`
 0% {
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 100%;
 opacity: 1;
 }
 66% {
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 0;
 }
 100% {
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 0;
 }
 `)]),T=c({name:`Progress`,props:Object.assign(Object.assign({},i.props),{processing:Boolean,type:{type:String,default:`line`},gapDegree:Number,gapOffsetDegree:Number,status:{type:String,default:`default`},railColor:[String,Array],railStyle:[String,Array],color:[String,Array,Object],viewBoxWidth:{type:Number,default:100},strokeWidth:{type:Number,default:7},percentage:[Number,Array],unit:{type:String,default:`%`},showIndicator:{type:Boolean,default:!0},indicatorPosition:{type:String,default:`outside`},indicatorPlacement:{type:String,default:`outside`},indicatorTextColor:String,circleGap:{type:Number,default:1},height:Number,borderRadius:[String,Number],fillBorderRadius:[String,Number],offsetDegree:Number}),setup(e){let n=o(()=>e.indicatorPlacement||e.indicatorPosition),r=o(()=>{if(e.gapDegree||e.gapDegree===0)return e.gapDegree;if(e.type===`dashboard`)return 75}),{mergedClsPrefixRef:a,inlineThemeDisabled:s}=h(e),c=i(`Progress`,`-progress`,w,f,e,a),l=o(()=>{let{status:n}=e,{common:{cubicBezierEaseInOut:r},self:{fontSize:i,fontSizeCircle:a,railColor:o,railHeight:s,iconSizeCircle:l,iconSizeLine:u,textColorCircle:d,textColorLineInner:f,textColorLineOuter:p,lineBgProcessing:m,fontWeightCircle:h,[t(`iconColor`,n)]:g,[t(`fillColor`,n)]:_}}=c.value;return{"--n-bezier":r,"--n-fill-color":_,"--n-font-size":i,"--n-font-size-circle":a,"--n-font-weight-circle":h,"--n-icon-color":g,"--n-icon-size-circle":l,"--n-icon-size-line":u,"--n-line-bg-processing":m,"--n-rail-color":o,"--n-rail-height":s,"--n-text-color-circle":d,"--n-text-color-line-inner":f,"--n-text-color-line-outer":p}}),u=s?m(`progress`,o(()=>e.status[0]),l,e):void 0;return{mergedClsPrefix:a,mergedIndicatorPlacement:n,gapDeg:r,cssVars:s?void 0:l,themeClass:u?.themeClass,onRender:u?.onRender}},render(){let{type:e,cssVars:t,indicatorTextColor:n,showIndicator:r,status:i,railColor:a,railStyle:o,color:s,percentage:c,viewBoxWidth:l,strokeWidth:u,mergedIndicatorPlacement:d,unit:f,borderRadius:p,fillBorderRadius:m,height:h,processing:_,circleGap:v,mergedClsPrefix:b,gapDeg:S,gapOffsetDegree:w,themeClass:T,$slots:E,onRender:D}=this;return D?.(),g(`div`,{class:[T,`${b}-progress`,`${b}-progress--${e}`,`${b}-progress--${i}`],style:t,"aria-valuemax":100,"aria-valuemin":0,"aria-valuenow":c,role:e===`circle`||e===`line`||e===`dashboard`?`progressbar`:`none`},e===`circle`||e===`dashboard`?g(y,{clsPrefix:b,status:i,showIndicator:r,indicatorTextColor:n,railColor:a,fillColor:s,railStyle:o,offsetDegree:this.offsetDegree,percentage:c,viewBoxWidth:l,strokeWidth:u,gapDegree:S===void 0?e===`dashboard`?75:0:S,gapOffsetDegree:w,unit:f},E):e===`line`?g(x,{clsPrefix:b,status:i,showIndicator:r,indicatorTextColor:n,railColor:a,fillColor:s,railStyle:o,percentage:c,processing:_,indicatorPlacement:d,unit:f,fillBorderRadius:m,railBorderRadius:p,height:h},E):e===`multiple-circle`?g(C,{clsPrefix:b,strokeWidth:u,railColor:a,fillColor:s,railStyle:o,viewBoxWidth:l,percentage:c,showIndicator:r,circleGap:v},E):null)}});export{T as t};