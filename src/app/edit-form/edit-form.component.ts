import { DatePipe } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Reserva } from '../interfaces/reserva.interface';
import { ReservasService } from '../services/reserva.service';



@Component({
    selector: 'app-edit-form',
    templateUrl: './edit-form.component.html',
    styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
    editForm: FormGroup;
    reservaEditar: Reserva;

    reservaId: number;
    fecha: string;
    constructor(private reservasService: ReservasService,
        private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private datePipe: DatePipe) {

    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(async params => {
            this.reservaEditar = await this.reservasService.getReservaById(params.id);
            this.reservaId = params.id;
            this.fecha = this.datePipe.transform(this.reservaEditar.fecha, "yyy-MM-dd");
            this.editForm = this.formBuilder.group({
                nombre: new FormControl(this.reservaEditar.cliente.nombre, [
                    Validators.required,
                    Validators.maxLength(45)
                ]),
                apellidos: new FormControl(this.reservaEditar.cliente.apellidos, [
                    Validators.maxLength(45)
                ]),
                telefono: new FormControl(this.reservaEditar.cliente.telefono, [
                    Validators.required,
                    Validators.pattern(/(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/)
                ]),
                email: new FormControl(this.reservaEditar.cliente.email, [
                    Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
                ]),
                fecha: new FormControl(this.fecha, [
                    Validators.required,
                ]),
                personas: new FormControl(this.reservaEditar.pax, [
                    Validators.required
                ]),
                hora: new FormControl(this.reservaEditar.hora_inicio, [
                    Validators.required
                ]),

                numerosdemesas: new FormControl(this.reservaEditar.mesas, [
                    Validators.required
                ]),

                nota: new FormControl(this.reservaEditar.notas, [
                    Validators.maxLength(200)
                ]),
            });
        })
    }

    onSubmit() {
        this.editForm.value.idReserva = this.reservaId;
        this.reservasService.editReserva(this.editForm.value)
            .then(response => {
                console.log(response);
            })
            .catch(error => console.log(error));
    }
}








