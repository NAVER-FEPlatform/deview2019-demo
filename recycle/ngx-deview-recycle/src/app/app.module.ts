import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxDeviewRecycleComponent } from 'projects/ngx-deview-recycle/src/public-api';

@NgModule({
  declarations: [
    AppComponent,
    NgxDeviewRecycleComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
