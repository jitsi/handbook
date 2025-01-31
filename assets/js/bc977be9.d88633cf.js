"use strict";(self.webpackChunk_jitsi_handbook=self.webpackChunk_jitsi_handbook||[]).push([[7671],{2123:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>l,contentTitle:()=>d,default:()=>h,frontMatter:()=>r,metadata:()=>a,toc:()=>o});var t=n(4848),s=n(8453);const r={id:"dev-guide-flutter-sdk",title:"Flutter SDK"},d=void 0,a={id:"dev-guide/dev-guide-flutter-sdk",title:"Flutter SDK",description:"The Jitsi Meet Flutter SDK provides the same user experience as the Jitsi Meet app, in the form of a Flutter plugin so that you can embed and customize Jitsi Meet in your own Flutter app.",source:"@site/docs/dev-guide/flutter-sdk.md",sourceDirName:"dev-guide",slug:"/dev-guide/dev-guide-flutter-sdk",permalink:"/handbook/docs/dev-guide/dev-guide-flutter-sdk",draft:!1,unlisted:!1,editUrl:"https://github.com/jitsi/handbook/edit/master/docs/dev-guide/flutter-sdk.md",tags:[],version:"current",lastUpdatedAt:173835392e4,frontMatter:{id:"dev-guide-flutter-sdk",title:"Flutter SDK"},sidebar:"docs",previous:{title:"React Native SDK",permalink:"/handbook/docs/dev-guide/dev-guide-react-native-sdk"},next:{title:"Web",permalink:"/handbook/docs/category/web"}},l={},o=[{value:"Sample application using the Flutter",id:"sample-application-using-the-flutter",level:2},{value:"Installation",id:"installation",level:2},{value:"Add dependency",id:"add-dependency",level:3},{value:"Install",id:"install",level:3},{value:"Import files",id:"import-files",level:3},{value:"Usage",id:"usage",level:3},{value:"Join meeting",id:"join-meeting",level:4},{value:"Configuration",id:"configuration",level:2},{value:"iOS",id:"ios",level:3},{value:"Android",id:"android",level:3},{value:"Using the API",id:"using-the-api",level:2},{value:"JitsiMeet",id:"jitsimeet",level:3},{value:"JitsiMeet()",id:"jitsimeet-1",level:4},{value:"join(JitsiMeetConferenceOptions options, [JitsiMeetEventListener? listener])",id:"joinjitsimeetconferenceoptions-options-jitsimeeteventlistener-listener",level:4},{value:"hangUp()",id:"hangup",level:4},{value:"setAudioMuted(bool muted)",id:"setaudiomutedbool-muted",level:4},{value:"setVideoMuted(bool muted)",id:"setvideomutedbool-muted",level:4},{value:"sendEndpointTextMessage(<code>{String? to, required String message}</code>)",id:"sendendpointtextmessagestring-to-required-string-message",level:4},{value:"toggleScreenShare(bool enabled)",id:"togglescreensharebool-enabled",level:4},{value:"openChat([String? to])",id:"openchatstring-to",level:4},{value:"sendChatMessage(<code>{String? to, required String message}</code>)",id:"sendchatmessagestring-to-required-string-message",level:4},{value:"closeChat()",id:"closechat",level:4},{value:"retrieveParticipantsInfo()",id:"retrieveparticipantsinfo",level:4},{value:"JitsiMeetConferenceOptions",id:"jitsimeetconferenceoptions",level:3},{value:"JitsiMeetUserInfo(<code>{String displayName, String email, String avatar}</code>)",id:"jitsimeetuserinfostring-displayname-string-email-string-avatar",level:4},{value:"JitsiMeetEventListener",id:"jitsimeeteventlistener",level:3},{value:"conferenceJoined(String url)",id:"conferencejoinedstring-url",level:4},{value:"conferenceTerminated(String url, Object? error)",id:"conferenceterminatedstring-url-object-error",level:4},{value:"conferenceWillJoin(String url)",id:"conferencewilljoinstring-url",level:4},{value:"participantJoined(String? email, String? name, String? role, String? participantId)",id:"participantjoinedstring-email-string-name-string-role-string-participantid",level:4},{value:"participantLeft(String? participantId)",id:"participantleftstring-participantid",level:4},{value:"audioMutedChanged(bool muted)",id:"audiomutedchangedbool-muted",level:4},{value:"videoMutedChanged(bool muted)",id:"videomutedchangedbool-muted",level:4},{value:"endpointTextMessageReceived(String senderId, String message)",id:"endpointtextmessagereceivedstring-senderid-string-message",level:4},{value:"screenShareToggled(String participantId, bool sharing)",id:"screensharetoggledstring-participantid-bool-sharing",level:4},{value:"chatMessageReceived(String senderId, String message, bool isPrivate, String? timestamp)",id:"chatmessagereceivedstring-senderid-string-message-bool-isprivate-string-timestamp",level:4},{value:"chatToggled(bool isOpen)",id:"chattoggledbool-isopen",level:4},{value:"participantsInfoRetrieved(String participantsInfo)",id:"participantsinforetrievedstring-participantsinfo",level:4},{value:"readyToClose()",id:"readytoclose",level:4},{value:"Example of listener:",id:"example-of-listener",level:4}];function c(e){const i={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.p,{children:"The Jitsi Meet Flutter SDK provides the same user experience as the Jitsi Meet app, in the form of a Flutter plugin so that you can embed and customize Jitsi Meet in your own Flutter app."}),"\n",(0,t.jsx)(i.h2,{id:"sample-application-using-the-flutter",children:"Sample application using the Flutter"}),"\n",(0,t.jsxs)(i.p,{children:["If you want to see how easy integrating the Jitsi Meet Flutter SDK into a Flutter application is, take a look at the",(0,t.jsx)("br",{}),"\n",(0,t.jsx)(i.a,{href:"https://github.com/jitsi/jitsi-meet-sdk-samples#flutter",children:"sample applications repository"}),"."]}),"\n",(0,t.jsx)(i.h2,{id:"installation",children:"Installation"}),"\n",(0,t.jsx)(i.h3,{id:"add-dependency",children:"Add dependency"}),"\n",(0,t.jsx)(i.p,{children:"Add the dependency from command-line"}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-bash",children:"$ flutter pub add jitsi_meet_flutter_sdk\n"})}),"\n",(0,t.jsxs)(i.p,{children:["The command above will add this to the ",(0,t.jsx)(i.code,{children:"pubspec.yaml"})," file in your project (you can do this manually):"]}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-yaml",children:"dependencies:\n    jitsi_meet_flutter_sdk: ^0.1.7\n"})}),"\n",(0,t.jsx)(i.h3,{id:"install",children:"Install"}),"\n",(0,t.jsx)(i.p,{children:"Install the packages from the terminal:"}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-bash",children:"$ flutter pub get\n"})}),"\n",(0,t.jsx)(i.h3,{id:"import-files",children:"Import files"}),"\n",(0,t.jsx)(i.p,{children:"Import the following files into your dart code:"}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-dart",children:"import 'package:jitsi_meet_flutter_sdk/jitsi_meet_flutter_sdk.dart';\n"})}),"\n",(0,t.jsx)(i.h3,{id:"usage",children:"Usage"}),"\n",(0,t.jsx)(i.h4,{id:"join-meeting",children:"Join meeting"}),"\n",(0,t.jsxs)(i.p,{children:["Firstly, create a ",(0,t.jsx)(i.code,{children:"JitsiMeet"})," object, then call the method ",(0,t.jsx)(i.code,{children:"join"})," from it with a ",(0,t.jsx)(i.code,{children:"JitsiMeetConferenceOptions"})," object"]}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-dart",children:"var jitsiMeet = JitsiMeet();\nvar options = JitsiMeetConferenceOptions(room: 'jitsiIsAwesome');\njitsiMeet.join(options);\n"})}),"\n",(0,t.jsx)(i.h2,{id:"configuration",children:"Configuration"}),"\n",(0,t.jsx)(i.h3,{id:"ios",children:"iOS"}),"\n",(0,t.jsxs)(i.p,{children:["Make sure in ",(0,t.jsx)(i.code,{children:"Podfile"})," from the ",(0,t.jsx)(i.code,{children:"ios"})," directory you set the ios version ",(0,t.jsx)(i.code,{children:"15.1 or higher"})]}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{children:"platform :ios, '15.1'\n"})}),"\n",(0,t.jsxs)(i.p,{children:["The plugin requests camera and microphone access, make sure to include the required entries for ",(0,t.jsx)(i.code,{children:"NSCameraUsageDescription"})," and ",(0,t.jsx)(i.code,{children:"NSMicrophoneUsageDescription"})," in your ",(0,t.jsx)(i.code,{children:"Info.plist"})," file from the ",(0,t.jsx)(i.code,{children:"ios/Runner"})," directory."]}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-xml",children:"<key>NSCameraUsageDescription</key>\n<string>The app needs access to your camera for meetings.</string>\n<key>NSMicrophoneUsageDescription</key>\n<string>The app needs access to your microphone for meetings.</string>\n"})}),"\n",(0,t.jsx)(i.h3,{id:"android",children:"Android"}),"\n",(0,t.jsxs)(i.p,{children:["Go to ",(0,t.jsx)(i.code,{children:"android/app/build.gradle"})," and make sure that the ",(0,t.jsx)(i.code,{children:"minSdkVersion"})," is set to at least 24`"]}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-gradle",children:"android {\n    ...\n    defaultConfig {\n        ...\n        minSdkVersion 24\n    }\n}\n"})}),"\n",(0,t.jsxs)(i.p,{children:["The ",(0,t.jsx)(i.code,{children:"application:label"})," field from the Jitsi Meet Android SDK will conflict with your application's one . Go to ",(0,t.jsx)(i.code,{children:"android/app/src/main/AndroidManifest.xml"})," and add the tools library and ",(0,t.jsx)(i.code,{children:'tools:replace="android:label"'})," to the application tag."]}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-xml",children:'<manifest xmlns:android="http://schemas.android.com/apk/res/android" \n    xmlns:tools="http://schemas.android.com/tools">\n    <application\n        tools:replace="android:label"\n        android:label="sample_app"\n        android:name="${applicationName}"\n        android:icon="@mipmap/ic_launcher">\n        ...\n    </application>\n</manifest>\n'})}),"\n",(0,t.jsx)(i.h2,{id:"using-the-api",children:"Using the API"}),"\n",(0,t.jsx)(i.h3,{id:"jitsimeet",children:"JitsiMeet"}),"\n",(0,t.jsxs)(i.p,{children:["The ",(0,t.jsx)(i.code,{children:"JitsiMeet"})," class is the entry point for the SDK. It is used to launch the meeting screen and to send and receive all the events."]}),"\n",(0,t.jsxs)(i.ol,{children:["\n",(0,t.jsxs)(i.li,{children:["\n",(0,t.jsx)(i.h4,{id:"jitsimeet-1",children:"JitsiMeet()"}),"\n",(0,t.jsx)(i.p,{children:"The constructor for the class."}),"\n"]}),"\n",(0,t.jsxs)(i.li,{children:["\n",(0,t.jsx)(i.h4,{id:"joinjitsimeetconferenceoptions-options-jitsimeeteventlistener-listener",children:"join(JitsiMeetConferenceOptions options, [JitsiMeetEventListener? listener])"}),"\n",(0,t.jsx)(i.p,{children:"Joins a meeting with the given options and optionally a listener is given"}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.code,{children:"options"})," : meeting options"]}),"\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.code,{children:"listener"})," : event listener for events triggered by the native SDKs"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(i.li,{children:["\n",(0,t.jsx)(i.h4,{id:"hangup",children:"hangUp()"}),"\n",(0,t.jsx)(i.p,{children:"The localParticipant leaves the current meeting."}),"\n"]}),"\n",(0,t.jsxs)(i.li,{children:["\n",(0,t.jsx)(i.h4,{id:"setaudiomutedbool-muted",children:"setAudioMuted(bool muted)"}),"\n",(0,t.jsxs)(i.p,{children:["Sets the state of the localParticipant audio muted according to the ",(0,t.jsx)(i.code,{children:"muted"})," parameter."]}),"\n"]}),"\n",(0,t.jsxs)(i.li,{children:["\n",(0,t.jsx)(i.h4,{id:"setvideomutedbool-muted",children:"setVideoMuted(bool muted)"}),"\n",(0,t.jsxs)(i.p,{children:["Sets the state of the localParticipant video muted according to the ",(0,t.jsx)(i.code,{children:"muted"})," parameter."]}),"\n"]}),"\n",(0,t.jsxs)(i.li,{children:["\n",(0,t.jsxs)(i.h4,{id:"sendendpointtextmessagestring-to-required-string-message",children:["sendEndpointTextMessage(",(0,t.jsx)(i.code,{children:"{String? to, required String message}"}),")"]}),"\n",(0,t.jsxs)(i.p,{children:["Sends a message via the data channel to one particular participant or all of them. If the ",(0,t.jsx)(i.code,{children:"to"})," param is empty, the message will be sent to all the participants in the conference."]}),"\n",(0,t.jsxs)(i.p,{children:["To get the participantId, the ",(0,t.jsx)(i.code,{children:"participantsJoined"})," event should be listened for, which has as a parameter the ",(0,t.jsx)(i.code,{children:"participantId"})," and this should be stored somehow."]}),"\n"]}),"\n",(0,t.jsxs)(i.li,{children:["\n",(0,t.jsx)(i.h4,{id:"togglescreensharebool-enabled",children:"toggleScreenShare(bool enabled)"}),"\n",(0,t.jsxs)(i.p,{children:["Sets the state of the localParticipant screen sharing according to the ",(0,t.jsx)(i.code,{children:"enabled"})," parameter."]}),"\n"]}),"\n",(0,t.jsxs)(i.li,{children:["\n",(0,t.jsx)(i.h4,{id:"openchatstring-to",children:"openChat([String? to])"}),"\n",(0,t.jsxs)(i.p,{children:["Opens the chat dialog. If ",(0,t.jsx)(i.code,{children:"to"})," contains a valid participantId, the private chat with that particular participant will be opened."]}),"\n"]}),"\n",(0,t.jsxs)(i.li,{children:["\n",(0,t.jsxs)(i.h4,{id:"sendchatmessagestring-to-required-string-message",children:["sendChatMessage(",(0,t.jsx)(i.code,{children:"{String? to, required String message}"}),")"]}),"\n",(0,t.jsxs)(i.p,{children:["Sends a chat message to one particular participant or all of them. If the ",(0,t.jsx)(i.code,{children:"to"})," param is empty, the message will be sent to all the participants in the conference."]}),"\n",(0,t.jsxs)(i.p,{children:["To get the participantId, the ",(0,t.jsx)(i.code,{children:"participantsJoined"})," event should be listened for, which has as a parameter the ",(0,t.jsx)(i.code,{children:"participantId"})," and this should be stored somehow."]}),"\n"]}),"\n",(0,t.jsxs)(i.li,{children:["\n",(0,t.jsx)(i.h4,{id:"closechat",children:"closeChat()"}),"\n",(0,t.jsx)(i.p,{children:"Closes the chat dialog."}),"\n"]}),"\n",(0,t.jsxs)(i.li,{children:["\n",(0,t.jsx)(i.h4,{id:"retrieveparticipantsinfo",children:"retrieveParticipantsInfo()"}),"\n",(0,t.jsxs)(i.p,{children:["Sends an event that will trigger the ",(0,t.jsx)(i.code,{children:"participantsInfoRetrieved"})," event which will contain participants' information"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(i.h3,{id:"jitsimeetconferenceoptions",children:"JitsiMeetConferenceOptions"}),"\n",(0,t.jsx)(i.p,{children:"This object encapsulates all the options that can be tweaked when joining a conference."}),"\n",(0,t.jsx)(i.p,{children:"Example:"}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-dart",children:'var options = JitsiMeetConferenceOptions(\n      serverURL: "https://meet.jit.si",\n      room: "jitsiIsAwesomeWithFlutter",\n      configOverrides: {\n        "startWithAudioMuted": false,\n        "startWithVideoMuted": false,\n        "subject" : "Jitsi with Flutter",\n      },\n      featureFlags: {\n        "unsaferoomwarning.enabled": false\n      },\n      userInfo: JitsiMeetUserInfo(\n          displayName: "Flutter user",\n          email: "user@example.com"\n      ),\n    );\n'})}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsxs)(i.li,{children:["\n",(0,t.jsxs)(i.p,{children:["All the values that can be added to the ",(0,t.jsx)(i.code,{children:"configOverrides"})," can be found ",(0,t.jsx)(i.a,{href:"https://github.com/jitsi/jitsi-meet/blob/master/config.js",children:"here"}),"."]}),"\n"]}),"\n",(0,t.jsxs)(i.li,{children:["\n",(0,t.jsxs)(i.p,{children:["All the values that can be added to the ",(0,t.jsx)(i.code,{children:"featureFlags"})," can be found ",(0,t.jsx)(i.a,{href:"https://github.com/jitsi/jitsi-meet/blob/master/react/features/base/flags/constants.ts",children:"here"}),"."]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(i.h4,{id:"jitsimeetuserinfostring-displayname-string-email-string-avatar",children:["JitsiMeetUserInfo(",(0,t.jsx)(i.code,{children:"{String displayName, String email, String avatar}"}),")"]}),"\n",(0,t.jsx)(i.p,{children:"The constructor for the JitsiMeetUserInfo."}),"\n",(0,t.jsx)(i.p,{children:"P.S. the avatar should be an url."}),"\n",(0,t.jsx)(i.h3,{id:"jitsimeeteventlistener",children:"JitsiMeetEventListener"}),"\n",(0,t.jsx)(i.p,{children:"This class intends to be used as a listener for events that come from the native sdks. It will receive as arguments the event handlers"}),"\n",(0,t.jsx)(i.h4,{id:"conferencejoinedstring-url",children:"conferenceJoined(String url)"}),"\n",(0,t.jsx)(i.p,{children:"Called when a conference was joined."}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.code,{children:"url"})," : the conference URL"]}),"\n"]}),"\n",(0,t.jsx)(i.h4,{id:"conferenceterminatedstring-url-object-error",children:"conferenceTerminated(String url, Object? error)"}),"\n",(0,t.jsx)(i.p,{children:"Called when the active conference ends, be it because of user choice or because of a failure."}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.code,{children:"url"})," : the conference URL"]}),"\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.code,{children:"error"})," : missing if the conference finished gracefully, otherwise contains the error message"]}),"\n"]}),"\n",(0,t.jsx)(i.h4,{id:"conferencewilljoinstring-url",children:"conferenceWillJoin(String url)"}),"\n",(0,t.jsx)(i.p,{children:"Called before a conference is joined."}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsx)(i.li,{children:"url: the conference URL"}),"\n"]}),"\n",(0,t.jsx)(i.h4,{id:"participantjoinedstring-email-string-name-string-role-string-participantid",children:"participantJoined(String? email, String? name, String? role, String? participantId)"}),"\n",(0,t.jsx)(i.p,{children:"Called when a participant has joined the conference."}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.code,{children:"email"})," : the email of the participant. It may not be set if the remote participant didn't set one."]}),"\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.code,{children:"name"})," : the name of the participant."]}),"\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.code,{children:"role"})," : the role of the participant."]}),"\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.code,{children:"participantId"})," : the id of the participant."]}),"\n"]}),"\n",(0,t.jsx)(i.h4,{id:"participantleftstring-participantid",children:"participantLeft(String? participantId)"}),"\n",(0,t.jsx)(i.p,{children:"Called when a participant has left the conference."}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.code,{children:"participantId"})," : the id of the participant that left."]}),"\n"]}),"\n",(0,t.jsx)(i.h4,{id:"audiomutedchangedbool-muted",children:"audioMutedChanged(bool muted)"}),"\n",(0,t.jsx)(i.p,{children:"Called when the local participant's audio is muted or unmuted."}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.code,{children:"muted"})," : a boolean indicating whether the audio is muted or not."]}),"\n"]}),"\n",(0,t.jsx)(i.h4,{id:"videomutedchangedbool-muted",children:"videoMutedChanged(bool muted)"}),"\n",(0,t.jsx)(i.p,{children:"Called when the local participant's video is muted or unmuted."}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.code,{children:"muted"})," : a boolean indicating whether the video is muted or not."]}),"\n"]}),"\n",(0,t.jsx)(i.h4,{id:"endpointtextmessagereceivedstring-senderid-string-message",children:"endpointTextMessageReceived(String senderId, String message)"}),"\n",(0,t.jsx)(i.p,{children:"Called when an endpoint text message is received."}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.code,{children:"senderId"})," : the participantId of the sender"]}),"\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.code,{children:"message"})," : the content."]}),"\n"]}),"\n",(0,t.jsx)(i.h4,{id:"screensharetoggledstring-participantid-bool-sharing",children:"screenShareToggled(String participantId, bool sharing)"}),"\n",(0,t.jsx)(i.p,{children:"Called when a participant starts or stops sharing his screen."}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.code,{children:"participantId"})," : the id of the participant"]}),"\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.code,{children:"sharing"})," : the state of screen share"]}),"\n"]}),"\n",(0,t.jsx)(i.h4,{id:"chatmessagereceivedstring-senderid-string-message-bool-isprivate-string-timestamp",children:"chatMessageReceived(String senderId, String message, bool isPrivate, String? timestamp)"}),"\n",(0,t.jsx)(i.p,{children:"Called when a chat text message is received."}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.code,{children:"senderId"})," : the ID of the participant that sent the message."]}),"\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.code,{children:"message"})," : the content of the message."]}),"\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.code,{children:"isPrivate"})," : true if the message is private, false otherwise."]}),"\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.code,{children:"timestamp"})," : the (optional) timestamp of the message."]}),"\n"]}),"\n",(0,t.jsx)(i.h4,{id:"chattoggledbool-isopen",children:"chatToggled(bool isOpen)"}),"\n",(0,t.jsx)(i.p,{children:"Called when the chat dialog is opened or closed."}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.code,{children:"isOpen"})," : true if the chat dialog is open, false otherwise."]}),"\n"]}),"\n",(0,t.jsx)(i.h4,{id:"participantsinforetrievedstring-participantsinfo",children:"participantsInfoRetrieved(String participantsInfo)"}),"\n",(0,t.jsxs)(i.p,{children:["Called when the ",(0,t.jsx)(i.code,{children:"retrieveParticipantsInfo"})," action is called"]}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.code,{children:"participantsInfo"})," : a list of participants' information as a string."]}),"\n"]}),"\n",(0,t.jsx)(i.h4,{id:"readytoclose",children:"readyToClose()"}),"\n",(0,t.jsx)(i.p,{children:"Called when the SDK is ready to be closed. No meeting is happening at this point."}),"\n",(0,t.jsx)(i.h4,{id:"example-of-listener",children:"Example of listener:"}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-dart",children:'var listener = JitsiMeetEventListener(\n      conferenceJoined: (url) {\n        debugPrint("conferenceJoined: url: $url");\n      },\n\n      participantJoined: (email, name, role, participantId) {\n        debugPrint(\n          "participantJoined: email: $email, name: $name, role: $role, "\n              "participantId: $participantId",\n        );\n        participants.add(participantId!);\n      },\n\n      chatMessageReceived: (senderId, message, isPrivate) {\n        debugPrint(\n          "chatMessageReceived: senderId: $senderId, message: $message, "\n              "isPrivate: $isPrivate",\n        );\n      },\n\n      readyToClose: () {\n        debugPrint("readyToClose");\n      },\n    );\n'})})]})}function h(e={}){const{wrapper:i}={...(0,s.R)(),...e.components};return i?(0,t.jsx)(i,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},8453:(e,i,n)=>{n.d(i,{R:()=>d,x:()=>a});var t=n(6540);const s={},r=t.createContext(s);function d(e){const i=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function a(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:d(e.components),t.createElement(r.Provider,{value:i},e.children)}}}]);