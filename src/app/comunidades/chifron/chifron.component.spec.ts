import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChifronComponent } from './chifron.component';

describe('ChifronComponent', () => {
  let component: ChifronComponent;
  let fixture: ComponentFixture<ChifronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChifronComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChifronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
