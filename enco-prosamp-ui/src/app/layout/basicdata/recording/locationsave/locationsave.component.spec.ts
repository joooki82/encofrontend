import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsaveComponent } from './locationsave.component';

describe('LocationsaveComponent', () => {
  let component: LocationsaveComponent;
  let fixture: ComponentFixture<LocationsaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationsaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationsaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
