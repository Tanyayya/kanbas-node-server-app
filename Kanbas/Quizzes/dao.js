

import model from "./model.js";
export async function findQuizzesForCourses(courseId) {
  
 
  return model.find({ course: courseId });
}
export function createQuizzes(quiz) {
  delete quiz._id
  return model.create(quiz);
  }
  export function deleteQuiz(quizId) {
    return model.deleteOne({ _id: quizId });

   }
   export function updateQuiz(quizId, quiztUpdates) {
    return model.updateOne({ _id: quizId }, quiztUpdates);

  }
// export function updateQuiz(quizId, quiz) {
//     return model.findByIdAndUpdate(quizId, { $set: quiz });
// }
export function findQuizById(quizId) {
    return updateQuizFields(quizId);

}
async function updateQuizFields(quizId) {
    // const questions = await questionModel.find({ quiz: quizId });
    // let totalPoints = 0;
    // let totalQuestions = 0;
    // questions.forEach(question => {
    //     totalQuestions = totalQuestions + 1;
    //     totalPoints = totalPoints + question.points;
    // });
    const quiz = await model.findById(quizId);
    quiz.points = 0;
    quiz.number_of_questions = 0;
    await quiz.save();
    return quiz;
}

  