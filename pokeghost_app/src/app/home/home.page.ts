import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
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

  constructor(private dataLogin:DataLoginService
    ,public alertController: AlertController, private router: Router, public tipoAccion: DataLoginService,
    public navCtrl: NavController) {}

    async alerta() {
      const alert = await this.alertController.create({
        header: 'Usuario no registrado',
        message: 'Para ver este página debe estar registrado',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              this.navCtrl.navigateRoot('login')
            }
          }]
      });
      await alert.present();
    }

  ngOnInit() {
    this.homeUser = this.dataLogin.nombreUser;
    let infoUser = JSON.parse(localStorage.getItem('usuario')!);
    if(JSON.stringify(infoUser) === '{}') {
      this.alerta()
    }
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
    this.router.navigate([`${pageName}`]);
  }

  logout(page:string) {
    localStorage.setItem('usuario',JSON.stringify({}));
    this.goToPage(page);
  }

}
