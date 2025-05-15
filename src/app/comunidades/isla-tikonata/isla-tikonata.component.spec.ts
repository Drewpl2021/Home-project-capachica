import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IslaTikonataComponent } from './isla-tikonata.component';

describe('IslaTikonataComponent', () => {
  let component: IslaTikonataComponent;
  let fixture: ComponentFixture<IslaTikonataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IslaTikonataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IslaTikonataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
