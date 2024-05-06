"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7711],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>p});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),u=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=u(e.components);return n.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),f=u(r),p=a,m=f["".concat(s,".").concat(p)]||f[p]||d[p]||o;return r?n.createElement(m,i(i({ref:t},c),{},{components:r})):n.createElement(m,i({ref:t},c))}));function p(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=f;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var u=2;u<o;u++)i[u]=r[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},7249:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>p,frontMatter:()=>l,metadata:()=>u,toc:()=>d});var n=r(7462),a=r(3366),o=(r(7294),r(3905)),i=["components"],l={id:"mobile-feature-flags",title:"Feature flags"},s=void 0,u={unversionedId:"dev-guide/mobile-feature-flags",id:"dev-guide/mobile-feature-flags",title:"Feature flags",description:"The mobile SDK supports a number of feature flags which allow for customizing certain",source:"@site/docs/dev-guide/mobile-feature-flags.md",sourceDirName:"dev-guide",slug:"/dev-guide/mobile-feature-flags",permalink:"/handbook/docs/dev-guide/mobile-feature-flags",draft:!1,editUrl:"https://github.com/jitsi/handbook/edit/master/docs/dev-guide/mobile-feature-flags.md",tags:[],version:"current",lastUpdatedAt:1715027026,formattedLastUpdatedAt:"May 6, 2024",frontMatter:{id:"mobile-feature-flags",title:"Feature flags"},sidebar:"docs",previous:{title:"Jitsi Meet development",permalink:"/handbook/docs/dev-guide/dev-guide-mobile-jitsi-meet"},next:{title:"Android SDK",permalink:"/handbook/docs/dev-guide/dev-guide-android-sdk"}},c={},d=[],f={toc:d};function p(e){var t=e.components,r=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,n.Z)({},f,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"The mobile SDK supports a number of feature flags which allow for customizing certain\nUI aspects and behavior."),(0,o.kt)("p",null,"All flags are defined ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/jitsi/jitsi-meet/blob/master/react/features/base/flags/constants.ts"},"here"),"."))}p.isMDXComponent=!0}}]);