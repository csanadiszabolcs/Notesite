import { DateFormPipe } from './date.pipe';

describe('DatePipe', () => {
  it('create an instance', () => {
    const pipe = new DateFormPipe();
    expect(pipe).toBeTruthy();
  });
});
