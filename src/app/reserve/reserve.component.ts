import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Mesas } from '../interfaces/mesas.interface';
import { ReservasService } from '../services/reserva.service';
//import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {

  form: FormGroup;
  pasoFormulario: number;

  formArray: FormArray; 

  nombresSalones: string[];
  mostrarMesas: boolean;
  mesasSalon: Mesas[];

  mesasSeleccionadas: Mesas[];

  //esto es un getter en ts
  get numerosdemesasFormArray() {
    return this.form.controls.numerosdemesas as FormArray;
  }

  constructor( private reservasService: ReservasService,
               private formBuilder: FormBuilder ) 
  {
    this.form = this.formBuilder.group({
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
      email: new FormControl(''),
      fecha: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
      ]),
      personas: new FormControl('', [
        Validators.required
      ]),
      hora: new FormControl('', [
        Validators.required
      ]),
      salon: new FormControl,

      numerosdemesas: new FormArray([]),

      nota: new FormControl('', [
        Validators.maxLength(200)
      ]),
    });


    this.mesasSalon = [];
    
  }

  ngOnInit(): void {
    this.pasoFormulario = 1; //por defecto está en el paso 1: datos del cliente.
    this.mostrarMesas = false;
    this.nombresSalones = this.getNombresSalones();
  }

  //Cambiar vistas formulario
  onClickNext(){
    this.pasoFormulario = 2; 
  }

  onClickVerMesas(){
    this.mostrarMesas = !this.mostrarMesas;
  }

  //? MESAS -------------------------------------------------------
  //* Pedir el numero de salones y sus nombres al servicio
  getNombresSalones(){
    return ['inside', 'outside'];  //!supongamos que viene de la bbdd
  }
  //* Recuperar el número de mesas en cada salón para iterar checkbox mesas
  async getMesasSalones($event){

    this.mesasSalon = await this.reservasService.getMesasByEspacio($event.target.innerText);
    console.log(this.mesasSalon);
    
    this.numerosdemesasFormArray.clear();
    this.mesasSalon.forEach(() => this.numerosdemesasFormArray.push(new FormControl(false)));
     
  }

  // ENVIAR DATOS DEL FORMULARIO
  onSubmit() {
    
    //Recupera en un array las Mesas[] de las mesas seleccionadas
    this.mesasSeleccionadas = [];
    for( let i = 0; i < this.form.controls.numerosdemesas.value.length; i++ ){
      if( this.form.controls.numerosdemesas.value[i] ){
        this.mesasSeleccionadas.push(this.mesasSalon[i]);
      }
    }

    //prepara los datos que se enviaran al back
    delete this.form.value["numerosdemesas"];
    this.form.value.mesas = this.mesasSeleccionadas;

    console.log( this.form.value );

    this.reservasService.createReserva( this.form.value )
    .then( response => { console.log(response) })
    .catch( error => { console.log(error) })
      
    this.form.reset();
  }

}
