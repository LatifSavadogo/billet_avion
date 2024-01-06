// Importation des modules nécessaires depuis les bibliothèques et plugins Angular/Ionic
import { Clipboard } from '@angular/cdk/clipboard'; // Module pour accéder au presse-papiers
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core'; // Modules Angular pour la création de composants et la manipulation du DOM
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx'; // Module Ionic pour ouvrir des fichiers
import { File } from '@ionic-native/file/ngx'; // Module Ionic pour manipuler des fichiers
import { AlertController, ModalController, NavController, Platform, ToastController } from '@ionic/angular'; // Modules Ionic pour diverses fonctionnalités liées à l'interface utilisateur
import { initializeApp } from 'firebase/app'; // Fonction pour initialiser une application Firebase
import { get, getDatabase, push, ref, remove, set } from "firebase/database"; // Fonctions Firebase pour interagir avec la base de données en temps réel
import * as pdfMake from 'pdfmake/build/pdfmake'; // Bibliothèque pour générer des documents PDF côté client
import * as pdfFonts from 'pdfmake/build/vfs_fonts'; // Polices utilisées par pdfMake
import { Margins } from 'pdfmake/interfaces'; // Interface définissant les marges pour le document PDF
import { ResumeService } from './ResumeBillet.service'; // Service Angular pour la gestion des CV

// Configuration de pdfMake avec les polices nécessaires
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

// Définition du composant Angular pour la page "billet"
@Component({
  selector: 'app-billet',
  templateUrl: './billet.page.html',
  styleUrls: ['./billet.page.scss'],
  providers: [
    File, FileOpener  // Ajoute File et FileOpener à la liste des fournisseurs pour l'injection de dépendances
  ]
})

// Définition de la classe BilletPage implémentant OnInit
export class BilletPage implements OnInit {
  // Propriétés de la classe
  [x: string]: any; // Utilisation d'un index pour accepter n'importe quelle propriété

  // Propriétés privées
  private identifiantFourni: boolean = false;
  private billetElement: HTMLElement | null;
  //public qrdata: string = '';
  // Propriétés du formulaire
  option1: boolean = false;
  option2: boolean = false;
  selectedOption: string = 'option1';
  dateError: boolean = false;
  selectedDateAller: string = '';
  selectedNom: string = '';
  selectedPrenom: string = '';
  selectedDateAllerRetour: string = '';
  selectedDateRetour: string = '';
  selectedVilleDepart: string = '';
  selectedVilleArrive: string = '';
  selectedPassager: string[] = [];
  selectedVilleDepartRetour: string = '';
  selectedVilleArriveRetour: string = '';
  selectedPassagerRetour: string[] = [];
  selectedOptionDePaiement: string = '';
  optionsDePaiement: any[] = [];
  selectedPaiementCompte: string = '';
  selectedPaiementMdp: string = '';
  nouveauBilletId: string = '';
  identifiantDuBillet: string = '';
  db: any;
  prix: string = '';
  codeQR: string = '';
  donnerBillet: string = '';

