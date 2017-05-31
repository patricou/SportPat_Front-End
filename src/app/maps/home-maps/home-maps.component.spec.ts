import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMapsComponent } from './home-maps.component';

describe('HomeMapsComponent', () => {
  let component: HomeMapsComponent;
  let fixture: ComponentFixture<HomeMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeMapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
