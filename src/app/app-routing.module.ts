import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guardianes/auth.guard';
import { NotfoundComponent } from './views/notfound/notfound.component';
import { HomeComponent } from './views/home/home.component';
import { PerfilComponent } from './views/perfil/perfil.component';


const routes: Routes = [
  // https://www.youtube.com/watch?v=pcOaAU_iaD4&index=3&list=PL6n9fhu94yhXwcl3a6rIfAI7QmGYIkfK5
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // component: HomeComponent
  { path: 'home', component: HomeComponent },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard]},

  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
