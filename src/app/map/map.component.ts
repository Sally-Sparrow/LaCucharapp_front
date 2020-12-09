import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mesas } from '../interfaces/mesas.interface';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  mesasSalon: Mesas[];
  nombreSalon: string;

  constructor( private mapService: MapService,
               private activatedRoute: ActivatedRoute
             ) 
  {


  }

  ngOnInit(): void {
    //* 
    this.activatedRoute.params.subscribe( async params =>{
      this.nombreSalon = params.salon;
      this.mesasSalon = await this.mapService.getMesasByEspacio( this.nombreSalon );
      console.log( this.mesasSalon );
    });
    
    
  }

}


