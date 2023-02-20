require("dotenv").config();

//module import
const Koa = require("koa");
const Router = require("koa-router");

//imported module declaration(불러온 모듈 사용 선언)
const app = new Koa();
const router = new Router();
const api = require("./api/apiRoute");

//apply Middle Ware
const bodyParser = require("koa-bodyparser");
app.use(bodyParser());

//DB mongoose Connection
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((respose) => {
    console.log(`Sucessfully connected MongoDB`);
  })
  .catch((e) => {
    console.error(e);
  });

const PORT = process.env.PORT;

router.use("/api", api.routes());

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`UB-Center Server On : http://localhost:4400`);
});

app.use(async (ctx) => {
  ctx.body = ctx.request.body;
});
