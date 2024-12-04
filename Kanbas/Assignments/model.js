import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("AssignmentSchema", schema);
export default model;