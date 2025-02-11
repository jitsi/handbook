"use strict";(self.webpackChunk_jitsi_handbook=self.webpackChunk_jitsi_handbook||[]).push([[9418],{9204:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>a,contentTitle:()=>r,default:()=>c,frontMatter:()=>d,metadata:()=>o,toc:()=>h});var i=n(4848),s=n(8453);const d={id:"client connection status indicators",title:"Client Connection Status Indicators"},r=void 0,o={id:"user-guide/client connection status indicators",title:"Client Connection Status Indicators",description:"This document explains what the different connection quality indicators on the video thumbnails actually mean.",source:"@site/docs/user-guide/client-connection-status-indicators.md",sourceDirName:"user-guide",slug:"/user-guide/client connection status indicators",permalink:"/handbook/docs/user-guide/client connection status indicators",draft:!1,unlisted:!1,editUrl:"https://github.com/jitsi/handbook/edit/master/docs/user-guide/client-connection-status-indicators.md",tags:[],version:"current",lastUpdatedAt:1739262203e3,frontMatter:{id:"client connection status indicators",title:"Client Connection Status Indicators"}},a={},h=[{value:"GOOD",id:"good",level:2},{value:"NON-OPTIMAL",id:"non-optimal",level:2},{value:"POOR",id:"poor",level:2},{value:"LOST",id:"lost",level:2},{value:"GHOST/NINJA",id:"ghostninja",level:2},{value:"Target bitrates expected for the video streams",id:"target-bitrates-expected-for-the-video-streams",level:2}];function l(e){const t={h2:"h2",li:"li",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.p,{children:"This document explains what the different connection quality indicators on the video thumbnails actually mean."}),"\n",(0,i.jsx)(t.h2,{id:"good",children:"GOOD"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"With video enabled, when the send bitrate for the video stream is at least 50% of the target bitrate expected for the stream. Please refer to the target bitrates table below."}),"\n",(0,i.jsx)(t.li,{children:"With video disabled or screen sharing is in progress, when the downstream packet loss is less than 6%."}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"non-optimal",children:"NON-OPTIMAL"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"With video enabled, when the send bitrate for the video stream is at least 30% of the target bitrate expected for the stream. Please refer to the target bitrates table below."}),"\n",(0,i.jsx)(t.li,{children:"With video disabled or screen sharing is in progress, when the downstream packet loss is between 6% and 8%."}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"poor",children:"POOR"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"With video enabled, when the send bitrate for the video stream is at least 10% of the target bitrate expected for the stream. Please refer to the target bitrates table below."}),"\n",(0,i.jsx)(t.li,{children:"With video disabled or screen sharing is in progress, when the downstream packet loss is between 8% and 12%."}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"lost",children:"LOST"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"When the user stops receiving video for the remote endpoint even when the endpoint is not video muted and it is in LastN as indicated by the bridge\u2019s LastNEndpointChangeEvent."}),"\n",(0,i.jsx)(t.li,{children:"When the bridge sends an EndpointConnectivityStatusChangeEvent indicating that the remote endpoint is no longer active, i.e., when the bridge has not received media from the remote endpoint for more than 3 secs."}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"ghostninja",children:"GHOST/NINJA"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"When the user stops receiving video for the remote endpoint even when the endpoint is not video muted and it is not in LastN as indicated by the bridge\u2019s LastNEndpointChangeEvent. This means that the bridge decided to suspend the video for this user. Bridge takes into consideration the available downlink bandwidth for the receiving endpoint and the number of video streams requested using the channelLast setting."}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"target-bitrates-expected-for-the-video-streams",children:"Target bitrates expected for the video streams"}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"CodecType"}),(0,i.jsx)(t.th,{children:"180p (in Kbps)"}),(0,i.jsx)(t.th,{children:"360p (in Kbps)"}),(0,i.jsx)(t.th,{children:"720p (in Kbps)"})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"VP8"}),(0,i.jsx)(t.td,{children:"200"}),(0,i.jsx)(t.td,{children:"500"}),(0,i.jsx)(t.td,{children:"1500"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"VP9"}),(0,i.jsx)(t.td,{children:"100"}),(0,i.jsx)(t.td,{children:"300"}),(0,i.jsx)(t.td,{children:"1200"})]})]})]})]})}function c(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>r,x:()=>o});var i=n(6540);const s={},d=i.createContext(s);function r(e){const t=i.useContext(d);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),i.createElement(d.Provider,{value:t},e.children)}}}]);