import { Time } from '@angular/common';

export interface Reserva{
    fecha: Date;
    hora_inicio: Time;
    pax: string;
    notas: string;
    mesas: string;
    cliente: {
        nombre: string;
        apellidos: string;
        telefono: number;
        email: string;
    }
}