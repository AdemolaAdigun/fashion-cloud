import App from "../app/index";
import * as chai from "chai";
import { assert } from "chai";
import chaiHttp = require("chai-http");
import 'mocha';

chai.use(chaiHttp);

before(done => {
    App.start()
        .then(done);
});

describe("Product routes", () => {
    it(" Should Get All Products", (done) => {
        chai
            .request(App.app)
            .get("/products")
            .end((error, response) => {
                assert.ifError(error);
                assert.equal(response.status, 200);
                assert.typeOf(response.body, "array");
                done();
            });
    });

    it("Should Get Products by Brand", (done) => {
        chai
            .request(App.app)
            .get("/products?brand=Aurora")
            .end((error, response) => {
                assert.ifError(error);
                assert.equal(response.status, 200);
                assert.typeOf(response.body, "array");
                assert.isTrue(response.body.some(p => p.brandName === "Aurora"));
                done();
            });
    });

    it("Should Get Distinct Brands", (done) => {
        chai
            .request(App.app)
            .get("/products/brands")
            .end((error, response) => {
                assert.ifError(error);
                assert.equal(response.status, 200);
                assert.typeOf(response.body, "array");
                done();
            });
    });

    it("Should Get Distinct Categories", (done) => {
        chai
            .request(App.app)
            .get("/products/categories")
            .end((error, response) => {
                assert.ifError(error);
                assert.equal(response.status, 200);
                assert.typeOf(response.body, "array");
                done();
            });
    });

})