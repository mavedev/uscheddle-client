import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainRequestPageComponent } from './main-request-page.component';

describe('MainRequestPageComponent', () => {
  let component: MainRequestPageComponent;
  let fixture: ComponentFixture<MainRequestPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainRequestPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
