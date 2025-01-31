"use strict";(self.webpackChunk_jitsi_handbook=self.webpackChunk_jitsi_handbook||[]).push([[2193],{2104:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>s,metadata:()=>r,toc:()=>a});var t=i(4848),d=i(8453);const s={id:"dev-guide-mobile-jitsi-meet",title:"Developer Guide for Jitsi Meet",sidebar_label:"Jitsi Meet development"},o=void 0,r={id:"dev-guide/dev-guide-mobile-jitsi-meet",title:"Developer Guide for Jitsi Meet",description:"This guide will help you setup a development environment to start working on the Jitsi Meet mobile app itself.",source:"@site/docs/dev-guide/mobile-jitsi-meet.md",sourceDirName:"dev-guide",slug:"/dev-guide/dev-guide-mobile-jitsi-meet",permalink:"/handbook/docs/dev-guide/dev-guide-mobile-jitsi-meet",draft:!1,unlisted:!1,editUrl:"https://github.com/jitsi/handbook/edit/master/docs/dev-guide/mobile-jitsi-meet.md",tags:[],version:"current",lastUpdatedAt:173835392e4,frontMatter:{id:"dev-guide-mobile-jitsi-meet",title:"Developer Guide for Jitsi Meet",sidebar_label:"Jitsi Meet development"},sidebar:"docs",previous:{title:"Mobile",permalink:"/handbook/docs/category/mobile"},next:{title:"Feature flags",permalink:"/handbook/docs/dev-guide/mobile-feature-flags"}},l={},a=[{value:"Overview",id:"overview",level:2},{value:"iOS",id:"ios",level:2},{value:"Android",id:"android",level:2},{value:"Adding extra dependencies",id:"adding-extra-dependencies",level:3},{value:"Debugging",id:"debugging",level:2},{value:"Enabling extra features",id:"enabling-extra-features",level:2}];function c(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,d.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.p,{children:"This guide will help you setup a development environment to start working on the Jitsi Meet mobile app itself."}),"\n",(0,t.jsx)(n.admonition,{type:"caution",children:(0,t.jsx)(n.p,{children:"Building the apps / SDKs is not supported on Windows."})}),"\n",(0,t.jsx)(n.h2,{id:"overview",children:"Overview"}),"\n",(0,t.jsx)(n.admonition,{type:"note",children:(0,t.jsx)(n.p,{children:"This guide is about building the Jitsi Meet apps themselves. If you want to integrate the Jitsi Meet SDK into your own application check the dedicated page on the sidebar."})}),"\n",(0,t.jsxs)(n.p,{children:["Jitsi Meet can be built as a standalone app for Android or iOS. It uses the\n",(0,t.jsx)(n.a,{href:"https://facebook.github.io/react-native/",children:"React Native"})," framework."]}),"\n",(0,t.jsx)(n.p,{children:"First make sure the following dependencies are installed:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"watchman"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"nodejs"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"npm"})}),"\n"]}),"\n",(0,t.jsx)(n.admonition,{title:"Node version",type:"warning",children:(0,t.jsx)(n.p,{children:"Node 20.x and npm 10.x are required. Any other version may result in runtime errors."})}),"\n",(0,t.jsx)(n.admonition,{title:"Xcode",type:"note",children:(0,t.jsx)(n.p,{children:"Xcode 15 or higher is required."})}),"\n",(0,t.jsx)(n.h2,{id:"ios",children:"iOS"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"Install dependencies"}),"\n"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Install main dependencies:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npm install\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Install the required pods (CocoaPods must be installed first, it can\nbe done with Homebrew: ",(0,t.jsx)(n.code,{children:"brew install cocoapods"}),")"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"cd ios\npod install\ncd ..\n"})}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.ol,{start:"2",children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Build the app using Xcode"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Open ",(0,t.jsx)(n.code,{children:"ios/jitsi-meet.xcworkspace"})," in Xcode. Make sure it's the workspace\nfile!"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Select your device from the top bar and hit the ",(0,t.jsx)(n.strong,{children:"Play \u25b6\ufe0f"})," button."]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"When the app is launched from Xcode, the Debug Console will show the application output\nlogs."}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Other remarks"}),"\n",(0,t.jsxs)(n.p,{children:["It's likely you'll need to change the bundle ID for deploying to a device.\nThis can be changed in the ",(0,t.jsx)(n.strong,{children:"General"})," tab. Under ",(0,t.jsx)(n.strong,{children:"Identity"})," set\n",(0,t.jsx)(n.strong,{children:"Bundle Identifier"})," to a different value, and adjust the ",(0,t.jsx)(n.strong,{children:"Team"})," in the\n",(0,t.jsx)(n.strong,{children:"Signing"})," section to match your own."]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"android",children:"Android"}),"\n",(0,t.jsxs)(n.p,{children:["Make sure ",(0,t.jsx)(n.a,{href:"https://developer.android.com/studio/index.html",children:"Android Studio"})," is installed."]}),"\n",(0,t.jsxs)(n.p,{children:["Set the JDK in Android Studio to at least Java 11: ",(0,t.jsx)(n.a,{href:"https://developer.android.com/studio/intro/studio-config#jdk",children:"https://developer.android.com/studio/intro/studio-config#jdk"})]}),"\n",(0,t.jsx)(n.h3,{id:"adding-extra-dependencies",children:"Adding extra dependencies"}),"\n",(0,t.jsx)(n.p,{children:"Due to how our project is structured, React Native's automatic linking won't work so Android dependencies need to be manually linked."}),"\n",(0,t.jsxs)(n.p,{children:["First, add your project to ",(0,t.jsx)(n.code,{children:"android/settings.gradle"})," like so:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-gradle",metastring:'title="android/settings.gradle"',children:"include ':react-native-mydependency'\nproject(':react-native-mydependency').projectDir = new File(rootProject.projectDir, '../node_modules/@somenamespace/react-native-mydependency/android')\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Then add a dependency on ",(0,t.jsx)(n.code,{children:"android/sdk/build.gradle"})," like so:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-gradle",metastring:'title="android/sdk/build.gradle"',children:"implementation project(':react-native-mydependency')\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Last, link it in the ",(0,t.jsx)(n.code,{children:"getReactNativePackages"})," method in ",(0,t.jsx)(n.code,{children:"android/sdk/src/main/java/org/jitsi/meet/sdk/ReactInstanceManagerHolder.java"})," like so:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-java",metastring:'title="android/sdk/src/main/java/org/jitsi/meet/sdk/ReactInstanceManagerHolder.java"',children:"new com.companyname.library.AwesomeLibraryPackage(),\n"})}),"\n",(0,t.jsx)(n.p,{children:"Make sure you adjust the fully qualified package name."}),"\n",(0,t.jsx)(n.h2,{id:"debugging",children:"Debugging"}),"\n",(0,t.jsxs)(n.p,{children:["The official documentation on ",(0,t.jsx)(n.a,{href:"https://facebook.github.io/react-native/docs/debugging/",children:"debugging"})," is quite extensive and specifies the\npreferred method for debugging."]}),"\n",(0,t.jsx)(n.admonition,{type:"note",children:(0,t.jsx)(n.p,{children:"When using Chrome Developer Tools for debugging the JavaScript source\ncode is being interpreted by Chrome's V8 engine, instead of JSCore which React\nNative uses. It's important to keep this in mind due to potential differences in\nsupported JavaScript features. Also note Jitsi Meet does not support Flipper."})}),"\n",(0,t.jsx)(n.h2,{id:"enabling-extra-features",children:"Enabling extra features"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"/handbook/docs/dev-guide/mobile-dropbox",children:"Dropbox Integration"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"/handbook/docs/dev-guide/mobile-google-auth",children:"Google Sign-In Integration (For YouTube Live Streaming)"})}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,d.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>o,x:()=>r});var t=i(6540);const d={},s=t.createContext(d);function o(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:o(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);