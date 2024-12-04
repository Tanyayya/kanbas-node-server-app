import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    name: String,
    description: String,
    course: { type: String, required: true },  },
  { collection: "modules" }
);
export default schema;