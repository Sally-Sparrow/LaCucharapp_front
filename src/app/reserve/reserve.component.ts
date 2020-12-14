import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
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

  //!@ViewChild('selectHora') selectHora: ElementRef;

  constructor( private reservasService: ReservasService ) 
  {

    this.form = new FormGroup({
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
    
    this.formArray.clear();

    this.mesasSalon = await this.reservasService.getMesasByEspacio($event.target.innerText);
    console.log(this.mesasSalon);

    // const formArray: FormArray = this.form.get('numerosdemesas') as FormArray
    
    this.formArray = this.form.get('numerosdemesas') as FormArray;
    for( let mesa of this.mesasSalon ){
      this.formArray.push( new FormControl( false ) )
      
      console.log('cada mesa dentro del array de mesas' + mesa.numero);
      //console.log('dentro del for' + this.formArray[mesa.numero]);
    }

    console.log(this.formArray);// [object object] -> me esta convirtiendo objeto en string?
    

    //console.log('posicion 0 en formArray' + formArray[]);
    
    
    console.log(this.form);
    
  }


  onSubmit() {

    console.log(this.form.value);
    this.form.reset();
  }

}
