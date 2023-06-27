import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/servicios/authentication.service';

@Component({
  selector: 'app-pokemon-fantasma-desc',
  templateUrl: './pokemon-fantasma-desc.page.html',
  styleUrls: ['./pokemon-fantasma-desc.page.scss'],
})
export class PokemonFantasmaDescPage implements OnInit {

  constructor(private router: Router,public navCtrl: NavController,
    public alertController: AlertController, private authenticationService: AuthenticationService) { }

  async ngOnInit() {
    let infoUser = JSON.parse(localStorage.getItem('usuario')!);
  }
  
  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }
}
