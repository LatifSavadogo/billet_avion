import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContacterNousPage } from './contacter-nous.page';

describe('ContacterNousPage', () => {
  let component: ContacterNousPage;
  let fixture: ComponentFixture<ContacterNousPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ContacterNousPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
