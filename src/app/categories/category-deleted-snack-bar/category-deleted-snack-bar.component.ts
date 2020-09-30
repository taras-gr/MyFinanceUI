import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-deleted-snack-bar',
  templateUrl: './category-deleted-snack-bar.component.html'
})
export class CategoryDeletedSnackBarComponent {
  categoryTitle = '';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { 
    this.categoryTitle = data.title;
  }
}