  // Constructeur de la classe BilletPage
  constructor(
    private androidPermissions: AndroidPermissions,
    private renderer: Renderer2, 
    private el: ElementRef,
    private alertController: AlertController,
    private modalController: ModalController,
    private navCtrl:NavController,
    private toastController: ToastController,
    private clipboard: Clipboard,
    private file: File,
    private fileOpener: FileOpener, 
    private platform: Platform,
    private resumeService: ResumeService,
  ) {this.billetElement = null;

    // Initialisation des options de paiement
    this.optionsDePaiement = [
      // ... (Liste des options de paiement, avec villes de départ, d'arrivée et prix)
      { selectedOption:'option1', villeDepart: 'Ouagadougou, Burkina Faso', villeArrivee: 'Bobo Dioulasso, Burkina Faso', prix: 57 },
      { selectedOption:'option2', villeDepart: 'Ouagadougou, Burkina Faso', villeArrivee: 'Bobo Dioulasso, Burkina Faso', prix: 125 },
      { selectedOption:'option1', villeDepart: 'Bobo Dioulasso, Burkina Faso', villeArrivee: 'Ouagadougou, Burkina Faso', prix: 57 },
      { selectedOption:'option2', villeDepart: 'Bobo Dioulasso, Burkina Faso', villeArrivee: 'Ouagadougou, Burkina Faso', prix: 125 },
      { selectedOption:'option1', villeDepart: 'Ouagadougou, Burkina Faso', villeArrivee: 'Bamako, Mali', prix: 226 },
      { selectedOption:'option2', villeDepart: 'Ouagadougou, Burkina Faso', villeArrivee: 'Bamako, Mali', prix: 439 },
      { selectedOption:'option1', villeDepart: 'Bobo Dioulasso, Burkina Faso', villeArrivee: 'Bamako, Mali', prix: 293 },
      { selectedOption:'option2', villeDepart: 'Bobo Dioulasso, Burkina Faso', villeArrivee: 'Bamako, Mali', prix: 526 },
      { selectedOption:'option1', villeDepart: 'Ouagadougou, Burkina Faso', villeArrivee: 'Yamoussoukro, Côte d\'Ivoire', prix: 38.01 },
      { selectedOption:'option2', villeDepart: 'Ouagadougou, Burkina Faso', villeArrivee: 'Yamoussoukro, Côte d\'Ivoire', prix: 84.73 },
      { selectedOption:'option1', villeDepart: 'Bobo Dioulasso, Burkina Faso', villeArrivee: 'Yamoussoukro, Côte d\'Ivoire', prix: 282 },
      { selectedOption:'option2', villeDepart: 'Bobo Dioulasso, Burkina Faso', villeArrivee: 'Yamoussoukro, Côte d\'Ivoire', prix: 534 },
      { selectedOption:'option1', villeDepart: 'Ouagadougou, Burkina Faso', villeArrivee: 'Abidjan, Côte d\'Ivoire', prix: 249 },
      { selectedOption:'option2', villeDepart: 'Ouagadougou, Burkina Faso', villeArrivee: 'Abidjan, Côte d\'Ivoire', prix: 422 },
      { selectedOption:'option1', villeDepart: 'Bobo Dioulasso, Burkina Faso', villeArrivee: 'Abidjan, Côte d\'Ivoire', prix: 220 },
      { selectedOption:'option2', villeDepart: 'Bobo Dioulasso, Burkina Faso', villeArrivee: 'Abidjan, Côte d\'Ivoire', prix: 410 },
      { selectedOption:'option1', villeDepart: 'Ouagadougou, Burkina Faso', villeArrivee: 'Abidjan, Côte d\'Ivoire', prix: 249 },
      { selectedOption:'option2', villeDepart: 'Ouagadougou, Burkina Faso', villeArrivee: 'Abidjan, Côte d\'Ivoire', prix: 422 },
      { selectedOption:'option1', villeDepart: 'Bobo Dioulasso, Burkina Faso', villeArrivee: 'Abidjan, Côte d\'Ivoire', prix: 220 },
      { selectedOption:'option2', villeDepart: 'Bobo Dioulasso, Burkina Faso', villeArrivee: 'Abidjan, Côte d\'Ivoire', prix: 410 },
      { selectedOption:'option1', villeDepart: 'Ouagadougou, Burkina Faso', villeArrivee: 'Accra, Ghana', prix: 293 },
      { selectedOption:'option2', villeDepart: 'Ouagadougou, Burkina Faso', villeArrivee: 'Accra, Ghana', prix: 529 },
      { selectedOption:'option1', villeDepart: 'Bobo Dioulasso, Burkina Faso', villeArrivee: 'Accra, Ghana', prix: 165 },
      { selectedOption:'option2', villeDepart: 'Bobo Dioulasso, Burkina Faso', villeArrivee: 'Accra, Ghana', prix: 300 },
      { selectedOption:'option1', villeDepart: 'Ouagadougou, Burkina Faso', villeArrivee: 'Lomé, Togo', prix: 289 },
      { selectedOption:'option2', villeDepart: 'Ouagadougou, Burkina Faso', villeArrivee: 'Lomé, Togo', prix: 410 },
      { selectedOption:'option1', villeDepart: 'Bobo Dioulasso, Burkina Faso', villeArrivee: 'Lomé, Togo', prix: 525 },
      { selectedOption:'option2', villeDepart: 'Bobo Dioulasso, Burkina Faso', villeArrivee: 'Lomé, Togo', prix: 1000 },
      { selectedOption:'option1', villeDepart: 'Ouagadougou, Burkina Faso', villeArrivee: 'Dakar, Senegal', prix: 283 },
      { selectedOption:'option2', villeDepart: 'Ouagadougou, Burkina Faso', villeArrivee: 'Dakar, Senegal', prix: 588 },
      { selectedOption:'option1', villeDepart: 'Bobo Dioulasso, Burkina Faso', villeArrivee: 'Dakar, Senegal', prix: 330 },
      { selectedOption:'option2', villeDepart: 'Bobo Dioulasso, Burkina Faso', villeArrivee: 'Dakar, Senegal', prix: 594 },
      { selectedOption:'option1', villeDepart: 'Ouagadougou, Burkina Faso', villeArrivee: 'Niamey, Niger', prix: 458 },
      { selectedOption:'option2', villeDepart: 'Ouagadougou, Burkina Faso', villeArrivee: 'Niamey, Niger', prix: 522 },
      { selectedOption:'option1', villeDepart: 'Bobo Dioulasso, Burkina Faso', villeArrivee: 'Niamey, Niger', prix: 150 },
      { selectedOption:'option2', villeDepart: 'Bobo Dioulasso, Burkina Faso', villeArrivee: 'Niamey, Niger', prix: 300 },
      { selectedOption:'option1', villeDepart: 'Ouagadougou, Burkina Faso', villeArrivee: 'Cotonou, Benin', prix: 283 },
      { selectedOption:'option2', villeDepart: 'Ouagadougou, Burkina Faso', villeArrivee: 'Cotonou, Benin', prix: 520 },
      { selectedOption:'option1', villeDepart: 'Bobo Dioulasso, Burkina Faso', villeArrivee: 'Cotonou, Benin', prix: 417 },
      { selectedOption:'option2', villeDepart: 'Bobo Dioulasso, Burkina Faso', villeArrivee: 'Cotonou, Benin', prix: 747 }
      
    ];
    
    // Configuration de Firebase
    const firebaseConfig = {
      apiKey: 'AIzaSyCs37Ib7mVPUrIGKAAMEbbww1KdsfrCqcw',
    authDomain: 'projetmobilecopie.firebaseapp.com',
    projectId: 'projetmobilecopie',
    storageBucket: 'projetmobilecopie.appspot.com',
    messagingSenderId: '222725529279',
    appId: '1:222725529279:web:ea0fd6012a13c07070700a',
    measurementId: 'G-0BJPTEY1MZ'
    };
    // Initialisation de l'application Firebase
    const app = initializeApp(firebaseConfig);
    this.db = getDatabase(app);
  }

