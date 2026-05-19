import{n as e,t}from"./request-CJzN0vVk.js";import{r as n}from"./Icon-CWBooZtB.js";import{t as r}from"./Input-Dvq5rpDK.js";import{n as i,t as a}from"./Grid-wWKLjZg-.js";import{n as o,t as s}from"./FormItem-ET0ww_4N.js";import{n as c,t as l}from"./Tabs-jrsF2dli.js";import{n as u,t as d}from"./DescriptionsItem-B_hD8PUy.js";import{t as f}from"./DataTable-Cu3HNJrm.js";import{t as p}from"./Divider-DQ-RLMJc.js";import{t as m}from"./Space-BByYHQHa.js";import{t as h}from"./Switch-Cgr_oogX.js";import{$r as g,Ai as _,B as ee,Dr as v,Ei as y,Ii as b,Mi as x,Or as S,Pi as C,Qr as te,St as w,Tr as T,V as E,Xr as D,ai as O,an as k,b as ne,ci as A,ei as re,gi as j,ii as M,nn as N,ri as P,rn as F,si as I,st as L,vi as R,wi as z,wr as B,zi as V}from"./index-CstmdvSQ.js";function H(e,t){let n=A(k,null);return D(()=>e.hljs||n?.mergedHljsRef.value)}function U(e){let{textColor2:t,fontSize:n,fontWeightStrong:r,textColor3:i}=e;return{textColor:t,fontSize:n,fontWeightStrong:r,"mono-3":`#a0a1a7`,"hue-1":`#0184bb`,"hue-2":`#4078f2`,"hue-3":`#a626a4`,"hue-4":`#50a14f`,"hue-5":`#e45649`,"hue-5-2":`#c91243`,"hue-6":`#986801`,"hue-6-2":`#c18401`,lineNumberTextColor:i}}var W={name:`Code`,common:L,self:U},G=B([T(`code`,`
 font-size: var(--n-font-size);
 font-family: var(--n-font-family);
 `,[S(`show-line-numbers`,`
 display: flex;
 `),v(`line-numbers`,`
 user-select: none;
 padding-right: 12px;
 text-align: right;
 transition: color .3s var(--n-bezier);
 color: var(--n-line-number-text-color);
 `),S(`word-wrap`,[B(`pre`,`
 white-space: pre-wrap;
 word-break: break-all;
 `)]),B(`pre`,`
 margin: 0;
 line-height: inherit;
 font-size: inherit;
 font-family: inherit;
 `),B(`[class^=hljs]`,`
 color: var(--n-text-color);
 transition: 
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `)]),({props:e})=>{let t=`${e.bPrefix}code`;return[`${t} .hljs-comment,
 ${t} .hljs-quote {
 color: var(--n-mono-3);
 font-style: italic;
 }`,`${t} .hljs-doctag,
 ${t} .hljs-keyword,
 ${t} .hljs-formula {
 color: var(--n-hue-3);
 }`,`${t} .hljs-section,
 ${t} .hljs-name,
 ${t} .hljs-selector-tag,
 ${t} .hljs-deletion,
 ${t} .hljs-subst {
 color: var(--n-hue-5);
 }`,`${t} .hljs-literal {
 color: var(--n-hue-1);
 }`,`${t} .hljs-string,
 ${t} .hljs-regexp,
 ${t} .hljs-addition,
 ${t} .hljs-attribute,
 ${t} .hljs-meta-string {
 color: var(--n-hue-4);
 }`,`${t} .hljs-built_in,
 ${t} .hljs-class .hljs-title {
 color: var(--n-hue-6-2);
 }`,`${t} .hljs-attr,
 ${t} .hljs-variable,
 ${t} .hljs-template-variable,
 ${t} .hljs-type,
 ${t} .hljs-selector-class,
 ${t} .hljs-selector-attr,
 ${t} .hljs-selector-pseudo,
 ${t} .hljs-number {
 color: var(--n-hue-6);
 }`,`${t} .hljs-symbol,
 ${t} .hljs-bullet,
 ${t} .hljs-link,
 ${t} .hljs-meta,
 ${t} .hljs-selector-id,
 ${t} .hljs-title {
 color: var(--n-hue-2);
 }`,`${t} .hljs-emphasis {
 font-style: italic;
 }`,`${t} .hljs-strong {
 font-weight: var(--n-font-weight-strong);
 }`,`${t} .hljs-link {
 text-decoration: underline;
 }`]}]),ie=O({name:`Code`,props:Object.assign(Object.assign({},w.props),{language:String,code:{type:String,default:``},trim:{type:Boolean,default:!0},hljs:Object,uri:Boolean,inline:Boolean,wordWrap:Boolean,showLineNumbers:Boolean,internalFontSize:Number,internalNoHighlight:Boolean}),setup(e,{slots:t}){let{internalNoHighlight:n}=e,{mergedClsPrefixRef:r,inlineThemeDisabled:i}=F(),a=x(null),o=n?{value:void 0}:H(e),s=(e,t,n)=>{let{value:r}=o;return!r||!(e&&r.getLanguage(e))?null:r.highlight(n?t.trim():t,{language:e}).value},c=D(()=>e.inline||e.wordWrap?!1:e.showLineNumbers),l=()=>{if(t.default)return;let{value:n}=a;if(!n)return;let{language:r}=e,i=e.uri?window.decodeURIComponent(e.code):e.code;if(r){let t=s(r,i,e.trim);if(t!==null){if(e.inline)n.innerHTML=t;else{let e=n.querySelector(`.__code__`);e&&n.removeChild(e);let r=document.createElement(`pre`);r.className=`__code__`,r.innerHTML=t,n.appendChild(r)}return}}if(e.inline){n.textContent=i;return}let o=n.querySelector(`.__code__`);if(o)o.textContent=i;else{let e=document.createElement(`pre`);e.className=`__code__`,e.textContent=i,n.innerHTML=``,n.appendChild(e)}};j(l),z(C(e,`language`),l),z(C(e,`code`),l),n||z(o,l);let u=w(`Code`,`-code`,G,W,e,r),d=D(()=>{let{common:{cubicBezierEaseInOut:t,fontFamilyMono:n},self:{textColor:r,fontSize:i,fontWeightStrong:a,lineNumberTextColor:o,"mono-3":s,"hue-1":c,"hue-2":l,"hue-3":d,"hue-4":f,"hue-5":p,"hue-5-2":m,"hue-6":h,"hue-6-2":g}}=u.value,{internalFontSize:_}=e;return{"--n-font-size":_?`${_}px`:i,"--n-font-family":n,"--n-font-weight-strong":a,"--n-bezier":t,"--n-text-color":r,"--n-mono-3":s,"--n-hue-1":c,"--n-hue-2":l,"--n-hue-3":d,"--n-hue-4":f,"--n-hue-5":p,"--n-hue-5-2":m,"--n-hue-6":h,"--n-hue-6-2":g,"--n-line-number-text-color":o}}),f=i?N(`code`,D(()=>`${e.internalFontSize||`a`}`),d,e):void 0;return{mergedClsPrefix:r,codeRef:a,mergedShowLineNumbers:c,lineNumbers:D(()=>{let t=1,n=[],r=!1;for(let i of e.code)i===`
`?(r=!0,n.push(t++)):r=!1;return r||n.push(t++),n.join(`
`)}),cssVars:i?void 0:d,themeClass:f?.themeClass,onRender:f?.onRender}},render(){var e;let{mergedClsPrefix:t,wordWrap:n,mergedShowLineNumbers:r,onRender:i}=this;return i?.(),I(`code`,{class:[`${t}-code`,this.themeClass,n&&`${t}-code--word-wrap`,r&&`${t}-code--show-line-numbers`],style:this.cssVars,ref:`codeRef`},r?I(`pre`,{class:`${t}-code__line-numbers`},this.lineNumbers):null,(e=this.$slots).default?.call(e))}});function K(){return t.get(`/admin/crud/index`)}function q(){return t.get(`/admin/crud/types`)}function J(e){return t.post(`/admin/crud/generate`,e)}function Y(e){return t.post(`/admin/crud/preview`,e)}var ae={class:`page-wrap`},X=O({__name:`index`,setup(t){let v=e(),S=x(``),C=x(``),w=x([]),T=x(!1),D=x(!1),O=x(!1),k=x(!1),A=x(!1),N=x({}),F=x({}),L=x([]),z=x([]),B=x(-1),H=_({name:``,type:`varchar`,length:``,comment:``,default_val:``,nullable:!1}),U=[{title:`字段名`,key:`name`,width:130},{title:`类型`,key:`type`,width:110},{title:`注释`,key:`comment`},{title:`可空`,key:`nullable`,width:60,render:e=>e.nullable?`是`:`否`},{title:`操作`,key:`actions`,width:120,render:(e,t)=>I(m,null,{default:()=>[I(E,{size:`tiny`,onClick:()=>X(t)},`编辑`),I(E,{size:`tiny`,type:`error`,onClick:()=>{w.value.splice(t,1)}},`删除`)]})}],W=[{title:`数据表`,key:`table`},{title:`记录数`,key:`count`,width:90}];function G(){B.value=-1,Object.assign(H,{name:``,type:`varchar`,length:`255`,comment:``,default_val:``,nullable:!1}),T.value=!0}function X(e){B.value=e;let t=w.value[e];Object.assign(H,{...t,default_val:t.default||t.default_val||``}),T.value=!0}function oe(){let e={name:H.name,type:H.type,length:H.length||(H.type===`varchar`?`255`:H.type===`int`?`11`:``),comment:H.comment,default:H.default_val||``,nullable:H.nullable};e.name===`id`&&(e.pk=!0,e.type=`int`,e.length=`11`,e.nullable=!1),B.value>=0?w.value[B.value]=e:w.value.push(e),T.value=!1}function se(e){H.length={varchar:`255`,int:`11`,bigint:`20`,decimal:`10,2`}[e]||``}async function ce(){if(!S.value||w.value.filter(e=>e.name!==`id`).length===0){v.warning(`请输入表名并至少添加一个业务字段`);return}try{N.value=(await Y({table:S.value,comment:C.value,fields:w.value})).data,D.value=!0}catch{}}async function le(){if(!S.value||w.value.filter(e=>e.name!==`id`).length===0){v.warning(`请输入表名并至少添加一个业务字段`);return}A.value=!0;try{let e=await J({table:S.value,comment:C.value,fields:w.value});F.value=e.data,O.value=!0,e.data.sql_status===`已执行`&&v.success(`CRUD代码生成成功！`)}catch{}A.value=!1}return j(async()=>{w.value.push({name:`id`,type:`int`,length:`11`,comment:`主键ID`,default:``,nullable:!1,pk:!0});try{let[e,t]=await Promise.all([K(),q()]);L.value=e.data||[],z.value=(t.data||[]).map(e=>({label:e.label,value:e.value}))}catch{}}),(e,t)=>{let _=r,v=s,x=i,j=a,I=o,B=p,K=f,q=n,J=h,Y=ee,X=ne,Z=ie,Q=c,ue=l,$=d,de=u;return R(),re(`div`,ae,[M(Y,{title:`可视化CRUD代码生成器`,bordered:!1},{"header-extra":y(()=>[M(b(m),null,{default:y(()=>[M(b(E),{onClick:t[0]||=e=>k.value=!0},{default:y(()=>[...t[14]||=[P(`浏览数据表`,-1)]]),_:1}),M(b(E),{type:`primary`,onClick:ce},{default:y(()=>[...t[15]||=[P(`预览代码`,-1)]]),_:1}),M(b(E),{type:`info`,onClick:le,loading:A.value},{default:y(()=>[...t[16]||=[P(`一键生成`,-1)]]),_:1},8,[`loading`])]),_:1})]),default:y(()=>[M(I,{"label-placement":`left`,"label-width":`100`},{default:y(()=>[M(j,{cols:2,"x-gap":16},{default:y(()=>[M(x,null,{default:y(()=>[M(v,{label:`数据表名`,required:``},{default:y(()=>[M(_,{value:S.value,"onUpdate:value":t[1]||=e=>S.value=e,placeholder:`英文名，如 news`},null,8,[`value`])]),_:1})]),_:1}),M(x,null,{default:y(()=>[M(v,{label:`表注释`,required:``},{default:y(()=>[M(_,{value:C.value,"onUpdate:value":t[2]||=e=>C.value=e,placeholder:`如 新闻管理`},null,8,[`value`])]),_:1})]),_:1})]),_:1})]),_:1}),M(B,null,{default:y(()=>[t[18]||=P(` 字段设计 `,-1),M(b(E),{size:`small`,type:`primary`,style:{"margin-left":`12px`},onClick:G},{default:y(()=>[...t[17]||=[P(`+ 添加字段`,-1)]]),_:1})]),_:1}),M(K,{columns:U,data:w.value,size:`small`,bordered:!1},null,8,[`data`]),M(X,{show:T.value,"onUpdate:show":t[10]||=e=>T.value=e,title:`编辑字段`},{default:y(()=>[M(Y,{style:{width:`500px`}},{footer:y(()=>[M(b(m),{justify:`end`},{default:y(()=>[M(b(E),{onClick:t[9]||=e=>T.value=!1},{default:y(()=>[...t[19]||=[P(`取消`,-1)]]),_:1}),M(b(E),{type:`primary`,onClick:oe},{default:y(()=>[...t[20]||=[P(`确定`,-1)]]),_:1})]),_:1})]),default:y(()=>[M(I,{model:H,"label-placement":`left`,"label-width":`80`},{default:y(()=>[M(v,{label:`字段名`},{default:y(()=>[M(_,{value:H.name,"onUpdate:value":t[3]||=e=>H.name=e,placeholder:`英文，如 title`},null,8,[`value`])]),_:1}),M(v,{label:`类型`},{default:y(()=>[M(q,{value:H.type,"onUpdate:value":[t[4]||=e=>H.type=e,se],options:z.value},null,8,[`value`,`options`])]),_:1}),M(v,{label:`注释`},{default:y(()=>[M(_,{value:H.comment,"onUpdate:value":t[5]||=e=>H.comment=e,placeholder:`如 标题`},null,8,[`value`])]),_:1}),H.type===`text`?g(``,!0):(R(),te(v,{key:0,label:`长度`},{default:y(()=>[M(_,{value:H.length,"onUpdate:value":t[6]||=e=>H.length=e,placeholder:`如 255`},null,8,[`value`])]),_:1})),M(v,{label:`默认值`},{default:y(()=>[M(_,{value:H.default_val,"onUpdate:value":t[7]||=e=>H.default_val=e,placeholder:`可选`},null,8,[`value`])]),_:1}),M(v,{label:`可空`},{default:y(()=>[M(J,{value:H.nullable,"onUpdate:value":t[8]||=e=>H.nullable=e},null,8,[`value`])]),_:1})]),_:1},8,[`model`])]),_:1})]),_:1},8,[`show`])]),_:1}),M(X,{show:D.value,"onUpdate:show":t[11]||=e=>D.value=e,title:`代码预览`,style:{width:`950px`}},{default:y(()=>[M(ue,{type:`segment`,animated:``},{default:y(()=>[M(Q,{name:`sql`,tab:`SQL建表`},{default:y(()=>[M(Z,{code:N.value.sql||``,language:`sql`,style:{"max-height":`500px`,overflow:`auto`}},null,8,[`code`])]),_:1}),M(Q,{name:`php`,tab:`PHP控制器`},{default:y(()=>[M(Z,{code:N.value.controller||``,language:`php`,style:{"max-height":`500px`,overflow:`auto`}},null,8,[`code`])]),_:1}),M(Q,{name:`vue`,tab:`Vue页面`},{default:y(()=>[M(Z,{code:N.value.vue||``,language:`html`,style:{"max-height":`500px`,overflow:`auto`}},null,8,[`code`])]),_:1})]),_:1})]),_:1},8,[`show`]),M(X,{show:O.value,"onUpdate:show":t[12]||=e=>O.value=e,title:`生成结果`},{default:y(()=>[M(Y,{style:{width:`650px`}},{default:y(()=>[M(de,{column:1,bordered:``,size:`small`,"label-placement":`left`},{default:y(()=>[M($,{label:`建表SQL`},{default:y(()=>[P(V(F.value.sql_status||`-`),1)]),_:1}),M($,{label:`PHP控制器`},{default:y(()=>[P(V(F.value.ctrl_status||`-`),1)]),_:1}),M($,{label:`Vue页面`},{default:y(()=>[P(V(F.value.vue_status||`-`),1)]),_:1})]),_:1})]),_:1})]),_:1},8,[`show`]),M(X,{show:k.value,"onUpdate:show":t[13]||=e=>k.value=e,title:`现有数据表`},{default:y(()=>[M(Y,{style:{width:`450px`}},{default:y(()=>[M(K,{columns:W,data:L.value,size:`small`,bordered:!1},null,8,[`data`])]),_:1})]),_:1},8,[`show`])])}}});export{X as default};