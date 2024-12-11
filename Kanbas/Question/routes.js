import * as questionDao from "./dao.js";

export default function QuiestionRoutes(app) {
 app.delete("/api/questions/:questionId", async (req, res) => {
   const { questionId } = req.params;
   const status = await questionDao.deleteQuestion(questionId);
   res.send(status);
 });
 app.put("/api/questions/:questionId", async (req, res) => {
    const { questionId } = req.params;
    const questionUpdates = req.body;
    const status = await questionDao.updateQuestion(questionId, questionUpdates);
    res.send(status);
  });
 
}