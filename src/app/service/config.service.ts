import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  HOST:string;
  PORT:string;
  constructor() {
    this.HOST='192.168.1.113';
    this.PORT='7000'
   }
}
