"use strict";(self.webpackChunk_jitsi_handbook=self.webpackChunk_jitsi_handbook||[]).push([[2443],{8798:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>r,default:()=>l,frontMatter:()=>o,metadata:()=>a,toc:()=>h});var i=n(4848),s=n(8453);const o={id:"architecture",title:"Architecture"},r=void 0,a={id:"architecture",title:"Architecture",description:"In this section, a global overview of the Jitsi infrastructure is provided. If you just started contributing to the project, we highly recommend reading this section thoroughly.",source:"@site/docs/architecture.md",sourceDirName:".",slug:"/architecture",permalink:"/handbook/docs/architecture",draft:!1,unlisted:!1,editUrl:"https://github.com/jitsi/handbook/edit/master/docs/architecture.md",tags:[],version:"current",lastUpdatedAt:1739262203e3,frontMatter:{id:"architecture",title:"Architecture"},sidebar:"docs",previous:{title:"Introduction",permalink:"/handbook/docs/intro"},next:{title:"Security",permalink:"/handbook/docs/security"}},c={},h=[{value:"Components",id:"components",level:2},{value:"Architecture Diagram",id:"architecture-diagram",level:2},{value:"Code Map",id:"code-map",level:2},{value:"Testing",id:"testing",level:2}];function d(e){const t={a:"a",code:"code",h2:"h2",img:"img",li:"li",p:"p",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.p,{children:"In this section, a global overview of the Jitsi infrastructure is provided. If you just started contributing to the project, we highly recommend reading this section thoroughly."}),"\n",(0,i.jsx)(t.h2,{id:"components",children:"Components"}),"\n",(0,i.jsxs)(t.p,{children:["Jitsi comprises a ",(0,i.jsx)(t.a,{href:"https://jitsi.org/projects/",children:"collection of projects"}),":"]}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.a,{href:"https://jitsi.org/jitsi-meet",children:"Jitsi Meet"})," - WebRTC compatible JavaScript application that uses Jitsi Videobridge to provide high-quality, scalable video conferences. Build upon React and React Native."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.a,{href:"https://jitsi.org/jitsi-videobridge",children:"Jitsi Videobridge (JVB)"})," - WebRTC compatible server designed to route video streams amongst participants in a conference."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.a,{href:"https://github.com/jitsi/jicofo",children:"Jitsi Conference Focus (jicofo)"})," - server-side focus component used in Jitsi Meet conferences that manages media sessions and acts as a load balancer between each of the participants and the videobridge."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.a,{href:"https://github.com/jitsi/jigasi",children:"Jitsi Gateway to SIP (jigasi)"})," - server-side application that allows regular SIP clients to join Jitsi Meet conferences"]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.a,{href:"https://github.com/jitsi/jibri",children:"Jitsi Broadcasting Infrastructure (jibri)"})," - set of tools for recording and/or streaming a Jitsi Meet conference that works by launching a Chrome instance rendered in a virtual framebuffer and capturing and encoding the output with ffmpeg."]}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"External Software used by Jitsi:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.a,{href:"https://prosody.im/",children:"Prosody"})," - XMPP server used for signalling"]}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"architecture-diagram",children:"Architecture Diagram"}),"\n",(0,i.jsx)(t.p,{children:"The individual connections between the previously described components, as well as their external integrations are described in the figure below."}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{src:"https://raw.githubusercontent.com/jitsi/handbook/master/docs/assets/ArchitectureDiagram.png",alt:""})}),"\n",(0,i.jsx)(t.p,{children:"The external connections can be categorized into two main groups. Firstly, the connections between clients that request a video or audio connection are performed through remote requests and data streams. The second category of external connections is those to external services that help store recordings, stream recordings, stream videos, or help with creating meetings."}),"\n",(0,i.jsx)(t.h2,{id:"code-map",children:"Code Map"}),"\n",(0,i.jsx)(t.p,{children:"In this section, we will look at the main parts of the codebase and see what they can be used for."}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:"./react/features"}),"\nThis folder is where it is best to start writing your code, as it contains most of the app components that are used in the apps on Android and iOS, as well as on the web version. This source folder is split up into all the different features that Jitsi has to offer, such as authentication, chat interaction, keyboard shortcuts, screenshot capture, remote control, and virtual background. Each of these features has a folder in this map, which is then again split up to keep a hierarchy and consistency throughout the code."]}),"\n",(0,i.jsx)(t.p,{children:"Each feature folder consists of a subfolder called components, in this folder all of the React, or React Native for mobile, components are expressed. Usually, in this folder there will be a separation between native and web components, however, in some cases, the same component could be used for both Android, iOS, and web browsers, in which case there is no separation made."}),"\n",(0,i.jsx)(t.p,{children:"As stated before, the codebase mostly consists of React and React Native, which is the React version for mobile applications. Most of the features make use of the so-called class component by React [^class-comp], however, some new features start to use the new way to write functional components by using hooks[^func-comp]."}),"\n",(0,i.jsx)(t.p,{children:"The application makes use of React Redux as well, this is used as a general state store to keep track of important parameters that are used throughout the application. More on React Redux can be found here [^react-redux]."}),"\n",(0,i.jsxs)(t.p,{children:["Most features also contain a file called ",(0,i.jsx)(t.code,{children:"middleware.js"}),". This file acts as a bridge between the component and the functionality of the rest of the application."]}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:"./modules/external-api"}),"\nIn this folder, the external API can be found. This API can be used in various events like participants joining/leaving the meeting, changes in avatars or chat, as well as errors in using the microphone or camera."]}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:"./android and ./ios"}),"\nBoth of these folders contain the basics of the Android and iOS apps respectively. However, the code for the application itself and its components can be found in the ",(0,i.jsx)(t.strong,{children:"react/features"})," folder, which is explained earlier in this section."]}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:"./conference.js"}),"\nThis file can be found at the root of the project and contains the foundation of any interaction between a user and a conference room. This consists of setting up a connection to it, joining the meeting room, muting and unmuting, but also functions to gather information about the participants that are in the room."]}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:"./lang"}),"\nThis folder contains all the different translations that are present in Jitsi Meet. The translations can be found in the code with each of the keys in the translation maps that can be found in the ",(0,i.jsx)(t.code,{children:"main-[language].json"})," files."]}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:"./css"}),"\nThis folder contains all the CSS that is used in the project. The files (mostly .scss files[^scss]) are split up into features like the React features that they are used in."]}),"\n",(0,i.jsx)(t.h2,{id:"testing",children:"Testing"}),"\n",(0,i.jsx)(t.p,{children:"The main form of testing code changes is done through torture tests, next to this the code is tested manually."}),"\n",(0,i.jsxs)(t.p,{children:["The torture tests are located in a separate repository, ",(0,i.jsx)(t.a,{href:"https://github.com/jitsi/jitsi-meet-torture",children:"Jitsi Meet Torture"}),". The project contains end-to-end tests for several key functions such as peer-to-peer and invites. The testing can be done for iOS, Android, and the web, which are all the platforms that Jitsi Meet can be used on. The testing is done automatically for pull requests by project members, where it is used in combination with the continuous integration by a Jenkins instance running the tests, testing on the ",(0,i.jsx)(t.a,{href:"https://meet.jit.si",children:"meet.jit.si"})," instance. Other members can run the tests locally. The test results can be viewed on an automatically generated web page."]}),"\n",(0,i.jsxs)(t.p,{children:["Manual testing is performed while doing code reviews, however, there are also testing releases that can be freely downloaded and deployed or can be used on the ",(0,i.jsx)(t.a,{href:"https://beta.meet.jit.si/",children:"beta test server"}),"."]})]})}function l(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>r,x:()=>a});var i=n(6540);const s={},o=i.createContext(s);function r(e){const t=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),i.createElement(o.Provider,{value:t},e.children)}}}]);