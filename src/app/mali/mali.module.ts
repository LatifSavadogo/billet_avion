import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MALIPageRoutingModule } from './mali-routing.module';

import { MALIPage } from './mali.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MALIPageRoutingModule
  ],
  declarations: [MALIPage]
})
export class MALIPageModule {}
