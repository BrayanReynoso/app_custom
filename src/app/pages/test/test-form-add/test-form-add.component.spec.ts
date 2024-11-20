import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFormAddComponent } from './test-form-add.component';

describe('TestFormAddComponent', () => {
  let component: TestFormAddComponent;
  let fixture: ComponentFixture<TestFormAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestFormAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestFormAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
