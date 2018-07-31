import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpService } from '../service/http.service';
import { DataService } from '../service/data.service';
import { ChatService } from '../service/chat.service';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  email: string;
  password: string;

  constructor(private fb: FormBuilder, public router: Router, public httpService: HttpService, public dataService: DataService, public chatService: ChatService) {
    this.loginForm = fb.group({
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]]
    })
  }

  ngOnInit() {
  }

  goToSignUp = () => {
    this.router.navigate(['/signup'])
  }

  onKeyUp = (event) => {
    if (this.loginForm.valid && event.keyCode == 13) {
      this.doLogin();
    }
  }

  doLogin = () => {
    let requestBodyData = {
      "email": this.email || "",
      "password": this.password || ""
    }
    let action = 'login';
    this.httpService.callApi({ action, requestBodyData })
      .subscribe(
        (res) => {

          if (res.status == 200 && res.userDetails) {
            this.dataService.isLoggedIn = true;
            this.dataService.loginId = res.userDetails._id;
            this.dataService.loginEmail = res.userDetails.email;
            this.dataService.loginName = res.userDetails.name;

            this.router.navigate(['/chat'])

          }
        },
        err => {
          console.log("err", err);
        }
      );
  }
}
