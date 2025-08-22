const chai = require("chai");
const chaiHttp = require("chai-http").default;
const app = require("../app.js");
const { expect } = chai;

chai.use(chaiHttp);
