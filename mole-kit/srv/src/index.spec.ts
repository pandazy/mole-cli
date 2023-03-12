import helloWorld from '.';

describe('index', () => {
  it('should get hello world', () => {
    expect(helloWorld()).toEqual('Hello World!');
  });
});
