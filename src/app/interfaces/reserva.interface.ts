export interface Reserva{
    id: number;
    fecha: Date;
    hora_inicio: Date;
    hora_fin?: Date;
    nombre: string;
    apellidos: string;
    telefono: number;
    email?: string;
    mesas: number;
    pax: number;
    notas?: string;
}