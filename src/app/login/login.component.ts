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

  onSubmit() {
    this.service.login().subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userName', res.userName);
        console.log(res.token);
        this.router.navigateByUrl('/userpage');
        //this.router.navigateByUrl('/home');
      },
      err => {
        // if (err.status == 400)
        //   //this.toastr.error('Incorrect username or password.', 'Authentication failed.');
        // else
        //   console.log(err);
      }
    );
  }

}
