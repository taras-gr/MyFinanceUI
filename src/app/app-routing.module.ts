import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AuthGuard } from './auth/auth.guard';
import { ExpensesComponent } from './expenses/expenses.component';

const routes: Routes = [
  {path: '', component:WelcomepageComponent},
  {path: 'userpage', component: UserPageComponent, canActivate:[AuthGuard]},
  {path: ':userName/expenses', component: ExpensesComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
