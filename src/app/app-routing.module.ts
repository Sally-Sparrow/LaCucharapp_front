import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookComponent } from './book/book.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { ReserveComponent } from './reserve/reserve.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: HomeComponent, children: [
      //{ path: '', pathMatch: 'full', redirectTo: '/home/map' },
      { path: 'map/:salon', component: MapComponent },
      { path: 'book/:fecha', component: BookComponent },
      { path: 'book/edit/:id', component: EditFormComponent },
      { path: 'reservation', component: ReserveComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
