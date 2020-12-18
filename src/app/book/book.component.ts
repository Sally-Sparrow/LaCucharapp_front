import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reserva } from '../interfaces/reserva.interface';
import { ReservasService } from '../services/reserva.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input() reservas: Reserva;

  reservasDelDia: Reserva[];
  fechaDelDia: string;
  fechaAnterior: string;
  fechaPosterior: string;

  editForm: boolean;

  constructor(
    private reservaService: ReservasService,
    private activatedRoute: ActivatedRoute
  ) {
    this.reservasDelDia = [];
  }

  // RECUPERA las reservas del día
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {
      this.fechaDelDia = params.fecha;
      this.reservasDelDia = await this.reservaService.getReservaByFecha(this.fechaDelDia);
      console.log(this.reservasDelDia);
    });

    this.editForm = false;
  }

  //Botón editar reserva
  onClickEditarReserva(idReserva) {
    console.log(idReserva);
    this.editForm = !this.editForm;

  }


}
