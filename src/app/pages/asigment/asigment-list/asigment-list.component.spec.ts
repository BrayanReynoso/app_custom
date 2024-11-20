import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsigmentListComponent } from './asigment-list.component';

describe('AsigmentListComponent', () => {
  let component: AsigmentListComponent;
  let fixture: ComponentFixture<AsigmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsigmentListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsigmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
