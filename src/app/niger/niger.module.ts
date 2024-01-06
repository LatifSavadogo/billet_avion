import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NigerPageRoutingModule } from './niger-routing.module';

import { NigerPage } from './niger.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NigerPageRoutingModule
  ],
  declarations: [NigerPage]
})
export class NigerPageModule {}
