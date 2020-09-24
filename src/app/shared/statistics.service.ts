import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = 'https://localhost:5001/api';

  expenseDateRangeModel = this.fb.group({
    StartDate: ['', Validators.required],
    EndDate: ['', Validators.required]
  });

  getUserSatsByExpenseDate(userName: string) {
    var dd = String(this.expenseDateRangeModel.value.StartDate.getDate()).padStart(2, '0');
    var mm = String(this.expenseDateRangeModel.value.StartDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = this.expenseDateRangeModel.value.StartDate.getFullYear();

    var dd1 = String(this.expenseDateRangeModel.value.EndDate.getDate()).padStart(2, '0');
    var mm1 = String(this.expenseDateRangeModel.value.EndDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy1 = this.expenseDateRangeModel.value.EndDate.getFullYear();

    var start = yyyy + '-' + mm + '-' + dd;
    var end = yyyy1 + '-' + mm1 + '-' + dd1;

    return this.http.get(this.BaseURI + '/users/' + userName + '/stats' + 
    '?startDate=' + start + '&endDate=' + end + '&statsByProperty=expenseDate');
  }
}