import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mesas } from '../interfaces/mesas.interface';
import { ReservasService } from '../services/reserva.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  mesasSalon: Mesas[];
  nombreSalon: string;

  fechaHora: Date;

  constructor( private reservasService: ReservasService,
               private activatedRoute: ActivatedRoute
             ) 
  {


  }

  ngOnInit(): void {
    //* recupera de bbdd las mesas en cada espacio
    this.activatedRoute.params.subscribe( async params =>{
      this.nombreSalon = params.salon;
      this.mesasSalon = await this.reservasService.getMesasByEspacio( this.nombreSalon );
      console.log( this.mesasSalon );
    });
    //* pinta la fecha y la hora del día
    setInterval( () => {
      this.fechaHora = new Date();
    }, 1000 )
    
    
  }

  


}


