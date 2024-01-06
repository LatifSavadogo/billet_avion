import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MALIPage } from './mali.page';

describe('MALIPage', () => {
  let component: MALIPage;
  let fixture: ComponentFixture<MALIPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MALIPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
