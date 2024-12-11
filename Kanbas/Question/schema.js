import mongoose from "mongoose";
const QuestionSchema = new mongoose.Schema(
  {
    title:String,
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    type: {
      type: String,
      enum: ['Multiple Choice', 'True/False', 'Fill in the Blank'],
      required: true,
    },
    
    points: { type: Number, required: true },
    questionText: { type: String, required: function() { return this.type !== 'True/False'; } },
    choices: [
      {
        text: { type: String, required: true },
        correct: { type: Boolean, default: false },
      },
    ],
    
  },
  { timestamps: true, collection: 'questions' }
);
export default QuestionSchema;