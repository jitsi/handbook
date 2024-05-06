"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7387],{3905:(e,t,o)=>{o.d(t,{Zo:()=>c,kt:()=>m});var r=o(7294);function a(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function n(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function i(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?n(Object(o),!0).forEach((function(t){a(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):n(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function l(e,t){if(null==e)return{};var o,r,a=function(e,t){if(null==e)return{};var o,r,a={},n=Object.keys(e);for(r=0;r<n.length;r++)o=n[r],t.indexOf(o)>=0||(a[o]=e[o]);return a}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(r=0;r<n.length;r++)o=n[r],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(a[o]=e[o])}return a}var d=r.createContext({}),p=function(e){var t=r.useContext(d),o=t;return e&&(o="function"==typeof e?e(t):i(i({},t),e)),o},c=function(e){var t=p(e.components);return r.createElement(d.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var o=e.components,a=e.mdxType,n=e.originalType,d=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),g=p(o),m=a,u=g["".concat(d,".").concat(m)]||g[m]||s[m]||n;return o?r.createElement(u,i(i({ref:t},c),{},{components:o})):r.createElement(u,i({ref:t},c))}));function m(e,t){var o=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var n=o.length,i=new Array(n);i[0]=g;var l={};for(var d in t)hasOwnProperty.call(t,d)&&(l[d]=t[d]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var p=2;p<n;p++)i[p]=o[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,o)}g.displayName="MDXCreateElement"},8163:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>c,contentTitle:()=>d,default:()=>m,frontMatter:()=>l,metadata:()=>p,toc:()=>s});var r=o(7462),a=o(3366),n=(o(7294),o(3905)),i=["components"],l={id:"dev-guide-web-integrations",title:"Web integrations",sidebar_label:"Integrations"},d=void 0,p={unversionedId:"dev-guide/dev-guide-web-integrations",id:"dev-guide/dev-guide-web-integrations",title:"Web integrations",description:"Creating the Google API client for Google Calendar and YouTube integration",source:"@site/docs/dev-guide/web-integrations.md",sourceDirName:"dev-guide",slug:"/dev-guide/dev-guide-web-integrations",permalink:"/handbook/docs/dev-guide/dev-guide-web-integrations",draft:!1,editUrl:"https://github.com/jitsi/handbook/edit/master/docs/dev-guide/web-integrations.md",tags:[],version:"current",lastUpdatedAt:1715027026,formattedLastUpdatedAt:"May 6, 2024",frontMatter:{id:"dev-guide-web-integrations",title:"Web integrations",sidebar_label:"Integrations"},sidebar:"docs",previous:{title:"Modifying lib-jitsi-meet",permalink:"/handbook/docs/dev-guide/dev-guide-ljm"},next:{title:"IFrame API",permalink:"/handbook/docs/dev-guide/dev-guide-iframe"}},c={},s=[{value:"Creating the Google API client for Google Calendar and YouTube integration",id:"creating-the-google-api-client-for-google-calendar-and-youtube-integration",level:2},{value:"Creating the Microsoft app for Microsoft Outlook integration",id:"creating-the-microsoft-app-for-microsoft-outlook-integration",level:2},{value:"Creating the Dropbox app for Dropbox recording integration",id:"creating-the-dropbox-app-for-dropbox-recording-integration",level:2}],g={toc:s};function m(e){var t=e.components,o=(0,a.Z)(e,i);return(0,n.kt)("wrapper",(0,r.Z)({},g,o,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h2",{id:"creating-the-google-api-client-for-google-calendar-and-youtube-integration"},"Creating the Google API client for Google Calendar and YouTube integration"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},"Log into a Google admin account."),(0,n.kt)("li",{parentName:"ol"},"Go to Google cloud platform dashboard. ",(0,n.kt)("a",{parentName:"li",href:"https://console.cloud.google.com/apis/dashboard"},"https://console.cloud.google.com/apis/dashboard")),(0,n.kt)("li",{parentName:"ol"},"In the Select a Project dropdown, click New Project."),(0,n.kt)("li",{parentName:"ol"},"Give the project a name."),(0,n.kt)("li",{parentName:"ol"},"Proceed to the Credentials settings of the new project."),(0,n.kt)("li",{parentName:"ol"},"In the Credentials tab of the Credentials settings, click Create Credentials and select the type OAuth client ID."),(0,n.kt)("li",{parentName:"ol"},"Proceed with creating a Web application and add the domains (origins) on which the application will be hosted. Local development environments (http://localhost:8000 for example) can be added here."),(0,n.kt)("li",{parentName:"ol"},"While still in the Google cloud platform dashboard, click the Library settings for the calendar project."),(0,n.kt)("li",{parentName:"ol"},"Search for the Google Calendar API (used for calendar accessing), click its result, and enable it."),(0,n.kt)("li",{parentName:"ol"},"Do the same for YouTube Data API v3")),(0,n.kt)("h2",{id:"creating-the-microsoft-app-for-microsoft-outlook-integration"},"Creating the Microsoft app for Microsoft Outlook integration"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},"Go to ",(0,n.kt)("a",{parentName:"li",href:"https://apps.dev.microsoft.com/"},"https://apps.dev.microsoft.com/")),(0,n.kt)("li",{parentName:"ol"},'Proceed through the "Add an app" flow. Once created, a page with several Graph Permissions fields should display.'),(0,n.kt)("li",{parentName:"ol"},'Under "Platforms" add "Web"'),(0,n.kt)("li",{parentName:"ol"},"Add a redirect URL for the Microsoft auth flow to visit once a user has confirmed authentication. Target domain if available is just 'yourdomain.com' (the deployment address) and the redirect URL is ",(0,n.kt)("inlineCode",{parentName:"li"},"https://yourdomain.com/static/msredirect.html"),"."),(0,n.kt)("li",{parentName:"ol"},"Add Microsoft Graph delegated permissions, if this option is available: Calendars.Read, Calendars.ReadWrite, Calendars.Read.Shared, Calendars.ReadWrite.Shared."),(0,n.kt)("li",{parentName:"ol"},"Check ",(0,n.kt)("inlineCode",{parentName:"li"},"Allow Implicit Flow")," (and ",(0,n.kt)("inlineCode",{parentName:"li"},"Restrict token issuing to this app")," if available)."),(0,n.kt)("li",{parentName:"ol"},"Save the changes.")),(0,n.kt)("h2",{id:"creating-the-dropbox-app-for-dropbox-recording-integration"},"Creating the Dropbox app for Dropbox recording integration"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},"You need a Dropbox account (If you don't already have one, you can sign up for a free account ",(0,n.kt)("a",{parentName:"li",href:"https://www.dropbox.com/register"},"here"),".)"),(0,n.kt)("li",{parentName:"ol"},"Create new App as described in ",(0,n.kt)("a",{parentName:"li",href:"https://www.dropbox.com/developers/reference/getting-started?_tk=guides_lp&_ad=guides2&_camp=get_started#app%20console"},"Getting Started Guide")," in App Console section."),(0,n.kt)("li",{parentName:"ol"},"Choose",(0,n.kt)("ol",{parentName:"li"},(0,n.kt)("li",{parentName:"ol"},"'Dropbox API - For apps that need to access files in Dropbox.' "),(0,n.kt)("li",{parentName:"ol"},"'App folder\u2013 Access to a single folder created specifically for your app.'"),(0,n.kt)("li",{parentName:"ol"},"Fill in the name of your app"))),(0,n.kt)("li",{parentName:"ol"},"You need only, the newly created App key, goes in ",(0,n.kt)("inlineCode",{parentName:"li"},"/etc/jitsi/meet/yourdeployment.com-config.js")," in ",(0,n.kt)("pre",{parentName:"li"},(0,n.kt)("code",{parentName:"pre",className:'language-title="/etc/jitsi/meet/yourdeployment.com-config.js"'},"    dropbox: {\n        appKey: '__dropbox_app_key__',\n        redirectURI: 'https://yourdeployment.com/static/oauth.html'\n    }\n"))),(0,n.kt)("li",{parentName:"ol"},"Add your Dropbox Redirect URIs in the Dropbox form ",(0,n.kt)("inlineCode",{parentName:"li"},"https://yourdeployment.com/static/oauth.html")),(0,n.kt)("li",{parentName:"ol"},"Fill in Branding")))}m.isMDXComponent=!0}}]);