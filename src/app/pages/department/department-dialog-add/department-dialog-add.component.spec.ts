import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentDialogAddComponent } from './department-dialog-add.component';

describe('DepartmentDialogAddComponent', () => {
  let component: DepartmentDialogAddComponent;
  let fixture: ComponentFixture<DepartmentDialogAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentDialogAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentDialogAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
