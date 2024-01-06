import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoteIvoirePageRoutingModule } from './cote-ivoire-routing.module';

import { CoteIvoirePage } from './cote-ivoire.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoteIvoirePageRoutingModule
  ],
  declarations: [CoteIvoirePage]
})
export class CoteIvoirePageModule {}
