import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Mesas } from '../interfaces/mesas.interface';
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

    //esto es un getter en ts
    get numerosdemesasFormArray() {
        return this.editForm.controls.numerosdemesas as FormArray;
    }
    constructor(private reservasService: ReservasService,
        private formBuilder: FormBuilder) {
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

        //Recupera en un array las Mesas[] de las mesas seleccionadas
        this.mesasSeleccionadas = [];
        for (let i = 0; i < this.editForm.controls.numerosdemesas.value.length; i++) {
            if (this.editForm.controls.numerosdemesas.value[i]) {
                this.mesasSeleccionadas.push(this.mesasSalon[i]);
            }
        }

        //prepara los datos que se enviaran al back
        delete this.editForm.value["numerosdemesas"];
        this.editForm.value.mesas = this.mesasSeleccionadas;

        console.log(this.editForm.value);

        this.reservasService.createReserva(this.editForm.value)
            .then(response => { console.log(response) })
            .catch(error => { console.log(error) })

        this.editForm.reset();
    }
}





