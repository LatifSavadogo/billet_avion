import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BilletService } from '../billet/billet.service';

@Component({
  selector: 'app-billet-infos',
  templateUrl: './billet-infos.page.html',
  styleUrls: ['./billet-infos.page.scss'],
})
export class BilletInfosPage implements OnInit {
  billets: any[];
  nombreBilletsAjoutes: number = 0;
  billetSelectionne: any = null;

  constructor(
    private billetService: BilletService,
    private navCtrl: NavController
  ) {
    this.billets = this.billetService.getBillets();
  }

  getObjectKeys(obj: any): string[] {
    if (obj) {
      return Object.keys(obj);
    } else {
      return [];
    }
  }

  allerVersBilletInfos() {
    this.navCtrl.navigateForward('/chemin-vers-billet-infos');
    console.log('allerVersBilletInfos fonctionne !');
  }

  afficherDetails(billet: any) {
    this.billetSelectionne = billet;
  }

  ngOnInit() {}
}
