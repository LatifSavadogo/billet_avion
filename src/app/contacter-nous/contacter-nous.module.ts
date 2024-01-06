import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContacterNousPageRoutingModule } from './contacter-nous-routing.module';

import { SharedModule } from '../share.module';
import { ContacterNousPage } from './contacter-nous.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContacterNousPageRoutingModule,
    SharedModule
  ],
  declarations: [ContacterNousPage]
})
export class ContacterNousPageModule {}
