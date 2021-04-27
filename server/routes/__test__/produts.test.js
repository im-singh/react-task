const request = require("supertest");
const app = require("../../app");


describe("GET /products/ ", () => {
    test.only("should respond if wrong endpoint", async () => {
        const response = await request(app).post("/prodcs/");
        expect(response.body).toMatch(/404 not found/i)
    })
    test("It should respond with an array of products", async () => {
        const response = await request(app).get("/products/");
        expect(response.body.length).toEqual(100);
        expect(response.statusCode).toBe(200);
    });
    test("each products must have title and body", async () => {
        const response = await request(app).get("/products/");
        response.body.forEach(ele => {
            expect(ele.title).toBeTruthy();
            expect(ele.body).toBeTruthy();
        })
        expect(response.statusCode).toBe(200);
    })

});