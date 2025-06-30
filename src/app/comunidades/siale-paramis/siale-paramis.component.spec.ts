import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SialeParamisComponent } from './siale-paramis.component';

describe('SialeParamisComponent', () => {
  let component: SialeParamisComponent;
  let fixture: ComponentFixture<SialeParamisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SialeParamisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SialeParamisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
