import { Component, OnInit } from '@angular/core';
import { DataLoginService } from '../../servicios/data-login.service';
import { AlertController, Animation, AnimationController, NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/servicios/authentication.service';

@Component({
  selector: 'app-editar-informacion',
  templateUrl: './editar-informacion.page.html',
  styleUrls: ['./editar-informacion.page.scss'],
})
export class EditarInformacionPage implements OnInit {

  constructor(private tipoAccionUser: DataLoginService, public alertController: AlertController, public navCtrl: NavController,
    private animationCtrl: AnimationController, private authenticationService: AuthenticationService) { }

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

  delay(tiempo: number) {
    return new Promise(val => setTimeout(val, tiempo))
  }

  animationElem() {

    const animation: Animation = this.animationCtrl.create()
      .addElement(document.querySelectorAll('#img-editar')!)
      .duration(1000)
      .iterations(1)
      .fromTo('transform', 'translateY(-100px)', 'translateY(0px)')

    animation.play();
    this.delay(1000).then(() => { animation.stop() })

  }

  async ngOnInit() {
    this.tipoAccionUser.tipoAccion = 'editar';
    let infoUser = JSON.parse(localStorage.getItem('usuario')!);
    this.animationElem();

  }
}
