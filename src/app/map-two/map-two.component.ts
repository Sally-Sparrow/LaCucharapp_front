import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-two',
  templateUrl: './map-two.component.html',
  styleUrls: ['./map-two.component.css']
})
export class MapTwoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
