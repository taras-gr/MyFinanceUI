import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  readonly BaseURI = 'https://localhost:5001/api';

  getUserCategories(userName: string): Observable<Category[]> {
    console.log('getting categories');
    return this.http.get<Category[]>(this.BaseURI + '/users/' + userName + '/categories');
  }
}