import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxDeviewInfiniteComponent } from 'projects/ngx-deview-infinite/src/public-api';

@NgModule({
  declarations: [
    AppComponent,
    NgxDeviewInfiniteComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
