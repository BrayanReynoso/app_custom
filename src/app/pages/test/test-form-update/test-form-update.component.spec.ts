import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFormUpdateComponent } from './test-form-update.component';

describe('TestFormUpdateComponent', () => {
  let component: TestFormUpdateComponent;
  let fixture: ComponentFixture<TestFormUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestFormUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestFormUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
