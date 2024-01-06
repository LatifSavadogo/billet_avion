import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-identifiant-billet',
  templateUrl: './identifiant-billet.page.html',
  styleUrls: ['./identifiant-billet.page.scss'],
})
export class IdentifiantBilletPage implements OnInit {
  nouveauBilletId: string;

  constructor(
    private toastController: ToastController,
    private clipboard: Clipboard, 
    private route: ActivatedRoute,
    private navCtrl: NavController,
    ) {
    // Récupérer l'identifiant du billet depuis l'URL
    this.nouveauBilletId = this.route.snapshot.paramMap.get('id') ?? '';
  }

  copierIdentifiant() {
    // Copier l'identifiant dans le presse-papiers
    this.clipboard.copy(this.nouveauBilletId);
    this.presentToast("identifiant copier avec succès.", 'success');
  }
  async presentToast(message: string, couleur: string): Promise<void> {
    // Crée un toast avec le message, une durée de 3000 ms et une position en bas
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,  // Durée du toast en millisecondes
      position: 'bottom',  // Position du toast
      color:couleur,
    });

    // Affiche le toast
    await toast.present();
  }
    afficheResumeBillet(){
      this.navCtrl.navigateForward('/resume-billet');
    }
  ngOnInit() {
  }

}
