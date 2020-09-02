import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';

const routes: Routes = [
  {path: '', component:WelcomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
