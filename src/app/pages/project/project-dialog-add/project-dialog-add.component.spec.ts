import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDialogAddComponent } from './project-dialog-add.component';

describe('ProjectDialogAddComponent', () => {
  let component: ProjectDialogAddComponent;
  let fixture: ComponentFixture<ProjectDialogAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDialogAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDialogAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
