import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ChatService } from '../service/chat.service';
import { HttpService } from '../service/http.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  title = 'app';
  heroForm: any;
  to = '';
  from = '';
  msg = '';
  loginName = '';
  searchKeyword = '';
  toUserObject = {};
  usersList: any = [];
  allMessageList = [];
  allOnlineUsersList: any = {};
  notificationsObject: any = {};
  constructor(private fb: FormBuilder, public chatService: ChatService, public httpService: HttpService, public dataService: DataService) {
  }


  ngOnInit() {
    let requestBodyData = {}
    let action = 'allUsers';
    this.from = this.dataService.loginEmail || '';
    this.loginName = this.dataService.loginName || '';

    this.httpService.callApi({ action, requestBodyData })
      .subscribe(
        (res) => {

          if (res.status == 200) {
            console.log(res)
            this.usersList = res.userList || [];
          }
        },
        err => {
          console.log("err", err);
        }
      );
    this.connectMe();


    window.addEventListener("beforeunload", (e) => {
      this.doOffline();
    });
  }

  doOffline = () => {
    let from = this.dataService.loginEmail || '';
    this.chatService.doOffline(from);
  }


  connectMe = () => {
    this.chatService.getConnect(this.dataService.loginEmail).subscribe(res => {

      // detect whenever new message get
      if (res['type'] == 'getMessage') {
        let to = this.toUserObject['email'] || '';
        let from = this.from || '';

        // identify the message from and add message to that user chat box
        if ((res['data'].senderId == from && res['data'].receiverId == to) || (res['data'].senderId == to && res['data'].receiverId == from)) {
          this.allMessageList.push(res['data'])
          setTimeout(this.scrollBottom, 0)
        }

        //  check notification count and last message for show notification
        if (res['data'].senderId != from) {
          if (this.notificationsObject[res['data'].senderId]) {
            this.notificationsObject[res['data'].senderId] = {
              count: this.notificationsObject[res['data'].senderId]['count'] + 1,
              data: res['data']
            }
          }
          else {
            this.notificationsObject[res['data'].senderId] = {
              count: 1,
              data: res['data']
            }
          }
        }
      }

      if (res['type'] == 'getAllMessage') {
        this.allMessageList = res['data'] || [];
        setTimeout(this.scrollBottom, 0)
      }

      if (res['type'] == 'newconnection') {
        console.log("newconnection", res['data']['onlineUserList'])
        this.allOnlineUsersList = res['data']['onlineUserList'] || {};
      }

    }, err => {
      console.log(err);
    });
  }

  onSelectFriend = (friend) => {
    this.toUserObject = friend || {};
    this.getAllMessage();

    this.notificationsObject[friend.email] = 0;
  }

  sendMessage = () => {
    if (this.msg == '' || this.msg == undefined) {
      return;
    }

    let to = this.toUserObject['email'] || '';
    let from = this.dataService.loginEmail || '';

    if (to == '' || from == '') {
      return;
    }

    let data = {
      from: from,
      to: to,
      msg: this.msg
    };

    this.chatService.sendMessage(data);
    this.msg = "";
  }

  getAllMessage = () => {
    let to = this.toUserObject['email'] || '';
    let from = this.dataService.loginEmail || '';
    let data = {
      from: from,
      to: to
    };
    this.chatService.getAllMessage(data);
  }

  onKeyUp = (event) => {
    if (event.keyCode == 13) {
      this.sendMessage();
    }
  }

  scrollBottom = () => {
    var element = document.getElementById('messages');
    element.scrollTop = 1000000//element.clientHeight;
  }
}
