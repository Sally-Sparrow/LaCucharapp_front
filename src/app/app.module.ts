import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LibroReservasComponent } from './libro-reservas/libro-reservas.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { MapComponent } from './map/map.component';
import { BookComponent } from './book/book.component';
import { ReserveComponent } from './reserve/reserve.component';
import { MapOneComponent } from './map-one/map-one.component';
import { MapTwoComponent } from './map-two/map-two.component';

@NgModule({
  declarations: [
    AppComponent,
    LibroReservasComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    MapComponent,
    BookComponent,
    ReserveComponent,
    MapOneComponent,
    MapTwoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
