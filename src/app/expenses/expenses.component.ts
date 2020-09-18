import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { UserService } from '../shared/user.service';
import { CreatedSnackBarComponent } from './created-snack-bar/created-snack-bar.component';

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
export class ExpensesComponent implements AfterViewInit {
  displayedColumns: string[] = ['title', 'category', 'expenseDate', 'cost'];
  data: Expense[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  durationInSeconds = 5;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  value;
  foods: Food[] = [
    {value: 'Gadgets', viewValue: 'Gadgets'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  
  constructor(private _snackBar: MatSnackBar, public userService: UserService) { }

  ngAfterViewInit(): void {
    const userName = localStorage.getItem('userName');
    

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          var results : Observable<HttpResponse<Expense[]>>;
          results = this.userService
            .getUserExpenses(userName, this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
            results.subscribe((res: any) => {
              let paginationHeaderValue: GetExpensesResultPaginationHeader;
              paginationHeaderValue = JSON.parse(res.headers.get('X-Pagination'));
              console.log(res.headers.get('X-Pagination'));
              this.resultsLength = paginationHeaderValue.totalCount;
            });          
          
          return results;
        }),
        map(data => {
          this.isLoadingResults = false;
          return data.body;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  } 
  
  addNewExpense() {
    const userName = localStorage.getItem('userName');
    this.userService.postNewExpense(userName).subscribe(
      (res: any) => {        
        this.data.pop();
        this.data.push(res);
        console.log(res);
        this.ngAfterViewInit();
        this._snackBar.openFromComponent(CreatedSnackBarComponent, {
          duration: this.durationInSeconds * 1000,
        });
      },
      err => {
        // if (err.status == 400)
        //   //this.toastr.error('Incorrect username or password.', 'Authentication failed.');
        // else
        //   console.log(err);
      }
    );
  }

  openSnackBar() {
    
  }

}

interface Food {
  value: string;
  viewValue: string;
}

// export interface GetExpensesResult {
//   value: Expense[];
// }

export interface GetExpensesResultPaginationHeader {
  totalCount: number;
  PageSize: number;
  CurrentPage: number;
  TotalPages: number;
}

export interface Expense {
  id: string;
  title: string;
  category: string;
  expenseDate: Date;
  cost: number;
}