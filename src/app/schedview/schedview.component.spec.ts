import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedviewComponent } from './schedview.component';

describe('SchedviewComponent', () => {
  let component: SchedviewComponent;
  let fixture: ComponentFixture<SchedviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
