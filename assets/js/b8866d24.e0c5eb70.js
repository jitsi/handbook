"use strict";(self.webpackChunk_jitsi_handbook=self.webpackChunk_jitsi_handbook||[]).push([[3327],{8150:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>l,contentTitle:()=>r,default:()=>p,frontMatter:()=>t,metadata:()=>d,toc:()=>c});var a=n(4848),s=n(8453);const t={id:"dev-guide-iframe-functions",title:"Functions"},r=void 0,d={id:"dev-guide/dev-guide-iframe-functions",title:"Functions",description:"Use the following API functions to control your embedded Jitsi Meet Conference.",source:"@site/docs/dev-guide/iframe-functions.md",sourceDirName:"dev-guide",slug:"/dev-guide/dev-guide-iframe-functions",permalink:"/handbook/docs/dev-guide/dev-guide-iframe-functions",draft:!1,unlisted:!1,editUrl:"https://github.com/jitsi/handbook/edit/master/docs/dev-guide/iframe-functions.md",tags:[],version:"current",lastUpdatedAt:1739262203e3,frontMatter:{id:"dev-guide-iframe-functions",title:"Functions"},sidebar:"docs",previous:{title:"IFrame API",permalink:"/handbook/docs/dev-guide/dev-guide-iframe"},next:{title:"Commands",permalink:"/handbook/docs/dev-guide/dev-guide-iframe-commands"}},l={},c=[{value:"captureLargeVideoScreenshot",id:"capturelargevideoscreenshot",level:3},{value:"getAvailableDevices",id:"getavailabledevices",level:3},{value:"getContentSharingParticipants",id:"getcontentsharingparticipants",level:3},{value:"getCurrentDevices",id:"getcurrentdevices",level:3},{value:"getDeploymentInfo",id:"getdeploymentinfo",level:3},{value:"getLivestreamUrl",id:"getlivestreamurl",level:3},{value:"getParticipantsInfo",id:"getparticipantsinfo",level:3},{value:"getRoomsInfo",id:"getroomsinfo",level:3},{value:"getSessionId",id:"getsessionid",level:3},{value:"getVideoQuality",id:"getvideoquality",level:3},{value:"getSupportedCommands",id:"getsupportedcommands",level:3},{value:"getSupportedEvents",id:"getsupportedevents",level:3},{value:"isDeviceChangeAvailable",id:"isdevicechangeavailable",level:3},{value:"isDeviceListAvailable",id:"isdevicelistavailable",level:3},{value:"isMultipleAudioInputSupported",id:"ismultipleaudioinputsupported",level:3},{value:"pinParticipant",id:"pinparticipant",level:3},{value:"resizeLargeVideo",id:"resizelargevideo",level:3},{value:"setAudioInputDevice",id:"setaudioinputdevice",level:3},{value:"setAudioOutputDevice",id:"setaudiooutputdevice",level:3},{value:"setLargeVideoParticipant",id:"setlargevideoparticipant",level:3},{value:"setVideoInputDevice",id:"setvideoinputdevice",level:3},{value:"setVirtualBackground",id:"setvirtualbackground",level:3},{value:"startRecording",id:"startrecording",level:3},{value:"stopRecording",id:"stoprecording",level:3},{value:"getNumberOfParticipants",id:"getnumberofparticipants",level:3},{value:"getAvatarURL",id:"getavatarurl",level:3},{value:"getDisplayName",id:"getdisplayname",level:3},{value:"getEmail",id:"getemail",level:3},{value:"getIFrame",id:"getiframe",level:3},{value:"isAudioDisabled",id:"isaudiodisabled",level:3},{value:"isAudioMuted",id:"isaudiomuted",level:3},{value:"isVideoMuted",id:"isvideomuted",level:3},{value:"isAudioAvailable",id:"isaudioavailable",level:3},{value:"isVideoAvailable",id:"isvideoavailable",level:3},{value:"isVisitor",id:"isvisitor",level:3},{value:"isModerationOn",id:"ismoderationon",level:3},{value:"isP2pActive",id:"isp2pactive",level:3},{value:"isParticipantForceMuted",id:"isparticipantforcemuted",level:3},{value:"isParticipantsPaneOpen",id:"isparticipantspaneopen",level:3},{value:"isStartSilent",id:"isstartsilent",level:3},{value:"listBreakoutRooms",id:"listbreakoutrooms",level:3},{value:"invite",id:"invite",level:3},{value:"dispose",id:"dispose",level:3}];function o(e){const i={code:"code",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i.p,{children:"Use the following API functions to control your embedded Jitsi Meet Conference."}),"\n",(0,a.jsx)(i.h3,{id:"capturelargevideoscreenshot",children:"captureLargeVideoScreenshot"}),"\n",(0,a.jsx)(i.p,{children:"Captures a screenshot for the participant in the large video view (on stage)."}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:'api.captureLargeVideoScreenshot().then(data => {\n    // data is an Object with only one param, dataURL\n    // data.dataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABQAA..."\n});\n'})}),"\n",(0,a.jsx)(i.h3,{id:"getavailabledevices",children:"getAvailableDevices"}),"\n",(0,a.jsx)(i.p,{children:"Retrieves a list of available devices."}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.getAvailableDevices().then(devices => {\n    // devices = {\n    //     audioInput: [{\n    //         deviceId: 'ID'\n    //         groupId: 'grpID'\n    //         kind: 'audioinput'\n    //         label: 'label'\n    //     },....],\n    //     audioOutput: [{\n    //         deviceId: 'ID'\n    //         groupId: 'grpID'\n    //         kind: 'audioOutput'\n    //         label: 'label'\n    //     },....],\n    //     videoInput: [{\n    //         deviceId: 'ID'\n    //         groupId: 'grpID'\n    //         kind: 'videoInput'\n    //         label: 'label'\n    //     },....]\n    // }\n    ...\n});\n"})}),"\n",(0,a.jsx)(i.h3,{id:"getcontentsharingparticipants",children:"getContentSharingParticipants"}),"\n",(0,a.jsx)(i.p,{children:"Returns a promise which resolves with an array of currently sharing participants ID's."}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.getContentSharingParticipants().then(res => {\n    //res.sharingParticipantIds = [particId1, particId2, ...]\n});\n"})}),"\n",(0,a.jsx)(i.h3,{id:"getcurrentdevices",children:"getCurrentDevices"}),"\n",(0,a.jsx)(i.p,{children:"Retrieves a list of currently selected devices."}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.getCurrentDevices().then(devices => {\n    // devices = {\n    //     audioInput: {\n    //         deviceId: 'ID'\n    //         groupId: 'grpID'\n    //         kind: 'videoInput'\n    //         label: 'label'\n    //     },\n    //     audioOutput: {\n    //         deviceId: 'ID'\n    //         groupId: 'grpID'\n    //         kind: 'videoInput'\n    //         label: 'label'\n    //     },\n    //     videoInput: {\n    //         deviceId: 'ID'\n    //         groupId: 'grpID'\n    //         kind: 'videoInput'\n    //         label: 'label'\n    //     }\n    // }\n    ...\n});\n"})}),"\n",(0,a.jsx)(i.h3,{id:"getdeploymentinfo",children:"getDeploymentInfo"}),"\n",(0,a.jsx)(i.p,{children:"Retrieves an object containing information about the deployment."}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.getDeploymentInfo().then(deploymentInfo => {\n    // deploymentInfo = {\n    //     region: 'deployment-region',\n    //     shard: 'deployment-shard',\n    //     ...\n    // }\n    ...\n});\n"})}),"\n",(0,a.jsx)(i.h3,{id:"getlivestreamurl",children:"getLivestreamUrl"}),"\n",(0,a.jsx)(i.p,{children:"Retrieves an object containing information about livestreamUrl of the current live stream."}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.getLivestreamUrl().then(livestreamData => {\n    // livestreamData = {\n    //     livestreamUrl: 'livestreamUrl'\n    // }\n    ...\n});\n"})}),"\n",(0,a.jsx)(i.h3,{id:"getparticipantsinfo",children:"getParticipantsInfo"}),"\n",(0,a.jsxs)(i.p,{children:[(0,a.jsx)(i.strong,{children:"DEPRECATED"})," Use ",(0,a.jsx)(i.code,{children:"getRoomsInfo"})," instead."]}),"\n",(0,a.jsx)(i.p,{children:"Returns an array containing participant information such as ID, display name, avatar URL, and email."}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.getParticipantsInfo();\n"})}),"\n",(0,a.jsx)(i.h3,{id:"getroomsinfo",children:"getRoomsInfo"}),"\n",(0,a.jsx)(i.p,{children:"Returns an array of available rooms and details of it:"}),"\n",(0,a.jsxs)(i.ul,{children:["\n",(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.code,{children:"isMainRoom"})," (true,false), ",(0,a.jsx)(i.code,{children:"id"}),", ",(0,a.jsx)(i.code,{children:"jid"})]}),"\n",(0,a.jsxs)(i.li,{children:["participants: ",(0,a.jsx)(i.code,{children:"Participant[]"}),"\n",(0,a.jsxs)(i.ul,{children:["\n",(0,a.jsx)(i.li,{children:(0,a.jsx)(i.code,{children:"id"})}),"\n",(0,a.jsx)(i.li,{children:(0,a.jsx)(i.code,{children:"jid"})}),"\n",(0,a.jsx)(i.li,{children:(0,a.jsx)(i.code,{children:"role"})}),"\n",(0,a.jsx)(i.li,{children:(0,a.jsx)(i.code,{children:"displayName"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.getRoomsInfo().then(rooms => {\n    ... // see response example structure\n})\n"})}),"\n",(0,a.jsx)(i.p,{children:"Response example structure:"}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-json",children:'{\n  "rooms": [\n    {\n      "isMainRoom": true,\n      "id": "room_name@conference.jitsi",\n      "jid": "room_name@conference.jitsi/aaaaaa",\n      "participants": [\n        {\n          "jid": "room_name@conference.jitsi/bbbbbb",\n          "role": "participant",\n          "displayName": "p1",\n          "id": "bbbbbb"\n        },\n        {\n          "jid": "room_name@conference.jitsi/cccccc",\n          "role": "participant",\n          "displayName": "p2",\n          "id": "cccccc"\n        }\n      ]\n    },\n    {\n    "isMainRoom": false,\n    "id": "aaaaaa-bbb-cccc-dddd-qwertyuiopas",\n    "jid": "aaaaaa-bbb-cccc-dddd-qwertyuiopas@breakout.jitsi",\n    "participants": [{\n        "jid": "aaaaaa-cccc-dddd-eeee-qwertyuiopas@jitsi/abcd1234",\n        "role": "moderator",\n        "displayName": "Participant name",\n        "avatarUrl": "",\n        "id": "abcd1234"\n    }]\n    },\n  ]\n}\n'})}),"\n",(0,a.jsx)(i.h3,{id:"getsessionid",children:"getSessionId"}),"\n",(0,a.jsxs)(i.p,{children:["Returns the meting's unique Id (",(0,a.jsx)(i.code,{children:"sessionId"}),").\nPlease note that the ",(0,a.jsx)(i.code,{children:"sessionId"})," is not available when in prejoin screen and it's not guaranteed to be available immediately after joining - in which cases it will be empty."]}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.getSessionId().then(sessionId => {\n    //sessionId: string\n    ...\n});\n"})}),"\n",(0,a.jsx)(i.h3,{id:"getvideoquality",children:"getVideoQuality"}),"\n",(0,a.jsx)(i.p,{children:"Returns the current video quality setting."}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.getVideoQuality();\n"})}),"\n",(0,a.jsx)(i.h3,{id:"getsupportedcommands",children:"getSupportedCommands"}),"\n",(0,a.jsxs)(i.p,{children:["Returns array of commands supported by ",(0,a.jsx)(i.code,{children:"api.executeCommand(command, ...arguments)"}),";"]}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.getSupportedCommands();\n"})}),"\n",(0,a.jsx)(i.h3,{id:"getsupportedevents",children:"getSupportedEvents"}),"\n",(0,a.jsxs)(i.p,{children:["Returns array of events supported by ",(0,a.jsx)(i.code,{children:"api.addListener(event, listener)"}),";"]}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.getSupportedEvents();\n"})}),"\n",(0,a.jsx)(i.h3,{id:"isdevicechangeavailable",children:"isDeviceChangeAvailable"}),"\n",(0,a.jsx)(i.p,{children:"Resolves to true if the device change is available and to false if not."}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"// The accepted deviceType values are - 'output', 'input' or undefined.\napi.isDeviceChangeAvailable(deviceType).then(isDeviceChangeAvailable => {\n    ...\n});\n"})}),"\n",(0,a.jsx)(i.h3,{id:"isdevicelistavailable",children:"isDeviceListAvailable"}),"\n",(0,a.jsx)(i.p,{children:"Resolves to true if the device list is available and to false if not."}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.isDeviceListAvailable().then(isDeviceListAvailable => {\n    ...\n});\n"})}),"\n",(0,a.jsx)(i.h3,{id:"ismultipleaudioinputsupported",children:"isMultipleAudioInputSupported"}),"\n",(0,a.jsx)(i.p,{children:"Resolves to true if multiple audio input is supported and to false if not."}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.isMultipleAudioInputSupported().then(isMultipleAudioInputSupported => {\n    ...\n});\n"})}),"\n",(0,a.jsx)(i.h3,{id:"pinparticipant",children:"pinParticipant"}),"\n",(0,a.jsx)(i.p,{children:"Selects the participant ID to be the pinned participant in order to always receive video for this participant."}),"\n",(0,a.jsxs)(i.p,{children:["The second parameter is optional and can be used to specify a ",(0,a.jsx)(i.code,{children:"videoType"}),". When multistream support is enabled by passing this parameter you can specify whether the desktop or the camera video for the specified participant should be pinned. The accepted values are ",(0,a.jsx)(i.code,{children:"'camera'"})," and ",(0,a.jsx)(i.code,{children:"'desktop'"}),". The default is ",(0,a.jsx)(i.code,{children:"'camera'"}),". Any invalid values will be ignored and default will be used."]}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.pinParticipant(participantId, videoType);\n"})}),"\n",(0,a.jsx)(i.h3,{id:"resizelargevideo",children:"resizeLargeVideo"}),"\n",(0,a.jsx)(i.p,{children:"Resizes the large video container per the provided dimensions."}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.resizeLargeVideo(width, height);\n"})}),"\n",(0,a.jsx)(i.h3,{id:"setaudioinputdevice",children:"setAudioInputDevice"}),"\n",(0,a.jsx)(i.p,{children:"Sets the audio input device to the one with the passed label or ID."}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.setAudioInputDevice(deviceLabel, deviceId);\n"})}),"\n",(0,a.jsx)(i.h3,{id:"setaudiooutputdevice",children:"setAudioOutputDevice"}),"\n",(0,a.jsx)(i.p,{children:"Sets the audio output device to the one with the passed label or ID."}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.setAudioOutputDevice(deviceLabel, deviceId);\n"})}),"\n",(0,a.jsx)(i.h3,{id:"setlargevideoparticipant",children:"setLargeVideoParticipant"}),"\n",(0,a.jsx)(i.p,{children:"Displays the participant with the given participant ID on the large video."}),"\n",(0,a.jsx)(i.p,{children:"If no participant ID is given, a participant is picked based on the dominant, pinned speaker settings."}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.setLargeVideoParticipant(participantId);\n"})}),"\n",(0,a.jsx)(i.h3,{id:"setvideoinputdevice",children:"setVideoInputDevice"}),"\n",(0,a.jsx)(i.p,{children:"Sets the video input device to the one with the passed label or ID."}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.setVideoInputDevice(deviceLabel, deviceId);\n"})}),"\n",(0,a.jsx)(i.h3,{id:"setvirtualbackground",children:"setVirtualBackground"}),"\n",(0,a.jsx)(i.p,{children:"Set your virtual background with a base64 image."}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:'/**\n * @param {boolean} enabled - Enable or disable the virtual background.\n * @param {string} backgroundImage - Base64 image string, eg. "data:image/png;base64, iVBOR...".\n */\napi.setVirtualBackground(enabled, backgroundImage);\n'})}),"\n",(0,a.jsx)(i.h3,{id:"startrecording",children:"startRecording"}),"\n",(0,a.jsxs)(i.p,{children:["Starts a file recording or streaming session. See the ",(0,a.jsx)(i.code,{children:"startRecording"})," command for more details."]}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.startRecording(options);\n"})}),"\n",(0,a.jsx)(i.h3,{id:"stoprecording",children:"stopRecording"}),"\n",(0,a.jsxs)(i.p,{children:["Stops an ongoing file recording, streaming session or transcription. See the ",(0,a.jsx)(i.code,{children:"stopRecording"})," command for more details."]}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.stopRecording(mode, transcription);\n"})}),"\n",(0,a.jsx)(i.h3,{id:"getnumberofparticipants",children:"getNumberOfParticipants"}),"\n",(0,a.jsx)(i.p,{children:"Returns the number of conference participants:"}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"const numberOfParticipants = api.getNumberOfParticipants();\n"})}),"\n",(0,a.jsx)(i.h3,{id:"getavatarurl",children:"getAvatarURL"}),"\n",(0,a.jsxs)(i.p,{children:[(0,a.jsx)(i.strong,{children:"DEPRECATED"})," Use ",(0,a.jsx)(i.code,{children:"getRoomsInfo"})," instead."]}),"\n",(0,a.jsx)(i.p,{children:"Returns a participant's avatar URL:"}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"const avatarURL = api.getAvatarURL(participantId);\n"})}),"\n",(0,a.jsx)(i.h3,{id:"getdisplayname",children:"getDisplayName"}),"\n",(0,a.jsx)(i.p,{children:"Returns a participant's display name:"}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"const displayName = api.getDisplayName(participantId);\n"})}),"\n",(0,a.jsx)(i.h3,{id:"getemail",children:"getEmail"}),"\n",(0,a.jsx)(i.p,{children:"Returns a participant's email:"}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"const email = api.getEmail(participantId);\n"})}),"\n",(0,a.jsx)(i.h3,{id:"getiframe",children:"getIFrame"}),"\n",(0,a.jsx)(i.p,{children:"Returns the IFrame HTML element which is used to load the Jitsi Meet conference:"}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"const iframe = api.getIFrame();\n"})}),"\n",(0,a.jsx)(i.h3,{id:"isaudiodisabled",children:"isAudioDisabled"}),"\n",(0,a.jsx)(i.p,{children:"Returns a Promise which resolves to the current audio disabled state:"}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.isAudioDisabled().then(disabled => {\n    ...\n});\n"})}),"\n",(0,a.jsx)(i.h3,{id:"isaudiomuted",children:"isAudioMuted"}),"\n",(0,a.jsx)(i.p,{children:"Returns a Promise which resolves to the current audio muted state:"}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.isAudioMuted().then(muted => {\n    ...\n});\n"})}),"\n",(0,a.jsx)(i.h3,{id:"isvideomuted",children:"isVideoMuted"}),"\n",(0,a.jsx)(i.p,{children:"Returns a Promise which resolves to the current video muted state:"}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.isVideoMuted().then(muted => {\n    ...\n});\n"})}),"\n",(0,a.jsx)(i.h3,{id:"isaudioavailable",children:"isAudioAvailable"}),"\n",(0,a.jsx)(i.p,{children:"Returns a Promise which resolves to the current audio availability state:"}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.isAudioAvailable().then(available => {\n    ...\n});\n"})}),"\n",(0,a.jsx)(i.h3,{id:"isvideoavailable",children:"isVideoAvailable"}),"\n",(0,a.jsx)(i.p,{children:"Returns a Promise which resolves to the current video availability state:"}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.isVideoAvailable().then(available => {\n    ...\n});\n"})}),"\n",(0,a.jsx)(i.h3,{id:"isvisitor",children:"isVisitor"}),"\n",(0,a.jsx)(i.p,{children:"Returns a whether the current user is a visitor or not."}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"const isVisitor = api.isVisitor();\n"})}),"\n",(0,a.jsx)(i.h3,{id:"ismoderationon",children:"isModerationOn"}),"\n",(0,a.jsx)(i.p,{children:"Returns a Promise which resolves to the current moderation state of the given media type."}),"\n",(0,a.jsxs)(i.p,{children:[(0,a.jsx)(i.code,{children:"mediaType"})," can be either ",(0,a.jsx)(i.code,{children:"audio"})," (default) or ",(0,a.jsx)(i.code,{children:"video"}),"."]}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.isModerationOn(mediaType).then(isModerationOn => {\n    ...\n});\n"})}),"\n",(0,a.jsx)(i.h3,{id:"isp2pactive",children:"isP2pActive"}),"\n",(0,a.jsx)(i.p,{children:"Returns a Promise which resolves to a Boolean or null, when there is no conference."}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.isP2pActive().then(isP2p => {\n    ...\n});\n"})}),"\n",(0,a.jsx)(i.h3,{id:"isparticipantforcemuted",children:"isParticipantForceMuted"}),"\n",(0,a.jsx)(i.p,{children:"Returns a Promise which resolves to the current force mute state of the given participant for the given media type."}),"\n",(0,a.jsxs)(i.p,{children:[(0,a.jsx)(i.code,{children:"mediaType"})," can be either ",(0,a.jsx)(i.code,{children:"audio"})," (default) or ",(0,a.jsx)(i.code,{children:"video"}),"."]}),"\n",(0,a.jsx)(i.p,{children:"Force muted - moderation is on and participant is not allowed to unmute the given media type."}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.isParticipantForceMuted(participantId, mediaType).then(isForceMuted => {\n    ...\n});\n"})}),"\n",(0,a.jsx)(i.h3,{id:"isparticipantspaneopen",children:"isParticipantsPaneOpen"}),"\n",(0,a.jsx)(i.p,{children:"Returns a Promise which resolves with the current participants pane state."}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.isParticipantsPaneOpen().then(state => {\n    ...\n});\n"})}),"\n",(0,a.jsx)(i.h3,{id:"isstartsilent",children:"isStartSilent"}),"\n",(0,a.jsx)(i.p,{children:"Returns a Promise which resolves with whether meeting was started in view only."}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.isStartSilent().then(startSilent => {\n    ...\n});\n"})}),"\n",(0,a.jsx)(i.h3,{id:"listbreakoutrooms",children:"listBreakoutRooms"}),"\n",(0,a.jsx)(i.p,{children:"Returns a Promise which resolves with the map of breakout rooms."}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.listBreakoutRooms().then(breakoutRooms => {\n    ...\n});\n"})}),"\n",(0,a.jsx)(i.h3,{id:"invite",children:"invite"}),"\n",(0,a.jsx)(i.p,{children:"Invite the given array of participants to the meeting:"}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.invite([ {...}, {...}, {...} ]).then(() => {\n    // success\n}).catch(() => {\n    // failure\n});\n"})}),"\n",(0,a.jsxs)(i.p,{children:[(0,a.jsx)(i.strong,{children:"NOTE:"})," The invitee format in the array depends on the invite service used in the deployment."]}),"\n",(0,a.jsx)(i.p,{children:"PSTN invite objects have the following structure:"}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"{\n    type: 'phone',\n    number: <string> // the phone number in E.164 format  (ex. +31201234567)\n}\n"})}),"\n",(0,a.jsx)(i.p,{children:"SIP invite objects have the following structure:"}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"{\n    type: 'sip',\n    address: <string> // the sip address\n}\n"})}),"\n",(0,a.jsx)(i.h3,{id:"dispose",children:"dispose"}),"\n",(0,a.jsx)(i.p,{children:"Removes the embedded Jitsi Meet conference:"}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-javascript",children:"api.dispose();\n"})}),"\n",(0,a.jsxs)(i.p,{children:[(0,a.jsx)(i.strong,{children:"NOTE:"})," Jitsi recommends removing the conference before the page is unloaded."]})]})}function p(e={}){const{wrapper:i}={...(0,s.R)(),...e.components};return i?(0,a.jsx)(i,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}},8453:(e,i,n)=>{n.d(i,{R:()=>r,x:()=>d});var a=n(6540);const s={},t=a.createContext(s);function r(e){const i=a.useContext(t);return a.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function d(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),a.createElement(t.Provider,{value:i},e.children)}}}]);