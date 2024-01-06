import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'billet',
    pathMatch: 'full'
  },
  {
    path: 'billet',
    loadChildren: () => import('./billet/billet.module').then( m => m.BilletPageModule)
  },
  {
    path: 'historique',
    loadChildren: () => import('./historique/historique.module').then( m => m.HistoriquePageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'a-propos',
    loadChildren: () => import('./a-propos/a-propos.module').then( m => m.AProposPageModule)
  },
  {
    path: 'mali',
    loadChildren: () => import('./mali/mali.module').then( m => m.MALIPageModule)
  },
  {
    path: 'cote-ivoire',
    loadChildren: () => import('./cote-ivoire/cote-ivoire.module').then( m => m.CoteIvoirePageModule)
  },
  {
    path: 'senegal',
    loadChildren: () => import('./senegal/senegal.module').then( m => m.SenegalPageModule)
  },
  {
    path: 'ghana',
    loadChildren: () => import('./ghana/ghana.module').then( m => m.GhanaPageModule)
  },
  {
    path: 'togo',
    loadChildren: () => import('./togo/togo.module').then( m => m.TogoPageModule)
  },
  {
    path: 'benin',
    loadChildren: () => import('./benin/benin.module').then( m => m.BeninPageModule)
  },
  {
    path: 'niger',
    loadChildren: () => import('./niger/niger.module').then( m => m.NigerPageModule)
  },
  {
    path: 'contacter-nous',
    loadChildren: () => import('./contacter-nous/contacter-nous.module').then( m => m.ContacterNousPageModule)
  },

  {
    path: 'vols',
    loadChildren: () => import('./vols/vols.module').then( m => m.VolsPageModule)
    },
  {
    path: 'resume-billet',
    loadChildren: () => import('./resume-billet/resume-billet.module').then( m => m.ResumeBilletPageModule)
  },
  {
    path: 'identifiant-billet',
    loadChildren: () => import('./identifiant-billet/identifiant-billet.module').then( m => m.IdentifiantBilletPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
