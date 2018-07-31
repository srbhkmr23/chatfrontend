import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';



import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ChatComponent } from './chat/chat.component';
import {appRoutes} from './app.routes';

import { ChatService } from './service/chat.service';
import { DataService } from './service/data.service';
import { UrlsService } from './service/urls.service';
import { HttpService } from './service/http.service';
import { ConfigService } from './service/config.service';
import { AuthGuardService } from './service/authGuard.service';


import {SearchPipe} from './pipes/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ChatComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes,{ enableTracing: true }),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [ChatService,DataService,UrlsService,HttpService,ConfigService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }