import { Component, OnInit } from '@angular/core';
import { DataLoginService } from '../servicios/data-login.service';

@Component({
  selector: 'app-editar-informacion',
  templateUrl: './editar-informacion.page.html',
  styleUrls: ['./editar-informacion.page.scss'],
})
export class EditarInformacionPage implements OnInit {

  constructor(private tipoAccionUser: DataLoginService) { }

  ngOnInit() {
    this.tipoAccionUser.tipoAccion = 'editar';
  }

}
