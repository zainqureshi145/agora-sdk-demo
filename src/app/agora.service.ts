import { Injectable } from '@angular/core';
import AgoraRTC, {IAgoraRTCClient} from 'agora-rtc-sdk-ng';

const client: IAgoraRTCClient = AgoraRTC.createClient({mode: 'rtc', codec: 'h264'});

let localTrack = {
  videoTrack: null,
  audioTrack: null,
};

let remoteUsers = {};

let options = {
  appId: "9f7a20c68b094028802f1129c24b1fb9",
  channel: "test",
  uid: null,
  token: "0069f7a20c68b094028802f1129c24b1fb9IAB0hAqcJdbdmfTMntGCwyd2QE24LqvhBwuk2VNqA6p04gx+f9gAAAAAEABqNCIieLllYAEAAQB5uWVg"
};


@Injectable({
  providedIn: 'root'
})
export class AgoraService {
  constructor() { }

  // Start A Basic Call
  async joinCall() {
    // Callback functions run on these listeners
    client.on("user-published", this.handleUserPublished);
    client.on("user-unpublished", this.handleUserUnpublished);

    // Create audio and video localTrack
    [options.uid, localTrack.audioTrack, localTrack.videoTrack] = await Promise.all([
        client.join(options.appId, options.channel, options.token || null),
        AgoraRTC.createMicrophoneAudioTrack(),
        AgoraRTC.createCameraVideoTrack()
    ]);

    // Play localTrack
    localTrack.videoTrack.play('local-stream');
    localTrack.audioTrack.play();

    // Publish
    await client.publish(Object.values(localTrack));
    console.log("publish success!");
  }// JoinCall End

  // Subscribe
  async subscribe(user, mediaType){
    const uid = await user.id;
    console.error("THIS IS THE USER.ID: ", uid);
    // Subscribe to a remote user
    await client.subscribe(user, mediaType);
  }

  handleUserPublished(user, mediaType){
    console.log("Listen to 'user-published' event....");
    const id = user.uid;
    remoteUsers[id] = user;
    this.subscribe(user, mediaType).then(r => {
      console.log("Subscribe Success!");
      // Check mediaType and append media stream
      if(mediaType === 'video'){
        user.videoTrack.play('remote-stream');
      }
      if(mediaType === 'audio'){
        user.audioTrack.play();
      }
    });
  }

  handleUserUnpublished(user){
    console.log("Listen to 'user-unpublished' event....");
    const id = user.uid;
    delete remoteUsers[id];
  }

  // Leave Call
  async leaveCall(){
      for (let trackName in localTrack) {
        let track = localTrack[trackName];
        if(track) {
          track.stop();
          track.close();
          localTrack[trackName] = undefined;
        }
      }
      // remove remote users and player views
      remoteUsers = {};
      // leave the channel
      await client.leave();
      console.log("client leaves channel success");
  }
}
