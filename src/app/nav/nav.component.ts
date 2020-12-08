import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  fechaConsulta: string;
  mostrar: boolean;
  desplazamientoDias: number;

  constructor( private router: Router) { 
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
      this.fechaConsulta = this.getFecha();    
    }else{ this.mostrar = false; }
  }

  //*Calcula los dias desplazados respecto a la fecha actual de consulta de reservas */
  getDesplazamientoConsulta($event){
    if( $event.target.value === 'masDia' ){
      this.desplazamientoDias ++;
     
    }else if( $event.target.value === 'menosDia' ){
      this.desplazamientoDias --;
      console.log(this.desplazamientoDias);
      
    }else{}
    this.fechaConsulta = this.getFecha();
    //habria que forzar aqui la recarga de la url, o navegar aqui en lugar de con un routerlink??
    //!! hay un descuadre entre el click en el boton y la recarga de la url, cambia la variable fecha que se muestra, y al siguiente, envia url
  }


  //* Devuelve la fecha del día en string y formato yyyy-mm-dd
  getFecha() {
    //devuelve string
    let returnFechaHoy = "";
    //pesca la fecha de hoy
    let hoy = new Date();
    //desplaza la fecha actual a la fecha que se quiere consultar,sumando/restando dias
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
