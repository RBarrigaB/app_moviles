import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { AlertController, NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  login:boolean = false;

  constructor(private router: Router, private authenticationService: AuthenticationService, 
    public alertController: AlertController) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    await this.sessionStatus()
    if (this.login) {
      return true;
    } else {
        const alert = await this.alertController.create({
          header: 'Usuario no registrado',
          message: 'Serás redireccionado al login',
          buttons: [
            {
              text: 'Aceptar',
              handler: () => {
                this.router.navigate(['/login']);
              }
            }]
        });
        await alert.present();
      return false;
    }
  }

  sessionStatus() {
    return new Promise((resolve, reject) => {
      let sus = this.authenticationService.authenticationState().subscribe(response => {
        if (response) {
          this.login = true;
        } else {
          this.login = false;
        }
        sus.unsubscribe();
        resolve(this.login);
      }, error => {
        reject(error);
      });
    });
  }
}
