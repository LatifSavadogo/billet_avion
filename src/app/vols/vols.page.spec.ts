import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VolsPage } from './vols.page';

describe('VolsPage', () => {
  let component: VolsPage;
  let fixture: ComponentFixture<VolsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VolsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
