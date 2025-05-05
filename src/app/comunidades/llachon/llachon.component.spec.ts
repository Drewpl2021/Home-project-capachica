import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlachonComponent } from './llachon.component';

describe('LlachonComponent', () => {
  let component: LlachonComponent;
  let fixture: ComponentFixture<LlachonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlachonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LlachonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
