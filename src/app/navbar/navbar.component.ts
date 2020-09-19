import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userName = localStorage.getItem('userName');

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onLogOut() {
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    console.log(localStorage.getItem('token'));
    this.router.navigateByUrl('/');
  }

}
