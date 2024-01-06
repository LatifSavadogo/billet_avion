import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../share.module';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,  // Assurez-vous que IonicModule est importé
    SharedModule,
    HomePageRoutingModule
    
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