  /**
* Met à jour le prix en fonction des options sélectionnées.
*/
  updatePrix() {
    if (this.selectedOption === 'option1') {
      // Vérifie si la ville de départ et la ville d'arrivée ne sont pas les mêmes
      if (this.selectedVilleDepart === this.selectedVilleArrive) {
        this.presentAlert('Erreur', 'La ville de départ et la ville d\'arrivée ne peuvent pas être les mêmes.');
        this.prix = '';
        return;
      }

      // Calcule et assigne le prix en fonction des villes de départ et d'arrivée
      this.prix = this.getPrix(this.selectedVilleDepart, this.selectedVilleArrive);
    } else if (this.selectedOption === 'option2') {
      // Vérifie si la ville de départ et la ville d'arrivée pour l'aller-retour ne sont pas les mêmes
      if (this.selectedVilleDepartRetour === this.selectedVilleArriveRetour) {
        this.presentAlert('Erreur', 'La ville de départ et la ville d\'arrivée pour l\'aller-retour ne peuvent pas être les mêmes.');
        this.prix = '';
        return;
      }

      // Calcule et assigne le prix en fonction des villes de départ et d'arrivée pour l'aller-retour
      this.prix = this.getPrix(this.selectedVilleDepartRetour, this.selectedVilleArriveRetour);
    }
  }

  /**
   * Obtient le prix en fonction de la ville de départ et de la ville d'arrivée sélectionnées.
   * @param {string} villeDepart - La ville de départ.
   * @param {string} villeArrivee - La ville d'arrivée.
   * @returns {number} Le prix correspondant aux villes de départ et d'arrivée, ou 0 si aucune correspondance n'est trouvée.
   */
      //Fixe les prix en fonction de la ville de depart et de la ville d'arrivée selectionnée
      getPrix(villeDepart: string, villeArrivee: string) {
        // Recherche l'option correspondant aux villes de départ et d'arrivée dans la liste des options de paiement
        const option = this.optionsDePaiement.find( 
          (opt) =>
            opt.villeDepart === villeDepart &&
            opt.villeArrivee === villeArrivee
        );
        // Retourne le prix de l'option si elle est trouvée, sinon retourne 0
        return option ? option.prix : 0;
      }
        
      /**
    * Affiche une boîte de dialogue pour entrer l'identifiant d'un billet à supprimer.
    * La boîte de dialogue permet à l'utilisateur d'entrer l'identifiant du billet à supprimer.
    * Si l'utilisateur appuie sur "Supprimer", la fonction `supprimerEnregistrement` est appelée avec l'identifiant fourni.
    * Si l'utilisateur appuie sur "Annuler", la boîte de dialogue est fermée sans effectuer d'action.
    * @returns {Promise<void>} Une promesse résolue lorsque la boîte de dialogue est fermée.
    */
      async showInputDialog() {
    // Crée une boîte de dialogue d'alerte
        const alert = await this.alertController.create({
          header: 'Supprimer un Billet',
          inputs: [
            {
              name: 'identifiant',
              type: 'text',
              placeholder: ' Entrez l\'identifiant du billet ',
            },
          ],
          buttons: [
            {
              text: 'Annuler',
              role: 'cancel',
            },
            {
              text: 'Supprimer',
              handler: (data) => {
                // Récupère l'identifiant saisi par l'utilisateur et appelle la fonction de suppression
                const identifiant = data.identifiant;
                this.supprimerEnregistrement(identifiant);
              },
            },
          ],
        });
        // Affiche la boîte de dialogue
        await alert.present();
      }
    
