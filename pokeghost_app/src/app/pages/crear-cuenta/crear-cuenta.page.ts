import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController} from '@ionic/angular';
import { DataLoginService } from '../../servicios/data-login.service';
import { AuthGuardService } from 'src/app/servicios/auth-guard.service';


@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.page.html',
  styleUrls: ['./crear-cuenta.page.scss'],
})
export class CrearCuentaPage implements OnInit {

  constructor(private tipoAccionUser: DataLoginService, private animationCtrl: AnimationController) {}

  delay(tiempo:number) {
    return new Promise(val => setTimeout(val,tiempo))
  }

  animationElem() {
    
    const animation:Animation = this.animationCtrl.create()
    .addElement(document.querySelectorAll('.elem-animado')!)
    .duration(1000)
    .iterations(1)
    .fromTo('transform','translateX(0px)','translateX(100px)')

    animation.play();
    this.delay(1000).then(()=>{animation.stop()})

  }

  ngOnInit() {
    this.tipoAccionUser.tipoAccion = 'crear';
    this.animationElem();
  }

}
