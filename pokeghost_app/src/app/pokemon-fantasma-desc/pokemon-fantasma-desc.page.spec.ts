import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonFantasmaDescPage } from './pokemon-fantasma-desc.page';

describe('PokemonFantasmaDescPage', () => {
  let component: PokemonFantasmaDescPage;
  let fixture: ComponentFixture<PokemonFantasmaDescPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PokemonFantasmaDescPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
