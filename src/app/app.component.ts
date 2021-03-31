import { Component } from '@angular/core';
import { AgoraService } from './agora.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private agoraService: AgoraService) { }
  
  onStartCallHandler(event: MouseEvent) {
    console.log("Event transferred to App component => Starting a Video Call...");
    this.agoraService.joinCall().then(r => "Join OK...");
  }

  onLeaveCallHandler(event: MouseEvent) {
    console.log("Event transferred to App component => Leaving the call..");
    this.agoraService.leaveCall().then(r => "Leave OK...");
  }

  onJoinCallHandler(event: MouseEvent) {
    console.log("Joining a call...");
    //this.agoraService.joinCall();
  }
}
