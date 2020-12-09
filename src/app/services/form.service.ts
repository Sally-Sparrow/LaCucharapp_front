import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva } from '../interfaces/reserva.interface';



@Injectable({
  providedIn: 'root'
})

export class FormularioService {

  private baseUrl: string;

  constructor( private httpClient: HttpClient ) {
    this.baseUrl = 'http://localhost:3000/api/reserve/nueva';

  }

  createReserva( pFormValues ): Promise<Reserva>{
      return this.httpClient.post<Reserva>(this.baseUrl, pFormValues).toPromise();
  }
}
