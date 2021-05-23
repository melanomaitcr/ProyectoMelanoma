import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliarCancerEdicionComponent } from './familiar-cancer-edicion.component';

describe('FamiliarCancerEdicionComponent', () => {
  let component: FamiliarCancerEdicionComponent;
  let fixture: ComponentFixture<FamiliarCancerEdicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamiliarCancerEdicionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamiliarCancerEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
