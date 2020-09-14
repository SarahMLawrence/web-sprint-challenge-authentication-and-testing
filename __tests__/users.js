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
  describe("GET list of users", () => {
    it("GET /auth/users - should get a 200", async () => {
      const res = await supertest(server).get("/api/auth/users");
      expect(res.statusCode).toBe(200);
    });
  });

  describe("Register user", () => {
    it("POST /auth/register - should return a status of 409 - username already taken", async () => {
      const res = await supertest(server)
        .post("/api/auth/register")
        .send({ username: "sarah", password: "law" });
      expect(res.statusCode).toBe(409);
      expect(res.body.message).toBe("Username is already taken");
    });

    it("POST /auth/register - should return a status of 500 - username hasn't been entered", async () => {
      const res = await supertest(server)
        .post("/api/auth/register")
        .send({ password: "law" });
      expect(res.statusCode).toBe(500);
    });

    // it("POST /auth/register - should return a status of 500 - password hasn't been entered", async () => {
    //   const res = await supertest(server)
    //     .post("/api/auth/register")
    //     .send({ username: "blah" });
    //   expect(res.statusCode).toBe(500);
    // });

    // it("POST /auth/register - create a new user", async () => {
    //   const res = await supertest(server)
    //     .post("/api/auth/register")
    //     .send({ username: "cc", password: "law" })
    //   expect(res.statusCode).toBe(201)
    // })

    it("POST /auth/register - returns json object", async () => {
      const res = await supertest(server)
        .post("/api/auth/register")
        .send({ username: "catlady", password: "law" });
      expect(res.type).toBe("application/json")
    });

  });
});
