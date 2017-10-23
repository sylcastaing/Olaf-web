import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavElementComponent } from './nav-element.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material';
import { APP_BASE_HREF } from '@angular/common';

describe('NavElementComponent', () => {
  let component: NavElementComponent;
  let fixture: ComponentFixture<NavElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        RouterModule.forRoot([])
      ],
      declarations: [
        NavElementComponent
      ],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
