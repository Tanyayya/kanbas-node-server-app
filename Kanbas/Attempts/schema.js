import mongoose from "mongoose";
const AttemptSchema = new mongoose.Schema({
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    attemptNumber: { type: Number, required: true },
    answers: [{
      question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
      selectedAnswer: String,
      correct: { type: Boolean, required: true }, 
    }],
    score: { type: Number, required: true },
    completedAt: { type: Date, required: true },
  }, 
  {collection:"attempts"},
  { timestamps: true }
  
);
export default AttemptSchema;