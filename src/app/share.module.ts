// shared.module.ts
import { NgModule } from '@angular/core';
import { PaysageComponent } from './paysage/paysage.component';

@NgModule({
  declarations: [PaysageComponent],
  exports: [PaysageComponent]
})
export class SharedModule {}
