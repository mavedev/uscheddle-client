import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-main-request-page-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class MainRequestPageContentComponent implements OnInit {

  errorText = 'error';
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

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      alert('A client-side error occured. Check your Internet connection');
    } else {
      alert(`The service responsed with an error\n${error.error.message}`);
    }
    // return throwError('');
  }

  sendGenerateRequest(): void {
    this.httpClient.post(this.createURL, this.testRequest, {
      headers: { 'Content-Type': 'application/json' }
    })
    .subscribe({
      next: (data: any[]) => alert(JSON.stringify(data)),
      error: error => alert(JSON.stringify(error))
    });
  }

}
