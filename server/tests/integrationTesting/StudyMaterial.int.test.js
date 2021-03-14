const request = require('supertest');
const { main } = require('../../dist/main');
let server;

describe('Study Material Integration testing', ()=>{

    describe('Student Routes to study material page ', ()=>{

        it('should routes to study material views', async ()=>{
            //session created here
           await request(await main())
            .post('/api/user/login')
            .send({
             email: 'supun@uom.com',
             passwordd: '12345678',
            })
            .expect(400);
        });
    });
    describe('Initial function when rendering student Grading ', ()=>{
         it('should get grade of student user', async ()=>{
            const res =  await request(await main()).get('/api/user/get-user-subject')
            expect(res[res.length-1]).toBe('Grade 9');
        });
        it('should get subjects of student user', async ()=>{
            const res =  await request(await main()).get('/api/user/get-user-subject')
            expect(res[0]).toBe('sinhala');
        });
    });

    describe('Student search Study Material with subjects ', ()=>{
        it('should call method with selected subject', async ()=>{
           const res =  await request(await main()).get('/api/user/get-user-studyMaterial')
           const subject='sinhala';
           expect(res[0]).toBe(subject);


        });
        // it('should return null exception when call method with null value for subject', async ()=>{
        //    const res =  await request(await main()).get('/api/user/get-user-studyMaterial')
        //    const subject=null;
        //    expect(res[0].subject=subject)
        // });
        // it('should return study material of a subject when pass subject', async ()=>{
         
        // });
    });
       
    describe('Student download study Material files ', ()=>{

        it('should return file path accroding to file name', async ()=>{
             const res =  await request(await main()).get('/api/user/getFile/0204b44a-12e2-47f5-940a-631cd18c1532');
             expect(res).toBe('D:\newel\E-Learning\public\upload\teacher\0204b44a-12e2-47f5-940a-631cd18c1532.jpg');
        });
        it('should return emply file path for null file name', async ()=>{
           const res =  await request(await main()).get('/api/user/getFile/nofilepath');
             expect(res).toBe(null);
        });
    });
    describe('Teacher Routes to study material page ', ()=>{

        it('should routes to study material views', async ()=>{
          await request(await main())
            .post('/api/user/login')
            .send({
             email: 'kavishka@uom.com',
             passwordd: '12345678',
            })
            .expect(400);
        });
    });
    describe('Initial function when rendering Teacher study Material ', ()=>{
         it('should get grades of Teacher user', async ()=>{
            const res =  await request(await main()).get('/api/user/get-user-subject')
            expect(res[0]).toBe('Grade 6');
        });
        it('should get subject of Teacher user', async ()=>{
            const res =  await request(await main()).get('/api/user/get-user-subject')
            expect(res[res.length-1]).toBe('Sinhala');
        });
        it('should get all study Materials of Teacher user', async ()=>{
            const res =  await request(await main()).get('/api/user/get-user-studyMaterial')
           const subject='sinhala';
           expect(res[0]).toBe(subject);
        });
        it('should route /login when user type is not teacher', async ()=>{
            await request(await main())
            .post('/api/user/login')
            .send({
             email: 'admin@uom.com',
             passwordd: '12345678',
            })
            .expect('logout');
        });
    });
    describe('Add Study Material By teacher ', ()=>{

        it('should correclty pass entered values in form', async ()=>{
            await request(await main())
            .post('/api/user/studyMaterialUpload')
            .send({
             title: 'StudyMaterial',
             subject: 'sinhala',
             grade: 'Grade 9',
             description: 'This is study Material',
             fileAmount: '1',
             teacher_email: 'kavishka@uom.com',

            })
            .expect('Success');
        });
        it('should response expeption when pass null title value ', async ()=>{
           await request(await main())
            .post('/api/user/studyMaterialUpload')
            .send({
             title: null,
             subject: 'sinhala',
             grade: 'Grade 9',
             description: 'This is study Material',
             fileAmount: '1',
             teacher_email: 'kavishka@uom.com',

            })
            .expect('error');
        });
        it('should response expeption when pass null subject value ', async ()=>{
           await request(await main())
            .post('/api/user/studyMaterialUpload')
            .send({
             title: 'StudyMaterial',
             subject: null,
             grade: 'Grade 9',
             description: 'This is study Material',
             fileAmount: '1',
             teacher_email: 'kavishka@uom.com',

            })
            .expect('Success');
        });
        it('should response expeption when pass null grade value ', async ()=>{
           await request(await main())
            .post('/api/user/studyMaterialUpload')
            .send({
             title: 'StudyMaterial',
             subject: 'sinhala',
             grade: null,
             description: 'This is study Material',
             fileAmount: '1',
             teacher_email: 'kavishka@uom.com',

            })
            .expect('error');
        });
        it('should response expeption when pass null description value ', async ()=>{
           await request(await main())
            .post('/api/user/studyMaterialUpload')
            .send({
             title: 'StudyMaterial',
             subject: 'sinhala',
             grade: 'Grade 9',
             description: null,
             fileAmount: '1',
             teacher_email: 'kavishka@uom.com',

            })
             .expect('error');
        });
        it('should response with success when passed correct values to add study materials ', async ()=>{
           await request(await main())
            .post('/api/user/studyMaterialUpload')
            .send({
             title: 'StudyMaterial',
             subject: 'sinhala',
             grade: 'Grade 9',
             description: 'This is study Material',
             fileAmount: '1',
             teacher_email: 'kavishka@uom.com',

            })
            .expect('Success');
        });

    });
    describe('Teacher download study Material files ', ()=>{

        it('should return file path accroding to file name', async ()=>{
             const res =  await request(await main()).get('/api/user/getFile/0204b44a-12e2-47f5-940a-631cd18c1532');
             expect(res).toBe('D:\newel\E-Learning\public\upload\teacher\0204b44a-12e2-47f5-940a-631cd18c1532.jpg');
        });
        it('should return emply file path for null file name', async ()=>{
           const res =  await request(await main()).get('/api/user/getFile/nofilepath');
             expect(res).toBe(null);
        });
    });
    

});