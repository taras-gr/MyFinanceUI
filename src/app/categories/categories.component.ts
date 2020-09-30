import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from '../models/category';
import { CategoryService } from '../shared/category.service';
import { CategoryCreatedSnackBarComponent } from './category-created-snack-bar/category-created-snack-bar.component';
import { CategoryDeletedSnackBarComponent } from './category-deleted-snack-bar/category-deleted-snack-bar.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = ['title', 'actions'];
  dataSource: Category[];
  value;
  durationInSeconds = 5;
  constructor(private snackBar: MatSnackBar, public categoryService : CategoryService) { }

  ngOnInit(): void {
    const userName = localStorage.getItem('userName');
    this.categoryService.getUserCategories(userName).subscribe(
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

  addNewCategory() {
    const userName = localStorage.getItem('userName');
    this.categoryService.postNewCategory(userName).subscribe(
      () => {
        this.ngOnInit();
        this.snackBar.openFromComponent(CategoryCreatedSnackBarComponent, {
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

  deleteCategory(categoryId: string, categoryTitle: string) {
    const userName = localStorage.getItem('userName');
    this.categoryService.deleteUserCategory(userName, categoryId).subscribe(
      () => {
        this.ngOnInit();
        this.snackBar.openFromComponent(CategoryDeletedSnackBarComponent, {
          duration: this.durationInSeconds * 1000,
          data: { title: categoryTitle }
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
}
