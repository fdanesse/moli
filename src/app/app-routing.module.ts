import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './views/home/home.component';


const routes: Routes = [
  // https://www.youtube.com/watch?v=pcOaAU_iaD4&index=3&list=PL6n9fhu94yhXwcl3a6rIfAI7QmGYIkfK5
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // component: HomeComponent
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
