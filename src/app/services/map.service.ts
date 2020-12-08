import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mesas } from '../interfaces/mesas.interface';



@Injectable({
  providedIn: 'root'
})

export class MapService {

  private baseUrl: string;

  constructor( private httpClient: HttpClient ) {
    this.baseUrl = 'http://localhost:3000/api/map';

  }

  getMesasByEspacio( pEspacio ): Promise<Mesas[]>{ //!este modelo tendra mas datos
      return this.httpClient.get<Mesas[]>(`${this.baseUrl}/${pEspacio}`).toPromise();
  }
}
