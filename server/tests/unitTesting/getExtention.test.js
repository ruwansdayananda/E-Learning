const { getExtension } = require('../../dist/user/user.router');

test('File extention extracted successfully!', () => {
  const extension = getExtension('test.pdf');
  expect(extension).toBe('.pdf');
});
