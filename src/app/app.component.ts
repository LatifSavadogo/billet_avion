import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';




@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  

  constructor(private navCtrl: NavController) {}



  afficheHistorique() {
    this.navCtrl.navigateForward("/historique");
  }

  afficheContact() {
    this.navCtrl.navigateForward("/contact");
  }

  afficheApropos() {
    this.navCtrl.navigateForward("/a-propos");
  }
  afficheBilletInfos1(){
    this.navCtrl.navigateForward("/billet-infos1");
  }

}
