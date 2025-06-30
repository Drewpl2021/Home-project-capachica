import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { Router, NavigationEnd } from '@angular/router';
import { of, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let routerEvents$: Subject<any>;

  beforeEach(async () => {
    routerEvents$ = new Subject();

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes([]), // rutas simuladas
        NavbarComponent // standalone component
      ],
      providers: [
        {
          provide: Router,
          useValue: {
            url: '/',
            events: routerEvents$.asObservable(),
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe establecer isScrolled en true si scrollY > 50', () => {
    spyOnProperty(window, 'scrollY').and.returnValue(100);
    component.onWindowScroll();
    expect(component.isScrolled).toBeTrue();
  });

  it('debe navegar a la ruta dada', () => {
    const router = TestBed.inject(Router);
    component.navigateTo('/test');
    expect(router.navigate).toHaveBeenCalledWith(['/test']);
  });

  it('debe actualizar navItems para rutas específicas (modo turismo)', () => {
    const navEnd = new NavigationEnd(1, '/llachon', '/llachon');
    (TestBed.inject(Router) as any).url = '/llachon';
    routerEvents$.next(navEnd);
    expect(component.navItems.some(item => item.path === '/llachon')).toBeTrue();
  });

  it('debe actualizar navItems para rutas generales (modo estándar)', () => {
    const navEnd = new NavigationEnd(1, '/about', '/about');
    (TestBed.inject(Router) as any).url = '/about';
    routerEvents$.next(navEnd);
    expect(component.navItems.some(item => item.path === '/places')).toBeTrue();
  });

  it('debe identificar correctamente ruta activa', () => {
    const router = TestBed.inject(Router);
    (router as any).url = '/about';
    expect(component.isActive('/about')).toBeTrue();
  });
});