      /**
    * Affiche une boîte de dialogue d'alerte avec un titre et un message spécifiés.
    * La boîte de dialogue contient un bouton "OK" permettant à l'utilisateur de fermer la boîte de dialogue.
    * @param {string} title - Le titre de la boîte de dialogue d'alerte.
    * @param {string} message - Le message affiché dans la boîte de dialogue.
    * @returns {Promise<void>} Une promesse résolue lorsque la boîte de dialogue est fermée.
    */
      async presentAlert(title: string, message: string): Promise<void> {
        // Crée une boîte de dialogue d'alerte avec le titre et le message spécifiés
        const alert = await this.alertController.create({
          header: title,
          message: message,
          buttons: ['OK'], // Ajoute un bouton "OK" à la boîte de dialogue
        });

        // Affiche la boîte de dialogue
        await alert.present();
      }

  /**
* Affiche une boîte de dialogue demandant à l'utilisateur d'entrer l'identifiant du billet.
* La boîte de dialogue contient un champ de texte pour l'entrée de l'identifiant, ainsi que des boutons "Annuler" et "Valider".
* L'identifiant saisi est ensuite stocké dans la variable `identifiantDuBillet` et le téléchargement du billet est déclenché.
* @returns {Promise<void>} Une promesse résolue lorsque la boîte de dialogue est fermée.
*/
  async demanderIdentifiant(): Promise<void> {
    const alerteIdentifiant = await this.alertController.create({
      header: 'Entrer l\'identifiant',
      inputs: [
        {
          name: 'identifiant',
          type: 'text',
          placeholder: 'Entrez l\'identifiant du billet',
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Valider',
          handler: async (data) => {
            console.log('Identifiant saisi :', data.identifiant);
            this.identifiantDuBillet = data.identifiant;

            // Définir identifiantFourni à true après avoir saisi l'identifiant
            this.identifiantFourni = true;
            // Référence à l'emplacement du billet dans la base de données Firebase
            const billetRef = ref(this.db, 'Billets/' + data.identifiant);

            // Obtient une snapshot des données du billet depuis la base de données
            const snapshot = await get(billetRef);
            const billetData = snapshot.val();
            
            if (billetData) {
              console.log('Données du billet :', billetData);

              // Déclenche le téléchargement du billet
              this.telechargerBillet(this.identifiantDuBillet);
            } else {
              console.log('Aucun billet trouvé avec cet identifiant.');
            }
          },
        },
      ],
    });

    // Affiche la boîte de dialogue
    await alerteIdentifiant.present();
  }

      
  /**
* Télécharge le billet correspondant à l'identifiant fourni en utilisant la base de données Firebase.
* Affiche des messages d'erreur si l'identifiant n'est pas fourni ou si le billet n'est pas trouvé.
* @param {string} identifiant - L'identifiant du billet à télécharger.
* @returns {Promise<void>} Une promesse résolue après le téléchargement du billet.
*/
  async telechargerBillet(identifiant: string): Promise<void> {
    // Vérifie si l'identifiant est fourni
    if (!identifiant) {
      console.log("Identifiant non fourni");
      // Affiche un toast indiquant à l'utilisateur de fournir un identifiant
      this.presentToast("Veuillez fournir un identifiant");
      return;
    }

    // Référence à l'emplacement du billet dans la base de données Firebase
    const billetRef = ref(this.db, 'Billets/' + identifiant);

    // Obtient une snapshot des données du billet depuis la base de données
    const snapshot = await get(billetRef);
    const billetData = snapshot.val();
    // Vérifie si des données de billet ont été trouvées
    if (billetData) {
      // Lance la génération et le téléchargement du PDF du billet
      await this.genererEtTelechargerBillet(billetData);
    } else {
      console.log("Billet non trouvé");
      // Affiche une alerte et un toast en cas d'identifiant incorrect
      this.presentAlert1('Erreur', 'Le billet avec l\'identifiant fourni n\'existe pas');
      this.presentToast('Le billet avec l\'identifiant fourni n\'existe pas');
    }
  }

      /**
    * Affiche une alerte avec un titre et un message donnés.
    * @param {string} header - Le titre de l'alerte.
    * @param {string} message - Le message de l'alerte.
    * @returns {Promise<void>} Une promesse résolue après l'affichage de l'alerte.
    */
      async presentAlert1(header: string, message: string): Promise<void> {
        // Crée une alerte avec le titre, le message et un bouton 'OK'
        const alert = await this.alertController.create({
          header: header,
          message: message,
          buttons: ['OK']
        });

        // Affiche l'alerte
        await alert.present();
      }

    
      /**
    * Affiche un toast avec un message donné.
    * @param {string} message - Le message du toast.
    * @returns {Promise<void>} Une promesse résolue après l'affichage du toast.
    */
      async presentToast(message: string): Promise<void> {
        // Crée un toast avec le message, une durée de 3000 ms et une position en bas
        const toast = await this.toastController.create({
          message: message,
          duration: 3000,  // Durée du toast en millisecondes
          position: 'bottom'  // Position du toast
        });

        // Affiche le toast
        await toast.present();
      }
      /**
       * Vérifie si les conditions nécessaires pour le billet sont remplies.
       * @param {any} billetData - Les données du billet à vérifier.
       * @param {string} identifiantSaisi - L'identifiant saisi à comparer.
       * @returns {boolean} True si les conditions sont remplies, sinon False.
       */
      verifierConditions(billetData: any, identifiantSaisi: string): boolean {
        // Compare l'identifiant du billet avec l'identifiant saisi
        return billetData.identifiant === identifiantSaisi;
      }

      /**
    * Génère un fichier PDF à partir des données du billet.
    * @param {any} billetData - Les données du billet pour générer le PDF.
    * @returns {Promise<Blob>} Une promesse qui résout avec le Blob du PDF généré.
    */
    async genererPDF(billetData: any): Promise<Blob> {
      return new Promise<Blob>((resolve, reject) => {
        try {
          // Contenu du PDF
          const content: any[] = [
            { text: 'Billet', style: 'header' },
          ];

          // Colonnes à exclure du PDF
          const excludedColumns = ['selectedPaiementCompte', 'selectedPaiementMdp'];

          // Mappage des colonnes avec leurs noms d'affichage
          const columnMapping: Record<string, string> = {
            selectedNom: 'Nom',
            selectedPrenom: 'Prénom',
            VillesDeDepart: 'Ville de départ',
            VillesDArrive: 'Ville d\'arrivée',
            DateAller: 'Date aller',
            DateRetour: 'Date retour',
            Passagers: 'Passagers',
            Prix: 'Prix',
          };
          // Parcours des colonnes
          const orderedColumns = [
            'selectedNom',
            'selectedPrenom',
            'VillesDeDepart',
            'VillesDArrive',
            'DateAller',
            'DateRetour',
            'Passagers',
            'Prix',
          ];

          for (const key of orderedColumns) {
            if (billetData.hasOwnProperty(key) && !excludedColumns.includes(key)) {
              const value = billetData[key];

              if (value !== undefined && value !== null && value !== '') {
                const displayName = columnMapping[key] || key;

                // Concaténer le montant et la devise s'ils sont présents
                const displayValue = key === 'Prix' ? `${value}` : value;

                // Ajout des colonnes au contenu
                content.push({
                  columns: [
                    { text: `${displayName}:`, style: 'label' },
                    { text: `${displayValue}`, style: 'value' },
                  ],
                  margin: [0, 5] as Margins,
                });
              }
            }
          }
          // Conversion des données du billet en JSON
          const billetDataJSON = JSON.stringify(billetData);
          // Définition du document PDF
          const docDefinition = {
            content: [
              // Ajout du code QR avec les données JSON
              {
                qr: billetDataJSON,
                fit: 100,
                alignment: 'center',
                margin: [0, 10],
              },
              // Ajout du contenu du billet
              ...content,
            ],
            styles: {
              // Style pour l'en-tête du document
              header: {
                fontSize: 18,
                bold: true,
                alignment: 'center' as const,
                margin: [0, 0, 0, 20] as Margins,
              },
              // Style pour les libellés des colonnes
              label: {
                bold: true,
                margin: [0, 0, 5, 0] as Margins,
              },
              // Style pour les valeurs des colonnes
              value: {
                margin: [0, 0, 0, 0] as Margins,
              },
            },
          };

          // Création du PDF et récupération du Blob
          pdfMake.createPdf(docDefinition).getBlob((blob: Blob) => {
            resolve(blob);
          });
        } catch (error) {
          // Rejet de la promesse en cas d'erreur
          reject(error);
        }
      });
    }

