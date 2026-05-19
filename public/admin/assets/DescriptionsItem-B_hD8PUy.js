import{o as e}from"./Tag-D4bZfoIR.js";import{t}from"./get-slot-BQkvszDU.js";import{Ar as n,D as r,Dr as i,Mr as a,Or as o,Qn as s,St as c,Tr as l,Xr as u,_n as d,ai as f,jr as p,kr as m,nn as h,rn as g,si as _,wr as v}from"./index-CstmdvSQ.js";function y(e,t=`default`,n=[]){let{children:r}=e;if(typeof r==`object`&&r&&!Array.isArray(r)){let e=r[t];if(typeof e==`function`)return e()}return n}var b=v([l(`descriptions`,{fontSize:`var(--n-font-size)`},[l(`descriptions-separator`,`
 display: inline-block;
 margin: 0 8px 0 2px;
 `),l(`descriptions-table-wrapper`,[l(`descriptions-table`,[l(`descriptions-table-row`,[l(`descriptions-table-header`,{padding:`var(--n-th-padding)`}),l(`descriptions-table-content`,{padding:`var(--n-td-padding)`})])])]),m(`bordered`,[l(`descriptions-table-wrapper`,[l(`descriptions-table`,[l(`descriptions-table-row`,[v(`&:last-child`,[l(`descriptions-table-content`,{paddingBottom:0})])])])])]),o(`left-label-placement`,[l(`descriptions-table-content`,[v(`> *`,{verticalAlign:`top`})])]),o(`left-label-align`,[v(`th`,{textAlign:`left`})]),o(`center-label-align`,[v(`th`,{textAlign:`center`})]),o(`right-label-align`,[v(`th`,{textAlign:`right`})]),o(`bordered`,[l(`descriptions-table-wrapper`,`
 border-radius: var(--n-border-radius);
 overflow: hidden;
 background: var(--n-merged-td-color);
 border: 1px solid var(--n-merged-border-color);
 `,[l(`descriptions-table`,[l(`descriptions-table-row`,[v(`&:not(:last-child)`,[l(`descriptions-table-content`,{borderBottom:`1px solid var(--n-merged-border-color)`}),l(`descriptions-table-header`,{borderBottom:`1px solid var(--n-merged-border-color)`})]),l(`descriptions-table-header`,`
 font-weight: 400;
 background-clip: padding-box;
 background-color: var(--n-merged-th-color);
 `,[v(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})]),l(`descriptions-table-content`,[v(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})])])])])]),l(`descriptions-header`,`
 font-weight: var(--n-th-font-weight);
 font-size: 18px;
 transition: color .3s var(--n-bezier);
 line-height: var(--n-line-height);
 margin-bottom: 16px;
 color: var(--n-title-text-color);
 `),l(`descriptions-table-wrapper`,`
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[l(`descriptions-table`,`
 width: 100%;
 border-collapse: separate;
 border-spacing: 0;
 box-sizing: border-box;
 `,[l(`descriptions-table-row`,`
 box-sizing: border-box;
 transition: border-color .3s var(--n-bezier);
 `,[l(`descriptions-table-header`,`
 font-weight: var(--n-th-font-weight);
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-th-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),l(`descriptions-table-content`,`
 vertical-align: top;
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-td-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[i(`content`,`
 transition: color .3s var(--n-bezier);
 display: inline-block;
 color: var(--n-td-text-color);
 `)]),i(`label`,`
 font-weight: var(--n-th-font-weight);
 transition: color .3s var(--n-bezier);
 display: inline-block;
 margin-right: 14px;
 color: var(--n-th-text-color);
 `)])])])]),l(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 `),p(l(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),a(l(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),x=`DESCRIPTION_ITEM_FLAG`;function S(e){return typeof e==`object`&&e&&!Array.isArray(e)?e.type&&e.type.DESCRIPTION_ITEM_FLAG:!1}var C=f({name:`Descriptions`,props:Object.assign(Object.assign({},c.props),{title:String,column:{type:Number,default:3},columns:Number,labelPlacement:{type:String,default:`top`},labelAlign:{type:String,default:`left`},separator:{type:String,default:`:`},size:String,bordered:Boolean,labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]}),slots:Object,setup(t){let{mergedClsPrefixRef:i,inlineThemeDisabled:a,mergedComponentPropsRef:o}=g(t),s=u(()=>t.size||o?.value?.Descriptions?.size||`medium`),l=c(`Descriptions`,`-descriptions`,b,r,t,i),d=u(()=>{let{bordered:e}=t,r=s.value,{common:{cubicBezierEaseInOut:i},self:{titleTextColor:a,thColor:o,thColorModal:c,thColorPopover:u,thTextColor:d,thFontWeight:f,tdTextColor:p,tdColor:m,tdColorModal:h,tdColorPopover:g,borderColor:_,borderColorModal:v,borderColorPopover:y,borderRadius:b,lineHeight:x,[n(`fontSize`,r)]:S,[n(e?`thPaddingBordered`:`thPadding`,r)]:C,[n(e?`tdPaddingBordered`:`tdPadding`,r)]:w}}=l.value;return{"--n-title-text-color":a,"--n-th-padding":C,"--n-td-padding":w,"--n-font-size":S,"--n-bezier":i,"--n-th-font-weight":f,"--n-line-height":x,"--n-th-text-color":d,"--n-td-text-color":p,"--n-th-color":o,"--n-th-color-modal":c,"--n-th-color-popover":u,"--n-td-color":m,"--n-td-color-modal":h,"--n-td-color-popover":g,"--n-border-radius":b,"--n-border-color":_,"--n-border-color-modal":v,"--n-border-color-popover":y}}),f=a?h(`descriptions`,u(()=>{let e=``,{bordered:n}=t;return n&&(e+=`a`),e+=s.value[0],e}),d,t):void 0;return{mergedClsPrefix:i,cssVars:a?void 0:d,themeClass:f?.themeClass,onRender:f?.onRender,compitableColumn:e(t,[`columns`,`column`]),inlineThemeDisabled:a,mergedSize:s}},render(){let e=this.$slots.default,n=e?d(e()):[];n.length;let{contentClass:r,labelClass:i,compitableColumn:a,labelPlacement:o,labelAlign:c,mergedSize:l,bordered:u,title:f,cssVars:p,mergedClsPrefix:m,separator:h,onRender:g}=this;g?.();let v=n.filter(e=>S(e)),b=v.reduce((e,t,n)=>{let s=t.props||{},c=v.length-1===n,l=[`label`in s?s.label:y(t,`label`)],d=[y(t)],f=s.span||1,p=e.span;e.span+=f;let g=s.labelStyle||s[`label-style`]||this.labelStyle,b=s.contentStyle||s[`content-style`]||this.contentStyle;if(o===`left`)u?e.row.push(_(`th`,{class:[`${m}-descriptions-table-header`,i],colspan:1,style:g},l),_(`td`,{class:[`${m}-descriptions-table-content`,r],colspan:c?(a-p)*2+1:f*2-1,style:b},d)):e.row.push(_(`td`,{class:`${m}-descriptions-table-content`,colspan:c?(a-p)*2:f*2},_(`span`,{class:[`${m}-descriptions-table-content__label`,i],style:g},[...l,h&&_(`span`,{class:`${m}-descriptions-separator`},h)]),_(`span`,{class:[`${m}-descriptions-table-content__content`,r],style:b},d)));else{let t=c?(a-p)*2:f*2;e.row.push(_(`th`,{class:[`${m}-descriptions-table-header`,i],colspan:t,style:g},l)),e.secondRow.push(_(`td`,{class:[`${m}-descriptions-table-content`,r],colspan:t,style:b},d))}return(e.span>=a||c)&&(e.span=0,e.row.length&&(e.rows.push(e.row),e.row=[]),o!==`left`&&e.secondRow.length&&(e.rows.push(e.secondRow),e.secondRow=[])),e},{span:0,row:[],secondRow:[],rows:[]}).rows.map(e=>_(`tr`,{class:`${m}-descriptions-table-row`},e));return _(`div`,{style:p,class:[`${m}-descriptions`,this.themeClass,`${m}-descriptions--${o}-label-placement`,`${m}-descriptions--${c}-label-align`,`${m}-descriptions--${l}-size`,u&&`${m}-descriptions--bordered`]},f||this.$slots.header?_(`div`,{class:`${m}-descriptions-header`},f||t(this,`header`)):null,_(`div`,{class:`${m}-descriptions-table-wrapper`},_(`table`,{class:`${m}-descriptions-table`},_(`tbody`,null,o===`top`&&_(`tr`,{class:`${m}-descriptions-table-row`,style:{visibility:`collapse`}},s(a*2,_(`td`,null))),b))))}}),w={label:String,span:{type:Number,default:1},labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]},T=f({name:`DescriptionsItem`,[x]:!0,props:w,slots:Object,render(){return null}});export{C as n,T as t};