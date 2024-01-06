import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BilletInfosPageRoutingModule } from './billet-infos-routing.module';

import { BilletInfosPage } from './billet-infos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BilletInfosPageRoutingModule
  ],
  declarations: [BilletInfosPage]
})
export class BilletInfosPageModule {}
