import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import PokemonInfo from 'src/app/interfaces/pokemon-info.interface';
import { ConsumoAPIService } from 'src/app/servicios/consumo-api.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-pokemon-detalles',
  templateUrl: './pokemon-detalles.page.html',
  styleUrls: ['./pokemon-detalles.page.scss'],
})
export class PokemonDetallesPage implements OnInit {

  listaPokemon: PokemonInfo[] = [];
  pokemonInfo = {} as PokemonInfo;
  image_not_found: string = 'pokeghost_app\src\assets\images\default_pokemon.png'

  constructor(private pokemonService: ConsumoAPIService, private router:Router) { }

  ngOnInit() {
    this.storeInfoPokemon()
  }

  storeInfoPokemon() {

    Object.entries(environment.pokemonFantasma).forEach(([key,value]) =>{
      this.pokemonService.getPokemones(value.toString()).subscribe((data: any) => {
        this.pokemonInfo.numero = data.id;
        this.pokemonInfo.nombre = data.name;
        this.pokemonInfo.foto_normal = data.sprites.front_default;
        this.pokemonInfo.foto_shiny = data.sprites.front_shiny;
        this.pokemonInfo.habilidad_principal = data.abilities[0].ability.name;
        if(data.types.length > 1) {
          let tipos:string = ''
          data.types.forEach((x: any)=> {
            tipos = tipos + x.type.name + ' / '
          })
          this.pokemonInfo.tipo = tipos.substring(0,tipos.length -3)
        } else {
          this.pokemonInfo.tipo = data.types[0].type.name
        }
        this.listaPokemon.push(this.pokemonInfo);
        this.pokemonInfo = {} as PokemonInfo;
      })
    })
  }

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

}
