import { Injectable } from '@angular/core';
import AgoraRTC, {IAgoraRTCClient} from 'agora-rtc-sdk-ng';

var rtc = {
  // For the local client.
  host: null,
  // For the local audio and video tracks.
  localAudioTrack: null,
  localVideoTrack: null,
  joined: false,
  published: false,
  localStream: null,
  remoteStreams: [],
  remoteUsers: null,
  params: {
    uid: null,
  }

};

var options = {
  // Pass your app ID here.
  appId: "9f7a20c68b094028802f1129c24b1fb9",
  // Set the channel name.
  channel: "test",
  // Pass a token if your project enables the App Certificate.
  key: '',
  secret: '',
  uid: [],
  token: "0069f7a20c68b094028802f1129c24b1fb9IADAokRo6o7kQh2OO+kvFR00T+6NOXmfxD3Sjek48iI+KQx+f9gAAAAAEAC5X9YGE1djYAEAAQASV2Ng"
};


@Injectable({
  providedIn: 'root'
})
export class AgoraService {
  constructor() { }

  //Start A Basic Call
  async startCall() {

      // Create a Host
      rtc.host = AgoraRTC.createClient({mode: 'live', codec: 'h264', role: 'host'});
      // Join
      const uid = rtc.host.join(options.appId, options.channel, options.token);
      console.log("join channel: " + options.channel + " success, uid: " + await (uid));
      // Create a local audio and video tracks
      rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
      rtc.localAudioTrack.play();
      rtc.localVideoTrack.play('local-stream');
      // Publish a local stream
      await rtc.host.publish([rtc.localAudioTrack, rtc.localVideoTrack], (err) => {
        console.log("publish failed");
        console.error(err);
      });
      rtc.remoteUsers = rtc.host.on("user-published", (evt) => {
        console.log("Host Published", evt);
        console.log(rtc.remoteUsers);
      });
  }

  async joinCall() {
    console.log("Inside AgoraService joinCall() Function");
      rtc.host.on("connection-state-change", (evt) => {
        console.log("audience", evt)
      });

      rtc.host.on("stream-added", (evt) => {
        var remoteStream = evt.stream;
        var id = remoteStream.getId();
        if (id !== rtc.params.uid) {
          rtc.host.subscribe(remoteStream, (err) => {
            console.log("stream subscribe failed", err);
          });
        }
        console.log('stream-added remote-uid: ', id);
      });

      rtc.host.on("stream-removed", (evt) => {
        var remoteStream = evt.stream;
        var id = remoteStream.getId();
        console.log('stream-removed remote-uid: ', id);
      });

      rtc.host.on("stream-subscribed", (evt) => {
        var remoteStream = evt.stream;
        var id = remoteStream.getId();
        remoteStream.play("remote_video_");
        console.log('stream-subscribed remote-uid: ', id);
      });

      rtc.host.on("stream-unsubscribed", (evt) => {
        var remoteStream = evt.stream;
        var id = remoteStream.getId();
        remoteStream.pause("remote_video_");
        console.log('stream-unsubscribed remote-uid: ', id);
      });
    // rtc.audience = AgoraRTC.createClient({ mode: "rtc", codec: "h264", role: "audience" });
    // const uid = await rtc.audience.join(options.appId, "test", options.token);
    // rtc.remoteAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    // rtc.remoteVideoTrack = await AgoraRTC.createCameraVideoTrack();
    // await rtc.audience.publish([rtc.remoteAudioTrack, rtc.remoteVideoTrack]);
    // rtc.audience.subscribe(rtc.audience, "video");
    // console.log("SUBSCRIBED??");
    // //rtc.remoteVideoTrack.play('remote-stream');
    //
    // ///////////////////////////////////////
    //
    // rtc.audience.on("user-published", async (user, mediaType) => {
    //   await rtc.audience.subscribe(rtc.host, mediaType);
    //   if (mediaType === "video") {
    //     console.log("subscribe video success");
    //     user.remoteVideoTrack.play('remote-stream');
    //   }
    //   if (mediaType === "audio") {
    //     console.log("subscribe audio success");
    //     user.remoteAudioTrack.play();
    //   }
    // });
  }

  async endCall() {
    console.log("Inside AgoraService endCall() Function");
    // rtc.localAudioTrack.close();
    // rtc.localVideoTrack.close();
    // rtc.remoteAudioTrack.close();
    // rtc.remoteVideoTrack.close();
    // await rtc.host.leave();
    // await rtc.audience.leave();
    console.log("Disconnected...");
  }
}
