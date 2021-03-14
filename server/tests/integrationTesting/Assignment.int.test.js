 const request = require('supertest');
 const { main } = require('../../dist/main');
 let server;

describe('Assignment Integration testing', ()=>{

    describe('Student Routes to assignment page', ()=>{

        it('should routes to assignment views', async ()=>{
            await request(await main())
            .post('/api/user/login')
            .send({
             email: 'supun@uom.com',
             passwordd: '12345678',
            })
            .expect(400);
        });
    });
    describe('Initial function when rendering Assignments page ', ()=>{
        it('should get due assignment list by student', async ()=>{
            const res =  await request(await main()).get('/api/user/assignments')
            expect(res[0]).toBe([]);
        });

         it('should get completed assignment list by student', async ()=>{
            const res =  await request(await main()).get('/api/user/completed-assignments')
            expect(res[0]).toBe([]);
            
        });
    });

    describe('Student download specific assignment', ()=>{
        it('should download the required file', async ()=>{
            const res =  await request(await main()).get('/api/user/getFile2/d39a468e-740e-4226-917f-419b5e2df3bf')
            expect(400);
        });
    });
       
    describe('Student upload a submission for an assignment', ()=>{

        it('should upload the file to the server', async ()=>{
            const res = await request(await main()).post('/api/user/upload-file').send({data: new FormData});
            expect(400);
        });
    });

    

});

describe("Assignment Integration testing", () => {
    describe("Teacher Route to assignment page", () => {
      it("should routes to assignment views", async () => {
        await request(await main())
          .post("/api/user/login")
          .send({
            email: "180003L@uom.lk",
            password: "Abcd1234",
          })
          .expect(200);
      });
    });
    describe("Functions when rendering Assignment for the Teacher.", () => {
      it("should get grades available for the teacher user", async () => {
        const res = await request(await main()).get(
          "/api/user/get-available-grades"
        );
        expect(res).toBe({
          1: { grade_id: 2, grade: "grade 7" },
          2: { grade_id: 3, grade: "grade 8" },
          3: { grade_id: 4, grade: "grade 9" },
          4: { grade_id: 5, grade: "grade 10" },
          5: { grade_id: 6, grade: "grade 11" },
          6: { grade_id: 7, grade: "grade 12" },
          7: { grade_id: 8, grade: "grade 13" },
          8: { grade_id: 9, grade: "grade 14" },
        });
      });
      it("should get the subject of teacher user", async () => {
        const res = await request(await main()).get(
          "/api/user/get-teacher-subjects"
        );
        expect(res).toBe({
          subject_id: 1,
          email: "180003L@uom.lk",
          telephone: "0784695572",
          subject: "maths",
        });
      });
      it("should route /login when user type is not teacher", async () => {
        await request(await main())
          .post("/api/user/login")
          .send({
            email: "admin@uom.com",
            passwordd: "12345678",
          })
          .expect("logout");
      });
    });
  
    describe("Teacher submits assignment.", () => {
      it("should correclty pass entered values in form", async () => {
        await request(await main())
          .post("/api/user/assingmentsubmit")
          .send({
              // upload with a file
            assignment_id: "63a547f5-42ba-4570-aef9-4b3a4b648cc8",
            description:
              "Write the prime numbers between 0 and 50 and do the exercise 7 and upload the answers before the deadline.",
            due_date: "2021-03-14",
            file_name: "9e851317-266b-4891-b41b-466937d943b4.pdf",
            file_size: 1239133,
            file_type: "pdf",
            grade_id: 3,
            location: "server/uploads/",
            mimetype: "application/pdf",
            subject_id: 1,
            title: "Maths Assignment 5",
            user_email: "180003L@uom.lk",
          })
          .expect("Success");
      });
      it("should response expeption when pass null title value ", async () => {
        await request(await main())
          .post("/api/user/assingmentsubmit")
          .send({ 
          //upload without any file 
            assignment_id: "bf6f30d0-a19f-479d-b324-4cdaccc8c76f",
            description: "Find the area of the rectangles.",
            due_date: "2021-03-13",
            grade_id: 2,
            subject_id: 1,
            title: null,
            user_email: "180003L@uom.lk",
          })
          .expect("error");
      });
      it("should response expeption when pass null description value ", async () => {
          await request(await main())
            .post("/api/user/assingmentsubmit")
            .send({ 
            //upload without any file 
              assignment_id: "9e851317-266b-4891-b41b-466937d943b4",
              description: null,
              due_date: "2021-03-13",
              grade_id: 2,
              subject_id: 1,
              title: "Assignment 6",
              user_email: "180003L@uom.lk",
            })
            .expect("error");
        });
      it("should response expeption when  due date is a previous day relative to current date.", async () => {
          await request(await main())
          .post("/api/user/assingmentsubmit")
          .send({ 
          //upload without any file 
            assignment_id: "ak9g90d0-p35m-897r-t816-sddadft2486u",
            description: "Find the area of the circles.",
            due_date: "2021-03-10",
            grade_id: 2,
            subject_id: 1,
            title: "Assignment 5- Maths",
            user_email: "180003L@uom.lk",
          })
          .expect("error");
      });
    });
  });
  