import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  

  constructor(public userService: UserService, public router: Router) { }
  formModel = {
    FirstName : '',
    LastName : '',
    Email : ''
  }
  ngOnInit(): void {
    this.userService.userProfile().subscribe(
      (res: any) => {
        console.log(res);
        this.formModel.FirstName = res.firstName;
        this.formModel.LastName = res.lastName;
        this.formModel.Email = res.email;
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
