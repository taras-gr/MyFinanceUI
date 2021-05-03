import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formModel = {
    Email : '',
    Password : ''  
  }

  constructor(public service: UserService, public router: Router) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    let token = await this.service.login();
    
    this.router.navigateByUrl('/userpage');
  }

}
