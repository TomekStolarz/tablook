import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subscription, connectable, first, map, switchMap } from 'rxjs';
import { MailService } from 'src/account-module/services/mail.service';
import { selectUser } from 'src/app/store/user.selector';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);

  private readonly mailService = inject(MailService);

  private readonly store = inject(Store);

  protected topics: string[] = [
    'Order complaint',
    'App problems',
    'Other',
  ]

  protected selectTopic = '';

  protected contactForm = this.fb.nonNullable.group({
    topics: ['', Validators.required],
    topic: [{value: '', disabled: true}, Validators.required],
    message: ['', Validators.required]
  })

  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.subscriptions.push(this.contactForm.controls.topics.valueChanges.subscribe((val) => {
      this.selectionChange(val);
    }));
  }

  selectionChange(topic: string) {
    this.contactForm.controls.topic.patchValue(topic);
    if (topic === "Other") {
      this.contactForm.controls.topic.enable();
    } else {
      this.contactForm.controls.topic.disable();
    }
  }

  sendEmail() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    connectable(this.store.pipe(
      select(selectUser),
      map((user) => user?.id || ''),
      switchMap((userId) => this.mailService.sendMail({
        userId: userId,
        message: this.contactForm.controls.message.value,
        subject: this.contactForm.controls.topic.value,
      })),
      first()
    )).connect();
    this.contactForm.reset();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
