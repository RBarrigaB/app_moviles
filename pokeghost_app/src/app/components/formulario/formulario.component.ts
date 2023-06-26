import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { DataLoginService } from 'src/app/servicios/data-login.service';
import { UserService } from 'src/app/servicios/user.service';
import Usuario from 'src/app/interfaces/user.interface'
import { waitForPendingWrites } from 'firebase/firestore';

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
  fechaNacInicial: string = new Date(Date.now()).toISOString()
  newUser = {} as Usuario;
  getUser = {} as Usuario;

  constructor(public fb: FormBuilder, public navCtrl: NavController, public alertController: AlertController, private tipoAccionUser: DataLoginService,
    private router: Router, private userService: UserService) {
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

  dateValue(dateInput: any){
    let initialFormatDate = dateInput.split("/");
    let finalFormatDate = initialFormatDate[2] + '-' + initialFormatDate[1] + '-' + initialFormatDate[0]
    const date = new Date(finalFormatDate);
    if (!isNaN(date.getTime())) {
      this.fechaNacInicial = date.toISOString();
    }
  }

  async validUser(tipoUso: string) {

    let mensajeError = '';
    let headerError = '';
    let headerOk = '';

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
      if (this.fechaNacInicial !== '' || this.fechaNacInicial !== null) {
        if (Object.keys(this.getUser).length > 0 && tipoAccion === 'editar') {
          this.getUser.nombre = this.userForm.get('nombre')?.value;
          this.getUser.apellido = this.userForm.get('apellido')?.value;
          this.getUser.nombreUsuario = this.userForm.get('nombreUsuario')?.value;
          this.getUser.correoUsuario = this.userForm.get('correoUsuario')?.value;
          this.getUser.clave = this.userForm.get('clave')?.value;
          this.getUser.educacion = this.userForm.get('educacionUsuario')?.value;
          this.getUser.fechaNac = this.fechaSave(this.fechaNacInicial)!;
          console.log(this.getUser)
         // this.userService.updateUser(this.getUser);
          localStorage.setItem('usuario', JSON.stringify(this.getUser));
        } else if (Object.keys(this.getUser).length === 0 && tipoAccion === 'crear') {
          this.newUser.nombre = this.userForm.get('nombre')?.value;
          this.newUser.apellido = this.userForm.get('apellido')?.value;
          this.newUser.nombreUsuario = this.userForm.get('nombreUsuario')?.value;
          this.newUser.correoUsuario = this.userForm.get('correoUsuario')?.value;
          this.newUser.clave = this.userForm.get('clave')?.value;
          this.newUser.educacion = this.userForm.get('educacionUsuario')?.value;
          this.newUser.fechaNac = this.fechaSave(this.fechaNacInicial)!;
          this.userService.addUser(this.newUser);
          localStorage.setItem('usuario', JSON.stringify(this.newUser));
        }
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
      }
    }
  }

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  fechaSave(fechaInput: string) {
    let fechaDB = fechaInput.substring(0,10).split("-");
    let fechaSave = fechaDB[2]+'-'+fechaDB[1]+'-'+fechaDB[0];
    return fechaSave;
  }

  ngOnInit() {
    this.tipoAccExt = this.tipoAccionUser.tipoAccion;
    if (this.tipoAccionUser.tipoAccion === 'editar') {
      let sessionUser = JSON.parse(localStorage.getItem('usuario')!);
      this.userService.getUsers().subscribe(users => {
        this.getUser = users[users.findIndex(usr => usr.correoUsuario === sessionUser.email)];
        if (this.getUser.fechaNac) {
          let initialFormatDate = this.getUser.fechaNac.split("-");
          let finalFormatDate = initialFormatDate[2] + '-' + initialFormatDate[1] + '-' + initialFormatDate[0]
          const date = new Date(finalFormatDate);
          if (!isNaN(date.getTime())) {
            this.fechaNacInicial = date.toISOString();
          }
        }
      })
    }
    this.redireccion = this.tipoAccionUser.tipoAccion === 'crear' ? '/login' :
      this.tipoAccionUser.tipoAccion === 'editar' ? '/home' : '';
    this.nombreBtn = this.tipoAccionUser.tipoAccion === 'crear' ? 'Registrarme' :
      this.tipoAccionUser.tipoAccion === 'editar' ? 'Editar' : '';
  }
}
