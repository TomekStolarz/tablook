import { TestBed } from '@angular/core/testing';

import { FavouriteService } from './favourite.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

describe('FavouriteService', () => {
	let service: FavouriteService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, MatSnackBarModule],
			providers: [
				{provide: MatSnackBar, useValue: ''}
			]
		});
		service = TestBed.inject(FavouriteService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
