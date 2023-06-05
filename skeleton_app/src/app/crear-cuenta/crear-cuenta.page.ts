import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { DataLoginService } from '../servicios/data-login.service';


@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.page.html',
  styleUrls: ['./crear-cuenta.page.scss'],
})
export class CrearCuentaPage implements OnInit {

  constructor(private tipoAccionUser: DataLoginService) {}

  ngOnInit() {
    this.tipoAccionUser.tipoAccion = 'crear';
  }

}
