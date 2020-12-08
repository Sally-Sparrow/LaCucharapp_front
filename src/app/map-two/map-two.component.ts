import { Component, OnInit } from '@angular/core';
import { Mesas } from '../interfaces/mesas.interface';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-map-two',
  templateUrl: './map-two.component.html',
  styleUrls: ['./map-two.component.css']
})
export class MapTwoComponent implements OnInit {

  mesasOutside: Mesas[]

  constructor(
    private mapService: MapService
  ) { 

    this.mesasOutside = [];
  }

  ngOnInit(): void {
    this.mapService.getMesasByEspacio( 'outside' )
      .then( response => {
        console.log(response);
         this.mesasOutside = response;
         return this.mesasOutside;
      })
      .catch( error => console.log(error));
  }






  pintaArbolito( base, longitud, ramas, arco, angulo, n ){
    if( n <= 0 ) { return }

    for(let i = 0; i < ramas; i++){
      const fin =  {
        x: base.x + Math.cos(0) * longitud,
        y: base.y + Math.cos(0) * longitud,
      }
    }
    //pintar un after 
  }

}
