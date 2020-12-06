import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva } from '../interfaces/reserva.interface';



@Injectable({
  providedIn: 'root'
})

export class ReservaService {

  private baseUrl: string;

  constructor( private httpClient: HttpClient ) {
    this.baseUrl = 'http://localhost:3000/api/book';

  }

  getReservaByFecha( pFecha ): Promise<Reserva[]>{
      return this.httpClient.get<Reserva[]>(`${this.baseUrl}/${pFecha}`).toPromise();
  }
}
