import * as quizzesDao from "./dao.js";
import * as questionDao from "../Question/dao.js"
export default function QuizRoutes(app) {
 app.delete("/api/quizzes/:quizId", async (req, res) => {
   const { quizId } = req.params;
   const status = await quizzesDao.deleteQuiz(quizId);
   res.send(status);
 });
//  app.put("/api/quizzes/:quizId", async (req, res) => {
//     const { quizId } = req.params;
//     const quizUpdates = req.body;
//     const status = await quizzesDao.updateQuiz(quizId, quizUpdates);
//     res.send(status);
//   });
app.put("/api/quizzes/:quizId", async (req, res) => {
  const { quizId } = req.params;
  const quizUpdates = req.body;
  const status = await quizzesDao.updateQuiz(quizId, quizUpdates);
  res.send(status);
});
  
  app.get("/api/quizzes/:quizId/questions", async (req, res) => {
    const { quizId } = req.params;
    const questions =await questionDao.findQuestionsForQuizzes(quizId);
    res.json(questions);
  });
  app.post("/api/quizzes/:quizId/questions",async (req, res) => {
    const { quizId } = req.params;
    
    const question = {
      ...req.body,
      quiz: quizId,
    };
    const newQuestion =await  questionDao.createQuestions(question);
    res.send(newQuestion);
  });

  app.put("/api/quizzes/:quizId/publish", async (req, res) => {
    const { quizId } = req.params;
    const { isPublished } = req.body;
    try {
      const updatedQuiz = await quizzesDao.updateQuiz(quizId, isPublished);
      res.status(200).json(updatedQuiz);
    } catch (error) {
      res.status(500).send('Failed to update quiz');
    }
  });
  app.get("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const quiz = await quizzesDao.findQuizById(quizId);
    res.send(quiz);
});
  
}