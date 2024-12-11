

import model from "./model.js";
export async function findQuestionsForQuizzes(quizId) {
  
 
  return model.find({ quiz: quizId });
}
export function createQuestions(question) {
  delete question._id
  return model.create(question);
  }
  export function deleteQuestion(questionId) {
    return model.deleteOne({ _id: questionId });

   }
   export function updateQuestion(questionId, questionUpdates) {
    return model.updateOne({ _id: questionId }, questionUpdates);

  }