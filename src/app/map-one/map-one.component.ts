import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mesas } from '../interfaces/mesas.interface';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-map-one',
  templateUrl: './map-one.component.html',
  styleUrls: ['./map-one.component.css']
})
export class MapOneComponent implements OnInit {

  mesasInside: Mesas[]

  constructor(
    private mapService: MapService
  ) { 

    this.mesasInside = [];
  }

  ngOnInit(): void {
    this.mapService.getMesasByEspacio( 'inside' )
      .then( response => {
        console.log(response);
         this.mesasInside = response;
         return this.mesasInside;
      })
      .catch( error => console.log(error));
  }

}
