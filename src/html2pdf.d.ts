// Create a file html2pdf.d.ts
declare module 'html2pdf.js' {
    namespace html2pdf {
      interface Options {
        // Declare the properties of the Options type
        // For example:
        margin?: number;
        filename?: string;
        // Add other properties as needed
      }
    }
  
    export = html2pdf;
  }
  