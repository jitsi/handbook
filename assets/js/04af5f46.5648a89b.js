"use strict";(self.webpackChunk_jitsi_handbook=self.webpackChunk_jitsi_handbook||[]).push([[7497],{4530:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>u,frontMatter:()=>s,metadata:()=>r,toc:()=>d});var o=i(4848),t=i(8453);const s={id:"secure-domain",title:"Secure Domain setup",sidebar_label:"Authentication (Secure Domain)"},a=void 0,r={id:"devops-guide/secure-domain",title:"Secure Domain setup",description:"It is possible to allow only authenticated users to create new conference",source:"@site/docs/devops-guide/secure-domain.md",sourceDirName:"devops-guide",slug:"/devops-guide/secure-domain",permalink:"/handbook/docs/devops-guide/secure-domain",draft:!1,unlisted:!1,editUrl:"https://github.com/jitsi/handbook/edit/master/docs/devops-guide/secure-domain.md",tags:[],version:"current",lastUpdatedAt:1739262203e3,frontMatter:{id:"secure-domain",title:"Secure Domain setup",sidebar_label:"Authentication (Secure Domain)"},sidebar:"docs",previous:{title:"Configuration",permalink:"/handbook/docs/category/configuration"},next:{title:"LDAP Authentication",permalink:"/handbook/docs/devops-guide/ldap-authentication"}},c={},d=[{value:"Prosody configuration",id:"prosody-configuration",level:2},{value:"Enable authentication",id:"enable-authentication",level:3},{value:"Enable anonymous login for guests",id:"enable-anonymous-login-for-guests",level:3},{value:"Jitsi Meet configuration",id:"jitsi-meet-configuration",level:2},{value:"Jicofo configuration",id:"jicofo-configuration",level:2},{value:"Create users in Prosody (internal auth)",id:"create-users-in-prosody-internal-auth",level:2},{value:"Optional: Jigasi configuration",id:"optional-jigasi-configuration",level:2},{value:"Enable Authentication",id:"enable-authentication-1",level:3},{value:"Debugging",id:"debugging",level:3}];function l(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...(0,t.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.p,{children:"It is possible to allow only authenticated users to create new conference\nrooms. Whenever a new room is about to be created, Jitsi Meet will prompt for\na user name and password. After the room is created, others will be able to join\nfrom anonymous domain. Here's what has to be configured:"}),"\n",(0,o.jsx)(n.h2,{id:"prosody-configuration",children:"Prosody configuration"}),"\n",(0,o.jsxs)(n.p,{children:["If you have installed Jitsi Meet from the Debian package, these changes should be made in ",(0,o.jsx)(n.code,{children:"/etc/prosody/conf.avail/[your-hostname].cfg.lua"})]}),"\n",(0,o.jsx)(n.h3,{id:"enable-authentication",children:"Enable authentication"}),"\n",(0,o.jsxs)(n.p,{children:["Inside the ",(0,o.jsx)(n.code,{children:'VirtualHost "[your-hostname]"'})," block, replace anonymous authentication with hashed password authentication:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:'VirtualHost "jitsi-meet.example.com"\n    authentication = "internal_hashed"\n'})}),"\n",(0,o.jsxs)(n.p,{children:["Replace ",(0,o.jsx)(n.code,{children:"jitsi-meet.example.com"})," with your hostname."]}),"\n",(0,o.jsx)(n.h3,{id:"enable-anonymous-login-for-guests",children:"Enable anonymous login for guests"}),"\n",(0,o.jsxs)(n.p,{children:["Add this block ",(0,o.jsx)(n.strong,{children:"after the previous VirtualHost"})," to enable the anonymous login method for guests:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:'VirtualHost "guest.jitsi-meet.example.com"\n    authentication = "anonymous"\n    c2s_require_encryption = false\n'})}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsxs)(n.em,{children:["Note that ",(0,o.jsx)(n.code,{children:"guest.jitsi-meet.example.com"})," is internal to Jitsi, and you do not need to (and should not) create a DNS record for it, or generate an SSL/TLS certificate, or do any web server configuration. While it is internal, you should still replace ",(0,o.jsx)(n.code,{children:"jitsi-meet.example.com"})," with your hostname."]})}),"\n",(0,o.jsx)(n.h2,{id:"jitsi-meet-configuration",children:"Jitsi Meet configuration"}),"\n",(0,o.jsxs)(n.p,{children:["In config.js, the ",(0,o.jsx)(n.code,{children:"anonymousdomain"})," options has to be set."]}),"\n",(0,o.jsxs)(n.p,{children:["If you have installed jitsi-meet from the Debian package, these changes should be made in ",(0,o.jsx)(n.code,{children:"/etc/jitsi/meet/[your-hostname]-config.js"}),"."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"var config = {\n    hosts: {\n            domain: 'jitsi-meet.example.com',\n            anonymousdomain: 'guest.jitsi-meet.example.com',\n            ...\n        },\n        ...\n}\n"})}),"\n",(0,o.jsx)(n.h2,{id:"jicofo-configuration",children:"Jicofo configuration"}),"\n",(0,o.jsxs)(n.p,{children:["When running Jicofo, specify your main domain in an additional configuration\nproperty. Jicofo will accept conference allocation requests only from the\nauthenticated domain. This should go as a new 'authentication' section in ",(0,o.jsx)(n.code,{children:"/etc/jitsi/jicofo/jicofo.conf"}),":"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"jicofo {\n  authentication: {\n    enabled: true\n    type: XMPP\n    login-url: jitsi-meet.example.com\n }\n ...\n"})}),"\n",(0,o.jsxs)(n.p,{children:["When using token based authentication, the type must use ",(0,o.jsx)(n.code,{children:"JWT"})," as the scheme instead:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"jicofo {\n  authentication: {\n    enabled: true\n    type: JWT\n    login-url: jitsi-meet.example.com\n }\n ...\n"})}),"\n",(0,o.jsx)(n.h2,{id:"create-users-in-prosody-internal-auth",children:"Create users in Prosody (internal auth)"}),"\n",(0,o.jsxs)(n.p,{children:["Finally, run ",(0,o.jsx)(n.code,{children:"prosodyctl"})," to create a user in Prosody:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"sudo prosodyctl register <username> jitsi-meet.example.com <password>\n"})}),"\n",(0,o.jsx)(n.p,{children:"and then restart prosody, jicofo and jitsi-videobridge2"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"systemctl restart prosody\nsystemctl restart jicofo\nsystemctl restart jitsi-videobridge2\n"})}),"\n",(0,o.jsxs)(n.admonition,{type:"note",children:[(0,o.jsxs)(n.p,{children:["Docker users may require an alternate config path.  Users of the official ",(0,o.jsx)(n.a,{href:"https://github.com/jitsi/docker-jitsi-meet",children:(0,o.jsx)(n.code,{children:"jitsi/prosody"})})," image should invoke ",(0,o.jsx)(n.code,{children:"prosodyctl"})," as follows."]}),(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"prosodyctl --config /config/prosody.cfg.lua register <username> meet.jitsi <password>\n"})}),(0,o.jsxs)(n.p,{children:["Full documentation for ",(0,o.jsx)(n.code,{children:"prosodyctl"})," can be found on ",(0,o.jsx)(n.a,{href:"https://prosody.im/doc/prosodyctl",children:"the official site"}),"."]})]}),"\n",(0,o.jsx)(n.h2,{id:"optional-jigasi-configuration",children:"Optional: Jigasi configuration"}),"\n",(0,o.jsx)(n.h3,{id:"enable-authentication-1",children:"Enable Authentication"}),"\n",(0,o.jsxs)(n.p,{children:["If you are using Jigasi, set it to authenticate by editing the following lines in ",(0,o.jsx)(n.code,{children:"/etc/jitsi/jigasi/sip-communicator.properties"}),":"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"org.jitsi.jigasi.xmpp.acc.USER_ID=SOME_USER@SOME_DOMAIN\norg.jitsi.jigasi.xmpp.acc.PASS=SOME_PASS\norg.jitsi.jigasi.xmpp.acc.ANONYMOUS_AUTH=false\n"})}),"\n",(0,o.jsx)(n.p,{children:"Note that the password is the actual plaintext password, not a base64 encoding."}),"\n",(0,o.jsx)(n.h3,{id:"debugging",children:"Debugging"}),"\n",(0,o.jsxs)(n.p,{children:["If you experience problems with a certificate chain, you may need to uncomment the following line, also in ",(0,o.jsx)(n.code,{children:"sip-communicator.properties"}),":"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"net.java.sip.communicator.service.gui.ALWAYS_TRUST_MODE_ENABLED=true\n"})}),"\n",(0,o.jsx)(n.admonition,{type:"note",children:(0,o.jsx)(n.p,{children:"This should only be used for testing/debugging purposes, or in controlled environments. If you confirm that this is the problem, you should then solve it in another way (e.g. get a signed certificate for Prosody, or add the particular certificate to Jigasi\u2019s trust store)."})})]})}function u(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>a,x:()=>r});var o=i(6540);const t={},s=o.createContext(t);function a(e){const n=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),o.createElement(s.Provider,{value:n},e.children)}}}]);