import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SenegalPage } from './senegal.page';

describe('SenegalPage', () => {
  let component: SenegalPage;
  let fixture: ComponentFixture<SenegalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SenegalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
