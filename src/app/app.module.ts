import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModeratorViewComponent } from './moderator-view/moderator-view.component';
import { SpeakerViewComponent } from './speaker-view/speaker-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ModeratorViewComponent,
    SpeakerViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
