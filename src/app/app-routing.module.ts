import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookComponent } from './book/book.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MapOneComponent } from './map-one/map-one.component';
import { MapTwoComponent } from './map-two/map-two.component';
import { MapComponent } from './map/map.component';
import { ReserveComponent } from './reserve/reserve.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, children: [
    { path: '', pathMatch: 'full', redirectTo: '/home/map' },
    { path: 'map', component: MapComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: '/home/map/inside' },
      { path: 'inside', component: MapOneComponent },
      { path: 'outside', component: MapTwoComponent }
    ]},
    { path: 'book', component: BookComponent },
    { path: 'reservation', component: ReserveComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
