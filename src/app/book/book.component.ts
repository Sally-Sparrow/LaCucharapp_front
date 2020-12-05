import { Component, OnInit } from '@angular/core';
import { Reserva } from '../interfaces/reserva.interface';
import { ReservaService } from '../services/reserva.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {


  reservas: Reserva[];

  constructor( private reservaService: ReservaService ) { 
    this.reservas = [];
  }

  ngOnInit(): void {
    this.reservaService.getReserva()
      .then( response => {
        console.log(response);
        
      })
      .catch( error => console.log(error) );
  }

}
