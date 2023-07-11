import { Router } from '@angular/router';
import { PokemonFantasmaDescPage } from './pokemon-fantasma-desc.page';
import { AuthGuardService } from 'app/servicios/auth-guard.service';
import { AlertController, NavController } from '@ionic/angular';
import { AuthenticationService } from 'app/servicios/authentication.service';

describe('PokemonDetallesPage', () => {
  let page: PokemonFantasmaDescPage;
  let router: Router;
  let authenticationService: AuthenticationService;
  let authGuardService: AuthGuardService;
  let navCtrl: NavController;
  let alertController: AlertController;

  beforeEach(() => {
    router = {
      navigate: jest.fn()
    } as unknown as Router;
    authenticationService = {} as AuthenticationService;
    authGuardService = {} as AuthGuardService;
    navCtrl = {} as NavController;
    alertController = {} as AlertController;

    page = new PokemonFantasmaDescPage(router,navCtrl,alertController,authenticationService,authGuardService);
  });

  it('should navigate to the specified page', () => {
    const pageName = 'home';
    page.goToPage(pageName);
    expect(router.navigate).toHaveBeenCalledWith([pageName]);
  });
});
