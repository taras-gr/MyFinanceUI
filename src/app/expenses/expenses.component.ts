import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { UserService } from '../shared/user.service';
import { ExpenseService } from '../shared/expense.service';
import { CreatedSnackBarComponent } from './created-snack-bar/created-snack-bar.component';
import { Expense } from '../models/expense';
import { Category } from '../models/category'
import { GetExpensesResultPaginationHeader } from '../models/getExpensesResultPaginationHeader';
import { CategoryService } from '../shared/category.service';
import { DeletedSnackBarComponent } from './deleted-snack-bar/deleted-snack-bar.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements AfterViewInit {
  displayedColumns: string[] = ['title', 'category', 'expenseDate', 'cost', 'actions'];
  data: Expense[] = [];
  userName = localStorage.getItem('userName');

  resultsLength = 0;
  isLoadingResults = true;
  durationInSeconds = 5;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  value;
  categories: Category[];
  
  constructor(private snackBar: MatSnackBar, 
    private categoryService: CategoryService, 
    public userService: UserService,
    public expenseService: ExpenseService) { }

  ngAfterViewInit(): void {
    const userName = localStorage.getItem('userName');    
    this.categoryService.getUserCategories(userName)
      .subscribe(
        (data: Category[]) => this.categories = data,
        (err: any) => console.log(err)
      );

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          var results : Observable<HttpResponse<Expense[]>>;
          results = this.expenseService
            .getUserExpenses(userName, this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
            results.subscribe((res: any) => {
              let paginationHeaderValue: GetExpensesResultPaginationHeader;
              paginationHeaderValue = JSON.parse(res.headers.get('X-Pagination'));
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
    this.expenseService.postNewExpense(userName).subscribe(
      () => {
        this.ngAfterViewInit();
        this.snackBar.openFromComponent(CreatedSnackBarComponent, {
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

  deleteExpense(expenseId: string, expenseTitle: string) {
    const userName = localStorage.getItem('userName');
    this.expenseService.deleteUserExpense(userName, expenseId).subscribe(
      () => {
        this.ngAfterViewInit();
        this.snackBar.openFromComponent(DeletedSnackBarComponent, {
          duration: this.durationInSeconds * 1000,
          data: { title: expenseTitle }
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

  updateExpense(row: any) {    
    const userName = localStorage.getItem('userName');
    this.expenseService.updateUserExpenseById(userName, row).subscribe(
      () => {
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