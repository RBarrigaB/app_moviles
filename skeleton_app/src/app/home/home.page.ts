import { Component, Input, Output,EventEmitter, OnInit } from '@angular/core';
import { AlertController, Animation, AnimationController } from '@ionic/angular';
import { DataLoginService } from '../servicios/data-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  homeUser:string = 'Valor por defecto';
  nombreUsuario:string = '';
  apellidoUsuario:string = '';
  educacionUsuario:string = '';

  constructor(private dataLogin:DataLoginService, private animationCtrl: AnimationController
    ,public alertController: AlertController, private router: Router, public tipoAccion: DataLoginService) {}

  ngOnInit() {
    this.homeUser = this.dataLogin.nombreUser;
  }

  delay(tiempo:number) {
    return new Promise(val => setTimeout(val,tiempo))
  }

  animationElem() {
    
    const animation:Animation = this.animationCtrl.create()
    .addElement(document.querySelectorAll('.elem-animado')!)
    .duration(1000)
    .iterations(1)
    .fromTo('transform','translateX(0px)','translateX(100px)')

    animation.play();
    this.delay(1000).then(()=>{animation.stop()})

  }

  async infoUsuario(){

    const mensaje:string =  `Su nombre es ${this.nombreUsuario} ${this.apellidoUsuario}, su nivel educacional es educación ${this.educacionUsuario}`;

    const alert = await this.alertController.create({
      header: 'Error de login',
      message: mensaje,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  goToPage(pageName:string){
    if(pageName === '/editar-informacion') {
      this.tipoAccion.tipoAccion = 'editar'
    }
    console.log(pageName)
    this.router.navigate([`${pageName}`]);
  }

  logout(page:string) {
    localStorage.setItem('usuario',JSON.stringify({}));
    this.goToPage(page);
  }

}
