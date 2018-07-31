import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  isLoggedIn:boolean=false;
  loginId:any='';
  loginEmail:any='';
  loginName:any=''

  constructor() { }

  isUserLoggedIn = () => {
    return this.isLoggedIn;
  }
}
