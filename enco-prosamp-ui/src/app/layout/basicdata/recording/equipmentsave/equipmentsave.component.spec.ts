import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentsaveComponent } from './equipmentsave.component';

describe('EquipmentsaveComponent', () => {
  let component: EquipmentsaveComponent;
  let fixture: ComponentFixture<EquipmentsaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EquipmentsaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentsaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
