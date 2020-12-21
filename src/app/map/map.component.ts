import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mesas } from '../interfaces/mesas.interface';
import { ReservasService } from '../services/reserva.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  fechaHora: Date;

  nombreSalon: string;
  mesasSalon: Mesas[];
  mesasOcupadas: Mesas[];

  fechaHoraActual: {};
  
  ocupada: boolean;

  constructor( private reservasService: ReservasService,
               private activatedRoute: ActivatedRoute,
               private datePipe: DatePipe
             ) 
  {
    this.fechaHoraActual = new Object;
  }


  ngOnInit(): void {
    //* pinta la fecha y la hora del día
    setInterval( () => {
      this.fechaHora = new Date();
    }, 1000 )

    //? MESAS OCUPADAS
    //* recupera de bbdd las mesas en cada espacio
    this.activatedRoute.params.subscribe( async params =>{
      this.nombreSalon = params.salon;
      this.mesasSalon = await this.reservasService.getMesasByEspacio( this.nombreSalon );

      setInterval( async () => {
      //* recupera la hora cada minuto
      Object.assign(this.fechaHoraActual, {
        // fecha: this.datePipe.transform(this.fechaHora,"yyyy-MM-dd")
        fecha: '2020-11-30'
      });
      console.log(this.fechaHoraActual);
      Object.assign(this.fechaHoraActual, {
        // hora: this.datePipe.transform(this.fechaHora, "HH:mm:ss")
        hora: '21:00:00'
      });
      console.log(this.fechaHoraActual);
      
      //* con la hora recuperada comprueba si hay mesas ocupadas
      this.mesasOcupadas = await this.reservasService.getMesasOcupadas(this.fechaHoraActual);
      console.log(this.mesasOcupadas)

      //* compara el array de mesas con el array de ocupadas, para dar valor a la propiedad ocupada
      for(let mesa of this.mesasSalon){
        for(let ocupada of this.mesasOcupadas){
          if(mesa.numero === ocupada.numero){
           mesa.ocupada = true;
            break;
          }else{
           mesa.ocupada = false;
          }
        }
      }
      console.log(this.mesasSalon);
      }, 10000);
      
       
    });

    
  }

  onClick(){
    this.ocupada = !this.ocupada;
  }

  


}


