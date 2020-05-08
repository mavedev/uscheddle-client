import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Course } from './course.model';

@Component({
  selector: 'app-main-request-page-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class MainRequestPageContentComponent implements OnInit {

  public coursesFormGroup: FormGroup;
  public errorText = '';
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

  private get coursesArray(): FormArray {
    return this.coursesFormGroup.get('coursesArray') as FormArray;
  }

  private createCoursesForm(): void {
    this.coursesFormGroup = this.formBuilder.group({
      name: '',
      classesType: '',
      instructors: '',
      hours: '',
      coursesArray: this.formBuilder.array([])
    });
  }

  private addCourseToTheForm(): void {
    this.coursesArray.push(this.formBuilder.group(new Course()));
  }

  public sendGenerateRequest(): void {
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
