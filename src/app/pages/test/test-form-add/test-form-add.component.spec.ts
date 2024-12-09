import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestFormAddComponent } from './test-form-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TestService } from '../../../services/test/test.service';
import { DepartmetService } from '../../../services/department/departmet.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('TestFormAddComponent', () => {
  let component: TestFormAddComponent;
  let fixture: ComponentFixture<TestFormAddComponent>;
  let testServiceMock: any;
  let departmentServiceMock: any;
  let dialogRefMock: any;

  beforeEach(async () => {
    // Mock del TestService
    testServiceMock = {
      registerTest: jasmine.createSpy('registerTest').and.returnValue(of({}))
    };

    // Mock del DepartmetService
    departmentServiceMock = {
      getAllDepartments: jasmine.createSpy('getAllDepartments').and.returnValue(
        of({ data: [{ id: 1, name: 'HR', description: 'Human Resources', status: true }] })
      )
    };

    // Mock del MatDialogRef
    dialogRefMock = {
      close: jasmine.createSpy('close')
    };

    await TestBed.configureTestingModule({
      declarations: [TestFormAddComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: TestService, useValue: testServiceMock },
        { provide: DepartmetService, useValue: departmentServiceMock },
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {} } // Provisión de MAT_DIALOG_DATA
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestFormAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.formTest).toBeDefined();
    const formValues = component.formTest.value;
    expect(formValues.firstName).toBe('');
    expect(formValues.lastName).toBe('');
    expect(formValues.email).toBe('');
    expect(formValues.salary).toBe('');
    expect(formValues.hireDate).toBe('');
    expect(formValues.department).toBe('');
    expect(formValues.status).toBe(true);
  });

  it('should load departments on initialization', () => {
    component.loadDepartments();
    expect(departmentServiceMock.getAllDepartments).toHaveBeenCalled();
    expect(component.departments.length).toBe(1);
    expect(component.departments[0].name).toBe('HR');
  });

  it('should validate the form fields', () => {
    const form = component.formTest;
    const firstName = form.get('firstName');
    const lastName = form.get('lastName');
    const email = form.get('email');
    const salary = form.get('salary');

    // Campo 'firstName' requerido
    firstName?.setValue('');
    expect(firstName?.invalid).toBeTrue();

    // Campo 'lastName' requerido
    lastName?.setValue('');
    expect(lastName?.invalid).toBeTrue();

    // Campo 'email' con formato inválido
    email?.setValue('not-an-email');
    expect(email?.invalid).toBeTrue();

    // Campo 'salary' con valor menor al mínimo
    salary?.setValue(-1);
    expect(salary?.invalid).toBeTrue();
  });

  it('should submit the form and call the service', () => {
    // Configuramos valores válidos para el formulario
    component.formTest.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      salary: 50000,
      hireDate: '2024-11-20',
      status: true,
      department: 1
    });

    // Simulamos el envío del formulario
    component.onSubmit();

    // Verificamos que el servicio fue llamado con los datos correctos
    expect(testServiceMock.registerTest).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      salary: 50000,
      hireDate: '2024-11-20',
      status: true,
      department: { id: 1 }
    });

    // Verificamos que el diálogo fue cerrado
    expect(dialogRefMock.close).toHaveBeenCalledWith(true);
  });

  it('should not submit the form if invalid', () => {
    component.formTest.setValue({
      firstName: '',
      lastName: '',
      email: '',
      salary: '',
      hireDate: '',
      status: true,
      department: ''
    });

    component.onSubmit();

    // Verificamos que no se llama al servicio si el formulario es inválido
    expect(testServiceMock.registerTest).not.toHaveBeenCalled();
    expect(dialogRefMock.close).not.toHaveBeenCalled();
  });

  it('should close the dialog when onClose is called', () => {
    component.onClose();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });
});