import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NigerPage } from './niger.page';

describe('NigerPage', () => {
  let component: NigerPage;
  let fixture: ComponentFixture<NigerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NigerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
