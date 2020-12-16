import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  //?Variables para book
  mostrarBook: boolean;
  desplazamientoDias: number;
  fechaConsulta: string;
  
  //?variables para map
  mostrarMap: boolean;
  salones: string[];
  nombreSalon: string[];
  salonInicial: string;

  //?variables para reservar
  mostrarForm: boolean;

  constructor( private router: Router) { 
    this.desplazamientoDias = 0;
    
  }



  ngOnInit(): void {
      this.fechaConsulta = this.getFecha();
      this.nombreSalon = this.getNombresSalones();
      this.salonInicial = this.nombreSalon[0];
  }

  
  //? Muestra los sub-navegadores de los componentes */
  mostrar($event){
    if($event.target.value === 'book'){
      this.mostrarMap = false;
      this.mostrarBook = true;
      this.mostrarForm = false;
      this.desplazamientoDias = 0;
      this.fechaConsulta = this.getFecha(); 
         
    }else if($event.target.value === 'map'){
      this.mostrarMap = true;
      this.mostrarBook = false;
      this.mostrarForm = false;
      this.salones = this.getNombresSalones();
      
    }else if($event.target.value === 'form'){
      this.mostrarMap = false;
      this.mostrarBook = false;
      this.mostrarForm = true;
    }
  }

  //? MAP -------------------------------------------------------
  //* Pedir el numero de salones y sus nombres al servicio
  getNombresSalones(){
    return ['inside', 'outside'];  //!supongamos que viene de la bbdd
  }
  //* 
  getMapaSeleccionado($event){
    this.nombreSalon = $event.target.textContent;

    this.router.navigate(['/home/map', this.nombreSalon]);
  }



  //? BOOK -------------------------------------------------------
  //*Calcula los dias desplazados respecto a la fecha actual de consulta de reservas */
  getDesplazamientoConsulta($event){
    if( $event.target.value === 'masDia' ){
      this.desplazamientoDias ++;
     
    }else if( $event.target.value === 'menosDia' ){
      this.desplazamientoDias --;
      console.log(this.desplazamientoDias);
      
    }else{}
    this.fechaConsulta = this.getFecha();
    this.router.navigate(['/home/book', this.fechaConsulta]);

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
