import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseApiUri = '';

  categoryToAddModel = this.fb.group({
    Title: ['', Validators.required]
  });
  
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.baseApiUri = environment.baseApiUri;
  }

  getUserCategories(userName: string): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseApiUri + '/users/' + userName + '/categories');
  }

  postNewCategory(userName: string) {
    var body = {
      Title: this.categoryToAddModel.value.Title
    };
    return this.http.post(this.baseApiUri + '/users/' + userName + '/categories', body);
  }

  deleteUserCategory(userName: string, categoryId: string) {
    return this.http.delete(this.baseApiUri + '/users/' + userName + '/categories/' + categoryId);
  }
}