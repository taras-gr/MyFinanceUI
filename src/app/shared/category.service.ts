import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseApiUri = '';
  
  constructor(private http: HttpClient) {
    this.baseApiUri = environment.baseApiUri;
  }

  getUserCategories(userName: string): Observable<Category[]> {
    console.log('getting categories');
    return this.http.get<Category[]>(this.baseApiUri + '/users/' + userName + '/categories');
  }
}