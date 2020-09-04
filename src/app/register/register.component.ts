import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formModel = {
    FirstName : '',
    LastName : '',
    Email : '',
    Password : ''
  }

  constructor(public service: UserService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        console.log(res.token);
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
