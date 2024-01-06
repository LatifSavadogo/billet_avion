import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoteIvoirePage } from './cote-ivoire.page';

const routes: Routes = [
  {
    path: '',
    component: CoteIvoirePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoteIvoirePageRoutingModule {}
