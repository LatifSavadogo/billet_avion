import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdentifiantBilletPageRoutingModule } from './identifiant-billet-routing.module';

import { IdentifiantBilletPage } from './identifiant-billet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IdentifiantBilletPageRoutingModule
  ],
  declarations: [IdentifiantBilletPage]
})
export class IdentifiantBilletPageModule {}
