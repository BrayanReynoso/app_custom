import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDialogUpdateComponent } from './project-dialog-update.component';

describe('ProjectDialogUpdateComponent', () => {
  let component: ProjectDialogUpdateComponent;
  let fixture: ComponentFixture<ProjectDialogUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDialogUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDialogUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
