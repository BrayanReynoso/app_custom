import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsigmentDialogAddComponent } from './asigment-dialog-add.component';

describe('AsigmentDialogAddComponent', () => {
  let component: AsigmentDialogAddComponent;
  let fixture: ComponentFixture<AsigmentDialogAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsigmentDialogAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsigmentDialogAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
