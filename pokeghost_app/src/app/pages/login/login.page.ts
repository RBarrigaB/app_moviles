import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { DataLoginService } from '../../servicios/data-login.service';
import { UserService } from 'src/app/servicios/user.service';
import Usuario from 'src/app/interfaces/user.interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;
  loginInfo = {
    "email": "",
    "password": ""
  };

  constructor(public fb: FormBuilder, public alertController: AlertController,
    public navCtrl: NavController, public dataLogin: DataLoginService, public tipoAccionLogin: DataLoginService,
    private userService: UserService) {

    this.loginForm = this.fb.group({
      'email': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    })
  }

  ngOnInit() {
  }

  async login() {

    let mensaje = ""
    var form = this.loginForm.value;

    if (this.loginForm.invalid) {
      if (this.loginForm.get('email')?.invalid) {
        mensaje = 'Correo inválido. El correo electrónico debe ser en formato test@test.cl'
      } else {
        if (this.loginForm.get('password')?.invalid) {
          mensaje = 'Contraseña inválida. La contraseña debe tener 4 dígitos'
        }
      }

      const alert = await this.alertController.create({
        header: 'Error de login',
        message: mensaje,
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    } else {

      let databaseUser = {} as Usuario;
      this.userService.getUsers().subscribe(async users => {
        databaseUser = users[users.findIndex(usr => usr.correoUsuario === form.email)];
        if (form.email === databaseUser.correoUsuario && form.password === databaseUser.clave) {
          this.loginInfo.email = form.email;
          this.loginInfo.password = form.password;
          localStorage.setItem('usuario', JSON.stringify(this.loginInfo));
          this.navCtrl.navigateRoot('home')
        } else {
          document.querySelectorAll('ion-input').forEach(input => { input.value = "" })
          const alert = await this.alertController.create({
            header: 'Error de login',
            message: 'Correo electrónico o contraseña no se encuentran registrados. Por favor, verifique su información o cree una cuenta e inténtelo nuevamente',
            buttons: ['Aceptar']
          });
          await alert.present();
          return;
        }
      })
    }
  }

  nuevaCuenta() {
    this.tipoAccionLogin.tipoAccion = 'crear';
  }

}
