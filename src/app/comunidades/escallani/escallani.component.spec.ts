import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscallaniComponent } from './escallani.component';

describe('EscallaniComponent', () => {
  let component: EscallaniComponent;
  let fixture: ComponentFixture<EscallaniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscallaniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscallaniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
