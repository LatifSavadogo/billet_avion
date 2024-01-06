import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SenegalPage } from './senegal.page';

const routes: Routes = [
  {
    path: '',
    component: SenegalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SenegalPageRoutingModule {}
