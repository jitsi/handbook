"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2746],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>h});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=a.createContext({}),d=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=d(e.components);return a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,u=r(e,["components","mdxType","originalType","parentName"]),c=d(n),h=o,m=c["".concat(l,".").concat(h)]||c[h]||p[h]||i;return n?a.createElement(m,s(s({ref:t},u),{},{components:n})):a.createElement(m,s({ref:t},u))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,s=new Array(i);s[0]=c;var r={};for(var l in t)hasOwnProperty.call(t,l)&&(r[l]=t[l]);r.originalType=e,r.mdxType="string"==typeof e?e:o,s[1]=r;for(var d=2;d<i;d++)s[d]=n[d];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},966:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>l,default:()=>h,frontMatter:()=>r,metadata:()=>d,toc:()=>p});var a=n(7462),o=n(3366),i=(n(7294),n(3905)),s=["components"],r={id:"ldap-authentication",title:"LDAP authentication",sidebar_label:"LDAP Authentication"},l=void 0,d={unversionedId:"devops-guide/ldap-authentication",id:"devops-guide/ldap-authentication",title:"LDAP authentication",description:"This is a first draft and might not work on your system. It has been tested on a Debian 11 installation with prosody 0.11 and authenticates against an OpenLDAP directory.",source:"@site/docs/devops-guide/ldap-authentication.md",sourceDirName:"devops-guide",slug:"/devops-guide/ldap-authentication",permalink:"/handbook/docs/devops-guide/ldap-authentication",draft:!1,editUrl:"https://github.com/jitsi/handbook/edit/master/docs/devops-guide/ldap-authentication.md",tags:[],version:"current",lastUpdatedAt:1723463252,formattedLastUpdatedAt:"Aug 12, 2024",frontMatter:{id:"ldap-authentication",title:"LDAP authentication",sidebar_label:"LDAP Authentication"},sidebar:"docs",previous:{title:"Authentication (Secure Domain)",permalink:"/handbook/docs/devops-guide/secure-domain"},next:{title:"Scalable setup",permalink:"/handbook/docs/devops-guide/devops-guide-scalable"}},u={},p=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Required packages",id:"required-packages",level:3},{value:"Install and set up Cyrus SASL",id:"install-and-set-up-cyrus-sasl",level:2},{value:"Test LDAP authentication",id:"test-ldap-authentication",level:3},{value:"Enable the <code>saslauthd</code> service",id:"enable-the-saslauthd-service",level:3},{value:"Cyrus SASL Configuration file",id:"cyrus-sasl-configuration-file",level:3},{value:"Set up Prosody",id:"set-up-prosody",level:2},{value:"Set Permissions",id:"set-permissions",level:3}],c={toc:p};function h(e){var t=e.components,n=(0,o.Z)(e,s);return(0,i.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"This is a first draft and might not work on your system. It has been tested on a Debian 11 installation with prosody 0.11 and authenticates against an OpenLDAP directory.")),(0,i.kt)("p",null,"If you want to authenticate your users against an LDAP directory instead\nof the local Prosody user database, you can use the Cyrus SASL package.\nUsing this package you might be able to validate user-supplied credentials\nagainst other sources, such as PAM, SQL and more - but this is beyond\nthis article."),(0,i.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,i.kt)("p",null,"Before following this article, make sure you have set up Prosody as\ndescribed in ",(0,i.kt)("a",{parentName:"p",href:"/handbook/docs/devops-guide/secure-domain"},"Authentication (Secure Domain)")," first."),(0,i.kt)("h3",{id:"required-packages"},"Required packages"),(0,i.kt)("p",null,"On Debian systems you need to install some required packages:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"sudo apt-get install sasl2-bin libsasl2-modules-ldap lua-cyrussasl\nsudo prosodyctl install --server=https://modules.prosody.im/rocks/ mod_auth_cyrus\n")),(0,i.kt)("p",null,"The first two packages are necessary for Cyrus' ",(0,i.kt)("inlineCode",{parentName:"p"},"saslauthd")," and allow it\nto connect to an LDAP directory. The ",(0,i.kt)("inlineCode",{parentName:"p"},"lua-cyrussasl"),"-package allows\nProsody to access Cyrus SASL."),(0,i.kt)("p",null,"Installing the ",(0,i.kt)("a",{parentName:"p",href:"https://modules.prosody.im/mod_auth_cyrus"},"mod_auth_cyrus")," module is neccessary because support for Cyrus SASL has been ",(0,i.kt)("a",{parentName:"p",href:"https://prosody.im/doc/cyrus_sasl"},"removed")," from mainline Prosody and placed in the community module repository."),(0,i.kt)("h2",{id:"install-and-set-up-cyrus-sasl"},"Install and set up Cyrus SASL"),(0,i.kt)("p",null,"The following options define a basic LDAP configuration. A full set of\npossible options can be found in ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/winlibs/cyrus-sasl/blob/master/saslauthd/LDAP_SASLAUTHD"},"LDAP_SASLAUTHD"),"."),(0,i.kt)("p",null,"By default Cyrus' ",(0,i.kt)("inlineCode",{parentName:"p"},"saslauthd")," searches for its LDAP configuration in\n",(0,i.kt)("inlineCode",{parentName:"p"},"/etc/saslauthd.conf"),". So create this file and enter something similar\nto define your LDAP environment:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"ldap_servers: ldaps://ldap.example.com\nldap_bind_dn: admin@example.com\nldap_bind_pw: topsecret\nldap_auth_method: bind\nldap_search_base: ou=people,dc=example,dc=com\n")),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"One omitted option you might want to look into is ",(0,i.kt)("inlineCode",{parentName:"p"},"ldap_filter")," which defaults to ",(0,i.kt)("inlineCode",{parentName:"p"},"uid=%u")," and should work for a lot of systems.  If you are using a Samba or Microsoft AD instance as your LDAP server you may need to change this to ",(0,i.kt)("inlineCode",{parentName:"p"},"ldap_filter: (sAMAccountName=%U)")," as ",(0,i.kt)("inlineCode",{parentName:"p"},"uid")," is NULL by default many configurations. You can also use the ",(0,i.kt)("inlineCode",{parentName:"p"},"ldap_filter")," to allow only specific users access. For more details on this and other options see the ",(0,i.kt)("inlineCode",{parentName:"p"},"LDAP_SASLAUTHD")," document linked above."),(0,i.kt)("p",{parentName:"admonition"},'Please note that Prosody may experience issues with usernames containing the "@"-symbol. You can work around this issue by changing ',(0,i.kt)("inlineCode",{parentName:"p"},"uid=%u")," to ",(0,i.kt)("inlineCode",{parentName:"p"},"uid=%U"),", which is ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/winlibs/cyrus-sasl/blob/d933c030ce12ec0668469d79ab8378e347a1b3ba/saslauthd/LDAP_SASLAUTHD#L126"},"defined"),' as the "user portion of %u (%U = test when %u = ',(0,i.kt)("a",{parentName:"p",href:"mailto:test@domain.tld"},"test@domain.tld"),')"')),(0,i.kt)("h3",{id:"test-ldap-authentication"},"Test LDAP authentication"),(0,i.kt)("p",null,"To test if the LDAP configuration is working, you can start ",(0,i.kt)("inlineCode",{parentName:"p"},"saslauthd")," in\ndebug mode while specifying the mandatory LDAP authentication mechanism:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"sudo saslauthd -d -a ldap\n")),(0,i.kt)("p",null,"The test utility for the SASL authentication server can then be used in a\nsecondary terminal. Replace ",(0,i.kt)("inlineCode",{parentName:"p"},"user")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"password")," with credentials stored\nin LDAP."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'sudo testsaslauthd -u user -p password\n0: OK "Success."\n\nsudo testsaslauthd -u user -p wrongpassword\n0: NO "authentication failed"\n')),(0,i.kt)("p",null,"After testing, you can stop ",(0,i.kt)("inlineCode",{parentName:"p"},"saslauthd")," using ",(0,i.kt)("inlineCode",{parentName:"p"},"ctrl-c"),"."),(0,i.kt)("h3",{id:"enable-the-saslauthd-service"},"Enable the ",(0,i.kt)("inlineCode",{parentName:"h3"},"saslauthd")," service"),(0,i.kt)("p",null,"You will need to edit the ",(0,i.kt)("inlineCode",{parentName:"p"},"/etc/default/saslauthd")," to enable the ",(0,i.kt)("inlineCode",{parentName:"p"},"saslauthd")," service to run at boot and have it use LDAP for authentication.  You can use sed to do this quickly."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'sudo sed -i -e "s/START=.*/START=yes/" -e "s/MECHANISMS=.*/MECHANISMS=\\"ldap\\"/" /etc/default/saslauthd\n')),(0,i.kt)("p",null,"This will make the following changes to ",(0,i.kt)("inlineCode",{parentName:"p"},"/etc/default/saslauthd"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'[...]\n# Should saslauthd run automatically on startup? (default: no)\nSTART=yes\n[...]\n# Example: MECHANISMS="pam"\nMECHANISMS="ldap"\n[...]\n')),(0,i.kt)("p",null,"It is not necessary to point ",(0,i.kt)("inlineCode",{parentName:"p"},"MECH_OPTIONS")," to the LDAP configuration file\nsince this is the default for this mechanism."),(0,i.kt)("p",null,"Now you can start, restart and stop ",(0,i.kt)("inlineCode",{parentName:"p"},"saslauthd")," using the ",(0,i.kt)("inlineCode",{parentName:"p"},"service")," scripts:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"sudo service saslauthd restart\n")),(0,i.kt)("p",null,"If you experience issues, check ",(0,i.kt)("inlineCode",{parentName:"p"},"/var/log/auth.log")," for ",(0,i.kt)("inlineCode",{parentName:"p"},"saslauthd")," entries."),(0,i.kt)("h3",{id:"cyrus-sasl-configuration-file"},"Cyrus SASL Configuration file"),(0,i.kt)("p",null,"Cyrus SASL requires a configuration file in order to know how to check user\ncredentials. For Prosody, the file is named ",(0,i.kt)("inlineCode",{parentName:"p"},"prosody.conf")," by default.\nIts location varies by OS and distribution as shown in the following table:"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Platform"),(0,i.kt)("th",{parentName:"tr",align:null},"Location"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"Debian and Ubuntu"),(0,i.kt)("td",{parentName:"tr",align:null},"/etc/sasl")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"Arch, RHEL/CentOS"),(0,i.kt)("td",{parentName:"tr",align:null},"/etc/sasl2")))),(0,i.kt)("p",null,"So for Debian systems, create the file ",(0,i.kt)("inlineCode",{parentName:"p"},"/etc/sasl/prosody.conf"),".\nThe directory ",(0,i.kt)("inlineCode",{parentName:"p"},"/etc/sasl")," might not yet exist."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"sudo mkdir /etc/sasl/\n\ncat << 'EOF' |sudo tee /etc/sasl/prosody.conf > /dev/null\npwcheck_method: saslauthd\nmech_list: PLAIN\nEOF\n")),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"The filename ",(0,i.kt)("inlineCode",{parentName:"p"},"prosody.conf"),"  corresponds to a value for ",(0,i.kt)("inlineCode",{parentName:"p"},"cyrus_application_name"),"\nin the Prosody config. Since we have not changed the default this has a value of ",(0,i.kt)("inlineCode",{parentName:"p"},"prosody"),".")),(0,i.kt)("p",null,"The Prosody documentation has more details on a\n",(0,i.kt)("a",{parentName:"p",href:"https://prosody.im/doc/cyrus_sasl"},"Cyrus SASL-related setup"),"."),(0,i.kt)("h2",{id:"set-up-prosody"},"Set up Prosody"),(0,i.kt)("p",null,"If you have tested the LDAP authentication successfully and enabled the ",(0,i.kt)("inlineCode",{parentName:"p"},"saslauthd")," service, you can change Prosody's authentication to the Cyrus backend by changing the ",(0,i.kt)("inlineCode",{parentName:"p"},"authentication")," setting in ",(0,i.kt)("inlineCode",{parentName:"p"},"/etc/prosody/conf.avail/$(hostname -f).cfg.lua")," via the command:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'sed -i -E -e "/^ *VirtualHost \\"$(hostname -f)\\"/,/^ *VirtualHost/ {s/authentication ?=.*$/authentication = \\"cyrus\\"/}" /etc/prosody/conf.avail/$(hostname -f).cfg.lua\n')),(0,i.kt)("p",null,"You might also have to add the ",(0,i.kt)("inlineCode",{parentName:"p"},"allow_unencrypted_plain_auth")," option to allow\nplain-text passwords to be sent over the network. ",(0,i.kt)("em",{parentName:"p"},"This is not recommended")," as it\nmakes the setup less secure. So please try without this line first and only add\nit if you have problems authenticating."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'        authentication = "cyrus"\n        allow_unencrypted_plain_auth = true\n')),(0,i.kt)("h3",{id:"set-permissions"},"Set Permissions"),(0,i.kt)("p",null,"Prosody will now try to access the saslauthd socket in\n",(0,i.kt)("inlineCode",{parentName:"p"},"/var/run/saslauthd/")," to communicate with the authentication daemon.\nThis folder only allows access to user ",(0,i.kt)("inlineCode",{parentName:"p"},"root")," and group ",(0,i.kt)("inlineCode",{parentName:"p"},"sasl")," while prosody\nruns as the system user/group ",(0,i.kt)("inlineCode",{parentName:"p"},"prosody"),". "),(0,i.kt)("p",null,"The easiest solution is to add the ",(0,i.kt)("inlineCode",{parentName:"p"},"sasl")," group to the ",(0,i.kt)("inlineCode",{parentName:"p"},"prosody")," user and\nrestart the service."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"sudo adduser prosody sasl\nsudo service prosody restart\n")))}h.isMDXComponent=!0}}]);