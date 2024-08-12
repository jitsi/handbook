"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2556],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>m});var i=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},o=Object.keys(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=i.createContext({}),p=function(e){var t=i.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},d=function(e){var t=p(e.components);return i.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},c=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),c=p(n),m=a,k=c["".concat(s,".").concat(m)]||c[m]||u[m]||o;return n?i.createElement(k,r(r({ref:t},d),{},{components:n})):i.createElement(k,r({ref:t},d))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,r=new Array(o);r[0]=c;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,r[1]=l;for(var p=2;p<o;p++)r[p]=n[p];return i.createElement.apply(null,r)}return i.createElement.apply(null,n)}c.displayName="MDXCreateElement"},4943:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>s,default:()=>m,frontMatter:()=>l,metadata:()=>p,toc:()=>u});var i=n(7462),a=n(3366),o=(n(7294),n(3905)),r=["components"],l={id:"devops-guide-opensuse",title:"Self-Hosting Guide - openSUSE",sidebar_label:"openSUSE"},s=void 0,p={unversionedId:"devops-guide/devops-guide-opensuse",id:"devops-guide/devops-guide-opensuse",title:"Self-Hosting Guide - openSUSE",description:"This document describes the steps for a quick Jitsi-Meet installation, paired",source:"@site/docs/devops-guide/opensuse.md",sourceDirName:"devops-guide",slug:"/devops-guide/devops-guide-opensuse",permalink:"/handbook/docs/devops-guide/devops-guide-opensuse",draft:!1,editUrl:"https://github.com/jitsi/handbook/edit/master/docs/devops-guide/opensuse.md",tags:[],version:"current",lastUpdatedAt:1723463252,formattedLastUpdatedAt:"Aug 12, 2024",frontMatter:{id:"devops-guide-opensuse",title:"Self-Hosting Guide - openSUSE",sidebar_label:"openSUSE"},sidebar:"docs",previous:{title:"Debian/Ubuntu server",permalink:"/handbook/docs/devops-guide/devops-guide-quickstart"},next:{title:"Docker",permalink:"/handbook/docs/devops-guide/devops-guide-docker"}},d={},u=[{value:"Installation",id:"installation",level:2},{value:"optional Add-Ons",id:"optional-add-ons",level:3},{value:"Configuration",id:"configuration",level:2},{value:"Prosody",id:"prosody",level:3},{value:"Nginx",id:"nginx",level:3},{value:"Jitsi-Meet",id:"jitsi-meet",level:3},{value:"Jitsi-Videobridge",id:"jitsi-videobridge",level:3},{value:"Jitsi-Jicofo",id:"jitsi-jicofo",level:3},{value:"Add-On: Jitsi-Jibri",id:"add-on-jitsi-jibri",level:2},{value:"Add-On: Jitsi-Jigasi",id:"add-on-jitsi-jigasi",level:2},{value:"Services",id:"services",level:2},{value:"Final notes",id:"final-notes",level:2}],c={toc:u};function m(e){var t=e.components,n=(0,a.Z)(e,r);return(0,o.kt)("wrapper",(0,i.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"This document describes the steps for a quick Jitsi-Meet installation, paired\nwith a single Videobridge and a single Jicofo on openSUSE Leap 15.2."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Note"),": Many of the installation steps require root access."),(0,o.kt)("h2",{id:"installation"},"Installation"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Add the OBS repository:",(0,o.kt)("br",{parentName:"li"}),(0,o.kt)("strong",{parentName:"li"},"Note:")," When Jitsi-Meet is merged into openSUSE Factory, this will be obsolete.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"zypper addrepo https://download.opensuse.org/repositories/home:/SchoolGuy:/jitsi/openSUSE_Leap_15.2/home:SchoolGuy:jitsi.repo\n")),(0,o.kt)("ol",{start:2},(0,o.kt)("li",{parentName:"ol"},"Refresh the repositories:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"zypper refresh\n")),(0,o.kt)("ol",{start:3},(0,o.kt)("li",{parentName:"ol"},"Install Jitsi-Meet and its dependencies:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"zypper install nginx prosody lua51-zlib jitsi-meet jitsi-videobridge jitsi-jicofo\n")),(0,o.kt)("h3",{id:"optional-add-ons"},"optional Add-Ons"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Install the Jibri Add-On: ",(0,o.kt)("inlineCode",{parentName:"li"},"zypper install jitsi-jibri")),(0,o.kt)("li",{parentName:"ul"},"Install the Jigasi Add-On: ",(0,o.kt)("inlineCode",{parentName:"li"},"zypper install jitsi-jigasi"))),(0,o.kt)("h2",{id:"configuration"},"Configuration"),(0,o.kt)("p",null,"The following sections describe how to configure the different packages.",(0,o.kt)("br",{parentName:"p"}),"\n","Replace ",(0,o.kt)("inlineCode",{parentName:"p"},"<FQDN>")," with your domain name and ",(0,o.kt)("inlineCode",{parentName:"p"},"YOURSECRET3")," with a strong password."),(0,o.kt)("h3",{id:"prosody"},"Prosody"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Open and adjust the Prosody configuration file under ",(0,o.kt)("inlineCode",{parentName:"li"},"/etc/prosody/prosody.cfg.lua"),":")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-lua"},'---------- Server-wide settings ----------\nadmins = { "focus@auth.<FQDN>" }\ncross_domain_bosh = true;\nmodules_enabled = {\n        -- HTTP modules\n                "bosh"; -- Enable BOSH clients, aka "Jabber over HTTP"\n        -- jitsi\n                "smacks";\n                "mam";\n                "lastactivity";\n                "offline";\n                "pubsub";\n                "adhoc";\n                "websocket";\n                "http_altconnect";\n                "compression";\n}\n')),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Create a new configuration file named ",(0,o.kt)("inlineCode",{parentName:"li"},"<FQDN>.cfg.lua")," in ",(0,o.kt)("inlineCode",{parentName:"li"},"/etc/prosody/conf.avail/"),"\nwith the following content:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-lua",metastring:'title="/etc/prosody/conf.avail/meet.example.org.cfg.lua"',title:'"/etc/prosody/conf.avail/meet.example.org.cfg.lua"'},'plugin_paths = { "/usr/share/jitsi-meet/prosody-plugins/" }\n\n-- As per https://prosody.im/doc/setting_up_bosh#proxying_requests\nconsider_bosh_secure = true\n\n-- domain mapper options, must at least have domain base set to use the mapper\nmuc_mapper_domain_base = "<FQDN>";\n\nturncredentials_secret = "YOURSECRET3";\n\nturncredentials = {\n  { type = "stun", host = "<FQDN>", port = "3478" },\n  { type = "turn", host = "<FQDN>", port = "3478", transport = "udp" },\n  --  { type = "turns", host = "<FQDN>", port = "443", transport = "tcp" }\n};\n\nVirtualHost "<FQDN>"\n    authentication = "anonymous"\n    ssl = {\n        key = "/var/lib/prosody/<FQDN>.key";\n        certificate = "/var/lib/prosody/<FQDN>.crt";\n    }\n    speakerstats_component = "speakerstats.<FQDN>"\n    conference_duration_component = "conferenceduration.<FQDN>"\n    modules_enabled = {\n        "bosh";\n        "pubsub";\n        "speakerstats";\n        "turncredentials";\n        "conference_duration";\n    }\n    c2s_require_encryption = false\n\nComponent "conference.<FQDN>" "muc"\n    modules_enabled = {\n        "muc_meeting_id";\n        "muc_domain_mapper";\n    }\n    admins = { "focus@auth.<FQDN>" }\n    muc_room_locking = false\n    muc_room_default_public_jids = true\n\n-- internal muc component\nComponent "internal.auth.<FQDN>" "muc"\n    modules_enabled = {\n      "ping";\n    }\n    admins = { "focus@auth.<FQDN>" }\n    muc_room_locking = false\n    muc_room_default_public_jids = true\n    muc_room_cache_size = 1000\n\nComponent "jitsi-videobridge.<FQDN>"\n    component_secret = "YOURSECRET3"\n\nVirtualHost "auth.<FQDN>"\n    ssl = {\n        key = "/var/lib/prosody/auth.<FQDN>.key";\n        certificate = "/var/lib/prosody/auth.<FQDN>.crt";\n    }\n    authentication = "internal_plain"\n\nComponent "focus.<FQDN>"\n    component_secret = "YOURSECRET3"\n\nComponent "speakerstats.<FQDN>" "speakerstats_component"\n    muc_component = "conference.<FQDN>"\n\nComponent "conferenceduration.<FQDN>" "conference_duration_component"\n    muc_component = "conference.<FQDN>"\n')),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Create a symlink for the configuration:",(0,o.kt)("br",{parentName:"p"}),"\n",(0,o.kt)("inlineCode",{parentName:"p"},"ln --symbolic /etc/prosody/conf.avail/<FQDN>.cfg.lua /etc/prosody/conf.d/<FQDN>.cfg.lua"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Create the certificates via ",(0,o.kt)("inlineCode",{parentName:"p"},"prosodyctl cert generate <DOMAIN>"),".",(0,o.kt)("br",{parentName:"p"}),"\n","The value ",(0,o.kt)("inlineCode",{parentName:"p"},"<DOMAIN>")," represents the following URLs."),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"* `auth.<FQDN>`\n* `conference.<FQDN>`\n* `conferenceduration.<FQDN>`\n* `internal.auth.<FQDN>`\n* `FQDN`\n* `focus.<FQDN>`\n* `jitsi-videobridge.<FQDN>`\n* `callcontrol.<FQDN>` __Note:__ This is only needed if you deploy Jigasi\n* `recorder.<FQDN>` __Note:__ This is only needed if you deploy Jibri\n"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"/var/lib/prosody/"),": Symlink all generated ",(0,o.kt)("inlineCode",{parentName:"p"},"*.crt")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"*.key")," files to ",(0,o.kt)("inlineCode",{parentName:"p"},"/etc/prosody/certs/"),".  "))),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"Please do not link other certificates.")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Add the certificates to the system keystore:",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"ln --symbolic --force /var/lib/prosody/auth.<FQDN>.crt /usr/local/share/ca-certificates/auth.<FQDN>.crt")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"update-ca-certificates --fresh")))),(0,o.kt)("li",{parentName:"ul"},"Create conference focus user: ",(0,o.kt)("inlineCode",{parentName:"li"},"prosodyctl register focus auth.<FQDN> YOURSECRET3"))),(0,o.kt)("h3",{id:"nginx"},"Nginx"),(0,o.kt)("p",null,"Edit the file ",(0,o.kt)("inlineCode",{parentName:"p"},"jitsi-meet.conf")," in ",(0,o.kt)("inlineCode",{parentName:"p"},"/etc/nginx/vhosts.d/")," (which was installed\nalong with ",(0,o.kt)("inlineCode",{parentName:"p"},"jitsi-meet"),") and do the following:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Check the ",(0,o.kt)("inlineCode",{parentName:"li"},"server_name")," value."),(0,o.kt)("li",{parentName:"ul"},"Check the TLS certificates (Let's Encrypt for production use, Prosody for testing, for example).")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Note:")," If you are using an existing server, please make sure to adjust the websocket and bosh part, too."),(0,o.kt)("h3",{id:"jitsi-meet"},"Jitsi-Meet"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Go to ",(0,o.kt)("inlineCode",{parentName:"li"},"/srv/jitsi-meet")," and edit ",(0,o.kt)("inlineCode",{parentName:"li"},"config.js"),":")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="/srv/jitsi-meet/config.js"',title:'"/srv/jitsi-meet/config.js"'},"var config = {\n    hosts: {\n        domain: '<FQDN>',\n        muc: 'conference.<FQDN>',\n        bridge: 'jitsi-videobridge.<FQDN>',\n        focus: 'focus.<FQDN>'\n    },\n    useNicks: false,\n    bosh: '//<FQDN>/http-bind',\n};\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Note:")," Please be aware that this is the minimal configuration."),(0,o.kt)("h3",{id:"jitsi-videobridge"},"Jitsi-Videobridge"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Note:")," We use a combination of the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/jitsi/jitsi-videobridge/blob/master/doc/muc.md#videobridge-configuration"},"new Videobridge configuration"),"\nand the legacy one with the ",(0,o.kt)("inlineCode",{parentName:"p"},"sip-communicator.properties")," file. We have\nto do this because of the ",(0,o.kt)("inlineCode",{parentName:"p"},"STATISTICS_TRANSPORT")," property."),(0,o.kt)("p",null,"If we remove ",(0,o.kt)("inlineCode",{parentName:"p"},"org.jitsi.videobridge.STATISTICS_TRANSPORT=muc,colibri"),"\nfrom ",(0,o.kt)("inlineCode",{parentName:"p"},"sip-communicator.properties"),", the videobridge will not work!"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Go to the directory ",(0,o.kt)("inlineCode",{parentName:"li"},"/etc/jitsi/videobridge")),(0,o.kt)("li",{parentName:"ul"},"Edit the file ",(0,o.kt)("inlineCode",{parentName:"li"},"jitsi-videobridge.conf"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Set ",(0,o.kt)("inlineCode",{parentName:"li"},"JVB_HOSTNAME")," to your ",(0,o.kt)("inlineCode",{parentName:"li"},"<FQDN>"),"."),(0,o.kt)("li",{parentName:"ul"},"Set ",(0,o.kt)("inlineCode",{parentName:"li"},"JVB_SECRET")," to your own secret."))),(0,o.kt)("li",{parentName:"ul"},"Edit the file ",(0,o.kt)("inlineCode",{parentName:"li"},"application.conf")," and adjust the values under ",(0,o.kt)("inlineCode",{parentName:"li"},"apis"),"\nand ",(0,o.kt)("inlineCode",{parentName:"li"},"websockets"),", especially set a unique ID as ",(0,o.kt)("inlineCode",{parentName:"li"},"muc_nickname"),"\nwith ",(0,o.kt)("inlineCode",{parentName:"li"},"uuidgen")," for example.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-HUCON"},'apis {\n    xmpp-client {\n      configs {\n        xmpp-server-1 {\n          hostname="localhost"\n          domain = "auth.${FQDN}"\n          username = "focus"\n          password = "YOURSECRET3"\n          muc_jids = "JvbBrewery@internal.auth.${FQDN}"\n          # The muc_nickname must be unique across all jitsi-videobridge instances\n          muc_nickname = "unique-id"\n          disable_certificate_verification = true\n        }\n      }\n    }\n}\nwebsockets {\n  enabled=true\n  server-id="default-id"\n  domain="${FQDN}"\n}\n')),(0,o.kt)("h3",{id:"jitsi-jicofo"},"Jitsi-Jicofo"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Go to the directory ",(0,o.kt)("inlineCode",{parentName:"li"},"/etc/jitsi/jicofo")),(0,o.kt)("li",{parentName:"ul"},"Edit the file ",(0,o.kt)("inlineCode",{parentName:"li"},"jitsi-jicofo.conf"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Set the property ",(0,o.kt)("inlineCode",{parentName:"li"},"JICOFO_HOSTNAME")," to ",(0,o.kt)("inlineCode",{parentName:"li"},"<FQDN>"),"."),(0,o.kt)("li",{parentName:"ul"},"Set the property ",(0,o.kt)("inlineCode",{parentName:"li"},"JICOFO_SECRET")," to the password the Prosody user got in above setup."),(0,o.kt)("li",{parentName:"ul"},"Set the property ",(0,o.kt)("inlineCode",{parentName:"li"},"JICOFO_AUTH_DOMAIN")," to ",(0,o.kt)("inlineCode",{parentName:"li"},"auth.<FQDN>"),"."),(0,o.kt)("li",{parentName:"ul"},"Set the property ",(0,o.kt)("inlineCode",{parentName:"li"},"JICOFO_AUTH_USER")," to the Prosody user from above setup."))),(0,o.kt)("li",{parentName:"ul"},"Edit the file ",(0,o.kt)("inlineCode",{parentName:"li"},"sip-cmmunicator.properties"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Set the property ",(0,o.kt)("inlineCode",{parentName:"li"},"org.jitsi.jicofo.BRIDGE_MUC")," to ",(0,o.kt)("inlineCode",{parentName:"li"},"JvbBrewery@internal.auth.<FQDN>"),"."),(0,o.kt)("li",{parentName:"ul"},"Set the property ",(0,o.kt)("inlineCode",{parentName:"li"},"org.jitsi.jicofo.jibri.BREWERY")," to ",(0,o.kt)("inlineCode",{parentName:"li"},"JibriBrewery@internal.auth.<FQDN>"),"."),(0,o.kt)("li",{parentName:"ul"},"Depending on your cert setup set ",(0,o.kt)("inlineCode",{parentName:"li"},"org.jitsi.jicofo.ALWAYS_TRUST_MODE_ENABLED")," to ",(0,o.kt)("inlineCode",{parentName:"li"},"true")," or ",(0,o.kt)("inlineCode",{parentName:"li"},"false"),".")))),(0,o.kt)("h2",{id:"add-on-jitsi-jibri"},"Add-On: Jitsi-Jibri"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Add to the file ",(0,o.kt)("inlineCode",{parentName:"li"},"/etc/prosody/conf.avail/<FQDN>.cfg.lua")," the following snippet at the end of the file.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-lua"},'VirtualHost "recorder.<FQDN>"\n  modules_enabled = {\n    "ping";\n  }\n  authentication = "internal_plain"\n')),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Run ",(0,o.kt)("inlineCode",{parentName:"li"},"prosodyctl register jibri auth.<FQDN> YOURSECRET3")," and replace ",(0,o.kt)("inlineCode",{parentName:"li"},"YOURSECRET3")," with an appropiate one."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"prosodyctl register recorder recorder.<FQDN> YOURSECRET3")," and replace ",(0,o.kt)("inlineCode",{parentName:"li"},"YOURSECRET3")," with an appropiate one."),(0,o.kt)("li",{parentName:"ul"},"Go to the directory ",(0,o.kt)("inlineCode",{parentName:"li"},"/etc/jitsi/jibri")," and edit the following properties you see listed below. The rest can be left as is.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-HUCON"},'jibri{\n    api{\n        environments = [\n            {\n                xmpp-domain = "<FQDN>"\n                control-muc {\n                    domain = "internal.<FQDN>"\n                }\n                control-login {\n                    domain = "recorder.<FQDN>"\n                    username = "recorder"\n                    password = "YOURSECRET3"\n                }   \n                call-login {\n                    domain = "recorder.<FQDN>"\n                    username = "recorder"\n                    password = "YOURSECRET3"\n                }\n            }\n        ]\n    }\n}\n')),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Edit the file ",(0,o.kt)("inlineCode",{parentName:"li"},"/etc/jitsi/jicofo/sip-communicator.properties")," and add the\nfollowing properties:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-HUCON"},"org.jitsi.jicofo.jibri.BREWERY=JibriBrewery@internal.auth.<FQDN>\norg.jitsi.jicofo.jibri.PENDING_TIMEOUT=90\n")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Edit the file ",(0,o.kt)("inlineCode",{parentName:"li"},"/srv/jitsi-meet/config.js")," and set the\nfollowing properties:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"fileRecordingsEnabled: true, // If you want to enable file recording\nliveStreamingEnabled: true, // If you want to enable live streaming\nhiddenDomain: 'recorder.<FQDN>',\n")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Edit ",(0,o.kt)("inlineCode",{parentName:"li"},"/srv/jitsi-meet/interface_config.js")," and make sure the\n",(0,o.kt)("inlineCode",{parentName:"li"},"TOOLBAR_BUTTONS")," array contains the ",(0,o.kt)("inlineCode",{parentName:"li"},"recording")," and\nthe ",(0,o.kt)("inlineCode",{parentName:"li"},"livestreaming")," value if you want those features.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"TOOLBAR_BUTTONS: [\n        'microphone', 'camera', 'closedcaptions', 'desktop', 'embedmeeting', 'fullscreen',\n        'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',\n        'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',\n        'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',\n        'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone', 'security'\n],\n")),(0,o.kt)("h2",{id:"add-on-jitsi-jigasi"},"Add-On: Jitsi-Jigasi"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Note from openSUSE packagers:")," We've packaged it but we don't have the infrastructure to set up this component. Hence we can't provide a guide for this so far."),(0,o.kt)("h2",{id:"services"},"Services"),(0,o.kt)("p",null,"Now everything should be working. That means you are ready to start everything up:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("inlineCode",{parentName:"li"},"systemctl start prosody")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("inlineCode",{parentName:"li"},"systemctl start jitsi-videbridge")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("inlineCode",{parentName:"li"},"systemctl start jitsi-jicofo")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("inlineCode",{parentName:"li"},"systemctl start jitsi-jibri")," (if configured and installed beforehand)"),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("inlineCode",{parentName:"li"},"systemctl start jitsi-jigasi")," (if configured and installed beforehand)"),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("inlineCode",{parentName:"li"},"systemctl start nginx"))),(0,o.kt)("h2",{id:"final-notes"},"Final notes"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"The Jitsi Software has a lot of dependencies and thus we recommend to run\nthis on a dedicated host for Jitsi."),(0,o.kt)("li",{parentName:"ul"},"Updating Jitsi is crucial to get rid of bugs and updated dependencies with\npossible security fixes."),(0,o.kt)("li",{parentName:"ul"},"Although tempted through Chrome: Don't install a full X11 stack like KDE or\nGnome for this."),(0,o.kt)("li",{parentName:"ul"},"Don't mix the ",(0,o.kt)("inlineCode",{parentName:"li"},"rpms")," or ",(0,o.kt)("inlineCode",{parentName:"li"},"debs")," with a source installation of the same component."),(0,o.kt)("li",{parentName:"ul"},"Securely backup your configuration, preferably in a VCS. This saves time and\npain when doing rollbacks or dealing with other problems.")))}m.isMDXComponent=!0}}]);