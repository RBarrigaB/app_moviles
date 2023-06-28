import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AuthGuardService } from 'src/app/servicios/auth-guard.service';
import { AuthenticationService } from 'src/app/servicios/authentication.service';

@Component({
  selector: 'app-pokemon-fantasma-desc',
  templateUrl: './pokemon-fantasma-desc.page.html',
  styleUrls: ['./pokemon-fantasma-desc.page.scss'],
})
export class PokemonFantasmaDescPage implements OnInit {

  constructor(private router: Router,public navCtrl: NavController,
    public alertController: AlertController, private authenticationService: AuthenticationService,
    private authGuardService: AuthGuardService) { }

  async ngOnInit() {
    let infoUser = JSON.parse(localStorage.getItem('usuario')!);
    this.authGuardService.sessionStatus();
  }
  
  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }
}
