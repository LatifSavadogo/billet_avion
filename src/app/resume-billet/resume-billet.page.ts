import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ResumeService } from '../billet/ResumeBillet.service';

@Component({
  selector: 'app-resume-billet',
  templateUrl: './resume-billet.page.html',
  styleUrls: ['./resume-billet.page.scss'],
})
export class ResumeBilletPage implements OnInit {

  // Propriété pour stocker les données résumées
  resumeData: any;

  constructor(private resumeService: ResumeService,
    private navCtrl: NavController) {}
  // Ajoutez la fonction close pour fermer la page
  fermer() {
    this.navCtrl.pop(); // Cela fermera la page
  }

  ngOnInit() {
    // Récupérez les données résumées depuis le service
    this.resumeData = this.resumeService.getResumeData();
  }

}
