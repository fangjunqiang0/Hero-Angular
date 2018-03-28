import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  phoneNum: string;
  code: string;
  password: string;
  constructor() { }

  ngOnInit() {
  }

  loginBtnClick() {
    if (this.phoneNum === '' || this.code === '' || this.password === '') {
      alert('请填写所有数据');
      return;
    }
    console.log(this.phoneNum + this.code + this.password);
  }
}
