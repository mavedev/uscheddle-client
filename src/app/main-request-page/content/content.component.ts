import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Course } from './models/course.model';
import { Classroom } from './models/classroom.model';

@Component({
  selector: 'app-main-request-page-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class MainRequestPageContentComponent implements OnInit {

  public mainFormGroup: FormGroup;
  public errorText = '';
  private readonly invalidErrorText = 'Some field are not filled properly. Please, check your input';
  private errors = {
    0: 'Connection refused. Please check your Internet connectivity',
    400: 'Server responded with "bad request". Please, check all the fields',
    500: 'The server is anavailible at the moment. Please, try again later'
  };
  private createURL = `${environment.apiURI}/generate`;

  public constructor(
    private formBuilder: FormBuilder,
    private authService: MsalService,
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.createCoursesForm();
  }

  public ngOnInit(): void {
  }

  public addCourseToTheForm(): void {
    this.coursesArray.push(this.formBuilder.group({
      name: ['', [Validators.required]],
      courseType: ['', [Validators.required]],
      instructors: ['', [
          Validators.required,
          Validators.pattern(/^\w+(,\w+)*$/)
        ]
      ],
      hours: [0, [
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
      classroomType: ['', Validators.required]
    }));
  }

  public get coursesArray(): FormArray {
    return this.mainFormGroup.get('coursesArray') as FormArray;
  }

  public get classroomsArray(): FormArray {
    return this.mainFormGroup.get('classroomsArray') as FormArray;
  }

  private createCoursesForm(): void {
    this.mainFormGroup = this.formBuilder.group({
      coursesArray: this.formBuilder.array([]),
      classroomsArray: this.formBuilder.array([])
    });
  }

  private isFormValid(): boolean {
    alert(this.coursesArray.status);
    return false;
  }

  public sendGenerateRequest(): void {
    if (!this.isFormValid()) {
      this.errorText = this.invalidErrorText;
      return;
    }

    this.httpClient.post(this.createURL, {}, {
      headers: { 'Content-Type': 'application/json' }
    })
    .subscribe({
      next: (data: any) => {
        this.router.navigate(['/schedview', data.id]);
      },
      error: error => {
        this.errorText = this.errors[error.status];
      }
    });
  }

}
