import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoteIvoirePage } from './cote-ivoire.page';

describe('CoteIvoirePage', () => {
  let component: CoteIvoirePage;
  let fixture: ComponentFixture<CoteIvoirePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CoteIvoirePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
