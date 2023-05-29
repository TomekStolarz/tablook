import { Component, Input } from '@angular/core';
import { Review } from 'src/shared/interfaces/review.interface';

@Component({
	selector: 'app-review-box',
	templateUrl: './review-box.component.html',
})
export class ReviewBoxComponent {
	@Input()
	review!: Review;
}
