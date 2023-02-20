const Router = require("koa-router");

const api = new Router();
const books = require("./books/booksIndex");

api.use("/books", books.routes());

module.exports = api;
