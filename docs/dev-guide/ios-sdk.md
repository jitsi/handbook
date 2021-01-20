---
id: dev-guide-ios-sdk
title: iOS SDK
---

The Jitsi Meet iOS SDK provides the same user experience as the Jitsi Meet app,
in a customizable way which you can embed in your apps.

## Sample applications using the SDK

If you want to see how easy integrating the Jitsi Meet SDK into a native application is, take a look at the
[sample applications repository](https://github.com/jitsi/jitsi-meet-sdk-samples).

## Usage

There are 2 ways to integrate the SDK into your project:

- Using CocoaPods
- Building it yourself

### Using CocoaPods

The recommended way for using the SDK is by using CocoaPods. In order to
do so, add the `JitsiMeetSDK` dependency to your existing `Podfile` or create
a new one following this example:

```
platform :ios, '11.0'

workspace 'JitsiMeetSDKTest.xcworkspace'

target 'JitsiMeetSDKTest' do
  project 'JitsiMeetSDKTest.xcodeproj'

  pod 'JitsiMeetSDK'
end

post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['ENABLE_BITCODE'] = 'NO'
    end
  end
end
```

Replace `JitsiMeetSDKTest` with your project and target names.

Bitcode is not supported, so turn it off for your project.

The SDK uses Swift code, so make sure you select `Always Embed Swift Standard Libraries`
in your project.

Since the SDK requests camera and microphone access, make sure to include the
required entries for `NSCameraUsageDescription` and `NSMicrophoneUsageDescription`
in your `Info.plist` file.

In order for app to properly work in the background, select the "audio" and "voip"
background modes.

Last, since the SDK shows and hides the status bar based on the conference state,
you may want to set `UIViewControllerBasedStatusBarAppearance` to `NO` in your
`Info.plist` file.

### Building it yourself

1. Install all required [dependencies](mobile.md).

2. `xcodebuild -workspace ios/jitsi-meet.xcworkspace -scheme JitsiMeet -destination='generic/platform=iOS' -configuration Release archive`

After successfully building Jitsi Meet SDK for iOS, copy
`ios/sdk/JitsiMeet.framework` (if the path points to a symbolic link, follow the
symbolic link) and
`node_modules/react-native-webrtc/ios/WebRTC.framework` into your project.

## API

JitsiMeet is an iOS framework which embodies the whole Jitsi Meet experience and
makes it reusable by third-party apps.

To get started:

1. Add a `JitsiMeetView` to your app using a Storyboard or Interface Builder,
   for example.

2. Then, once the view has loaded, set the delegate in your controller and load
   the desired URL:

```objc
- (void)viewDidLoad {
  [super viewDidLoad];

  JitsiMeetView *jitsiMeetView = (JitsiMeetView *) self.view;
  jitsiMeetView.delegate = self;

  JitsiMeetConferenceOptions *options = [JitsiMeetConferenceOptions fromBuilder:^(JitsiMeetConferenceOptionsBuilder *builder) {
      builder.serverURL = [NSURL URLWithString:@"https://meet.jit.si"];
      builder.room = @"test123";
      builder.audioOnly = YES;
  }];

  [jitsiMeetView join:options];
}
```

### JitsiMeetView class

The `JitsiMeetView` class is the entry point to the SDK. It a subclass of
`UIView` which renders a full conference in the designated area.

#### delegate

Property to get/set the `JitsiMeetViewDelegate` on `JitsiMeetView`.

#### join:JitsiMeetConferenceOptions

Joins the conference specified by the given options.

```objc
  JitsiMeetConferenceOptions *options = [JitsiMeetConferenceOptions fromBuilder:^(JitsiMeetConferenceOptionsBuilder *builder) {
      builder.serverURL = [NSURL URLWithString:@"https://meet.jit.si"];
      builder.room = @"test123";
      builder.audioOnly = NO;
      builder.audioMuted = NO;
      builder.videoMuted = NO;
      builder.welcomePageEnabled = NO;
  }];

  [jitsiMeetView join:options];
```

#### leave

Leaves the currently active conference.

#### hangUp

The localParticipant leaves the current conference.

#### setAudioMuted

Sets the state of the localParticipant audio muted according to the `muted` parameter.

#### sendEndpointTextMessage

Sends a message via the data channel to one particular participant or to all of them.
If the `to` param is empty, the message will be sent to all the participants in the conference.

In order to get the participantId, the `PARTICIPANT_JOINED` event should be listened for,
which `data` includes the id and this should be stored somehow.

#### Universal / deep linking

In order to support Universal / deep linking, `JitsiMeet` offers 2 class
methods that you app's delegate should call in order for the app to follow those
links.

If these functions return NO it means the URL wasn't handled by the SDK. This
is useful when the host application uses other SDKs which also use linking.

```objc
-  (BOOL)application:(UIApplication *)application
continueUserActivity:(NSUserActivity *)userActivity
  restorationHandler:(void (^)(NSArray *restorableObjects))restorationHandler
{
  return [[JitsiMeet sharedInstance] application:application
               continueUserActivity:userActivity
                 restorationHandler:restorationHandler];
}
```

And also one of the following:

```objc
// See https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623073-application?language=objc
- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  return [[JitsiMeet sharedInstance] application:app
                            openURL:url
                            options: options];
}
```

### JitsiMeetViewDelegate

This delegate is optional, and can be set on the `JitsiMeetView` instance using
the `delegate` property.

It provides information about the conference state: was it joined, left, did it
fail?

All methods in this delegate are optional.

#### conferenceJoined

Called when a conference was joined.

The `data` dictionary contains a "url" key with the conference URL.

#### conferenceTerminated

Called when a conference was terminated either by user choice or due to a
failure.

The `data` dictionary contains an "error" key with the error and a "url" key
with the conference URL. If the conference finished gracefully no `error`
key will be present.

#### conferenceWillJoin

Called before a conference is joined.

The `data` dictionary contains a "url" key with the conference URL.

#### enterPictureInPicture

Called when entering Picture-in-Picture is requested by the user. The app should
now activate its Picture-in-Picture implementation (and resize the associated
`JitsiMeetView`. The latter will automatically detect its new size and adjust
its user interface to a variant appropriate for the small size ordinarily
associated with Picture-in-Picture.)

The `data` dictionary is empty.

#### participantJoined

Called when a participant has joined the conference.

The `data` dictionary contains information of the participant that has joined.
Depending of whether the participant is the local one or not, some of them are 
present/missing.
    isLocal
    email
    name
    participantId

#### participantLeft

Called when a participant has left the conference.

The `data` dictionary contains information of the participant that has left.
Depending of whether the participant is the local one or not, some of them are 
present/missing.
    isLocal
    email
    name
    participantId

#### audioMutedChanged

Called when audioMuted state changed.

The `data` dictionary contains a `muted` key with state of the audioMuted for the localParticipant.

#### endpointTextMessageReceived

Called when an endpoint text message is received.

The `data` dictionary contains a `senderId` key with the participantId of the sender and a `message` key with the content.

### Picture-in-Picture

`JitsiMeetView` will automatically adjust its UI when presented in a
Picture-in-Picture style scenario, in a rectangle too small to accommodate its
"full" UI.

Jitsi Meet SDK does not currently implement native Picture-in-Picture on iOS. If
desired, apps need to implement non-native Picture-in-Picture themselves and
resize `JitsiMeetView`.

If `delegate` implements `enterPictureInPicture:`, the in-call toolbar will
render a button to afford the user to request entering Picture-in-Picture.

## Dropbox integration

To setup the Dropbox integration, follow these steps:

1. Add the following to the app's Info.plist and change `<APP_KEY>` to your
Dropbox app key:
```
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLName</key>
    <string></string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>db-<APP_KEY></string>
    </array>
  </dict>
</array>
<key>LSApplicationQueriesSchemes</key>
<array>
  <string>dbapi-2</string>
  <string>dbapi-8-emm</string>
</array>
```

2. Make sure your app calls the Jitsi Meet SDK universal / deep linking delegate methods.
