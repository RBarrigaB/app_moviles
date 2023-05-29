import { Component, Input, Output,EventEmitter, OnInit } from '@angular/core';
import { DataLoginService } from '../servicios/data-login.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  homeUser:string = 'Valor por defecto';
  @Input() user_2:string = '';

  constructor(private dataLogin:DataLoginService) {}

  ngOnInit() {
    this.homeUser = this.dataLogin.nombreUser;
  }

}
