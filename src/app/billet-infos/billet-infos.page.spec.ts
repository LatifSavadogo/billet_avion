import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BilletInfosPage } from './billet-infos.page';

describe('BilletInfosPage', () => {
  let component: BilletInfosPage;
  let fixture: ComponentFixture<BilletInfosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BilletInfosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
