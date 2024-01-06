import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NigerPage } from './niger.page';

const routes: Routes = [
  {
    path: '',
    component: NigerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NigerPageRoutingModule {}
