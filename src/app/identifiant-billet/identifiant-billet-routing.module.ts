import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdentifiantBilletPage } from './identifiant-billet.page';

const routes: Routes = [
  {
    path: '',
    component: IdentifiantBilletPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdentifiantBilletPageRoutingModule {}
