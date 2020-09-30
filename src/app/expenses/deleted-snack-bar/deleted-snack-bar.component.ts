import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-deleted-snack-bar',
  templateUrl: './deleted-snack-bar.component.html'
})
export class DeletedSnackBarComponent {
  expenseTitle = '';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { 
    this.expenseTitle = data.title;
  }
}