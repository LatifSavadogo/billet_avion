// pdfmake.d.ts
declare module 'pdfmake/build/pdfmake' {
    namespace pdfMake {
      interface CreatePdf {
        // Définissez les propriétés du type ici
        // Par exemple :
        content: any[];
        // Ajoutez d'autres propriétés en fonction de la définition réelle du type
      }
    }
  }
  
  // Importez pdfMake normalement dans votre code
  import * as pdfMake from 'pdfmake/build/pdfmake';
  