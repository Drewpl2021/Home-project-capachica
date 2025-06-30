import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcotosComponent } from './ccotos.component';

describe('CcotosComponent', () => {
  let component: CcotosComponent;
  let fixture: ComponentFixture<CcotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CcotosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CcotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
