import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
//import { AgoraService } from '../agora.service';

@Component({
  selector: 'app-moderator-view',
  templateUrl: './moderator-view.component.html',
  styleUrls: ['./moderator-view.component.css']
})
export class ModeratorViewComponent implements OnInit {


  @Output() startCallEvent = new EventEmitter<MouseEvent>();
  @Output() leaveCallEvent = new EventEmitter<MouseEvent>();
  @Output() joinCallEvent = new EventEmitter<MouseEvent>();

  //Dependency Injection AgoraService
  //constructor(private agoraService: AgoraService) { }
  constructor(){}

  ngOnInit(): void {
  }

  onStartCallHandler(event: MouseEvent) {
    this.startCallEvent.emit(event);
    //console.log("Starting a Video Call...", event);
  }

  onLeaveCallHandler(event: MouseEvent) {
    this.leaveCallEvent.emit(event);
    //console.log("Leaving the call..", event);
  }

  onJoinCallHandler(event: MouseEvent) {
    this.joinCallEvent.emit(event);
  }
}
