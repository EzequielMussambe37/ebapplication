import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultPlotlyComponent } from './result-plotly.component';

describe('ResultPlotlyComponent', () => {
  let component: ResultPlotlyComponent;
  let fixture: ComponentFixture<ResultPlotlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultPlotlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultPlotlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
