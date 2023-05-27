import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastFilterComponent } from './fast-filter.component';

describe('FastFilterComponent', () => {
	let component: FastFilterComponent;
	let fixture: ComponentFixture<FastFilterComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FastFilterComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(FastFilterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
