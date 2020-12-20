import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mesas } from '../interfaces/mesas.interface';
import { Reserva } from '../interfaces/reserva.interface';



@Injectable({
  providedIn: 'root'
})

export class ReservasService {

  private baseUrl: string;

  constructor( private httpClient: HttpClient ) {
    this.baseUrl = 'http://localhost:3000/api';

  }

  //* PETICIONES PARA MAP
  getMesasByEspacio( pEspacio ): Promise<Mesas[]>{ //!este modelo tendra mas datos
    return this.httpClient.get<Mesas[]>(`${this.baseUrl}/map/${pEspacio}`).toPromise();  
  }

  //* PETICIONES PARA BOOK
  getReservaByFecha( pFecha ): Promise<Reserva[]>{
    return this.httpClient.get<Reserva[]>(`${this.baseUrl}/book/${pFecha}`).toPromise();
  }

  //* PETICIONES PARA RESERVE (formulario)
  getMesasOcupadas( pFechaHora ): Promise<Mesas[]>{
    return this.httpClient.post<Mesas[]>(`${this.baseUrl}/reserve`, pFechaHora).toPromise();
  }

  createReserva( pFormValues ): Promise<Reserva>{
      return this.httpClient.post<Reserva>(`${this.baseUrl}/reserve/nueva`, pFormValues).toPromise();
  }


}