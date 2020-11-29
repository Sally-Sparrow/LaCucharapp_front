import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {

  form: FormGroup;


  constructor() {
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

    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.form.value);

  }

}
