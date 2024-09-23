"use strict";(self.webpackChunk_jitsi_handbook=self.webpackChunk_jitsi_handbook||[]).push([[2703],{6356:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>o,default:()=>u,frontMatter:()=>r,metadata:()=>a,toc:()=>c});var i=s(4848),t=s(8453);const r={id:"devops-guide-requirements",title:"Requirements"},o="Jitsi Meet needs, by order of importance",a={id:"devops-guide/devops-guide-requirements",title:"Requirements",description:"Jitsi Meet is a real-time system.",source:"@site/docs/devops-guide/requirements.md",sourceDirName:"devops-guide",slug:"/devops-guide/devops-guide-requirements",permalink:"/handbook/docs/devops-guide/devops-guide-requirements",draft:!1,unlisted:!1,editUrl:"https://github.com/jitsi/handbook/edit/master/docs/devops-guide/requirements.md",tags:[],version:"current",lastUpdatedAt:1727086824e3,frontMatter:{id:"devops-guide-requirements",title:"Requirements"},sidebar:"docs",previous:{title:"Deployment",permalink:"/handbook/docs/category/deployment"},next:{title:"Debian/Ubuntu server",permalink:"/handbook/docs/devops-guide/devops-guide-quickstart"}},d={},c=[];function l(e){const n={admonition:"admonition",code:"code",h1:"h1",header:"header",li:"li",p:"p",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(n.admonition,{type:"note",children:[(0,i.jsx)(n.p,{children:"Jitsi Meet is a real-time system.\nRequirements are very different from a web server and depend on many factors.\nMiscalculations can very easily destroy basic functionality rather than cause slow performance.\nAvoid adding other functions to your Jitsi Meet setup as it can harm performance and complicate optimizations."}),(0,i.jsx)(n.p,{children:"Note that Jitsi Meet design priorizes scalability by adding servers on using a huge server. Check Jitsi-videobridge documentation on adding several bridges to a Jitsi Meet server, and OCTO to go even beyond that (federation of Jitsi Meet servers). If you feel that you are a network and server administration newbie, don't even think of going there."})]}),"\n",(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"jitsi-meet-needs-by-order-of-importance",children:"Jitsi Meet needs, by order of importance"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Network link: basic speed and reliability are essential. Check speed against the provider claims using any download tool (or ftp), and\nverify latency using a tool such as iperf3.\nExact calculation is very complex and depend on many optimisations and tricks, but you should at least remember these numbers on resolution:\n180 = 200 kbits/s\n360 = 500 kbits/s\n720 (HD) = 2500 kbits/s\n4k = 10 Mbits/s\nSo don't expect to have 20 users using 4K on a server with 100Mbits/s upload and download.\nFor a friends/small organization server, 1 Gbits/s will often be enough but for a serious server 10 Gbits/s\nis advisable. Several (or many...) bridges having each a 10 Gbits/s link are used by big deployments."}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"These requirements concern the videobridge. If there are only external videobridges (as can be the case on high end Jitsi Meet servers), network performance matters much less."})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"RAM:"})," it's usually suggested to get 8 GB.\nFor small meetings you can get away with 4 GB, for test servers or very small meetings you can try to use 2 GB.\nFor big meetings it's suggested to go the scalable way over getting huge amounts of memory."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"CPU:"})," very low processor performance can seriously harm a real time system, especially when using a shared server (where your CPU performance can be stolen by other customers of your hoster, check on 'dedicated CPU' if you are getting a VPS, rather than a physical server). However, a consideration is that a Jitsi Meet component, Prosody, can only use ONE (1) core. So getting a lot of cores, let's say more than 32, is not always useful. For a basic server, 4 dedicated cores can be enough."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Disk:"})," unless you are doing heavy logging or have very specific needs, you can get away with 20 Gbytes of standard hard disk.\nSSD are more a nice to have than a necessity."]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"If you want additional services, requirements can go up."})}),"\n",(0,i.jsx)(n.h1,{id:"recording",children:"Recording"}),"\n",(0,i.jsx)(n.p,{children:"Jibri needs ONE system per recording.\nOne Jibri instance = one meeting. For 5 meetings recorded simultaneously, you need 5 Jibris.\nThere is no workaround to that.\nIf you are knowledgeable, you can setup Jibris in containers and use a big server to save a bit on resources but that's about it."}),"\n",(0,i.jsxs)(n.p,{children:["Jibri RAM, CPU and hard disk needs are far higher than Jitsi Meet itself, as it does video encoding.\nFor ",(0,i.jsx)(n.code,{children:"1080x720"})," you currently need at least 8 GB RAM, for ",(0,i.jsx)(n.code,{children:"1280x1024"})," 12 GB (this is for recording a ",(0,i.jsx)(n.strong,{children:"single"}),"  meeting).\nFor cloud storage you will need at least SSD drives.\nIf memory is not sufficient, CPU can't encode fast enough or hard disk is not fast enough, recordings will fail."]}),"\n",(0,i.jsx)(n.p,{children:"While Jibri and Jitsi Meet can technically be hosted in a single server, it's not recommended because Jibri is a resource drain and it can harm Jitsi Meet performance, and can exhaust disk space and stop Jitsi Meet function altogether."})]})}function u(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>o,x:()=>a});var i=s(6540);const t={},r=i.createContext(t);function o(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);