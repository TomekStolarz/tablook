import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EMPTY, Subject, catchError, connectable, first, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { RegisterData } from 'src/register-module/interfaces/register-data.interface';
import { CustomSnackbarService } from 'src/shared/services/custom-snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = environment.apiPath;

  private readonly httpService = inject(HttpClient);

  private readonly snackbarService = inject(CustomSnackbarService);

  private readonly authService = inject(AuthService);

  private selectAllEvent = new Subject<void>();

  updateUser(userData: Partial<RegisterData>, userId: string) {
    return connectable(this.httpService.put(`${this.apiUrl}/user/${userId}`, userData).pipe(
      first(),
      tap(() => {
        this.snackbarService.success("Successfully updated user data", "User successfully updated");
      }),
      catchError(() => {
        this.snackbarService.error("Cannot update user data", "Action failed");
        return EMPTY;
      })
    )).connect()
  }

  deleteAccount(id: string) {
    return connectable(this.httpService.delete(`${this.apiUrl}/user/${id}`, { responseType: 'text'}).pipe(
      first(),
      tap(() => {
        this.snackbarService.success("Successfully deleted user", "User successfully deleted");
        this.authService.logout();
      }),
      catchError((error) => {
        this.snackbarService.error("Cannot delete user", "Action failed");
        return EMPTY;
      })
    )).connect()
  }

  emitSelectAllEvent() {
    this.selectAllEvent.next();
  }

  get selectAllEvent$() {
    return this.selectAllEvent.asObservable();
  }
}
