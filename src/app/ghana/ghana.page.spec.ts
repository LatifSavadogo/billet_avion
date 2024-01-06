import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GhanaPage } from './ghana.page';

describe('GhanaPage', () => {
  let component: GhanaPage;
  let fixture: ComponentFixture<GhanaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GhanaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
