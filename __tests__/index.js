const supertest = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")


describe("Welcome", () => {
    it("GET /", async () =>{
        const res = await supertest(server).get("/");
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe("application/json");
        expect(res.body.message).toBe("Welcome to the Jokes API");
    })
})