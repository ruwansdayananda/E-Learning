// const request = require('supertest');
// const { main } = require('../../dist/main');
// let server;

const { request } = require("express");
const { main } = require("main");

// const request = require('supertest');
// const { main } = require('../../dist/main');
// let server;

describe('Grading Integration testing', ()=>{

  describe('Teacher Routes to Grading page', ()=>{

      it('should routes to grading views', async ()=>{
        await request(await main())
        .post('/api/user/login')
        .send({
         email: 'supun@uom.com',
         passwordd: '12345678',
        })
        .expect(400);
    });

      });
  });
  describe('Initial function when rendering Grades page ', ()=>{
      it('should get assignment submissions', async ()=>{
        const res =  await request(await main()).post('/api/user/getAssignmentSubmission').send({
          grade_id: 4,
          assignment_id: "8c643431-5db3-4fba-820c-6242727d2b6e",
        })
        expect(400);
          
      });

       it('should get teacher -subjects', async ()=>{
          const res = await request(await main()).get('/api/user/get-teacher-subjects');
          expect(res[res.length-1]).toBe('English');
      });
      it('Get available grades for a student', async ()=>{
        const res = await request(await main()).get('/api/user/get-available-grades');
        expect(res).toBe([]);
      });
  });

  describe('Teacher submits a grade for a specific assignment.', ()=>{
      it('should write the grade table with updated grades', async ()=>{
        const res =  await request(await main()).post('/api/user/submitGrading').send({
          email:'kavishka@uom.lk',
          upload_id:"53c3cdc2-ffb4-4550-8d0f-c947a1e60da4",
          grade:4,
          comment:"Average Mark"
        })
        expect(400);

      });
  });
     
  describe('Student Routes to Grade page ', ()=>{

      it('should routes to grade views', async ()=>{
        await request(await main())
        .post('/api/user/login')
        .send({
         email: 'supun@uom.com',
         passwordd: '12345678',
        })
        .expect(400);
      });
  });
  describe('Initial function when rendering Student grade page ', ()=>{
       it('should get grade information of the student', async ()=>{
        const res = await request(await main()).get('/api/user/get-grade-information');
        expect(res).toBe([]);
      });
      it('should get marks for the submissions', async ()=>{
        const res = await request(await main()).get('/api/user/get-marks-information');
        expect(res).toBe([]);
      });

  });
  

});