import { Router } from '@angular/router';
import { PokemonDetallesPage } from './pokemon-detalles.page';
import { ConsumoAPIService } from 'app/servicios/consumo-api.service';
import { AuthGuardService } from 'app/servicios/auth-guard.service';

describe('PokemonDetallesPage', () => {
  let page: PokemonDetallesPage;
  let router: Router;
  let consumoAPIService: ConsumoAPIService;
  let authGuardService: AuthGuardService;

  beforeEach(() => {
    router = {
      navigate: jest.fn()
    } as unknown as Router;
    consumoAPIService = {} as ConsumoAPIService;
    authGuardService = {} as AuthGuardService;
    page = new PokemonDetallesPage(consumoAPIService, router, authGuardService);
  });

  it('should navigate to the specified page', () => {
    const pageName = 'home';
    page.goToPage(pageName);
    expect(router.navigate).toHaveBeenCalledWith([pageName]);
  });
});
