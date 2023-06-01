import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorStateStrategy } from 'src/shared/directives/match-error-strategy';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit{
	loginForm = this.fb.nonNullable.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', Validators.required],
	});

	error?: string;
	matcher = new ErrorStateStrategy();
	isMobile = false;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router,
		private responsive: BreakpointObserver
	) { }
	
	ngOnInit(): void {
		this.responsive.observe([Breakpoints.TabletPortrait, Breakpoints.HandsetPortrait])
			.subscribe((result) => {
				if (result.matches) {
					this.isMobile = true;
				} else {
					this.isMobile = false;
				}
			});
	}

	login() {
		if (this.loginForm.invalid) {
			this.loginForm.markAllAsTouched();
			return;
		}

		this.authService
			.login({ ...this.loginForm.getRawValue() })
			.subscribe((response) => {
				if (response.status !== 200) {
					this.error =
						typeof response.data === 'string'
							? response.data
							: 'Unexcepted error';
				} else {
					this.error = '';
					this.router.navigateByUrl('/');
				}
			});
	}

	get email() {
		return this.loginForm.get('email');
	}

	get password() {
		return this.loginForm.get('password');
	}
}
