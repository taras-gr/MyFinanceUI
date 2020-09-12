import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

export class PeriodicElement {
  title: string;
  expenseDate: number;
  category: number;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = ['title'];
  dataSource: PeriodicElement[];

  constructor(public userService : UserService) { }

  ngOnInit(): void {
    const userName = localStorage.getItem('userName');
    this.userService.getUserCategories(userName).subscribe(
      (res: any) => {
        console.log(res);
        this.dataSource = res;
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
