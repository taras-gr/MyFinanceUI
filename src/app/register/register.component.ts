import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerModel = {
    FirstName: '',
    LastName: '',
    Email: '',
    Password: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

}
