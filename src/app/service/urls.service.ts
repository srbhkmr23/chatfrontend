import { Injectable } from '@angular/core';
import {ConfigService} from './config.service'
@Injectable({
  providedIn: 'root'
})
export class UrlsService {
  urlObject:any;
  constructor(configService:ConfigService) {
    let urlString = 'http://'+configService.HOST + ':' + configService.PORT + '/';
    this.urlObject = {
      'login':{ 
        'method':'POST',
        'url': urlString + 'user/login'
      },
      'signup':{
        'method':'PUT',
        'url': urlString + 'user/signup'
      },
      'allUsers':{
        'method':'GET',
        'url': urlString + 'user/all'
      }
    }
  }
}