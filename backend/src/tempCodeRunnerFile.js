import express from "express";
import router from "./routes/router.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use("/", router);

app.listen(3050, () => {
  console.log('Server running at 3050!');
});