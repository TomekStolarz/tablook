import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MailData } from '../models/mail-data.type';
import { EMPTY, catchError, tap } from 'rxjs';
import { CustomSnackbarService } from 'src/shared/services/custom-snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private apiPath = environment.apiPath;
  
  private readonly http = inject(HttpClient);

  private readonly toastService = inject(CustomSnackbarService);

  sendMail(data: MailData) {
    return this.http.post(`${this.apiPath}/mail`, data).pipe(
      tap(() => {
        this.toastService.success("Your message was sended to us", "Operation successful");
      }),
      catchError(() => {
        this.toastService.error("Some error occured on email form", "Cannot send mail");
        return EMPTY;
      })
    );
  }
}
