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

  //esto es un getter en ts
  get numerosdemesasFormArray() {

    return this.form.controls.numerosdemesas as FormArray;
  }

  constructor( private reservasService: ReservasService,
               private formBuilder: FormBuilder ) 
  {
    this.form = this.formBuilder.group({
      nombre: new FormControl('', [
        Validators.required
      ]),
      apellidos: new FormControl(''),
      telefono: new FormControl(''),
      email: new FormControl(''),
      fecha: new FormControl('', [
        Validators.required
      ]),
      personas: new FormControl('', [
        Validators.required
      ]),
      servicios: new FormControl,
      turno_comida: new FormControl,
      turno_cena: new FormControl,
      salon: new FormControl,

      numerosdemesas: new FormArray([]),

      nota: new FormControl,
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
  //* 
  async getMesasSalones($event){

    this.mesasSalon = await this.reservasService.getMesasByEspacio($event.target.innerText);
    console.log(this.mesasSalon);
    
    this.numerosdemesasFormArray.clear();
    this.mesasSalon.forEach(() => this.numerosdemesasFormArray.push(new FormControl(false)));
    

    
    
  }


  onSubmit() {

    console.log(this.form.value);
    this.form.reset();
  }

}
