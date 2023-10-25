import {
  AfterViewInit,
	Directive,
	ElementRef,
	EventEmitter,
	Input,
	Output,
  inject,
} from '@angular/core';

@Directive({
	selector: '[appElementVisible]',
})
export class ElementVisibleDirective implements AfterViewInit {
	private element = inject(ElementRef) 

	@Output() elementVisible = new EventEmitter<boolean>();
	@Input() isTargetElement?: boolean;

	public intersectionOptions = {
		root: null, //implies the root is the document viewport
		rootMargin: '0px',
		threshold: [0, 0.5, 1],
	};

	ngAfterViewInit() {
		let observer = new IntersectionObserver(
			this.intersectionCallback.bind(this),
			this.intersectionOptions
		);

		if (this.isTargetElement) {
			observer.observe(this.element.nativeElement);
		}
	}

	intersectionCallback(entries: any[], observer: any) {
		entries.forEach((entry: { intersectionRatio: number; }) => {
			if (entry.intersectionRatio === 1) {
				this.elementVisible.emit(true);
			} else {
				this.elementVisible.emit(false);
			}
		});
	}
}
