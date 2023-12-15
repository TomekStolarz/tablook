import { TestBed } from '@angular/core/testing';

import { MailService } from './mail.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CustomSnackbarService } from 'src/shared/services/custom-snackbar.service';

describe('MailService', () => {
  let service: MailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: CustomSnackbarService, useValue: ''}
      ]
    });
    service = TestBed.inject(MailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
