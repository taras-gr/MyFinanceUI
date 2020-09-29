import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrls: ['./welcomepage.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class WelcomepageComponent implements OnInit {
  staticFilesDir = '';

  constructor() {
    this.staticFilesDir = environment.staticFilesDir;  
  }

  ngOnInit(): void {
  }  

  setBackgroundImageForWelcomePage():string{
    return "background-image: url(" + this.staticFilesDir + "/assets/welcomePage.png);";
  }
}