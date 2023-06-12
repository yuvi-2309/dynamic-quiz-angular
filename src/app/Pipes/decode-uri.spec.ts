import { DecodeUriPipe } from './decode-uri.pipe';

describe('DecodeUriPipe', () => {
  it('should create an instance', () => {
    const pipe = new DecodeUriPipe();
    expect(pipe).toBeTruthy();
  });

  it('should decode the words', () => {
    const pipe = new DecodeUriPipe();
    let grade = pipe.transform('&lt;div&gt;Hello, world!&lt;/div&gt;');
    expect(grade).toBe('<div>Hello, world!</div>');
  });
});
