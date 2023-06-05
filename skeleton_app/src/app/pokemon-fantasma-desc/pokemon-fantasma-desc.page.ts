import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-pokemon-fantasma-desc',
  templateUrl: './pokemon-fantasma-desc.page.html',
  styleUrls: ['./pokemon-fantasma-desc.page.scss'],
})
export class PokemonFantasmaDescPage implements OnInit {

  constructor(private router: Router,public navCtrl: NavController,public alertController: AlertController) { }

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
    if(JSON.stringify(infoUser) === '{}') {
      this.alerta()
    }
  }
  
  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

}
