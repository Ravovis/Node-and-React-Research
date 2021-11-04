import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3PlayComponent } from './d3-play.component';

describe('D3PlayComponent', () => {
  let component: D3PlayComponent;
  let fixture: ComponentFixture<D3PlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3PlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(D3PlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
