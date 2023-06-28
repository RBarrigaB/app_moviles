import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { DataLoginService } from 'src/app/servicios/data-login.service';
import { UserService } from 'src/app/servicios/user.service';
import Usuario from 'src/app/interfaces/user.interface'
import { AuthenticationService } from 'src/app/servicios/authentication.service';
import SessionUser from 'src/app/interfaces/sessionUser.interface';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})

export class FormularioComponent implements OnInit {

  userForm!: FormGroup;
  tipoAccExt: string = ''
  redireccion: string = ''
  nombreBtn: string = ''
  userEncontrado = {} as Usuario;
  fechaNacInicial: string = new Date(Date.now()).toISOString()
  datetime: any = document.querySelector('ion-datetime');
  newUser = {} as Usuario;
  getUser = {} as Usuario;
  userSession = {} as SessionUser;

  constructor(public fb: FormBuilder, public navCtrl: NavController, public alertController: AlertController, private tipoAccionUser: DataLoginService,
    private router: Router, private userService: UserService, private authService: AuthenticationService) {
    this.userForm = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'apellido': new FormControl("", Validators.required),
      'nombreUsuario': new FormControl("", Validators.required),
      'correoUsuario': new FormControl("", Validators.required),
      'educacionUsuario': new FormControl("", Validators.required),
      'clave': new FormControl("", Validators.required)
    })
  }

  redirect(redir: boolean, tipoAccion: string) {
    if (tipoAccion === 'crear') {
      redir === true ? this.navCtrl.navigateRoot('login') : '';
    } else if (tipoAccion === 'editar') {
      redir === true ? this.navCtrl.navigateRoot('home') : '';
    } else {
      console.log('Error al redireccionar, tipo de acción inválida')
    }
  }

  dateValue(dateInput: any) {
    this.fechaNacInicial = dateInput;
  }

  async validUser(tipoUso: string) {

    let mensajeError = '';
    let headerError = '';
    let headerOk = '';
    let userExist = {} as Usuario;

    let tipoAccion: string = tipoUso === 'crear' ? 'crear' : tipoUso === 'editar' ? 'editar' : '';
    if (this.userForm.invalid) {
      if (this.userForm.get('nombre')?.invalid) {
        mensajeError = 'Error. El campo nombre es requerido y debe tener solamente letras';
      } else if (this.userForm.get('apellido')?.invalid) {
        mensajeError = 'Error. El campo apellido es requerido y debe tener solamente letras';
      } else if (this.userForm.get('nombreUsuario')?.invalid) {
        mensajeError = 'Error. El campo nombre de usuario es requerido y debe contener entre 3 y 8 caracteres';
      } else if (this.userForm.get('correoUsuario')?.invalid) {
        mensajeError = 'Error. El campo correo de usuario es requerido y debe tener un formato como el siguiente: test@test.cl';
      } else if (this.userForm.get('clave')?.invalid) {
        mensajeError = 'Error. El campo clave es requerido y debe contener 4 dígitos';
      } else if (this.userForm.get('educacionUsuario')?.invalid) {
        mensajeError = 'Error. El campo educación de usuario es requerido';
      }

      headerError = tipoAccion === 'crear' ? 'Error al crear usuario' : tipoAccion === 'editar' ? 'Error al editar el usuario' : '';

      const alert = await this.alertController.create({
        header: headerError,
        message: mensajeError,
        buttons: ['Aceptar']
      });
      await alert.present();
      return;

    } else {
        if (Object.keys(this.getUser).length > 0 && tipoAccion === 'editar') {
          this.getUser.nombre = this.userForm.get('nombre')?.value;
          this.getUser.apellido = this.userForm.get('apellido')?.value;
          this.getUser.nombreUsuario = this.userForm.get('nombreUsuario')?.value;
          this.getUser.correoUsuario = this.userForm.get('correoUsuario')?.value;
          this.getUser.clave = this.userForm.get('clave')?.value;
          this.getUser.educacion = this.userForm.get('educacionUsuario')?.value;
          this.getUser.fechaNac = this.fechaSave(this.fechaNacInicial)!;
          this.userService.updateUser(this.getUser);
          this.authService.updateMailSessionUser(this.getUser.correoUsuario);
          this.authService.updatePasswordSessionUser(this.getUser.clave);
          localStorage.setItem('usuario', JSON.stringify(this.getUser));
          headerOk = 'editar';
        } else if (Object.keys(this.newUser).length === 0 && tipoAccion === 'crear') {
          await this.getUserByMail(this.userForm.get('correoUsuario')?.value);
           userExist = this.userEncontrado;
          if(userExist !== null && userExist !== undefined) {
              if (Object.keys(userExist).length > 0) {
                headerOk = '';
              }
            }   else {
              document.querySelector('ion-datetime')?.reset()
              this.newUser.nombre = this.userForm.get('nombre')?.value;
              this.newUser.apellido = this.userForm.get('apellido')?.value;
              this.newUser.nombreUsuario = this.userForm.get('nombreUsuario')?.value;
              this.newUser.correoUsuario = this.userForm.get('correoUsuario')?.value;
              this.newUser.clave = this.userForm.get('clave')?.value;
              this.newUser.educacion = this.userForm.get('educacionUsuario')?.value;
              this.newUser.fechaNac = this.fechaSave(this.fechaNacInicial)!;
              this.userService.addUser(this.newUser);
              localStorage.setItem('usuario', JSON.stringify(this.newUser));
              this.userSession.correoUsuario = this.newUser.correoUsuario;
              this.userSession.clave = this.newUser.clave;
              this.authService.crearSessionUser(this.userSession);
              this.newUser = {} as Usuario;
              headerOk = 'crear';
            }
        }
        if (headerOk !== '') {
          headerOk = tipoAccion === 'crear' ? 'Usuario creado correctamente' : tipoAccion === 'editar' ? 'Usuario actualizado correctamente' : '';
          const alert = await this.alertController.create({
            header: headerOk,
            buttons: [
              {
                text: 'Aceptar',
                handler: () => {
                  this.redirect(true, tipoAccion);
                }
              }]
          });
          await alert.present();
        } else {
          const alert = await this.alertController.create({
            header: 'El correo ingresado ya existe, favor ingrese otro correo e inténtelo nuevamente',
            buttons: [
              {
                text: 'Aceptar',
                handler: () => {
                  alert.dismiss()
                }
              }]
          });
          await alert.present();
        }
    }
  }

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  getUserByMail(correo: string) {
    return new Promise((resolve, reject) => {
      this.userEncontrado = {} as Usuario;
      let sus = this.userService.getUsers().subscribe(users => {
        this.userEncontrado = users[users.findIndex(usr => usr.correoUsuario === correo)];
        sus.unsubscribe();
        resolve(this.userEncontrado);
      }, error => {
        reject(error);
      });
    });
  }
  

  cancel() {
    if(this.tipoAccionUser.tipoAccion === 'crear') {
      this.userForm.reset();
      this.goToPage('/login')
    } else if (this.tipoAccionUser.tipoAccion === 'editar') {
      this.goToPage('/home')
    }
  }

  fechaSave(fechaInput: string) {
    let fechaDB = fechaInput.substring(0, 10).split("-");
    let fechaSave = fechaDB[2] + '/' + fechaDB[1] + '/' + fechaDB[0];
    return fechaSave;
  }

  async ngOnInit() {
    this.tipoAccExt = this.tipoAccionUser.tipoAccion;
    if (this.tipoAccionUser.tipoAccion === 'editar') {
      let sessionUser = JSON.parse(localStorage.getItem('usuario')!);
        await this.getUserByMail(sessionUser.correoUsuario)
        this.getUser = this.userEncontrado;
        if (this.getUser.fechaNac) {
          let initialFormatDate = this.getUser.fechaNac.split("/");
          let finalFormatDate = initialFormatDate[2] + '-' + initialFormatDate[1] + '-' + initialFormatDate[0]
          const date = new Date(finalFormatDate);
          if (!isNaN(date.getTime())) {
            this.fechaNacInicial = date.toISOString();
          }
        }
    }
    this.redireccion = this.tipoAccionUser.tipoAccion === 'crear' ? '/login' :
      this.tipoAccionUser.tipoAccion === 'editar' ? '/home' : '';
    this.nombreBtn = this.tipoAccionUser.tipoAccion === 'crear' ? 'Registrarme' :
      this.tipoAccionUser.tipoAccion === 'editar' ? 'Editar' : '';
  }


}
