import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { DataLoginService } from '../../servicios/data-login.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/servicios/user.service';
import Usuario from 'src/app/interfaces/user.interface';
import { AuthenticationService } from 'src/app/servicios/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  homeUser: string = 'Valor por defecto';
  nombreUsuario: string = '';
  apellidoUsuario: string = '';
  educacionUsuario: string = '';
  usuario = {} as Usuario;

  constructor(private dataLogin: DataLoginService
    , public alertController: AlertController, private router: Router, public tipoAccion: DataLoginService,
    public navCtrl: NavController, private userService: UserService, private authenticationService: AuthenticationService) { }

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

  async ngOnInit() {
    let infoUser = JSON.parse(localStorage.getItem('usuario')!);
    await this.getUserByMail(infoUser.correoUsuario);
    this.homeUser = this.usuario.nombreUsuario;

  }

  async infoUsuario() {

    const mensaje: string = `Su nombre es ${this.usuario.nombreUsuario} ${this.usuario.apellido}, su nivel educacional es educación ${this.usuario.educacion}`;

    const alert = await this.alertController.create({
      header: 'Información de usuario',
      message: mensaje,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  goToPage(pageName: string) {
    if (pageName === '/editar-informacion') {
      this.tipoAccion.tipoAccion = 'editar'
    }
    this.router.navigate([`${pageName}`]);
  }

  deleteAccount(page: string) {
    let sessionUser = JSON.parse(localStorage.getItem('usuario')!)
    let deleteUser = {} as Usuario
    let header = '¿Estás seguro que deseas eliminar su cuenta?. Toma en cuenta que este proceso no es reversible'
    if (sessionUser) {
      this.userService.getUsers().subscribe(async users => {
        deleteUser = users[users.findIndex(usr => usr.correoUsuario === sessionUser.email)];
        if (deleteUser) {
          const alert = await this.alertController.create({
            header: header,
            buttons: [
              {
                text: 'Cancelar',
                handler: () => {
                  alert.dismiss();
                }
              },
              {
                text: 'Aceptar',
                handler: () => {
                  this.userService.deleteUser(deleteUser);
                  this.goToPage(page)
                }
              }]
          });
          await alert.present();
        }
      })
    }
  }

  getUserByMail(correo: string) {
    return new Promise((resolve, reject) => {
      this.usuario = {} as Usuario;
      let sus = this.userService.getUsers().subscribe(users => {
        this.usuario = users[users.findIndex(usr => usr.correoUsuario === correo)];
        sus.unsubscribe();
        resolve(this.usuario);
      }, error => {
        reject(error);
      });
    });
  }

  logout(page: string) {
    localStorage.setItem('usuario', JSON.stringify({}));
    this.authenticationService.logout();
    this.goToPage(page);
  }

}
