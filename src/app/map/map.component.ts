import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mesas } from '../interfaces/mesas.interface';
import { ReservasService } from '../services/reserva.service';
import { DatePipe } from '@angular/common';

import * as dayjs from 'dayjs'
dayjs().format()

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  fechaHora

  nombreSalon: string;
  mesasSalon: Mesas[];
  mesasOcupadas: Mesas[];

  fechaHoraActual: any;
  
  ocupada: boolean;

  constructor( private reservasService: ReservasService,
               private activatedRoute: ActivatedRoute,
               private datePipe: DatePipe
             ) 
  {
    this.fechaHoraActual = {};
  }


  ngOnInit(): void {
    //* pinta la fecha y la hora del día
    setInterval( () => {
      this.fechaHora = dayjs();
    }, 1000 )

    //? MESAS OCUPADAS
    //* recupera de bbdd las mesas en cada espacio
    this.activatedRoute.params.subscribe( async params =>{
      this.nombreSalon = params.salon;
      this.mesasSalon = await this.reservasService.getMesasByEspacio( this.nombreSalon );
        
    });

    setInterval( async () => {
      //* recupera la fecha cada minuto para hacer la peticion mesas ocupadas a bbdd
      this.fechaHoraActual.fecha = this.datePipe.transform(this.fechaHora,"yyyy-MM-dd")
        // fecha: '2020-11-30'
      console.log(this.fechaHoraActual);
      //* lo mismo pero con la hora
      this.fechaHoraActual.hora = this.datePipe.transform(this.fechaHora, "HH:mm:00")
        // hora: '21:00:00'
      console.log(this.fechaHoraActual);
      
      //* manda los datos y almacena en un array las mesas ocupadas
      this.mesasOcupadas = await this.reservasService.getMesasOcupadas(this.fechaHoraActual);
      console.log(this.mesasOcupadas)

      //* compara el array de mesas con el array de ocupadas, para dar valor a las propiedades horaInicio y horaFin
      for(let mesa of this.mesasSalon){
        for(let ocupada of this.mesasOcupadas){
          if(mesa.numero === ocupada.numero){
           mesa.ocupada = true;
           mesa.horaInicio = this.fechaHora;
           mesa.horaFin = this.fechaHora.add(2, 'minute');
           break;
          }else{
           //mesa.ocupada = false; //mira a ver esto aqui
          }
        }
      }
      console.log(this.mesasSalon);

      //* Comprueba el rango de horas de cada mesa con la hora actual para dar valor a la propiedad ocupada
      for( let mesa of this.mesasSalon ){
        if( this.fechaHora >= mesa.horaInicio && this.fechaHora <= mesa.horaFin){
          mesa.ocupada = true;
          console.log('pone la mesa', mesa, 'true');
        }else{ mesa.ocupada = false; }
      }
      

      }, 1000);

    
  }

  onClick(){
    this.ocupada = !this.ocupada;
  }

  


}


