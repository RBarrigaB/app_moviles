import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { DataLoginService } from '../servicios/data-login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController, 
              public navCtrl: NavController, public dataLogin: DataLoginService) {

    this.loginForm = this.fb.group({
      'user': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    })
  }

  ngOnInit() {
  }

  async login() {

    let mensaje = ""
    var form = this.loginForm.value;

    if (this.loginForm.invalid) {
      if (this.loginForm.get('user')?.invalid) {
        mensaje = 'Nombre de usuario inválido. <br> El usuario debe tener entre 3 y 8 caracteres alfanuméricos'
      } else {
        if (this.loginForm.get('password')?.invalid) {
          mensaje = 'Contraseña inválida. <br> La contraseña debe tener 4 dígitos'
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
      this.dataLogin.nombreUser = form.user;
      this.dataLogin.claveUser = form.password;
      this.navCtrl.navigateRoot('home')
    }
  }


}
