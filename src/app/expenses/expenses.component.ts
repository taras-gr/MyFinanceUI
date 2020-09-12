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
  value;
  foods: Food[] = [
    {value: 'Gadgets', viewValue: 'Gadgets'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  
  constructor(public userService: UserService) { }

  ngOnInit(): void {
    const userName = localStorage.getItem('userName');
    this.userService.getUserExpenses(userName).subscribe(
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

  addNewExpense() {
    const userName = localStorage.getItem('userName');
    this.userService.postNewExpense(userName).subscribe(
      (res: any) => {
        this.dataSource.join(res);
        console.log(res);
        //this.router.navigateByUrl('/userpage');
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

interface Food {
  value: string;
  viewValue: string;
}
