"use strict";(self.webpackChunk_jitsi_handbook=self.webpackChunk_jitsi_handbook||[]).push([[1830],{4903:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>a,contentTitle:()=>l,default:()=>h,frontMatter:()=>o,metadata:()=>d,toc:()=>r});var t=n(4848),s=n(8453);const o={id:"devops-guide-scalable",title:"DevOps Guide (scalable setup)",sidebar_label:"Scalable setup"},l=void 0,d={id:"devops-guide/devops-guide-scalable",title:"DevOps Guide (scalable setup)",description:"A single server Jitsi installation is good for a limited size of concurrent conferences.",source:"@site/docs/devops-guide/scalable.md",sourceDirName:"devops-guide",slug:"/devops-guide/devops-guide-scalable",permalink:"/handbook/docs/devops-guide/devops-guide-scalable",draft:!1,unlisted:!1,editUrl:"https://github.com/jitsi/handbook/edit/master/docs/devops-guide/scalable.md",tags:[],version:"current",lastUpdatedAt:1727086824e3,frontMatter:{id:"devops-guide-scalable",title:"DevOps Guide (scalable setup)",sidebar_label:"Scalable setup"},sidebar:"docs",previous:{title:"LDAP Authentication",permalink:"/handbook/docs/devops-guide/ldap-authentication"},next:{title:"Reservation System",permalink:"/handbook/docs/devops-guide/reservation"}},a={},r=[{value:"Architecture (Single Jitsi-Meet, multiple videobridges)",id:"architecture-single-jitsi-meet-multiple-videobridges",level:2},{value:"Machine Sizing",id:"machine-sizing",level:2},{value:"Installation of Jitsi-Meet",id:"installation-of-jitsi-meet",level:3},{value:"Installation of Videobridge(s)",id:"installation-of-videobridges",level:3},{value:"Configuration of jitsi-meet",id:"configuration-of-jitsi-meet",level:3},{value:"Firewall",id:"firewall",level:4},{value:"NGINX",id:"nginx",level:4},{value:"Jitsi-Meet",id:"jitsi-meet",level:4},{value:"Jicofo",id:"jicofo",level:4},{value:"Configuration of the Videobridge",id:"configuration-of-the-videobridge",level:3},{value:"Firewall",id:"firewall-1",level:4},{value:"jitsi-videobridge2",id:"jitsi-videobridge2",level:4},{value:"Testing",id:"testing",level:2}];function c(e){const i={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.p,{children:"A single server Jitsi installation is good for a limited size of concurrent conferences.\nThe first limiting factor is the videobridge component, that handles the actual video and audio traffic.\nIt is easy to scale the video bridges horizontally by adding as many as needed.\nIn a cloud based environment, additionally the bridges can be scaled up or down as needed."}),"\n",(0,t.jsx)(i.admonition,{type:"warning",children:(0,t.jsxs)(i.p,{children:["The ",(0,t.jsx)(i.a,{href:"https://www.youtube.com/watch?v=LyGV4uW8km8",children:"Youtube Tutorial on Scaling"})," is outdated and describes an old configuration method.\nThe current default Jitsi Meet install is already configured for horizontal scalability."]})}),"\n",(0,t.jsx)(i.admonition,{type:"note",children:(0,t.jsx)(i.p,{children:"Building a scalable infrastructure is not a task for beginning Jitsi Administrators.\nThe instructions assume that you have installed a single node version successfully, and that\nyou are comfortable installing, configuring and debugging Linux software.\nThis is not a step-by-step guide, but will show you, which packages to install and which\nconfigurations to change.\nIt is highly recommended to use configuration management tools like Ansible or Puppet to manage the\ninstallation and configuration."})}),"\n",(0,t.jsx)(i.h2,{id:"architecture-single-jitsi-meet-multiple-videobridges",children:"Architecture (Single Jitsi-Meet, multiple videobridges)"}),"\n",(0,t.jsx)(i.p,{children:"A first step is to split the functions of the central jitsi-meet instance (with nginx, prosody and jicofo) and\nvideobridges."}),"\n",(0,t.jsx)(i.p,{children:"A simplified diagram (with open network ports) of an installation with one Jitsi-Meet instance and three\nvideobridges that are load balanced looks as follows. Each box is a server/VM."}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{children:"               +                                       +\n               |                                       |\n               |                                       |\n               v                                       v\n          80, 443 TCP                          443 TCP, 10000 UDP\n       +--------------+                     +---------------------+\n       |  nginx       |  5222 TCP           |                     |\n       |  Jitsi Meet  |<-------------------+|  jitsi-videobridge  |\n       |  prosody     |         |           |                     |\n       |  jicofo      |         |           +---------------------+\n       +--------------+         |\n                                |           +---------------------+\n                                |           |                     |\n                                +----------+|  jitsi-videobridge  |\n                                |           |                     |\n                                |           +---------------------+\n                                |\n                                |           +---------------------+\n                                |           |                     |\n                                +----------+|  jitsi-videobridge  |\n                                            |                     |\n                                            +---------------------+\n"})}),"\n",(0,t.jsx)(i.h2,{id:"machine-sizing",children:"Machine Sizing"}),"\n",(0,t.jsx)(i.p,{children:"The Jitsi-Meet server will generally not have that much load (unless you have many) conferences\ngoing at the same time. A 4 CPU, 8 GB machine will probably be fine."}),"\n",(0,t.jsx)(i.p,{children:"The videobridges will have more load. 4 or 8 CPU with 8 GB RAM seems to be a good configuration."}),"\n",(0,t.jsx)(i.h3,{id:"installation-of-jitsi-meet",children:"Installation of Jitsi-Meet"}),"\n",(0,t.jsxs)(i.p,{children:["Assuming that the installation will run under the following FQDN: ",(0,t.jsx)(i.code,{children:"meet.example.com"})," and you have\nSSL cert and key in ",(0,t.jsx)(i.code,{children:"/etc/ssl/meet.example.com.{crt,key}"})]}),"\n",(0,t.jsxs)(i.p,{children:["Set the following DebConf variables prior to installing the packages.\n(We are not installing the ",(0,t.jsx)(i.code,{children:"jitsi-meet"})," package which would handle that for us)"]}),"\n",(0,t.jsxs)(i.p,{children:["Install the ",(0,t.jsx)(i.code,{children:"debconf-utils"})," package"]}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{children:"$ cat << EOF | sudo debconf-set-selections\njitsi-videobridge\tjitsi-videobridge/jvb-hostname\tstring\tmeet.example.com\njitsi-meet\tjitsi-meet/jvb-serve\tboolean\tfalse\njitsi-meet-prosody\tjitsi-videobridge/jvb-hostname\tstring\tmeet.example.com\njitsi-meet-web-config\tjitsi-meet/cert-choice\tselect\tI want to use my own certificate\njitsi-meet-web-config\tjitsi-meet/cert-path-crt\tstring\t/etc/ssl/meet.example.com.crt\njitsi-meet-web-config\tjitsi-meet/cert-path-key\tstring\t/etc/ssl/meet.example.com.key\njitsi-meet-web-config\tjitsi-meet/jaas-choice\tboolean\tfalse\nEOF\n"})}),"\n",(0,t.jsxs)(i.p,{children:["To enable integration with ",(0,t.jsx)(i.a,{href:"https://jaas.8x8.vc/#/components",children:"Jitsi Meet Components"})," for telephony support, set\nthe ",(0,t.jsx)(i.code,{children:"jitsi-meet/jaas-choice"})," option above to ",(0,t.jsx)(i.code,{children:"true"}),"."]}),"\n",(0,t.jsx)(i.p,{children:"On the jitsi-meet server, install the following packages:"}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsx)(i.li,{children:(0,t.jsx)(i.code,{children:"nginx"})}),"\n",(0,t.jsx)(i.li,{children:(0,t.jsx)(i.code,{children:"prosody"})}),"\n",(0,t.jsx)(i.li,{children:(0,t.jsx)(i.code,{children:"jicofo"})}),"\n",(0,t.jsx)(i.li,{children:(0,t.jsx)(i.code,{children:"jitsi-meet-web"})}),"\n",(0,t.jsx)(i.li,{children:(0,t.jsx)(i.code,{children:"jitsi-meet-prosody"})}),"\n",(0,t.jsx)(i.li,{children:(0,t.jsx)(i.code,{children:"jitsi-meet-web-config"})}),"\n"]}),"\n",(0,t.jsx)(i.h3,{id:"installation-of-videobridges",children:"Installation of Videobridge(s)"}),"\n",(0,t.jsxs)(i.p,{children:["For simplicities sake, set the same ",(0,t.jsx)(i.code,{children:"debconf"})," variables as above and install"]}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsx)(i.li,{children:(0,t.jsx)(i.code,{children:"jitsi-videobridge2"})}),"\n"]}),"\n",(0,t.jsx)(i.h3,{id:"configuration-of-jitsi-meet",children:"Configuration of jitsi-meet"}),"\n",(0,t.jsx)(i.h4,{id:"firewall",children:"Firewall"}),"\n",(0,t.jsx)(i.p,{children:"Open the following ports:"}),"\n",(0,t.jsx)(i.p,{children:"Open to world:"}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsx)(i.li,{children:"80 TCP"}),"\n",(0,t.jsx)(i.li,{children:"443 TCP"}),"\n"]}),"\n",(0,t.jsx)(i.p,{children:"Open to the videobridges only"}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsx)(i.li,{children:"5222 TCP (for Prosody)"}),"\n"]}),"\n",(0,t.jsx)(i.h4,{id:"nginx",children:"NGINX"}),"\n",(0,t.jsxs)(i.p,{children:["Create the ",(0,t.jsx)(i.code,{children:"/etc/nginx/sites-available/meet.example.com.conf"})," as usual"]}),"\n",(0,t.jsx)(i.h4,{id:"jitsi-meet",children:"Jitsi-Meet"}),"\n",(0,t.jsxs)(i.p,{children:["Adapt ",(0,t.jsx)(i.code,{children:"/usr/share/jitsi-meet/config.js"})," and ",(0,t.jsx)(i.code,{children:"/usr/share/jitsi-meet/interface-config.js"})," to your specific needs"]}),"\n",(0,t.jsx)(i.h4,{id:"jicofo",children:"Jicofo"}),"\n",(0,t.jsx)(i.p,{children:"No changes necessary from the default install."}),"\n",(0,t.jsx)(i.h3,{id:"configuration-of-the-videobridge",children:"Configuration of the Videobridge"}),"\n",(0,t.jsx)(i.h4,{id:"firewall-1",children:"Firewall"}),"\n",(0,t.jsx)(i.p,{children:"Open the following ports:"}),"\n",(0,t.jsx)(i.p,{children:"Open to world:"}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsx)(i.li,{children:"10000 UDP (for media)"}),"\n"]}),"\n",(0,t.jsx)(i.h4,{id:"jitsi-videobridge2",children:"jitsi-videobridge2"}),"\n",(0,t.jsx)(i.p,{children:"No changes necessary from the default setup."}),"\n",(0,t.jsx)(i.h2,{id:"testing",children:"Testing"}),"\n",(0,t.jsxs)(i.p,{children:["After restarting all services (",(0,t.jsx)(i.code,{children:"prosody"}),", ",(0,t.jsx)(i.code,{children:"jicofo"})," and all the ",(0,t.jsx)(i.code,{children:"jitsi-videobridge2"}),") you can see in\n",(0,t.jsx)(i.code,{children:"/var/log/prosody/prosody.log"})," and\n",(0,t.jsx)(i.code,{children:"/var/log/jitsi/jicofo.log"})," that the videobridges connect to Prososy and that Jicofo picks them up."]}),"\n",(0,t.jsx)(i.p,{children:"When a new conference starts, Jicofo picks a videobridge and schedules the conference on it."})]})}function h(e={}){const{wrapper:i}={...(0,s.R)(),...e.components};return i?(0,t.jsx)(i,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},8453:(e,i,n)=>{n.d(i,{R:()=>l,x:()=>d});var t=n(6540);const s={},o=t.createContext(s);function l(e){const i=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function d(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),t.createElement(o.Provider,{value:i},e.children)}}}]);