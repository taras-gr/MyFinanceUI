import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

export class PeriodicElement {
  title: string;
  expenseDate: number;
  category: number;
}

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  displayedColumns: string[] = ['title', 'expenseDate', 'category'];
  dataSource: PeriodicElement[];
  
  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserExpenses('ostap2000').subscribe(
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
