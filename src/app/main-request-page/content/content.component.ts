import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-request-page-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class MainRequestPageContentComponent implements OnInit {

  public mainFormGroup: FormGroup;
  public dynamicFormGroup: FormGroup;
  public errorText = '';
  private readonly invalidErrorText = 'Some field are not filled properly. Please, check your input';
  private errors = {
    0: 'Connection refused. Please check your Internet connectivity',
    400: 'Server responded with "bad request". Please, check all the fields',
    500: 'The server is unavailible at the moment. Please, try again later'
  };
  private createURL = `${environment.apiURI}/generate`;

  public constructor(
    private formBuilder: FormBuilder,
    private authService: MsalService,
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.createMainForm();
    this.createDynamicForm();
  }

  public ngOnInit(): void {
  }

  public addCourseToTheForm(): void {
    this.coursesArray.push(this.formBuilder.group({
      courseName: ['', [Validators.required]],
      isLecture: [false, Validators.required],
      courseInstructors: ['', [
          Validators.required,
          Validators.pattern(/^\s*[^,]+(\w|\s|,[^,])*[^,]+\s*$/)
        ]
      ],
      courseClasses: ['', [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
          Validators.min(1)
        ]
      ],
      courseStudents: ['', [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
        Validators.min(1)
      ]
    ],
    }));
  }

  public addClassroomToTheForm(): void {
    this.classroomsArray.push(this.formBuilder.group({
      classroomNumber: ['', [Validators.required]],
      isLectureSuitable: [false, Validators.required]
    }));
  }

  public get scheduleNameValue(): FormGroup {
    return this.mainFormGroup.get('scheduleName') as FormGroup;
  }

  public get classesInDayValue(): FormGroup {
    return this.mainFormGroup.get('classesInDay') as FormGroup;
  }

  public get weeksValue(): FormGroup {
    return this.mainFormGroup.get('weeks') as FormGroup;
  }

  public get minInGroupValue(): FormGroup {
    return this.mainFormGroup.get('minInGroup') as FormGroup;
  }

  public get coursesArray(): FormArray {
    return this.dynamicFormGroup.get('coursesArray') as FormArray;
  }

  public get classroomsArray(): FormArray {
    return this.dynamicFormGroup.get('classroomsArray') as FormArray;
  }

  private createMainForm(): void {
    this.mainFormGroup = this.formBuilder.group({
      scheduleName: this.formBuilder.control('', [Validators.required]),
      classesInDay: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
      weeks: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
      minInGroup: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
        Validators.min(10)
      ])
    });
  }

  private createDynamicForm(): void {
    this.dynamicFormGroup = this.formBuilder.group({
      coursesArray: this.formBuilder.array([]),
      classroomsArray: this.formBuilder.array([])
    });
  }

  private areAllTheFormsValid(): boolean {
    return this.coursesArray.status === 'VALID'
      && this.classroomsArray.status === 'VALID'
      && this.scheduleNameValue.status === 'VALID'
      && this.classesInDayValue.status === 'VALID'
      && this.weeksValue.status === 'VALID'
      && this.minInGroupValue.status === 'VALID';
  }

  private getUserId(): string {
    return this.authService.getAccount().accountIdentifier;
  }

  private getSeparetedInstructors(instructors: string): string[] {
    return instructors
      .replace(/\s+/g, ' ')
      .replace(/\s*,\s*/g, ',')
      .trim()
      .split(',');
  }

  private getCoursesWithSeparatedInstructors(courses: any[]): any[] {
    const result: any[] = [];
    courses.forEach(value => {
      const changedItem = Object. assign({}, value);
      changedItem.courseInstructors = this.getSeparetedInstructors(
        changedItem.courseInstructors
      );
      result.push(changedItem);
    });

    return result;
  }

  private getRequestBody(): any {
    return {
      name: this.scheduleNameValue.value,
      ownerId: this.getUserId(),
      courses: this.getCoursesWithSeparatedInstructors(
        this.coursesArray.value
      ),
      classrooms: this.classroomsArray.value,
      classesInDay: this.classesInDayValue.value,
      weeks: this.weeksValue.value,
      minInGroup: this.minInGroupValue.value
    } as const;
  }

  public sendGenerateRequest(): void {
    if (!this.areAllTheFormsValid()) {
      this.errorText = this.invalidErrorText;
      return;
    } else {
      this.errorText = '';
    }

    const body = this.getRequestBody();
    this.httpClient.post(this.createURL, body, {
      headers: { 'Content-Type': 'application/json' }
    })
    .subscribe({
      next: (data: any) => {
        this.router.navigate(['/schedview', data.id]);
      },
      error: err => {
        this.errorText = this.errors[err.status];
      }
    });
  }

}
