import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeninPage } from './benin.page';

const routes: Routes = [
  {
    path: '',
    component: BeninPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeninPageRoutingModule {}
