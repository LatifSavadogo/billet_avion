import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Billet {
  id: any;
  villeDepart: string;
  villeArrivee: string;
  dateAller: string;
  dateRetour?: string; // Rendre la date de retour optionnelle
  passagers: string[];
  // Les autres propriétés du modèle Billet
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private firestore: Firestore) { }

  getBillets(): Observable<Billet[]> {
    const billetsRef = collection(this.firestore, 'billets');
    return collectionData(billetsRef, { idField: 'id' }) as Observable<Billet[]>;
  }

  addBillet(billet: Billet): Promise<void> {
    const billetsRef = collection(this.firestore, 'billets');
    const billetData = {
      villeDepart: billet.villeDepart,
      villeArrivee: billet.villeArrivee,
      dateAller: billet.dateAller,
      dateRetour: billet.dateRetour || '', // Utilisez une chaîne vide si dateRetour est undefined
      passagers: billet.passagers
    };
    
    // Utilisez addDoc pour ajouter les données à Firestore
    return addDoc(billetsRef, billetData)
      .then(() => {
        return Promise.resolve(); // Renvoyer une promesse vide après l'ajout
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout du billet :', error);
        return Promise.reject(error); // Gérez l'erreur et renvoyez une promesse rejetée
      });
  }

  deleteBillet(billetId: string): Promise<void> {
    const billetDocRef = doc(this.firestore, `billets/${billetId}`);
    return deleteDoc(billetDocRef);
  }

  updateBillet(billet: Billet): Promise<void> {
    const billetDocRef = doc(this.firestore, `billets/${billet.id}`);
    const billetData = {
      villeDepart: billet.villeDepart,
      villeArrivee: billet.villeArrivee,
      dateAller: billet.dateAller,
      dateRetour: billet.dateRetour || '', // Utilisez une chaîne vide si dateRetour est undefined
      passagers: billet.passagers
      // Ajoutez d'autres propriétés au besoin
    };
  
    // Utilisez updateDoc pour mettre à jour les données du billet
    return updateDoc(billetDocRef, billetData)
      .then(() => {
        return Promise.resolve(); // Renvoyez une promesse vide après la mise à jour
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour du billet :', error);
        return Promise.reject(error); // Gérez l'erreur et renvoyez une promesse rejetée
      });
  }
}
