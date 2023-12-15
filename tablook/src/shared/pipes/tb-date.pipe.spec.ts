import { TestBed } from '@angular/core/testing';
import { TbDatePipe } from './tb-date.pipe';
import { DatePipe } from '@angular/common';

describe('TbDatePipe', () => {
  beforeEach((): void => {
    TestBed.configureTestingModule({
      providers: [{provide: DatePipe, useValue: ''}]
    })
  });

  it('create an instance', () => {
    TestBed.runInInjectionContext(() => {
      const pipe = new TbDatePipe();
      expect(pipe).toBeTruthy();
    })
 
  });
});
