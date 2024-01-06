import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumeBilletPage } from './resume-billet.page';

describe('ResumeBilletPage', () => {
  let component: ResumeBilletPage;
  let fixture: ComponentFixture<ResumeBilletPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(ResumeBilletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
