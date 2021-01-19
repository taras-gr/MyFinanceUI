import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Expense } from '../models/expense'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  baseApiUri = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.baseApiUri = environment.baseApiUri;  
  } 

  expenseToAddModel = this.fb.group({
    Title: ['', Validators.required], 
    ExpenseDate: ['', Validators.required],
    Category: ['', Validators.required],
    Cost: ['', Validators.required]
  }); 


  getUserExpenses(userName: string, sort: string, order: string, page: number, pageSize: number): Observable<HttpResponse<Expense[]>>{
    const href = `${this.baseApiUri}/users/${userName}/expenses`;
    const requestUrl =
        `${href}?pageNumber=${page + 1}&pageSize=${pageSize}&orderBy=${sort}_${order}`;

        console.log(requestUrl);
    return this.http.get<Expense[]>(
      requestUrl, {observe: 'response'});
  }

  getUserExpenseById(userName: string, expenseId: string){
    const href = `${this.baseApiUri}/users/${userName}/expenses`;
    const requestUrl =
        `${href}/${expenseId}`;

        console.log(requestUrl);
    return this.http.get(requestUrl);
  }

  postNewExpense(userName: string) {
    var body = {
      Title: this.expenseToAddModel.value.Title,
      ExpenseDate: this.expenseToAddModel.value.ExpenseDate,
      Category: this.expenseToAddModel.value.Category,
      Cost: this.expenseToAddModel.value.Cost
    };
    return this.http.post(this.baseApiUri + '/users/' + userName + '/expenses', body);
  }

  updateUserExpenseById(userName: string, row: any) {
    var body = {
      Id: row.id,
      Title: row.title,
      ExpenseDate: row.expenseDate,
      Category: row.category,
      Cost: row.cost
    }
    return this.http.put(this.baseApiUri + '/users/' + userName + '/expenses/' + row.id, body);
  }

  deleteUserExpense(userName: string, expenseId: string) {
    return this.http.delete(this.baseApiUri + '/users/' + userName + '/expenses/' + expenseId);
  }
}