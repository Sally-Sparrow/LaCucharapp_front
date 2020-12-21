import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mesas } from '../interfaces/mesas.interface';
import { Reserva } from '../interfaces/reserva.interface';



@Injectable({
  providedIn: 'root'
})

export class ReservasService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api';

  }


  getMesasByEspacio(pEspacio): Promise<Mesas[]> { //!este modelo tendra mas datos
    return this.httpClient.get<Mesas[]>(`${this.baseUrl}/map/${pEspacio}`).toPromise();
  }

  getReservaByFecha(pFecha): Promise<Reserva[]> {
    return this.httpClient.get<Reserva[]>(`${this.baseUrl}/book/${pFecha}`).toPromise();
  }

  createReserva(pFormValues): Promise<Reserva> {
    return this.httpClient.post<Reserva>(`${this.baseUrl}/reserve/new`, pFormValues).toPromise();
  }

  getReservaById(pId): Promise<Reserva> {
    return this.httpClient.get<Reserva>(`${this.baseUrl}/book/edit/${pId}`).toPromise();
  }

  editReserva(pFormValues): Promise<Reserva> {
    return this.httpClient.put<Reserva>(`${this.baseUrl}/book/edit/cliente`, pFormValues).toPromise();
  }

}