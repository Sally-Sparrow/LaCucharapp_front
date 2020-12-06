import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reserva } from '../interfaces/reserva.interface';
import { ReservaService } from '../services/reserva.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {


  reservasDelDia: Reserva[];

  constructor( 
    private reservaService: ReservaService,
    private activatedRoute: ActivatedRoute
    ) 
  { 
    this.reservasDelDia = [];
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( async params =>{
      const fechaDelDia = params.fecha;
      this.reservasDelDia = await this.reservaService.getReservaByFecha( fechaDelDia );
      console.log( this.reservasDelDia );
    });
  }


}
