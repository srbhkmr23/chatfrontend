import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../service/http.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: any;
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private fb: FormBuilder, public router: Router, public httpService: HttpService) {
    this.signupForm = fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    })
  }

  goToLogin = () => {
    this.router.navigate(['/login'])
  }

  doSubmit = () => {
    if (this.password != this.confirmPassword) {
      alert('Password and confirm password not match.');
      return;
    }

    let requestBodyData = {
      "name": this.name || "",
      "gender": "male",
      "contact": "89900534508",
      "address": "Noida",
      "email": this.email || "",
      "password": this.password || ""
    }
    let action = 'signup';
    this.httpService.callApi({ action, requestBodyData })
      .subscribe((res) => {
        if (res.status == 200 && res.userData) {
          this.resetForm();
          alert("Registration Success. Please do login")
        }
      });
  }

  resetForm = () => {
    this.name = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }
}