import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list'
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { RegisterComponent } from './register/register.component';
import { MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table'  
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { UserService } from './shared/user.service';
import { CategoryService } from './shared/category.service';
import { StatisticsService } from './shared/statistics.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AuthInterceptor } from './auth/auth.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserPageComponent } from './user-page/user-page.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { CategoriesComponent } from './categories/categories.component';
import { MatSortModule } from '@angular/material/sort';
import { CreatedSnackBarComponent } from './expenses/created-snack-bar/created-snack-bar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DeletedSnackBarComponent } from './expenses/deleted-snack-bar/deleted-snack-bar.component';
import { CategoryCreatedSnackBarComponent } from './categories/category-created-snack-bar/category-created-snack-bar.component';
import { CategoryDeletedSnackBarComponent } from './categories/category-deleted-snack-bar/category-deleted-snack-bar.component';
import Amplify from 'aws-amplify';
import { environment } from 'src/environments/environment';

// Amplify.configure({
//   Auth:{
//     mandatorySignIn: environment.AWSCognito.mandatorySignIn,
//     region: environment.AWSCognito.region,
//     userPoolId: environment.AWSCognito.userPoolId,
//     userPoolWebClientId: environment.AWSCognito.userPoolWebClientId,
//     authenticationFlowType: environment.AWSCognito.authenticationFlowType
//   }

// });

@NgModule({
  declarations: [
    AppComponent,
    WelcomepageComponent,
    LoginComponent,
    RegisterComponent,
    UserPageComponent,
    ExpensesComponent,
    CategoriesComponent,
    CreatedSnackBarComponent,
    NavbarComponent,
    StatisticsComponent,
    DeletedSnackBarComponent,
    CategoryCreatedSnackBarComponent,
    CategoryDeletedSnackBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatExpansionModule
  ],
  exports: [ MatFormFieldModule, MatInputModule ],
  providers: [UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, CategoryService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, StatisticsService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
