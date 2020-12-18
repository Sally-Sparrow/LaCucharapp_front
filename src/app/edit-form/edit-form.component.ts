import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Mesas } from '../interfaces/mesas.interface';
import { Reserva } from '../interfaces/reserva.interface';
import { ReservasService } from '../services/reserva.service';



@Component({
    selector: 'app-edit-form',
    templateUrl: './edit-form.component.html',
    styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
    editForm: FormGroup;
    pasoFormulario: number;
    formArray: FormArray;
    nombresSalones: string[];
    mostrarMesas: boolean;
    mesasSalon: Mesas[];
    mesasSeleccionadas: Mesas[];
    reservaEditar: Reserva;
    @Output() reserva: Reserva;



    //esto es un getter en ts
    get numerosdemesasFormArray() {
        return this.editForm.controls.numerosdemesas as FormArray;
    }
    constructor(private reservasService: ReservasService,
        private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute) {
        this.editForm = this.formBuilder.group({
            nombre: new FormControl('', [
                Validators.required,
                Validators.maxLength(45)
            ]),
            apellidos: new FormControl('', [
                Validators.maxLength(45)
            ]),
            telefono: new FormControl('', [
                Validators.required,
                Validators.pattern(/(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/)
            ]),
            email: new FormControl('', [
                Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
            ]),
            fecha: new FormControl('', [
                Validators.required,
            ]),
            personas: new FormControl('', [
                Validators.required
            ]),
            hora: new FormControl('', [
                Validators.required
            ]),

            numerosdemesas: new FormArray([]),

            nota: new FormControl('', [
                Validators.maxLength(200)
            ]),
        });

        this.mesasSalon = [];

    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(async params => {
            this.reservaEditar = await this.reservasService.getReservaById(params.id);
            console.log(this.reservaEditar);
            //  console.log(this.reservaEditar.cliente.nombre);


        })

        this.pasoFormulario = 1;
        this.mostrarMesas = false;
        this.nombresSalones = this.getNombresSalones();

    }

    getNombresSalones() {
        return ['inside', 'outside'];
    }
    //* Recuperar el número de mesas en cada salón para iterar checkbox mesas
    async getMesasSalones($event) {

        this.mesasSalon = await this.reservasService.getMesasByEspacio($event.target.innerText);
        console.log(this.mesasSalon);

        this.numerosdemesasFormArray.clear();
        this.mesasSalon.forEach(() => this.numerosdemesasFormArray.push(new FormControl(false)));

    }
    onSubmit() {
        console.log();

    }


}





