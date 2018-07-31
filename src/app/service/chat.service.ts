import { Injectable } from '@angular/core';

// import { Subject } from 'rxjs/Subject';
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

import { ConfigService } from './config.service'

@Injectable()
export class ChatService {
  private url = '';//'http://192.168.1.113:7000';  
  private socket;

  constructor(public configService: ConfigService) {
    this.url = 'http://' + configService.HOST + ':' + configService.PORT
  }

  sendMessage(message) {
    if (this.socket) {
      console.log("emit")
      this.socket.emit('sendMessage', message);
    }
  }

  doOffline = (userId) => {
    this.socket.emit('offline', userId);
  }

  getConnect(email) {
    let observable = new Observable(observer => {
      this.socket = io(this.url, { query: `email=${email}` });


      this.socket.on('newUserConnect', (data) => {
        observer.next({ type: 'newUserConnect', data: data });
      });

      this.socket.on('getMessage', (data) => {
        observer.next({ type: 'getMessage', data: data });
      });

      this.socket.on('getAllMessage', (data) => {
        observer.next({ type: 'getAllMessage', data: data });
      });

      this.socket.on('newconnection', (data) => {
        observer.next({ type: 'newconnection', data: data });
      });

      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }


  getAllMessage = (data) => {
    if (this.socket) {
      this.socket.emit('getAllMessage', data);
    }

  }
}