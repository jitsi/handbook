"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4227],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>m});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},d=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),c=p(n),m=o,f=c["".concat(s,".").concat(m)]||c[m]||u[m]||i;return n?r.createElement(f,a(a({ref:t},d),{},{components:n})):r.createElement(f,a({ref:t},d))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=c;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,a[1]=l;for(var p=2;p<i;p++)a[p]=n[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},5269:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>s,default:()=>m,frontMatter:()=>l,metadata:()=>p,toc:()=>u});var r=n(7462),o=n(3366),i=(n(7294),n(3905)),a=["components"],l={id:"faq",title:"FAQ"},s=void 0,p={unversionedId:"devops-guide/faq",id:"devops-guide/faq",title:"FAQ",description:"How to migrate away from multiplexing and enable bridge websockets",source:"@site/docs/devops-guide/faq.md",sourceDirName:"devops-guide",slug:"/devops-guide/faq",permalink:"/handbook/docs/devops-guide/faq",editUrl:"https://github.com/jitsi/handbook/edit/master/website/docs/devops-guide/faq.md",tags:[],version:"current",lastUpdatedBy:"gpatel-fr",lastUpdatedAt:1647088160,formattedLastUpdatedAt:"3/12/2022",frontMatter:{id:"faq",title:"FAQ"},sidebar:"docs",previous:{title:"Video Tutorials",permalink:"/handbook/docs/devops-guide/devops-guide-videotutorials"}},d={},u=[{value:"How to migrate away from multiplexing and enable bridge websockets",id:"how-to-migrate-away-from-multiplexing-and-enable-bridge-websockets",level:2}],c={toc:u};function m(e){var t=e.components,n=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"how-to-migrate-away-from-multiplexing-and-enable-bridge-websockets"},"How to migrate away from multiplexing and enable bridge websockets"),(0,i.kt)("p",null,"For a while, we were using nginx multiplexing to serve jitsi-meet content on https(port 443) and use the same port for running a turn server.\nThis proved to be problematic(you cannot use websockets with this setup) and we moved away from it.\nHere is how to remove multiplexing and enable websockets in favor of WebRTC Data Channels."),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Dropping multiplexing in nginx")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"delete ",(0,i.kt)("inlineCode",{parentName:"li"},"/etc/nginx/modules-enabled/60-jitsi-meet.conf")),(0,i.kt)("li",{parentName:"ul"},"Then go to ",(0,i.kt)("inlineCode",{parentName:"li"},"/etc/nginx/site-available/your-conf")," and change your virtual host to listen on 443 instead of 4444.")),(0,i.kt)("ol",{start:2},(0,i.kt)("li",{parentName:"ol"},"Edit turnserver config")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"make sure your turnserver is listening on standard port tls port ",(0,i.kt)("inlineCode",{parentName:"li"},"5349"),". Make sure in ",(0,i.kt)("inlineCode",{parentName:"li"},"/etc/turnserver.conf")," you have the following: ",(0,i.kt)("inlineCode",{parentName:"li"},"tls-listening-port=5349")),(0,i.kt)("li",{parentName:"ul"},"In ",(0,i.kt)("inlineCode",{parentName:"li"},"/etc/prosody/conf.avail/your-conf.cfg.lua")," prosody is instructed to announce ",(0,i.kt)("inlineCode",{parentName:"li"},"turns")," turn server on port ",(0,i.kt)("inlineCode",{parentName:"li"},"5349")," by having this line:\n",(0,i.kt)("inlineCode",{parentName:"li"},'{ type = "turns", host = "your-domain", port = "5349", transport = "tcp" }'),". Make sure you replace ",(0,i.kt)("inlineCode",{parentName:"li"},"your-domain")," with the DNS of your deployment.")),(0,i.kt)("ol",{start:3},(0,i.kt)("li",{parentName:"ol"},"Add the bridge websocket location in your nginx config (add it after the ",(0,i.kt)("inlineCode",{parentName:"li"},"location = /xmpp-websocket")," section):",(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre"},'  # colibri (JVB) websockets for jvb1\n  location ~ ^/colibri-ws/default-id/(.*) {\n     proxy_pass http://127.0.0.1:9090/colibri-ws/default-id/$1$is_args$args;\n     proxy_http_version 1.1;\n     proxy_set_header Upgrade $http_upgrade;\n     proxy_set_header Connection "upgrade";\n     tcp_nodelay on;\n  }\n'))),(0,i.kt)("li",{parentName:"ol"},"Enable the websockets in Jitsi Videobridge. Make sure in ",(0,i.kt)("inlineCode",{parentName:"li"},"/etc/jitsi/videobridge/jvb.conf")," you have:",(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre"},'videobridge {\n  http-servers {\n      public {\n          port = 9090\n      }\n  }\n  websockets {\n      enabled = true\n      domain = "your-domain:443"\n      tls = true\n  }\n}\n')),"  Make sure you replace ",(0,i.kt)("inlineCode",{parentName:"li"},"your-domain")," with the DNS of your deployment."),(0,i.kt)("li",{parentName:"ol"},"After restarting the bridge (",(0,i.kt)("inlineCode",{parentName:"li"},"systemctl restart jitsi-videobridge2"),") and nginx (",(0,i.kt)("inlineCode",{parentName:"li"},"systemctl restart nginx"),") you are good to go!")))}m.isMDXComponent=!0}}]);