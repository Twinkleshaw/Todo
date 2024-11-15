const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const TodoModel = require("./models/Todo");
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/test");
app.post("/add", (req, res) => {
  const task = req.body.task;

  TodoModel.create({
    task: task,
  })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});
app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});
app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`running server at http://localhost:${PORT}`);
});
