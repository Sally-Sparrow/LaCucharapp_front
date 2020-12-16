import { Time } from '@angular/common';

export interface Reserva{
    idreservas: number;
    fk_clientes: number;
    fk_servicios: number;
    fk_mesas: string;
    hora: {
        hora_inicio: Time;
    }
    cliente: {
        nombre: string;
        apellidos: string;
        telefono: number;
        email?: string;
    }
    mesas: number[];
    pax: number;
    notas?: string;
}