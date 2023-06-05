import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { DataLoginService } from 'src/app/servicios/data-login.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent  implements OnInit {

  userForm!: FormGroup;
  dateVal: string | undefined;
  tipoAccExt: string = ''
  redireccion: string = ''
  nombreBtn: string = ''
  newUser = {
    "nombre": '',
    "apellido": '',
    "nombreUsuario": '',
    "clave": '',
    "educacion": '',
    "fechaNac": ''
  }
  getUser = {
    "nombre": '',
    "apellido": '',
    "nombreUsuario": '',
    "clave": '',
    "educacion": '',
    "fechaNac": ''
  }

  constructor(public fb: FormBuilder, public navCtrl: NavController,public alertController: AlertController, private tipoAccionUser: DataLoginService,
    private router: Router) { 
    this.userForm = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'apellido': new FormControl("", Validators.required),
      'nombreUsuario': new FormControl("", Validators.required),
      'educacionUsuario': new FormControl("", Validators.required),
      'clave': new FormControl("", Validators.required)
    })
  }

    dateValue(dateVal: any) {
    this.dateVal = format(parseISO(dateVal),'dd/MM/yyyy');
  }

  redirect(redir: boolean, tipoAccion:string) {
    if(tipoAccion === 'crear') {
    redir === true ? this.navCtrl.navigateRoot('login') : '';
    } else if (tipoAccion === 'editar'){
      redir === true ? this.navCtrl.navigateRoot('home') : '';
    } else {
      console.log('Error al redireccionar, tipo de acción inválida')
    }
  }

 async validUser (tipoUso: string){

    let mensajeError = '';
    let headerError = '';
    let headerOk = '';

    let tipoAccion:string = tipoUso === 'crear' ? 'crear' : tipoUso === 'editar' ? 'editar' : '';
    if(this.userForm.invalid) {
      if(this.userForm.get('nombre')?.invalid) {
        mensajeError = 'Error. El campo nombre es requerido y debe tener solamente letras';
      } else if (this.userForm.get('apellido')?.invalid) {
        mensajeError = 'Error. El campo apellido es requerido y debe tener solamente letras';
      } else if (this.userForm.get('nombreUsuario')?.invalid) {
        mensajeError = 'Error. El campo nombre de usuario es requerido y debe contener entre 3 y 8 caracteres';
      } else if (this.userForm.get('clave')?.invalid) {
        mensajeError = 'Error. El campo clave es requerido y debe contener 4 dígitos';
      } else if (this.userForm.get('educacionUsuario')?.invalid) {
        mensajeError = 'Error. El campo educación de usuario es requerido';
      }

      headerError = tipoAccion === 'crear' ? 'Error al crear usuario' : tipoAccion === 'editar' ? 'Error al editar el usuario': '';

      const alert = await this.alertController.create({
        header: headerError,
        message: mensajeError,
        buttons: ['Aceptar']
      });
      await alert.present();
      return;

    } else {
      if(this.dateVal !== '' || this.dateVal !== null) {
        this.newUser.nombre = this.userForm.get('nombre')?.value;
        this.newUser.apellido = this.userForm.get('apellido')?.value;
        this.newUser.nombreUsuario = this.userForm.get('nombreUsuario')?.value;
        this.newUser.clave = this.userForm.get('clave')?.value;
        this.newUser.educacion = this.userForm.get('educacionUsuario')?.value;
        this.newUser.fechaNac = this.dateVal!;
        localStorage.setItem('usuario',JSON.stringify(this.newUser));

        headerOk = tipoAccion === 'crear' ? 'Usuario creado correctamente': tipoAccion === 'editar' ? 'Usuario actualizado correctamente': '';

        const alert = await this.alertController.create({
          header: headerOk,
          buttons: [
            {
              text: 'Aceptar',
              handler: () => {
                this.redirect(true,tipoAccion);
              }
            }]
        });
        await alert.present();
      }
    }
  }

  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

  ngOnInit() {
    this.tipoAccExt = this.tipoAccionUser.tipoAccion;
    if(this.tipoAccionUser.tipoAccion === 'editar') {
      this.getUser = JSON.parse(localStorage.getItem('usuario')!);
    }
    this.redireccion = this.tipoAccionUser.tipoAccion === 'crear' ? '/login': 
    this.tipoAccionUser.tipoAccion === 'editar' ? '/home': '';
    this.nombreBtn = this.tipoAccionUser.tipoAccion === 'crear' ? 'Registrarme': 
    this.tipoAccionUser.tipoAccion === 'editar' ? 'Editar': '';
  }

}
