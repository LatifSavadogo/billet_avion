import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TogoPage } from './togo.page';

describe('TogoPage', () => {
  let component: TogoPage;
  let fixture: ComponentFixture<TogoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TogoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
