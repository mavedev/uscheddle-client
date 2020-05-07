import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-request-page-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class MainRequestPageContentComponent implements OnInit {

  public errorText = '';
  private errors = {
    0: 'Connection refused. Please check your Internet connectivity',
    400: 'Server responded with "bad request". Please, check all the fields',
    500: 'The server is anavailible at the moment. Please, try again later'
  };
  private createURL = `${environment.apiURI}/generate`;
  private testRequest = {
    courses: [
        {
            courseName: 'name',
            courseClassesType: 'lecture',
            courseInstructor: [
                'teacher1'
            ],
            courseHours: 50
        },
        {
            courseName: 'name2',
            courseClassesType: 'practice',
            courseInstructor: [
                'teacher1'
            ],
            courseHours: 100
        }
    ],
    classrooms: [
        {
            classroomNumber: '1-223',
            classroomType: 'lectureSuitable'
        }
    ],
    students: 60,
    minInGroup: 10
} as const;

  public constructor(private httpClient: HttpClient, private router: Router) { }

  public ngOnInit(): void {
  }

  public sendGenerateRequest(): void {
    this.httpClient.post(this.createURL, this.testRequest, {
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
