const supertest = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig");
const { intersect } = require("../database/dbConfig");


//jest hook
beforeEach(async () => {
    // run the seeds programatically before each test to start fresh
    await db.seed.run();
  });
  afterAll(async () => {
    // close the db connection so the test process doesn't hang or give a warning
    await db.destroy();
  });

  

  describe("integration jokes testing", () => {
      it("GET /api/jokes", async () => {
          const res = await supertest(server).get("/api/jokes")
          expect(res.statusCode).toBe(200);
          expect(res.type).toBe("application/json")
          expect(res.body[1].username).toBe("sarahlaw")
      })
  })