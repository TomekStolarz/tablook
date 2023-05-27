import { TrimLengthPipe } from './trim-length.pipe';

describe('TrimLengthPipe', () => {
  it('create an instance', () => {
    const pipe = new TrimLengthPipe();
    expect(pipe).toBeTruthy();
  });
});
