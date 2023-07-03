import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { environment } from '../environments/environment.prod';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    // Se inicializa Firebase
    const app = initializeApp(environment.firebaseConfig);
    const analytics = getAnalytics(app); 

  }
}
