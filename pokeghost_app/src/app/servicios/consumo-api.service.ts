import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ConsumoAPIService {

  constructor(private httpClient:HttpClient) {}

  getPokemones(nombrePokemon: string) {
    return this.httpClient.get(environment.pokeApiURL + nombrePokemon)
  }
}
