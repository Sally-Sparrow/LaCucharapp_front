import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  fechaConsulta: string;
  mostrar: boolean;
  desplazamientoDias: number;

  constructor() { 
    this.desplazamientoDias = 0;
  }



  ngOnInit(): void {
      this.fechaConsulta = this.getFecha();
  }

  //* Muestra el navegador para paginacion de reservas por fecha*/
  mostrarBookNav($event){
    if($event.target.value === 'home'){
      this.mostrar = true;
      this.desplazamientoDias = 0;
    }else{ this.mostrar = false; }
  }

  //*Calcula los dias desplazados respecto a la fecha actual de consulta de reservas */
  getDesplazamientoConsulta($event){
    if( $event.target.value === 'masDia' ){
      this.desplazamientoDias ++;
      console.log(this.desplazamientoDias);
      
    }else if( $event.target.value === 'menosDia' ){
      this.desplazamientoDias --;
      console.log(this.desplazamientoDias);
      
    }else{}
    this.fechaConsulta = this.getFecha();
  }


  //* Devuelve la fecha del día en string y formato yyyy-mm-dd
  getFecha() {
    //devuelve string
    let returnFechaHoy = "";
    //pesca la fecha de hoy
    let hoy = new Date();
    //desplaza la fecha actual a la fecha que se quiere consultar
    hoy.setDate( hoy.getDate() + this.desplazamientoDias );
    //separa
    let dd = hoy.getDate();
    let mm = hoy.getMonth() + 1; //por lo visto enero es 0 ¬.¬
    let yyyy = hoy.getFullYear();
    
    returnFechaHoy += yyyy;
    //pone los ceritos de la izq y los guiones
    if (mm < 10) {
      returnFechaHoy += `-0${mm}`;
      } else { returnFechaHoy += `-${mm}-` }

    if (dd < 10) {
    returnFechaHoy += `0${dd}`;
    } else { returnFechaHoy += `${dd}`; }
    //taDah! :)
    return returnFechaHoy;
    }


}
