import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  fechaDeHoy: string;

  constructor() { }



  ngOnInit(): void {
      this.fechaDeHoy = this.getFechaActual();
      //console.log(this.fechaDeHoy);
  }


  //* Devuelve la fecha del día en string y formato yyyy-mm-dd
  getFechaActual() {
    //devuelve string
    var returnFechaHoy = "";
    //pesca la fecha de hoy
    var hoy = new Date();
    //separa
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1; //por lo visto enero es 0 ¬.¬
    var yyyy = hoy.getFullYear();
    
    returnFechaHoy += yyyy;

    if (mm < 10) {
      returnFechaHoy += `-0${mm}`;
      } else { returnFechaHoy += `-${mm}-` }

    if (dd < 10) {
    returnFechaHoy += `0${dd}`;
    } else { returnFechaHoy += `${dd}`; }
    
    return returnFechaHoy;
    }

}