  async genererEtTelechargerBillet(billetData: any) {
    try {
      console.log('Données du billet :', billetData);

      const pdfBlob = await this.genererPDF(billetData);

      if (this.identifiantFourni) {
        const fileName = 'billet.pdf';

        if (this.platform.is('android')) {
          console.log('Environnement android ?', this.platform.is('android'));
          /**const folderName = 'airburkina';
          const filePath = this.file.dataDirectory + folderName + '/';

          // Vérifier si le dossier existe
          this.file.checkDir(this.file.dataDirectory, folderName).then((exists) => {
            if (!exists) {
              // Créer le dossier s'il n'existe pas
              this.file.createDir(this.file.dataDirectory, folderName, true).then(() => {
                console.log('Dossier créé avec succès');
                // Écrire le fichier dans le dossier créé
                this.file.writeFile(filePath, fileName, pdfBlob, { replace: true }).then(() => {
                  console.log('Fichier écrit avec succès');
                }).catch((error) => {
                  console.error('Erreur lors de l\'écriture du fichier :', error);
                });
              }).catch((error) => {
                console.error('Erreur lors de la création du dossier :', error);
              });
            } else {
              // Écrire le fichier dans le dossier existant
              this.file.writeFile(filePath, fileName, pdfBlob, { replace: true }).then(() => {
                console.log('Fichier écrit avec succès');
              }).catch((error) => {
                console.error('Erreur lors de l\'écriture du fichier :', error);
              });
            }
          }).catch((error) => {
            console.error('Erreur lors de la vérification du dossier :', error);
          });
        }  */
          // Vérifier et demander des autorisations
          const permission = 'WRITE_EXTERNAL_STORAGE';
          this.androidPermissions.checkPermission(permission)
            .then((result) => {
              if (!result.hasPermission) {
                this.androidPermissions.requestPermission(permission);
              } else {
                this.enregistrerPDFAndroid(pdfBlob, fileName);
              }
            });
        }
          else {
          const url = window.URL.createObjectURL(pdfBlob);
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.href = url;
          a.download = fileName;
          a.click();
          window.URL.revokeObjectURL(url);
        }
      } else {
        this['presentAler']('Identifiant non fourni');
      }
    } catch (error) {
      console.error('Une erreur s\'est produite :', error);
      this['presentAler']('Une erreur s\'est produite');
    }
  }
  private enregistrerPDFAndroid(pdfBlob: Blob, fileName: string) {
    const folderName = 'airburkina';
    const filePath = this.file.dataDirectory + folderName + '/';

    // Vérifier si le dossier existe
    this.file.checkDir(this.file.dataDirectory, folderName).then((exists) => {
      if (!exists) {
        // Créer le dossier s'il n'existe pas
        this.file.createDir(this.file.dataDirectory, folderName, true).then(() => {
          console.log('Dossier créé avec succès');
          // Écrire le fichier dans le dossier créé
          this.file.writeFile(filePath, fileName, pdfBlob, { replace: true }).then(() => {
            console.log('Fichier écrit avec succès');
          }).catch((error) => {
            console.error('Erreur lors de l\'écriture du fichier :', error);
          });
        }).catch((error) => {
          console.error('Erreur lors de la création du dossier :', error);
        });
      } else {
        // Écrire le fichier dans le dossier existant
        this.file.writeFile(filePath, fileName, pdfBlob, { replace: true }).then(() => {
          console.log('Fichier écrit avec succès');
        }).catch((error) => {
          console.error('Erreur lors de l\'écriture du fichier :', error);
        });
      }
    }).catch((error) => {
      console.error('Erreur lors de la vérification du dossier :', error);
    });
  }
      //Ajouter des données dans la base de donnée
      async AjouterData() {
        const dateActuelle = new Date();
        const dateAller = new Date(this.selectedDateAller);
      
        // Vérifiez si la date sélectionnée est dans le futur
        if (dateAller < dateActuelle) {
          this.afficherToast("La date de départ ne peut pas être dans le passé.", 'danger');
          return;
        }
        // Vérification pour l'option 2
        const dateAllerRetour = new Date(this.selectedDateAllerRetour)
        if (dateAllerRetour < dateActuelle) {
          this.afficherToast("La date de départ ne peut pas être dans le passé.", 'danger');
          return;
        }
        // Vérification pour la date de retour de l'option 2
        if (this.selectedDateRetour) {
          const dateRetour = new Date(this.selectedDateRetour);
              if (dateRetour < dateActuelle) {
                this.afficherToast("La date de retour ne peut pas être dans le passé.", 'danger');
                return;
              }
        }
        // Vérification des champs obligatoires
        if (this.selectedOption === 'option1') {
          if (!this.selectedNom || !this.selectedPrenom || !this.selectedVilleDepart || !this.selectedVilleArrive || !this.selectedDateAller || this.selectedPassager.length === 0) {
            this.afficherToast("Veuillez remplir tous les champs obligatoires.", 'danger');
            return;
          }
        } else if (this.selectedOption === 'option2') {
          if (!this.selectedNom || !this.selectedPrenom || !this.selectedVilleDepartRetour || !this.selectedVilleArriveRetour || !this.selectedDateAllerRetour || !this.selectedDateRetour || this.selectedPassagerRetour.length === 0) {
            this.afficherToast("Veuillez remplir tous les champs obligatoires.", 'danger');
            return;
          }
        } else {
          this.afficherToast("Veuillez sélectionner une option.", 'danger');
          return;
        }
        // Référence à la collection "Billets"
        const billetRef = ref(this.db, 'Billets');
        const newBilletRef = push(billetRef);
        // Données du billet
        const billetData = {
          selectedNom: this.selectedNom,
          selectedPrenom: this.selectedPrenom,
          VillesDeDepart: (this.selectedOption === 'option1' && this.selectedVilleDepart) || (this.selectedOption === 'option2' && this.selectedVilleDepartRetour),
          VillesDArrive: (this.selectedOption === 'option1' && this.selectedVilleArrive) || (this.selectedOption === 'option2' && this.selectedVilleArriveRetour),
          DateAller: (this.selectedOption === 'option1' && this.selectedDateAller) || (this.selectedOption === 'option2' && this.selectedDateAllerRetour),
          DateRetour: this.selectedDateRetour,
          Passagers: (this.selectedOption === 'option1' && this.selectedPassager) || (this.selectedOption === 'option2' && this.selectedPassagerRetour),
          Prix: this.prix + '€',
          selectedPaiementCompte: this.selectedPaiementCompte,
          selectedPaiementMdp: this.selectedPaiementMdp,
          };
      
        try {
          // Enregistrement du billet dans la base de données
          await set(newBilletRef, billetData);
          // Récupération de l'identifiant du nouveau billet
          const nouveauBilletId = newBilletRef.key ?? ''; // Utilise une chaîne vide comme valeur par défaut si newBilletRef.key est null
          // Récupération des données du billet ajouté
          const billetRefApresAjout = ref(this.db, `Billets/${nouveauBilletId}`);
          const snapshotApresAjout = await get(billetRefApresAjout);
          const billetDataApresAjout = snapshotApresAjout.val();

          // Stockez les données résumées dans la variable codeQr
          //this.codeQR = billetDataApresAjout;
          // Effectuer le paiement
          await this.effectuerPaiementAjout(nouveauBilletId);
          // Stockez les données résumées dans le service
            this.resumeService.setResumeData(billetData);

          
          // Redirection vers la nouvelle page d'identifiant
          //this.navCtrl.navigateForward(`/identifiant-billet/${nouveauBilletId}`);
            
          // Afficher une alerte personnalisée avec la possibilité de copier l'identifiant
          const alerteMessage = `Billet enregistré avec succès. Identifiant : ${nouveauBilletId}`;
          const alerte = await this.alertController.create({
            header: 'Succès',
            message: alerteMessage,
            buttons: [
              {
                text: 'Copier l\'identifiant',
                handler: () => {
                  // Copier l'identifiant dans le presse-papiers
                  this.copierIdentifiant(nouveauBilletId);
                  // Redirection vers la page de résumé
                  this.navCtrl.navigateForward('/resume-billet');

                }
              },
              {
                text: 'OK',
                role: 'cancel',
              },
            ],
          });
          // Gestion de l'erreur en cas d'échec de l'enregistrement du billet
          await alerte.present();
        } catch (erreur) {
          alert('Échec de l\'enregistrement du billet : ' + erreur);
        }
        // Réinitialiser les valeurs après l'ajout réussi
         this.selectedNom = '' ;
         this.selectedPrenom = '' ;
         this.selectedVilleDepart = '';
         this.selectedVilleArrive = '';
         this.selectedDateAller = '';
         this.selectedDateRetour = '';
         this.selectedPassager = [];
         this.selectedVilleDepartRetour = '';
         this.selectedVilleArriveRetour = '';
         this.selectedDateAllerRetour = '';
         this.selectedDateRetour = '';
         this.selectedPassagerRetour = [];
         this.prix = ''; 
        this.selectedPaiementCompte = '';
        this.selectedPaiementMdp = '';
      }
        
