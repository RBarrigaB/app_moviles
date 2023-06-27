import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataLoginService {

  nombreUser: string = '';
  claveUser: number = 0;
  tipoAccion: string = '';

  constructor() {}
}
