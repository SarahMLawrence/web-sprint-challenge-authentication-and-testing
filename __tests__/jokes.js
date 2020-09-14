const supertest = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

describe("integration jokes testing", () => {
  it("GET /api/jokes", async () => {
    const res = await supertest(server).get("/api/jokes/");
    expect(res.body).toBeDefined();
  });

  it("GET /api/jokes", async () => {
    const res = await supertest(server).get("/api/jokes");
    expect(res.body.message).toBe("Invalid credentials");
  });

  it("GET /api/jokes", async () => {
    const res = await supertest(server).get("/api/jokes");
    expect(res.type).toMatch(/json/i);
  });

  it("GET /api/jokes", async () => {
    const res = await supertest(server).get("/api/jokes");
    expect(res.type).toEqual("application/json");
  });
});
