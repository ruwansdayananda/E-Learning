const request = require('supertest');
const { main } = require('../../dist/main');


beforeEach(async () => {
  console.log('beforeEach');
  
});


test('login for a user', async () => {
  await request(await main())
    .post('/api/user/login')
    .send({
      email: 'supun@uom.lk',
      password: '12345678',
    })
    .expect(200);
  
});


// name: 'Wimukthi',
//     birthday: '1997-03-17',
//     signInAs: 'student',
//     email: 'wimukthibw@gmail.com',
//     password: 'Windy@24',
//     grade_id: '1',
