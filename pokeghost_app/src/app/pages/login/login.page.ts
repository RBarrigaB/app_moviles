import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { DataLoginService } from '../../servicios/data-login.service';
import { UserService } from '../../servicios/user.service';
import { AuthenticationService } from '../../servicios/authentication.service';
import SessionUser from '../../interfaces/sessionUser.interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;
  loginInfo = {} as SessionUser;
  mensaje: string = "";

  constructor(public fb: FormBuilder, public alertController: AlertController,
    public navCtrl: NavController, public dataLogin: DataLoginService, public tipoAccionLogin: DataLoginService,
    private userService: UserService, private authService: AuthenticationService) {

    this.loginForm = this.fb.group({
      'email': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    })
  }

  ngOnInit() {
  }

  async login() {
    if (await this.inputFormatLogin(this.loginForm)) {
      const alert = await this.alertController.create({
        header: 'Error de login',
        message: this.mensaje,
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    } else {
      this.firebaseLogin(this.loginForm);
    }
  }

  nuevaCuenta() {
    this.tipoAccionLogin.tipoAccion = 'crear';
  }

  async firebaseLogin(form: FormGroup<any>) {
    this.loginInfo.correoUsuario = form.value.email;
    this.loginInfo.clave = form.value.password;
    let loginCheck = this.authService.login(this.loginInfo)
    if (await loginCheck) {
      localStorage.setItem('usuario', JSON.stringify(this.loginInfo));
      this.navCtrl.navigateRoot('home')
    } else {
      document.querySelectorAll('ion-input').forEach(input => { input.value = "" })
      const alert = await this.alertController.create({
        header: 'Error de login',
        message: 'Correo electrónico o contraseña son incorrectos. Por favor, verifique su información o cree una cuenta e inténtelo nuevamente',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }
  }

  async inputFormatLogin(form: FormGroup<any>):Promise<boolean> {
    let invalidLogin: boolean = false;
    if (form.invalid) {
      if (form.get('email')?.invalid) {
        this.mensaje = 'Correo inválido. El correo electrónico debe ser en formato test@test.cl'
      } else {
        if (form.get('password')?.invalid) {
          this.mensaje = 'Contraseña inválida. La contraseña debe tener 6 caracteres'
        }
      }
      invalidLogin = true;
    } else {
      invalidLogin = false;
    }
    return invalidLogin;
  }
}
