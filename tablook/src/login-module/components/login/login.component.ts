import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/login-module/services/auth.service';
import { ErrorStateStrategy } from 'src/shared/directives/match-error-strategy';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
})
export class LoginComponent {
	loginForm = this.fb.nonNullable.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', Validators.required],
	});

	error?: string;
	matcher = new ErrorStateStrategy();

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router
	) {}

	login() {
		if (this.loginForm.invalid) {
			this.loginForm.markAllAsTouched();
			return;
		}

		this.authService
			.login({ ...this.loginForm.getRawValue() })
			.subscribe((response) => {
				if (response.status !== 200) {
					this.error = response.data;
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
