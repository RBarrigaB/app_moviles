import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { DataLoginService } from '../../servicios/data-login.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/servicios/user.service';
import Usuario from 'src/app/interfaces/user.interface';

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
  usuario = {} as Usuario;

  constructor(private dataLogin:DataLoginService
    ,public alertController: AlertController, private router: Router, public tipoAccion: DataLoginService,
    public navCtrl: NavController, private userService:UserService) {}

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
    let infoUser = JSON.parse(localStorage.getItem('usuario')!);
    this.userService.getUsers().subscribe(users => {
      this.usuario = users[users.findIndex(usr => usr.correoUsuario === infoUser.email)];
      if(JSON.stringify(infoUser) === '{}' || !this.usuario) {
        this.alerta()
      }
      if(this.usuario) {
        this.homeUser = this.usuario.nombre;
      }
    })
  }

  async infoUsuario(){

    const mensaje:string =  `Su nombre es ${this.usuario.nombreUsuario} ${this.usuario.apellido}, su nivel educacional es educación ${this.usuario.educacion}`;

    const alert = await this.alertController.create({
      header: 'Información de usuario',
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
