import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  nombresSalones: string[];
  mostrarMesas: boolean;
  mesasSalon: Mesas[];


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
       //! puedo iterar form controls aqui ???
      numero_mesa1: new FormControl,
      numero_mesa2: new FormControl,
      numero_mesa3: new FormControl,
      numero_mesa4: new FormControl,
      numero_mesa5: new FormControl,
      numero_mesa6: new FormControl,
      numero_mesa7: new FormControl,
      numero_mesa8: new FormControl,
      numero_mesa9: new FormControl,
      numero_mesa10: new FormControl,
      
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
    //recoger un string con los nombres de las mesas en cada espacio e iterar los checkbox en HTML segun nombre de salon
    //if salon = salon1 -> return mesas en salon 1
    //etc.
    this.mesasSalon = await this.reservasService.getMesasByEspacio($event.target.innerHTML);
  }


  onSubmit() {

    console.log(this.form.value);
    this.form.reset();
  }

}
