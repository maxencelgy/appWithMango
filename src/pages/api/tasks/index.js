import Task from "../../../model/Task";
import { dbConnect, runMiddleware } from "../../../utils/index";
import Morgan from "morgan";

dbConnect();

export default async (req, res) => {
  const { method, body } = req;
  const morgan = Morgan("dev");

  switch (method) {
    case "GET":
      try {
        const tasks = await Task.find();
        await runMiddleware(req, res, morgan);
        return res.status(200).json(tasks);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "POST":
      try {
        const newTask = new Task(body);
        const savedTask = await newTask.save();
        await runMiddleware(req, res, morgan);
        return res.status(200).json(savedTask);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
};
