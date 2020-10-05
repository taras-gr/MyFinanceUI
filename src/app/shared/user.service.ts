import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Expense } from '../models/expense'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseApiUri = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.baseApiUri = environment.baseApiUri;  
  }

  userForRegistrationModel = this.fb.group({
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    Email: ['', Validators.email],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })
  });

  userForLoginModel = this.fb.group({    
    Email: ['', Validators.email],
    Password: ['', Validators.email]
  });

  expenseToAddModel = this.fb.group({
    Title: ['', Validators.required],
    ExpenseDate: ['', Validators.required],
    Category: ['', Validators.required],
    Cost: ['', Validators.required]
  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  register() {
    var body = {
      FirstName: this.userForRegistrationModel.value.FirstName,
      LastName: this.userForRegistrationModel.value.LastName,
      Email: this.userForRegistrationModel.value.Email,
      Password: this.userForRegistrationModel.value.Passwords.Password
    };
    return this.http.post(this.baseApiUri + '/auth/Register', body);
  }

  login() {
    var body = {
      Email: this.userForLoginModel.value.Email,
      Password: this.userForLoginModel.value.Password
    };
    return this.http.post(this.baseApiUri + '/auth/Login', body);
  }

  userProfile() {
    return this.http.get(this.baseApiUri + '/UserProfile');
  }

  getUserExpenses(userName: string, sort: string, order: string, page: number, pageSize: number): Observable<HttpResponse<Expense[]>>{
    const href = `${this.baseApiUri}/users/${userName}/expenses`;
    const requestUrl =
        `${href}?pageNumber=${page + 1}&pageSize=${pageSize}&orderBy=${sort}_${order}`;

        console.log(requestUrl);
    return this.http.get<Expense[]>(
      requestUrl, {observe: 'response'});
  }

  getUserCategories(userName: string) {
    return this.http.get(this.baseApiUri + '/users/' + userName + '/categories');
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

  deleteUserExpense(userName: string, expenseId: string) {
    return this.http.delete(this.baseApiUri + '/users/' + userName + '/expenses/' + expenseId);
  }
}