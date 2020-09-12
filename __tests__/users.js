const supertest = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");


//jest hook
beforeEach(async () => {
  // run the seeds programatically before each test to start fresh
  // await db.seed.run();
});
afterAll(async () => {
  // close the db connection so the test process doesn't hang or give a warning
  await db.destroy();
});

describe("integration user testing", () => {
  it("POST /auth/register - should return a status of 409", async () => {
    const res = await supertest(server)
      .post("/api/auth/register")
      .send({ username: "sarah", password: "law" });
    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe("Username is already taken");
  });

  it("GET /api/jokes", async () => {
    const res = await supertest(server).get("/api/jokes/");
    expect(res.body).toBeDefined();
  });
});
