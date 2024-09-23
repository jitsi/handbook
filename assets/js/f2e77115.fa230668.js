"use strict";(self.webpackChunk_jitsi_handbook=self.webpackChunk_jitsi_handbook||[]).push([[9173],{7211:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>p,contentTitle:()=>s,default:()=>l,frontMatter:()=>i,metadata:()=>d,toc:()=>a});var r=o(4848),t=o(8453);const i={id:"mobile-dropbox",title:"Setting up Dropbox integration"},s=void 0,d={id:"dev-guide/mobile-dropbox",title:"Setting up Dropbox integration",description:"1. Create a Dropbox app.",source:"@site/docs/dev-guide/mobile-dropbox.md",sourceDirName:"dev-guide",slug:"/dev-guide/mobile-dropbox",permalink:"/handbook/docs/dev-guide/mobile-dropbox",draft:!1,unlisted:!1,editUrl:"https://github.com/jitsi/handbook/edit/master/docs/dev-guide/mobile-dropbox.md",tags:[],version:"current",lastUpdatedAt:1727086824e3,frontMatter:{id:"mobile-dropbox",title:"Setting up Dropbox integration"}},p={},a=[];function c(e){const n={a:"a",code:"code",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:"Create a Dropbox app."}),"\n",(0,r.jsxs)(n.li,{children:["Add the following to ",(0,r.jsx)(n.code,{children:"ios/app/src/Info.plist"})," by replacing ",(0,r.jsx)(n.code,{children:"<APP_KEY>"}),"\nwith your own Dropbox app key (which can be found in the\n",(0,r.jsx)(n.a,{href:"https://www.dropbox.com/developers/apps",children:"App Console"}),"):"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"<key>CFBundleURLTypes</key>\n<array>\n  <dict>\n    <key>CFBundleURLName</key>\n    <string></string>\n    <key>CFBundleURLSchemes</key>\n    <array>\n      <string>db-<APP_KEY></string>\n    </array>\n  </dict>\n</array>\n<key>LSApplicationQueriesSchemes</key>\n<array>\n  <string>dbapi-2</string>\n  <string>dbapi-8-emm</string>\n</array>\n"})}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"NOTE:"})," Both Android and iOS builds of the apps will parse the Dropbox app key\nfrom ",(0,r.jsx)(n.code,{children:"ios/app/src/Info.plist"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"NOTE:"})," See ",(0,r.jsx)(n.a,{href:"https://www.dropbox.com/developers/reference/developer-guide",children:"Dropbox developer guide"})," for more information"]})]})}function l(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},8453:(e,n,o)=>{o.d(n,{R:()=>s,x:()=>d});var r=o(6540);const t={},i=r.createContext(t);function s(e){const n=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:s(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);