import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Mesas } from '../interfaces/mesas.interface';
import { ReservasService } from '../services/reserva.service';

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
  fechaHoraSeleccionada: {};
  mesasOcupadas: Mesas[];

  salon: string;
  firstTime: boolean;

  //getter para acceder a la propiedad de formBuilder
  get numerosdemesasFormArray() {
    return this.form.controls.numerosdemesas as FormArray;
  }

  constructor(private reservasService: ReservasService,
    private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(45) //Para que no pete la bbdd
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
        Validators.required,
        Validators.pattern(/^\d+$/)
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
    this.fechaHoraSeleccionada = new Object;
    this.mesasOcupadas = [];

    this.firstTime = true;

  }



  ngOnInit(): void {
    this.pasoFormulario = 1; //por defecto está en el paso 1: datos del cliente.
    this.mostrarMesas = false;
    this.nombresSalones = this.getNombresSalones();
  }



  //? Cambiar vistas formulario
  onClickNext(){
    this.pasoFormulario = 2; 
  }
  onClickVerMesas(){
    this.mostrarMesas = !this.mostrarMesas;
  }


  //* Recoger fecha y hora seleccionadas en el form, meterlas en un objeto para pasarlo como body al metodo que recupera las mesas ocupadas en esa fecha/hora
  onChangeFecha($event){
    Object.assign(this.fechaHoraSeleccionada, {
      fecha: $event.target.value
    });
    console.log(this.fechaHoraSeleccionada)
    console.log('entra en la funcion mesas despues de fecha', this.firstTime);
    if(!this.firstTime){
      this.getMesasSalones(this.salon);
    }
  }
  onChangeHora($event){
    Object.assign(this.fechaHoraSeleccionada, {
      hora: $event.target.value
    });
    console.log(this.fechaHoraSeleccionada)
    console.log('entra en la funcion mesas despues de hora', this.firstTime);
    if(!this.firstTime){
      this.getMesasSalones(this.salon);
    }

  }
  

  //? MESAS: recuperar, iterar formcontrols, desactivar las ocupadas
  //* Pedir el numero de salones y sus nombres al servicio
  getNombresSalones() {
    return ['inside', 'outside'];  //!supongamos que viene de la bbdd
  }


  //* Recuperar el número de mesas en cada salón, iterar formControl checkbox mesas, y desabilitar las que esten ocupadas en la fecha y hora seleccionadas:
  async getMesasSalones(pEspacio){

    //* recupera el numero de mesas en cada espacio
    this.mesasSalon = await this.reservasService.getMesasByEspacio(pEspacio);
    console.log(this.mesasSalon);

    //* de las mesas recuperadas, pide a la bbdd las que estan ocupadas en fecha y hora seleccionadas:
    this.mesasOcupadas = await this.reservasService.getMesasOcupadas(this.fechaHoraSeleccionada);
    console.log(this.mesasOcupadas);

    //* recorrer el array de mesas recuperadas, compararlo con el array de mesas ocupadas y da valor a la propiedad ocupada de cada mesa
    for(let mesa of this.mesasSalon){
      for(let ocupada of this.mesasOcupadas){
        if(mesa.numero === ocupada.numero){
          mesa.ocupada = true;
          break;
        }else{
          mesa.ocupada = false;
        }
      }
    }
    console.log(this.mesasSalon);
    

    //* crea un formControl para cada elemento mesa en el array de mesas recuperado
    this.numerosdemesasFormArray.clear();
    // this.mesasSalon.forEach(() => this.numerosdemesasFormArray.push(new FormControl(false))); 

    for(let mesa of this.mesasSalon){
      this.numerosdemesasFormArray.push( new FormControl ({value: false, disabled: mesa.ocupada }) );
    };

    //* Almacena el espacio para llamar a la funcion en on change
    this.salon = pEspacio;
    //* bool para saber si salon tiene valor y porder llamar a la funcion onChange fecha y hora
    this.firstTime = false;
  }



  //? PREPARAR Y ENVIAR DATOS DEL FORMULARIO A BBDD
  onSubmit() {
    //*Recupera en un array los numeros de mesa de las mesas seleccionadas
    this.mesasSeleccionadas = [];
    for (let i = 0; i < this.form.controls.numerosdemesas.value.length; i++) {
      if (this.form.controls.numerosdemesas.value[i]) {
        this.mesasSeleccionadas.push(this.mesasSalon[i]);
      }
    }

    //*prepara los datos que se enviaran al back
    delete this.form.value["numerosdemesas"];
    this.form.value.mesas = this.mesasSeleccionadas;

    console.log(this.form.value);

    this.reservasService.createReserva( this.form.value )
    .then( response => { alert( JSON.stringify(response) )})
    .catch( error => console.log(error) );
      
    this.form.reset();
  }

}
