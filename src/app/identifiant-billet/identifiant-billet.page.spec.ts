import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdentifiantBilletPage } from './identifiant-billet.page';

describe('IdentifiantBilletPage', () => {
  let component: IdentifiantBilletPage;
  let fixture: ComponentFixture<IdentifiantBilletPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IdentifiantBilletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
