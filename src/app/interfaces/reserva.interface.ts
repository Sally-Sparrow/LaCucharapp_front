

export interface Reserva {
    id: number;
    fecha: Date;
    hora_inicio: Date;
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