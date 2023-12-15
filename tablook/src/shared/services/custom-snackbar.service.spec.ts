import { TestBed } from '@angular/core/testing';

import { CustomSnackbarService } from './custom-snackbar.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

describe('CustomSnackbarService', () => {
  let service: CustomSnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [
				{provide: MatSnackBar, useValue: ''}
			]
    });
    service = TestBed.inject(CustomSnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
