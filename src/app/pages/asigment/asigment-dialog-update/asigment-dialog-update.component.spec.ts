import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsigmentDialogUpdateComponent } from './asigment-dialog-update.component';

describe('AsigmentDialogUpdateComponent', () => {
  let component: AsigmentDialogUpdateComponent;
  let fixture: ComponentFixture<AsigmentDialogUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsigmentDialogUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsigmentDialogUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
