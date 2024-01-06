import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref } from 'firebase/database';


@Component({
  selector: 'app-contacter-nous',
  templateUrl: './contacter-nous.page.html',
  styleUrls: ['./contacter-nous.page.scss'],
})
export class ContacterNousPage {
  nom: string = '';
  prenom: string = '';
  email: string = '';
  message: string = '';
  envoiReussi: boolean = false;

  // Initialise la base de données Firebase
  private db;

  constructor(private toastController: ToastController) {
    const firebaseConfig = {
      apiKey: 'AIzaSyCs37Ib7mVPUrIGKAAMEbbww1KdsfrCqcw',
      authDomain: 'projetmobilecopie.firebaseapp.com',
      projectId: 'projetmobilecopie',
      storageBucket: 'projetmobilecopie.appspot.com',
      messagingSenderId: '222725529279',
      appId: '1:222725529279:web:ea0fd6012a13c07070700a',
      measurementId: 'G-0BJPTEY1MZ'
    };
    // Initialise l'application Firebase
    const app = initializeApp(firebaseConfig);

    // Obtient une référence à la base de données Firebase
    this.db = getDatabase(app);

  }

  async submitForm() {
    if (!this.nom || !this.prenom || !this.email || !this.message) {
      const toast = await this.toastController.create({
        message: 'Veuillez remplir tous les champs du formulaire.',
        duration: 2000,
        position: 'bottom',
        color: 'danger',
      });
      toast.present();
      return;
    }

    // Définition de l'expression régulière pour valider le format de l'e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    /*
    ^        : Indique que le motif doit correspondre au début de la chaîne.
    [^\s@]+  : Représente un ou plusieurs caractères qui ne sont ni des espaces ni des '@'.
    @        : Représente le caractère '@' littéral.
    [^\s@]+  : Représente un ou plusieurs caractères qui ne sont ni des espaces ni des '@'.
    \.       : Représente le caractère '.' littéral.
    [^\s@]+  : Représente un ou plusieurs caractères qui ne sont ni des espaces ni des '@'.
    $        : Indique que le motif doit correspondre à la fin de la chaîne.
    */

    // Exemple d'utilisation de l'expression régulière
    const isValidEmail = emailRegex.test('exemple@email.com');

    // 'isValidEmail' sera true si l'e-mail est au format valide, sinon false.

    const contactsRef = ref(this.db, 'contacts');

    push(contactsRef, {
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      message: this.message,
    });

    // Affiche un toast de succès
    const successToast = await this.toastController.create({
      message: 'Votre message a été envoyé avec succès.',
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });
    successToast.present();

    this.nom = '';
    this.prenom = '';
    this.email = '';
    this.message = '';
  }

}
