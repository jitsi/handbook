"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3383],{5680:(e,n,t)=>{t.d(n,{xA:()=>d,yg:()=>m});var i=t(6540);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,i,r=function(e,n){if(null==e)return{};var t,i,r={},o=Object.keys(e);for(i=0;i<o.length;i++)t=o[i],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)t=o[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s=i.createContext({}),p=function(e){var n=i.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},d=function(e){var n=p(e.components);return i.createElement(s.Provider,{value:n},e.children)},c="mdxType",g={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},u=i.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),c=p(t),u=r,m=c["".concat(s,".").concat(u)]||c[u]||g[u]||o;return t?i.createElement(m,a(a({ref:n},d),{},{components:t})):i.createElement(m,a({ref:n},d))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,a=new Array(o);a[0]=u;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l[c]="string"==typeof e?e:r,a[1]=l;for(var p=2;p<o;p++)a[p]=t[p];return i.createElement.apply(null,a)}return i.createElement.apply(null,t)}u.displayName="MDXCreateElement"},364:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>s,default:()=>m,frontMatter:()=>l,metadata:()=>p,toc:()=>c});var i=t(8168),r=t(8587),o=(t(6540),t(5680)),a=["components"],l={id:"dev-guide-electron-sdk",title:"Electron SDK"},s=void 0,p={unversionedId:"dev-guide/dev-guide-electron-sdk",id:"dev-guide/dev-guide-electron-sdk",title:"Electron SDK",description:"The Jitsi Meet Electron SDK provides a toolkit for adding Jitsi Meet into electron applications with additional features for a better desktop experience.",source:"@site/docs/dev-guide/electron-sdk.md",sourceDirName:"dev-guide",slug:"/dev-guide/dev-guide-electron-sdk",permalink:"/handbook/docs/dev-guide/dev-guide-electron-sdk",draft:!1,editUrl:"https://github.com/jitsi/handbook/edit/master/docs/dev-guide/electron-sdk.md",tags:[],version:"current",lastUpdatedAt:1725272378,formattedLastUpdatedAt:"Sep 2, 2024",frontMatter:{id:"dev-guide-electron-sdk",title:"Electron SDK"},sidebar:"docs",previous:{title:"lib-jitsi-meet API (low level)",permalink:"/handbook/docs/dev-guide/dev-guide-ljm-api"},next:{title:"React SDK",permalink:"/handbook/docs/dev-guide/dev-guide-react-sdk"}},d={},c=[{value:"Sample Application",id:"sample-application",level:2},{value:"Installation",id:"installation",level:2},{value:"Usage",id:"usage",level:2},{value:"Screen Sharing",id:"screen-sharing",level:3},{value:"Remote Control",id:"remote-control",level:3},{value:"Always On Top",id:"always-on-top",level:3},{value:"Power Monitor",id:"power-monitor",level:3},{value:"NOTE:",id:"note",level:3}],g={toc:c},u="wrapper";function m(e){var n=e.components,t=(0,r.A)(e,a);return(0,o.yg)(u,(0,i.A)({},g,t,{components:n,mdxType:"MDXLayout"}),(0,o.yg)("p",null,"The Jitsi Meet Electron SDK provides a toolkit for adding Jitsi Meet into electron applications with additional features for a better desktop experience."),(0,o.yg)("p",null,"Supported Electron versions: >= 16."),(0,o.yg)("h2",{id:"sample-application"},"Sample Application"),(0,o.yg)("p",null,"The Jitsi Meet Electron Application is created using the Electron SDK and makes use of all its available features. The source code is available here: ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/jitsi/jitsi-meet-electron"},"jitsi-meet-electron application repository"),"."),(0,o.yg)("h2",{id:"installation"},"Installation"),(0,o.yg)("p",null,"Install from npm:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre"},"npm install @jitsi/electron-sdk\n")),(0,o.yg)("p",null,"Note: This package contains native code on Windows for the remote control module. Binary prebuilds are packaged with prebuildify as part of the npm package."),(0,o.yg)("h2",{id:"usage"},"Usage"),(0,o.yg)("h3",{id:"screen-sharing"},"Screen Sharing"),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Requirements"),":\nThe screen sharing utility requires iframe HTML Element that will load Jitsi Meet."),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Enable the screen sharing:")),(0,o.yg)("p",null,"In the ",(0,o.yg)("strong",{parentName:"p"},"render")," electron process of the window where Jitsi Meet is displayed:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-js"},'const {\n    setupScreenSharingRender\n} = require("@jitsi/electron-sdk");\n\n// api - The Jitsi Meet iframe api object.\nsetupScreenSharingRender(api);\n')),(0,o.yg)("p",null,"In the ",(0,o.yg)("strong",{parentName:"p"},"main")," electron process:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-js"},'const {\n    setupScreenSharingMain\n} = require("@jitsi/electron-sdk");\n\n// jitsiMeetWindow - The BrowserWindow instance of the window where Jitsi Meet is loaded.\n// appName - Application name which will be displayed inside the content sharing tracking window\n// i.e. [appName] is sharing your screen.\n// osxBundleId - Mac Application bundleId for which screen capturer permissions will be reset if user denied them.  \nsetupScreenSharingMain(mainWindow, appName, osxBundleId);\n')),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Note"),":\nAn example using screensharing in Electron without the SDK is available here: ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/gabiborlea/jitsi-meet-electron-example"},"screensharing example without the SDK"),"."),(0,o.yg)("h3",{id:"remote-control"},"Remote Control"),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Requirements"),":\nThe remote control utility requires an iframe HTML Element that will load Jitsi Meet."),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Enable the remote control:")),(0,o.yg)("p",null,"In the ",(0,o.yg)("strong",{parentName:"p"},"render")," electron process of the window where Jitsi Meet is displayed:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-js"},'const {\n    RemoteControl\n} = require("@jitsi/electron-sdk");\n\n// iframe - the Jitsi Meet iframe\nconst remoteControl = new RemoteControl(iframe);\n')),(0,o.yg)("p",null,"To disable the remote control:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-js"},"remoteControl.dispose();\n")),(0,o.yg)("p",null,"NOTE: The ",(0,o.yg)("inlineCode",{parentName:"p"},"dispose")," method will be called automatically when the Jitsi Meet iframe unloads."),(0,o.yg)("p",null,"In the ",(0,o.yg)("strong",{parentName:"p"},"main")," electron process:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-js"},'const {\n    RemoteControlMain\n} = require("@jitsi/electron-sdk");\n\n// jitsiMeetWindow - The BrowserWindow instance of the window where Jitsi Meet is loaded.\nconst remoteControl = new RemoteControlMain(mainWindow);\n')),(0,o.yg)("h3",{id:"always-on-top"},"Always On Top"),(0,o.yg)("p",null,"Displays a small window with the currently active speaker video when the main Jitsi Meet window is not focused."),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Requirements"),":"),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},"Jitsi Meet should be initialized through our ",(0,o.yg)("a",{parentName:"li",href:"https://github.com/jitsi/jitsi-meet/blob/master/doc/api.md"},"iframe API")),(0,o.yg)("li",{parentName:"ol"},"The ",(0,o.yg)("inlineCode",{parentName:"li"},"BrowserWindow")," instance where Jitsi Meet is displayed should use the ",(0,o.yg)("a",{parentName:"li",href:"https://github.com/electron/electron/blob/master/docs/api/window-open.md#using-chromes-windowopen-implementation"},"Chrome's window.open implementation")," (set ",(0,o.yg)("inlineCode",{parentName:"li"},"nativeWindowOpen")," option of ",(0,o.yg)("inlineCode",{parentName:"li"},"BrowserWindow"),"'s constructor to ",(0,o.yg)("inlineCode",{parentName:"li"},"true"),")."),(0,o.yg)("li",{parentName:"ol"},"If you have a custom handler for opening windows you have to filter the always-on-top window. You can do this by its ",(0,o.yg)("inlineCode",{parentName:"li"},"frameName")," argument which will be set to ",(0,o.yg)("inlineCode",{parentName:"li"},"AlwaysOnTop"),".")),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Enable the aways on top:")),(0,o.yg)("p",null,"In the ",(0,o.yg)("strong",{parentName:"p"},"main")," electron process:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-js"},'const {\n    setupAlwaysOnTopMain\n} = require("@jitsi/electron-sdk");\n\n// jitsiMeetWindow - The BrowserWindow instance\n// of the window where Jitsi Meet is loaded.\nsetupAlwaysOnTopMain(jitsiMeetWindow);\n')),(0,o.yg)("p",null,"In the ",(0,o.yg)("strong",{parentName:"p"},"render")," electron process of the window where Jitsi Meet is displayed:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-js"},"const {\n    setupAlwaysOnTopRender\n} = require(\"@jitsi/electron-sdk\");\n\nconst api = new JitsiMeetExternalAPI(...);\nconst alwaysOnTop = setupAlwaysOnTopRender(api);\n\nalwaysOnTop.on('will-close', handleAlwaysOnTopClose);\n")),(0,o.yg)("p",null,(0,o.yg)("inlineCode",{parentName:"p"},"setupAlwaysOnTopRender")," returns an instance of EventEmitter with the following events:"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("em",{parentName:"p"},"dismissed")," - emitted when the always-on-top window is explicitly dismissed via its close button")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("em",{parentName:"p"},"will-close")," - emitted right before the always-on-top window is going to close"))),(0,o.yg)("h3",{id:"power-monitor"},"Power Monitor"),(0,o.yg)("p",null,"Provides a way to query Electron for system idle and receive power monitor events."),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"enable power monitor:"),"\nIn the ",(0,o.yg)("strong",{parentName:"p"},"main")," electron process:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-js"},'const {\n    setupPowerMonitorMain\n} = require("@jitsi/electron-sdk");\n\n// jitsiMeetWindow - The BrowserWindow instance\n// of the window where Jitsi Meet is loaded.\nsetupPowerMonitorMain(jitsiMeetWindow);\n')),(0,o.yg)("p",null,"In the ",(0,o.yg)("strong",{parentName:"p"},"render")," electron process of the window where Jitsi Meet is displayed:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-js"},'const {\n    setupPowerMonitorRender\n} = require("@jitsi/electron-sdk");\n\nconst api = new JitsiMeetExternalAPI(...);\nsetupPowerMonitorRender(api);\n')),(0,o.yg)("h3",{id:"note"},"NOTE:"),(0,o.yg)("p",null,"You'll need to add 'disable-site-isolation-trials' switch because of ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/electron/electron/issues/18214"},"https://github.com/electron/electron/issues/18214"),":"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre"},"app.commandLine.appendSwitch('disable-site-isolation-trials')\n")),(0,o.yg)("p",null,"For more information please check out the SDK's repository ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/jitsi/jitsi-meet-electron-sdk"},"https://github.com/jitsi/jitsi-meet-electron-sdk"),"."))}m.isMDXComponent=!0}}]);