const Book = require("../../models/book");

exports.list = (ctx) => {
  ctx.body = "listed";
};

exports.create = (ctx) => {
  ctx.body = "create";
};

exports.delete = async (ctx) => {
  const { id } = ctx.params;

  try {
    await Book.findByIdAndRemove(id).exec();
  } catch (e) {
    if (e.name === "CastError") {
      ctx.status = 400;
      return;
    }
  }
};

exports.replace = async (ctx) => {
  ctx.body = "replace";

  let book;

  try {
    book = await Book.findByIdAndUpdate(id, ctx.request.body, {
      upsert: true,
      new: true,
    });
  } catch (e) {
    return ctx.throw(500, e);
  }
  ctx.body = book;
};

exports.update = (ctx) => {
  ctx.body = "update";
};