        /**
        * Copie l'identifiant dans le presse-papiers.
        * @param identifiant - L'identifiant à copier.
        */
        copierIdentifiant(identifiant: string) {
          // Copiez l'identifiant dans le presse-papiers
          this.clipboard.copy(identifiant);
        
          } 
      
        /**
      * Affiche un toast avec le message spécifié et la couleur donnée.
      * @param message - Le message à afficher dans le toast.
      * @param couleur - La couleur du toast ('danger' pour les erreurs, 'success' pour les succès, etc.).
      */
      async afficherToast(message: string, couleur: string) {
        const toast = await this.toastController.create({
          message: message,
          duration: 3000, // Durée d'affichage du toast en millisecondes
          position: 'bottom', // Position du toast 
          color: couleur, // Couleur du toast ( 'danger' pour les erreurs, 'success' pour succès, etc.)
        });

        toast.present();
        // Affichage des informations pour le débogage
        console.log('selectedVilleDepart:', this.selectedVilleDepart);
        console.log('selectedVilleArrive:', this.selectedVilleArrive);
        console.log('selectedDateAller:', this.selectedDateAller);
        console.log('selectedDateRetour:', this.selectedDateRetour);
        console.log('selectedPassager:', this.selectedPassager);

      }

      /**
    * Calcule la différence en jours entre deux dates.
    * @param date1 - La première date.
    * @param date2 - La deuxième date.
    * @returns La différence en jours entre les deux dates.
    */
      getDaysDifference(date1: Date, date2: Date): number {
        const timeDifference = date1.getTime() - date2.getTime();
        return timeDifference / (1000 * 3600 * 24);
      }

