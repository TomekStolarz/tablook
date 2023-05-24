import { PhonePrefixPipe } from './phone-prefix.pipe';

describe('PhonePrefixPipe', () => {
  it('create an instance', () => {
    const pipe = new PhonePrefixPipe();
    expect(pipe).toBeTruthy();
  });
});
