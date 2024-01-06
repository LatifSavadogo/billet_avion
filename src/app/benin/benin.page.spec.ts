import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BeninPage } from './benin.page';

describe('BeninPage', () => {
  let component: BeninPage;
  let fixture: ComponentFixture<BeninPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BeninPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
