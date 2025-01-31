"use strict";(self.webpackChunk_jitsi_handbook=self.webpackChunk_jitsi_handbook||[]).push([[2378],{4864:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>T,contentTitle:()=>I,default:()=>_,frontMatter:()=>S,metadata:()=>V,toc:()=>E});var n=s(4848),r=s(8453),i=s(6540),a=s(4164),l=s(3104),o=s(6347),d=s(205),c=s(7485),u=s(1682),h=s(679);function p(e){var t,s;return null!=(t=null==(s=i.Children.toArray(e).filter((function(e){return"\n"!==e})).map((function(e){if(!e||(0,i.isValidElement)(e)&&((t=e.props)&&"object"==typeof t&&"value"in t))return e;var t;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})))?void 0:s.filter(Boolean))?t:[]}function j(e){var t=e.values,s=e.children;return(0,i.useMemo)((function(){var e=null!=t?t:function(e){return p(e).map((function(e){var t=e.props;return{value:t.value,label:t.label,attributes:t.attributes,default:t.default}}))}(s);return function(e){var t=(0,u.XI)(e,(function(e,t){return e.value===t.value}));if(t.length>0)throw new Error('Docusaurus error: Duplicate values "'+t.map((function(e){return e.value})).join(", ")+'" found in <Tabs>. Every value needs to be unique.')}(e),e}),[t,s])}function b(e){var t=e.value;return e.tabValues.some((function(e){return e.value===t}))}function x(e){var t=e.queryString,s=void 0!==t&&t,n=e.groupId,r=(0,o.W6)(),a=function(e){var t=e.queryString,s=void 0!==t&&t,n=e.groupId;if("string"==typeof s)return s;if(!1===s)return null;if(!0===s&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return null!=n?n:null}({queryString:s,groupId:n});return[(0,c.aZ)(a),(0,i.useCallback)((function(e){if(a){var t=new URLSearchParams(r.location.search);t.set(a,e),r.replace(Object.assign({},r.location,{search:t.toString()}))}}),[a,r])]}function g(e){var t,s,n,r,a=e.defaultValue,l=e.queryString,o=void 0!==l&&l,c=e.groupId,u=j(e),p=(0,i.useState)((function(){return function(e){var t,s=e.defaultValue,n=e.tabValues;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(s){if(!b({value:s,tabValues:n}))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+s+'" but none of its children has the corresponding value. Available values are: '+n.map((function(e){return e.value})).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");return s}var r=null!=(t=n.find((function(e){return e.default})))?t:n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:a,tabValues:u})})),g=p[0],f=p[1],m=x({queryString:o,groupId:c}),v=m[0],y=m[1],w=(t=function(e){return e?"docusaurus.tab."+e:null}({groupId:c}.groupId),s=(0,h.Dv)(t),n=s[0],r=s[1],[n,(0,i.useCallback)((function(e){t&&r.set(e)}),[t,r])]),k=w[0],A=w[1],D=function(){var e=null!=v?v:k;return b({value:e,tabValues:u})?e:null}();return(0,d.A)((function(){D&&f(D)}),[D]),{selectedValue:g,selectValue:(0,i.useCallback)((function(e){if(!b({value:e,tabValues:u}))throw new Error("Can't select invalid tab value="+e);f(e),y(e),A(e)}),[y,A,u]),tabValues:u}}var f=s(2303);const m={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function v(e){var t=e.className,s=e.block,r=e.selectedValue,i=e.selectValue,o=e.tabValues,d=[],c=(0,l.a_)().blockElementScrollPositionUntilNextRender,u=function(e){var t=e.currentTarget,s=d.indexOf(t),n=o[s].value;n!==r&&(c(t),i(n))},h=function(e){var t,s=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":var n,r=d.indexOf(e.currentTarget)+1;s=null!=(n=d[r])?n:d[0];break;case"ArrowLeft":var i,a=d.indexOf(e.currentTarget)-1;s=null!=(i=d[a])?i:d[d.length-1]}null==(t=s)||t.focus()};return(0,n.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.A)("tabs",{"tabs--block":s},t),children:o.map((function(e){var t=e.value,s=e.label,i=e.attributes;return(0,n.jsx)("li",Object.assign({role:"tab",tabIndex:r===t?0:-1,"aria-selected":r===t,ref:function(e){return d.push(e)},onKeyDown:h,onClick:u},i,{className:(0,a.A)("tabs__item",m.tabItem,null==i?void 0:i.className,{"tabs__item--active":r===t}),children:null!=s?s:t}),t)}))})}function y(e){var t=e.lazy,s=e.children,r=e.selectedValue,l=(Array.isArray(s)?s:[s]).filter(Boolean);if(t){var o=l.find((function(e){return e.props.value===r}));return o?(0,i.cloneElement)(o,{className:(0,a.A)("margin-top--md",o.props.className)}):null}return(0,n.jsx)("div",{className:"margin-top--md",children:l.map((function(e,t){return(0,i.cloneElement)(e,{key:t,hidden:e.props.value!==r})}))})}function w(e){var t=g(e);return(0,n.jsxs)("div",{className:(0,a.A)("tabs-container",m.tabList),children:[(0,n.jsx)(v,Object.assign({},t,e)),(0,n.jsx)(y,Object.assign({},t,e))]})}function k(e){var t=(0,f.A)();return(0,n.jsx)(w,Object.assign({},e,{children:p(e.children)}),String(t))}const A={tabItem:"tabItem_Ymn6"};function D(e){var t=e.children,s=e.hidden,r=e.className;return(0,n.jsx)("div",{role:"tabpanel",className:(0,a.A)(A.tabItem,r),hidden:s,children:t})}const S={id:"releases",title:"Releases"},I=void 0,V={id:"releases",title:"Releases",description:"Release notes for Jitsi Meet are kept here.",source:"@site/docs/releases.md",sourceDirName:".",slug:"/releases",permalink:"/handbook/docs/releases",draft:!1,unlisted:!1,editUrl:"https://github.com/jitsi/handbook/edit/master/docs/releases.md",tags:[],version:"current",lastUpdatedAt:173835392e4,frontMatter:{id:"releases",title:"Releases"},sidebar:"releases-sidebar"},T={},E=[{value:"Apps",id:"apps",level:3},{value:"Apps (beta)",id:"apps-beta",level:3},{value:"SDKs",id:"sdks",level:3},{value:"Docker images",id:"docker-images",level:3},{value:"Debian/Ubuntu packages",id:"debianubuntu-packages",level:3},{value:"Web frontend",id:"web-frontend",level:3}];function N(e){const t={a:"a",admonition:"admonition",code:"code",h3:"h3",img:"img",li:"li",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.admonition,{type:"tip",children:(0,n.jsxs)(t.p,{children:["Release notes for Jitsi Meet are kept ",(0,n.jsx)(t.a,{href:"https://github.com/jitsi/jitsi-meet-release-notes",children:"here"}),"."]})}),"\n","\n",(0,n.jsxs)(k,{queryString:"release",children:[(0,n.jsxs)(D,{value:"mobile",label:"Mobile",default:!0,children:[(0,n.jsx)(t.h3,{id:"apps",children:"Apps"}),(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{style:{textAlign:"center"},children:"Android"}),(0,n.jsx)(t.th,{style:{textAlign:"center"},children:"Android (F-Droid)"}),(0,n.jsx)(t.th,{style:{textAlign:"center"},children:"iOS"})]})}),(0,n.jsx)(t.tbody,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"center"},children:(0,n.jsx)(t.a,{href:"https://play.google.com/store/apps/details?id=org.jitsi.meet",children:(0,n.jsx)("img",{src:"https://raw.githubusercontent.com/jitsi/handbook/master/docs/assets/google-play-badge.png",height:"50"})})}),(0,n.jsx)(t.td,{style:{textAlign:"center"},children:(0,n.jsx)(t.a,{href:"https://f-droid.org/en/packages/org.jitsi.meet/",children:(0,n.jsx)("img",{src:"https://raw.githubusercontent.com/jitsi/handbook/master/docs/assets/f-droid-badge.png",height:"50"})})}),(0,n.jsx)(t.td,{style:{textAlign:"center"},children:(0,n.jsx)(t.a,{href:"https://itunes.apple.com/us/app/jitsi-meet/id1165103905",children:(0,n.jsx)("img",{src:"https://raw.githubusercontent.com/jitsi/handbook/master/docs/assets/appstore-badge.png",height:"50"})})})]})})]}),(0,n.jsx)(t.h3,{id:"apps-beta",children:"Apps (beta)"}),(0,n.jsx)(t.p,{children:"If you are feeling adventurous and want to get an early scoop of the features as they are being\ndeveloped you can also sign up for our open beta testing here:"}),(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{style:{textAlign:"center"},children:"Android"}),(0,n.jsx)(t.th,{style:{textAlign:"center"},children:"iOS"})]})}),(0,n.jsx)(t.tbody,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"center"},children:(0,n.jsx)(t.a,{href:"https://play.google.com/apps/testing/org.jitsi.meet",children:"Play Store Beta"})}),(0,n.jsx)(t.td,{style:{textAlign:"center"},children:(0,n.jsx)(t.a,{href:"https://testflight.apple.com/join/isy6ja7S",children:"TestFlight"})})]})})]}),(0,n.jsx)(t.h3,{id:"sdks",children:"SDKs"}),(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{style:{textAlign:"center"},children:"Android"}),(0,n.jsx)(t.th,{style:{textAlign:"center"},children:"iOS"})]})}),(0,n.jsx)(t.tbody,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"center"},children:(0,n.jsx)(t.a,{href:"https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-android-sdk#use-pre-build-sdk-artifactsbinaries",children:"Maven repository"})}),(0,n.jsx)(t.td,{style:{textAlign:"center"},children:(0,n.jsx)(t.a,{href:"https://cocoapods.org/pods/JitsiMeetSDK",children:"CocoaPods"})})]})})]})]}),(0,n.jsxs)(D,{value:"desktop",label:"Desktop",children:[(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{style:{textAlign:"center"},children:"Windows"}),(0,n.jsx)(t.th,{style:{textAlign:"center"},children:"macOS"}),(0,n.jsx)(t.th,{style:{textAlign:"center"},children:"GNU/Linux (AppImage)"}),(0,n.jsx)(t.th,{style:{textAlign:"center"},children:"GNU/Linux (Deb)"})]})}),(0,n.jsx)(t.tbody,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"center"},children:(0,n.jsx)(t.a,{href:"https://github.com/jitsi/jitsi-meet-electron/releases/latest/download/jitsi-meet.exe",children:"Download"})}),(0,n.jsx)(t.td,{style:{textAlign:"center"},children:(0,n.jsx)(t.a,{href:"https://github.com/jitsi/jitsi-meet-electron/releases/latest/download/jitsi-meet.dmg",children:"Download"})}),(0,n.jsx)(t.td,{style:{textAlign:"center"},children:(0,n.jsx)(t.a,{href:"https://github.com/jitsi/jitsi-meet-electron/releases/latest/download/jitsi-meet-x86_64.AppImage",children:"Download"})}),(0,n.jsx)(t.td,{style:{textAlign:"center"},children:(0,n.jsx)(t.a,{href:"https://github.com/jitsi/jitsi-meet-electron/releases/latest/download/jitsi-meet-amd64.deb",children:"Download"})})]})})]}),(0,n.jsxs)(t.p,{children:["The desktop applications are based on Electron. For macOS, it is also available as a ",(0,n.jsx)(t.code,{children:"brew"})," cask which can be installed using ",(0,n.jsx)(t.code,{children:"brew install jitsi-meet"}),"."]})]}),(0,n.jsxs)(D,{value:"server",label:"Server",children:[(0,n.jsx)(t.h3,{id:"docker-images",children:"Docker images"}),(0,n.jsxs)(t.p,{children:["See the Docker image releases ",(0,n.jsx)(t.a,{href:"https://github.com/jitsi/docker-jitsi-meet/releases",children:"here"}),"."]}),(0,n.jsx)(t.h3,{id:"debianubuntu-packages",children:"Debian/Ubuntu packages"}),(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.a,{href:"https://download.jitsi.org/stable/",children:(0,n.jsx)(t.code,{children:"stable"})})," (",(0,n.jsx)(t.a,{href:"https://jitsi.org/downloads/ubuntu-debian-installations-instructions/",children:"instructions"}),")"]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.a,{href:"https://download.jitsi.org/testing/",children:(0,n.jsx)(t.code,{children:"testing"})})," (",(0,n.jsx)(t.a,{href:"https://jitsi.org/downloads/ubuntu-debian-installations-instructions-for-testing/",children:"instructions"}),")"]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.a,{href:"https://download.jitsi.org/unstable/",children:(0,n.jsx)(t.code,{children:"nightly"})})," (",(0,n.jsx)(t.a,{href:"https://jitsi.org/downloads/ubuntu-debian-installations-instructions-nightly/",children:"instructions"}),")"]}),"\n"]}),(0,n.jsx)(t.h3,{id:"web-frontend",children:"Web frontend"}),(0,n.jsx)(t.table,{children:(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{children:"Latest stable release"}),(0,n.jsx)(t.th,{children:(0,n.jsx)(t.a,{href:"https://github.com/jitsi/jitsi-meet/releases/latest",children:(0,n.jsx)(t.img,{src:"https://img.shields.io/badge/release-latest-green.svg",alt:"release"})})})]})})}),(0,n.jsxs)(t.p,{children:["Prebuilt ",(0,n.jsx)(t.a,{href:"https://download.jitsi.org/jitsi-meet/src/",children:"source builds"})," are also available."]}),(0,n.jsx)(t.admonition,{type:"note",children:(0,n.jsx)(t.p,{children:"Generally, you won't need to download this, as it's part of the Debian packages and Docker images already."})})]})]})]})}function _(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(N,{...e})}):N(e)}},8453:(e,t,s)=>{s.d(t,{R:()=>a,x:()=>l});var n=s(6540);const r={},i=n.createContext(r);function a(e){const t=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),n.createElement(i.Provider,{value:t},e.children)}}}]);