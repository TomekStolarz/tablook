import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
	name: 'safeUrl',
})
export class SafeUrlPipe implements PipeTransform {
	private readonly sanitizer = inject(DomSanitizer);

	transform(url: string): SafeUrl {
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}
}
