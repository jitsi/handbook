"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6437],{5680:(e,t,n)=>{n.d(t,{xA:()=>d,yg:()=>y});var r=n(6540);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},d=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),u=p(n),g=o,y=u["".concat(s,".").concat(g)]||u[g]||c[g]||i;return n?r.createElement(y,a(a({ref:t},d),{},{components:n})):r.createElement(y,a({ref:t},d))}));function y(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=g;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:o,a[1]=l;for(var p=2;p<i;p++)a[p]=n[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"},9707:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>s,default:()=>y,frontMatter:()=>l,metadata:()=>p,toc:()=>u});var r=n(8168),o=n(8587),i=(n(6540),n(5680)),a=["components"],l={id:"faq",title:"FAQ"},s=void 0,p={unversionedId:"devops-guide/faq",id:"devops-guide/faq",title:"FAQ",description:"How to migrate away from multiplexing and enable bridge websockets",source:"@site/docs/devops-guide/faq.md",sourceDirName:"devops-guide",slug:"/devops-guide/faq",permalink:"/handbook/docs/devops-guide/faq",draft:!1,editUrl:"https://github.com/jitsi/handbook/edit/master/docs/devops-guide/faq.md",tags:[],version:"current",lastUpdatedAt:1725272378,formattedLastUpdatedAt:"Sep 2, 2024",frontMatter:{id:"faq",title:"FAQ"},sidebar:"docs",previous:{title:"Video Tutorials",permalink:"/handbook/docs/devops-guide/devops-guide-videotutorials"}},d={},u=[{value:"How to migrate away from multiplexing and enable bridge websockets",id:"how-to-migrate-away-from-multiplexing-and-enable-bridge-websockets",level:2}],c={toc:u},g="wrapper";function y(e){var t=e.components,n=(0,o.A)(e,a);return(0,i.yg)(g,(0,r.A)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.yg)("h2",{id:"how-to-migrate-away-from-multiplexing-and-enable-bridge-websockets"},"How to migrate away from multiplexing and enable bridge websockets"),(0,i.yg)("p",null,"For a while, we were using nginx multiplexing to serve Jitsi Meet's content on https(port 443) and use the same port for running a turn server.\nThis proved to be problematic(you cannot use websockets with this setup) and we moved away from it.\nHere is how to remove multiplexing and enable websockets in favor of WebRTC Data Channels."),(0,i.yg)("ol",null,(0,i.yg)("li",{parentName:"ol"},"Dropping multiplexing in nginx")),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"delete ",(0,i.yg)("inlineCode",{parentName:"li"},"/etc/nginx/modules-enabled/60-jitsi-meet.conf")),(0,i.yg)("li",{parentName:"ul"},"Then go to ",(0,i.yg)("inlineCode",{parentName:"li"},"/etc/nginx/sites-available/your-conf")," and change your virtual host to listen on 443 instead of 4444.")),(0,i.yg)("ol",{start:2},(0,i.yg)("li",{parentName:"ol"},"Edit turnserver config")),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"make sure your turnserver is listening on standard port tls port ",(0,i.yg)("inlineCode",{parentName:"li"},"5349"),". Make sure in ",(0,i.yg)("inlineCode",{parentName:"li"},"/etc/turnserver.conf")," you have the following: ",(0,i.yg)("inlineCode",{parentName:"li"},"tls-listening-port=5349")),(0,i.yg)("li",{parentName:"ul"},"In ",(0,i.yg)("inlineCode",{parentName:"li"},"/etc/prosody/conf.avail/your-conf.cfg.lua")," prosody is instructed to announce ",(0,i.yg)("inlineCode",{parentName:"li"},"turns")," turn server on port ",(0,i.yg)("inlineCode",{parentName:"li"},"5349")," by having this line:\n",(0,i.yg)("inlineCode",{parentName:"li"},'{ type = "turns", host = "your-domain", port = "5349", transport = "tcp" }'),". Make sure you replace ",(0,i.yg)("inlineCode",{parentName:"li"},"your-domain")," with the DNS of your deployment.")),(0,i.yg)("ol",{start:3},(0,i.yg)("li",{parentName:"ol"},"Add the bridge websocket location in your nginx config (add it after the ",(0,i.yg)("inlineCode",{parentName:"li"},"location = /xmpp-websocket")," section):",(0,i.yg)("pre",{parentName:"li"},(0,i.yg)("code",{parentName:"pre"},'  # colibri (JVB) websockets for jvb1\n  location ~ ^/colibri-ws/default-id/(.*) {\n     proxy_pass http://127.0.0.1:9090/colibri-ws/default-id/$1$is_args$args;\n     proxy_http_version 1.1;\n     proxy_set_header Upgrade $http_upgrade;\n     proxy_set_header Connection "upgrade";\n     tcp_nodelay on;\n  }\n'))),(0,i.yg)("li",{parentName:"ol"},"Enable the websockets in Jitsi Videobridge. Make sure in ",(0,i.yg)("inlineCode",{parentName:"li"},"/etc/jitsi/videobridge/jvb.conf")," you have:",(0,i.yg)("pre",{parentName:"li"},(0,i.yg)("code",{parentName:"pre"},'videobridge {\n  http-servers {\n      public {\n          port = 9090\n      }\n  }\n  websockets {\n      enabled = true\n      domain = "your-domain:443"\n      tls = true\n  }\n}\n')),"  Make sure you replace ",(0,i.yg)("inlineCode",{parentName:"li"},"your-domain")," with the DNS of your deployment."),(0,i.yg)("li",{parentName:"ol"},"After restarting the bridge (",(0,i.yg)("inlineCode",{parentName:"li"},"systemctl restart jitsi-videobridge2"),") and nginx (",(0,i.yg)("inlineCode",{parentName:"li"},"systemctl restart nginx"),") you are good to go!")))}y.isMDXComponent=!0}}]);