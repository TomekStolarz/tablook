import { IsoStringDatePipe } from './iso-string-date.pipe';

describe('IsoStringDatePipe', () => {
  it('create an instance', () => {
    const pipe = new IsoStringDatePipe();
    expect(pipe).toBeTruthy();
  });
});
