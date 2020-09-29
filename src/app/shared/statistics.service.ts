import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  baseApiUri = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.baseApiUri = environment.baseApiUri;
  } 

  expenseDateRangeModel = this.fb.group({
    StartDate: ['', Validators.required],
    EndDate: ['', Validators.required]
  });

  getUserSatsByProperty(userName: string, propertyForStats: string) {
    var dd = String(this.expenseDateRangeModel.value.StartDate.getDate()).padStart(2, '0');
    var mm = String(this.expenseDateRangeModel.value.StartDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = this.expenseDateRangeModel.value.StartDate.getFullYear();

    var dd1 = String(this.expenseDateRangeModel.value.EndDate.getDate()).padStart(2, '0');
    var mm1 = String(this.expenseDateRangeModel.value.EndDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy1 = this.expenseDateRangeModel.value.EndDate.getFullYear();

    var start = yyyy + '-' + mm + '-' + dd;
    var end = yyyy1 + '-' + mm1 + '-' + dd1;

    return this.http.get(this.baseApiUri + '/users/' + userName + '/stats' + 
    '?startDate=' + start + '&endDate=' + end + '&statsByProperty=' + propertyForStats);
  }
}