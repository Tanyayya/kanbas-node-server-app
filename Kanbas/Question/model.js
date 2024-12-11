import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("QuestionSchema", schema);
export default model;