      /**
    * Supprime un enregistrement de billet après vérification de la date de départ.
    * @param identifiant - L'identifiant du billet à supprimer.
    */
  async supprimerEnregistrement(identifiant: string) {
    // Vérifiez si l'identifiant est vide ou nul
    if (!identifiant) {
      this.afficherToast("Veuillez saisir un identifiant pour supprimer un billet.", 'danger');
      return;
    }

    const billetRef = ref(this.db, 'Billets/' + identifiant);

    try {
      // Vérifier si l'enregistrement existe avant de le supprimer
      const snapshot = await get(billetRef);
      if (snapshot.exists()) {
        const billetData = snapshot.val();
        const dateDepart = new Date(billetData.DateAller);
        const currentDate = new Date();

        // Vérifier si la date de départ est dans les 15 prochains jours
        const joursAvantDepart = Math.floor((dateDepart.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));

        if (joursAvantDepart <= 15) {
          // Demander le paiement de 15% du prix du billet
          const montantPaiement = billetData.Prix * 0.15;

          // Afficher une alerte pour informer de la nécessité de paiement
          const alert = await this.alertController.create({
            header: 'Paiement requis',
            message: `La date de départ est dans les 15 prochains jours. Vous devez payer 15% du prix du billet pour effectuer la suppression. Voulez-vous continuer?`,
            buttons: [
              {
                text: 'Annuler',
                role: 'cancel',
              },
              {
                text: 'Continuer',
                handler: async () => {
                  // Effectuer le paiement
                  await this.effectuerPaiement(identifiant);

                  // Supprimer le billet
                  await remove(billetRef);

                  this.afficherToast(`Le billet avec l'identifiant ${identifiant} a été supprimé avec succès.`, 'success');
                },
              },
            ],
          });

          await alert.present();
        } else {
          // Si la date de départ est après 15 jours, supprimer directement
          await remove(billetRef);
          this.afficherToast(`Le billet avec l'identifiant ${identifiant} a été supprimé avec succès.`, 'success');
        }
      } else {
        this.afficherToast(`Le billet avec l'identifiant ${identifiant} n'existe pas. Suppression annulée.`, 'danger');
      }
    } catch (error) {
      this.afficherToast(`Échec de la suppression du billet : ${error}`, 'danger');
    }
  }

  // Fonction pour effectuer le paiement de 15%
  async effectuerPaiement(identifiant: string) {
    // Obtenez les détails du billet
    const billetRef = ref(this.db, 'Billets/' + identifiant);
    const snapshot = await get(billetRef);
    const billetData = snapshot.val();

      // Exemple d'ajout de console.log() pour le débogage
      console.log('Valeur de billetData.Prix :', billetData.Prix);
    // Retirez le symbole '€' de la propriété 'Prix' avant de convertir en nombre
    const prixSansSymbole = billetData.Prix.replace('€', '');
    console.log('Valeur du billet sans le symbole €  :', prixSansSymbole);
    // Convertissez la propriété 'Prix' en nombre
    const prixEnNombre = Number(prixSansSymbole);
      console.log('Valeur de prixEnNombre après conversion :', prixEnNombre);

      // Montant du paiement égal à 15% du prix du billet
      const montantPaiement = prixEnNombre * 0.15;
      console.log('Montant du paiement calculé :', montantPaiement);



    // Créez une référence pour la section des paiements
    const paiementsRef = ref(this.db, 'Paiements');

    // Enregistrez les détails de la transaction dans la section des paiements
    const nouveauPaiementRef = push(paiementsRef);
    const paiementData = {
      BilletId: identifiant,
      Montant: montantPaiement,
      Date: new Date().toISOString(),
      // Vous pouvez également ajouter d'autres détails de transaction si nécessaire
    };

    // Enregistrez les détails du paiement
    await set(nouveauPaiementRef, paiementData);

    // Affichez un message ou effectuez d'autres actions nécessaires
    this.afficherToast(`Paiement de 15% effectué avec succès pour le billet ${identifiant}. Montant payé : ${montantPaiement} FCFA.`, 'success');
  }


  /**
    * Effectue un paiement pour un billet après vérification de la date de départ.
    * @param identifiant - L'identifiant du billet pour lequel le paiement est effectué.
    */
      //Effectue le paiement lors de l'ajout des données dans la base données 
      async effectuerPaiementAjout(identifiant: string) {
        // Obtenez les détails du billet
        const billetRef = ref(this.db, 'Billets/' + identifiant);
        const snapshot = await get(billetRef);
        const billetData = snapshot.val();

        // Montant du paiement égal au prix total du billet
        const montantPaiement = billetData.Prix;

        // Créez une référence pour la section des paiements
        const paiementsRef = ref(this.db, 'Paiements');

        // Enregistrez les détails de la transaction dans la section des paiements
        const nouveauPaiementRef = push(paiementsRef);
        const paiementData = {
          BilletId: identifiant,
          Montant: montantPaiement,
          Date: new Date().toISOString(),
          // Vous pouvez également ajouter d'autres détails de transaction si nécessaire
        };

          // Enregistrez les détails du paiement
          set(nouveauPaiementRef, paiementData);

          // Affichez un message ou effectuez d'autres actions nécessaires
          this.afficherToast(`Paiement effectué avec succès pour le billet ${identifiant}. Montant payé : ${montantPaiement} €.`, 'success');
        } 

    ngOnInit() {
          
    }
      
  }


